// Launch Ops - Orchestrator Agent
// Coordinates all agents and manages the campaign workflow

import {
  corsHeaders,
  createServiceClient,
  logAgentActivity,
  errorResponse,
  successResponse,
  handleCors,
  createTimer,
  validateRequiredFields,
  storeMemory,
} from '../_shared/launch-ops-utils.ts';

import type {
  OrchestratorInput,
  OrchestratorOutput,
  CampaignStatus,
  LaunchOpsCampaign,
  LaunchOpsPost,
  Json,
} from '../_shared/launch-ops-types.ts';

// Get the base URL for calling other edge functions
function getEdgeFunctionUrl(functionName: string): string {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  if (!supabaseUrl) {
    throw new Error('SUPABASE_URL not configured');
  }
  return `${supabaseUrl}/functions/v1/${functionName}`;
}

// Call another edge function
async function callEdgeFunction<T>(
  functionName: string,
  payload: unknown
): Promise<{ success: boolean; data?: T; error?: string }> {
  const url = getEdgeFunctionUrl(functionName);
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY not configured');
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceKey}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`[ORCHESTRATOR] Error calling ${functionName}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Create a new campaign
async function createCampaign(
  supabase: ReturnType<typeof createServiceClient>,
  goal: string,
  targetTrade: string,
  targetTerritory?: string
): Promise<{ success: boolean; campaign_id?: string; error?: string }> {
  const { data, error } = await supabase
    .from('launch_ops_campaigns')
    .insert({
      name: `${targetTrade} Campaign - ${new Date().toLocaleDateString('en-GB')}`,
      goal,
      target_trade: targetTrade,
      target_territory: targetTerritory || 'UK',
      status: 'draft',
    })
    .select()
    .single();

  if (error) {
    console.error('[ORCHESTRATOR] Error creating campaign:', error);
    return { success: false, error: error.message };
  }

  return { success: true, campaign_id: data.id };
}

// Generate strategy using MARA
async function generateStrategy(
  campaignId: string,
  goal: string,
  targetTrade: string,
  targetTerritory?: string,
  durationWeeks: number = 4
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  return callEdgeFunction('launch-ops-mara', {
    campaign_id: campaignId,
    campaign_goal: goal,
    target_trade: targetTrade,
    target_territory: targetTerritory,
    duration_weeks: durationWeeks,
  });
}

// Generate content using Cody
async function generateContent(
  campaignId: string,
  goal: string,
  targetTrade: string,
  platform: string,
  contentBucket: string
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  return callEdgeFunction('launch-ops-cody', {
    campaign_id: campaignId,
    campaign_goal: goal,
    target_trade: targetTrade,
    platform,
    content_bucket: contentBucket,
  });
}

// Check compliance using Leo
async function checkCompliance(
  content: string,
  platform: string,
  postId?: string,
  campaignId?: string
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  return callEdgeFunction('launch-ops-leo', {
    content,
    platform,
    post_id: postId,
    campaign_id: campaignId,
  });
}

// Get campaign status
async function getCampaignStatus(
  supabase: ReturnType<typeof createServiceClient>,
  campaignId: string
): Promise<{ campaign: LaunchOpsCampaign | null; posts: LaunchOpsPost[]; error?: string }> {
  // Get campaign
  const { data: campaign, error: campaignError } = await supabase
    .from('launch_ops_campaigns')
    .select('*')
    .eq('id', campaignId)
    .single();

  if (campaignError) {
    return { campaign: null, posts: [], error: campaignError.message };
  }

  // Get posts
  const { data: posts, error: postsError } = await supabase
    .from('launch_ops_posts')
    .select('*')
    .eq('campaign_id', campaignId)
    .order('created_at', { ascending: false });

  if (postsError) {
    return { campaign, posts: [], error: postsError.message };
  }

  return { campaign, posts: posts || [] };
}

// Approve a post
async function approvePost(
  supabase: ReturnType<typeof createServiceClient>,
  postId: string,
  approvedBy?: string
): Promise<{ success: boolean; error?: string }> {
  const { data: post, error: fetchError } = await supabase
    .from('launch_ops_posts')
    .select('*, launch_ops_campaigns(*)')
    .eq('id', postId)
    .single();

  if (fetchError || !post) {
    return { success: false, error: 'Post not found' };
  }

  // Update post status
  const { error: updateError } = await supabase
    .from('launch_ops_posts')
    .update({
      compliance_status: 'approved',
    })
    .eq('id', postId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  // Store successful content in memory for future reference
  await storeMemory(
    supabase,
    'successful_post',
    post.caption,
    {
      platform: post.platform,
      content_bucket: post.content_bucket,
      hook: post.hook,
      hashtags: post.hashtags,
    },
    post.campaign_id,
    postId
  );

  return { success: true };
}

// Reject a post with feedback
async function rejectPost(
  supabase: ReturnType<typeof createServiceClient>,
  postId: string,
  reason: string
): Promise<{ success: boolean; error?: string }> {
  const { data: post, error: fetchError } = await supabase
    .from('launch_ops_posts')
    .select('*')
    .eq('id', postId)
    .single();

  if (fetchError || !post) {
    return { success: false, error: 'Post not found' };
  }

  // Update post status
  const { error: updateError } = await supabase
    .from('launch_ops_posts')
    .update({
      compliance_status: 'rejected',
      compliance_notes: reason,
    })
    .eq('id', postId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  // Store rejection as a learning
  await storeMemory(
    supabase,
    'failed_post',
    `Rejected: ${post.caption.substring(0, 200)}... Reason: ${reason}`,
    {
      platform: post.platform,
      content_bucket: post.content_bucket,
      rejection_reason: reason,
    },
    post.campaign_id,
    postId
  );

  return { success: true };
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
    const body = await req.json() as OrchestratorInput;

    // Validate action
    const validActions = ['create_campaign', 'generate_content', 'check_compliance', 'approve_post', 'reject_post', 'get_status'];
    if (!body.action || !validActions.includes(body.action)) {
      return errorResponse(`Invalid action. Must be one of: ${validActions.join(', ')}`);
    }

    console.log(`[ORCHESTRATOR] Action: ${body.action}`);

    // Create Supabase client
    const supabase = createServiceClient();

    let result: OrchestratorOutput;

    switch (body.action) {
      case 'create_campaign': {
        // Validate required fields for campaign creation
        const validation = validateRequiredFields(body, ['campaign_goal', 'target_trade']);
        if (!validation.valid) {
          return errorResponse(`Missing required fields: ${validation.missing.join(', ')}`);
        }

        // Create the campaign
        const createResult = await createCampaign(
          supabase,
          body.campaign_goal!,
          body.target_trade!,
          body.target_territory
        );

        if (!createResult.success) {
          return errorResponse(createResult.error || 'Failed to create campaign');
        }

        // Generate strategy automatically
        const strategyResult = await generateStrategy(
          createResult.campaign_id!,
          body.campaign_goal!,
          body.target_trade!,
          body.target_territory,
          body.duration_weeks || 4
        );

        result = {
          success: true,
          message: strategyResult.success 
            ? 'Campaign created and strategy generated successfully'
            : 'Campaign created but strategy generation failed',
          campaign_id: createResult.campaign_id,
          status: strategyResult.success ? 'strategizing' : 'draft',
          data: strategyResult.data as Json,
        };
        break;
      }

      case 'generate_content': {
        // Validate required fields
        if (!body.campaign_id) {
          return errorResponse('campaign_id is required');
        }

        // Get campaign details
        const { campaign, error: statusError } = await getCampaignStatus(supabase, body.campaign_id);
        if (!campaign) {
          return errorResponse(statusError || 'Campaign not found');
        }

        // Get the strategy to determine what content to create
        const strategyBrief = campaign.strategy_brief as { content_calendar?: Array<{ platform: string; content_bucket: string; topic: string }> };
        const calendar = strategyBrief?.content_calendar || [];

        if (calendar.length === 0) {
          return errorResponse('No content calendar found. Generate strategy first.');
        }

        // Find the next item in the calendar that doesn't have content yet
        const { data: existingPosts } = await supabase
          .from('launch_ops_posts')
          .select('platform, content_bucket')
          .eq('campaign_id', body.campaign_id);

        const existingCombos = new Set(
          (existingPosts || []).map(p => `${p.platform}-${p.content_bucket}`)
        );

        const nextItem = calendar.find(
          item => !existingCombos.has(`${item.platform}-${item.content_bucket}`)
        );

        if (!nextItem) {
          result = {
            success: true,
            message: 'All content from the calendar has been created',
            campaign_id: body.campaign_id,
            status: campaign.status as CampaignStatus,
          };
          break;
        }

        // Generate content for the next item
        const contentResult = await generateContent(
          body.campaign_id,
          campaign.goal,
          campaign.target_trade,
          nextItem.platform,
          nextItem.content_bucket
        );

        if (!contentResult.success) {
          return errorResponse(contentResult.error || 'Failed to generate content');
        }

        // Automatically run compliance check
        const contentData = contentResult.data as { caption: string; post_id: string };
        const complianceResult = await checkCompliance(
          contentData.caption,
          nextItem.platform,
          contentData.post_id,
          body.campaign_id
        );

        result = {
          success: true,
          message: 'Content generated and compliance checked',
          campaign_id: body.campaign_id,
          post_id: contentData.post_id,
          status: 'creating',
          data: {
            content: contentData,
            compliance: complianceResult.data,
          } as Json,
        };
        break;
      }

      case 'check_compliance': {
        // Validate required fields
        if (!body.post_id) {
          return errorResponse('post_id is required');
        }

        // Get the post
        const { data: post, error: postError } = await supabase
          .from('launch_ops_posts')
          .select('*')
          .eq('id', body.post_id)
          .single();

        if (postError || !post) {
          return errorResponse('Post not found');
        }

        // Run compliance check
        const complianceResult = await checkCompliance(
          post.caption,
          post.platform,
          post.id,
          post.campaign_id
        );

        result = {
          success: complianceResult.success,
          message: complianceResult.success ? 'Compliance check completed' : 'Compliance check failed',
          post_id: body.post_id,
          campaign_id: post.campaign_id,
          data: complianceResult.data as Json,
        };
        break;
      }

      case 'approve_post': {
        if (!body.post_id) {
          return errorResponse('post_id is required');
        }

        const approveResult = await approvePost(supabase, body.post_id);

        if (!approveResult.success) {
          return errorResponse(approveResult.error || 'Failed to approve post');
        }

        result = {
          success: true,
          message: 'Post approved successfully',
          post_id: body.post_id,
          status: 'approved',
        };
        break;
      }

      case 'reject_post': {
        if (!body.post_id) {
          return errorResponse('post_id is required');
        }

        if (!body.rejection_reason) {
          return errorResponse('rejection_reason is required');
        }

        const rejectResult = await rejectPost(supabase, body.post_id, body.rejection_reason);

        if (!rejectResult.success) {
          return errorResponse(rejectResult.error || 'Failed to reject post');
        }

        result = {
          success: true,
          message: 'Post rejected with feedback stored for learning',
          post_id: body.post_id,
          status: 'reviewing',
        };
        break;
      }

      case 'get_status': {
        if (!body.campaign_id) {
          return errorResponse('campaign_id is required');
        }

        const { campaign, posts, error: statusError } = await getCampaignStatus(supabase, body.campaign_id);

        if (!campaign) {
          return errorResponse(statusError || 'Campaign not found');
        }

        // Calculate stats
        const stats = {
          total_posts: posts.length,
          pending: posts.filter(p => p.compliance_status === 'pending').length,
          approved: posts.filter(p => p.compliance_status === 'approved').length,
          rejected: posts.filter(p => p.compliance_status === 'rejected').length,
          by_platform: {} as Record<string, number>,
          by_bucket: {} as Record<string, number>,
        };

        for (const post of posts) {
          stats.by_platform[post.platform] = (stats.by_platform[post.platform] || 0) + 1;
          stats.by_bucket[post.content_bucket] = (stats.by_bucket[post.content_bucket] || 0) + 1;
        }

        result = {
          success: true,
          message: 'Campaign status retrieved',
          campaign_id: body.campaign_id,
          status: campaign.status as CampaignStatus,
          data: {
            campaign,
            posts,
            stats,
          } as Json,
        };
        break;
      }

      default:
        return errorResponse('Invalid action');
    }

    // Log the orchestrator activity
    await logAgentActivity(supabase, {
      campaign_id: result.campaign_id || null,
      post_id: result.post_id || null,
      agent_name: 'orchestrator',
      action: body.action,
      input_data: body as Json,
      output_data: result as Json,
      model_used: null,
      prompt_tokens: null,
      completion_tokens: null,
      latency_ms: timer.elapsed(),
      status: result.success ? 'success' : 'error',
      error_message: result.success ? null : result.message,
    });

    return successResponse({
      ...result,
      agent: 'orchestrator',
      latency_ms: timer.elapsed(),
    });

  } catch (error) {
    console.error('[ORCHESTRATOR] Error:', error);

    // Log the error
    try {
      const supabase = createServiceClient();
      await logAgentActivity(supabase, {
        campaign_id: null,
        post_id: null,
        agent_name: 'orchestrator',
        action: 'unknown',
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
      console.error('[ORCHESTRATOR] Error logging failure:', logError);
    }

    return errorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      500
    );
  }
});
