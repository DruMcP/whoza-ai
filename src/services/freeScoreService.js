import { supabase, supabaseUrl, supabaseAnonKey } from '../lib/supabase';
import { findBusinessByName } from '../lib/api/googlePlacesService';

/**
 * Free Visibility Confidence Score™ Service - WITH REAL API DATA
 *
 * Provides honest, verifiable Visibility Confidence Scores™ using Google Places API.
 * No artificial randomization - scores based on actual business verification.
 */

/**
 * Calculate ECE pillar scores from Google Places data
 */
function calculatePillarScores(googleData, businessInfo) {
  const pillarScores = {
    CLARITY: { score: 0, maxScore: 20 },
    CONSENSUS: { score: 0, maxScore: 20 },
    ANSWERABILITY: { score: 0, maxScore: 20 },
    SAFETY: { score: 0, maxScore: 20 },
    CONTEXT: { score: 0, maxScore: 20 }
  };

  // CLARITY: How clearly AI can identify the business
  pillarScores.CLARITY.score += 5; // Base points
  if (googleData.found && googleData.candidates.length > 0) {
    pillarScores.CLARITY.score += 10;
  }
  if (businessInfo.business_name.length > 5) {
    pillarScores.CLARITY.score += 5;
  }

  // CONSENSUS: Agreement across sources
  pillarScores.CONSENSUS.score += 5; // Base points
  if (googleData.found && googleData.candidates.length > 0) {
    pillarScores.CONSENSUS.score += 10;
  }
  if (businessInfo.website_url && businessInfo.website_url.trim()) {
    pillarScores.CONSENSUS.score += 5;
  }

  // ANSWERABILITY: Content ready for AI answers
  pillarScores.ANSWERABILITY.score += 5; // Base points
  const specificTrades = [
    'Electrician', 'Plumber', 'Builder', 'Carpenter', 'Painter',
    'Roofer', 'Landscaper', 'HVAC', 'Plasterer', 'Tiler', 'Decorator'
  ];
  if (specificTrades.some(trade =>
    businessInfo.trade_type.toLowerCase().includes(trade.toLowerCase())
  )) {
    pillarScores.ANSWERABILITY.score += 8;
  }
  if (businessInfo.location && businessInfo.location.length > 3) {
    pillarScores.ANSWERABILITY.score += 7;
  }

  // SAFETY: Trust and safety signals
  pillarScores.SAFETY.score += 5; // Base points
  if (googleData.found && googleData.candidates.length > 0) {
    pillarScores.SAFETY.score += 10;
  }
  if (businessInfo.website_url && businessInfo.website_url.trim()) {
    pillarScores.SAFETY.score += 5;
  }

  // CONTEXT: Relevance to specific situations
  pillarScores.CONTEXT.score += 5; // Base points
  if (businessInfo.location && businessInfo.location.length > 3) {
    pillarScores.CONTEXT.score += 8;
  }
  if (specificTrades.some(trade =>
    businessInfo.trade_type.toLowerCase().includes(trade.toLowerCase())
  )) {
    pillarScores.CONTEXT.score += 7;
  }

  return pillarScores;
}

/**
 * Calculate free score from REAL Google Places data
 */
function calculateFreeScoreFromGoogleData(googleData, businessInfo) {
  let score = 20;
  let factors = [];

  if (googleData.found && googleData.candidates.length > 0) {
    score += 20;
    factors.push('business found on Google');
  } else {
    factors.push('business NOT found on Google - major visibility gap');
    const pillarScores = calculatePillarScores(googleData, businessInfo);
    return { score, factors, pillarScores };
  }

  if (businessInfo.website_url && businessInfo.website_url.trim()) {
    score += 15;
    factors.push('has website');
  }

  if (businessInfo.business_name.length > 3) {
    score += 10;
    factors.push('clear business name');
  }

  if (businessInfo.location && businessInfo.location.length > 3) {
    score += 10;
    factors.push('location specified');
  }

  const specificTrades = [
    'Electrician', 'Plumber', 'Builder', 'Carpenter', 'Painter',
    'Roofer', 'Landscaper', 'HVAC', 'Plasterer', 'Tiler', 'Decorator'
  ];
  if (specificTrades.some(trade =>
    businessInfo.trade_type.toLowerCase().includes(trade.toLowerCase())
  )) {
    score += 10;
    factors.push('specific trade category');
  }

  score = Math.max(20, Math.min(75, score));
  const pillarScores = calculatePillarScores(googleData, businessInfo);

  return { score, factors, pillarScores };
}

