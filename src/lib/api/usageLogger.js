import { supabase } from '../supabase';

const COST_PER_TOKEN = {
  'openai-gpt4o-mini': {
    input: 0.00015 / 1000,
    output: 0.0006 / 1000,
  },
  'perplexity-sonar': {
    input: 0.001 / 1000,
    output: 0.001 / 1000,
  },
  'google-places': {
    per_request: 0.017,
  },
};

export async function logApiUsage({
  provider,
  endpoint,
  userId = null,
  businessId = null,
  requestTokens = 0,
  responseTokens = 0,
  cacheHit = false,
  statusCode,
  errorMessage = null,
  responseTimeMs,
  model = null,
}) {
  try {
    let costEstimate = 0;

    if (provider === 'openai' && model) {
      const costs = COST_PER_TOKEN[model] || COST_PER_TOKEN['openai-gpt4o-mini'];
      costEstimate = (requestTokens * costs.input) + (responseTokens * costs.output);
    } else if (provider === 'perplexity') {
      const costs = COST_PER_TOKEN['perplexity-sonar'];
      costEstimate = (requestTokens * costs.input) + (responseTokens * costs.output);
    } else if (provider === 'google_places') {
      costEstimate = cacheHit ? 0 : COST_PER_TOKEN['google-places'].per_request;
    }

    const { error } = await supabase
      .from('api_usage_log')
      .insert({
        provider,
        endpoint,
        user_id: userId,
        business_id: businessId,
        request_tokens: requestTokens,
        response_tokens: responseTokens,
        cost_estimate_usd: costEstimate,
        cache_hit: cacheHit,
        status_code: statusCode,
        error_message: errorMessage,
        response_time_ms: responseTimeMs,
      });

    if (error) {
      // TODO: Review error handling: console.error('Failed to log API usage:', error)
    }
  } catch (error) {
    // TODO: Review error handling: console.error('Error in logApiUsage:', error)
  }
}

export async function getApiUsageStats(userId = null, days = 30) {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    let query = supabase
      .from('api_usage_log')
      .select('provider, cost_estimate_usd, cache_hit, created_at')
      .gte('created_at', startDate.toISOString());

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) throw error;

    const stats = {
      total_cost: 0,
      total_calls: data.length,
      cache_hits: 0,
      by_provider: {},
    };

    data.forEach(log => {
      stats.total_cost += Number(log.cost_estimate_usd);
      if (log.cache_hit) stats.cache_hits++;

      if (!stats.by_provider[log.provider]) {
        stats.by_provider[log.provider] = {
          calls: 0,
          cost: 0,
          cache_hits: 0,
        };
      }

      stats.by_provider[log.provider].calls++;
      stats.by_provider[log.provider].cost += Number(log.cost_estimate_usd);
      if (log.cache_hit) stats.by_provider[log.provider].cache_hits++;
    });

    return stats;
  } catch (error) {
    // TODO: Review error handling: console.error('Error getting API usage stats:', error)
    return null;
  }
}
