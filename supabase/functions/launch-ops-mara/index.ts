// Launch Ops - MARA (Marketing & Research Analyst Agent)
// Creates strategic marketing plans and content calendars

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
  getSimilarMemories,
  storeMemory,
} from '../_shared/launch-ops-utils.ts';

import type {
  MARAInput,
  MARAOutput,
  ContentCalendarItem,
  Platform,
  ContentBucket,
  BrandGuardrailsConfig,
} from '../_shared/launch-ops-types.ts';

// MARA's system prompt - The Strategic Mind
const MARA_SYSTEM_PROMPT = `You are MARA (Marketing & Research Analyst), the Strategy Agent for whoza.ai's Launch Ops marketing system.

Your role is to create data-driven marketing strategies and content calendars that effectively reach UK tradespeople and communicate the value of AI visibility.

BRAND CONTEXT:
- whoza.ai helps tradespeople get found by AI assistants (ChatGPT, Gemini, Perplexity, etc.)
- Core value proposition: "When someone asks AI for a plumber in Manchester, will they recommend you?"
- Target audience: UK tradespeople (plumbers, electricians, builders, roofers, etc.)
- Pricing tiers: £19/mo (Starter), £59/mo (Pro), £149/mo (Enterprise)

STRATEGIC FRAMEWORK:
1. Understand the campaign goal and target trade
2. Research what messaging resonates with that trade
3. Plan a balanced content mix (40% Education, 40% Proof, 20% Offer)
4. Create a realistic posting schedule
5. Define measurable success metrics

CONTENT CALENDAR RULES:
- LinkedIn: Best days are Tuesday-Thursday, 8-10am or 5-6pm UK time
- Instagram: Best days are Monday, Wednesday, Friday, 11am-1pm or 7-9pm UK time
- YouTube Shorts: Consistent daily posting works best
- Twitter: Multiple times per day, real-time engagement

OUTPUT FORMAT (JSON):
{
  "strategy_brief": "A 2-3 paragraph strategic overview explaining the approach",
  "content_calendar": [
    {
      "week": 1,
      "day": "Monday",
      "platform": "linkedin" | "instagram" | "youtube_shorts" | "twitter",
      "content_bucket": "proof" | "education" | "offer",
      "topic": "Brief description of the post topic"
    }
  ],
  "key_messages": ["Message 1", "Message 2", "Message 3"],
  "success_metrics": ["Metric 1 with target", "Metric 2 with target"]
}

RULES:
- Always balance content buckets (never more than 30% offer content)
- Consider the trade's work schedule (tradespeople are busy 7am-5pm)
- Reference specific pain points for the target trade
- Include both brand awareness and conversion-focused content
- Plan for 3-5 posts per week per platform maximum`;

