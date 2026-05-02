import { supabase } from '../supabase'

const PILLAR_NAMES: Record<string, string> = {
  entity_clarity: 'Entity Clarity',
  consensus_shaping: 'Consensus Shaping',
  answer_readiness: 'Answer Readiness',
  risk_reduction: 'Risk Reduction',
  confidence_accretion: 'Confidence Accretion',
}

interface BusinessData {
  profile: Record<string, any>
  recentTasks: any[]
  recentScores: any[]
}

interface PillarEvaluation {
  score: number
  notes: string
  weaknesses?: string[]
  conflicts?: string[]
  gaps?: string[]
  factors?: string[]
  opportunities?: string[]
}

interface Evaluation {
  business_id: string
  user_id: string
  entity_clarity_score: number
  entity_clarity_notes: string
  entity_clarity_weaknesses: string[]
  consensus_score: number
  consensus_notes: string
  consensus_conflicts: string[]
  answer_readiness_score: number
  answer_readiness_notes: string
  answer_readiness_gaps: string[]
  risk_reduction_score: number
  risk_reduction_notes: string
  risk_factors: string[]
  confidence_score: number
  confidence_notes: string
  confidence_opportunities: string[]
  weakest_pillar: string
  evaluation_data: BusinessData
}

export class RexDecisionEngine {
  async evaluateBusiness(businessId: string, userId: string): Promise<Evaluation> {
    const businessData = await this.gatherBusinessData(businessId)

    const evaluation: Evaluation = {
      business_id: businessId,
      user_id: userId,
      entity_clarity_score: 0,
      entity_clarity_notes: '',
      entity_clarity_weaknesses: [],
      consensus_score: 0,
      consensus_notes: '',
      consensus_conflicts: [],
      answer_readiness_score: 0,
      answer_readiness_notes: '',
      answer_readiness_gaps: [],
      risk_reduction_score: 0,
      risk_reduction_notes: '',
      risk_factors: [],
      confidence_score: 0,
      confidence_notes: '',
      confidence_opportunities: [],
      weakest_pillar: '',
      evaluation_data: businessData,
    }

    const pillarScores = await this.evaluateAllPillars(businessData)

    evaluation.entity_clarity_score = pillarScores.entity_clarity.score
    evaluation.entity_clarity_notes = pillarScores.entity_clarity.notes
    evaluation.entity_clarity_weaknesses = pillarScores.entity_clarity.weaknesses || []

    evaluation.consensus_score = pillarScores.consensus_shaping.score
    evaluation.consensus_notes = pillarScores.consensus_shaping.notes
    evaluation.consensus_conflicts = pillarScores.consensus_shaping.conflicts || []

    evaluation.answer_readiness_score = pillarScores.answer_readiness.score
    evaluation.answer_readiness_notes = pillarScores.answer_readiness.notes
    evaluation.answer_readiness_gaps = pillarScores.answer_readiness.gaps || []

    evaluation.risk_reduction_score = pillarScores.risk_reduction.score
    evaluation.risk_reduction_notes = pillarScores.risk_reduction.notes
    evaluation.risk_factors = pillarScores.risk_reduction.factors || []

    evaluation.confidence_score = pillarScores.confidence_accretion.score
    evaluation.confidence_notes = pillarScores.confidence_accretion.notes
    evaluation.confidence_opportunities = pillarScores.confidence_accretion.opportunities || []

    evaluation.weakest_pillar = this.identifyWeakestPillar(pillarScores)

    const { data, error } = await supabase
      .from('rex_ece_evaluations')
      .insert([evaluation])
      .select()
      .maybeSingle()

    if (error) throw error

    return data as Evaluation
  }

  async gatherBusinessData(businessId: string): Promise<BusinessData> {
    const { data: profile } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('id', businessId)
      .maybeSingle()

    const { data: tasks } = await supabase
      .from('tasks')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(10)

    const { data: scores } = await supabase
      .from('visibility_scores')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(5)

    return {
      profile: profile || {},
      recentTasks: tasks || [],
      recentScores: scores || [],
    }
  }

  async evaluateAllPillars(businessData: BusinessData): Promise<Record<string, PillarEvaluation>> {
    const { profile } = businessData

    return {
      entity_clarity: this.evaluateEntityClarity(profile),
      consensus_shaping: this.evaluateConsensusShaping(profile),
      answer_readiness: this.evaluateAnswerReadiness(profile),
      risk_reduction: this.evaluateRiskReduction(profile),
      confidence_accretion: this.evaluateConfidenceAccretion(businessData),
    }
  }

