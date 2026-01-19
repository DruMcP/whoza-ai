// Launch Ops - Cody (Content Creator Agent) - Self-contained version
// Generates social media content for marketing campaigns

import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

// ============================================
// TYPES
// ============================================

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
type Platform = 'linkedin' | 'instagram' | 'youtube_shorts' | 'twitter';
type ContentBucket = 'proof' | 'education' | 'offer';
type MediaType = 'image' | 'video' | 'carousel' | 'none';
type AgentName = 'orchestrator' | 'mara' | 'cody' | 'leo' | 'scheduler';
type AgentLogStatus = 'success' | 'error' | 'retry';

interface CodyInput {
  campaign_id: string;
  campaign_goal: string;
  target_trade: string;
  platform: Platform;
  content_bucket: ContentBucket;
  tone?: string;
  examples?: string[];
}

interface CodyOutput {
  caption: string;
  hook: string;
  cta: string;
  hashtags: string[];
  media_concept: string;
  media_type: MediaType;
}

interface BrandGuardrailsConfig {
  pricing: { allowed_exact: string[]; forbidden_patterns: string[] };
  claims: { require_evidence: string[]; forbidden_unsubstantiated: string[] };
  ctas: { allowed_destinations: string[]; utm_required: boolean; soft_ctas: string[]; hard_ctas: string[] };
  audience: { allowed_trades: string[]; uk_focus: boolean };
  tone: { forbidden_words: string[]; required_tone: string };
  platform_rules: { linkedin: { max_length: number; emoji_max: number }; instagram: { max_length: number; visible_length: number; emoji_max: number; hashtag_max: number }; youtube_shorts: { title_max: number; description_max: number } };
}

interface AgentLog {
  campaign_id: string | null;
  post_id: string | null;
  agent_name: AgentName;
  action: string;
  input_data: Json | null;
  output_data: Json | null;
  model_used: string | null;
  prompt_tokens: number | null;
  completion_tokens: number | null;
  latency_ms: number | null;
  status: AgentLogStatus | null;
  error_message: string | null;
}

// ============================================
// UTILITIES
// ============================================

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

function createServiceClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !supabaseServiceKey) throw new Error('Missing Supabase environment variables');
  return createClient(supabaseUrl, supabaseServiceKey, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function getActiveGuardrails(supabase: ReturnType<typeof createServiceClient>): Promise<BrandGuardrailsConfig | null> {
  const { data, error } = await supabase.from('brand_guardrails').select('guardrails').eq('is_active', true).single();
  if (error) { console.error('[GUARDRAILS] Error:', error); return null; }
  return data?.guardrails as BrandGuardrailsConfig;
}

async function logAgentActivity(supabase: ReturnType<typeof createServiceClient>, log: AgentLog): Promise<void> {
  const { error } = await supabase.from('agent_logs').insert(log);
  if (error) console.error('[AGENT LOG] Error:', error);
}

async function callOpenAI<T>(systemPrompt: string, userPrompt: string, model = 'gpt-4o-mini', responseFormat?: { type: 'json_object' }): Promise<{ result: T; usage: { prompt_tokens: number; completion_tokens: number } }> {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) throw new Error('OpenAI API key not configured');
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }], response_format: responseFormat, temperature: 0.7 }),
  });
  if (!response.ok) { const errorText = await response.text(); throw new Error(`OpenAI API error: ${response.status} - ${errorText}`); }
  const data = await response.json();
  const content = data.choices[0]?.message?.content;
  if (!content) throw new Error('No content in OpenAI response');
  const result = responseFormat?.type === 'json_object' ? JSON.parse(content) as T : content as T;
  return { result, usage: { prompt_tokens: data.usage?.prompt_tokens || 0, completion_tokens: data.usage?.completion_tokens || 0 } };
}

function generateContentHash(content: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(content.toLowerCase().trim());
  let hash = 0;
  for (let i = 0; i < data.length; i++) { hash = ((hash << 5) - hash) + data[i]; hash = hash & hash; }
  return Math.abs(hash).toString(16);
}

