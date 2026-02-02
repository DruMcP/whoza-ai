import { apiCache } from '../cache/apiCache';
import { logApiUsage } from './usageLogger';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const TASK_GENERATION_SYSTEM_PROMPT = `You are Rex, an AI assistant specializing in helping local trade businesses improve their visibility in AI search results (ChatGPT, Perplexity, etc.) and traditional search engines.

Your task is to analyze a business's current situation and generate ONE specific, actionable task they can complete this week.

The task MUST:
- Be completable in 15-45 minutes
- Have clear, specific copy-paste text if applicable
- Explain WHY it helps with AI visibility
- Be tailored to their specific trade, location, and current gaps
- Focus on the BIGGEST impact opportunity right now

Return ONLY a valid JSON object with this exact structure:
{
  "title": "Short action-oriented title",
  "description": "2-3 sentences explaining what to do",
  "why_it_matters": "1-2 sentences explaining how this improves AI visibility",
  "copy_paste_text": "Exact text to use (or null if not applicable)",
  "where_to_apply": "Specific location/platform where to do this",
  "estimated_minutes": 15-45,
  "expected_impact": "high/medium/low",
  "ece_pillar": "clarity/consensus/answerability/safety/context"
}`;

async function callOpenAI(messages, userId, businessId, model = 'gpt-4o-mini') {
  const startTime = Date.now();

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 1000,
        response_format: { type: 'json_object' },
      }),
    });

    const responseTimeMs = Date.now() - startTime;
    const statusCode = response.status;

    if (!response.ok) {
      const errorText = await response.text();
      await logApiUsage({
        provider: 'openai',
        endpoint: '/chat/completions',
        userId,
        businessId,
        statusCode,
        errorMessage: errorText,
        responseTimeMs,
        cacheHit: false,
        model: `openai-${model}`,
      });

      throw new Error(`OpenAI API error: ${statusCode} - ${errorText}`);
    }

    const data = await response.json();

    const requestTokens = data.usage?.prompt_tokens || 0;
    const responseTokens = data.usage?.completion_tokens || 0;

    await logApiUsage({
      provider: 'openai',
      endpoint: '/chat/completions',
      userId,
      businessId,
      requestTokens,
      responseTokens,
      statusCode,
      responseTimeMs,
      cacheHit: false,
      model: `openai-${model}`,
    });

    return {
      content: data.choices[0]?.message?.content || '',
      usage: data.usage,
      model: data.model,
    };
  } catch (error) {
    const responseTimeMs = Date.now() - startTime;
    await logApiUsage({
      provider: 'openai',
      endpoint: '/chat/completions',
      userId,
      businessId,
      statusCode: 0,
      errorMessage: error.message,
      responseTimeMs,
      cacheHit: false,
      model: `openai-${model}`,
    });

    throw error;
  }
}

export async function generatePersonalizedTask(businessData, visibilityData, userId, businessId) {
  try {
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your-openai-api-key-here') {
      throw new Error('OpenAI API key not configured');
    }

    const cacheParams = {
      businessId,
      dataHash: JSON.stringify({
        name: businessData.business_name,
        trade: businessData.trade_type,
        location: businessData.location,
        hasWebsite: !!businessData.website,
        hasGBP: !!businessData.google_business_url,
        reviewCount: businessData.review_count,
        rating: businessData.rating,
        recentVisibility: visibilityData?.visibility_score,
      }),
    };

    const cachedResult = await apiCache.get('openai', 'task-generation', cacheParams);

    if (cachedResult) {
      await logApiUsage({
        provider: 'openai',
        endpoint: '/chat/completions',
        userId,
        businessId,
        statusCode: 200,
        responseTimeMs: 0,
        cacheHit: true,
        model: 'openai-gpt4o-mini',
      });

      return cachedResult;
    }

    const businessContext = `
Business: ${businessData.business_name}
Trade: ${businessData.trade_type}
Location: ${businessData.location}
Website: ${businessData.website || 'NONE - Major gap!'}
Google Business Profile: ${businessData.google_business_url ? 'YES' : 'NO - Critical missing!'}
Reviews: ${businessData.review_count || 0} reviews (${businessData.rating || 'N/A'} stars)
Current AI Visibility Score: ${visibilityData?.visibility_score || 'Not yet measured'}
${visibilityData?.mentioned === false ? 'CRITICAL: Business NOT mentioned in recent AI search test' : ''}
${visibilityData?.mentioned === true ? `AI Mentions: ${visibilityData.sentiment} sentiment` : ''}

Completed Actions: ${businessData.completed_tasks || 0} tasks completed
Profile Completeness: ${businessData.profile_completeness || 0}%

Key Gaps:
${!businessData.website ? '- NO WEBSITE (massive AI visibility problem)' : ''}
${!businessData.google_business_url ? '- NO Google Business Profile (critical)' : ''}
${(businessData.review_count || 0) < 5 ? '- Insufficient reviews for credibility' : ''}
${!businessData.key_services || businessData.key_services.length === 0 ? '- Services not clearly listed' : ''}
`;

    const userPrompt = `Analyze this trade business and generate THE ONE most impactful task they should do this week to improve their AI visibility:

${businessContext}

Focus on the BIGGEST gap that will most improve how AI answer engines (ChatGPT, Perplexity) find and recommend this business.`;

    const messages = [
      { role: 'system', content: TASK_GENERATION_SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ];

    const apiResponse = await callOpenAI(messages, userId, businessId);

    let taskData;
    try {
      taskData = JSON.parse(apiResponse.content);
    } catch (parseError) {
      throw new Error('Failed to parse AI response as JSON');
    }

    const result = {
      ...taskData,
      generated_at: new Date().toISOString(),
      model_used: apiResponse.model,
    };

    await apiCache.set('openai', 'task-generation', cacheParams, result, 200);

    return result;
  } catch (error) {
    throw error;
  }
}
