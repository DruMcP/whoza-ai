// Supabase Edge Function: generate-trial-weekly-scores
// Purpose: Calculate and store weekly AI visibility scores for Free Trial users
// Trigger: Cron job (weekly) - Every Monday at 3:00 AM
// Integration: Full ECE engine with Google, OpenAI, Perplexity APIs

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as cheerio from 'npm:cheerio@1.0.0-rc.12'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const GOOGLE_PLACES_API_KEY = Deno.env.get('GOOGLE_PLACES_API_KEY')
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY')

interface TrialUser {
  user_id: string
  email: string
  business_name: string
  trade_type: string
  postcode: string
  website_url?: string
  google_business_url?: string
  trial_started_at: string
  trial_ends_at: string
  days_remaining: number
}

interface GooglePlaceData {
  placeId?: string
  displayName?: string
  formattedAddress?: string
  businessStatus?: string
  websiteUri?: string
  rating?: number
  userRatingCount?: number
  types?: string[]
  reviews?: Array<{ text: string; rating: number }>
}

interface WebsiteData {
  exists: boolean
  isSecure: boolean
  hasServicesPage: boolean
  hasContactPage: boolean
  hasAboutPage: boolean
  hasTestimonials: boolean
  hasSocialLinks: boolean
  hasAccreditations: boolean
  bodyText?: string
}

interface ReviewAnalysis {
  positiveThemes: string
  negativeThemes: string
}

interface ContentAnalysis {
  clarity: number
  trustworthiness: number
  expertise: number
}

interface PerplexityResults {
  answerabilityAccurate: boolean
  citesWebsite: boolean
  mentionedInComparison: boolean
}

interface PillarScores {
  clarity: number
  consensus: number
  answerability: number
  safety: number
  context: number
}

interface ScoreResult {
  totalScore: number
  pillarScores: PillarScores
  recommendations: string[]
  insights: string
}

// ============================================================================
// GOOGLE PLACES API INTEGRATION
// ============================================================================

async function searchGooglePlace(businessName: string, location: string): Promise<GooglePlaceData> {
  if (!GOOGLE_PLACES_API_KEY) {
    console.warn('[GOOGLE PLACES] API key not configured')
    return {}
  }

  try {
    const textQuery = `${businessName}, ${location}, UK`
    console.log('[GOOGLE PLACES] Searching for:', textQuery)

    const searchResponse = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName'
      },
      body: JSON.stringify({ textQuery })
    })

    if (!searchResponse.ok) {
      console.error('[GOOGLE PLACES] Search failed:', await searchResponse.text())
      return {}
    }

    const searchData = await searchResponse.json()
    const places = searchData.places || []

    if (places.length === 0) {
      console.log('[GOOGLE PLACES] No places found')
      return {}
    }

    const placeId = places[0].id
    console.log('[GOOGLE PLACES] Found place ID:', placeId)

    const detailsResponse = await fetch(`https://places.googleapis.com/v1/${placeId}`, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': 'id,displayName,formattedAddress,businessStatus,websiteUri,rating,userRatingCount,types,reviews'
      }
    })

    if (!detailsResponse.ok) {
      console.error('[GOOGLE PLACES] Details fetch failed:', await detailsResponse.text())
      return { placeId }
    }

    const placeData = await detailsResponse.json()
    console.log('[GOOGLE PLACES] Place details retrieved successfully')

    return {
      placeId: placeData.id,
      displayName: placeData.displayName?.text,
      formattedAddress: placeData.formattedAddress,
      businessStatus: placeData.businessStatus,
      websiteUri: placeData.websiteUri,
      rating: placeData.rating,
      userRatingCount: placeData.userRatingCount,
      types: placeData.types || [],
      reviews: (placeData.reviews || []).map((r: any) => ({
        text: r.text?.text || '',
        rating: r.rating || 0
      }))
    }
  } catch (error) {
    console.error('[GOOGLE PLACES] Error:', error)
    return {}
  }
}

