import { supabase } from '../lib/supabase';

export const dashboardService = {
  async getUserProfile(userId) {
    const [userResult, profileResult] = await Promise.all([
      supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle(),
      supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle(),
    ]);

    if (userResult.error) throw userResult.error;
    if (profileResult.error) throw profileResult.error;

    return {
      user: userResult.data,
      profile: profileResult.data,
    };
  },

  async updateUserProfile(userId, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateBusinessProfile(userId, updates) {
    const { data, error } = await supabase
      .from('business_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getCurrentScore(userId) {
    const { data: profile } = await supabase
      .from('business_profiles')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (!profile) return null;

    const { data, error } = await supabase
      .from('visibility_score_details')
      .select('*')
      .eq('business_id', profile.id)
      .order('score_date', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getScoreHistory(userId, limit = 10) {
    const { data: profile } = await supabase
      .from('business_profiles')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (!profile) return [];

    const { data, error } = await supabase
      .from('visibility_score_details')
      .select('*')
      .eq('business_id', profile.id)
      .order('score_date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async getLatestTask(userId) {
    const { data: profile } = await supabase
      .from('business_profiles')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (!profile) return null;

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('business_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getTaskHistory(userId, limit = 20) {
    const { data: profile } = await supabase
      .from('business_profiles')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (!profile) return [];

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('business_id', profile.id)
      .in('status', ['Approved', 'Completed'])
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async updateTaskStatus(taskId, status) {
    const updates = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (status === 'Approved') {
      updates.approved_at = new Date().toISOString();
    } else if (status === 'Completed') {
      updates.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getSubscription(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('plan, stripe_customer_id, stripe_subscription_id')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },
};
