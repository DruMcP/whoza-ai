import { supabase, supabaseUrl, supabaseAnonKey } from '../lib/supabase';

const fetchWithTimeout = async (url, options, timeout = 10000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
};

export const emailService = {
  async sendEmail({ templateId, templateName, userId, recipientEmail, variables, campaignId }) {
    const apiUrl = `${supabaseUrl}/functions/v1/send-email`;

    const headers = {
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    };

    const response = await fetchWithTimeout(
      apiUrl,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          templateId,
          templateName,
          userId,
          recipientEmail,
          variables,
          campaignId,
        }),
      },
      10000
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send email');
    }

    return await response.json();
  },

  async startOnboardingCampaign(userId, userEmail, businessName) {
    const { data: campaign, error: campaignError } = await supabase
      .from('email_campaigns')
      .select('id')
      .eq('name', 'onboarding_sequence')
      .eq('is_active', true)
      .maybeSingle();

    if (campaignError) {
      throw new Error('Failed to fetch onboarding campaign');
    }

    if (!campaign) {
            throw new Error('Onboarding campaign not found');
    }

    const { data: firstEmail, error: emailError } = await supabase
      .from('campaign_emails')
      .select('delay_days, delay_hours')
      .eq('campaign_id', campaign.id)
      .eq('sequence_order', 1)
      .maybeSingle();

    if (emailError) {
      throw new Error('Failed to fetch campaign emails');
    }

    if (!firstEmail) {
            throw new Error('No emails in campaign');
    }

    const nextEmailDate = new Date();
    nextEmailDate.setDate(nextEmailDate.getDate() + firstEmail.delay_days);
    nextEmailDate.setHours(nextEmailDate.getHours() + firstEmail.delay_hours);

    const { data: progress, error: progressError } = await supabase
      .from('user_campaign_progress')
      .insert({
        user_id: userId,
        campaign_id: campaign.id,
        current_sequence: 1,
        next_email_at: nextEmailDate.toISOString(),
      })
      .select()
      .single();

    if (progressError) {
      if (progressError.code === '23505') {
        return { success: true, message: 'User already enrolled in campaign' };
      }
      throw progressError;
    }

    await this.sendEmail({
      templateName: 'welcome_signup',
      userId: userId,
      recipientEmail: userEmail,
      variables: {
        business_name: businessName || 'there',
        portal_url: `${window.location.origin}/portal`,
      },
      campaignId: campaign.id,
    });

    return { success: true, progress };
  },

  async getEmailLogs(userId, limit = 50) {
    const { data, error } = await supabase
      .from('email_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async getCampaignProgress(userId) {
    const { data, error } = await supabase
      .from('user_campaign_progress')
      .select(`
        *,
        email_campaigns(name, description)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getAllTemplates() {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getTemplate(id) {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async createTemplate(template) {
    const { data, error } = await supabase
      .from('email_templates')
      .insert(template)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateTemplate(id, updates) {
    const { data, error } = await supabase
      .from('email_templates')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteTemplate(id) {
    const { error } = await supabase.from('email_templates').delete().eq('id', id);

    if (error) throw error;
    return { success: true };
  },

  async getAllCampaigns() {
    const { data, error } = await supabase
      .from('email_campaigns')
      .select(`
        *,
        campaign_emails(
          *,
          email_templates(name, subject)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getCampaignStats() {
    const { data: logs, error } = await supabase
      .from('email_logs')
      .select('status, campaign_id, created_at')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (error) throw error;

    const stats = {
      total: logs.length,
      sent: logs.filter((l) => l.status === 'sent').length,
      failed: logs.filter((l) => l.status === 'failed').length,
      opened: logs.filter((l) => l.status === 'opened').length,
      clicked: logs.filter((l) => l.status === 'clicked').length,
    };

    return stats;
  },

  async processCampaignQueue() {
    const apiUrl = `${supabaseUrl}/functions/v1/process-email-campaigns`;

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to process campaign queue');
    }

    return await response.json();
  },

  async getAllEmailLogs(limit = 100) {
    const { data, error } = await supabase
      .from('email_logs')
      .select(`
        *,
        users(business_name, email),
        email_templates(name),
        email_campaigns(name)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async getAllCampaignProgress() {
    const { data, error } = await supabase
      .from('user_campaign_progress')
      .select(`
        *,
        users(business_name, email),
        email_campaigns(name, description)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },
};
