const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') || 'https://whoza.ai',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface FreeScoreEmailRequest {
  email: string;
  businessName: string;
  score: number;
  tradeType: string;
  location: string;
  websiteUrl?: string;
  summaryText: string;
  pillarScores?: {
    clarity: number;
    consensus: number;
    answerability: number;
    safety: number;
    context: number;
  };
  recommendations?: string[];
}

function getScoreBandSummary(score: number) {
  if (score <= 25) {
    return {
      band: 'Critical',
      message: "Your business is currently invisible to AI. Huge room for improvement!",
      color: '#ef4444'
    };
  }
  if (score <= 50) {
    return {
      band: 'Needs Work',
      message: "Some visibility, but competitors are likely ahead. Quick fixes available.",
      color: '#f59e0b'
    };
  }
  if (score <= 75) {
    return {
      band: 'Good',
      message: "Solid foundation! Focused work could get you consistently recommended.",
      color: '#22c55e'
    };
  }
  return {
    band: 'Strong',
    message: "Excellent! Fine-tune to stay ahead of competitors.",
    color: '#4ade80'
  };
}

function generatePillarHTML(pillarScores: any) {
  if (!pillarScores) {
    return '';
  }

  const pillars = [
    { name: 'Clarity', key: 'clarity', maxScore: 20, description: 'How easy it is for customers to understand what you do and where you work' },
    { name: 'Consensus', key: 'consensus', maxScore: 30, description: 'Multiple sources online saying good things about your business' },
    { name: 'Answerability', key: 'answerability', maxScore: 20, description: 'How well your online presence answers common customer questions' },
    { name: 'Safety', key: 'safety', maxScore: 15, description: 'Customer trust based on reviews, credentials, and transparency' },
    { name: 'Context', key: 'context', maxScore: 15, description: 'Relevance to local searches in your area' }
  ];

  const pillarRows = pillars.map(pillar => {
    const score = pillarScores[pillar.key] || 0;
    const percentage = Math.round((score / pillar.maxScore) * 100);
    const barColor = percentage >= 75 ? '#22c55e' : percentage >= 50 ? '#f59e0b' : '#ef4444';

    return `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid rgba(74, 222, 128, 0.1);">
          <div style="font-size: 15px; font-weight: 600; color: #e2e8f0; margin-bottom: 4px;">
            ${pillar.name}
          </div>
          <div style="font-size: 13px; color: #94a3b8; margin-bottom: 8px;">
            ${pillar.description}
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="flex: 1; height: 8px; background: rgba(30, 41, 59, 0.5); border-radius: 4px; overflow: hidden;">
              <div style="height: 100%; width: ${percentage}%; background: ${barColor}; border-radius: 4px; transition: width 0.3s ease;"></div>
            </div>
            <div style="font-size: 14px; font-weight: 600; color: ${barColor}; min-width: 50px; text-align: right;">
              ${score}/${pillar.maxScore}
            </div>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <tr>
      <td style="padding: 0 30px 30px;">
        <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 700; color: #4ade80;">
          Your ECE Score Breakdown:
        </h2>
        <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(74, 222, 128, 0.2); border-radius: 8px; padding: 16px;">
          ${pillarRows}
        </table>
        <p style="margin: 12px 0 0; font-size: 13px; color: #94a3b8; font-style: italic;">
          ECE = Expert Consensus Evaluation - The 5 pillars AI tools use to decide which businesses to recommend
        </p>
      </td>
    </tr>
  `;
}

function generateRecommendationsHTML(recommendations: string[]) {
  if (!recommendations || recommendations.length === 0) {
    return '';
  }

  const recItems = recommendations.map((rec, index) => `
    <tr>
      <td style="padding: 12px 0; ${index < recommendations.length - 1 ? 'border-bottom: 1px solid rgba(74, 222, 128, 0.1);' : ''}">
        <div style="display: flex; align-items: start; gap: 12px;">
          <div style="flex-shrink: 0; width: 24px; height: 24px; background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #0f172a; font-weight: 700; font-size: 12px;">
            ${index + 1}
          </div>
          <div style="flex: 1; font-size: 15px; line-height: 1.6; color: #cbd5e1;">
            ${rec}
          </div>
        </div>
      </td>
    </tr>
  `).join('');

  return `
    <tr>
      <td style="padding: 0 30px 30px;">
        <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 700; color: #4ade80;">
          Your Priority Actions:
        </h2>
        <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(74, 222, 128, 0.2); border-radius: 8px; padding: 16px;">
          ${recItems}
        </table>
        <p style="margin: 12px 0 0; font-size: 13px; color: #94a3b8; font-style: italic;">
          These recommendations are ordered by impact - start with #1 for the fastest improvement
        </p>
      </td>
    </tr>
  `;
}

function generateEmailHTML({
  businessName,
  score,
  tradeType,
  location,
  websiteUrl,
  summaryText,
  pillarScores,
  recommendations
}: Omit<FreeScoreEmailRequest, 'email'>) {
  const { band, message, color } = getScoreBandSummary(score);
  const websiteDisplay = websiteUrl || 'Not provided';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AI Visibility Score</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #1a1a2e; color: #e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a2e;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #0f172a; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">

          <!-- Header -->
          <tr>
            <td style="background: #ffffff; padding: 40px 30px; text-align: center;">
              <div style="margin: 0 auto 16px;">
                <img src="https://whoza.ai/production_logo.png" alt="Whoza.ai Logo" width="300" height="auto" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" />
              </div>
              <p style="margin: 0; color: #64748b; font-size: 14px; font-weight: 500;">
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
                Thanks for checking your AI Visibility Score! Here are your results:
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
                      Your Visibility Confidence Score™
                    </div>
                    <div style="font-size: 48px; font-weight: 700; color: ${color}; line-height: 1; margin-bottom: 8px;">
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

          <!-- Pillar Breakdown -->
          ${generatePillarHTML(pillarScores)}

          <!-- Recommendations -->
          ${generateRecommendationsHTML(recommendations)}

          <!-- Next Steps -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <h2 style="margin: 0 0 12px; font-size: 20px; font-weight: 700; color: #4ade80;">
                Ready to Improve Your Score?
              </h2>
              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #cbd5e1;">
                Rex can handle all of this for you. Each week, you'll get one simple task that takes 10-15 minutes. We'll track your progress and show you exactly how your visibility improves.
              </p>
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
                <strong>Rex</strong><br>
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

Deno.serve(async (req: Request) => {
  console.log('[SEND FREE SCORE EMAIL] Function called! Method:', req.method);

  if (req.method === 'OPTIONS') {
    console.log('[SEND FREE SCORE EMAIL] Handling OPTIONS preflight request');
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  console.log('[SEND FREE SCORE EMAIL] Processing POST request...');

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    if (!resendApiKey) {
      console.error('[SEND FREE SCORE EMAIL] RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email service not configured'
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

    const requestData: FreeScoreEmailRequest = await req.json();

    console.log('[SEND FREE SCORE EMAIL] Received request:', {
      email: requestData.email,
      businessName: requestData.businessName,
      score: requestData.score,
      hasPillarScores: !!requestData.pillarScores,
      hasRecommendations: !!requestData.recommendations
    });

    if (!requestData.email || !requestData.businessName || requestData.score === undefined) {
      throw new Error('Missing required fields: email, businessName, score');
    }

    const html = generateEmailHTML({
      businessName: requestData.businessName,
      score: requestData.score,
      tradeType: requestData.tradeType,
      location: requestData.location,
      websiteUrl: requestData.websiteUrl,
      summaryText: requestData.summaryText,
      pillarScores: requestData.pillarScores,
      recommendations: requestData.recommendations
    });

    const emailPayload = {
      from: 'Rex from Whoza AI <hello@whoza.ai>',
      to: requestData.email,
      subject: `Your AI Visibility Score: ${requestData.score}/100 - ${requestData.businessName}`,
      html: html,
    };

    console.log('[SEND FREE SCORE EMAIL] Sending to Resend API...');
    console.log('[SEND FREE SCORE EMAIL] Payload:', {
      from: emailPayload.from,
      to: emailPayload.to,
      subject: emailPayload.subject,
      htmlLength: emailPayload.html.length
    });

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    const resendData = await resendResponse.json();

    console.log('[SEND FREE SCORE EMAIL] Resend response:', {
      status: resendResponse.status,
      data: resendData
    });

    if (!resendResponse.ok) {
      console.error('[SEND FREE SCORE EMAIL] Resend API error:', resendData);
      return new Response(
        JSON.stringify({
          success: false,
          error: resendData.message || resendData.error || 'Failed to send email'
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

    console.log('[SEND FREE SCORE EMAIL] Email sent successfully! Email ID:', resendData.id);

    return new Response(
      JSON.stringify({
        success: true,
        emailId: resendData.id,
        message: 'Email sent successfully'
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error('[SEND FREE SCORE EMAIL] Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'An unexpected error occurred'
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