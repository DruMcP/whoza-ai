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

    const { data: dueEmails, error: dueError } = await supabase
      .from('user_campaign_progress')
      .select(`
        *,
        users!inner(id, email, business_name),
        email_campaigns!inner(id, name, is_active)
      `)
      .is('completed_at', null)
      .eq('paused', false)
      .lte('next_email_at', now)
      .eq('email_campaigns.is_active', true);

    if (dueError) {
      throw dueError;
    }

    if (!dueEmails || dueEmails.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No emails due to send',
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

    for (const progress of dueEmails) {
      try {
        const { data: campaignEmail, error: ceError } = await supabase
          .from('campaign_emails')
          .select(`
            *,
            email_templates!inner(*)
          `)
          .eq('campaign_id', progress.campaign_id)
          .eq('sequence_order', progress.current_sequence)
          .eq('is_active', true)
          .single();

        if (ceError || !campaignEmail) {
          const { error: completeError } = await supabase
            .from('user_campaign_progress')
            .update({
              completed_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('id', progress.id);

          if (completeError) {
            console.error('Error marking campaign as complete:', completeError);
          }

          continue;
        }

        const variables = {
          business_name: progress.users.business_name || 'there',
          portal_url: `${supabaseUrl.replace('https://', 'https://app.')}/portal`,
        };

        const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            templateId: campaignEmail.template_id,
            userId: progress.user_id,
            recipientEmail: progress.users.email,
            variables: variables,
            campaignId: progress.campaign_id,
          }),
        });

        const emailResult = await emailResponse.json();

        if (emailResult.success) {
          const { data: nextEmail } = await supabase
            .from('campaign_emails')
            .select('*')
            .eq('campaign_id', progress.campaign_id)
            .eq('is_active', true)
            .gt('sequence_order', progress.current_sequence)
            .order('sequence_order', { ascending: true })
            .limit(1)
            .single();

          if (nextEmail) {
            const nextEmailDate = new Date();
            nextEmailDate.setDate(nextEmailDate.getDate() + nextEmail.delay_days);
            nextEmailDate.setHours(nextEmailDate.getHours() + nextEmail.delay_hours);

            await supabase
              .from('user_campaign_progress')
              .update({
                current_sequence: nextEmail.sequence_order,
                next_email_at: nextEmailDate.toISOString(),
                updated_at: new Date().toISOString(),
              })
              .eq('id', progress.id);
          } else {
            await supabase
              .from('user_campaign_progress')
              .update({
                completed_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })
              .eq('id', progress.id);
          }

          successCount++;
        } else {
          errorCount++;
          console.error('Failed to send email:', emailResult.error);
        }
      } catch (error) {
        errorCount++;
        console.error('Error processing email for user:', progress.user_id, error);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email campaign processing complete',
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
    console.error('Error in process-email-campaigns function:', error);
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