// Get trade-specific insights
function getTradeInsights(trade: string): string {
  const tradeInsights: Record<string, string> = {
    plumber: `Plumber Insights:
- Peak busy seasons: Winter (frozen pipes, boiler issues), bathroom renovation season (spring)
- Pain points: Emergency call-outs, price competition, finding quality apprentices
- Online behavior: Often search for parts suppliers, industry regulations, Gas Safe updates
- Decision drivers: Reliability, reputation, word of mouth`,

    electrician: `Electrician Insights:
- Peak busy seasons: Home improvement season (spring/summer), Christmas lighting
- Pain points: Part P regulations, competition from unqualified workers, quote shopping
- Online behavior: NICEIC updates, new product research, industry forums
- Decision drivers: Certifications, safety record, professionalism`,

    builder: `Builder Insights:
- Peak busy seasons: Spring through autumn (weather dependent)
- Pain points: Material costs, project delays, client expectations, cash flow
- Online behavior: Material sourcing, project management tools, industry news
- Decision drivers: Portfolio, references, project management skills`,

    'heating engineer': `Heating Engineer Insights:
- Peak busy seasons: Autumn (boiler servicing), winter (breakdowns)
- Pain points: Gas Safe compliance, seasonal income fluctuation, emergency calls
- Online behavior: Manufacturer training, regulation updates, parts sourcing
- Decision drivers: Gas Safe registration, response time, expertise`,

    roofer: `Roofer Insights:
- Peak busy seasons: Spring and autumn (before/after winter)
- Pain points: Weather dependency, safety regulations, material costs
- Online behavior: Weather forecasts, supplier deals, safety training
- Decision drivers: Insurance, safety record, quality of materials`,

    locksmith: `Locksmith Insights:
- Peak busy seasons: Year-round with spikes after holidays (lost keys)
- Pain points: 24/7 availability expectations, competition, trust issues
- Online behavior: Security product updates, industry certifications
- Decision drivers: Response time, trustworthiness, pricing transparency`,
  };

  return tradeInsights[trade.toLowerCase()] || `General Trade Insights:
- Consider seasonal patterns for this trade
- Focus on professionalism and reliability
- Highlight certifications and qualifications
- Address common customer concerns`;
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
    const body = await req.json() as MARAInput;

    // Validate required fields
    const validation = validateRequiredFields(body, ['campaign_id', 'campaign_goal', 'target_trade', 'duration_weeks']);
    if (!validation.valid) {
      return errorResponse(`Missing required fields: ${validation.missing.join(', ')}`);
    }

    const { campaign_id, campaign_goal, target_trade, target_territory, duration_weeks } = body;

    // Validate duration
    if (duration_weeks < 1 || duration_weeks > 12) {
      return errorResponse('Duration must be between 1 and 12 weeks');
    }

    console.log(`[MARA] Creating ${duration_weeks}-week strategy for ${target_trade}s`);

    // Create Supabase client
    const supabase = createServiceClient();

    // Get active guardrails
    const guardrails = await getActiveGuardrails(supabase);
    if (!guardrails) {
      return errorResponse('No active brand guardrails found', 500);
    }

    // Verify the campaign exists
    const { data: campaign, error: campaignError } = await supabase
      .from('launch_ops_campaigns')
      .select('*')
      .eq('id', campaign_id)
      .single();

    if (campaignError || !campaign) {
      return errorResponse('Campaign not found', 404);
    }

    // Retrieve learnings from past campaigns
    const memories = await getSimilarMemories(
      supabase,
      `marketing strategy for ${target_trade} ${target_territory || 'UK'}`,
      5,
      0.5
    );

    const learningsContext = memories.length > 0
      ? `\n\nPAST CAMPAIGN LEARNINGS:\n${memories.map(m => `- ${m.content_text}`).join('\n')}`
      : '';

    // Build the user prompt
    const userPrompt = `Create a ${duration_weeks}-week marketing strategy for whoza.ai targeting UK ${target_trade}s${target_territory ? ` in ${target_territory}` : ''}.

CAMPAIGN GOAL: ${campaign_goal}

${getTradeInsights(target_trade)}

AVAILABLE PLATFORMS: LinkedIn, Instagram, YouTube Shorts, Twitter

CONTENT BUCKET GUIDELINES:
- Education (40%): Tips, AI visibility insights, industry knowledge
- Proof (40%): Testimonials, results, case studies, social proof
- Offer (20%): Direct promotions, CTAs, pricing

POSTING FREQUENCY TARGETS:
- LinkedIn: 3-4 posts per week
- Instagram: 4-5 posts per week
- YouTube Shorts: 2-3 per week (if video content is feasible)
- Twitter: 5-7 posts per week

${learningsContext}

Create a comprehensive strategy with a detailed content calendar for all ${duration_weeks} weeks. Ensure variety in platforms, content buckets, and topics. The strategy should build momentum and lead to conversions by the end of the campaign.`;

    // Call OpenAI to generate strategy
    const { result: strategy, usage } = await callOpenAI<MARAOutput>(
      MARA_SYSTEM_PROMPT,
      userPrompt,
      'gpt-4o-mini',
      { type: 'json_object' }
    );

    console.log(`[MARA] Strategy created with ${strategy.content_calendar.length} calendar items`);

    // Calculate content mix for storage
    const contentMix = {
      total_posts: strategy.content_calendar.length,
      by_platform: {} as Record<string, number>,
      by_bucket: {} as Record<string, number>,
    };

    for (const item of strategy.content_calendar) {
      contentMix.by_platform[item.platform] = (contentMix.by_platform[item.platform] || 0) + 1;
      contentMix.by_bucket[item.content_bucket] = (contentMix.by_bucket[item.content_bucket] || 0) + 1;
    }

    // Update the campaign with the strategy
    const { error: updateError } = await supabase
      .from('launch_ops_campaigns')
      .update({
        status: 'strategizing',
        strategy_brief: {
          brief: strategy.strategy_brief,
          key_messages: strategy.key_messages,
          success_metrics: strategy.success_metrics,
          content_calendar: strategy.content_calendar,
        },
        content_mix: contentMix,
      })
      .eq('id', campaign_id);

    if (updateError) {
      console.error('[MARA] Error updating campaign:', updateError);
      return errorResponse('Failed to save strategy to campaign', 500);
    }

    // Store the strategy in memory for future reference
    await storeMemory(
      supabase,
      'strategy',
      `${duration_weeks}-week strategy for ${target_trade}s: ${strategy.strategy_brief.substring(0, 500)}`,
      {
        target_trade,
        target_territory,
        duration_weeks,
        key_messages: strategy.key_messages,
      },
      campaign_id
    );

    // Log the activity
    await logAgentActivity(supabase, {
      campaign_id,
      post_id: null,
      agent_name: 'mara',
      action: 'create_strategy',
      input_data: { target_trade, target_territory, duration_weeks },
      output_data: {
        calendar_items: strategy.content_calendar.length,
        key_messages: strategy.key_messages.length,
      },
      model_used: 'gpt-4o-mini',
      prompt_tokens: usage.prompt_tokens,
      completion_tokens: usage.completion_tokens,
      latency_ms: timer.elapsed(),
      status: 'success',
      error_message: null,
    });

    return successResponse({
      campaign_id,
      ...strategy,
      content_mix: contentMix,
      agent: 'mara',
      latency_ms: timer.elapsed(),
    });

  } catch (error) {
    console.error('[MARA] Error:', error);

    // Log the error
    try {
      const supabase = createServiceClient();
      await logAgentActivity(supabase, {
        campaign_id: null,
        post_id: null,
        agent_name: 'mara',
        action: 'create_strategy',
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
      console.error('[MARA] Error logging failure:', logError);
    }

    return errorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      500
    );
  }
});