// ============================================================================
// WEBSITE ANALYSIS
// ============================================================================

async function analyzeWebsite(url: string): Promise<WebsiteData> {
  const defaultData: WebsiteData = {
    exists: false,
    isSecure: false,
    hasServicesPage: false,
    hasContactPage: false,
    hasAboutPage: false,
    hasTestimonials: false,
    hasSocialLinks: false,
    hasAccreditations: false
  }

  if (!url) {
    return defaultData
  }

  try {
    console.log('[WEBSITE ANALYSIS] Analyzing:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; WhozaBot/1.0)'
      },
      signal: AbortSignal.timeout(10000)
    })

    if (response.status !== 200) {
      console.log('[WEBSITE ANALYSIS] Website returned status:', response.status)
      return defaultData
    }

    const html = await response.text()
    const $ = cheerio.load(html)
    const websiteUrl = new URL(url)

    const data: WebsiteData = {
      exists: true,
      isSecure: websiteUrl.protocol === 'https:',
      hasServicesPage: false,
      hasContactPage: false,
      hasAboutPage: false,
      hasTestimonials: false,
      hasSocialLinks: false,
      hasAccreditations: false
    }

    const linkTexts = $('a').map((_, el) => $(el).text().toLowerCase()).get().join(' ')
    const allText = $('body').text().toLowerCase()
    data.bodyText = $('body').text().substring(0, 2000)

    data.hasServicesPage = /services?/i.test(linkTexts)
    data.hasContactPage = /contact/i.test(linkTexts)
    data.hasAboutPage = /about/i.test(linkTexts)
    data.hasTestimonials = /testimonials?|reviews?/i.test(allText)

    const hrefs = $('a').map((_, el) => $(el).attr('href') || '').get().join(' ').toLowerCase()
    data.hasSocialLinks = /facebook\.com|instagram\.com|twitter\.com|linkedin\.com/i.test(hrefs)

    const imgAlts = $('img').map((_, el) => $(el).attr('alt') || '').get().join(' ').toLowerCase()
    data.hasAccreditations = /gas safe|niceic|napit|part p|trustmark|checkatrade|certifi|accredit/i.test(imgAlts + allText)

    console.log('[WEBSITE ANALYSIS] Analysis complete')
    return data
  } catch (error) {
    console.error('[WEBSITE ANALYSIS] Error:', error)
    return defaultData
  }
}

// ============================================================================
// OPENAI ANALYSIS
// ============================================================================

async function analyzeReviewsWithOpenAI(reviews: Array<{ text: string; rating: number }>): Promise<ReviewAnalysis> {
  if (!OPENAI_API_KEY || reviews.length === 0) {
    console.warn('[OPENAI] API key not configured or no reviews available')
    return { positiveThemes: 'No reviews available', negativeThemes: 'No reviews available' }
  }

  try {
    console.log('[OPENAI] Analyzing reviews...')
    const recentReviews = reviews.slice(0, 5)
    const reviewText = recentReviews.map(r => `Rating ${r.rating}/5: ${r.text}`).join('\n\n')

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'user',
          content: `Analyze these customer reviews and identify:\n1. Top 2-3 positive themes\n2. Top 2-3 areas for improvement\n\nReviews:\n${reviewText}\n\nProvide concise bullet points.`
        }],
        max_tokens: 300,
        temperature: 0.3
      })
    })

    if (!response.ok) {
      console.error('[OPENAI] API error:', await response.text())
      return { positiveThemes: 'Analysis unavailable', negativeThemes: 'Analysis unavailable' }
    }

    const data = await response.json()
    const analysis = data.choices[0]?.message?.content || 'No analysis available'
    
    const sections = analysis.split('\n\n')
    return {
      positiveThemes: sections[0] || 'No positive themes identified',
      negativeThemes: sections[1] || 'No areas for improvement identified'
    }
  } catch (error) {
    console.error('[OPENAI] Error:', error)
    return { positiveThemes: 'Analysis failed', negativeThemes: 'Analysis failed' }
  }
}

