import { apiCache } from '../cache/apiCache';
import { logApiUsage } from './usageLogger';
import { supabase } from '../supabase';

const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

const QUERY_TEMPLATES = {
  general: (businessName, service, location) =>
    `Who do you recommend for ${service} in ${location}? Please provide specific business recommendations.`,
  specific: (businessName, service, location) =>
    `Is ${businessName} a good choice for ${service} in ${location}? What do you know about them?`,
  comparison: (businessName, service, location) =>
    `Compare the top ${service} providers in ${location}. Include ${businessName} if relevant.`,
};

function analyzeResponse(responseText, businessName) {
  const lowerResponse = responseText.toLowerCase();
  const lowerBusinessName = businessName.toLowerCase();

  const mentioned = lowerResponse.includes(lowerBusinessName);

  let sentiment = 'none';
  let confidence = 0;
  let contextSnippet = null;

  if (mentioned) {
    const positiveWords = ['recommend', 'excellent', 'quality', 'professional', 'trusted', 'reliable', 'best', 'top'];
    const negativeWords = ['avoid', 'poor', 'bad', 'complaint', 'issue', 'problem'];

    const positiveCount = positiveWords.filter(word => lowerResponse.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerResponse.includes(word)).length;

    if (positiveCount > negativeCount) {
      sentiment = 'positive';
      confidence = Math.min(positiveCount * 0.2, 1.0);
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative';
      confidence = Math.min(negativeCount * 0.2, 1.0);
    } else {
      sentiment = 'neutral';
      confidence = 0.5;
    }

    const businessNameIndex = lowerResponse.indexOf(lowerBusinessName);
    const snippetStart = Math.max(0, businessNameIndex - 100);
    const snippetEnd = Math.min(responseText.length, businessNameIndex + lowerBusinessName.length + 100);
    contextSnippet = responseText.substring(snippetStart, snippetEnd);
  }

  return { mentioned, sentiment, confidence, contextSnippet };
}

async function callPerplexityAPI(query, userId, businessId) {
  const startTime = Date.now();

  try {
    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that provides accurate information about local businesses. Be specific and honest in your recommendations.',
          },
          {
            role: 'user',
            content: query,
          },
        ],
        temperature: 0.2,
        max_tokens: 1000,
      }),
    });

    const responseTimeMs = Date.now() - startTime;
    const statusCode = response.status;

    if (!response.ok) {
      const errorText = await response.text();
      await logApiUsage({
        provider: 'perplexity',
        endpoint: '/chat/completions',
        userId,
        businessId,
        statusCode,
        errorMessage: errorText,
        responseTimeMs,
        cacheHit: false,
      });

      throw new Error(`Perplexity API error: ${statusCode} - ${errorText}`);
    }

    const data = await response.json();

    const requestTokens = data.usage?.prompt_tokens || 0;
    const responseTokens = data.usage?.completion_tokens || 0;

    await logApiUsage({
      provider: 'perplexity',
      endpoint: '/chat/completions',
      userId,
      businessId,
      requestTokens,
      responseTokens,
      statusCode,
      responseTimeMs,
      cacheHit: false,
    });

    return {
      content: data.choices[0]?.message?.content || '',
      usage: data.usage,
      citations: data.citations || [],
    };
  } catch (error) {
    const responseTimeMs = Date.now() - startTime;
    await logApiUsage({
      provider: 'perplexity',
      endpoint: '/chat/completions',
      userId,
      businessId,
      statusCode: 0,
      errorMessage: error.message,
      responseTimeMs,
      cacheHit: false,
    });

    throw error;
  }
}

export async function checkBusinessVisibility(businessId, userId, queryType = 'general') {
  try {
    if (!PERPLEXITY_API_KEY || PERPLEXITY_API_KEY === 'your-perplexity-api-key-here') {
      throw new Error('Perplexity API key not configured');
    }

    const { data: profile } = await supabase
      .from('business_profiles')
      .select('*, users!inner(*)')
      .eq('id', businessId)
      .single();

    if (!profile) {
      throw new Error('Business profile not found');
    }

    const businessName = profile.users.business_name;
    const service = profile.users.trade_type;
    const location = profile.users.service_area || profile.users.postcode;

    if (!businessName || !service || !location) {
      throw new Error('Business profile incomplete. Need business name, service type, and location.');
    }

    const query = QUERY_TEMPLATES[queryType](businessName, service, location);

    const cacheParams = { businessId, queryType };
    const cachedResult = await apiCache.get('perplexity', 'visibility-check', cacheParams);

    if (cachedResult) {
      await logApiUsage({
        provider: 'perplexity',
        endpoint: '/chat/completions',
        userId,
        businessId,
        statusCode: 200,
        responseTimeMs: 0,
        cacheHit: true,
      });

      return cachedResult;
    }

    const apiResponse = await callPerplexityAPI(query, userId, businessId);

    const analysis = analyzeResponse(apiResponse.content, businessName);

    let visibilityScore = 0;
    if (analysis.mentioned) {
      visibilityScore = 50;
      if (analysis.sentiment === 'positive') {
        visibilityScore += 30 + (analysis.confidence * 20);
      } else if (analysis.sentiment === 'neutral') {
        visibilityScore += 15;
      }
    }

    const result = {
      query,
      response: apiResponse.content,
      citations: apiResponse.citations,
      analysis,
      visibilityScore: Math.round(visibilityScore),
      checkedAt: new Date().toISOString(),
    };

    await apiCache.set('perplexity', 'visibility-check', cacheParams, result, 200);

    const { error: checkError } = await supabase
      .from('visibility_checks')
      .insert({
        business_id: businessId,
        check_type: 'perplexity_query',
        query,
        provider: 'perplexity',
        response_data: { full_response: apiResponse },
        visibility_score: result.visibilityScore,
        mentioned: analysis.mentioned,
        sentiment: analysis.sentiment,
        confidence: analysis.confidence,
        context_snippet: analysis.contextSnippet,
        metadata: { query_type: queryType },
      });

    if (checkError) {
    }

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getVisibilityHistory(businessId, limit = 10) {
  try {
    const { data, error } = await supabase
      .from('visibility_checks')
      .select('*')
      .eq('business_id', businessId)
      .eq('check_type', 'perplexity_query')
      .order('checked_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data || [];
  } catch (error) {
    return [];
  }
}
