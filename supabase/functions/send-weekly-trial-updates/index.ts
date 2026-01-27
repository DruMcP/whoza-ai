// Supabase Edge Function: send-weekly-trial-updates
// Purpose: Send weekly AI visibility score updates to Free Trial users
// Trigger: Cron job (weekly) - Every Monday at 4:00 AM (after scores are generated at 3:00 AM)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

interface TrialUser {
  user_id: string
  email: string
  business_name: string
  trial_started_at: string
  trial_ends_at: string
  days_remaining: number
}

interface TrialScore {
  score_id: string
  week_number: number
  total_score: number
  clarity_score: number
  consensus_score: number
  answerability_score: number
  safety_score: number
  context_score: number
  insights: string
  recommendations: string
  positive_themes: string
  negative_themes: string
  created_at: string
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

    // Get all active trial users using the database function
    const { data: trialUsers, error: usersError } = await supabase
      .rpc('get_active_trial_users')

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
    let successCount = 0
    let errorCount = 0

    // Send weekly update email to each trial user
    for (const user of trialUsers as TrialUser[]) {
      try {
        // Use days_remaining from database function
        const daysRemaining = user.days_remaining

        // Fetch the latest score for this user
        const { data: scores, error: scoresError } = await supabase
          .from('trial_visibility_scores')
          .select('*')
          .eq('user_id', user.user_id)
          .order('created_at', { ascending: false })
          .limit(1)

        if (scoresError) {
          console.error(`Error fetching score for ${user.email}:`, scoresError)
          // Continue with generic email if score fetch fails
        }

        const latestScore: TrialScore | null = scores && scores.length > 0 ? scores[0] : null

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
            subject: latestScore 
              ? `Week ${latestScore.week_number}: Your AI Visibility Score is ${latestScore.total_score}/100 - ${user.business_name}`
              : `Your Weekly AI Visibility Update - ${user.business_name}`,
            html: generateWeeklyUpdateEmail(user, daysRemaining, latestScore),
          }),
        })

        if (!emailResponse.ok) {
          const errorData = await emailResponse.json()
          console.error(`Failed to send email to ${user.email}:`, errorData)
          emailResults.push({
            userId: user.user_id,
            email: user.email,
            success: false,
            error: errorData.message || 'Failed to send email'
          })
          errorCount++
          continue
        }

        const emailData = await emailResponse.json()

        // Mark email as sent in database
        if (latestScore) {
          await supabase
            .rpc('mark_trial_score_email_sent', { p_score_id: latestScore.score_id })
        }

        console.log(`Successfully sent email to ${user.email}`)
        emailResults.push({
          userId: user.user_id,
          email: user.email,
          weekNumber: latestScore?.week_number,
          score: latestScore?.total_score,
          success: true,
          emailId: emailData.id
        })
        successCount++

      } catch (error) {
        console.error(`Error processing user ${user.email}:`, error)
        emailResults.push({
          userId: user.user_id,
          email: user.email,
          success: false,
          error: String(error)
        })
        errorCount++
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Sent ${successCount} emails, ${errorCount} errors`,
        total: trialUsers.length,
        successful: successCount,
        failed: errorCount,
        results: emailResults
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Fatal error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
        details: String(error)
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

function generateWeeklyUpdateEmail(
  user: TrialUser, 
  daysRemaining: number,
  score: TrialScore | null
): string {
  const weekNumber = score?.week_number || 1
  const totalScore = score?.total_score || 0
  
  // Generate score badge color based on score
  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#10b981' // green
    if (score >= 60) return '#84cc16' // lime
    if (score >= 40) return '#f59e0b' // amber
    return '#ef4444' // red
  }

  const scoreColor = getScoreColor(totalScore)

  // If we have a score, show detailed report
  if (score) {
    const recommendations = score.recommendations.split('; ').filter(r => r.trim())
    const topRecommendations = recommendations.slice(0, 3)

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Week ${weekNumber} AI Visibility Score</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a; color: #e2e8f0;">
  
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #84cc16; font-size: 28px; margin: 0 0 10px 0; font-weight: 700;">
        Whoza AI
      </h1>
      <p style="color: #64748b; font-size: 14px; margin: 0;">
        Free Trial Week ${weekNumber} of 12
      </p>
    </div>

    <!-- Score Card -->
    <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 2px solid ${scoreColor}; border-radius: 16px; padding: 32px; margin-bottom: 32px; text-align: center;">
      
      <h2 style="color: #f1f5f9; font-size: 22px; margin: 0 0 20px 0; font-weight: 600;">
        ${user.business_name}
      </h2>

      <div style="margin: 24px 0;">
        <div style="display: inline-block; background: ${scoreColor}; color: #0f172a; font-size: 48px; font-weight: 800; padding: 20px 40px; border-radius: 12px; box-shadow: 0 8px 24px rgba(132, 204, 22, 0.3);">
          ${totalScore}<span style="font-size: 24px; font-weight: 600;">/100</span>
        </div>
      </div>

      <p style="color: #cbd5e1; font-size: 16px; margin: 20px 0 0 0;">
        Your AI Visibility Score
      </p>
    </div>

    <!-- 5 Pillar Breakdown -->
    <div style="background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
      <h3 style="color: #f1f5f9; font-size: 18px; margin: 0 0 20px 0; font-weight: 600;">
        📊 5-Pillar Breakdown
      </h3>

      ${generatePillarBar('Clarity', score.clarity_score)}
      ${generatePillarBar('Consensus', score.consensus_score)}
      ${generatePillarBar('Answerability', score.answerability_score)}
      ${generatePillarBar('Safety', score.safety_score)}
      ${generatePillarBar('Context', score.context_score)}
    </div>

    <!-- Key Insights -->
    <div style="background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
      <h3 style="color: #f1f5f9; font-size: 18px; margin: 0 0 16px 0; font-weight: 600;">
        💡 Key Insights
      </h3>
      <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0;">
        ${score.insights}
      </p>
    </div>

    <!-- Top Recommendations -->
    <div style="background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
      <h3 style="color: #f1f5f9; font-size: 18px; margin: 0 0 16px 0; font-weight: 600;">
        🎯 Top Recommendations
      </h3>
      ${topRecommendations.map((rec, i) => `
        <div style="margin-bottom: ${i < topRecommendations.length - 1 ? '12px' : '0'};">
          <div style="display: flex; align-items: start;">
            <span style="color: #84cc16; font-weight: 700; margin-right: 8px;">${i + 1}.</span>
            <span style="color: #cbd5e1; font-size: 15px; line-height: 1.5;">${rec}</span>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 32px 0;">
      <a href="https://whoza.ai/portal" style="display: inline-block; background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%); color: #0f172a; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(132, 204, 22, 0.4);">
        View Full Report in Dashboard
      </a>
    </div>

    <!-- Trial Reminder -->
    <div style="background: rgba(132, 204, 22, 0.1); border: 1px solid rgba(132, 204, 22, 0.3); border-radius: 8px; padding: 16px; margin-bottom: 32px; text-align: center;">
      <p style="color: #84cc16; font-size: 14px; margin: 0;">
        ⏰ ${daysRemaining} days remaining in your free trial
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
      <p style="color: #64748b; font-size: 13px; margin: 0 0 10px 0;">
        © 2026 Whoza AI. All rights reserved.
      </p>
      <p style="color: #475569; font-size: 12px; margin: 0;">
        <a href="https://whoza.ai/portal" style="color: #64748b; text-decoration: none;">Dashboard</a> • 
        <a href="https://whoza.ai/pricing" style="color: #64748b; text-decoration: none;">Upgrade</a>
      </p>
    </div>

  </div>
</body>
</html>
    `.trim()
  }

  // Fallback: Generic email if no score available
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
    
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #84cc16; font-size: 28px; margin: 0 0 10px 0; font-weight: 700;">
        Whoza AI
      </h1>
      <p style="color: #64748b; font-size: 14px; margin: 0;">
        Free Trial Update
      </p>
    </div>

    <div style="background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 32px; margin-bottom: 32px;">
      <h2 style="color: #f1f5f9; font-size: 22px; margin: 0 0 16px 0; font-weight: 600;">
        Hi ${user.business_name}! 👋
      </h2>
      <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
        Your weekly AI visibility score is being calculated and will be available in your dashboard shortly.
      </p>
      <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0;">
        Check back soon to see your detailed report with personalized recommendations!
      </p>
    </div>

    <div style="text-align: center; margin: 32px 0;">
      <a href="https://whoza.ai/portal" style="display: inline-block; background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%); color: #0f172a; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
        Go to Dashboard
      </a>
    </div>

    <div style="background: rgba(132, 204, 22, 0.1); border: 1px solid rgba(132, 204, 22, 0.3); border-radius: 8px; padding: 16px; margin-bottom: 32px; text-align: center;">
      <p style="color: #84cc16; font-size: 14px; margin: 0;">
        ⏰ ${daysRemaining} days remaining in your free trial
      </p>
    </div>

    <div style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
      <p style="color: #64748b; font-size: 13px; margin: 0 0 10px 0;">
        © 2026 Whoza AI. All rights reserved.
      </p>
    </div>

  </div>
</body>
</html>
  `.trim()
}

function generatePillarBar(name: string, score: number): string {
  const percentage = score * 10 // Convert 0-10 to 0-100%
  const color = score >= 8 ? '#10b981' : score >= 6 ? '#84cc16' : score >= 4 ? '#f59e0b' : '#ef4444'
  
  return `
    <div style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
        <span style="color: #cbd5e1; font-size: 14px; font-weight: 500;">${name}</span>
        <span style="color: #f1f5f9; font-size: 14px; font-weight: 600;">${score}/10</span>
      </div>
      <div style="background: #0f172a; border-radius: 4px; height: 8px; overflow: hidden;">
        <div style="background: ${color}; height: 100%; width: ${percentage}%; transition: width 0.3s ease;"></div>
      </div>
    </div>
  `
}