  evaluateEntityClarity(profile: Record<string, any>): PillarEvaluation {
    const weaknesses: string[] = []
    let score = 50

    if (!profile.business_name || profile.business_name.length < 3) {
      weaknesses.push('Business name is missing or unclear')
      score -= 20
    }

    if (!profile.industry || profile.industry.trim().length === 0) {
      weaknesses.push('Industry/service type not clearly defined')
      score -= 15
    }

    if (!profile.location || profile.location.trim().length === 0) {
      weaknesses.push('Service location not specified')
      score -= 15
    }

    const genericTerms = ['solutions', 'services', 'consulting']
    const hasGenericTerms = genericTerms.some((term) =>
      (profile.business_name || '').toLowerCase().includes(term)
    )
    if (hasGenericTerms) {
      weaknesses.push('Business name contains generic terminology')
      score -= 10
    }

    if (profile.business_name && profile.industry && profile.location) {
      score += 20
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      notes:
        weaknesses.length === 0
          ? 'Entity is clearly defined with specific role and location'
          : 'Entity clarity needs improvement in key areas',
      weaknesses,
    }
  }

  evaluateConsensusShaping(profile: Record<string, any>): PillarEvaluation {
    const conflicts: string[] = []
    let score = 60

    if (!profile.website || profile.website.trim().length === 0) {
      conflicts.push('No website URL provided - cannot verify cross-platform consistency')
      score -= 20
    }

    if (!profile.description || profile.description.length < 50) {
      conflicts.push('Business description is too brief or missing')
      score -= 15
    }

    if (profile.description && profile.description.length >= 100) {
      score += 15
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      notes:
        conflicts.length === 0
          ? 'Good foundation for consensus across platforms'
          : 'Consensus needs strengthening through consistent messaging',
      conflicts,
    }
  }

  evaluateAnswerReadiness(profile: Record<string, any>): PillarEvaluation {
    const gaps: string[] = []
    let score = 40

    if (!profile.description || profile.description.length < 100) {
      gaps.push('Description is not detailed enough to answer common questions')
      score -= 15
    }

    const descLower = (profile.description || '').toLowerCase()
    const hasQuestionAnswerFormat =
      descLower.includes('?') || descLower.includes('we ') || descLower.includes('our ')

    if (!hasQuestionAnswerFormat) {
      gaps.push('Content is not written in conversational, answer-ready format')
      score -= 10
    } else {
      score += 20
    }

    if (!profile.services_offered || profile.services_offered.length === 0) {
      gaps.push('Services are not explicitly listed')
      score -= 15
    } else {
      score += 30
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      notes:
        gaps.length === 0
          ? 'Content is ready to answer customer questions'
          : 'Content needs to be more conversational and answer-focused',
      gaps,
    }
  }

  evaluateRiskReduction(profile: Record<string, any>): PillarEvaluation {
    const factors: string[] = []
    let score = 50

    if (!profile.phone || profile.phone.trim().length === 0) {
      factors.push('Phone number not provided - reduces trust')
      score -= 15
    }

    if (!profile.email || profile.email.trim().length === 0) {
      factors.push('Email not provided - limits verification')
      score -= 10
    }

    if (!profile.website || profile.website.trim().length === 0) {
      factors.push('Website not provided - cannot verify legitimacy')
      score -= 20
    }

    if (profile.phone && profile.email && profile.website) {
      score += 35
    }

    if (!profile.credentials || profile.credentials.length === 0) {
      factors.push('No credentials or certifications listed')
      score -= 10
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      notes:
        factors.length === 0
          ? 'Strong trust signals and easy verification'
          : 'Risk reduction needs improvement through better transparency',
      factors,
    }
  }

  evaluateConfidenceAccretion(businessData: BusinessData): PillarEvaluation {
    const opportunities: string[] = []
    let score = 45
    const { profile, recentTasks, recentScores } = businessData

    if (!recentTasks || recentTasks.length === 0) {
      opportunities.push('No recent activity or improvements tracked')
      score -= 15
    } else if (recentTasks.length > 0) {
      score += 20
    }

    if (!recentScores || recentScores.length === 0) {
      opportunities.push('No AI Visibility Score history to show improvement')
      score -= 10
    } else if (recentScores.length >= 2) {
      const trend = recentScores[0].overall_score - recentScores[recentScores.length - 1].overall_score
      if (trend > 0) {
        score += 25
      } else {
        opportunities.push('AI Visibility Scores are not trending upward')
        score -= 5
      }
    }

    const profileCompleteness = [
      profile.business_name,
      profile.industry,
      profile.location,
      profile.website,
      profile.phone,
      profile.email,
      profile.description,
    ].filter(Boolean).length

    if (profileCompleteness < 5) {
      opportunities.push('Profile completeness below 70% - incremental improvements available')
      score -= 10
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      notes:
        opportunities.length === 0
          ? 'Strong momentum with consistent improvements'
          : 'Opportunities for incremental confidence building',
      opportunities,
    }
  }

