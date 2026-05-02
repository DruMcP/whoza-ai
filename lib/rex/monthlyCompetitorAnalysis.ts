import { supabase } from '../supabase'
import { findBusinessViaPlaces, findCompetitorViaAI, generateBlindSpotReasons, generateQuickFixes } from './competitorService'

export type AnalysisTier = 'basic' | 'professional' | 'enterprise'

interface CompetitorAnalysisConfig {
  tier: AnalysisTier
  businessId: string
  userId: string
  businessName: string
  location: string
  trade: string
}

interface CompetitorData {
  name: string
  address: string
  rating?: number
  reviewCount?: number
  website?: string | null
  source: string
}

interface MonthlyAnalysis {
  id?: string
  business_id: string
  user_id: string
  tier: AnalysisTier
  month: string
  year: number
  your_business: {
    name: string
    location: string
    trade: string
    visibility_score?: number
  }
  top_competitors: CompetitorData[]
  blind_spots: any[]
  quick_fixes: any[]
  tier_features: {
    competitor_count: number
    includes_blind_spots: boolean
    includes_quick_fixes: boolean
    includes_visibility_score: boolean
    includes_recommendations: boolean
  }
  generated_at: string
}

const TIER_CONFIG: Record<AnalysisTier, MonthlyAnalysis['tier_features']> = {
  basic: {
    competitor_count: 1,
    includes_blind_spots: false,
    includes_quick_fixes: false,
    includes_visibility_score: false,
    includes_recommendations: false,
  },
  professional: {
    competitor_count: 3,
    includes_blind_spots: true,
    includes_quick_fixes: true,
    includes_visibility_score: true,
    includes_recommendations: true,
  },
  enterprise: {
    competitor_count: 5,
    includes_blind_spots: true,
    includes_quick_fixes: true,
    includes_visibility_score: true,
    includes_recommendations: true,
  },
}

export async function generateMonthlyCompetitorAnalysis(
  config: CompetitorAnalysisConfig
): Promise<MonthlyAnalysis> {
  const { tier, businessId, userId, businessName, location, trade } = config
  const tierFeatures = TIER_CONFIG[tier]

  // Step 1: Find user's business
  const userBusiness = await findBusinessViaPlaces(businessName, location)

  // Step 2: Find competitors via AI
  const competitorResult = await findCompetitorViaAI(trade, location)
  const competitorNames = competitorResult.names.slice(0, tierFeatures.competitor_count)

  // Step 3: Build competitor data
  const topCompetitors: CompetitorData[] = []
  for (const name of competitorNames) {
    const place = await findBusinessViaPlaces(name, location)
    if (place) {
      topCompetitors.push({
        name: place.name,
        address: place.address,
        rating: place.rating,
        reviewCount: place.user_ratings_total,
        website: place.website,
        source: competitorResult.source,
      })
    }
  }

  // Step 4: Generate blind spots (professional/enterprise only)
  let blindSpots: any[] = []
  if (tierFeatures.includes_blind_spots && userBusiness && topCompetitors.length > 0) {
    blindSpots = generateBlindSpotReasons(userBusiness, topCompetitors[0], trade, location)
  }

  // Step 5: Generate quick fixes (professional/enterprise only)
  let quickFixes: any[] = []
  if (tierFeatures.includes_quick_fixes) {
    quickFixes = generateQuickFixes(trade, location)
  }

  // Step 6: Get visibility score if available
  let visibilityScore: number | undefined
  if (tierFeatures.includes_visibility_score) {
    const { data: scoreData } = await supabase
      .from('visibility_score_details')
      .select('overall_score')
      .eq('business_id', businessId)
      .order('score_date', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (scoreData) {
      visibilityScore = scoreData.overall_score
    }
  }

  const now = new Date()
  const analysis: MonthlyAnalysis = {
    business_id: businessId,
    user_id: userId,
    tier,
    month: now.toLocaleString('en-GB', { month: 'long' }),
    year: now.getFullYear(),
    your_business: {
      name: businessName,
      location,
      trade,
      visibility_score: visibilityScore,
    },
    top_competitors: topCompetitors,
    blind_spots: blindSpots,
    quick_fixes: quickFixes,
    tier_features: tierFeatures,
    generated_at: now.toISOString(),
  }

  // Save to database
  const { data: saved, error } = await supabase
    .from('monthly_competitor_analysis')
    .insert([analysis])
    .select()
    .single()

  if (error) {
    console.error('Failed to save monthly competitor analysis:', error)
  }

  return saved || analysis
}

export async function getMonthlyAnalysisHistory(
  businessId: string,
  limit = 12
): Promise<MonthlyAnalysis[]> {
  const { data, error } = await supabase
    .from('monthly_competitor_analysis')
    .select('*')
    .eq('business_id', businessId)
    .order('generated_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export async function scheduleMonthlyAnalysis(
  config: CompetitorAnalysisConfig
): Promise<void> {
  // This would integrate with a cron/scheduler
  // For now, log the scheduled analysis
  console.log(`Scheduled monthly analysis for ${config.businessName} (${config.tier} tier)`)
}
