import { supabase } from '../lib/supabase';

const PILLAR_NAMES = {
  entity_clarity: 'Entity Clarity',
  consensus_shaping: 'Consensus Shaping',
  answer_readiness: 'Answer Readiness',
  risk_reduction: 'Risk Reduction',
  confidence_accretion: 'Confidence Accretion'
};

class RexDecisionEngine {
  async evaluateBusiness(businessId, userId) {
    const businessData = await this.gatherBusinessData(businessId);

    const evaluation = {
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
      evaluation_data: businessData
    };

    const pillarScores = await this.evaluateAllPillars(businessData);

    evaluation.entity_clarity_score = pillarScores.entity_clarity.score;
    evaluation.entity_clarity_notes = pillarScores.entity_clarity.notes;
    evaluation.entity_clarity_weaknesses = pillarScores.entity_clarity.weaknesses;

    evaluation.consensus_score = pillarScores.consensus_shaping.score;
    evaluation.consensus_notes = pillarScores.consensus_shaping.notes;
    evaluation.consensus_conflicts = pillarScores.consensus_shaping.conflicts;

    evaluation.answer_readiness_score = pillarScores.answer_readiness.score;
    evaluation.answer_readiness_notes = pillarScores.answer_readiness.notes;
    evaluation.answer_readiness_gaps = pillarScores.answer_readiness.gaps;

    evaluation.risk_reduction_score = pillarScores.risk_reduction.score;
    evaluation.risk_reduction_notes = pillarScores.risk_reduction.notes;
    evaluation.risk_factors = pillarScores.risk_reduction.factors;

    evaluation.confidence_score = pillarScores.confidence_accretion.score;
    evaluation.confidence_notes = pillarScores.confidence_accretion.notes;
    evaluation.confidence_opportunities = pillarScores.confidence_accretion.opportunities;

    evaluation.weakest_pillar = this.identifyWeakestPillar(pillarScores);

    const { data, error } = await supabase
      .from('rex_ece_evaluations')
      .insert([evaluation])
      .select()
      .maybeSingle();

    if (error) throw error;

    await this.recordConfidenceScore(businessId, userId, pillarScores, data.id, 'initial');

    return data;
  }

  async gatherBusinessData(businessId) {
    const { data: profile } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('id', businessId)
      .maybeSingle();

    const { data: tasks } = await supabase
      .from('tasks')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(10);

    const { data: scores } = await supabase
      .from('visibility_scores')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(5);

    return {
      profile: profile || {},
      recentTasks: tasks || [],
      recentScores: scores || []
    };
  }

  async evaluateAllPillars(businessData) {
    const { profile } = businessData;

    return {
      entity_clarity: this.evaluateEntityClarity(profile),
      consensus_shaping: this.evaluateConsensusShaping(profile),
      answer_readiness: this.evaluateAnswerReadiness(profile),
      risk_reduction: this.evaluateRiskReduction(profile),
      confidence_accretion: this.evaluateConfidenceAccretion(businessData)
    };
  }

  evaluateEntityClarity(profile) {
    const weaknesses = [];
    let score = 50;

    if (!profile.business_name || profile.business_name.length < 3) {
      weaknesses.push('Business name is missing or unclear');
      score -= 20;
    }

    if (!profile.industry || profile.industry.trim().length === 0) {
      weaknesses.push('Industry/service type not clearly defined');
      score -= 15;
    }

    if (!profile.location || profile.location.trim().length === 0) {
      weaknesses.push('Service location not specified');
      score -= 15;
    }

    const genericTerms = ['solutions', 'services', 'consulting'];
    const hasGenericTerms = genericTerms.some(term =>
      (profile.business_name || '').toLowerCase().includes(term)
    );
    if (hasGenericTerms) {
      weaknesses.push('Business name contains generic terminology');
      score -= 10;
    }

    if (profile.business_name && profile.industry && profile.location) {
      score += 20;
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      notes: weaknesses.length === 0
        ? 'Entity is clearly defined with specific role and location'
        : 'Entity clarity needs improvement in key areas',
      weaknesses
    };
  }

