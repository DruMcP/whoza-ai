// Launch Ops - Orchestrator Agent - Self-contained version
// Coordinates all agents and manages campaign workflow

import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

// ============================================
// TYPES
// ============================================

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
type CampaignStatus = 'draft' | 'strategizing' | 'creating' | 'reviewing' | 'approved' | 'scheduled' | 'completed' | 'failed';
type AgentName = 'orchestrator' | 'mara' | 'cody' | 'leo' | 'scheduler';
type AgentLogStatus = 'success' | 'error' | 'retry';

interface OrchestratorInput {
  action: 'create_campaign' | 'generate_content' | 'check_compliance' | 'approve_post' | 'reject_post' | 'get_status';
  campaign_id?: string;
  post_id?: string;
  campaign_goal?: string;
  target_trade?: string;
  target_territory?: string;
  duration_weeks?: number;
  rejection_reason?: string;
}

interface OrchestratorOutput {
  success: boolean;
  message: string;
  campaign_id?: string;
  post_id?: string;
  status?: CampaignStatus;
  data?: Json;
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

async function logAgentActivity(supabase: ReturnType<typeof createServiceClient>, log: AgentLog): Promise<void> {
  const { error } = await supabase.from('agent_logs').insert(log);
  if (error) console.error('[AGENT LOG] Error:', error);
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
// AGENT CALLERS
// ============================================

async function callAgent(agentName: string, payload: Record<string, unknown>): Promise<{ success: boolean; data?: unknown; error?: string }> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  const functionUrl = `${supabaseUrl}/functions/v1/launch-ops-${agentName}`;
  
  try {
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`[ORCHESTRATOR] Error calling ${agentName}:`, error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// ============================================
// ACTION HANDLERS
// ============================================

async function handleCreateCampaign(
  supabase: ReturnType<typeof createServiceClient>,
  input: OrchestratorInput
): Promise<OrchestratorOutput> {
  const { campaign_goal, target_trade, target_territory, duration_weeks } = input;

  if (!campaign_goal || !target_trade || !duration_weeks) {
    return { success: false, message: 'Missing required fields: campaign_goal, target_trade, duration_weeks' };
  }

  // Create campaign record
  const { data: campaign, error: createError } = await supabase
    .from('launch_ops_campaigns')
    .insert({
      name: `${target_trade} Campaign - ${new Date().toISOString().split('T')[0]}`,
      goal: campaign_goal,
      target_trade,
      target_territory: target_territory || 'UK',
      status: 'draft',
    })
    .select()
    .single();

  if (createError || !campaign) {
    console.error('[ORCHESTRATOR] Error creating campaign:', createError);
    return { success: false, message: 'Failed to create campaign' };
  }

  console.log(`[ORCHESTRATOR] Campaign created: ${campaign.id}`);

  // Call MARA to create strategy
  const maraResult = await callAgent('mara', {
    campaign_id: campaign.id,
    campaign_goal,
    target_trade,
    target_territory,
    duration_weeks,
  });

  if (!maraResult.success) {
    await supabase.from('launch_ops_campaigns').update({ status: 'failed' }).eq('id', campaign.id);
    return { success: false, message: `Strategy creation failed: ${maraResult.error}`, campaign_id: campaign.id };
  }

  return {
    success: true,
    message: 'Campaign created and strategy generated',
    campaign_id: campaign.id,
    status: 'strategizing',
    data: maraResult.data as Json,
  };
}

async function handleGenerateContent(
  supabase: ReturnType<typeof createServiceClient>,
  input: OrchestratorInput
): Promise<OrchestratorOutput> {
  const { campaign_id } = input;

  if (!campaign_id) {
    return { success: false, message: 'Missing required field: campaign_id' };
  }

  // Get campaign details
  const { data: campaign, error: fetchError } = await supabase
    .from('launch_ops_campaigns')
    .select('*')
    .eq('id', campaign_id)
    .single();

  if (fetchError || !campaign) {
    return { success: false, message: 'Campaign not found' };
  }

  // Get content calendar from strategy
  const contentMix = campaign.content_mix as { calendar?: Array<{ platform: string; content_bucket: string; topic: string }> } | null;
  const calendar = contentMix?.calendar || [];

  if (calendar.length === 0) {
    return { success: false, message: 'No content calendar found. Run strategy first.' };
  }

  // Update campaign status
  await supabase.from('launch_ops_campaigns').update({ status: 'creating' }).eq('id', campaign_id);

  // Generate content for first item in calendar (can be expanded to batch)
  const firstItem = calendar[0];
  
  const codyResult = await callAgent('cody', {
    campaign_id,
    campaign_goal: campaign.goal,
    target_trade: campaign.target_trade,
    platform: firstItem.platform,
    content_bucket: firstItem.content_bucket,
  });

  if (!codyResult.success) {
    return { success: false, message: `Content generation failed: ${codyResult.error}`, campaign_id };
  }

  const codyData = codyResult.data as { post_id?: string } | undefined;

  // Automatically run compliance check
  if (codyData?.post_id) {
    const postData = codyResult.data as { caption?: string; post_id: string };
    const leoResult = await callAgent('leo', {
      content: postData.caption || '',
      platform: firstItem.platform,
      post_id: codyData.post_id,
      campaign_id,
    });

    return {
      success: true,
      message: 'Content generated and compliance checked',
      campaign_id,
      post_id: codyData.post_id,
      status: 'reviewing',
      data: { content: codyResult.data, compliance: leoResult.data } as Json,
    };
  }

  return {
    success: true,
    message: 'Content generated',
    campaign_id,
    status: 'creating',
    data: codyResult.data as Json,
  };
}

async function handleCheckCompliance(
  supabase: ReturnType<typeof createServiceClient>,
  input: OrchestratorInput
): Promise<OrchestratorOutput> {
  const { post_id, campaign_id } = input;

  if (!post_id) {
    return { success: false, message: 'Missing required field: post_id' };
  }

  // Get post details
  const { data: post, error: fetchError } = await supabase
    .from('launch_ops_posts')
    .select('*')
    .eq('id', post_id)
    .single();

  if (fetchError || !post) {
    return { success: false, message: 'Post not found' };
  }

  const leoResult = await callAgent('leo', {
    content: post.caption,
    platform: post.platform,
    post_id,
    campaign_id: campaign_id || post.campaign_id,
  });

  return {
    success: leoResult.success,
    message: leoResult.success ? 'Compliance check completed' : `Compliance check failed: ${leoResult.error}`,
    post_id,
    campaign_id: campaign_id || post.campaign_id,
    data: leoResult.data as Json,
  };
}

async function handleApprovePost(
  supabase: ReturnType<typeof createServiceClient>,
  input: OrchestratorInput
): Promise<OrchestratorOutput> {
  const { post_id } = input;

  if (!post_id) {
    return { success: false, message: 'Missing required field: post_id' };
  }

  const { error: updateError } = await supabase
    .from('launch_ops_posts')
    .update({ compliance_status: 'approved' })
    .eq('id', post_id);

  if (updateError) {
    return { success: false, message: 'Failed to approve post' };
  }

  return {
    success: true,
    message: 'Post approved and ready for scheduling',
    post_id,
  };
}

async function handleRejectPost(
  supabase: ReturnType<typeof createServiceClient>,
  input: OrchestratorInput
): Promise<OrchestratorOutput> {
  const { post_id, rejection_reason } = input;

  if (!post_id) {
    return { success: false, message: 'Missing required field: post_id' };
  }

  const { error: updateError } = await supabase
    .from('launch_ops_posts')
    .update({
      compliance_status: 'rejected',
      compliance_notes: rejection_reason || 'Rejected by founder',
    })
    .eq('id', post_id);

  if (updateError) {
    return { success: false, message: 'Failed to reject post' };
  }

  return {
    success: true,
    message: 'Post rejected',
    post_id,
  };
}

async function handleGetStatus(
  supabase: ReturnType<typeof createServiceClient>,
  input: OrchestratorInput
): Promise<OrchestratorOutput> {
  const { campaign_id } = input;

  if (!campaign_id) {
    return { success: false, message: 'Missing required field: campaign_id' };
  }

  const { data: campaign, error: campaignError } = await supabase
    .from('launch_ops_campaigns')
    .select('*')
    .eq('id', campaign_id)
    .single();

  if (campaignError || !campaign) {
    return { success: false, message: 'Campaign not found' };
  }

  const { data: posts } = await supabase
    .from('launch_ops_posts')
    .select('id, platform, content_bucket, compliance_status, created_at')
    .eq('campaign_id', campaign_id)
    .order('created_at', { ascending: false });

  const { data: logs } = await supabase
    .from('agent_logs')
    .select('agent_name, action, status, created_at')
    .eq('campaign_id', campaign_id)
    .order('created_at', { ascending: false })
    .limit(10);

  return {
    success: true,
    message: 'Campaign status retrieved',
    campaign_id,
    status: campaign.status as CampaignStatus,
    data: {
      campaign,
      posts: posts || [],
      recent_activity: logs || [],
    } as Json,
  };
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

    const body = await req.json() as OrchestratorInput;
    const validation = validateRequiredFields(body, ['action']);
    if (!validation.valid) return errorResponse(`Missing required fields: ${validation.missing.join(', ')}`);

    const { action } = body;
    const validActions = ['create_campaign', 'generate_content', 'check_compliance', 'approve_post', 'reject_post', 'get_status'];
    if (!validActions.includes(action)) {
      return errorResponse(`Invalid action. Must be one of: ${validActions.join(', ')}`);
    }

    console.log(`[ORCHESTRATOR] Handling action: ${action}`);

    const supabase = createServiceClient();
    let result: OrchestratorOutput;

    switch (action) {
      case 'create_campaign':
        result = await handleCreateCampaign(supabase, body);
        break;
      case 'generate_content':
        result = await handleGenerateContent(supabase, body);
        break;
      case 'check_compliance':
        result = await handleCheckCompliance(supabase, body);
        break;
      case 'approve_post':
        result = await handleApprovePost(supabase, body);
        break;
      case 'reject_post':
        result = await handleRejectPost(supabase, body);
        break;
      case 'get_status':
        result = await handleGetStatus(supabase, body);
        break;
      default:
        result = { success: false, message: 'Unknown action' };
    }

    await logAgentActivity(supabase, {
      campaign_id: body.campaign_id || result.campaign_id || null,
      post_id: body.post_id || result.post_id || null,
      agent_name: 'orchestrator',
      action,
      input_data: body as unknown as Json,
      output_data: result as unknown as Json,
      model_used: null,
      prompt_tokens: null,
      completion_tokens: null,
      latency_ms: timer.elapsed(),
      status: result.success ? 'success' : 'error',
      error_message: result.success ? null : result.message,
    });

    return successResponse({ ...result, agent: 'orchestrator', latency_ms: timer.elapsed() });

  } catch (error) {
    console.error('[ORCHESTRATOR] Error:', error);
    try {
      const supabase = createServiceClient();
      await logAgentActivity(supabase, {
        campaign_id: null, post_id: null, agent_name: 'orchestrator', action: 'unknown',
        input_data: null, output_data: null, model_used: null, prompt_tokens: null, completion_tokens: null,
        latency_ms: timer.elapsed(), status: 'error', error_message: error instanceof Error ? error.message : 'Unknown error',
      });
    } catch (logError) { console.error('[ORCHESTRATOR] Error logging failure:', logError); }
    return errorResponse(error instanceof Error ? error.message : 'Internal server error', 500);
  }
});
