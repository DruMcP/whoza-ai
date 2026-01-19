// Launch Ops - Leo (Compliance Agent)
// Validates content against brand guardrails before publishing

import {
  corsHeaders,
  createServiceClient,
  getActiveGuardrails,
  logAgentActivity,
  callOpenAI,
  errorResponse,
  successResponse,
  handleCors,
  createTimer,
  validateRequiredFields,
} from '../_shared/launch-ops-utils.ts';

import type {
  LeoInput,
  LeoOutput,
  ComplianceIssue,
  ComplianceScore,
  BrandGuardrailsConfig,
  Platform,
} from '../_shared/launch-ops-types.ts';

// Leo's system prompt - The Compliance Guardian
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

// Perform rule-based compliance checks (fast, deterministic)
function performRuleBasedChecks(
  content: string,
  platform: Platform,
  guardrails: BrandGuardrailsConfig
): ComplianceIssue[] {
  const issues: ComplianceIssue[] = [];
  const contentLower = content.toLowerCase();

  // Check forbidden pricing patterns
  for (const pattern of guardrails.pricing.forbidden_patterns) {
    if (contentLower.includes(pattern.toLowerCase())) {
      issues.push({
        type: 'forbidden_word',
        text: pattern,
        reason: `"${pattern}" is a forbidden term that could mislead customers or violate advertising standards`,
        severity: 'high',
      });
    }
  }

  // Check forbidden tone words
  for (const word of guardrails.tone.forbidden_words) {
    if (contentLower.includes(word.toLowerCase())) {
      issues.push({
        type: 'tone_violation',
        text: word,
        reason: `"${word}" does not align with our professional brand voice`,
        severity: 'medium',
      });
    }
  }

  // Check unsubstantiated claims
  for (const claim of guardrails.claims.forbidden_unsubstantiated) {
    const regex = new RegExp(`\\b${claim}\\b`, 'gi');
    if (regex.test(content)) {
      issues.push({
        type: 'unsubstantiated_claim',
        text: claim,
        reason: `"${claim}" is a superlative that requires evidence to substantiate`,
        severity: 'high',
      });
    }
  }

  // Check platform-specific length limits
  const platformRules = guardrails.platform_rules[platform as keyof typeof guardrails.platform_rules];
  if (platformRules && 'max_length' in platformRules) {
    if (content.length > platformRules.max_length) {
      issues.push({
        type: 'length_exceeded',
        text: `${content.length} characters`,
        reason: `Content exceeds ${platform} limit of ${platformRules.max_length} characters`,
        severity: 'medium',
      });
    }
  }

  // Check emoji count
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
  const emojiCount = (content.match(emojiRegex) || []).length;
  if (platformRules && 'emoji_max' in platformRules && emojiCount > platformRules.emoji_max) {
    issues.push({
      type: 'tone_violation',
      text: `${emojiCount} emojis`,
      reason: `Content has ${emojiCount} emojis, exceeding the ${platformRules.emoji_max} limit for ${platform}`,
      severity: 'low',
    });
  }

  // Check for URLs and UTM parameters
  const urlRegex = /https?:\/\/[^\s]+/g;
  const urls = content.match(urlRegex) || [];
  for (const url of urls) {
    // Check if URL is to an approved destination
    const isApproved = guardrails.ctas.allowed_destinations.some(dest => 
      url.toLowerCase().startsWith(dest.toLowerCase())
    );
    
    if (!isApproved) {
      issues.push({
        type: 'invalid_cta',
        text: url,
        reason: `URL "${url}" is not in the approved destinations list`,
        severity: 'high',
      });
    }

    // Check for UTM parameters if required
    if (guardrails.ctas.utm_required && !url.includes('utm_')) {
      issues.push({
        type: 'missing_utm',
        text: url,
        reason: 'URL is missing required UTM tracking parameters',
        severity: 'medium',
      });
    }
  }

  return issues;
}

