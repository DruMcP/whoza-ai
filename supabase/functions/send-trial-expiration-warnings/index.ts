// Supabase Edge Function: send-trial-expiration-warnings
// Purpose: Send warning emails to users 7 days before trial expires
// Trigger: Daily cron job

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

interface TrialUser {
  user_id: string
  email: string
  business_name: string
  trial_ends_at: string
  days_remaining: number
}

serve(async (req) => {
  try {
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

    // Get users whose trial expires in 7 days using the database function
    const { data: expiringUsers, error: usersError } = await supabase
      .rpc('get_expiring_trial_users', { days_before_expiry: 7 })

    if (usersError) {
      console.error('Error fetching expiring trial users:', usersError)
      throw new Error('Failed to fetch expiring trial users')
    }

    if (!expiringUsers || expiringUsers.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'No trials expiring in 7 days',
          count: 0 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const emailResults = []

    for (const user of expiringUsers as TrialUser[]) {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Whoza AI <hello@whoza.ai>',
            to: [user.email],
            subject: `Your Free Trial Ends in 7 Days - ${user.business_name}`,
            html: generateExpirationWarningEmail(user),
          }),
        })

        if (!emailResponse.ok) {
          const errorData = await emailResponse.json()
          console.error(`Failed to send expiration warning to ${user.email}:`, errorData)
          emailResults.push({
            userId: user.user_id,
            email: user.email,
            success: false,
            error: errorData.message
          })
          continue
        }

        const emailData = await emailResponse.json()

        await supabase
          .from('email_logs')
          .insert({
            user_id: user.user_id,
            email_type: 'trial_expiration_warning',
            recipient_email: user.email,
            sent_at: new Date().toISOString(),
            status: 'sent',
            resend_email_id: emailData.id
          })

        emailResults.push({
          userId: user.user_id,
          email: user.email,
          success: true,
          emailId: emailData.id
        })

      } catch (error) {
        console.error(`Error sending expiration warning to ${user.email}:`, error)
        emailResults.push({
          userId: user.user_id,
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
        message: `Trial expiration warnings sent`,
        totalUsers: expiringUsers.length,
        successCount,
        failureCount,
        results: emailResults
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in send-trial-expiration-warnings:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

function generateExpirationWarningEmail(user: TrialUser): string {
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
  <title>Your Free Trial is Ending Soon</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a; color: #e2e8f0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #84cc16; font-size: 28px; margin: 0 0 10px 0;">Whoza AI</h1>
    </div>

    <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 30px; margin-bottom: 30px;">
      
      <h2 style="color: #f1f5f9; font-size: 24px; margin: 0 0 20px 0;">
        Your Free Trial Ends in 7 Days ⏰
      </h2>

      <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Hi ${user.business_name},
      </p>

      <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Your 3-month free trial of Whoza AI will end on <strong style="color: #84cc16;">${trialEndDate}</strong>.
      </p>

      <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
        <p style="color: #fca5a5; margin: 0; font-size: 15px;">
          After your trial ends, you'll lose access to weekly AI visibility updates and early access to new features like Chloe and Simon.
        </p>
      </div>

      <h3 style="color: #f1f5f9; font-size: 18px; margin: 0 0 15px 0;">
        Continue Your AI Visibility Journey
      </h3>

      <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0 0 25px 0;">
        Upgrade to one of our paid plans to keep tracking and improving your AI visibility:
      </p>

      <ul style="color: #cbd5e1; font-size: 15px; line-height: 1.8; margin: 0 0 25px 0; padding-left: 20px;">
        <li style="margin-bottom: 10px;"><strong style="color: #84cc16;">Improve Plan (£39/month)</strong> - Full AI visibility reports + personalized action plans</li>
        <li style="margin-bottom: 10px;"><strong style="color: #84cc16;">Priority Plan (£79/month)</strong> - Everything in Improve + priority support + advanced features</li>
      </ul>

      <div style="text-align: center; margin-top: 30px;">
        <a href="https://whoza.ai/pricing" style="display: inline-block; background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%); color: #0f172a; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
          View Plans & Upgrade
        </a>
      </div>

    </div>

    <div style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
      <p style="color: #64748b; font-size: 13px; margin: 0 0 10px 0;">
        © 2026 Whoza AI. All rights reserved.
      </p>
      <p style="color: #475569; font-size: 12px; margin: 0;">
        <a href="https://whoza.ai/portal" style="color: #64748b; text-decoration: none;">Dashboard</a> • 
        <a href="https://whoza.ai/pricing" style="color: #64748b; text-decoration: none;">Pricing</a>
      </p>
    </div>

  </div>
</body>
</html>
  `.trim()
}
