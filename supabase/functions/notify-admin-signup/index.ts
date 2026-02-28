/**
 * Admin Notification - New User Signup
 *
 * Sends email notification to admin team (Dru and Eduard) when a new user
 * signs up for the Whoza platform.
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') || 'https://whoza.ai',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

// Admin email addresses — all admins receive a notification on every new signup
const ADMIN_EMAILS = [
  'support@whoza.ai',
  'dru@whoza.ai',
];

interface SignupNotificationRequest {
  userEmail: string;
  userName?: string;
  businessName?: string;
  tradeType?: string;
  postcode?: string;
  location?: string;
  websiteUrl?: string;
  signupSource?: string;
  signedUpAt?: string;
  userId?: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not set');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body: SignupNotificationRequest = await req.json();
    const {
      userEmail,
      userName,
      businessName,
      tradeType,
      postcode,
      location,
      websiteUrl,
      signupSource = 'whoza.ai',
      signedUpAt,
      userId,
    } = body;

    if (!userEmail) {
      return new Response(
        JSON.stringify({ error: 'userEmail is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const signupTime = signedUpAt
      ? new Date(signedUpAt).toLocaleString('en-GB', { timeZone: 'Europe/London' })
      : new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background: #1a1a2e; padding: 24px 32px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; }
    .header p { color: #a0a0b8; margin: 4px 0 0; font-size: 13px; }
    .body { padding: 28px 32px; }
    .badge { display: inline-block; background: #e8f5e9; color: #2e7d32; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 12px; margin-bottom: 20px; }
    .field { margin-bottom: 14px; }
    .field label { display: block; font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px; }
    .field span { font-size: 15px; color: #1a1a2e; font-weight: 500; }
    .field a { color: #4f46e5; text-decoration: none; }
    .divider { border: none; border-top: 1px solid #f0f0f0; margin: 20px 0; }
    .footer { padding: 16px 32px; background: #fafafa; border-top: 1px solid #f0f0f0; font-size: 12px; color: #aaa; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 New Sign-Up on Whoza</h1>
      <p>A new user has just registered on whoza.ai</p>
    </div>
    <div class="body">
      <div class="badge">NEW USER</div>

      <div class="field">
        <label>Email</label>
        <span><a href="mailto:${userEmail}">${userEmail}</a></span>
      </div>

      ${businessName ? `
      <div class="field">
        <label>Business Name</label>
        <span>${businessName}</span>
      </div>` : ''}

      ${tradeType ? `
      <div class="field">
        <label>Trade Type</label>
        <span>${tradeType}</span>
      </div>` : ''}

      ${postcode || location ? `
      <div class="field">
        <label>Location</label>
        <span>${postcode || location}</span>
      </div>` : ''}

      ${websiteUrl ? `
      <div class="field">
        <label>Website</label>
        <span><a href="${websiteUrl}" target="_blank">${websiteUrl}</a></span>
      </div>` : ''}

      <hr class="divider">

      <div class="field">
        <label>Signed Up At</label>
        <span>${signupTime}</span>
      </div>

      ${userId ? `
      <div class="field">
        <label>User ID</label>
        <span style="font-size:12px;color:#888;">${userId}</span>
      </div>` : ''}

      <div class="field">
        <label>Source</label>
        <span>${signupSource}</span>
      </div>
    </div>
    <div class="footer">
      This is an automated notification from whoza.ai admin system.
    </div>
  </div>
</body>
</html>`;

    const textBody = `New Sign-Up on Whoza\n\nEmail: ${userEmail}\nBusiness: ${businessName || 'N/A'}\nTrade: ${tradeType || 'N/A'}\nLocation: ${postcode || location || 'N/A'}\nWebsite: ${websiteUrl || 'N/A'}\nSigned Up: ${signupTime}\nUser ID: ${userId || 'N/A'}\nSource: ${signupSource}`;

    // Send to all admin emails
    const emailPromises = ADMIN_EMAILS.map((adminEmail) =>
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Whoza Notifications <notifications@whoza.ai>',
          to: [adminEmail],
          subject: `🎉 New Sign-Up: ${businessName || userEmail}`,
          html: htmlBody,
          text: textBody,
        }),
      })
    );

    const results = await Promise.allSettled(emailPromises);

    const failures = results.filter((r) => r.status === 'rejected');
    if (failures.length > 0) {
      console.error('Some admin notification emails failed:', failures);
    }

    const successes = results.filter((r) => r.status === 'fulfilled').length;
    console.log(`Admin signup notification sent to ${successes}/${ADMIN_EMAILS.length} recipients for: ${userEmail}`);

    return new Response(
      JSON.stringify({ success: true, notified: successes, total: ADMIN_EMAILS.length }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('notify-admin-signup error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