  identifyWeakestPillar(pillarScores: Record<string, PillarEvaluation>): string {
    let weakest = ''
    let lowestScore = 101

    for (const [pillar, data] of Object.entries(pillarScores)) {
      if (data.score < lowestScore) {
        lowestScore = data.score
        weakest = pillar
      }
    }

    return weakest
  }

  async generateRecommendation(businessId: string, userId: string): Promise<any> {
    const evaluation = await this.evaluateBusiness(businessId, userId)

    const { data: existingRec } = await supabase
      .from('rex_recommendations')
      .select('id')
      .eq('business_id', businessId)
      .in('status', ['draft', 'sent_to_admin', 'sent_to_customer', 'approved', 'in_progress'])
      .maybeSingle()

    if (existingRec) {
      throw new Error('There is already an active recommendation for this business. Complete or decline it first.')
    }

    const recommendation = this.createRecommendationForWeakestPillar(evaluation, businessId, userId)

    const { data, error } = await supabase
      .from('rex_recommendations')
      .insert([recommendation])
      .select()
      .maybeSingle()

    if (error) throw error
    return data
  }

  createRecommendationForWeakestPillar(evaluation: Evaluation, businessId: string, userId: string): any {
    const pillar = evaluation.weakest_pillar
    const businessData = evaluation.evaluation_data
    const profile = businessData.profile || {}

    const generators: Record<string, () => any> = {
      entity_clarity: () => this.generateEntityClarityAction(profile, evaluation),
      consensus_shaping: () => this.generateConsensusShapingAction(profile, evaluation),
      answer_readiness: () => this.generateAnswerReadinessAction(profile, evaluation),
      risk_reduction: () => this.generateRiskReductionAction(profile, evaluation),
      confidence_accretion: () => this.generateConfidenceAccretionAction(profile, evaluation),
    }

    const action = generators[pillar]()

    return {
      business_id: businessId,
      user_id: userId,
      evaluation_id: (evaluation as any).id,
      target_pillar: pillar,
      ...action,
      status: 'draft',
      generated_at: new Date().toISOString(),
    }
  }

  generateEntityClarityAction(profile: Record<string, any>, evaluation: Evaluation): any {
    const weaknesses = evaluation.entity_clarity_weaknesses || []

    if (weaknesses.some((w) => w.includes('Business name'))) {
      return {
        action_type: 'update_business_name',
        title: 'Clarify Your Business Name',
        explanation:
          'AI answer engines need to understand exactly what your business does. A clear, specific business name helps them confidently recommend you when someone asks a relevant question. Generic terms like "solutions" or "services" create ambiguity.',
        exact_copy: `${profile.business_name || '[YourBusiness]'} - [Specific Service] in [Location]`,
        application_location: 'Update your business name in your Google Business Profile',
        expected_impact:
          'Increases the likelihood that AI will recognize your business role and include you in relevant answers. Clear entity identity is the foundation of confident recommendations.',
        estimated_minutes: 3,
      }
    }

    if (weaknesses.some((w) => w.includes('Industry'))) {
      return {
        action_type: 'specify_industry',
        title: 'Define Your Primary Service',
        explanation:
          'What you do must be immediately obvious. AI answer engines analyze your profile to determine relevance. An unclear or missing industry classification means they cannot confidently match you to customer questions.',
        exact_copy: null,
        application_location: 'Add your primary industry/service type to your business profile',
        expected_impact:
          'Helps AI understand your business category and include you when answering industry-specific questions. Clarity of role increases recommendation confidence.',
        estimated_minutes: 2,
      }
    }

    if (weaknesses.some((w) => w.includes('location'))) {
      return {
        action_type: 'specify_location',
        title: 'Make Your Service Area Clear',
        explanation:
          'Location clarity is critical for local service businesses. AI needs to know exactly where you operate to recommend you for location-specific queries.',
        exact_copy: null,
        application_location: 'Update your service area in your business profile and Google Business Profile',
        expected_impact:
          'Enables AI to confidently recommend you for location-based searches. Geographic clarity builds trust and relevance.',
        estimated_minutes: 3,
      }
    }

    return {
      action_type: 'refine_business_description',
      title: 'Add Specific Details to Your Business Name',
      explanation:
        'The more specific your business identity, the more confidently AI can recommend you. Replace generic terms with concrete service descriptions.',
      exact_copy: null,
      application_location: 'Refine your business name across all profiles',
      expected_impact: 'Reduces ambiguity and increases the precision with which AI can match you to relevant queries.',
      estimated_minutes: 5,
    }
  }