// Main handler
Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  const timer = createTimer();

  try {
    // Only allow POST
    if (req.method !== 'POST') {
      return errorResponse('Method not allowed', 405);
    }

    // Parse request body
    const body = await req.json() as LeoInput;

    // Validate required fields
    const validation = validateRequiredFields(body, ['content', 'platform']);
    if (!validation.valid) {
      return errorResponse(`Missing required fields: ${validation.missing.join(', ')}`);
    }

    const { content, platform, post_id, campaign_id } = body;

    // Validate platform
    const validPlatforms: Platform[] = ['linkedin', 'instagram', 'youtube_shorts', 'twitter'];
    if (!validPlatforms.includes(platform)) {
      return errorResponse(`Invalid platform. Must be one of: ${validPlatforms.join(', ')}`);
    }

    console.log(`[LEO] Checking compliance for ${platform} content (${content.length} chars)`);

    // Create Supabase client
    const supabase = createServiceClient();

    // Get active guardrails
    const guardrails = await getActiveGuardrails(supabase);
    if (!guardrails) {
      return errorResponse('No active brand guardrails found', 500);
    }

    // Perform rule-based checks first (fast)
    const ruleBasedIssues = performRuleBasedChecks(content, platform, guardrails);
    console.log(`[LEO] Rule-based check found ${ruleBasedIssues.length} issues`);

    // Perform AI-powered semantic analysis
    const userPrompt = `Analyze this ${platform} marketing content for whoza.ai (AI visibility platform for UK tradespeople):

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

Please analyze for any additional semantic issues (misleading implications, tone problems, unclear messaging) that rule-based checks might miss. Include the rule-based issues in your response.`;

    const { result: aiAnalysis, usage } = await callOpenAI<LeoOutput>(
      LEO_SYSTEM_PROMPT,
      userPrompt,
      'gpt-4o-mini',
      { type: 'json_object' }
    );

    console.log(`[LEO] AI analysis complete. Approved: ${aiAnalysis.approved}, Risk: ${aiAnalysis.risk_level}`);

    // Log the activity
    await logAgentActivity(supabase, {
      campaign_id: campaign_id || null,
      post_id: post_id || null,
      agent_name: 'leo',
      action: 'compliance_check',
      input_data: { content_length: content.length, platform },
      output_data: aiAnalysis,
      model_used: 'gpt-4o-mini',
      prompt_tokens: usage.prompt_tokens,
      completion_tokens: usage.completion_tokens,
      latency_ms: timer.elapsed(),
      status: 'success',
      error_message: null,
    });

    // If there's a post_id, update the post's compliance status
    if (post_id) {
      const { error: updateError } = await supabase
        .from('launch_ops_posts')
        .update({
          compliance_status: aiAnalysis.approved ? 'approved' : 'rejected',
          compliance_score: aiAnalysis.risk_level,
          compliance_notes: aiAnalysis.issues.length > 0 
            ? aiAnalysis.issues.map(i => `${i.type}: ${i.reason}`).join('\n')
            : 'All checks passed',
        })
        .eq('id', post_id);

      if (updateError) {
        console.error('[LEO] Error updating post compliance status:', updateError);
      }
    }

    return successResponse({
      ...aiAnalysis,
      agent: 'leo',
      latency_ms: timer.elapsed(),
    });

  } catch (error) {
    console.error('[LEO] Error:', error);

    // Log the error
    try {
      const supabase = createServiceClient();
      await logAgentActivity(supabase, {
        campaign_id: null,
        post_id: null,
        agent_name: 'leo',
        action: 'compliance_check',
        input_data: null,
        output_data: null,
        model_used: null,
        prompt_tokens: null,
        completion_tokens: null,
        latency_ms: timer.elapsed(),
        status: 'error',
        error_message: error instanceof Error ? error.message : 'Unknown error',
      });
    } catch (logError) {
      console.error('[LEO] Error logging failure:', logError);
    }

    return errorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      500
    );
  }
});