  evaluateConsensusShaping(profile) {
    const conflicts = [];
    let score = 60;

    if (!profile.website || profile.website.trim().length === 0) {
      conflicts.push('No website URL provided - cannot verify cross-platform consistency');
      score -= 20;
    }

    if (!profile.description || profile.description.length < 50) {
      conflicts.push('Business description is too brief or missing');
      score -= 15;
    }

    if (profile.description && profile.description.length >= 100) {
      score += 15;
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      notes: conflicts.length === 0
        ? 'Good foundation for consensus across platforms'
        : 'Consensus needs strengthening through consistent messaging',
      conflicts
    };
  }

  evaluateAnswerReadiness(profile) {
    const gaps = [];
    let score = 40;

    if (!profile.description || profile.description.length < 100) {
      gaps.push('Description is not detailed enough to answer common questions');
      score -= 15;
    }

    const descLower = (profile.description || '').toLowerCase();
    const hasQuestionAnswerFormat = descLower.includes('?') ||
      descLower.includes('we ') ||
      descLower.includes('our ');

    if (!hasQuestionAnswerFormat) {
      gaps.push('Content is not written in conversational, answer-ready format');
      score -= 10;
    } else {
      score += 20;
    }

    if (!profile.services_offered || profile.services_offered.length === 0) {
      gaps.push('Services are not explicitly listed');
      score -= 15;
    } else {
      score += 30;
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      notes: gaps.length === 0
        ? 'Content is ready to answer customer questions'
        : 'Content needs to be more conversational and answer-focused',
      gaps
    };
  }

  evaluateRiskReduction(profile) {
    const factors = [];
    let score = 50;

    if (!profile.phone || profile.phone.trim().length === 0) {
      factors.push('Phone number not provided - reduces trust');
      score -= 15;
    }

    if (!profile.email || profile.email.trim().length === 0) {
      factors.push('Email not provided - limits verification');
      score -= 10;
    }

    if (!profile.website || profile.website.trim().length === 0) {
      factors.push('Website not provided - cannot verify legitimacy');
      score -= 20;
    }

    if (profile.phone && profile.email && profile.website) {
      score += 35;
    }

    if (!profile.credentials || profile.credentials.length === 0) {
      factors.push('No credentials or certifications listed');
      score -= 10;
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      notes: factors.length === 0
        ? 'Strong trust signals and easy verification'
        : 'Risk reduction needs improvement through better transparency',
      factors
    };
  }

  evaluateConfidenceAccretion(businessData) {
    const opportunities = [];
    let score = 45;
    const { profile, recentTasks, recentScores } = businessData;

    if (!recentTasks || recentTasks.length === 0) {
      opportunities.push('No recent activity or improvements tracked');
      score -= 15;
    } else if (recentTasks.length > 0) {
      score += 20;
    }

    if (!recentScores || recentScores.length === 0) {
      opportunities.push('No AI Visibility Score history to show improvement');
      score -= 10;
    } else if (recentScores.length >= 2) {
      const trend = recentScores[0].overall_score - recentScores[recentScores.length - 1].overall_score;
      if (trend > 0) {
        score += 25;
      } else {
        opportunities.push('AI Visibility Scores are not trending upward');
        score -= 5;
      }
    }

    const profileCompleteness = [
      profile.business_name,
      profile.industry,
      profile.location,
      profile.website,
      profile.phone,
      profile.email,
      profile.description
    ].filter(Boolean).length;

    if (profileCompleteness < 5) {
      opportunities.push('Profile completeness below 70% - incremental improvements available');
      score -= 10;
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      notes: opportunities.length === 0
        ? 'Strong momentum with consistent improvements'
        : 'Opportunities for incremental confidence building',
      opportunities
    };
  }

  identifyWeakestPillar(pillarScores) {
    let weakest = null;
    let lowestScore = 101;

    for (const [pillar, data] of Object.entries(pillarScores)) {
      if (data.score < lowestScore) {
        lowestScore = data.score;
        weakest = pillar;
      }
    }

    return weakest;
  }