  generateConsensusShapingAction(profile: Record<string, any>, evaluation: Evaluation): any {
    const conflicts = evaluation.consensus_conflicts || []

    if (conflicts.some((c) => c.includes('website'))) {
      return {
        action_type: 'add_website_url',
        title: 'Add Your Website URL',
        explanation:
          'AI answer engines verify information across multiple sources. Without a website, they cannot validate what your business does, reducing their confidence in recommending you. A website is a key trust signal.',
        exact_copy: null,
        application_location: 'Add your website URL to your Google Business Profile and all business listings',
        expected_impact:
          'Provides AI with a primary source to verify your services and build consensus about what you offer. Critical for trust building.',
        estimated_minutes: 2,
      }
    }

    if (conflicts.some((c) => c.includes('description'))) {
      return {
        action_type: 'expand_business_description',
        title: 'Write a 2-Sentence Business Description',
        explanation:
          'AI needs a clear, consistent description of what you do. A brief or missing description forces AI to guess, reducing recommendation confidence. Consistency across platforms builds consensus.',
        exact_copy: `We are [Business Name], a [specific service] serving [location]. We specialize in [main offering] and help customers [key benefit].`,
        application_location: 'Add this to your Google Business Profile and website',
        expected_impact:
          'Creates a consistent description that AI can verify across platforms. Consistent messaging builds confidence in recommendations.',
        estimated_minutes: 5,
      }
    }

    return {
      action_type: 'improve_description_quality',
      title: 'Improve Your Business Description',
      explanation:
        'Your description is present but could be more specific and consistent across platforms. AI cross-references descriptions to verify accuracy.',
      exact_copy: null,
      application_location: 'Update descriptions on your website and Google Business Profile',
      expected_impact: 'Better consistency means AI trusts your business information more, increasing recommendation frequency.',
      estimated_minutes: 10,
    }
  }

  generateAnswerReadinessAction(profile: Record<string, any>, evaluation: Evaluation): any {
    const gaps = evaluation.answer_readiness_gaps || []

    if (gaps.some((g) => g.includes('conversational'))) {
      return {
        action_type: 'rewrite_conversational',
        title: 'Rewrite Content in Conversational Format',
        explanation:
          'AI answer engines pull from content that directly answers questions. Writing in a conversational, question-answer format makes your content more likely to be used by AI.',
        exact_copy: `Q: Do you offer emergency ${profile.industry || 'service'} in ${profile.location || 'your area'}?\nA: Yes, we provide 24/7 emergency ${profile.industry || 'service'} with a typical response time of under 30 minutes.`,
        application_location: 'Add to your website FAQ section and Google Business Profile Q&A',
        expected_impact:
          'Makes your content directly usable by AI when answering customer questions. Increases the chance AI quotes your business in responses.',
        estimated_minutes: 15,
      }
    }

    if (gaps.some((g) => g.includes('Services'))) {
      return {
        action_type: 'list_services',
        title: 'List Your Services Explicitly',
        explanation:
          'AI needs to know exactly what services you offer to match you to relevant queries. A vague or missing service list means AI cannot confidently recommend you for specific jobs.',
        exact_copy: null,
        application_location: 'Add a services section to your website and Google Business Profile',
        expected_impact:
          'Enables AI to match your business to specific service queries. "Emergency plumber" vs "plumber" makes a huge difference in recommendation relevance.',
        estimated_minutes: 10,
      }
    }

    return {
      action_type: 'expand_description',
      title: 'Expand Your Business Description',
      explanation:
        'Your description is too brief for AI to extract meaningful answers from. A more detailed description increases the chance AI will use your content in responses.',
      exact_copy: null,
      application_location: 'Expand your website About page and GBP description',
      expected_impact: 'More detailed content gives AI more material to quote and reference, increasing your visibility in answers.',
      estimated_minutes: 20,
    }
  }

