import { supabase } from '../lib/supabase';

export const analyticsService = {
  async trackEvent(eventType, eventCategory, eventData = {}, userId = null, businessId = null) {
    try {
      const { data, error } = await supabase.rpc('track_analytics_event', {
        p_event_type: eventType,
        p_event_category: eventCategory,
        p_user_id: userId,
        p_business_id: businessId,
        p_event_data: eventData,
        p_metadata: {
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        },
      });

      if (error) {
        // TODO: Review error handling: console.error('Error tracking event:', error)
      }
      return data;
    } catch (error) {
      // TODO: Review error handling: console.error('Failed to track event:', error)
    }
  },

  async getUserEngagementMetrics(userId, periodType = 'monthly', limit = 12) {
    const { data, error } = await supabase
      .from('user_engagement_metrics')
      .select('*')
      .eq('user_id', userId)
      .eq('period_type', periodType)
      .order('period_start', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async getPlatformMetrics(periodType = 'monthly', limit = 12) {
    const { data, error } = await supabase
      .from('platform_metrics')
      .select('*')
      .eq('period_type', periodType)
      .order('period_start', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async getUserLTV(userId) {
    const { data, error } = await supabase
      .from('user_lifetime_value')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async calculateUserEngagement(userId, startDate, endDate) {
    const { data: events, error } = await supabase
      .from('analytics_events')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate)
      .lte('created_at', endDate);

    if (error) throw error;

    const loginEvents = events?.filter((e) => e.event_type === 'user_login') || [];
    const portalVisits = events?.filter((e) => e.event_type === 'portal_visit') || [];
    const taskEvents = events?.filter((e) => e.event_type === 'task_completed') || [];

    const { data: profile } = await supabase
      .from('business_profiles')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    let tasksAssigned = 0;
    let tasksCompleted = taskEvents.length;

    if (profile) {
      const { count: assignedCount } = await supabase
        .from('tasks')
        .select('*', { count: 'exact', head: true })
        .eq('business_id', profile.id)
        .gte('created_at', startDate)
        .lte('created_at', endDate);

      tasksAssigned = assignedCount || 0;
    }

    const completionRate = tasksAssigned > 0 ? (tasksCompleted / tasksAssigned) * 100 : 0;

    const engagementScore = this.calculateEngagementScore({
      logins: loginEvents.length,
      visits: portalVisits.length,
      taskCompletion: completionRate,
    });

    return {
      logins: loginEvents.length,
      portalVisits: portalVisits.length,
      tasksAssigned,
      tasksCompleted,
      completionRate,
      engagementScore,
    };
  },

  calculateEngagementScore(metrics) {
    const loginScore = Math.min(metrics.logins * 5, 30);
    const visitScore = Math.min(metrics.visits * 2, 20);
    const taskScore = Math.min(metrics.taskCompletion * 0.5, 50);

    return Math.round(loginScore + visitScore + taskScore);
  },

  async getRecentEvents(userId = null, limit = 50) {
    let query = supabase
      .from('analytics_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async getUserTaskCompletionTrend(userId, months = 6) {
    const metrics = await this.getUserEngagementMetrics(userId, 'monthly', months);

    return metrics.map((m) => ({
      period: m.period_start,
      assigned: m.tasks_assigned,
      completed: m.tasks_completed,
      rate: m.task_completion_rate,
    }));
  },

  async getUserScoreTrend(userId, months = 12) {
    const { data: profile } = await supabase
      .from('business_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (!profile) return [];

    const { data: scores } = await supabase
      .from('visibility_score_details')
      .select('score_date, overall_score')
      .eq('business_id', profile.id)
      .order('score_date', { ascending: false })
      .limit(months);

    return scores || [];
  },

  async getPlatformOverview() {
    const { data: latestMetrics } = await supabase
      .from('platform_metrics')
      .select('*')
      .eq('period_type', 'monthly')
      .order('period_start', { ascending: false })
      .limit(1)
      .maybeSingle();

    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    const { count: activeUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gte('last_login', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    const { data: avgScore } = await supabase
      .from('visibility_score_details')
      .select('overall_score')
      .order('score_date', { ascending: false })
      .limit(100);

    const averageVisibilityScore = avgScore && avgScore.length > 0
      ? avgScore.reduce((sum, s) => sum + s.overall_score, 0) / avgScore.length
      : 0;

    return {
      totalUsers: totalUsers || 0,
      activeUsers: activeUsers || 0,
      averageVisibilityScore: Math.round(averageVisibilityScore),
      mrr: latestMetrics?.mrr || 0,
      churnRate: latestMetrics?.churn_rate || 0,
      conversionRate: latestMetrics?.trial_conversion_rate || 0,
      ...latestMetrics,
    };
  },

  async getCohortAnalysis() {
    const { data, error } = await supabase
      .from('user_cohorts')
      .select('*')
      .order('cohort_start_date', { ascending: false })
      .limit(12);

    if (error) throw error;
    return data || [];
  },

  async getConversionFunnel() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const { count: signups } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString());

    const { count: profilesCreated } = await supabase
      .from('business_profiles')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString());

    const { count: tasksCompleted } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Completed')
      .gte('completed_at', thirtyDaysAgo.toISOString());

    const { count: paidUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .neq('subscription_plan', 'free')
      .gte('created_at', thirtyDaysAgo.toISOString());

    return {
      signups: signups || 0,
      profilesCreated: profilesCreated || 0,
      tasksCompleted: tasksCompleted || 0,
      paidConversions: paidUsers || 0,
      conversionRate: signups > 0 ? ((paidUsers / signups) * 100).toFixed(2) : 0,
    };
  },

  async getChurnAnalysis() {
    const { data: subscriptionEvents } = await supabase
      .from('subscription_events')
      .select('*')
      .order('event_date', { ascending: false })
      .limit(100);

    const cancelled = subscriptionEvents?.filter((e) => e.event_type === 'cancelled') || [];
    const renewed = subscriptionEvents?.filter((e) => e.event_type === 'renewed') || [];

    const { count: totalPaying } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .neq('subscription_plan', 'free');

    const churnRate = totalPaying > 0 ? ((cancelled.length / totalPaying) * 100).toFixed(2) : 0;

    return {
      totalPaying: totalPaying || 0,
      cancelled: cancelled.length,
      renewed: renewed.length,
      churnRate,
      reasons: this.groupChurnReasons(cancelled),
    };
  },

  groupChurnReasons(cancelledEvents) {
    const reasons = {};
    cancelledEvents.forEach((event) => {
      const reason = event.metadata?.reason || 'Not specified';
      reasons[reason] = (reasons[reason] || 0) + 1;
    });
    return reasons;
  },

  async getLTVAnalysis() {
    const { data, error } = await supabase
      .from('user_lifetime_value')
      .select('*')
      .order('predicted_ltv', { ascending: false })
      .limit(100);

    if (error) throw error;

    const ltv = data || [];
    const avgLTV = ltv.length > 0
      ? ltv.reduce((sum, u) => sum + parseFloat(u.predicted_ltv || 0), 0) / ltv.length
      : 0;

    const highValueUsers = ltv.filter((u) => parseFloat(u.predicted_ltv) > avgLTV * 1.5);
    const atRiskUsers = ltv.filter((u) => parseFloat(u.risk_score) > 0.7);

    return {
      averageLTV: avgLTV.toFixed(2),
      highValueCount: highValueUsers.length,
      atRiskCount: atRiskUsers.length,
      topUsers: ltv.slice(0, 10),
      distribution: this.getLTVDistribution(ltv),
    };
  },

  getLTVDistribution(ltvData) {
    const ranges = {
      '0-50': 0,
      '51-100': 0,
      '101-250': 0,
      '251-500': 0,
      '501+': 0,
    };

    ltvData.forEach((user) => {
      const ltv = parseFloat(user.predicted_ltv || 0);
      if (ltv <= 50) ranges['0-50']++;
      else if (ltv <= 100) ranges['51-100']++;
      else if (ltv <= 250) ranges['101-250']++;
      else if (ltv <= 500) ranges['251-500']++;
      else ranges['501+']++;
    });

    return ranges;
  },

  async trackUserLogin(userId) {
    return this.trackEvent('user_login', 'user_action', {}, userId);
  },

  async trackPortalVisit(userId) {
    return this.trackEvent('portal_visit', 'engagement', {}, userId);
  },

  async trackTaskCompleted(userId, businessId, taskData) {
    return this.trackEvent('task_completed', 'business_metric', taskData, userId, businessId);
  },

  async trackScoreCalculated(userId, businessId, scoreData) {
    return this.trackEvent('score_calculated', 'business_metric', scoreData, userId, businessId);
  },

  async trackSubscriptionChange(userId, eventType, fromPlan, toPlan, mrrChange) {
    await this.trackEvent('subscription_change', 'business_metric', {
      event_type: eventType,
      from_plan: fromPlan,
      to_plan: toPlan,
      mrr_change: mrrChange,
    }, userId);

    return supabase.from('subscription_events').insert({
      user_id: userId,
      event_type: eventType,
      from_plan: fromPlan,
      to_plan: toPlan,
      mrr_change: mrrChange,
      event_date: new Date().toISOString().split('T')[0],
    });
  },

  async getUserDashboardData(userId) {
    const [engagement, taskTrend, scoreTrend, ltv] = await Promise.all([
      this.getUserEngagementMetrics(userId, 'monthly', 6),
      this.getUserTaskCompletionTrend(userId, 6),
      this.getUserScoreTrend(userId, 6),
      this.getUserLTV(userId),
    ]);

    const latestEngagement = engagement[0] || {
      engagement_score: 0,
      task_completion_rate: 0,
      logins_count: 0,
    };

    return {
      engagementScore: latestEngagement.engagement_score || 0,
      taskCompletionRate: latestEngagement.task_completion_rate || 0,
      loginsThisMonth: latestEngagement.logins_count || 0,
      taskTrend: taskTrend.reverse(),
      scoreTrend: scoreTrend.reverse(),
      lifetimeValue: ltv,
      monthlyMetrics: engagement.reverse(),
    };
  },

  async getAdminDashboardData() {
    const [overview, cohorts, funnel, churn, ltvAnalysis, recentMetrics] = await Promise.all([
      this.getPlatformOverview(),
      this.getCohortAnalysis(),
      this.getConversionFunnel(),
      this.getChurnAnalysis(),
      this.getLTVAnalysis(),
      this.getPlatformMetrics('monthly', 6),
    ]);

    return {
      overview,
      cohorts,
      funnel,
      churn,
      ltv: ltvAnalysis,
      monthlyMetrics: recentMetrics.reverse(),
    };
  },

  async exportAnalyticsData(userId = null, startDate, endDate, format = 'json') {
    const query = supabase
      .from('analytics_events')
      .select('*')
      .gte('created_at', startDate)
      .lte('created_at', endDate);

    if (userId) {
      query.eq('user_id', userId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;

    if (format === 'csv') {
      return this.convertToCSV(data);
    }

    return data;
  },

  convertToCSV(data) {
    if (!data || data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];

    data.forEach((row) => {
      const values = headers.map((header) => {
        const value = row[header];
        if (typeof value === 'object') {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        return `"${String(value).replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
  },
};
