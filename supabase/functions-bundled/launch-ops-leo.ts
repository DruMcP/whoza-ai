// Launch Ops - Leo (Compliance Agent) - Self-contained version
// Validates content against brand guardrails before publishing

import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

// ============================================
// TYPES
// ============================================

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
type Platform = 'linkedin' | 'instagram' | 'youtube_shorts' | 'twitter';
type ComplianceScore = 'low' | 'medium' | 'high';
type AgentName = 'orchestrator' | 'mara' | 'cody' | 'leo' | 'scheduler';
type AgentLogStatus = 'success' | 'error' | 'retry';

interface LeoInput {
  content: string;
  platform: Platform;
  post_id?: string;
  campaign_id?: string;
}

interface LeoOutput {
  approved: boolean;
  risk_level: ComplianceScore;
  issues: ComplianceIssue[];
  suggestions: string[];
}

interface ComplianceIssue {
  type: 'forbidden_word' | 'unsubstantiated_claim' | 'length_exceeded' | 'invalid_cta' | 'missing_utm' | 'tone_violation';
  text: string;
  reason: string;
  severity: ComplianceScore;
}

interface BrandGuardrailsConfig {
  pricing: { allowed_exact: string[]; forbidden_patterns: string[] };
  claims: { require_evidence: string[]; forbidden_unsubstantiated: string[] };
  ctas: { allowed_destinations: string[]; utm_required: boolean; soft_ctas: string[]; hard_ctas: string[] };
  audience: { allowed_trades: string[]; uk_focus: boolean };
  tone: { forbidden_words: string[]; required_tone: string };
  platform_rules: { linkedin: PlatformRules; instagram: InstagramRules; youtube_shorts: YouTubeRules };
}

interface PlatformRules { max_length: number; max_paragraphs?: number; emoji_max: number }
interface InstagramRules extends PlatformRules { visible_length: number; hashtag_max: number }
interface YouTubeRules { title_max: number; description_max: number }

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
// LEO SYSTEM PROMPT
// ============================================

const LEO_SYSTEM_PROMPT = `You are Leo, the Compliance Agent for whoza.ai's Launch Ops marketing system.

Your role is to protect the brand by ensuring all marketing content complies with:
1. Brand voice and tone guidelines
2. Legal and regulatory requirements (UK advertising standards)
3. Platform-specific rules and best practices
4. Pricing accuracy and claim substantiation

You are the last line of defense before content goes live. Be thorough but fair.

When analyzing content, you must:
- Check for forbidden words and phrases
- Verify claims are substantiated (not using superlatives without evidence)
- Ensure CTAs link to approved destinations with UTM parameters
- Validate content length for the target platform
- Check emoji usage is within limits
- Verify the tone is professional and helpful

Output your analysis as JSON with this structure:
{
  "approved": boolean,
  "risk_level": "low" | "medium" | "high",
  "issues": [
    {
      "type": "forbidden_word" | "unsubstantiated_claim" | "length_exceeded" | "invalid_cta" | "missing_utm" | "tone_violation",
      "text": "the problematic text",
      "reason": "explanation of the issue",
      "severity": "low" | "medium" | "high"
    }
  ],
  "suggestions": ["suggestion 1", "suggestion 2"]
}

Rules:
- "approved" should be true only if there are zero high-severity issues
- "risk_level" is "high" if any high-severity issue exists, "medium" if medium issues exist, "low" otherwise
- Be specific about what text triggered each issue
- Provide actionable suggestions for fixing issues`;

// ============================================
// RULE-BASED CHECKS
// ============================================

function performRuleBasedChecks(content: string, platform: Platform, guardrails: BrandGuardrailsConfig): ComplianceIssue[] {
  const issues: ComplianceIssue[] = [];
  const contentLower = content.toLowerCase();

  for (const pattern of guardrails.pricing.forbidden_patterns) {
    if (contentLower.includes(pattern.toLowerCase())) {
      issues.push({ type: 'forbidden_word', text: pattern, reason: `"${pattern}" is a forbidden term`, severity: 'high' });
    }
  }

  for (const word of guardrails.tone.forbidden_words) {
    if (contentLower.includes(word.toLowerCase())) {
      issues.push({ type: 'tone_violation', text: word, reason: `"${word}" does not align with brand voice`, severity: 'medium' });
    }
  }

  for (const claim of guardrails.claims.forbidden_unsubstantiated) {
    const regex = new RegExp(`\\b${claim}\\b`, 'gi');
    if (regex.test(content)) {
      issues.push({ type: 'unsubstantiated_claim', text: claim, reason: `"${claim}" requires evidence`, severity: 'high' });
    }
  }

  const platformRules = guardrails.platform_rules[platform as keyof typeof guardrails.platform_rules];
  if (platformRules && 'max_length' in platformRules && content.length > platformRules.max_length) {
    issues.push({ type: 'length_exceeded', text: `${content.length} characters`, reason: `Exceeds ${platform} limit of ${platformRules.max_length}`, severity: 'medium' });
  }

  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
  const emojiCount = (content.match(emojiRegex) || []).length;
  if (platformRules && 'emoji_max' in platformRules && emojiCount > platformRules.emoji_max) {
    issues.push({ type: 'tone_violation', text: `${emojiCount} emojis`, reason: `Exceeds ${platformRules.emoji_max} emoji limit`, severity: 'low' });
  }

  const urlRegex = /https?:\/\/[^\s]+/g;
  const urls = content.match(urlRegex) || [];
  for (const url of urls) {
    const isApproved = guardrails.ctas.allowed_destinations.some(dest => url.toLowerCase().startsWith(dest.toLowerCase()));
    if (!isApproved) issues.push({ type: 'invalid_cta', text: url, reason: `URL not in approved list`, severity: 'high' });
    if (guardrails.ctas.utm_required && !url.includes('utm_')) issues.push({ type: 'missing_utm', text: url, reason: 'Missing UTM parameters', severity: 'medium' });
  }

  return issues;
}