async function analyzeContentWithOpenAI(websiteText: string, businessName: string, tradeType: string): Promise<ContentAnalysis> {
  if (!OPENAI_API_KEY || !websiteText) {
    return { clarity: 5, trustworthiness: 5, expertise: 5 }
  }

  try {
    console.log('[OPENAI] Analyzing content...')
    const prompt = `Analyze this ${tradeType} business website content for "${businessName}".
Rate each aspect from 1-10:
1. Clarity: How clear and easy to understand is the content?
2. Trustworthiness: Does it build trust with credentials, testimonials, transparency?
3. Expertise: Does it demonstrate professional expertise and knowledge?

Website excerpt:
${websiteText.substring(0, 1000)}

Respond with ONLY three numbers separated by commas (clarity,trustworthiness,expertise).`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 50,
        temperature: 0.3
      })
    })

    if (!response.ok) {
      console.error('[OPENAI] Content analysis error')
      return { clarity: 5, trustworthiness: 5, expertise: 5 }
    }

    const data = await response.json()
    const result = data.choices[0]?.message?.content?.trim() || '5,5,5'
    const scores = result.split(',').map((s: string) => parseInt(s.trim()) || 5)

    return {
      clarity: Math.min(10, Math.max(1, scores[0])),
      trustworthiness: Math.min(10, Math.max(1, scores[1])),
      expertise: Math.min(10, Math.max(1, scores[2]))
    }
  } catch (error) {
    console.error('[OPENAI] Content analysis error:', error)
    return { clarity: 5, trustworthiness: 5, expertise: 5 }
  }
}

// ============================================================================
// PERPLEXITY ANALYSIS
// ============================================================================

async function queryPerplexity(businessName: string, location: string, tradeType: string, websiteUrl?: string): Promise<PerplexityResults> {
  if (!PERPLEXITY_API_KEY) {
    console.warn('[PERPLEXITY] API key not configured')
    return { answerabilityAccurate: false, citesWebsite: false, mentionedInComparison: false }
  }

  try {
    console.log('[PERPLEXITY] Querying...')
    
    const query = `Who is the best ${tradeType} in ${location}, UK?`

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [{ role: 'user', content: query }],
        max_tokens: 500,
        temperature: 0.2
      })
    })

    if (!response.ok) {
      console.error('[PERPLEXITY] API error:', await response.text())
      return { answerabilityAccurate: false, citesWebsite: false, mentionedInComparison: false }
    }

    const data = await response.json()
    const answer = data.choices[0]?.message?.content?.toLowerCase() || ''

    const businessNameLower = businessName.toLowerCase()
    const mentionedInComparison = answer.includes(businessNameLower)
    const citesWebsite = websiteUrl ? answer.includes(websiteUrl.replace(/^https?:\/\/(www\.)?/, '')) : false
    const answerabilityAccurate = mentionedInComparison || citesWebsite

    console.log('[PERPLEXITY] Analysis complete')
    return { answerabilityAccurate, citesWebsite, mentionedInComparison }
  } catch (error) {
    console.error('[PERPLEXITY] Error:', error)
    return { answerabilityAccurate: false, citesWebsite: false, mentionedInComparison: false }
  }
}

// ============================================================================
// ECE SCORING ENGINE
// ============================================================================

