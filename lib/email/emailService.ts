import { supabase } from '../supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 10000): Promise<Response> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error: any) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      throw new Error('Request timed out')
    }
    throw error
  }
}

interface SendEmailParams {
  templateId?: string
  templateName?: string
  userId: string
  recipientEmail: string
  variables?: Record<string, any>
  campaignId?: string
}

interface CampaignProgress {
  id: string
  user_id: string
  campaign_id: string
  current_sequence: number
  started_at: string
  next_email_at: string | null
  completed_at: string | null
  paused: boolean
  created_at: string
  updated_at: string
  email_campaigns?: { name: string; description: string }
}

interface EmailLog {
  id: string
  user_id: string
  template_id: string | null
  campaign_id: string | null
  subject: string
  recipient_email: string
  status: string
  sent_at: string
  opened_at: string | null
  clicked_at: string | null
  error_message: string | null
  metadata: Record<string, any>
  created_at: string
}

interface EmailTemplate {
  id: string
  name: string
  subject: string
  html_content: string
  text_content: string
  category: string
  variables: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

interface Campaign {
  id: string
  name: string
  description: string | null
  trigger_event: string
  is_active: boolean
  created_at: string
  updated_at: string
  campaign_emails?: Array<{
    id: string
    sequence_order: number
    delay_days: number
    delay_hours: number
    is_active: boolean
    email_templates?: { name: string; subject: string }
  }>
}

export const emailService = {
  async sendEmail({ templateId, templateName, userId, recipientEmail, variables, campaignId }: SendEmailParams) {
    const apiUrl = `${supabaseUrl}/functions/v1/send-email`

    const headers: Record<string, string> = {
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    }

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
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to send email')
    }

    return await response.json()
  },

  async startOnboardingCampaign(userId: string, userEmail: string, businessName: string) {
    const { data: campaign, error: campaignError } = await supabase
      .from('email_campaigns')
      .select('id')
      .eq('name', 'onboarding_sequence')
      .eq('is_active', true)
      .maybeSingle()

    if (campaignError) {
      throw new Error('Failed to fetch onboarding campaign')
    }

    if (!campaign) {
      throw new Error('Onboarding campaign not found')
    }

    const { data: firstEmail, error: emailError } = await supabase
      .from('campaign_emails')
      .select('delay_days, delay_hours')
      .eq('campaign_id', campaign.id)
      .eq('sequence_order', 1)
      .maybeSingle()

    if (emailError) {
      throw new Error('Failed to fetch campaign emails')
    }

    if (!firstEmail) {
      throw new Error('No emails in campaign')
    }

    const nextEmailDate = new Date()
    nextEmailDate.setDate(nextEmailDate.getDate() + firstEmail.delay_days)
    nextEmailDate.setHours(nextEmailDate.getHours() + firstEmail.delay_hours)

    const { data: progress, error: progressError } = await supabase
      .from('user_campaign_progress')
      .insert({
        user_id: userId,
        campaign_id: campaign.id,
        current_sequence: 1,
        next_email_at: nextEmailDate.toISOString(),
      })
      .select()
      .single()

    if (progressError) {
      if (progressError.code === '23505') {
        return { success: true, message: 'User already enrolled in campaign' }
      }
      throw progressError
    }

    await this.sendEmail({
      templateName: 'welcome_signup',
      userId: userId,
      recipientEmail: userEmail,
      variables: {
        business_name: businessName || 'there',
        portal_url: `${typeof window !== 'undefined' ? window.location.origin : ''}/portal`,
      },
      campaignId: campaign.id,
    })

    return { success: true, progress }
  },

  async getEmailLogs(userId: string, limit = 50): Promise<EmailLog[]> {
    const { data, error } = await supabase
      .from('email_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  },

  async getCampaignProgress(userId: string): Promise<CampaignProgress[]> {
    const { data, error } = await supabase
      .from('user_campaign_progress')
      .select(`
        *,
        email_campaigns(name, description)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async getAllTemplates(): Promise<EmailTemplate[]> {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async getTemplate(id: string): Promise<EmailTemplate> {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async createTemplate(template: Partial<EmailTemplate>): Promise<EmailTemplate> {
    const { data, error } = await supabase
      .from('email_templates')
      .insert(template)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateTemplate(id: string, updates: Partial<EmailTemplate>): Promise<EmailTemplate> {
    const { data, error } = await supabase
      .from('email_templates')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteTemplate(id: string): Promise<{ success: boolean }> {
    const { error } = await supabase.from('email_templates').delete().eq('id', id)

    if (error) throw error
    return { success: true }
  },

  async getAllCampaigns(): Promise<Campaign[]> {
    const { data, error } = await supabase
      .from('email_campaigns')
      .select(`
        *,
        campaign_emails(
          *,
          email_templates(name, subject)
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async getCampaignStats(): Promise<{ total: number; sent: number; failed: number; opened: number; clicked: number }> {
    const { data: logs, error } = await supabase
      .from('email_logs')
      .select('status, campaign_id, created_at')
      .order('created_at', { ascending: false })
      .limit(1000)

    if (error) throw error

    const stats = {
      total: logs?.length || 0,
      sent: logs?.filter((l: any) => l.status === 'sent').length || 0,
      failed: logs?.filter((l: any) => l.status === 'failed').length || 0,
      opened: logs?.filter((l: any) => l.status === 'opened').length || 0,
      clicked: logs?.filter((l: any) => l.status === 'clicked').length || 0,
    }

    return stats
  },

  async processCampaignQueue() {
    const apiUrl = `${supabaseUrl}/functions/v1/process-email-campaigns`

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({}),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to process campaign queue')
    }

    return await response.json()
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
      .limit(limit)

    if (error) throw error
    return data || []
  },

  async getAllCampaignProgress() {
    const { data, error } = await supabase
      .from('user_campaign_progress')
      .select(`
        *,
        users(business_name, email),
        email_campaigns(name, description)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },
}