// ============================================
// MAIN HANDLER
// ============================================

Deno.serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  const timer = createTimer();

  try {
    if (req.method !== 'POST') return errorResponse('Method not allowed', 405);

    const body = await req.json() as LeoInput;
    const validation = validateRequiredFields(body, ['content', 'platform']);
    if (!validation.valid) return errorResponse(`Missing required fields: ${validation.missing.join(', ')}`);

    const { content, platform, post_id, campaign_id } = body;
    const validPlatforms: Platform[] = ['linkedin', 'instagram', 'youtube_shorts', 'twitter'];
    if (!validPlatforms.includes(platform)) return errorResponse(`Invalid platform. Must be one of: ${validPlatforms.join(', ')}`);

    console.log(`[LEO] Checking compliance for ${platform} content (${content.length} chars)`);

    const supabase = createServiceClient();
    const guardrails = await getActiveGuardrails(supabase);
    if (!guardrails) return errorResponse('No active brand guardrails found', 500);

    const ruleBasedIssues = performRuleBasedChecks(content, platform, guardrails);
    console.log(`[LEO] Rule-based check found ${ruleBasedIssues.length} issues`);

    const userPrompt = `Analyze this ${platform} marketing content for whoza.ai:

CONTENT:
"""
${content}
"""

BRAND GUARDRAILS:
- Allowed pricing: ${guardrails.pricing.allowed_exact.join(', ')}
- Forbidden patterns: ${guardrails.pricing.forbidden_patterns.join(', ')}
- Required tone: ${guardrails.tone.required_tone}
- Target audience: UK ${guardrails.audience.allowed_trades.slice(0, 5).join(', ')} and other tradespeople

RULE-BASED ISSUES ALREADY FOUND:
${ruleBasedIssues.length > 0 ? JSON.stringify(ruleBasedIssues, null, 2) : 'None'}

Please analyze for any additional semantic issues that rule-based checks might miss. Include the rule-based issues in your response.`;

    const { result: aiAnalysis, usage } = await callOpenAI<LeoOutput>(LEO_SYSTEM_PROMPT, userPrompt, 'gpt-4o-mini', { type: 'json_object' });
    console.log(`[LEO] AI analysis complete. Approved: ${aiAnalysis.approved}, Risk: ${aiAnalysis.risk_level}`);

    await logAgentActivity(supabase, {
      campaign_id: campaign_id || null,
      post_id: post_id || null,
      agent_name: 'leo',
      action: 'compliance_check',
      input_data: { content_length: content.length, platform } as Json,
      output_data: aiAnalysis as unknown as Json,
      model_used: 'gpt-4o-mini',
      prompt_tokens: usage.prompt_tokens,
      completion_tokens: usage.completion_tokens,
      latency_ms: timer.elapsed(),
      status: 'success',
      error_message: null,
    });

    if (post_id) {
      await supabase.from('launch_ops_posts').update({
        compliance_status: aiAnalysis.approved ? 'approved' : 'rejected',
        compliance_score: aiAnalysis.risk_level,
        compliance_notes: aiAnalysis.issues.length > 0 ? aiAnalysis.issues.map(i => `${i.type}: ${i.reason}`).join('\n') : 'All checks passed',
      }).eq('id', post_id);
    }

    return successResponse({ ...aiAnalysis, agent: 'leo', latency_ms: timer.elapsed() });

  } catch (error) {
    console.error('[LEO] Error:', error);
    try {
      const supabase = createServiceClient();
      await logAgentActivity(supabase, {
        campaign_id: null, post_id: null, agent_name: 'leo', action: 'compliance_check',
        input_data: null, output_data: null, model_used: null, prompt_tokens: null, completion_tokens: null,
        latency_ms: timer.elapsed(), status: 'error', error_message: error instanceof Error ? error.message : 'Unknown error',
      });
    } catch (logError) { console.error('[LEO] Error logging failure:', logError); }
    return errorResponse(error instanceof Error ? error.message : 'Internal server error', 500);
  }
});