function calculateScore(
  googleData: GooglePlaceData,
  websiteData: WebsiteData,
  contentAnalysis: ContentAnalysis,
  perplexityResults: PerplexityResults,
  tradeType: string
): { totalScore: number; pillarScores: PillarScores; recommendations: string[] } {
  const pillarScores: PillarScores = {
    clarity: 0,
    consensus: 0,
    answerability: 0,
    safety: 0,
    context: 0
  }

  const recommendations: string[] = []

  // CLARITY PILLAR (max 20 points)
  if (googleData.placeId) {
    pillarScores.clarity += 5
  } else {
    recommendations.push('Claim your Google Business Profile to appear in local searches')
  }

  if (websiteData.exists && websiteData.isSecure) {
    pillarScores.clarity += 5
  } else if (!websiteData.exists) {
    recommendations.push('Create a professional website to establish online presence')
  } else if (!websiteData.isSecure) {
    recommendations.push('Add SSL certificate (HTTPS) to your website for security and trust')
  }

  if (googleData.formattedAddress) {
    pillarScores.clarity += 5
  }

  pillarScores.clarity += Math.round((contentAnalysis.clarity / 10) * 5)

  // CONSENSUS PILLAR (max 30 points)
  const reviewCount = googleData.userRatingCount || 0
  const rating = googleData.rating || 0

  if (reviewCount === 0) {
    recommendations.push('Encourage customers to leave Google reviews to build trust')
  } else if (reviewCount >= 1 && reviewCount <= 3) {
    pillarScores.consensus += 5
  } else if (reviewCount >= 4 && reviewCount <= 9) {
    pillarScores.consensus += 10
  } else if (reviewCount >= 10 && reviewCount <= 19) {
    pillarScores.consensus += 15
  } else if (reviewCount >= 20 && reviewCount <= 49) {
    pillarScores.consensus += 20
  } else if (reviewCount >= 50) {
    pillarScores.consensus += 25
  }

  if (rating >= 4.5) {
    pillarScores.consensus += 3
  } else if (rating >= 4.0) {
    pillarScores.consensus += 2
  } else if (rating > 0) {
    pillarScores.consensus += 1
  }

  if (perplexityResults.mentionedInComparison) {
    pillarScores.consensus += 2
  }

  // ANSWERABILITY PILLAR (max 20 points)
  if (!websiteData.exists) {
    recommendations.push('Build a website with service details, contact info, and about page')
  } else {
    if (websiteData.hasServicesPage) {
      pillarScores.answerability += 4
    } else {
      recommendations.push('Add a clear services page listing what you offer')
    }

    if (websiteData.hasContactPage) {
      pillarScores.answerability += 4
    } else {
      recommendations.push('Create a contact page with phone, email, and service areas')
    }

    if (websiteData.hasAboutPage) {
      pillarScores.answerability += 3
    }

    if (websiteData.hasTestimonials) {
      pillarScores.answerability += 3
    }

    if (perplexityResults.answerabilityAccurate) {
      pillarScores.answerability += 3
    }

    if (perplexityResults.citesWebsite) {
      pillarScores.answerability += 3
    }
  }

  // SAFETY PILLAR (max 15 points)
  if (websiteData.hasAccreditations) {
    pillarScores.safety += 5
  } else {
    recommendations.push('Display professional accreditations and certifications prominently')
  }

  if (websiteData.hasSocialLinks) {
    pillarScores.safety += 2
  }

  if (rating >= 4.0) {
    pillarScores.safety += 3
  }

  pillarScores.safety += Math.round((contentAnalysis.trustworthiness / 10) * 5)

  // CONTEXT PILLAR (max 15 points)
  const tradeLower = tradeType.toLowerCase()
  const types = (googleData.types || []).map(t => t.toLowerCase())

  const tradeCategories = [
    'electrician', 'plumber', 'carpenter', 'painter', 'builder',
    'roofer', 'heating', 'gas', 'hvac', 'contractor'
  ]

  const hasRelevantCategory = tradeCategories.some(cat =>
    tradeLower.includes(cat) || types.some(t => t.includes(cat))
  )

  if (hasRelevantCategory) {
    pillarScores.context += 5
  }

  if (googleData.formattedAddress) {
    pillarScores.context += 5
  }

  pillarScores.context += Math.round((contentAnalysis.expertise / 10) * 5)

  // CALCULATE TOTAL SCORE
  const totalScore = Math.round(
    pillarScores.clarity +
    pillarScores.consensus +
    pillarScores.answerability +
    pillarScores.safety +
    pillarScores.context
  )

  const topRecommendations = recommendations.slice(0, 3)
  if (topRecommendations.length === 0) {
    topRecommendations.push('Continue building your online presence with regular content updates')
  }

  return { totalScore, pillarScores, recommendations: topRecommendations }
}

