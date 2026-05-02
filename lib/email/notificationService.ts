import { supabase } from '../supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

interface CreateNotificationParams {
  userId: string
  notificationTypeName: string
  title: string
  content: string
  data?: Record<string, any>
  priority?: string
  scheduledFor?: string | null
  expiresAt?: string | null
}

interface SendNotificationParams {
  userId: string
  taskId?: string
  taskTitle?: string
  taskDescription?: string
  recommendedAction?: string
  copyPasteText?: string
  currentScore?: number
  previousScore?: number
  scoreSummary?: string
  achievements?: string
  improvementAreas?: string
  nextSteps?: string
}

export const notificationService = {
  async createNotification({
    userId,
    notificationTypeName,
    title,
    content,
    data = {},
    priority = 'normal',
    scheduledFor = null,
    expiresAt = null,
  }: CreateNotificationParams) {
    const { data: notificationType } = await supabase
      .from('notification_types')
      .select('id')
      .eq('name', notificationTypeName)
      .single()

    if (!notificationType) {
      throw new Error(`Notification type '${notificationTypeName}' not found`)
    }

    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        notification_type_id: notificationType.id,
        title,
        content,
        data,
        priority,
        scheduled_for: scheduledFor || new Date().toISOString(),
        expires_at: expiresAt,
        status: 'pending',
      })
      .select()
      .single()

    if (error) throw error
    return notification
  },

  async sendNotification(notificationId: string) {
    const apiUrl = `${supabaseUrl}/functions/v1/send-notification`

    const headers: Record<string, string> = {
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ notificationId }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to send notification')
    }

    return await response.json()
  },

  async sendWeeklyTask({ userId, taskId, taskTitle, taskDescription, recommendedAction, copyPasteText }: SendNotificationParams) {
    const { data: user } = await supabase
      .from('users')
      .select('email, business_name')
      .eq('id', userId)
      .single()

    if (!user) throw new Error('User not found')

    const notification = await this.createNotification({
      userId,
      notificationTypeName: 'weekly_task',
      title: `Your Weekly Task: ${taskTitle}`,
      content: taskDescription || '',
      data: {
        task_id: taskId,
        task_title: taskTitle,
        task_description: taskDescription,
        recommended_action: recommendedAction,
        copy_paste_text: copyPasteText,
        task_url: `${typeof window !== 'undefined' ? window.location.origin : ''}/tasks`,
        business_name: user.business_name || 'there',
      },
      priority: 'high',
    })

    return await this.sendNotification(notification.id)
  },

  async sendScoreUpdate({
    userId,
    currentScore,
    previousScore,
    scoreSummary,
    achievements,
    improvementAreas,
    nextSteps,
  }: SendNotificationParams) {
    const { data: user } = await supabase
      .from('users')
      .select('email, business_name')
      .eq('id', userId)
      .single()

    if (!user) throw new Error('User not found')

    const scoreChange = Math.abs((currentScore || 0) - (previousScore || 0))
    const trendDirection = (currentScore || 0) > (previousScore || 0) ? '↑' : (currentScore || 0) < (previousScore || 0) ? '↓' : '→'

    const notification = await this.createNotification({
      userId,
      notificationTypeName: 'score_update',
      title: `Monthly Visibility Report - ${trendDirection} ${scoreChange}%`,
      content: scoreSummary || '',
      data: {
        current_score: currentScore,
        previous_score: previousScore,
        score_change: scoreChange,
        trend_direction: trendDirection,
        score_summary: scoreSummary,
        achievements,
        improvement_areas: improvementAreas,
        next_steps: nextSteps,
        report_url: `${typeof window !== 'undefined' ? window.location.origin : ''}/reports`,
        business_name: user.business_name || 'there',
      },
      priority: 'normal',
    })

    return await this.sendNotification(notification.id)
  },

  async sendTaskReminder({ userId, taskId, taskTitle, taskStatus, dueDate }: SendNotificationParams) {
    const { data: user } = await supabase
      .from('users')
      .select('email, business_name')
      .eq('id', userId)
      .single()

    if (!user) throw new Error('User not found')

    const notification = await this.createNotification({
      userId,
      notificationTypeName: 'task_reminder',
      title: `Reminder: Complete Your Task - ${taskTitle}`,
      content: `You have a pending task to complete: ${taskTitle}`,
      data: {
        task_id: taskId,
        task_title: taskTitle,
        task_status: taskStatus,
        due_date: dueDate,
        task_url: `${typeof window !== 'undefined' ? window.location.origin : ''}/tasks`,
        business_name: user.business_name || 'there',
      },
      priority: 'normal',
    })

    return await this.sendNotification(notification.id)
  },

  async getUserPreferences(userId: string) {
    const { data, error } = await supabase
      .from('user_notification_preferences')
      .select(`
        *,
        notification_types(name, display_name, description, user_can_disable),
        notification_channels(name, display_name)
      `)
      .eq('user_id', userId)

    if (error) throw error
    return data || []
  },

  async updatePreference(preferenceId: string, updates: Record<string, any>) {
    const { data, error } = await supabase
      .from('user_notification_preferences')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', preferenceId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async createDefaultPreferences(userId: string) {
    const { data: types } = await supabase.from('notification_types').select('id, default_enabled')

    const { data: channels } = await supabase
      .from('notification_channels')
      .select('id, name')
      .eq('is_enabled', true)

    const preferences = []
    for (const type of types || []) {
      for (const channel of channels || []) {
        if (channel.name === 'email' || channel.name === 'in_app') {
          preferences.push({
            user_id: userId,
            notification_type_id: type.id,
            channel_id: channel.id,
            is_enabled: type.default_enabled,
          })
        }
      }
    }

    if (preferences.length > 0) {
      const { error } = await supabase.from('user_notification_preferences').insert(preferences)
      if (error && error.code !== '23505') {
        throw error
      }
    }
  },

  async getNotificationHistory(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from('notifications')
      .select(`
        *,
        notification_types(display_name),
        notification_delivery_log(
          channel_id,
          status,
          sent_at,
          delivered_at,
          opened_at,
          notification_channels(display_name)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  },

  async getNotificationChannels() {
    const { data, error } = await supabase
      .from('notification_channels')
      .select('*')
      .eq('is_enabled', true)
      .order('priority_order', { ascending: true })

    if (error) throw error
    return data || []
  },

  async getNotificationTypes() {
    const { data, error } = await supabase
      .from('notification_types')
      .select('*')
      .order('display_name', { ascending: true })

    if (error) throw error
    return data || []
  },

  async processNotificationQueue() {
    const apiUrl = `${supabaseUrl}/functions/v1/process-notifications`

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
      throw new Error(error.error || 'Failed to process notification queue')
    }

    return await response.json()
  },

  async getDeliveryStats(userId: string | null = null) {
    let query = supabase
      .from('notification_delivery_log')
      .select('status, channel_id, created_at, notification_channels(display_name)')

    if (userId) {
      query = query.eq('user_id', userId)
    }

    const { data, error } = await query.order('created_at', { ascending: false }).limit(1000)

    if (error) throw error

    const stats: Record<string, any> = {
      total: data?.length || 0,
      sent: data?.filter((d: any) => d.status === 'sent').length || 0,
      delivered: data?.filter((d: any) => d.status === 'delivered').length || 0,
      failed: data?.filter((d: any) => d.status === 'failed').length || 0,
      opened: data?.filter((d: any) => d.status === 'opened').length || 0,
      clicked: data?.filter((d: any) => d.status === 'clicked').length || 0,
      byChannel: {},
    }

    data?.forEach((log: any) => {
      const channelName = log.notification_channels?.display_name || 'Unknown'
      if (!stats.byChannel[channelName]) {
        stats.byChannel[channelName] = 0
      }
      stats.byChannel[channelName]++
    })

    return stats
  },

  async markAsRead(notificationId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ status: 'sent', updated_at: new Date().toISOString() })
      .eq('id', notificationId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getUnreadCount(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'sent')
      .is('data->read', null)

    if (error) throw error
    return data || 0
  },
}