function validateRequiredFields<T extends Record<string, unknown>>(data: T, requiredFields: (keyof T)[]): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  for (const field of requiredFields) { if (data[field] === undefined || data[field] === null || data[field] === '') missing.push(String(field)); }
  return { valid: missing.length === 0, missing };
}

function errorResponse(message: string, status = 400): Response {
  return new Response(JSON.stringify({ success: false, error: message }), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}

function successResponse<T>(data: T, status = 200): Response {
  return new Response(JSON.stringify({ success: true, data }), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}

function handleCors(req: Request): Response | null {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
  return null;
}

function createTimer(): { elapsed: () => number } {
  const start = performance.now();
  return { elapsed: () => Math.round(performance.now() - start) };
}

// ============================================
// CODY SYSTEM PROMPT
// ============================================

const CODY_SYSTEM_PROMPT = `You are Cody, the Content Creator Agent for whoza.ai's Launch Ops marketing system.

Your role is to create engaging, compliant social media content for UK tradespeople (plumbers, electricians, builders, etc.) that promotes whoza.ai's AI visibility platform.

CONTENT BUCKETS:
1. PROOF - Case studies, testimonials, results, before/after stories
2. EDUCATION - Tips, insights, industry knowledge, how AI search works
3. OFFER - Promotions, CTAs, free trials, limited-time deals

BRAND VOICE:
- Professional but approachable
- Helpful and educational
- Never pushy or salesy
- UK-focused language and references
- Empathetic to tradesperson challenges

CONTENT STRUCTURE:
- Hook: Attention-grabbing first line
- Body: Value-driven content
- CTA: Clear next step (soft for Proof/Education, harder for Offer)

Output your content as JSON with this structure:
{
  "caption": "Full post caption with line breaks",
  "hook": "The attention-grabbing first line",
  "cta": "The call-to-action text",
  "hashtags": ["relevant", "hashtags", "max5"],
  "media_concept": "Description of ideal image/video to accompany",
  "media_type": "image" | "video" | "carousel" | "none"
}

Platform-specific rules:
- LinkedIn: Professional tone, can be longer, minimal emojis
- Instagram: Visual-first, use line breaks, emojis OK, hashtags important
- YouTube Shorts: Hook in first 3 seconds, vertical format
- Twitter: Concise, punchy, thread-friendly`;

// ============================================
// CONTENT BUCKET PROMPTS
// ============================================

const BUCKET_PROMPTS: Record<ContentBucket, string> = {
  proof: `Create PROOF content that demonstrates real results and builds trust.
Focus on:
- Specific outcomes (e.g., "3x more enquiries")
- Relatable tradesperson stories
- Before/after scenarios
- Social proof and credibility
Use a soft CTA like "See how it works" or "Learn more"`,

  education: `Create EDUCATION content that provides genuine value.
Focus on:
- How AI search is changing how customers find tradespeople
- Practical tips for improving online visibility
- Industry insights and trends
- Answering common questions
Use a soft CTA like "Want to learn more?" or "Follow for more tips"`,

  offer: `Create OFFER content that drives action.
Focus on:
- Clear value proposition
- Urgency without being pushy
- Specific benefits for tradespeople
- Risk-free trial or guarantee
Use a direct CTA like "Start your free trial" or "Get your free score"`,
};

// ============================================
// MAIN HANDLER
// ============================================

Deno.serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  const timer = createTimer();

  try {
    if (req.method !== 'POST') return errorResponse('Method not allowed', 405);

    const body = await req.json() as CodyInput;
    const validation = validateRequiredFields(body, ['campaign_id', 'campaign_goal', 'target_trade', 'platform', 'content_bucket']);
    if (!validation.valid) return errorResponse(`Missing required fields: ${validation.missing.join(', ')}`);

    const { campaign_id, campaign_goal, target_trade, platform, content_bucket, tone, examples } = body;

    const validPlatforms: Platform[] = ['linkedin', 'instagram', 'youtube_shorts', 'twitter'];
    if (!validPlatforms.includes(platform)) return errorResponse(`Invalid platform. Must be one of: ${validPlatforms.join(', ')}`);

    const validBuckets: ContentBucket[] = ['proof', 'education', 'offer'];
    if (!validBuckets.includes(content_bucket)) return errorResponse(`Invalid content bucket. Must be one of: ${validBuckets.join(', ')}`);

    console.log(`[CODY] Creating ${content_bucket} content for ${platform} targeting ${target_trade}`);

    const supabase = createServiceClient();
    const guardrails = await getActiveGuardrails(supabase);
    if (!guardrails) return errorResponse('No active brand guardrails found', 500);

    const platformRules = guardrails.platform_rules[platform as keyof typeof guardrails.platform_rules];
    const bucketPrompt = BUCKET_PROMPTS[content_bucket];

    const userPrompt = `Create a ${platform} post for whoza.ai targeting UK ${target_trade}s.

CAMPAIGN GOAL: ${campaign_goal}

CONTENT TYPE: ${content_bucket.toUpperCase()}
${bucketPrompt}

PLATFORM RULES:
${JSON.stringify(platformRules, null, 2)}

BRAND GUARDRAILS:
- Allowed pricing mentions: ${guardrails.pricing.allowed_exact.join(', ')}
- Forbidden words: ${guardrails.tone.forbidden_words.join(', ')}
- Required tone: ${guardrails.tone.required_tone}
- Soft CTAs: ${guardrails.ctas.soft_ctas.join(', ')}
- Hard CTAs: ${guardrails.ctas.hard_ctas.join(', ')}

${tone ? `TONE OVERRIDE: ${tone}` : ''}
${examples && examples.length > 0 ? `EXAMPLE POSTS FOR REFERENCE:\n${examples.join('\n---\n')}` : ''}

Create engaging content that will resonate with ${target_trade}s and drive them to learn more about whoza.ai.`;

    const { result: content, usage } = await callOpenAI<CodyOutput>(CODY_SYSTEM_PROMPT, userPrompt, 'gpt-4o-mini', { type: 'json_object' });
    console.log(`[CODY] Content generated: ${content.caption.substring(0, 50)}...`);

    const contentHash = generateContentHash(content.caption);

    const { data: newPost, error: insertError } = await supabase
      .from('launch_ops_posts')
      .insert({
        campaign_id,
        platform,
        content_bucket,
        caption: content.caption,
        hook: content.hook,
        cta: content.cta,
        hashtags: content.hashtags,
        media_type: content.media_type,
        media_concept: content.media_concept,
        content_hash: contentHash,
        compliance_status: 'pending',
      })
      .select()
      .single();

    if (insertError || !newPost) {
      console.error('[CODY] Error creating post:', insertError);
      return errorResponse('Failed to save post to database', 500);
    }

    await logAgentActivity(supabase, {
      campaign_id,
      post_id: newPost.id,
      agent_name: 'cody',
      action: 'create_content',
      input_data: { platform, content_bucket, target_trade } as Json,
      output_data: content as unknown as Json,
      model_used: 'gpt-4o-mini',
      prompt_tokens: usage.prompt_tokens,
      completion_tokens: usage.completion_tokens,
      latency_ms: timer.elapsed(),
      status: 'success',
      error_message: null,
    });

    return successResponse({
      ...content,
      post_id: newPost.id,
      content_hash: contentHash,
      agent: 'cody',
      latency_ms: timer.elapsed(),
    });

  } catch (error) {
    console.error('[CODY] Error:', error);
    try {
      const supabase = createServiceClient();
      await logAgentActivity(supabase, {
        campaign_id: null, post_id: null, agent_name: 'cody', action: 'create_content',
        input_data: null, output_data: null, model_used: null, prompt_tokens: null, completion_tokens: null,
        latency_ms: timer.elapsed(), status: 'error', error_message: error instanceof Error ? error.message : 'Unknown error',
      });
    } catch (logError) { console.error('[CODY] Error logging failure:', logError); }
    return errorResponse(error instanceof Error ? error.message : 'Internal server error', 500);
  }
});
