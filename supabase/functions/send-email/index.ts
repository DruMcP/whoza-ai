import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface EmailRequest {
  templateId?: string;
  templateName?: string;
  userId: string;
  recipientEmail: string;
  variables?: Record<string, string>;
  campaignId?: string;
}

Deno.serve(async (req: Request) => {
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

    const { templateId, templateName, userId, recipientEmail, variables, campaignId }: EmailRequest = await req.json();

    if (!templateId && !templateName) {
      throw new Error('Either templateId or templateName is required');
    }

    if (!userId || !recipientEmail) {
      throw new Error('userId and recipientEmail are required');
    }

    let query = supabase
      .from('email_templates')
      .select('*')
      .eq('is_active', true);

    if (templateId) {
      query = query.eq('id', templateId);
    } else {
      query = query.eq('name', templateName);
    }

    const { data: template, error: templateError } = await query.maybeSingle();

    if (templateError) {
      console.error('Error fetching email template:', templateError);
      throw new Error('Failed to fetch email template');
    }

    if (!template) {
      console.warn('Email template not found:', templateName || templateId);
      throw new Error('Email template not found');
    }

    let htmlContent = template.html_content;
    let textContent = template.text_content;
    let subject = template.subject;

    if (variables) {
      Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        htmlContent = htmlContent.replace(regex, value);
        textContent = textContent.replace(regex, value);
        subject = subject.replace(regex, value);
      });
    }

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
            from: 'noreply@whoza.ai',
            to: recipientEmail,
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
      console.log('To:', recipientEmail);
      console.log('Subject:', subject);
    }

    const { error: logError } = await supabase
      .from('email_logs')
      .insert({
        user_id: userId,
        template_id: template.id,
        campaign_id: campaignId || null,
        subject: subject,
        recipient_email: recipientEmail,
        status: emailSent ? 'sent' : 'failed',
        error_message: errorMessage,
        metadata: variables || {},
      });

    if (logError) {
      console.error('Failed to log email:', logError);
    }

    return new Response(
      JSON.stringify({
        success: emailSent,
        message: emailSent ? 'Email sent successfully' : 'Failed to send email',
        error: errorMessage,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: emailSent ? 200 : 500,
      }
    );
  } catch (error) {
    console.error('Error in send-email function:', error);
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
