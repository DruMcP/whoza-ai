/**
 * Supabase Edge Function: send-subscriber-weekly-report
 * Purpose: Generate and send weekly AI visibility reports to paid subscribers
 * Trigger: Cron job (weekly) - Every Monday at 5:00 AM
 * Plans: monitor, growth, pro, and any active paid subscription
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')!;
const GOOGLE_PLACES_API_KEY = Deno.env.get('GOOGLE_PLACES_API_KEY')!;

interface Subscriber {
  id: string;
  email: string;
  business_name: string;
  trade_type: string;
  postcode: string;
  website_url: string;
  subscription_tier: string;
}

interface ScoreResult {
  overall_score: number;
  google_score: number;
  website_score: number;
  review_score: number;
  citation_score: number;
}

async function dbGet(path: string): Promise<unknown[]> {
  const resp = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
    },
  });
  return resp.json();
}

async function dbPost(table: string, data: Record<string, unknown>, prefer = 'return=minimal'): Promise<Response> {
  return fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Content-Type': 'application/json',
      'Prefer': prefer,
    },
    body: JSON.stringify(data),
  });
}

async function dbUpsert(table: string, data: Record<string, unknown>, onConflict: string): Promise<Response> {
  return fetch(`${SUPABASE_URL}/rest/v1/${table}?on_conflict=${onConflict}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(data),
  });
}

async function getGoogleScore(businessName: string, postcode: string): Promise<{ score: number; rating: number; reviewCount: number }> {
  try {
    const q = encodeURIComponent(`${businessName} ${postcode}`);
    const resp = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${q}&key=${GOOGLE_PLACES_API_KEY}`);
    const data = await resp.json();
    if (data.results && data.results.length > 0) {
      const place = data.results[0];
      const rating = place.rating || 0;
      const reviewCount = place.user_ratings_total || 0;
      let score = 40;
      score += Math.min(30, Math.round((rating / 5) * 30));
      score += Math.min(30, Math.round(Math.log10(reviewCount + 1) * 15));
      return { score: Math.min(100, score), rating, reviewCount };
    }
    return { score: 20, rating: 0, reviewCount: 0 };
  } catch {
    return { score: 20, rating: 0, reviewCount: 0 };
  }
}

async function getWebsiteScore(websiteUrl: string): Promise<number> {
  if (!websiteUrl) return 10;
  try {
    const resp = await fetch(websiteUrl, { signal: AbortSignal.timeout(8000) });
    if (!resp.ok) return 15;
    const html = await resp.text();
    let score = 30;
    if (html.includes('application/ld+json')) score += 20;
    if (html.includes('meta name="description"') || html.includes("meta name='description'")) score += 10;
    if (websiteUrl.startsWith('https://')) score += 10;
    if (html.includes('viewport')) score += 10;
    if (html.toLowerCase().includes('service') || html.toLowerCase().includes('contact')) score += 10;
    return Math.min(100, score);
  } catch {
    return 15;
  }
}

async function getAIInsights(sub: Subscriber, scores: ScoreResult): Promise<{ insights: string; recommendations: string }> {
  try {
    const prompt = `You are an AI visibility expert for local UK businesses. Analyse this business's weekly AI visibility data.

Business: ${sub.business_name}
Trade: ${sub.trade_type}
Location: ${sub.postcode}
Website: ${sub.website_url || 'Not provided'}

Scores (out of 100):
- Overall: ${scores.overall_score}
- Google Business: ${scores.google_score}
- Website AI Readiness: ${scores.website_score}
- Review Authority: ${scores.review_score}
- Citation Presence: ${scores.citation_score}

Provide:
1. 2-3 sentences of key insights about their AI visibility performance.
2. 3 bullet points (starting with •) of specific actionable recommendations.

Keep it concise and professional.`;

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 350,
        temperature: 0.7,
      }),
    });

    if (!resp.ok) throw new Error('OpenAI error');
    const data = await resp.json();
    const content: string = data.choices[0].message.content;

    const bulletIdx = content.indexOf('•');
    if (bulletIdx > 0) {
      const insights = content.substring(0, bulletIdx).trim();
      const recommendations = content.substring(bulletIdx).trim().replace(/\n/g, '<br>');
      return { insights, recommendations };
    }
    const lines = content.split('\n').filter((l: string) => l.trim());
    const insights = lines.slice(0, 2).join(' ');
    const recommendations = lines.slice(2).join('<br>');
    return { insights: insights || content, recommendations: recommendations || '• Ensure your Google Business Profile is complete.<br>• Add structured data to your website.<br>• Encourage customers to leave reviews.' };
  } catch {
    return {
      insights: 'Your AI visibility score has been calculated based on your Google Business presence, website quality, and online authority.',
      recommendations: '• Ensure your Google Business Profile is complete and up to date.<br>• Add structured data (schema markup) to your website.<br>• Encourage satisfied customers to leave Google reviews.',
    };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get all active paid subscribers
    const subscribers = await dbGet(
      'users?subscription_status=eq.active&subscription_tier=neq.free&subscription_tier=neq.trial&select=id,email,business_name,trade_type,postcode,website_url,subscription_tier'
    ) as Subscriber[];

    if (!Array.isArray(subscribers) || subscribers.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No active paid subscribers found', processed: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get the email template
    const templates = await dbGet(
      'email_templates?name=eq.weekly_visibility_report&is_active=eq.true&select=subject,html_content,text_content'
    ) as Array<{ subject: string; html_content: string; text_content: string }>;

    const template = templates[0];
    if (!template) throw new Error('weekly_visibility_report template not found');

    const weekNumber = Math.ceil((Date.now() - new Date('2026-01-01').getTime()) / (7 * 24 * 60 * 60 * 1000));
    const reportDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    const results: Array<{ email: string; success: boolean; score?: number; error?: string }> = [];

    for (const user of subscribers) {
      try {
        // Generate scores
        const googleData = await getGoogleScore(user.business_name || '', user.postcode || '');
        const websiteScore = await getWebsiteScore(user.website_url || '');
        const reviewScore = googleData.reviewCount > 0
          ? Math.min(100, 30 + Math.round(Math.log10(googleData.reviewCount + 1) * 20) + Math.round((googleData.rating / 5) * 30))
          : 15;
        const citationScore = Math.round((googleData.score * 0.4) + (websiteScore * 0.4) + (reviewScore * 0.2));
        const overallScore = Math.round((googleData.score * 0.3) + (websiteScore * 0.25) + (reviewScore * 0.25) + (citationScore * 0.2));

        const scores: ScoreResult = {
          overall_score: overallScore,
          google_score: googleData.score,
          website_score: websiteScore,
          review_score: reviewScore,
          citation_score: citationScore,
        };

        // Get AI insights
        const { insights, recommendations } = await getAIInsights(user, scores);

        // Store score
        await dbUpsert('trial_visibility_scores', {
          user_id: user.id,
          business_name: user.business_name,
          overall_score: overallScore,
          google_score: googleData.score,
          website_score: websiteScore,
          review_score: reviewScore,
          citation_score: citationScore,
          score_date: new Date().toISOString(),
          week_number: weekNumber,
          email_sent: false,
        }, 'user_id,week_number');

        // Build email from template
        const variables: Record<string, string> = {
          business_name: user.business_name || 'Your Business',
          overall_score: String(overallScore),
          google_score: String(googleData.score),
          website_score: String(websiteScore),
          review_score: String(reviewScore),
          citation_score: String(citationScore),
          week_number: String(weekNumber),
          report_date: reportDate,
          plan_name: user.subscription_tier || 'monitor',
          insights,
          recommendations,
        };

        let subject = template.subject;
        let html = template.html_content;
        let text = template.text_content || '';

        Object.entries(variables).forEach(([key, value]) => {
          const regex = new RegExp(`{{${key}}}`, 'g');
          subject = subject.replace(regex, value);
          html = html.replace(regex, value);
          text = text.replace(regex, value);
        });

        // Send via Resend
        const emailResp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'reports@whoza.ai',
            to: user.email,
            subject,
            html,
            text,
          }),
        });

        const emailStatus = emailResp.ok ? 'sent' : 'failed';
        const emailResult = await emailResp.json().catch(() => ({}));

        // Log email
        await dbPost('email_logs', {
          user_id: user.id,
          template_name: 'weekly_visibility_report',
          recipient_email: user.email,
          subject,
          status: emailStatus,
          resend_id: emailResult?.id || null,
          error_message: emailStatus === 'failed' ? JSON.stringify(emailResult) : null,
          sent_at: new Date().toISOString(),
          metadata: { plan_name: user.subscription_tier, overall_score: overallScore, week_number: weekNumber },
        });

        console.log(`Weekly report ${emailStatus} to ${user.email} (score: ${overallScore}/100)`);
        results.push({ email: user.email, success: emailStatus === 'sent', score: overallScore });
      } catch (userErr) {
        console.error(`Failed for ${user.email}:`, userErr);
        results.push({ email: user.email, success: false, error: String(userErr) });
      }
    }

    const successCount = results.filter(r => r.success).length;

    return new Response(
      JSON.stringify({
        message: 'Weekly reports processed',
        total: results.length,
        sent: successCount,
        failed: results.length - successCount,
        results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('send-subscriber-weekly-report error:', err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
