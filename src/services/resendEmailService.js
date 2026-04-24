/**
 * Resend Email Service
 * Handles sending branded emails via Resend API
 */

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
const RESEND_API_URL = 'https://api.resend.com/emails';

/**
 * Send email via Resend API
 */
async function sendEmail({ from, to, subject, html }) {
  if (!RESEND_API_KEY) {
    return { success: false, error: 'API key not configured' };
  }

  try {
                        
    const payload = {
      from,
      to: [to],
      subject,
      html,
    };

    
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    
    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.message || data.error || 'Failed to send email' };
    }

            return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get summary text based on score band
 */
function getScoreBandSummary(score) {
  if (score <= 25) {
    return {
      band: 'Critical',
      message: "Your business is currently invisible to AI. Huge room for improvement!"
    };
  }
  if (score <= 50) {
    return {
      band: 'Needs Work',
      message: "Some visibility, but competitors are likely ahead. Quick fixes available."
    };
  }
  if (score <= 75) {
    return {
      band: 'Good',
      message: "Solid foundation! Focused work could get you consistently recommended."
    };
  }
  return {
    band: 'Strong',
    message: "Excellent! Fine-tune to stay ahead of competitors."
  };
}

/**
 * Generate branded HTML email template for free score results
 */
function generateFreeScoreEmailTemplate({
  businessName,
  score,
  tradeType,
  location,
  websiteUrl,
  summaryText
}) {
  const { band, message } = getScoreBandSummary(score);
  const websiteDisplay = websiteUrl || 'Not provided';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AI Visibility Report</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #1a1a2e; color: #e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a2e;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #0f172a; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #0f172a; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                Whoza
              </h1>
              <p style="margin: 8px 0 0; color: #0f172a; font-size: 14px; font-weight: 500;">
                AI Visibility Platform for UK Trades
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 30px 30px 20px;">
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                Hi <strong>${businessName}</strong>,
              </p>
              <p style="margin: 16px 0 0; font-size: 16px; line-height: 1.6; color: #e2e8f0;">
                Thanks for checking your competitor position! Here are your results:
              </p>
            </td>
          </tr>

          <!-- Score Card -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%); border: 2px solid rgba(74, 222, 128, 0.3); border-radius: 8px; padding: 24px;">
                <tr>
                  <td style="text-align: center;">
                    <div style="font-size: 14px; font-weight: 600; color: #4ade80; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                      Your AI Visibility Report
                    </div>
                    <div style="font-size: 48px; font-weight: 700; color: #4ade80; line-height: 1; margin-bottom: 8px;">
                      ${score}/100
                    </div>
                    <div style="font-size: 18px; font-weight: 600; color: #e2e8f0; margin-bottom: 16px;">
                      ${band}
                    </div>
                    <div style="font-size: 15px; line-height: 1.6; color: #94a3b8;">
                      ${message}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What This Means -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <h2 style="margin: 0 0 12px; font-size: 20px; font-weight: 700; color: #4ade80;">
                What This Means:
              </h2>
              <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #cbd5e1;">
                ${summaryText}
              </p>
            </td>
          </tr>

          <!-- Next Steps -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <h2 style="margin: 0 0 12px; font-size: 20px; font-weight: 700; color: #4ade80;">
                Your Next Steps:
              </h2>
              <ol style="margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.8; color: #cbd5e1;">
                <li>Review your score breakdown</li>
                <li>See what's holding you back</li>
                <li>Get your personalised action plan</li>
              </ol>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 30px 30px; text-align: center;">
              <a href="https://whoza.ai/pricing" style="display: inline-block; background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); color: #0f172a; text-decoration: none; font-size: 16px; font-weight: 700; padding: 16px 32px; border-radius: 8px; box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3);">
                Start Improving for £59/month
              </a>
            </td>
          </tr>

          <!-- Business Details -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(30, 41, 59, 0.5); border: 1px solid rgba(74, 222, 128, 0.2); border-radius: 8px; padding: 20px;">
                <tr>
                  <td>
                    <div style="font-size: 14px; font-weight: 600; color: #4ade80; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                      Your Business Details:
                    </div>
                    <table cellpadding="0" cellspacing="0" style="font-size: 14px; line-height: 1.8; color: #cbd5e1;">
                      <tr>
                        <td style="padding: 4px 0; color: #94a3b8;">Business:</td>
                        <td style="padding: 4px 0 4px 12px; font-weight: 500;">${businessName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; color: #94a3b8;">Trade:</td>
                        <td style="padding: 4px 0 4px 12px; font-weight: 500;">${tradeType}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; color: #94a3b8;">Location:</td>
                        <td style="padding: 4px 0 4px 12px; font-weight: 500;">${location}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; color: #94a3b8;">Website:</td>
                        <td style="padding: 4px 0 4px 12px; font-weight: 500;">${websiteDisplay}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Message -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #cbd5e1;">
                Reply to this email with any questions - I read every reply.
              </p>
              <p style="margin: 16px 0 0; font-size: 15px; line-height: 1.6; color: #cbd5e1;">
                Cheers,<br>
                <strong>Rex</strong> 🤖<br>
                <span style="color: #94a3b8; font-size: 14px;">Your AI Visibility Assistant</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: rgba(15, 23, 42, 0.8); border-top: 1px solid rgba(74, 222, 128, 0.2); text-align: center;">
              <p style="margin: 0; font-size: 13px; color: #64748b;">
                <strong>WHOZA AI LTD</strong> · Perth, Scotland<br>
                AI Visibility Platform for UK Trades
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Send free score results email
 */
export async function sendFreeScoreResultsEmail({
  email,
  businessName,
  score,
  tradeType,
  location,
  websiteUrl,
  summaryText
}) {
  try {
    
    const html = generateFreeScoreEmailTemplate({
      businessName,
      score,
      tradeType,
      location,
      websiteUrl,
      summaryText
    });

    const result = await sendEmail({
      from: 'Whoza AI <onboarding@resend.dev>',
      to: email,
      subject: `Your AI Visibility Report: ${score}/100 - ${businessName}`,
      html
    });

    if (result.success) {
          } else {
    }

    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
}