/**
 * Determine score band from numeric score
 */
function getScoreBand(score) {
  if (score < 45) return 'Low';
  if (score < 60) return 'Medium';
  return 'High';
}

/**
 * Generate HONEST summary text based on score and real data
 */
function generateSummaryText(score, band, trade_type, factors, googleFound) {
  if (!googleFound) {
    return [
      `Your business is not showing up on Google, which means AI tools like ChatGPT and Perplexity cannot find you.`,
      `This is a critical gap. Without a Google Business Profile, potential customers searching with AI assistants will never see your ${trade_type} business.`,
      `The good news: This can be fixed. Setting up your Google Business Profile is the first and most important step.`
    ].join(' ');
  }

  const summaries = {
    Low: [
      `Your ${trade_type} business has limited visibility when people use AI search tools.`,
      `While you're on Google, there are gaps preventing AI from confidently recommending you.`,
      `Most businesses in your position see significant improvement within 60-90 days of focused work.`
    ],
    Medium: [
      `Your ${trade_type} business appears in some AI search results, but not consistently.`,
      `You have the basics (${factors.slice(0, 2).join(', ')}), but could be much more visible.`,
      `With the right actions, you could move into the top tier where AI actively recommends you.`
    ],
    High: [
      `Your ${trade_type} business has decent visibility in AI search results.`,
      `You're doing several things right (${factors.slice(0, 2).join(', ')}), putting you ahead of competitors.`,
      `There's still room to strengthen your position and ensure consistent AI recommendations.`
    ]
  };

  return summaries[band].join(' ');
}

/**
 * Submit a free score request with REAL Google Places verification
 */
export async function submitFreeScore(formData) {
  try {
    if (!formData.business_name?.trim()) {
      throw new Error('Business name is required');
    }
    if (!formData.trade_type?.trim()) {
      throw new Error('Trade type is required');
    }
    if (!formData.location?.trim()) {
      throw new Error('Location is required');
    }
    if (!formData.email?.trim()) {
      throw new Error('Email address is required');
    }

    const businessInfo = {
      business_name: formData.business_name.trim(),
      trade_type: formData.trade_type.trim(),
      location: formData.location.trim(),
      website_url: formData.website_url?.trim() || null,
      email: formData.email.trim(),
    };

    let googleData = null;
    let score = 20;
    let factors = ['assessment pending'];
    let pillarScores = null;
    let apiCallMade = false;
    let apiError = null;

    try {
      googleData = await findBusinessByName(
        businessInfo.business_name,
        businessInfo.location,
        null,
        null,
        businessInfo.trade_type
      );
      apiCallMade = true;

      const scoreResult = calculateFreeScoreFromGoogleData(googleData, businessInfo);
      score = scoreResult.score;
      factors = scoreResult.factors;
      pillarScores = scoreResult.pillarScores;
    } catch (error) {
      apiError = error.message;

      score = 30;
      factors = ['Google verification unavailable - limited assessment'];

      if (businessInfo.website_url) {
        score += 15;
        factors.push('website provided');
      }
      if (businessInfo.business_name.length > 5) {
        score += 10;
        factors.push('business name looks legitimate');
      }

      pillarScores = calculatePillarScores(
        { found: false, candidates: [] },
        businessInfo
      );
    }

    const band = getScoreBand(score);
    const googleFound = googleData?.found || false;

    const summaryText = generateSummaryText(
      score,
      band,
      businessInfo.trade_type,
      factors,
      googleFound
    );

    const submission = {
      email: businessInfo.email,
      business_name: businessInfo.business_name,
      trade_type: businessInfo.trade_type,
      location: businessInfo.location,
      website_url: businessInfo.website_url,
      calculated_score: score,
      score_band: band,
      summary_text: summaryText,
    };

    let savedData = null;
    let saveError = null;

    
    try {
      const { data, error } = await supabase
        .from('free_score_submissions')
        .insert(submission)
        .select()
        .maybeSingle();

      
      if (error) {
        // TODO: Review error handling: console.error('[FREE SCORE] ❌ Database error:', error)
        // TODO: Review error handling: console.error('[FREE SCORE] Error details:', JSON.stringify(error, null, 2))
        saveError = error;
      } else if (data) {
                savedData = data;
      } else {
        // TODO: Review error handling: console.error('[FREE SCORE] No data returned from insert')
        saveError = new Error('No data returned from insert');
      }
    } catch (dbError) {
      // TODO: Review error handling: console.error('[FREE SCORE] Database exception:', dbError)
      saveError = dbError;
    }

                    
    if (saveError) {
      return {
        data: {
          id: `temp-${Date.now()}`,
          ...submission,
          pillar_scores: pillarScores,
          google_found: googleFound,
          google_check_performed: apiCallMade,
          created_at: new Date().toISOString(),
          database_saved: false,
          save_warning: 'Your score was calculated! Email is handled by verify-free-score function.'
        },
        error: null,
        warning: 'Score calculated! Database save failed - sign up to keep history.'
      };
    }

    return {
      data: {
        ...savedData,
        pillar_scores: pillarScores,
        google_found: googleFound,
        google_check_performed: apiCallMade,
        database_saved: true
      },
      error: null,
      warning: null
    };
  } catch (error) {
    // TODO: Review error handling: console.error('[FREE SCORE] Fatal error:', error)
    return {
      data: null,
      error: error instanceof Error ? error : new Error('An unexpected error occurred')
    };
  }
}

