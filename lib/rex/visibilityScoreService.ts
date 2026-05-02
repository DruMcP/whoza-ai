import { supabase } from '../supabase'
import { ECE_PILLAR_IDS } from './ecePillars'

interface ScoreResult {
  score: number
  maxScore: number
  checks: any[]
}

interface PillarScore {
  score: number
  maxScore: number
  components: { name: string; score: number; maxScore: number; checks: any[] }[]
}

export const visibilityScoreService = {
  async calculateScore(businessId: string) {
    const { data: profile } = await supabase
      .from('business_profiles')
      .select('*, users!inner(*)')
      .eq('id', businessId)
      .single()

    if (!profile) {
      throw new Error('Business profile not found')
    }

    const user = (profile as any).users

    const profileScore = this.calculateProfileCompletenessScore(user, profile)
    const reviewScore = this.calculateReviewQualityScore(profile)
    const citationScore = this.calculateCitationPresenceScore(profile)
    const contentScore = this.calculateContentRelevanceScore(profile)
    const technicalScore = this.calculateTechnicalSEOScore(profile)
    const socialScore = this.calculateSocialPresenceScore(profile)
    const safetyScore = this.calculateSafetyScore(profile)
    const contextScore = this.calculateContextScore(profile)

    const overallScore =
      profileScore.score +
      reviewScore.score +
      citationScore.score +
      contentScore.score +
      technicalScore.score +
      socialScore.score +
      safetyScore.score +
      contextScore.score

    const pillarScores: Record<string, PillarScore> = {
      [ECE_PILLAR_IDS.CLARITY]: {
        score: profileScore.score,
        maxScore: profileScore.maxScore,
        components: [{ name: 'Profile Completeness', ...profileScore }],
      },
      [ECE_PILLAR_IDS.CONSENSUS]: {
        score: reviewScore.score + citationScore.score,
        maxScore: reviewScore.maxScore + citationScore.maxScore,
        components: [
          { name: 'Review Quality', ...reviewScore },
          { name: 'Citation Presence', ...citationScore },
        ],
      },
      [ECE_PILLAR_IDS.ANSWERABILITY]: {
        score: contentScore.score,
        maxScore: contentScore.maxScore,
        components: [{ name: 'Content Relevance', ...contentScore }],
      },
      [ECE_PILLAR_IDS.SAFETY]: {
        score: safetyScore.score,
        maxScore: safetyScore.maxScore,
        components: [{ name: 'Safety & Trust', ...safetyScore }],
      },
      [ECE_PILLAR_IDS.CONTEXT]: {
        score: contextScore.score,
        maxScore: contextScore.maxScore,
        components: [{ name: 'Context Precision', ...contextScore }],
      },
    }

    const recommendations = this.generateRecommendations({
      profileScore,
      reviewScore,
      citationScore,
      contentScore,
      technicalScore,
      socialScore,
      safetyScore,
      contextScore,
    })

    const benchmarkPercentile = await this.calculateBenchmarkPercentile(user.trade_type, overallScore)
    const previousScore = await this.getPreviousScore(businessId)
    const monthOverMonthChange = previousScore ? overallScore - previousScore.overall_score : 0

    const scoreData = {
      business_id: businessId,
      score_date: new Date().toISOString().split('T')[0],
      overall_score: overallScore,
      profile_completeness_score: profileScore.score,
      review_quality_score: reviewScore.score,
      citation_presence_score: citationScore.score,
      content_relevance_score: contentScore.score,
      technical_seo_score: technicalScore.score,
      social_presence_score: socialScore.score,
      benchmark_percentile: benchmarkPercentile,
      month_over_month_change: monthOverMonthChange,
      recommendations,
      pillar_scores: pillarScores,
      calculation_metadata: {
        profileScore,
        reviewScore,
        citationScore,
        contentScore,
        technicalScore,
        socialScore,
        safetyScore,
        contextScore,
        pillarScores,
        calculatedAt: new Date().toISOString(),
      },
    }

    const { data: savedScore, error } = await supabase
      .from('visibility_score_details')
      .upsert(scoreData, { onConflict: 'business_id,score_date' })
      .select()
      .single()

    if (error) throw error

    return savedScore
  },

  calculateProfileCompletenessScore(user: any, profile: any): ScoreResult {
    let score = 0
    const maxScore = 25
    const checks = []

    if (user.business_name) {
      score += 2
      checks.push({ field: 'Business name', present: true, points: 2 })
    } else {
      checks.push({ field: 'Business name', present: false, points: 0 })
    }

    if (user.trade_type) {
      score += 2
      checks.push({ field: 'Trade type', present: true, points: 2 })
    } else {
      checks.push({ field: 'Trade type', present: false, points: 0 })
    }

    if (user.service_area) {
      score += 3
      checks.push({ field: 'Service area', present: true, points: 3 })
    } else {
      checks.push({ field: 'Service area', present: false, points: 0 })
    }

    if (user.postcode) {
      score += 2
      checks.push({ field: 'Postcode', present: true, points: 2 })
    } else {
      checks.push({ field: 'Postcode', present: false, points: 0 })
    }

    if (profile.website_url) {
      score += 4
      checks.push({ field: 'Website URL', present: true, points: 4 })
    } else {
      checks.push({ field: 'Website URL', present: false, points: 0 })
    }

    if (profile.google_business_url) {
      score += 5
      checks.push({ field: 'Google Business Profile', present: true, points: 5 })
    } else {
      checks.push({ field: 'Google Business Profile', present: false, points: 0 })
    }

    if (profile.key_services && profile.key_services.length > 0) {
      score += 3
      checks.push({ field: 'Key services listed', present: true, points: 3 })
    } else {
      checks.push({ field: 'Key services listed', present: false, points: 0 })
    }

    if (profile.credentials) {
      score += 2
      checks.push({ field: 'Credentials/certifications', present: true, points: 2 })
    } else {
      checks.push({ field: 'Credentials/certifications', present: false, points: 0 })
    }

    if (user.whatsapp_number) {
      score += 1
      checks.push({ field: 'WhatsApp number', present: true, points: 1 })
    } else {
      checks.push({ field: 'WhatsApp number', present: false, points: 0 })
    }

    if (profile.baseline_created) {
      score += 1
      checks.push({ field: 'Baseline established', present: true, points: 1 })
    } else {
      checks.push({ field: 'Baseline established', present: false, points: 0 })
    }

    return { score: Math.min(score, maxScore), maxScore, checks }
  },

  calculateReviewQualityScore(profile: any): ScoreResult {
    let score = 0
    const maxScore = 20
    const checks = []

    const reviewCount = profile.review_count || 0
    const avgRating = profile.average_rating || 0

    if (reviewCount === 0) {
      checks.push({ check: 'Has reviews', status: 'No reviews yet', points: 0 })
      return { score: 0, maxScore, checks }
    }

    if (reviewCount >= 1) {
      score += 3
      checks.push({ check: 'Has at least 1 review', status: 'Yes', points: 3 })
    }

    if (reviewCount >= 5) {
      score += 3
      checks.push({ check: 'Has 5+ reviews', status: 'Yes', points: 3 })
    }

    if (reviewCount >= 10) {
      score += 3
      checks.push({ check: 'Has 10+ reviews', status: 'Yes', points: 3 })
    }

    if (reviewCount >= 25) {
      score += 3
      checks.push({ check: 'Has 25+ reviews', status: 'Yes', points: 3 })
    }

    if (avgRating >= 4.0) {
      score += 4
      checks.push({ check: 'Average rating 4.0+', status: `${avgRating.toFixed(1)}`, points: 4 })
    } else if (avgRating >= 3.5) {
      score += 2
      checks.push({ check: 'Average rating 3.5+', status: `${avgRating.toFixed(1)}`, points: 2 })
    } else {
      checks.push({ check: 'Average rating below 3.5', status: `${avgRating.toFixed(1)}`, points: 0 })
    }

    if (avgRating >= 4.5) {
      score += 4
      checks.push({ check: 'Excellent rating (4.5+)', status: `${avgRating.toFixed(1)}`, points: 4 })
    }

    return { score: Math.min(score, maxScore), maxScore, checks }
  },

  calculateCitationPresenceScore(profile: any): ScoreResult {
    let score = 0
    const maxScore = 20
    const checks = []

    if (profile.google_business_url) {
      score += 8
      checks.push({ platform: 'Google Business Profile', present: true, points: 8 })
    } else {
      checks.push({ platform: 'Google Business Profile', present: false, points: 0 })
    }

    if (profile.bing_places_listed) {
      score += 4
      checks.push({ platform: 'Bing Places', present: true, points: 4 })
    } else {
      checks.push({ platform: 'Bing Places', present: false, points: 0 })
    }

    const directoryCount = profile.directory_listings?.length || 0
    if (directoryCount >= 3) {
      score += 8
      checks.push({ check: 'Listed on 3+ trade directories', count: directoryCount, points: 8 })
    } else if (directoryCount >= 1) {
      score += 4
      checks.push({ check: 'Listed on trade directories', count: directoryCount, points: 4 })
    } else {
      checks.push({ check: 'No trade directory listings', count: 0, points: 0 })
    }

    return { score: Math.min(score, maxScore), maxScore, checks }
  },

  calculateContentRelevanceScore(profile: any): ScoreResult {
    let score = 0
    const maxScore = 15
    const checks = []

    if (profile.has_about_page) {
      score += 3
      checks.push({ content: 'About page', present: true, points: 3 })
    } else {
      checks.push({ content: 'About page', present: false, points: 0 })
    }

    if (profile.has_services_page) {
      score += 4
      checks.push({ content: 'Services page', present: true, points: 4 })
    } else {
      checks.push({ content: 'Services page', present: false, points: 0 })
    }

    const blogPostCount = profile.blog_post_count || 0
    if (blogPostCount >= 5) {
      score += 4
      checks.push({ content: 'Blog posts', count: blogPostCount, points: 4 })
    } else if (blogPostCount >= 1) {
      score += 2
      checks.push({ content: 'Blog posts', count: blogPostCount, points: 2 })
    } else {
      checks.push({ content: 'Blog posts', count: 0, points: 0 })
    }

    if (profile.location_specific_content) {
      score += 4
      checks.push({ content: 'Location-specific content', present: true, points: 4 })
    } else {
      checks.push({ content: 'Location-specific content', present: false, points: 0 })
    }

    return { score: Math.min(score, maxScore), maxScore, checks }
  },

  calculateTechnicalSEOScore(profile: any): ScoreResult {
    let score = 0
    const maxScore = 10
    const checks = []

    if (profile.has_schema_markup) {
      score += 4
      checks.push({ technical: 'Schema markup (structured data)', present: true, points: 4 })
    } else {
      checks.push({ technical: 'Schema markup (structured data)', present: false, points: 0 })
    }

    if (profile.has_sitemap) {
      score += 2
      checks.push({ technical: 'XML sitemap', present: true, points: 2 })
    } else {
      checks.push({ technical: 'XML sitemap', present: false, points: 0 })
    }

    if (profile.mobile_friendly) {
      score += 2
      checks.push({ technical: 'Mobile-friendly website', present: true, points: 2 })
    } else {
      checks.push({ technical: 'Mobile-friendly website', present: false, points: 0 })
    }

    if (profile.has_ssl) {
      score += 1
      checks.push({ technical: 'SSL certificate (HTTPS)', present: true, points: 1 })
    } else {
      checks.push({ technical: 'SSL certificate (HTTPS)', present: false, points: 0 })
    }

    if (profile.page_speed_score >= 80) {
      score += 1
      checks.push({ technical: 'Good page speed', score: profile.page_speed_score, points: 1 })
    } else {
      checks.push({ technical: 'Page speed needs improvement', score: profile.page_speed_score || 0, points: 0 })
    }

    return { score: Math.min(score, maxScore), maxScore, checks }
  },

  calculateSocialPresenceScore(profile: any): ScoreResult {
    let score = 0
    const maxScore = 10
    const checks = []

    if (profile.facebook_url) {
      score += 3
      checks.push({ platform: 'Facebook', present: true, points: 3 })
    } else {
      checks.push({ platform: 'Facebook', present: false, points: 0 })
    }

    if (profile.instagram_url) {
      score += 2
      checks.push({ platform: 'Instagram', present: true, points: 2 })
    } else {
      checks.push({ platform: 'Instagram', present: false, points: 0 })
    }

    if (profile.linkedin_url) {
      score += 2
      checks.push({ platform: 'LinkedIn', present: true, points: 2 })
    } else {
      checks.push({ platform: 'LinkedIn', present: false, points: 0 })
    }

    const socialPostCount = profile.social_posts_last_month || 0
    if (socialPostCount >= 4) {
      score += 3
      checks.push({ activity: 'Regular social posting', count: socialPostCount, points: 3 })
    } else if (socialPostCount >= 1) {
      score += 1
      checks.push({ activity: 'Some social posting', count: socialPostCount, points: 1 })
    } else {
      checks.push({ activity: 'No recent social posts', count: 0, points: 0 })
    }

    return { score: Math.min(score, maxScore), maxScore, checks }
  },

  calculateSafetyScore(profile: any): ScoreResult {
    let score = 0
    const maxScore = 10
    const checks = []

    if (profile.has_ssl) {
      score += 2
      checks.push({ safety: 'SSL/HTTPS enabled', present: true, points: 2 })
    } else {
      checks.push({ safety: 'SSL/HTTPS enabled', present: false, points: 0 })
    }

    if (profile.has_privacy_policy) {
      score += 2
      checks.push({ safety: 'Privacy policy published', present: true, points: 2 })
    } else {
      checks.push({ safety: 'Privacy policy published', present: false, points: 0 })
    }

    if (profile.has_terms_of_service) {
      score += 1
      checks.push({ safety: 'Terms of service published', present: true, points: 1 })
    } else {
      checks.push({ safety: 'Terms of service published', present: false, points: 0 })
    }

    const avgRating = profile.average_rating || 0
    const reviewCount = profile.review_count || 0

    if (avgRating >= 4.0 && reviewCount >= 5) {
      score += 3
      checks.push({ safety: 'Strong reputation (4.0+ rating, 5+ reviews)', status: 'Yes', points: 3 })
    } else if (avgRating >= 3.5 && reviewCount >= 3) {
      score += 1
      checks.push({ safety: 'Moderate reputation', status: 'Yes', points: 1 })
    } else {
      checks.push({ safety: 'Reputation needs building', status: 'No', points: 0 })
    }

    if (profile.credentials) {
      score += 2
      checks.push({ safety: 'Professional credentials verified', present: true, points: 2 })
    } else {
      checks.push({ safety: 'Professional credentials verified', present: false, points: 0 })
    }

    return { score: Math.min(score, maxScore), maxScore, checks }
  },

  calculateContextScore(profile: any): ScoreResult {
    let score = 0
    const maxScore = 10
    const checks = []

    if (profile.location_specific_content) {
      score += 3
      checks.push({ context: 'Location-specific landing pages', present: true, points: 3 })
    } else {
      checks.push({ context: 'Location-specific landing pages', present: false, points: 0 })
    }

    if (profile.service_area_pages) {
      score += 3
      checks.push({ context: 'Service area pages', present: true, points: 3 })
    } else {
      checks.push({ context: 'Service area pages', present: false, points: 0 })
    }

    const locationKeywords = profile.location_keywords?.length || 0
    if (locationKeywords >= 5) {
      score += 2
      checks.push({ context: 'Location keywords in content', count: locationKeywords, points: 2 })
    } else if (locationKeywords >= 1) {
      score += 1
      checks.push({ context: 'Location keywords in content', count: locationKeywords, points: 1 })
    } else {
      checks.push({ context: 'Location keywords in content', count: 0, points: 0 })
    }

    if (profile.has_local_schema) {
      score += 2
      checks.push({ context: 'LocalBusiness schema markup', present: true, points: 2 })
    } else {
      checks.push({ context: 'LocalBusiness schema markup', present: false, points: 0 })
    }

    return { score: Math.min(score, maxScore), maxScore, checks }
  },

  generateRecommendations(scores: any): any[] {
    const recommendations = []

    if (scores.profileScore.score < scores.profileScore.maxScore * 0.7) {
      recommendations.push({
        pillar: ECE_PILLAR_IDS.CLARITY,
        priority: 'high',
        title: 'Complete your business profile',
        description: 'Fill in all missing profile fields to improve entity clarity.',
        estimated_impact: '+5-10 points',
        effort: 'low',
      })
    }

    if (scores.reviewScore.score < scores.reviewScore.maxScore * 0.5) {
      recommendations.push({
        pillar: ECE_PILLAR_IDS.CONSENSUS,
        priority: 'high',
        title: 'Get more Google reviews',
        description: 'Aim for at least 5 reviews with a 4.0+ average rating.',
        estimated_impact: '+10-15 points',
        effort: 'medium',
      })
    }

    if (scores.citationScore.score < scores.citationScore.maxScore * 0.5) {
      recommendations.push({
        pillar: ECE_PILLAR_IDS.CONSENSUS,
        priority: 'medium',
        title: 'List on more directories',
        description: 'Add your business to 3+ trade directories with consistent NAP.',
        estimated_impact: '+5-10 points',
        effort: 'medium',
      })
    }

    if (scores.contentScore.score < scores.contentScore.maxScore * 0.6) {
      recommendations.push({
        pillar: ECE_PILLAR_IDS.ANSWERABILITY,
        priority: 'medium',
        title: 'Add service-specific content',
        description: 'Create pages for each service with FAQ sections.',
        estimated_impact: '+5-10 points',
        effort: 'medium',
      })
    }

    return recommendations
  },

  async calculateBenchmarkPercentile(tradeType: string, overallScore: number): Promise<number> {
    const { data: tradeScores } = await supabase
      .from('visibility_score_details')
      .select('overall_score')
      .eq('trade_type', tradeType)
      .gte('score_date', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString())

    if (!tradeScores || tradeScores.length === 0) {
      return 50
    }

    const scores = tradeScores.map((s: any) => s.overall_score)
    const belowCount = scores.filter((s: number) => s < overallScore).length
    return Math.round((belowCount / scores.length) * 100)
  },

  async getPreviousScore(businessId: string): Promise<any> {
    const { data, error } = await supabase
      .from('visibility_score_details')
      .select('*')
      .eq('business_id', businessId)
      .order('score_date', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error || !data) return null
    return data
  },
}