  async generateRecommendation(businessId, userId, evaluationId = null) {
    let evaluation = evaluationId
      ? await this.getEvaluation(evaluationId)
      : await this.getLatestEvaluation(businessId);

    if (!evaluation) {
      evaluation = await this.evaluateBusiness(businessId, userId);
    }

    const { data: existingRec } = await supabase
      .from('rex_recommendations')
      .select('id')
      .eq('business_id', businessId)
      .in('status', ['draft', 'sent_to_admin', 'sent_to_customer', 'approved', 'in_progress'])
      .maybeSingle();

    if (existingRec) {
      throw new Error('There is already an active recommendation for this business. Complete or decline it first.');
    }

    const recommendation = this.createRecommendationForWeakestPillar(
      evaluation,
      businessId,
      userId
    );

    const { data, error } = await supabase
      .from('rex_recommendations')
      .insert([recommendation])
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  createRecommendationForWeakestPillar(evaluation, businessId, userId) {
    const pillar = evaluation.weakest_pillar;
    const businessData = evaluation.evaluation_data;
    const profile = businessData.profile || {};

    const generators = {
      entity_clarity: () => this.generateEntityClarityAction(profile, evaluation),
      consensus_shaping: () => this.generateConsensusShapingAction(profile, evaluation),
      answer_readiness: () => this.generateAnswerReadinessAction(profile, evaluation),
      risk_reduction: () => this.generateRiskReductionAction(profile, evaluation),
      confidence_accretion: () => this.generateConfidenceAccretionAction(profile, evaluation)
    };

    const action = generators[pillar]();

    return {
      business_id: businessId,
      user_id: userId,
      evaluation_id: evaluation.id,
      target_pillar: pillar,
      ...action,
      status: 'draft',
      generated_at: new Date().toISOString()
    };
  }

  generateEntityClarityAction(profile, evaluation) {
    const weaknesses = evaluation.entity_clarity_weaknesses || [];

    if (weaknesses.some(w => w.includes('Business name'))) {
      return {
        action_type: 'update_business_name',
        title: 'Clarify Your Business Name',
        explanation: 'AI answer engines need to understand exactly what your business does. A clear, specific business name helps them confidently recommend you when someone asks a relevant question. Generic terms like "solutions" or "services" create ambiguity.',
        exact_copy: `${profile.business_name || '[YourBusiness]'} - [Specific Service] in [Location]`,
        application_location: 'Update your business name in your Google Business Profile',
        expected_impact: 'Increases the likelihood that AI will recognize your business role and include you in relevant answers. Clear entity identity is the foundation of confident recommendations.',
        estimated_minutes: 3
      };
    }

    if (weaknesses.some(w => w.includes('Industry'))) {
      return {
        action_type: 'specify_industry',
        title: 'Define Your Primary Service',
        explanation: 'What you do must be immediately obvious. AI answer engines analyze your profile to determine relevance. An unclear or missing industry classification means they cannot confidently match you to customer questions.',
        exact_copy: null,
        application_location: 'Add your primary industry/service type to your business profile',
        expected_impact: 'Helps AI understand your business category and include you when answering industry-specific questions. Clarity of role increases recommendation confidence.',
        estimated_minutes: 2
      };
    }

    if (weaknesses.some(w => w.includes('location'))) {
      return {
        action_type: 'specify_location',
        title: 'Make Your Service Area Clear',
        explanation: 'Location clarity is critical for local service businesses. AI needs to know exactly where you operate to recommend you for location-specific queries.',
        exact_copy: null,
        application_location: 'Update your service area in your business profile and Google Business Profile',
        expected_impact: 'Enables AI to confidently recommend you for location-based searches. Geographic clarity builds trust and relevance.',
        estimated_minutes: 3
      };
    }

    return {
      action_type: 'refine_business_description',
      title: 'Add Specific Details to Your Business Name',
      explanation: 'The more specific your business identity, the more confidently AI can recommend you. Replace generic terms with concrete service descriptions.',
      exact_copy: null,
      application_location: 'Refine your business name across all profiles',
      expected_impact: 'Reduces ambiguity and increases the precision with which AI can match you to relevant queries.',
      estimated_minutes: 5
    };
  }

  generateConsensusShapingAction(profile, evaluation) {
    const conflicts = evaluation.consensus_conflicts || [];

    if (conflicts.some(c => c.includes('website'))) {
      return {
        action_type: 'add_website_url',
        title: 'Add Your Website URL',
        explanation: 'AI answer engines verify information across multiple sources. Without a website, they cannot validate what your business does, reducing their confidence in recommending you. A website is a key trust signal.',
        exact_copy: null,
        application_location: 'Add your website URL to your Google Business Profile and all business listings',
        expected_impact: 'Provides AI with a primary source to verify your services and build consensus about what you offer. Critical for trust building.',
        estimated_minutes: 2
      };
    }

    if (conflicts.some(c => c.includes('description'))) {
      return {
        action_type: 'expand_business_description',
        title: 'Write a 2-Sentence Business Description',
        explanation: 'AI needs a clear, consistent description of what you do. A brief or missing description forces AI to guess, reducing recommendation confidence. Consistency across platforms builds consensus.',
        exact_copy: `We are [Business Name], a [specific service] serving [location]. We specialize in [main offering] and help customers [key benefit].`,
        application_location: 'Update your business description on your Google Business Profile (copy the same text to your website About page)',
        expected_impact: 'Creates a single, clear description that AI can reference. Consistent messaging across platforms builds confidence through consensus.',
        estimated_minutes: 5
      };
    }

    return {
      action_type: 'align_descriptions',
      title: 'Verify Your Business Description Matches Everywhere',
      explanation: 'AI cross-references your business information across platforms. Inconsistent descriptions create doubt. Consensus builds confidence.',
      exact_copy: null,
      application_location: 'Check that your website, Google Business Profile, and social profiles all say the same thing about what you do',
      expected_impact: 'Eliminates conflicting information that reduces AI confidence. Consistency signals reliability.',
      estimated_minutes: 10
      };
  }

  generateAnswerReadinessAction(profile, evaluation) {
    const gaps = evaluation.answer_readiness_gaps || [];

    if (gaps.some(g => g.includes('Services'))) {
      return {
        action_type: 'list_specific_services',
        title: 'List Your 3 Main Services',
        explanation: 'AI answer engines work by matching customer questions to your services. If your services are not explicitly listed, AI cannot confidently recommend you. Answer readiness means making it easy for AI to see what you offer.',
        exact_copy: `Our Services:\n• [Service 1]: [1-sentence description]\n• [Service 2]: [1-sentence description]\n• [Service 3]: [1-sentence description]`,
        application_location: 'Add this to your Google Business Profile services section',
        expected_impact: 'Gives AI clear, matchable information when someone asks "who does X in [location]". Explicit service lists dramatically increase recommendation likelihood.',
        estimated_minutes: 5
      };
    }

    if (gaps.some(g => g.includes('conversational'))) {
      return {
        action_type: 'rewrite_description_as_answer',
        title: 'Rewrite Your Description as an Answer',
        explanation: 'AI favors content that already sounds like an answer. Instead of "We provide services", write "We help customers with [specific problem] by [specific solution]". Think of how you would answer a customer question.',
        exact_copy: `Looking for [service type] in [location]? We help [target customer] with [specific problem]. Our specialty is [key differentiator].`,
        application_location: 'Replace your current business description with this answer-style format',
        expected_impact: 'Makes your content match the format AI uses for answers. When AI sees answer-ready content, it is more likely to use it.',
        estimated_minutes: 5
      };
    }

    return {
      action_type: 'add_faq_to_profile',
      title: 'Add One FAQ to Your Profile',
      explanation: 'FAQ format is exactly how AI answer engines present information. By providing one FAQ, you give AI pre-formatted content it can use directly in responses.',
      exact_copy: `Q: What does [Business Name] do?\nA: We provide [specific service] for [target customer] in [location]. Our focus is [key benefit].`,
      application_location: 'Add this FAQ to your Google Business Profile Q&A section',
      expected_impact: 'Gives AI ready-to-use answer content. FAQ format is preferred by answer engines and increases inclusion in responses.',
      estimated_minutes: 3
    };
  }

  generateRiskReductionAction(profile, evaluation) {
    const factors = evaluation.risk_factors || [];

    if (factors.some(f => f.includes('Phone'))) {
      return {
        action_type: 'add_phone_number',
        title: 'Add Your Business Phone Number',
        explanation: 'AI answer engines assess business legitimacy before recommending. A visible phone number is a basic trust signal. Without it, AI may hesitate to confidently recommend you, especially for service-based businesses.',
        exact_copy: null,
        application_location: 'Add your business phone number to your Google Business Profile',
        expected_impact: 'Reduces perceived risk and increases AI confidence. Verifiable contact information is essential for trust building.',
        estimated_minutes: 2
      };
    }

    if (factors.some(f => f.includes('credentials'))) {
      return {
        action_type: 'add_one_credential',
        title: 'List One License or Certification',
        explanation: 'Credentials signal expertise and reduce risk in AI decision-making. Even one explicit credential (license number, certification, years in business) makes you more recommendable than competitors without them.',
        exact_copy: `Licensed [credential type] #[number] | Serving [location] since [year]`,
        application_location: 'Add this to your Google Business Profile business description',
        expected_impact: 'Provides verifiable proof of legitimacy. AI prioritizes businesses with explicit credentials when making recommendations.',
        estimated_minutes: 3
      };
    }

    if (factors.some(f => f.includes('website'))) {
      return {
        action_type: 'add_website',
        title: 'Add a Website Link',
        explanation: 'A website is the strongest verification signal. AI uses it to confirm your services, location, and legitimacy. Businesses without websites are seen as higher risk and less likely to be recommended.',
        exact_copy: null,
        application_location: 'Add your website URL to all business profiles',
        expected_impact: 'Major trust increase. A website allows AI to verify claims and builds confidence across all pillars.',
        estimated_minutes: 2
      };
    }

    return {
      action_type: 'clarify_service_boundaries',
      title: 'State What You Do NOT Offer',
      explanation: 'Clarity includes boundaries. AI needs to know not just what you do, but what you do not do. This prevents inappropriate recommendations and builds trust through honesty.',
      exact_copy: `We specialize in [service] for [customer type]. We do not offer [excluded service].`,
      application_location: 'Add this clarification to your business description',
      expected_impact: 'Reduces mismatches and builds trust through transparent boundaries. AI rewards honesty and clarity.',
      estimated_minutes: 4
    };
  }

  generateConfidenceAccretionAction(profile, evaluation) {
    const opportunities = evaluation.confidence_opportunities || [];

    if (opportunities.some(o => o.includes('recent activity'))) {
      return {
        action_type: 'add_business_update',
        title: 'Post a Simple Business Update',
        explanation: 'Regular activity signals an active, reliable business. AI favors businesses that show recent engagement. One small update (new service area, seasonal hours, recent project) demonstrates you are actively managing your presence.',
        exact_copy: `Update: We are now serving [new area/offering new service/available for bookings]. Contact us at [phone] to learn more.`,
        application_location: 'Post this as a Google Business Profile update',
        expected_impact: 'Freshness signal that increases confidence. Active businesses are more recommendable than dormant ones.',
        estimated_minutes: 3
      };
    }

    if (opportunities.some(o => o.includes('AI Visibility Scores'))) {
      return {
        action_type: 'complete_profile_section',
        title: 'Complete One Missing Profile Section',
        explanation: 'Profile completeness is a confidence signal. Each additional completed section (hours, photos, attributes) gives AI more data to work with and increases recommendation confidence.',
        exact_copy: null,
        application_location: 'Add your business hours to your Google Business Profile',
        expected_impact: 'Incremental improvement in profile strength. Completeness correlates directly with recommendation frequency.',
        estimated_minutes: 3
      };
    }

    return {
      action_type: 'respond_to_review',
      title: 'Respond to Your Most Recent Review',
      explanation: 'Review responses show you are engaged and care about customer feedback. AI sees this as a quality signal. Even a simple thank you builds confidence through demonstrated responsiveness.',
      exact_copy: `Thank you for your feedback! We appreciate you choosing [Business Name] and look forward to serving you again.`,
      application_location: 'Reply to your most recent Google review',
      expected_impact: 'Engagement signal that builds trust. Responsiveness increases perceived reliability.',
      estimated_minutes: 2
    };
  }

  async getEvaluation(evaluationId) {
    const { data } = await supabase
      .from('rex_ece_evaluations')
      .select('*')
      .eq('id', evaluationId)
      .maybeSingle();
    return data;
  }

  async getLatestEvaluation(businessId) {
    const { data } = await supabase
      .from('rex_ece_evaluations')
      .select('*')
      .eq('business_id', businessId)
      .order('evaluated_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    return data;
  }

  async recordConfidenceScore(businessId, userId, pillarScores, evaluationId, type) {
    const overall = Math.round(
      (pillarScores.entity_clarity.score +
       pillarScores.consensus_shaping.score +
       pillarScores.answer_readiness.score +
       pillarScores.risk_reduction.score +
       pillarScores.confidence_accretion.score) / 5
    );

    const score = {
      business_id: businessId,
      user_id: userId,
      entity_clarity_score: pillarScores.entity_clarity.score,
      consensus_score: pillarScores.consensus_shaping.score,
      answer_readiness_score: pillarScores.answer_readiness.score,
      risk_reduction_score: pillarScores.risk_reduction.score,
      confidence_score: pillarScores.confidence_accretion.score,
      overall_confidence: overall,
      measurement_type: type,
      triggered_by_action_id: null,
      notes: `Automatic ${type} evaluation`
    };

    const { data, error } = await supabase
      .from('rex_confidence_scores')
      .insert([score])
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async updateRecommendationStatus(recommendationId, status, additionalData = {}) {
    const updates = {
      status,
      ...additionalData
    };

    if (status === 'sent_to_admin') {
      updates.sent_to_admin_at = new Date().toISOString();
    } else if (status === 'sent_to_customer') {
      updates.sent_to_customer_at = new Date().toISOString();
    } else if (status === 'approved') {
      updates.approved_at = new Date().toISOString();
    } else if (status === 'completed') {
      updates.completed_at = new Date().toISOString();
    } else if (status === 'declined') {
      updates.declined_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('rex_recommendations')
      .update(updates)
      .eq('id', recommendationId)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async completeAction(recommendationId, completionNotes, actualImpact) {
    const { data: recommendation } = await supabase
      .from('rex_recommendations')
      .select('*, rex_ece_evaluations(*)')
      .eq('id', recommendationId)
      .maybeSingle();

    if (!recommendation) throw new Error('Recommendation not found');

    const evaluation = recommendation.rex_ece_evaluations;
    const pillarKey = `${recommendation.target_pillar}_score`;
    const oldScore = evaluation[pillarKey] || 0;

    await this.updateRecommendationStatus(recommendationId, 'completed', {
      completion_notes: completionNotes,
      actual_impact_notes: actualImpact
    });

    const newEvaluation = await this.evaluateBusiness(
      recommendation.business_id,
      recommendation.user_id
    );

    const newScore = newEvaluation[pillarKey] || 0;
    const increase = newScore - oldScore;

    const { data: history } = await supabase
      .from('rex_action_history')
      .insert([{
        business_id: recommendation.business_id,
        user_id: recommendation.user_id,
        recommendation_id: recommendationId,
        evaluation_id: newEvaluation.id,
        target_pillar: recommendation.target_pillar,
        action_type: recommendation.action_type,
        title: recommendation.title,
        what_changed: completionNotes,
        where_applied: recommendation.application_location,
        confidence_before: oldScore,
        confidence_after: newScore,
        confidence_increase: increase,
        pillar_score_before: oldScore,
        pillar_score_after: newScore,
        impact_notes: actualImpact
      }])
      .select()
      .maybeSingle();

    return {
      history,
      newEvaluation,
      scoreIncrease: increase
    };
  }

  async getActiveRecommendation(businessId) {
    const { data } = await supabase
      .from('rex_recommendations')
      .select('*')
      .eq('business_id', businessId)
      .in('status', ['draft', 'sent_to_admin', 'sent_to_customer', 'approved', 'in_progress'])
      .order('generated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    return data;
  }

  async getActionHistory(businessId, limit = 10) {
    const { data } = await supabase
      .from('rex_action_history')
      .select('*')
      .eq('business_id', businessId)
      .order('completed_at', { ascending: false })
      .limit(limit);

    return data || [];
  }

  async getConfidenceTrend(businessId, days = 30) {
    const { data } = await supabase
      .rpc('get_confidence_trend', {
        p_business_id: businessId,
        p_days: days
      });

    return data || [];
  }
}

export default new RexDecisionEngine();
