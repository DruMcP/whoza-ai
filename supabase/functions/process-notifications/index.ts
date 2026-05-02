import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') || 'https://whoza.ai',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

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

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const now = new Date().toISOString();

    const { data: pendingNotifications, error: fetchError } = await supabase
      .from('notifications')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_for', now)
      .or(`expires_at.is.null,expires_at.gt.${now}`);

    if (fetchError) {
      throw fetchError;
    }

    if (!pendingNotifications || pendingNotifications.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No pending notifications',
          processed: 0,
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    let successCount = 0;
    let errorCount = 0;

    for (const notification of pendingNotifications) {
      try {
        const response = await fetch(`${supabaseUrl}/functions/v1/send-notification`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            notificationId: notification.id,
          }),
        });

        const result = await response.json();

        if (result.success) {
          successCount++;
        } else {
          errorCount++;
          console.error('Failed to send notification:', result.error);

          await supabase
            .from('notifications')
            .update({
              status: 'failed',
              updated_at: new Date().toISOString(),
            })
            .eq('id', notification.id);
        }
      } catch (error) {
        errorCount++;
        console.error('Error processing notification:', notification.id, error);

        await supabase
          .from('notifications')
          .update({
            status: 'failed',
            updated_at: new Date().toISOString(),
          })
          .eq('id', notification.id);
      }
    }

    const { error: expireError } = await supabase
      .from('notifications')
      .update({ status: 'expired', updated_at: new Date().toISOString() })
      .eq('status', 'pending')
      .lt('expires_at', now);

    if (expireError) {
      console.error('Error expiring notifications:', expireError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Notification queue processed',
        processed: successCount + errorCount,
        successful: successCount,
        failed: errorCount,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in process-notifications function:', error);
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
