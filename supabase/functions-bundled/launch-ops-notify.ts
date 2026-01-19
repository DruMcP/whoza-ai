/*
 * Launch Ops Notification Agent
 * Sends email notifications for post reviews and campaign updates
 * Uses existing send-email function pattern
 */

import { createClient } from "npm:@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: "post_review" | "post_approved" | "post_rejected" | "campaign_complete";
  post_id?: string;
  campaign_id?: string;
  recipient_email: string;
  recipient_name?: string;
  details?: Record<string, unknown>;
}

const EMAIL_TEMPLATES = {
  post_review: {
    subject: "🔔 New Post Awaiting Review - Launch Ops",
    getBody: (data: Record<string, unknown>) => `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f1a; color: #e0e0e0; padding: 32px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026746483/mtFBilevEElqjAmm.png" alt="whoza.ai" style="max-width: 200px; height: auto; margin-bottom: 16px;" />
          <div style="display: inline-flex; align-items: center; gap: 12px;">
            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #39FF14, #00D4AA); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 24px;">⚡</span>
            </div>
            <span style="font-size: 24px; font-weight: bold; color: #fff;">Launch Ops</span>
          </div>
        </div>
        
        <h2 style="color: #39FF14; margin-bottom: 16px;">New Post Ready for Review</h2>
        
        <p style="color: #a0a0a0; line-height: 1.6;">
          A new ${data.platform || 'social media'} post has been submitted and is awaiting your review.
        </p>
        
        <div style="background: #1a1f2e; border-radius: 8px; padding: 20px; margin: 24px 0; border-left: 4px solid #39FF14;">
          <p style="margin: 0 0 8px 0; color: #a0a0a0; font-size: 12px; text-transform: uppercase;">Content Preview</p>
          <p style="margin: 0; color: #fff; line-height: 1.6;">${data.content_preview || 'Click below to view the full post.'}</p>
        </div>
        
        <div style="display: flex; gap: 16px; margin-top: 24px;">
          <div style="flex: 1; background: #1a1f2e; padding: 16px; border-radius: 8px; text-align: center;">
            <p style="margin: 0 0 4px 0; color: #a0a0a0; font-size: 12px;">Platform</p>
            <p style="margin: 0; color: #fff; font-weight: 600;">${data.platform || 'N/A'}</p>
          </div>
          <div style="flex: 1; background: #1a1f2e; padding: 16px; border-radius: 8px; text-align: center;">
            <p style="margin: 0 0 4px 0; color: #a0a0a0; font-size: 12px;">Type</p>
            <p style="margin: 0; color: #fff; font-weight: 600;">${data.content_type || 'N/A'}</p>
          </div>
          <div style="flex: 1; background: #1a1f2e; padding: 16px; border-radius: 8px; text-align: center;">
            <p style="margin: 0 0 4px 0; color: #a0a0a0; font-size: 12px;">Scheduled</p>
            <p style="margin: 0; color: #fff; font-weight: 600;">${data.scheduled_for || 'Not set'}</p>
          </div>
        </div>
        
        <a href="${data.review_url || '#'}" style="display: block; background: linear-gradient(135deg, #39FF14, #00D4AA); color: #0a0f1a; text-decoration: none; padding: 16px 32px; border-radius: 8px; text-align: center; font-weight: 600; margin-top: 32px;">
          Review Post Now →
        </a>
        
        <p style="color: #666; font-size: 12px; text-align: center; margin-top: 32px;">
          This notification was sent by Launch Ops for whoza.ai
        </p>
      </div>
    `,
  },
  post_approved: {
    subject: "✅ Post Approved - Launch Ops",
    getBody: (data: Record<string, unknown>) => `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f1a; color: #e0e0e0; padding: 32px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026746483/mtFBilevEElqjAmm.png" alt="whoza.ai" style="max-width: 200px; height: auto; margin-bottom: 16px;" />
          <div style="display: inline-flex; align-items: center; gap: 12px;">
            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #39FF14, #00D4AA); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 24px;">⚡</span>
            </div>
            <span style="font-size: 24px; font-weight: bold; color: #fff;">Launch Ops</span>
          </div>
        </div>
        
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="width: 64px; height: 64px; background: #39FF14; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
            <span style="font-size: 32px;">✓</span>
          </div>
        </div>
        
        <h2 style="color: #39FF14; text-align: center; margin-bottom: 16px;">Post Approved!</h2>
        
        <p style="color: #a0a0a0; line-height: 1.6; text-align: center;">
          Your ${data.platform || 'social media'} post has been approved and ${data.scheduled_for ? 'is scheduled for publishing.' : 'is ready to publish.'}
        </p>
        
        ${data.scheduled_for ? `
        <div style="background: #1a1f2e; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
          <p style="margin: 0 0 8px 0; color: #a0a0a0; font-size: 12px; text-transform: uppercase;">Scheduled For</p>
          <p style="margin: 0; color: #39FF14; font-size: 20px; font-weight: 600;">${data.scheduled_for}</p>
        </div>
        ` : ''}
        
        <p style="color: #666; font-size: 12px; text-align: center; margin-top: 32px;">
          This notification was sent by Launch Ops for whoza.ai
        </p>
      </div>
    `,
  },
  post_rejected: {
    subject: "⚠️ Post Needs Revision - Launch Ops",
    getBody: (data: Record<string, unknown>) => `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f1a; color: #e0e0e0; padding: 32px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026746483/mtFBilevEElqjAmm.png" alt="whoza.ai" style="max-width: 200px; height: auto; margin-bottom: 16px;" />
          <div style="display: inline-flex; align-items: center; gap: 12px;">
            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #39FF14, #00D4AA); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 24px;">⚡</span>
            </div>
            <span style="font-size: 24px; font-weight: bold; color: #fff;">Launch Ops</span>
          </div>
        </div>
        
        <h2 style="color: #FFB800; margin-bottom: 16px;">Post Needs Revision</h2>
        
        <p style="color: #a0a0a0; line-height: 1.6;">
          Your ${data.platform || 'social media'} post has been reviewed and requires some changes before it can be published.
        </p>
        
        ${data.rejection_reason ? `
        <div style="background: #1a1f2e; border-radius: 8px; padding: 20px; margin: 24px 0; border-left: 4px solid #FFB800;">
          <p style="margin: 0 0 8px 0; color: #a0a0a0; font-size: 12px; text-transform: uppercase;">Feedback</p>
          <p style="margin: 0; color: #fff; line-height: 1.6;">${data.rejection_reason}</p>
        </div>
        ` : ''}
        
        <a href="${data.edit_url || '#'}" style="display: block; background: linear-gradient(135deg, #FFB800, #FF8C00); color: #0a0f1a; text-decoration: none; padding: 16px 32px; border-radius: 8px; text-align: center; font-weight: 600; margin-top: 32px;">
          Edit Post →
        </a>
        
        <p style="color: #666; font-size: 12px; text-align: center; margin-top: 32px;">
          This notification was sent by Launch Ops for whoza.ai
        </p>
      </div>
    `,
  },
  campaign_complete: {
    subject: "🎉 Campaign Complete - Launch Ops",
    getBody: (data: Record<string, unknown>) => `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f1a; color: #e0e0e0; padding: 32px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026746483/mtFBilevEElqjAmm.png" alt="whoza.ai" style="max-width: 200px; height: auto; margin-bottom: 16px;" />
          <div style="display: inline-flex; align-items: center; gap: 12px;">
            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #39FF14, #00D4AA); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 24px;">⚡</span>
            </div>
            <span style="font-size: 24px; font-weight: bold; color: #fff;">Launch Ops</span>
          </div>
        </div>
        
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 48px;">🎉</span>
        </div>
        
        <h2 style="color: #39FF14; text-align: center; margin-bottom: 16px;">Campaign Complete!</h2>
        
        <p style="color: #a0a0a0; line-height: 1.6; text-align: center;">
          Congratulations! Your campaign "${data.campaign_name || 'Marketing Campaign'}" has been completed.
        </p>
        
        <div style="display: flex; gap: 16px; margin-top: 24px;">
          <div style="flex: 1; background: #1a1f2e; padding: 16px; border-radius: 8px; text-align: center;">
            <p style="margin: 0 0 4px 0; color: #a0a0a0; font-size: 12px;">Posts Published</p>
            <p style="margin: 0; color: #39FF14; font-size: 24px; font-weight: 600;">${data.posts_published || 0}</p>
          </div>
          <div style="flex: 1; background: #1a1f2e; padding: 16px; border-radius: 8px; text-align: center;">
            <p style="margin: 0 0 4px 0; color: #a0a0a0; font-size: 12px;">Duration</p>
            <p style="margin: 0; color: #fff; font-size: 24px; font-weight: 600;">${data.duration || 'N/A'}</p>
          </div>
        </div>
        
        <a href="${data.report_url || '#'}" style="display: block; background: linear-gradient(135deg, #39FF14, #00D4AA); color: #0a0f1a; text-decoration: none; padding: 16px 32px; border-radius: 8px; text-align: center; font-weight: 600; margin-top: 32px;">
          View Campaign Report →
        </a>
        
        <p style="color: #666; font-size: 12px; text-align: center; margin-top: 32px;">
          This notification was sent by Launch Ops for whoza.ai
        </p>
      </div>
    `,
  },
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const body: NotificationRequest = await req.json();
    const { type, post_id, campaign_id, recipient_email, recipient_name, details } = body;

    // Validate request
    if (!type || !recipient_email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: type, recipient_email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get template
    const template = EMAIL_TEMPLATES[type];
    if (!template) {
      return new Response(
        JSON.stringify({ error: `Unknown notification type: ${type}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch additional data if needed
    let enrichedDetails = { ...details };
    
    if (post_id) {
      const { data: post } = await supabase
        .from("launch_ops_posts")
        .select("*")
        .eq("id", post_id)
        .single();
      
      if (post) {
        enrichedDetails = {
          ...enrichedDetails,
          platform: post.platform,
          content_type: post.content_type,
          content_preview: post.content?.substring(0, 200) + (post.content?.length > 200 ? "..." : ""),
          scheduled_for: post.scheduled_for ? new Date(post.scheduled_for).toLocaleString() : null,
        };
      }
    }

    if (campaign_id) {
      const { data: campaign } = await supabase
        .from("launch_ops_campaigns")
        .select("*")
        .eq("id", campaign_id)
        .single();
      
      if (campaign) {
        enrichedDetails = {
          ...enrichedDetails,
          campaign_name: campaign.name,
        };
      }
    }

    // Generate email content
    const subject = template.subject;
    const htmlBody = template.getBody(enrichedDetails);

    // Call the existing send-email function
    const { data: emailResult, error: emailError } = await supabase.functions.invoke("send-email", {
      body: {
        to: recipient_email,
        subject: subject,
        html: htmlBody,
      },
    });

    if (emailError) {
      throw new Error(`Failed to send email: ${emailError.message}`);
    }

    // Log the notification
    await supabase.from("agent_logs").insert({
      agent_name: "notify",
      action: `send_${type}_notification`,
      input: { type, post_id, campaign_id, recipient_email },
      output: { success: true, email_sent: true },
      status: "success",
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `${type} notification sent to ${recipient_email}`,
        notification_type: type,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Notification error:", error);

    // Log the error
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    await supabase.from("agent_logs").insert({
      agent_name: "notify",
      action: "send_notification",
      input: {},
      output: { error: error.message },
      status: "error",
    });

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
