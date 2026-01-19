// Launch Ops - MARA (Strategy Agent) - Self-contained version
// Creates marketing strategies and content calendars

import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

// ============================================
// TYPES
// ============================================

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
type Platform = 'linkedin' | 'instagram' | 'youtube_shorts' | 'twitter';
type ContentBucket = 'proof' | 'education' | 'offer';
type AgentName = 'orchestrator' | 'mara' | 'cody' | 'leo' | 'scheduler';
type AgentLogStatus = 'success' | 'error' | 'retry';

interface MARAInput {
  campaign_id: string;
  campaign_goal: string;
  target_trade: string;
  target_territory?: string;
  duration_weeks: number;
}

interface MARAOutput {
  strategy_brief: string;
  content_calendar: ContentCalendarItem[];
  key_messages: string[];
  success_metrics: string[];
}

interface ContentCalendarItem {
  week: number;
  day: string;
  platform: Platform;
  content_bucket: ContentBucket;
  topic: string;
}

interface BrandGuardrailsConfig {
  pricing: { allowed_exact: string[]; forbidden_patterns: string[] };
  claims: { require_evidence: string[]; forbidden_unsubstantiated: string[] };
  ctas: { allowed_destinations: string[]; utm_required: boolean; soft_ctas: string[]; hard_ctas: string[] };
  audience: { allowed_trades: string[]; uk_focus: boolean };
  tone: { forbidden_words: string[]; required_tone: string };
  platform_rules: Record<string, unknown>;
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
// MARA SYSTEM PROMPT
// ============================================

const MARA_SYSTEM_PROMPT = `You are MARA (Marketing Analysis & Research Agent), the Strategy Agent for whoza.ai's Launch Ops marketing system.

Your role is to create data-driven marketing strategies and content calendars for campaigns targeting UK tradespeople.

ABOUT WHOZA.AI:
- AI visibility platform for UK tradespeople
- Helps plumbers, electricians, builders etc. get found in AI search results
- Pricing: Free score, then £49/month or £490/year
- Key differentiator: First-mover in AI visibility for trades

YOUR RESPONSIBILITIES:
1. Analyze campaign goals and target audience
2. Create strategic content mix (40% Proof, 40% Education, 20% Offer)
3. Design content calendar across platforms
4. Define key messages and success metrics

CONTENT MIX STRATEGY:
- PROOF (40%): Build trust through results, testimonials, case studies
- EDUCATION (40%): Provide value, establish expertise, explain AI search
- OFFER (20%): Drive conversions with clear CTAs

PLATFORM STRATEGY:
- LinkedIn: B2B focus, professional content, thought leadership
- Instagram: Visual storytelling, behind-the-scenes, relatable content
- YouTube Shorts: Quick tips, demonstrations, engaging hooks
- Twitter: News, quick insights, engagement

Output your strategy as JSON with this structure:
{
  "strategy_brief": "2-3 paragraph strategic overview",
  "content_calendar": [
    {
      "week": 1,
      "day": "Monday",
      "platform": "linkedin",
      "content_bucket": "education",
      "topic": "Specific topic for this post"
    }
  ],
  "key_messages": ["message1", "message2", "message3"],
  "success_metrics": ["metric1", "metric2", "metric3"]
}`;

// ============================================
// MAIN HANDLER
// ============================================

Deno.serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  const timer = createTimer();

  try {
    if (req.method !== 'POST') return errorResponse('Method not allowed', 405);

    const body = await req.json() as MARAInput;
    const validation = validateRequiredFields(body, ['campaign_id', 'campaign_goal', 'target_trade', 'duration_weeks']);
    if (!validation.valid) return errorResponse(`Missing required fields: ${validation.missing.join(', ')}`);

    const { campaign_id, campaign_goal, target_trade, target_territory, duration_weeks } = body;

    if (duration_weeks < 1 || duration_weeks > 12) {
      return errorResponse('Duration must be between 1 and 12 weeks');
    }

    console.log(`[MARA] Creating strategy for ${duration_weeks}-week campaign targeting ${target_trade}s`);

    const supabase = createServiceClient();
    const guardrails = await getActiveGuardrails(supabase);
    if (!guardrails) return errorResponse('No active brand guardrails found', 500);

    const userPrompt = `Create a ${duration_weeks}-week marketing strategy for whoza.ai.

CAMPAIGN DETAILS:
- Goal: ${campaign_goal}
- Target Trade: ${target_trade}s in the UK
- Territory Focus: ${target_territory || 'UK-wide'}
- Duration: ${duration_weeks} weeks

BRAND GUARDRAILS:
- Allowed pricing: ${guardrails.pricing.allowed_exact.join(', ')}
- Target trades: ${guardrails.audience.allowed_trades.join(', ')}
- Required tone: ${guardrails.tone.required_tone}
- UK focus: ${guardrails.audience.uk_focus ? 'Yes' : 'No'}

REQUIREMENTS:
1. Create a strategic brief explaining the approach
2. Design a content calendar with ${duration_weeks * 5} posts (approximately 5 per week)
3. Maintain content mix: 40% Proof, 40% Education, 20% Offer
4. Distribute across LinkedIn, Instagram, and Twitter
5. Define 3-5 key messages for the campaign
6. Set 3-5 measurable success metrics

Consider:
- What pain points do ${target_trade}s face with online visibility?
- How can we demonstrate AI search value without being too technical?
- What proof points would resonate with this trade?
- How do we build trust before asking for conversion?`;

    const { result: strategy, usage } = await callOpenAI<MARAOutput>(MARA_SYSTEM_PROMPT, userPrompt, 'gpt-4o-mini', { type: 'json_object' });
    console.log(`[MARA] Strategy created with ${strategy.content_calendar.length} calendar items`);

    const { error: updateError } = await supabase
      .from('launch_ops_campaigns')
      .update({
        status: 'strategizing',
        strategy_brief: strategy.strategy_brief as unknown as Json,
        content_mix: {
          calendar: strategy.content_calendar,
          key_messages: strategy.key_messages,
          success_metrics: strategy.success_metrics,
        } as Json,
      })
      .eq('id', campaign_id);

    if (updateError) {
      console.error('[MARA] Error updating campaign:', updateError);
    }

    await logAgentActivity(supabase, {
      campaign_id,
      post_id: null,
      agent_name: 'mara',
      action: 'create_strategy',
      input_data: { campaign_goal, target_trade, duration_weeks } as Json,
      output_data: strategy as unknown as Json,
      model_used: 'gpt-4o-mini',
      prompt_tokens: usage.prompt_tokens,
      completion_tokens: usage.completion_tokens,
      latency_ms: timer.elapsed(),
      status: 'success',
      error_message: null,
    });

    return successResponse({
      ...strategy,
      campaign_id,
      agent: 'mara',
      latency_ms: timer.elapsed(),
    });

  } catch (error) {
    console.error('[MARA] Error:', error);
    try {
      const supabase = createServiceClient();
      await logAgentActivity(supabase, {
        campaign_id: null, post_id: null, agent_name: 'mara', action: 'create_strategy',
        input_data: null, output_data: null, model_used: null, prompt_tokens: null, completion_tokens: null,
        latency_ms: timer.elapsed(), status: 'error', error_message: error instanceof Error ? error.message : 'Unknown error',
      });
    } catch (logError) { console.error('[MARA] Error logging failure:', logError); }
    return errorResponse(error instanceof Error ? error.message : 'Internal server error', 500);
  }
});