  generateRiskReductionAction(profile: Record<string, any>, evaluation: Evaluation): any {
    const factors = evaluation.risk_factors || []

    if (factors.some((f) => f.includes('Phone'))) {
      return {
        action_type: 'add_phone',
        title: 'Add Your Phone Number',
        explanation:
          'A phone number is a basic trust signal. AI checks for contact information to verify legitimacy. Missing phone details reduce AI confidence in recommending you.',
        exact_copy: null,
        application_location: 'Add phone to your Google Business Profile and website',
        expected_impact:
          'Increases trust signals that AI uses to filter recommendations. Businesses with complete contact info rank higher in AI suggestions.',
        estimated_minutes: 2,
      }
    }

    if (factors.some((f) => f.includes('Website'))) {
      return {
        action_type: 'add_website',
        title: 'Create a Simple Website',
        explanation:
          'AI needs multiple sources to verify your business. A website is the primary source AI checks. Without one, AI cannot confirm you exist, severely limiting recommendations.',
        exact_copy: null,
        application_location: 'Create a one-page website or add to existing site',
        expected_impact:
          'Dramatically increases AI trust. A website with basic info is the single most impactful action for improving AI visibility.',
        estimated_minutes: 120,
      }
    }

    if (factors.some((f) => f.includes('credentials'))) {
      return {
        action_type: 'add_credentials',
        title: 'Add Your Credentials',
        explanation:
          'AI trusts businesses that demonstrate expertise. Credentials, certifications, and qualifications reduce perceived risk and increase recommendation confidence.',
        exact_copy: null,
        application_location: 'Add to your website About section and Google Business Profile',
        expected_impact:
          'Shows AI that you are qualified and trustworthy. This is especially important for trades where safety and expertise matter.',
        estimated_minutes: 10,
      }
    }

    return {
      action_type: 'improve_trust_signals',
      title: 'Improve Your Trust Signals',
      explanation:
        'Your business needs stronger verification signals. AI checks multiple trust factors before recommending a business. Improving these increases your recommendation rate.',
      exact_copy: null,
      application_location: 'Review and update your Google Business Profile and website',
      expected_impact: 'Better trust signals mean AI will include you in more recommendations with higher confidence.',
      estimated_minutes: 30,
    }
  }

  generateConfidenceAccretionAction(profile: Record<string, any>, evaluation: Evaluation): any {
    const opportunities = evaluation.confidence_opportunities || []

    if (opportunities.some((o) => o.includes('activity'))) {
      return {
        action_type: 'track_improvements',
        title: 'Start Tracking Your Improvements',
        explanation:
          'AI favors businesses that show consistent improvement. By tracking changes and showing progress, you signal to AI that your business is active and growing.',
        exact_copy: null,
        application_location: 'Use the Rex dashboard to log improvements and track scores',
        expected_impact:
          'Creates a positive feedback loop. As you improve and track changes, AI sees momentum and recommends you more frequently.',
        estimated_minutes: 5,
      }
    }

    if (opportunities.some((o) => o.includes('Profile'))) {
      return {
        action_type: 'improve_profile',
        title: 'Complete Your Business Profile',
        explanation:
          'A complete profile is the foundation of AI confidence. Missing basic information makes AI uncertain about recommending you.',
        exact_copy: null,
        application_location: 'Fill in all fields in your business profile',
        expected_impact:
          'Profile completeness is a major factor in AI recommendations. Completing all fields can significantly improve your visibility score.',
        estimated_minutes: 20,
      }
    }

    return {
      action_type: 'build_momentum',
      title: 'Build Consistent Improvement Momentum',
      explanation:
        'AI rewards businesses that show steady progress. Making regular small improvements signals reliability and activity, both key to AI confidence.',
      exact_copy: null,
      application_location: 'Schedule weekly improvements and track them in Rex',
      expected_impact:
        'Consistent small improvements compound over time. AI tracks this momentum and increasingly favors your business in recommendations.',
      estimated_minutes: 15,
    }
  }

  async getEvaluation(evaluationId: string): Promise<Evaluation | null> {
    const { data, error } = await supabase
      .from('rex_ece_evaluations')
      .select('*')
      .eq('id', evaluationId)
      .maybeSingle()

    if (error) throw error
    return data as Evaluation | null
  }

  async getLatestEvaluation(businessId: string): Promise<Evaluation | null> {
    const { data, error } = await supabase
      .from('rex_ece_evaluations')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) throw error
    return data as Evaluation | null
  }
}

export const rexDecisionEngine = new RexDecisionEngine()
