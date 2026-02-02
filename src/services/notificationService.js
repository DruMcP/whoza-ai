import { supabase, supabaseUrl, supabaseAnonKey } from '../lib/supabase';

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
  }) {
    const { data: notificationType } = await supabase
      .from('notification_types')
      .select('id')
      .eq('name', notificationTypeName)
      .single();

    if (!notificationType) {
      throw new Error(`Notification type '${notificationTypeName}' not found`);
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
      .single();

    if (error) throw error;
    return notification;
  },

  async sendNotification(notificationId) {
    const apiUrl = `${supabaseUrl}/functions/v1/send-notification`;

    const headers = {
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ notificationId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send notification');
    }

    return await response.json();
  },

  async sendWeeklyTask({ userId, taskId, taskTitle, taskDescription, recommendedAction, copyPasteText }) {
    const { data: user } = await supabase
      .from('users')
      .select('email, business_name')
      .eq('id', userId)
      .single();

    if (!user) throw new Error('User not found');

    const notification = await this.createNotification({
      userId,
      notificationTypeName: 'weekly_task',
      title: `Your Weekly Task: ${taskTitle}`,
      content: taskDescription,
      data: {
        task_id: taskId,
        task_title: taskTitle,
        task_description: taskDescription,
        recommended_action: recommendedAction,
        copy_paste_text: copyPasteText,
        task_url: `${window.location.origin}/tasks`,
        business_name: user.business_name || 'there',
      },
      priority: 'high',
    });

    return await this.sendNotification(notification.id);
  },

  async sendScoreUpdate({
    userId,
    currentScore,
    previousScore,
    scoreSummary,
    achievements,
    improvementAreas,
    nextSteps,
  }) {
    const { data: user } = await supabase
      .from('users')
      .select('email, business_name')
      .eq('id', userId)
      .single();

    if (!user) throw new Error('User not found');

    const scoreChange = Math.abs(currentScore - previousScore);
    const trendDirection = currentScore > previousScore ? '↑' : currentScore < previousScore ? '↓' : '→';

    const notification = await this.createNotification({
      userId,
      notificationTypeName: 'score_update',
      title: `Monthly Visibility Report - ${trendDirection} ${scoreChange}%`,
      content: scoreSummary,
      data: {
        current_score: currentScore,
        previous_score: previousScore,
        score_change: scoreChange,
        trend_direction: trendDirection,
        score_summary: scoreSummary,
        achievements,
        improvement_areas: improvementAreas,
        next_steps: nextSteps,
        report_url: `${window.location.origin}/reports`,
        business_name: user.business_name || 'there',
      },
      priority: 'normal',
    });

    return await this.sendNotification(notification.id);
  },

  async sendTaskReminder({ userId, taskId, taskTitle, taskStatus, dueDate }) {
    const { data: user } = await supabase
      .from('users')
      .select('email, business_name')
      .eq('id', userId)
      .single();

    if (!user) throw new Error('User not found');

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
        task_url: `${window.location.origin}/tasks`,
        business_name: user.business_name || 'there',
      },
      priority: 'normal',
    });

    return await this.sendNotification(notification.id);
  },

  async getUserPreferences(userId) {
    const { data, error } = await supabase
      .from('user_notification_preferences')
      .select(`
        *,
        notification_types(name, display_name, description, user_can_disable),
        notification_channels(name, display_name)
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  },

  async updatePreference(preferenceId, updates) {
    const { data, error } = await supabase
      .from('user_notification_preferences')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', preferenceId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async createDefaultPreferences(userId) {
    const { data: types } = await supabase.from('notification_types').select('id, default_enabled');

    const { data: channels } = await supabase
      .from('notification_channels')
      .select('id, name')
      .eq('is_enabled', true);

    const preferences = [];
    for (const type of types || []) {
      for (const channel of channels || []) {
        if (channel.name === 'email' || channel.name === 'in_app') {
          preferences.push({
            user_id: userId,
            notification_type_id: type.id,
            channel_id: channel.id,
            is_enabled: type.default_enabled,
          });
        }
      }
    }

    if (preferences.length > 0) {
      const { error } = await supabase.from('user_notification_preferences').insert(preferences);
      if (error && error.code !== '23505') {
        throw error;
      }
    }
  },

  async getNotificationHistory(userId, limit = 50) {
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
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async getNotificationChannels() {
    const { data, error } = await supabase
      .from('notification_channels')
      .select('*')
      .eq('is_enabled', true)
      .order('priority_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getNotificationTypes() {
    const { data, error } = await supabase
      .from('notification_types')
      .select('*')
      .order('display_name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async processNotificationQueue() {
    const apiUrl = `${supabaseUrl}/functions/v1/process-notifications`;

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
      throw new Error(error.error || 'Failed to process notification queue');
    }

    return await response.json();
  },

  async getDeliveryStats(userId = null) {
    let query = supabase
      .from('notification_delivery_log')
      .select('status, channel_id, created_at, notification_channels(display_name)');

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.order('created_at', { ascending: false }).limit(1000);

    if (error) throw error;

    const stats = {
      total: data.length,
      sent: data.filter((d) => d.status === 'sent').length,
      delivered: data.filter((d) => d.status === 'delivered').length,
      failed: data.filter((d) => d.status === 'failed').length,
      opened: data.filter((d) => d.status === 'opened').length,
      clicked: data.filter((d) => d.status === 'clicked').length,
      byChannel: {},
    };

    data.forEach((log) => {
      const channelName = log.notification_channels?.display_name || 'Unknown';
      if (!stats.byChannel[channelName]) {
        stats.byChannel[channelName] = 0;
      }
      stats.byChannel[channelName]++;
    });

    return stats;
  },

  async markAsRead(notificationId) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ status: 'sent', updated_at: new Date().toISOString() })
      .eq('id', notificationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUnreadCount(userId) {
    const { data, error } = await supabase
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'sent')
      .is('data->read', null);

    if (error) throw error;
    return data || 0;
  },
};
