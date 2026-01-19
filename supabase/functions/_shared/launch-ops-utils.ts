// Launch Ops Agent System - Shared Utilities
// Common functions used across all agent Edge Functions

import { createClient, SupabaseClient } from 'npm:@supabase/supabase-js@2';
import type { AgentLog, AgentName, BrandGuardrails, BrandGuardrailsConfig } from './launch-ops-types.ts';

// CORS headers for all Launch Ops endpoints
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

// Create Supabase client with service role for agent operations
export function createServiceClient(): SupabaseClient {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Fetch active brand guardrails from database
export async function getActiveGuardrails(supabase: SupabaseClient): Promise<BrandGuardrailsConfig | null> {
  const { data, error } = await supabase
    .from('brand_guardrails')
    .select('guardrails')
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('[GUARDRAILS] Error fetching guardrails:', error);
    return null;
  }

  return data?.guardrails as BrandGuardrailsConfig;
}

// Log agent activity to database
export async function logAgentActivity(
  supabase: SupabaseClient,
  log: Omit<AgentLog, 'id' | 'created_at'>
): Promise<void> {
  const { error } = await supabase.from('agent_logs').insert(log);

  if (error) {
    console.error('[AGENT LOG] Error logging activity:', error);
  }
}

// Call OpenAI API with structured output
export async function callOpenAI<T>(
  systemPrompt: string,
  userPrompt: string,
  model: string = 'gpt-4o-mini',
  responseFormat?: { type: 'json_object' }
): Promise<{ result: T; usage: { prompt_tokens: number; completion_tokens: number } }> {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: responseFormat,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;

  if (!content) {
    throw new Error('No content in OpenAI response');
  }

  let result: T;
  if (responseFormat?.type === 'json_object') {
    result = JSON.parse(content) as T;
  } else {
    result = content as T;
  }

  return {
    result,
    usage: {
      prompt_tokens: data.usage?.prompt_tokens || 0,
      completion_tokens: data.usage?.completion_tokens || 0,
    },
  };
}

// Generate content hash for deduplication
export function generateContentHash(content: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(content.toLowerCase().trim());
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data[i];
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

// Validate required fields in request
export function validateRequiredFields<T extends Record<string, unknown>>(
  data: T,
  requiredFields: (keyof T)[]
): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      missing.push(String(field));
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}

// Create error response
export function errorResponse(message: string, status: number = 400): Response {
  return new Response(
    JSON.stringify({ success: false, error: message }),
    {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}

// Create success response
export function successResponse<T>(data: T, status: number = 200): Response {
  return new Response(
    JSON.stringify({ success: true, data }),
    {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}

// Handle CORS preflight
export function handleCors(req: Request): Response | null {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  return null;
}

// Measure execution time
export function createTimer(): { elapsed: () => number } {
  const start = performance.now();
  return {
    elapsed: () => Math.round(performance.now() - start),
  };
}

// Retrieve similar memories using vector search
export async function getSimilarMemories(
  supabase: SupabaseClient,
  queryText: string,
  matchCount: number = 5,
  matchThreshold: number = 0.7
): Promise<Array<{ content_type: string; content_text: string; metadata: unknown; similarity: number }>> {
  // First, generate embedding for the query
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) {
    console.warn('[MEMORY] OpenAI API key not configured, skipping memory retrieval');
    return [];
  }

  try {
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: queryText,
      }),
    });

    if (!embeddingResponse.ok) {
      console.error('[MEMORY] Failed to generate embedding');
      return [];
    }

    const embeddingData = await embeddingResponse.json();
    const embedding = embeddingData.data[0]?.embedding;

    if (!embedding) {
      return [];
    }

    // Call the match_campaign_memories function
    const { data, error } = await supabase.rpc('match_campaign_memories', {
      query_embedding: embedding,
      match_threshold: matchThreshold,
      match_count: matchCount,
    });

    if (error) {
      console.error('[MEMORY] Error retrieving memories:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('[MEMORY] Error:', error);
    return [];
  }
}

// Store memory with embedding
export async function storeMemory(
  supabase: SupabaseClient,
  contentType: string,
  contentText: string,
  metadata: unknown,
  campaignId?: string,
  postId?: string
): Promise<boolean> {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) {
    console.warn('[MEMORY] OpenAI API key not configured, skipping memory storage');
    return false;
  }

  try {
    // Generate embedding
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: contentText,
      }),
    });

    if (!embeddingResponse.ok) {
      console.error('[MEMORY] Failed to generate embedding');
      return false;
    }

    const embeddingData = await embeddingResponse.json();
    const embedding = embeddingData.data[0]?.embedding;

    if (!embedding) {
      return false;
    }

    // Store in database
    const { error } = await supabase.from('campaign_memory').insert({
      content_type: contentType,
      content_text: contentText,
      metadata,
      embedding,
      campaign_id: campaignId,
      post_id: postId,
    });

    if (error) {
      console.error('[MEMORY] Error storing memory:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[MEMORY] Error:', error);
    return false;
  }
}
