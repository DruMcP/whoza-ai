import { supabase } from '../lib/supabase';
import { notificationService } from './notificationService';
import { analyticsService } from './analyticsService';
import { ECE_PILLAR_IDS } from '../constants/ecePillars';

export const visibilityScoreService = {
  async calculateScore(businessId) {
    const { data: profile } = await supabase
      .from('business_profiles')
      .select('*, users!inner(*)')
      .eq('id', businessId)
      .single();

    if (!profile) {
      throw new Error('Business profile not found');
    }

    const user = profile.users;

    const profileScore = this.calculateProfileCompletenessScore(user, profile);
    const reviewScore = this.calculateReviewQualityScore(profile);
    const citationScore = this.calculateCitationPresenceScore(profile);
    const contentScore = this.calculateContentRelevanceScore(profile);
    const technicalScore = this.calculateTechnicalSEOScore(profile);
    const socialScore = this.calculateSocialPresenceScore(profile);
    const safetyScore = this.calculateSafetyScore(profile);
    const contextScore = this.calculateContextScore(profile);

    const overallScore =
      profileScore.score +
      reviewScore.score +
      citationScore.score +
      contentScore.score +
      technicalScore.score +
      socialScore.score +
      safetyScore.score +
      contextScore.score;

    const pillarScores = {
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
    };

    const recommendations = this.generateRecommendations({
      profileScore,
      reviewScore,
      citationScore,
      contentScore,
      technicalScore,
      socialScore,
      safetyScore,
      contextScore,
    });

    const benchmarkPercentile = await this.calculateBenchmarkPercentile(
      user.trade_type,
      overallScore
    );

    const previousScore = await this.getPreviousScore(businessId);
    const monthOverMonthChange = previousScore
      ? overallScore - previousScore.overall_score
      : 0;

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
    };

    const { data: savedScore, error } = await supabase
      .from('visibility_score_details')
      .upsert(scoreData, { onConflict: 'business_id,score_date' })
      .select()
      .single();

    if (error) throw error;

    if (previousScore && monthOverMonthChange !== 0) {
      const achievements = this.formatAchievements(scoreData, previousScore);
      const improvementAreas = this.formatImprovementAreas(recommendations);
      const nextSteps = this.formatNextSteps(recommendations);

      try {
        await notificationService.sendScoreUpdate({
          userId: profile.user_id,
          currentScore: overallScore,
          previousScore: previousScore.overall_score,
          scoreSummary: this.formatScoreSummary(scoreData, previousScore),
          achievements,
          improvementAreas,
          nextSteps,
        });
      } catch (notificationError) {
      }
    }

    try {
      await analyticsService.trackScoreCalculated(profile.user_id, businessId, {
        overall_score: overallScore,
        previous_score: previousScore?.overall_score || 0,
        change: monthOverMonthChange,
        score_date: scoreData.score_date,
      });
    } catch (error) {
    }

    return savedScore;
  },

  calculateProfileCompletenessScore(user, profile) {
    let score = 0;
    const maxScore = 25;
    const checks = [];

    if (user.business_name) {
      score += 2;
      checks.push({ field: 'Business name', present: true, points: 2 });
    } else {
      checks.push({ field: 'Business name', present: false, points: 0 });
    }

    if (user.trade_type) {
      score += 2;
      checks.push({ field: 'Trade type', present: true, points: 2 });
    } else {
      checks.push({ field: 'Trade type', present: false, points: 0 });
    }

    if (user.service_area) {
      score += 3;
      checks.push({ field: 'Service area', present: true, points: 3 });
    } else {
      checks.push({ field: 'Service area', present: false, points: 0 });
    }

    if (user.postcode) {
      score += 2;
      checks.push({ field: 'Postcode', present: true, points: 2 });
    } else {
      checks.push({ field: 'Postcode', present: false, points: 0 });
    }

    if (profile.website_url) {
      score += 4;
      checks.push({ field: 'Website URL', present: true, points: 4 });
    } else {
      checks.push({ field: 'Website URL', present: false, points: 0 });
    }

    if (profile.google_business_url) {
      score += 5;
      checks.push({ field: 'Google Business Profile', present: true, points: 5 });
    } else {
      checks.push({ field: 'Google Business Profile', present: false, points: 0 });
    }

    if (profile.key_services && profile.key_services.length > 0) {
      score += 3;
      checks.push({ field: 'Key services listed', present: true, points: 3 });
    } else {
      checks.push({ field: 'Key services listed', present: false, points: 0 });
    }

    if (profile.credentials) {
      score += 2;
      checks.push({ field: 'Credentials/certifications', present: true, points: 2 });
    } else {
      checks.push({ field: 'Credentials/certifications', present: false, points: 0 });
    }

    if (user.whatsapp_number) {
      score += 1;
      checks.push({ field: 'WhatsApp number', present: true, points: 1 });
    } else {
      checks.push({ field: 'WhatsApp number', present: false, points: 0 });
    }

    if (profile.baseline_created) {
      score += 1;
      checks.push({ field: 'Baseline established', present: true, points: 1 });
    } else {
      checks.push({ field: 'Baseline established', present: false, points: 0 });
    }

    return { score: Math.min(score, maxScore), maxScore, checks };
  },

  calculateReviewQualityScore(profile) {
    let score = 0;
    const maxScore = 20;
    const checks = [];

    const reviewCount = profile.review_count || 0;
    const avgRating = profile.average_rating || 0;

    if (reviewCount === 0) {
      checks.push({ check: 'Has reviews', status: 'No reviews yet', points: 0 });
      return { score: 0, maxScore, checks };
    }

    if (reviewCount >= 1) {
      score += 3;
      checks.push({ check: 'Has at least 1 review', status: 'Yes', points: 3 });
    }

    if (reviewCount >= 5) {
      score += 3;
      checks.push({ check: 'Has 5+ reviews', status: 'Yes', points: 3 });
    }

    if (reviewCount >= 10) {
      score += 3;
      checks.push({ check: 'Has 10+ reviews', status: 'Yes', points: 3 });
    }

    if (reviewCount >= 25) {
      score += 3;
      checks.push({ check: 'Has 25+ reviews', status: 'Yes', points: 3 });
    }

    if (avgRating >= 4.0) {
      score += 4;
      checks.push({ check: 'Average rating 4.0+', status: `${avgRating.toFixed(1)}`, points: 4 });
    } else if (avgRating >= 3.5) {
      score += 2;
      checks.push({ check: 'Average rating 3.5+', status: `${avgRating.toFixed(1)}`, points: 2 });
    } else {
      checks.push({ check: 'Average rating below 3.5', status: `${avgRating.toFixed(1)}`, points: 0 });
    }

    if (avgRating >= 4.5) {
      score += 4;
      checks.push({ check: 'Excellent rating (4.5+)', status: `${avgRating.toFixed(1)}`, points: 4 });
    }

    return { score: Math.min(score, maxScore), maxScore, checks };
  },

  calculateCitationPresenceScore(profile) {
    let score = 0;
    const maxScore = 20;
    const checks = [];

    if (profile.google_business_url) {
      score += 8;
      checks.push({ platform: 'Google Business Profile', present: true, points: 8 });
    } else {
      checks.push({ platform: 'Google Business Profile', present: false, points: 0 });
    }

    if (profile.bing_places_listed) {
      score += 4;
      checks.push({ platform: 'Bing Places', present: true, points: 4 });
    } else {
      checks.push({ platform: 'Bing Places', present: false, points: 0 });
    }

    const directoryCount = profile.directory_listings?.length || 0;
    if (directoryCount >= 3) {
      score += 8;
      checks.push({ check: 'Listed on 3+ trade directories', count: directoryCount, points: 8 });
    } else if (directoryCount >= 1) {
      score += 4;
      checks.push({ check: 'Listed on trade directories', count: directoryCount, points: 4 });
    } else {
      checks.push({ check: 'No trade directory listings', count: 0, points: 0 });
    }

    return { score: Math.min(score, maxScore), maxScore, checks };
  },

  calculateContentRelevanceScore(profile) {
    let score = 0;
    const maxScore = 15;
    const checks = [];

    if (profile.has_about_page) {
      score += 3;
      checks.push({ content: 'About page', present: true, points: 3 });
    } else {
      checks.push({ content: 'About page', present: false, points: 0 });
    }

    if (profile.has_services_page) {
      score += 4;
      checks.push({ content: 'Services page', present: true, points: 4 });
    } else {
      checks.push({ content: 'Services page', present: false, points: 0 });
    }

    const blogPostCount = profile.blog_post_count || 0;
    if (blogPostCount >= 5) {
      score += 4;
      checks.push({ content: 'Blog posts', count: blogPostCount, points: 4 });
    } else if (blogPostCount >= 1) {
      score += 2;
      checks.push({ content: 'Blog posts', count: blogPostCount, points: 2 });
    } else {
      checks.push({ content: 'Blog posts', count: 0, points: 0 });
    }

    if (profile.location_specific_content) {
      score += 4;
      checks.push({ content: 'Location-specific content', present: true, points: 4 });
    } else {
      checks.push({ content: 'Location-specific content', present: false, points: 0 });
    }

    return { score: Math.min(score, maxScore), maxScore, checks };
  },

  calculateTechnicalSEOScore(profile) {
    let score = 0;
    const maxScore = 10;
    const checks = [];

    if (profile.has_schema_markup) {
      score += 4;
      checks.push({ technical: 'Schema markup (structured data)', present: true, points: 4 });
    } else {
      checks.push({ technical: 'Schema markup (structured data)', present: false, points: 0 });
    }

    if (profile.has_sitemap) {
      score += 2;
      checks.push({ technical: 'XML sitemap', present: true, points: 2 });
    } else {
      checks.push({ technical: 'XML sitemap', present: false, points: 0 });
    }

    if (profile.mobile_friendly) {
      score += 2;
      checks.push({ technical: 'Mobile-friendly website', present: true, points: 2 });
    } else {
      checks.push({ technical: 'Mobile-friendly website', present: false, points: 0 });
    }

    if (profile.has_ssl) {
      score += 1;
      checks.push({ technical: 'SSL certificate (HTTPS)', present: true, points: 1 });
    } else {
      checks.push({ technical: 'SSL certificate (HTTPS)', present: false, points: 0 });
    }

    if (profile.page_speed_score >= 80) {
      score += 1;
      checks.push({ technical: 'Good page speed', score: profile.page_speed_score, points: 1 });
    } else {
      checks.push({ technical: 'Page speed needs improvement', score: profile.page_speed_score || 0, points: 0 });
    }

    return { score: Math.min(score, maxScore), maxScore, checks };
  },

  calculateSocialPresenceScore(profile) {
    let score = 0;
    const maxScore = 10;
    const checks = [];

    if (profile.facebook_url) {
      score += 3;
      checks.push({ platform: 'Facebook', present: true, points: 3 });
    } else {
      checks.push({ platform: 'Facebook', present: false, points: 0 });
    }

    if (profile.instagram_url) {
      score += 2;
      checks.push({ platform: 'Instagram', present: true, points: 2 });
    } else {
      checks.push({ platform: 'Instagram', present: false, points: 0 });
    }

    if (profile.linkedin_url) {
      score += 2;
      checks.push({ platform: 'LinkedIn', present: true, points: 2 });
    } else {
      checks.push({ platform: 'LinkedIn', present: false, points: 0 });
    }

    const socialPostCount = profile.social_posts_last_month || 0;
    if (socialPostCount >= 4) {
      score += 3;
      checks.push({ activity: 'Regular social posting', count: socialPostCount, points: 3 });
    } else if (socialPostCount >= 1) {
      score += 1;
      checks.push({ activity: 'Some social posting', count: socialPostCount, points: 1 });
    } else {
      checks.push({ activity: 'No recent social posts', count: 0, points: 0 });
    }

    return { score: Math.min(score, maxScore), maxScore, checks };
  },

  calculateSafetyScore(profile) {
    let score = 0;
    const maxScore = 10;
    const checks = [];

    if (profile.has_ssl) {
      score += 2;
      checks.push({ safety: 'SSL/HTTPS enabled', present: true, points: 2 });
    } else {
      checks.push({ safety: 'SSL/HTTPS enabled', present: false, points: 0 });
    }

    if (profile.has_privacy_policy) {
      score += 2;
      checks.push({ safety: 'Privacy policy published', present: true, points: 2 });
    } else {
      checks.push({ safety: 'Privacy policy published', present: false, points: 0 });
    }

    if (profile.has_terms_of_service) {
      score += 1;
      checks.push({ safety: 'Terms of service published', present: true, points: 1 });
    } else {
      checks.push({ safety: 'Terms of service published', present: false, points: 0 });
    }

    const avgRating = profile.average_rating || 0;
    const reviewCount = profile.review_count || 0;

    if (avgRating >= 4.0 && reviewCount >= 5) {
      score += 3;
      checks.push({ safety: 'Strong reputation (4.0+ rating, 5+ reviews)', status: 'Yes', points: 3 });
    } else if (avgRating >= 3.5 && reviewCount >= 3) {
      score += 1;
      checks.push({ safety: 'Moderate reputation', status: 'Yes', points: 1 });
    } else {
      checks.push({ safety: 'Reputation needs building', status: 'No', points: 0 });
    }

    if (profile.credentials) {
      score += 2;
      checks.push({ safety: 'Professional credentials verified', present: true, points: 2 });
    } else {
      checks.push({ safety: 'Professional credentials verified', present: false, points: 0 });
    }

    return { score: Math.min(score, maxScore), maxScore, checks };
  },

  calculateContextScore(profile) {
    let score = 0;
    const maxScore = 10;
    const checks = [];

    if (profile.location_specific_content) {
      score += 4;
      checks.push({ context: 'Location-specific content', present: true, points: 4 });
    } else {
      checks.push({ context: 'Location-specific content', present: false, points: 0 });
    }

    if (profile.key_services && profile.key_services.length > 0) {
      score += 3;
      checks.push({ context: 'Services clearly defined', count: profile.key_services.length, points: 3 });
    } else {
      checks.push({ context: 'Services clearly defined', count: 0, points: 0 });
    }

    if (profile.has_services_page) {
      score += 2;
      checks.push({ context: 'Dedicated services page', present: true, points: 2 });
    } else {
      checks.push({ context: 'Dedicated services page', present: false, points: 0 });
    }

    const blogPostCount = profile.blog_post_count || 0;
    if (blogPostCount >= 3) {
      score += 1;
      checks.push({ context: 'Regular content updates', count: blogPostCount, points: 1 });
    } else {
      checks.push({ context: 'Regular content updates', count: blogPostCount, points: 0 });
    }

    return { score: Math.min(score, maxScore), maxScore, checks };
  },

  generateRecommendations(scores) {
    const recommendations = [];

    if (scores.profileScore.score < 20) {
      recommendations.push({
        category: 'Profile Completeness',
        priority: 'high',
        title: 'Complete your business profile',
        description: 'Fill in missing profile fields to improve AI understanding of your business',
        impact: 'high',
        effort: 'low',
      });
    }

    if (scores.reviewScore.score < 10) {
      recommendations.push({
        category: 'Reviews',
        priority: 'high',
        title: 'Build your review base',
        description: 'Request reviews from satisfied customers to establish trust and credibility',
        impact: 'high',
        effort: 'medium',
      });
    }

    if (scores.citationScore.score < 15) {
      recommendations.push({
        category: 'Citations',
        priority: 'high',
        title: 'Expand your directory presence',
        description: 'Get listed on key trade directories and local business platforms',
        impact: 'high',
        effort: 'medium',
      });
    }

    if (scores.contentScore.score < 10) {
      recommendations.push({
        category: 'Content',
        priority: 'medium',
        title: 'Create location-specific content',
        description: 'Add blog posts and pages that highlight your local expertise',
        impact: 'medium',
        effort: 'high',
      });
    }

    if (scores.technicalScore.score < 7) {
      recommendations.push({
        category: 'Technical SEO',
        priority: 'medium',
        title: 'Implement technical improvements',
        description: 'Add structured data and improve technical SEO elements',
        impact: 'medium',
        effort: 'high',
      });
    }

    if (scores.socialScore.score < 5) {
      recommendations.push({
        category: 'Social Presence',
        priority: 'low',
        title: 'Establish social media presence',
        description: 'Create profiles on key platforms and share regular updates',
        impact: 'low',
        effort: 'medium',
      });
    }

    if (scores.safetyScore.score < 7) {
      recommendations.push({
        category: 'Safety & Trust',
        priority: 'high',
        title: 'Improve trust signals',
        description: 'Add privacy policy, terms of service, and security features to build customer confidence',
        impact: 'high',
        effort: 'medium',
      });
    }

    if (scores.contextScore.score < 7) {
      recommendations.push({
        category: 'Context Precision',
        priority: 'medium',
        title: 'Add contextual content',
        description: 'Create location and service-specific content to match customer search intent',
        impact: 'medium',
        effort: 'high',
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  },

  async calculateBenchmarkPercentile(tradeType, overallScore) {
    const { data: benchmark } = await supabase
      .from('scoring_benchmarks')
      .select('*')
      .eq('trade_type', tradeType)
      .eq('metric_name', 'overall_score')
      .maybeSingle();

    if (!benchmark) {
      return 50;
    }

    if (overallScore >= benchmark.percentile_90) return 95;
    if (overallScore >= benchmark.percentile_75) return 80;
    if (overallScore >= benchmark.percentile_50) return 50;
    if (overallScore >= benchmark.percentile_25) return 25;
    return 10;
  },

  async getPreviousScore(businessId) {
    const { data } = await supabase
      .from('visibility_score_details')
      .select('*')
      .eq('business_id', businessId)
      .order('score_date', { ascending: false })
      .limit(1)
      .maybeSingle();

    return data;
  },

  async getScoreHistory(businessId, limit = 12) {
    const { data, error } = await supabase
      .from('visibility_score_details')
      .select('*')
      .eq('business_id', businessId)
      .order('score_date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async getLatestScore(businessId) {
    const { data, error } = await supabase
      .from('visibility_score_details')
      .select('*')
      .eq('business_id', businessId)
      .order('score_date', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getAllScores() {
    const { data, error } = await supabase
      .from('visibility_score_details')
      .select('*, business_profiles(*, users(business_name, trade_type))')
      .order('score_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  formatScoreSummary(currentScore, previousScore) {
    const change = currentScore.overall_score - previousScore.overall_score;
    const direction = change > 0 ? 'increased' : 'decreased';
    const absChange = Math.abs(change);

    return `Your AI Visibility Score has ${direction} by ${absChange.toFixed(1)} points this month. ${
      change > 0
        ? `Great work! Your efforts are paying off and you're becoming more visible in AI search results.`
        : `Don't worry - slight fluctuations are normal. Let's focus on the key areas that will boost your visibility.`
    }`;
  },

  formatAchievements(currentScore, previousScore) {
    const achievements = [];
    const components = [
      { name: 'Profile Completeness', current: currentScore.profile_completeness_score, previous: previousScore.profile_completeness_score },
      { name: 'Review Quality', current: currentScore.review_quality_score, previous: previousScore.review_quality_score },
      { name: 'Citation Presence', current: currentScore.citation_presence_score, previous: previousScore.citation_presence_score },
      { name: 'Content Relevance', current: currentScore.content_relevance_score, previous: previousScore.content_relevance_score },
      { name: 'Technical SEO', current: currentScore.technical_seo_score, previous: previousScore.technical_seo_score },
      { name: 'Social Presence', current: currentScore.social_presence_score, previous: previousScore.social_presence_score },
    ];

    components.forEach(comp => {
      const improvement = comp.current - comp.previous;
      if (improvement > 1) {
        achievements.push(`✓ ${comp.name}: +${improvement.toFixed(1)} points`);
      }
    });

    if (achievements.length === 0) {
      achievements.push('✓ Maintained your AI Visibility Score');
    }

    return achievements.join('\n');
  },

  formatImprovementAreas(recommendations) {
    if (!recommendations || recommendations.length === 0) {
      return 'No specific areas identified - keep up the great work!';
    }

    return recommendations
      .slice(0, 3)
      .map((rec, index) => `${index + 1}. ${rec.title}`)
      .join('\n');
  },

  formatNextSteps(recommendations) {
    if (!recommendations || recommendations.length === 0) {
      return 'Continue completing your weekly tasks to maintain and improve your score.';
    }

    return recommendations
      .slice(0, 3)
      .map((rec, index) => `${index + 1}. ${rec.action}`)
      .join('\n');
  },
};