/**
 * Get free score submissions for the current user (after they authenticate)
 */
export async function getUserFreeScores() {
  try {
    const { data, error } = await supabase
      .from('free_score_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    // TODO: Review error handling: console.error('Error fetching user free scores:', error)
    return { data: null, error };
  }
}

/**
 * Get explanation of what the score means and what Rex can do
 */
export function getScoreExplanation(band, googleFound) {
  const explanations = {
    Low: {
      title: googleFound ? 'Building Your Foundation' : 'Critical: Not on Google',
      description: googleFound
        ? 'Your business needs work on the fundamentals that AI tools look for.'
        : 'Your business is not on Google, making it invisible to AI search tools.',
      canImprove: googleFound
        ? 'Rex will help you build a strong foundation step by step, starting with the essentials.'
        : 'Rex will guide you through setting up your Google Business Profile as the first critical step.',
      timeframe: googleFound
        ? 'Most businesses see their score reach Medium within 60 days.'
        : 'Getting on Google takes 1-2 weeks, then we build from there.',
    },
    Medium: {
      title: 'On The Right Track',
      description: 'You have some visibility, but not enough to consistently beat competitors.',
      canImprove: 'Rex will help you strengthen your presence and move into the top tier where AI actively recommends you.',
      timeframe: 'Most businesses reach High scores within 90 days.',
    },
    High: {
      title: 'Strong Starting Position',
      description: 'You\'re doing well, but there are still opportunities to improve.',
      canImprove: 'Rex will help you close the remaining gaps and maintain your competitive edge.',
      timeframe: 'Expect to reach top-tier status within 60 days.',
    }
  };

  return explanations[band];
}

/**
 * Get next steps messaging based on score and Google verification status
 */
export function getNextSteps(band, googleFound) {
  if (!googleFound) {
    return [
      'Set up your Google Business Profile (critical first step)',
      'Verify your business information',
      'Start gathering customer reviews'
    ];
  }

  const nextSteps = {
    Low: [
      'Complete your online profile with accurate information',
      'Start gathering customer reviews',
      'Make your business easy for AI to understand'
    ],
    Medium: [
      'Strengthen your existing online presence',
      'Fill in the gaps AI tools need',
      'Stand out from similar businesses'
    ],
    High: [
      'Close the remaining visibility gaps',
      'Stay ahead of increasing competition',
      'Maintain your strong position long-term'
    ]
  };

  return nextSteps[band];
}

