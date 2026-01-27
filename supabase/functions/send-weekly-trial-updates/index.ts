// Supabase Edge Function: send-weekly-trial-updates
// Purpose: Send weekly AI visibility updates to Free Trial users
// Trigger: Cron job (weekly) or manual invocation

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

interface TrialUser {
  id: string
  email: string
  business_name: string
  trial_started_at: string
  trial_ends_at: string
}

serve(async (req) => {
  try {
    // Verify request authorization (cron job or admin)
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(
      SUPABASE_URL!,
      SUPABASE_SERVICE_ROLE_KEY!
    )

    // Get all active trial users
    const { data: trialUsers, error: usersError } = await supabase
      .from('users')
      .select('id, email, business_name, trial_started_at, trial_ends_at')
      .eq('trial_active', true)
      .not('trial_ends_at', 'is', null)
      .gte('trial_ends_at', new Date().toISOString())

    if (usersError) {
      console.error('Error fetching trial users:', usersError)
      throw new Error('Failed to fetch trial users')
    }

    if (!trialUsers || trialUsers.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'No active trial users to email',
          count: 0 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const emailResults = []

    // Send weekly update email to each trial user
    for (const user of trialUsers as TrialUser[]) {
      try {
        // Calculate days remaining in trial
        const daysRemaining = Math.ceil(
          (new Date(user.trial_ends_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        )

        // Generate AI visibility tips (placeholder - replace with actual logic)
        const tips = generateVisibilityTips()

        // Send email via Resend
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Whoza AI <hello@whoza.ai>',
            to: [user.email],
            subject: `Your Weekly AI Visibility Update - ${user.business_name}`,
            html: generateWeeklyUpdateEmail(user, daysRemaining, tips),
          }),
        })

        if (!emailResponse.ok) {
          const errorData = await emailResponse.json()
          console.error(`Failed to send email to ${user.email}:`, errorData)
          emailResults.push({
            userId: user.id,
            email: user.email,
            success: false,
            error: errorData.message || 'Failed to send email'
          })
          continue
        }

        const emailData = await emailResponse.json()

        // Log email sent
        await supabase
          .from('email_logs')
          .insert({
            user_id: user.id,
            email_type: 'trial_weekly_update',
            recipient_email: user.email,
            sent_at: new Date().toISOString(),
            status: 'sent',
            resend_email_id: emailData.id
          })

        emailResults.push({
          userId: user.id,
          email: user.email,
          success: true,
          emailId: emailData.id
        })

      } catch (error) {
        console.error(`Error sending email to ${user.email}:`, error)
        emailResults.push({
          userId: user.id,
          email: user.email,
          success: false,
          error: error.message
        })
      }
    }

    const successCount = emailResults.filter(r => r.success).length
    const failureCount = emailResults.filter(r => !r.success).length

    return new Response(
      JSON.stringify({
        success: true,
        message: `Weekly trial updates sent`,
        totalUsers: trialUsers.length,
        successCount,
        failureCount,
        results: emailResults
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in send-weekly-trial-updates:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

// Generate AI visibility tips (placeholder - replace with actual logic)
function generateVisibilityTips(): string[] {
  return [
    'Ensure your business name is consistent across all online platforms',
    'Add location-specific keywords to your website content',
    'Encourage customers to leave reviews on Google Business Profile',
    'Keep your business information up-to-date on all directories'
  ]
}

// Generate weekly update email HTML
function generateWeeklyUpdateEmail(
  user: TrialUser,
  daysRemaining: number,
  tips: string[]
): string {
  const trialEndDate = new Date(user.trial_ends_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Weekly AI Visibility Update</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a; color: #e2e8f0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #84cc16; font-size: 28px; margin: 0 0 10px 0;">Whoza AI</h1>
      <p style="color: #94a3b8; font-size: 14px; margin: 0;">Your Weekly AI Visibility Update</p>
    </div>

    <!-- Main Content -->
    <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 30px; margin-bottom: 30px;">
      
      <h2 style="color: #f1f5f9; font-size: 22px; margin: 0 0 20px 0;">
        Hi ${user.business_name}! 👋
      </h2>

      <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Here's your weekly AI visibility update. We're tracking how AI systems like ChatGPT, Perplexity, and Google AI are recommending your business.
      </p>

      <!-- Trial Status -->
      <div style="background: rgba(132, 204, 22, 0.1); border-left: 4px solid #84cc16; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
        <p style="color: #84cc16; font-weight: 600; margin: 0 0 5px 0; font-size: 14px;">FREE TRIAL STATUS</p>
        <p style="color: #e2e8f0; margin: 0; font-size: 16px;">
          ${daysRemaining} days remaining • Ends ${trialEndDate}
        </p>
      </div>

      <!-- Tips Section -->
      <h3 style="color: #f1f5f9; font-size: 18px; margin: 0 0 15px 0;">
        💡 This Week's Tips to Improve Your AI Visibility
      </h3>

      <ul style="color: #cbd5e1; font-size: 15px; line-height: 1.8; margin: 0 0 25px 0; padding-left: 20px;">
        ${tips.map(tip => `<li style="margin-bottom: 10px;">${tip}</li>`).join('')}
      </ul>

      <!-- CTA Button -->
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://whoza.ai/portal" style="display: inline-block; background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%); color: #0f172a; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
          View Your Dashboard
        </a>
      </div>

    </div>

    <!-- Upgrade Prompt -->
    <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 25px; margin-bottom: 30px; text-align: center;">
      <h3 style="color: #f1f5f9; font-size: 18px; margin: 0 0 10px 0;">
        Want More Detailed Insights?
      </h3>
      <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
        Upgrade to our Improve or Priority plans for detailed AI visibility reports, personalized action plans, and priority support.
      </p>
      <a href="https://whoza.ai/pricing" style="display: inline-block; background: rgba(132, 204, 22, 0.1); color: #84cc16; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-weight: 600; font-size: 14px; border: 1px solid rgba(132, 204, 22, 0.3);">
        View Plans
      </a>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
      <p style="color: #64748b; font-size: 13px; margin: 0 0 10px 0;">
        © 2026 Whoza AI. All rights reserved.
      </p>
      <p style="color: #475569; font-size: 12px; margin: 0;">
        <a href="https://whoza.ai/unsubscribe" style="color: #64748b; text-decoration: none;">Unsubscribe</a> • 
        <a href="https://whoza.ai/privacy" style="color: #64748b; text-decoration: none;">Privacy Policy</a>
      </p>
    </div>

  </div>
</body>
</html>
  `.trim()
}
