import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') || 'https://whoza.ai',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface NotificationRequest {
  notificationId: string;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { notificationId }: NotificationRequest = await req.json();

    if (!notificationId) {
      throw new Error('notificationId is required');
    }

    const { data: notification, error: notificationError } = await supabase
      .from('notifications')
      .select(`
        *,
        users!inner(id, email, business_name, subscription_plan),
        notification_types!inner(id, name)
      `)
      .eq('id', notificationId)
      .single();

    if (notificationError || !notification) {
      throw new Error('Notification not found');
    }

    await supabase
      .from('notifications')
      .update({ status: 'processing', updated_at: new Date().toISOString() })
      .eq('id', notificationId);

    const { data: preferences } = await supabase
      .from('user_notification_preferences')
      .select(`
        *,
        notification_channels!inner(id, name, display_name, is_enabled, priority_order)
      `)
      .eq('user_id', notification.user_id)
      .eq('notification_type_id', notification.notification_type_id)
      .eq('is_enabled', true)
      .eq('notification_channels.is_enabled', true)
      .order('notification_channels.priority_order', { ascending: true });

    if (!preferences || preferences.length === 0) {
      console.log('No enabled channels for user, using default email');
      const { data: emailChannel } = await supabase
        .from('notification_channels')
        .select('*')
        .eq('name', 'email')
        .single();

      if (emailChannel) {
        await sendViaEmail(supabase, notification, emailChannel, resendApiKey);
      }
    } else {
      for (const pref of preferences) {
        const channel = pref.notification_channels;
        
        if (channel.name === 'email') {
          await sendViaEmail(supabase, notification, channel, resendApiKey);
        } else if (channel.name === 'in_app') {
          await sendViaInApp(supabase, notification, channel);
        }
      }
    }

    await supabase
      .from('notifications')
      .update({ status: 'sent', updated_at: new Date().toISOString() })
      .eq('id', notificationId);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Notification sent successfully',
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in send-notification function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});

async function sendViaEmail(supabase: any, notification: any, channel: any, resendApiKey: string | undefined) {
  try {
    const { data: template } = await supabase
      .from('notification_templates')
      .select('*')
      .eq('notification_type_id', notification.notification_type_id)
      .eq('channel_id', channel.id)
      .eq('is_active', true)
      .single();

    if (!template) {
      throw new Error('Email template not found');
    }

    let subject = template.subject_template;
    let htmlContent = template.html_template || template.content_template;
    let textContent = template.content_template;

    const variables = notification.data || {};
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      subject = subject.replace(regex, String(value));
      htmlContent = htmlContent.replace(regex, String(value));
      textContent = textContent.replace(regex, String(value));
    });

    let emailSent = false;
    let errorMessage = null;

    if (resendApiKey) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'notifications@whoza.ai',
            to: notification.users.email,
            subject: subject,
            html: htmlContent,
            text: textContent,
          }),
        });

        if (resendResponse.ok) {
          emailSent = true;
        } else {
          const errorData = await resendResponse.json();
          errorMessage = errorData.message || 'Failed to send email via Resend';
        }
      } catch (error) {
        errorMessage = error.message;
      }
    } else {
      emailSent = true;
      console.log('RESEND_API_KEY not configured - email would be sent in production');
      console.log('To:', notification.users.email);
      console.log('Subject:', subject);
    }

    await supabase.from('notification_delivery_log').insert({
      notification_id: notification.id,
      user_id: notification.user_id,
      channel_id: channel.id,
      recipient: notification.users.email,
      status: emailSent ? 'sent' : 'failed',
      error_message: errorMessage,
      metadata: { subject },
    });

    return emailSent;
  } catch (error) {
    console.error('Error sending email:', error);
    await supabase.from('notification_delivery_log').insert({
      notification_id: notification.id,
      user_id: notification.user_id,
      channel_id: channel.id,
      recipient: notification.users.email,
      status: 'failed',
      error_message: error.message,
    });
    return false;
  }
}

async function sendViaInApp(supabase: any, notification: any, channel: any) {
  try {
    await supabase.from('notification_delivery_log').insert({
      notification_id: notification.id,
      user_id: notification.user_id,
      channel_id: channel.id,
      recipient: 'in-app',
      status: 'sent',
      metadata: { in_app: true },
    });

    return true;
  } catch (error) {
    console.error('Error logging in-app notification:', error);
    return false;
  }
}
