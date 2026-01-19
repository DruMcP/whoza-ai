// Launch Ops - Cody (Content Creator Agent)
// Creates engaging social media content for UK tradespeople

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
  generateContentHash,
  getSimilarMemories,
} from '../_shared/launch-ops-utils.ts';

import type {
  CodyInput,
  CodyOutput,
  Platform,
  ContentBucket,
  BrandGuardrailsConfig,
  MediaType,
} from '../_shared/launch-ops-types.ts';

// Cody's system prompt - The Creative Engine
const CODY_SYSTEM_PROMPT = `You are Cody, the Content Creator Agent for whoza.ai's Launch Ops marketing system.

Your role is to create compelling, compliant social media content that resonates with UK tradespeople (plumbers, electricians, builders, etc.) and helps them understand the value of AI visibility.

BRAND CONTEXT:
- whoza.ai helps tradespeople get found by AI assistants (ChatGPT, Gemini, etc.)
- Core message: "When someone asks AI for a plumber in Manchester, will they recommend you?"
- Pricing: £19/mo (Starter), £59/mo (Pro), £149/mo (Enterprise)
- Tone: Professional, helpful, expert - never salesy or pushy

CONTENT BUCKETS:
1. PROOF - Social proof, testimonials, results, case studies
2. EDUCATION - Tips, insights, industry knowledge, how AI search works
3. OFFER - Direct promotion, CTAs, special offers (use sparingly)

PLATFORM GUIDELINES:
- LinkedIn: Professional, longer form, thought leadership, 2 emojis max
- Instagram: Visual-first, engaging hooks, up to 5 emojis, 30 hashtags max
- YouTube Shorts: Punchy, attention-grabbing, video-focused concepts
- Twitter: Concise, conversational, trending topics

OUTPUT FORMAT (JSON):
{
  "caption": "The full post text with line breaks",
  "hook": "The attention-grabbing first line",
  "cta": "The call-to-action text",
  "hashtags": ["relevant", "hashtags", "for", "the", "platform"],
  "media_concept": "Description of the ideal image/video to accompany this post",
  "media_type": "image" | "video" | "carousel" | "none"
}

RULES:
- Never use forbidden words: cheap, bargain, deal, discount, free trial, guarantee, #1, best, leading
- Always include a soft CTA (See your score, Check your visibility) unless content bucket is "offer"
- Make content relatable to tradespeople's daily challenges
- Use UK English spelling and terminology
- Reference real tradesperson pain points (quiet phones, competition, word of mouth dying)`;

// Get platform-specific instructions
function getPlatformInstructions(platform: Platform, guardrails: BrandGuardrailsConfig): string {
  const rules = guardrails.platform_rules[platform as keyof typeof guardrails.platform_rules];
  
  switch (platform) {
    case 'linkedin':
      return `LinkedIn Guidelines:
- Maximum ${rules?.max_length || 3000} characters
- Maximum ${(rules as any)?.max_paragraphs || 5} paragraphs
- Maximum ${rules?.emoji_max || 2} emojis
- Professional tone, thought leadership focus
- Use line breaks for readability
- End with a question to drive engagement`;
    
    case 'instagram':
      return `Instagram Guidelines:
- Maximum ${rules?.max_length || 2200} characters
- First ${(rules as any)?.visible_length || 125} characters are crucial (visible before "more")
- Maximum ${rules?.emoji_max || 5} emojis
- Maximum ${(rules as any)?.hashtag_max || 30} hashtags (use 10-15 for best reach)
- Visual-first platform - media concept is critical
- Use carousel for educational content`;
    
    case 'youtube_shorts':
      return `YouTube Shorts Guidelines:
- Title maximum ${(rules as any)?.title_max || 100} characters
- Description maximum ${(rules as any)?.description_max || 5000} characters
- Video-first platform - caption should complement video
- Hook must grab attention in first 2 seconds
- Vertical format (9:16 aspect ratio)`;
    
    case 'twitter':
      return `Twitter/X Guidelines:
- Maximum 280 characters
- Punchy, conversational tone
- Use threads for longer content
- Hashtags sparingly (1-2 max)
- Engage with trending topics when relevant`;
    
    default:
      return '';
  }
}