// ============================================================================
// GENERATE INSIGHTS
// ============================================================================

function generateInsights(
  totalScore: number,
  pillarScores: PillarScores,
  googleData: GooglePlaceData,
  websiteData: WebsiteData,
  weekNumber: number
): string {
  const insights: string[] = []

  // Week-specific messaging
  if (weekNumber === 1) {
    insights.push(`Welcome to your Free Trial! Your baseline AI visibility score is ${totalScore}/100.`)
  } else {
    insights.push(`Week ${weekNumber} Update: Your AI visibility score is ${totalScore}/100.`)
  }

  // Score-based insights
  if (totalScore < 30) {
    insights.push('Your business has significant opportunities to improve AI visibility.')
  } else if (totalScore < 60) {
    insights.push('You have a foundation, but there\'s room for substantial improvement.')
  } else if (totalScore < 80) {
    insights.push('You\'re doing well! Focus on the recommendations to reach excellence.')
  } else {
    insights.push('Excellent AI visibility! Keep maintaining your strong online presence.')
  }

  // Pillar-specific insights
  const weakestPillar = Object.entries(pillarScores).reduce((min, [key, value]) => 
    value < min.value ? { key, value } : min, 
    { key: '', value: 100 }
  )

  const pillarNames: Record<string, string> = {
    clarity: 'Clarity',
    consensus: 'Consensus',
    answerability: 'Answerability',
    safety: 'Safety',
    context: 'Context'
  }

  insights.push(`Focus area: ${pillarNames[weakestPillar.key]} (${weakestPillar.value} points) - this is your biggest opportunity for improvement.`)

  // Specific actionable insights
  if (!googleData.placeId) {
    insights.push('⚠️ Critical: You don\'t have a Google Business Profile. This is essential for local visibility.')
  }

  if (!websiteData.exists) {
    insights.push('⚠️ Critical: You don\'t have a website. This severely limits your AI visibility.')
  }

  if ((googleData.userRatingCount || 0) < 10) {
    insights.push('💡 Quick win: Get more Google reviews. Aim for at least 10 reviews to build trust.')
  }

  return insights.join(' ')
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

serve(async (req) => {
  try {
    // Verify authorization
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.log('='.repeat(80))
    console.log('🎯 [TRIAL SCORE GENERATION] Starting weekly score generation')
    console.log('='.repeat(80))

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

    // Get all trial users needing scores
    const { data: trialUsers, error: usersError } = await supabase
      .rpc('get_trial_users_needing_score')

    if (usersError) {
      console.error('[ERROR] Failed to fetch trial users:', usersError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch trial users', details: usersError }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!trialUsers || trialUsers.length === 0) {
      console.log('[INFO] No trial users need scores this week')
      return new Response(
        JSON.stringify({ success: true, message: 'No users need scores', processed: 0 }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.log(`[INFO] Found ${trialUsers.length} trial users needing scores`)

    const results = []
    let successCount = 0
    let errorCount = 0

    // Process each trial user
    for (const user of trialUsers as TrialUser[]) {
      try {
        console.log(`\n${'='.repeat(80)}`)
        console.log(`[USER] Processing: ${user.business_name} (${user.email})`)
        console.log(`${'='.repeat(80)}`)

        // Calculate week number (1-12)
        const trialStartDate = new Date(user.trial_started_at)
        const now = new Date()
        const weeksSinceStart = Math.floor((now.getTime() - trialStartDate.getTime()) / (7 * 24 * 60 * 60 * 1000))
        const weekNumber = Math.min(12, weeksSinceStart + 1)

        console.log(`[INFO] Week ${weekNumber} of 12`)

        // Step 1: Google Places data
        const googleData = await searchGooglePlace(user.business_name, user.postcode)

        // Step 2: Website analysis
        const websiteUrl = user.website_url || googleData.websiteUri
        const websiteData = await analyzeWebsite(websiteUrl || '')

        // Step 3: Content analysis with OpenAI
        const contentAnalysis = await analyzeContentWithOpenAI(
          websiteData.bodyText || '',
          user.business_name,
          user.trade_type
        )

        // Step 4: Review analysis (if reviews available)
        let reviewAnalysis: ReviewAnalysis = { positiveThemes: '', negativeThemes: '' }
        if (googleData.reviews && googleData.reviews.length > 0) {
          reviewAnalysis = await analyzeReviewsWithOpenAI(googleData.reviews)
        }

        // Step 5: Perplexity analysis
        const perplexityResults = await queryPerplexity(
          user.business_name,
          user.postcode,
          user.trade_type,
          websiteUrl
        )

        // Step 6: Calculate score
        const { totalScore, pillarScores, recommendations } = calculateScore(
          googleData,
          websiteData,
          contentAnalysis,
          perplexityResults,
          user.trade_type
        )

        // Step 7: Generate insights
        const insights = generateInsights(
          totalScore,
          pillarScores,
          googleData,
          websiteData,
          weekNumber
        )

        console.log(`[SCORE] Total: ${totalScore}/100`)
        console.log(`[PILLARS] Clarity: ${pillarScores.clarity}, Consensus: ${pillarScores.consensus}, Answerability: ${pillarScores.answerability}, Safety: ${pillarScores.safety}, Context: ${pillarScores.context}`)

        // Step 8: Create score record in database
        const { data: scoreRecord, error: createError } = await supabase
          .rpc('generate_trial_visibility_score', { p_user_id: user.user_id })

        if (createError) {
          console.error('[ERROR] Failed to create score record:', createError)
          errorCount++
          results.push({
            user_id: user.user_id,
            business_name: user.business_name,
            success: false,
            error: createError.message
          })
          continue
        }

        const scoreId = scoreRecord[0]?.score_id

        if (!scoreId) {
          console.error('[ERROR] No score ID returned')
          errorCount++
          continue
        }

        // Step 9: Update score with calculated values
        const { error: updateError } = await supabase
          .rpc('update_trial_visibility_score', {
            p_score_id: scoreId,
            p_total_score: totalScore,
            p_clarity_score: pillarScores.clarity,
            p_consensus_score: pillarScores.consensus,
            p_answerability_score: pillarScores.answerability,
            p_safety_score: pillarScores.safety,
            p_context_score: pillarScores.context,
            p_insights: insights,
            p_recommendations: recommendations.join('; '),
            p_positive_themes: reviewAnalysis.positiveThemes,
            p_negative_themes: reviewAnalysis.negativeThemes
          })

        if (updateError) {
          console.error('[ERROR] Failed to update score:', updateError)
          errorCount++
          results.push({
            user_id: user.user_id,
            business_name: user.business_name,
            success: false,
            error: updateError.message
          })
          continue
        }

        console.log(`[SUCCESS] Score generated and saved for ${user.business_name}`)
        successCount++
        results.push({
          user_id: user.user_id,
          business_name: user.business_name,
          week_number: weekNumber,
          total_score: totalScore,
          success: true
        })

      } catch (userError) {
        console.error(`[ERROR] Failed to process user ${user.email}:`, userError)
        errorCount++
        results.push({
          user_id: user.user_id,
          business_name: user.business_name,
          success: false,
          error: String(userError)
        })
      }
    }

    console.log(`\n${'='.repeat(80)}`)
    console.log(`[SUMMARY] Processed ${trialUsers.length} users`)
    console.log(`[SUMMARY] Success: ${successCount}, Errors: ${errorCount}`)
    console.log(`${'='.repeat(80)}`)

    return new Response(
      JSON.stringify({
        success: true,
        processed: trialUsers.length,
        successful: successCount,
        failed: errorCount,
        results
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('[FATAL ERROR]', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
        details: String(error)
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