// Get content bucket instructions
function getContentBucketInstructions(bucket: ContentBucket): string {
  switch (bucket) {
    case 'proof':
      return `PROOF Content Guidelines:
- Focus on results, testimonials, and social proof
- Use specific numbers when possible ("3x more enquiries")
- Tell a story of transformation
- Make it relatable to the target trade
- Include before/after scenarios`;
    
    case 'education':
      return `EDUCATION Content Guidelines:
- Teach something valuable about AI visibility
- Explain how AI search differs from Google
- Share industry insights and trends
- Position whoza.ai as the expert
- Use analogies tradespeople understand`;
    
    case 'offer':
      return `OFFER Content Guidelines:
- Clear value proposition
- Specific pricing (£19/mo, £59/mo, £149/mo)
- Strong but not pushy CTA
- Create urgency without false scarcity
- Highlight what they get, not what they pay`;
    
    default:
      return '';
  }
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
    const body = await req.json() as CodyInput;

    // Validate required fields
    const validation = validateRequiredFields(body, ['campaign_id', 'campaign_goal', 'target_trade', 'platform', 'content_bucket']);
    if (!validation.valid) {
      return errorResponse(`Missing required fields: ${validation.missing.join(', ')}`);
    }

    const { campaign_id, campaign_goal, target_trade, platform, content_bucket, tone, examples } = body;

    // Validate platform and content bucket
    const validPlatforms: Platform[] = ['linkedin', 'instagram', 'youtube_shorts', 'twitter'];
    const validBuckets: ContentBucket[] = ['proof', 'education', 'offer'];

    if (!validPlatforms.includes(platform)) {
      return errorResponse(`Invalid platform. Must be one of: ${validPlatforms.join(', ')}`);
    }

    if (!validBuckets.includes(content_bucket)) {
      return errorResponse(`Invalid content bucket. Must be one of: ${validBuckets.join(', ')}`);
    }

    console.log(`[CODY] Creating ${content_bucket} content for ${platform} targeting ${target_trade}`);

    // Create Supabase client
    const supabase = createServiceClient();

    // Get active guardrails
    const guardrails = await getActiveGuardrails(supabase);
    if (!guardrails) {
      return errorResponse('No active brand guardrails found', 500);
    }

    // Retrieve similar successful content from memory
    const memories = await getSimilarMemories(
      supabase,
      `${content_bucket} content for ${target_trade} on ${platform}`,
      3,
      0.6
    );

    const memoryContext = memories.length > 0
      ? `\n\nSUCCESSFUL PAST CONTENT FOR REFERENCE:\n${memories.map(m => m.content_text).join('\n---\n')}`
      : '';

    // Build the user prompt
    const userPrompt = `Create a ${content_bucket.toUpperCase()} post for ${platform} targeting UK ${target_trade}s.

CAMPAIGN GOAL: ${campaign_goal}

${getPlatformInstructions(platform, guardrails)}

${getContentBucketInstructions(content_bucket)}

TONE: ${tone || guardrails.tone.required_tone}

ALLOWED CTAs:
- Soft: ${guardrails.ctas.soft_ctas.join(', ')}
- Hard: ${guardrails.ctas.hard_ctas.join(', ')}

FORBIDDEN WORDS: ${[...guardrails.pricing.forbidden_patterns, ...guardrails.tone.forbidden_words, ...guardrails.claims.forbidden_unsubstantiated].join(', ')}

${examples && examples.length > 0 ? `\nEXAMPLES TO DRAW INSPIRATION FROM:\n${examples.join('\n---\n')}` : ''}
${memoryContext}

Create compelling, compliant content that will resonate with ${target_trade}s and drive engagement.`;

    // Call OpenAI to generate content
    const { result: content, usage } = await callOpenAI<CodyOutput>(
      CODY_SYSTEM_PROMPT,
      userPrompt,
      'gpt-4o-mini',
      { type: 'json_object' }
    );

    console.log(`[CODY] Content created: ${content.caption.substring(0, 50)}...`);

    // Generate content hash for deduplication
    const contentHash = generateContentHash(content.caption);

    // Check for duplicate content
    const { data: existingPost } = await supabase
      .from('launch_ops_posts')
      .select('id')
      .eq('content_hash', contentHash)
      .single();

    if (existingPost) {
      console.log('[CODY] Warning: Similar content already exists');
    }

    // Create the post in the database
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
        compliance_status: 'pending',
        content_hash: contentHash,
      })
      .select()
      .single();

    if (insertError) {
      console.error('[CODY] Error creating post:', insertError);
      return errorResponse('Failed to save post to database', 500);
    }

    // Update campaign status to 'creating' if it was 'strategizing'
    await supabase
      .from('launch_ops_campaigns')
      .update({ status: 'creating' })
      .eq('id', campaign_id)
      .eq('status', 'strategizing');

    // Log the activity
    await logAgentActivity(supabase, {
      campaign_id,
      post_id: newPost.id,
      agent_name: 'cody',
      action: 'create_content',
      input_data: { platform, content_bucket, target_trade },
      output_data: content,
      model_used: 'gpt-4o-mini',
      prompt_tokens: usage.prompt_tokens,
      completion_tokens: usage.completion_tokens,
      latency_ms: timer.elapsed(),
      status: 'success',
      error_message: null,
    });

    return successResponse({
      post_id: newPost.id,
      ...content,
      content_hash: contentHash,
      agent: 'cody',
      latency_ms: timer.elapsed(),
    });

  } catch (error) {
    console.error('[CODY] Error:', error);

    // Log the error
    try {
      const supabase = createServiceClient();
      await logAgentActivity(supabase, {
        campaign_id: null,
        post_id: null,
        agent_name: 'cody',
        action: 'create_content',
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
      console.error('[CODY] Error logging failure:', logError);
    }

    return errorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      500
    );
  }
});
