import { createClient } from 'npm:@supabase/supabase-js@2.89.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') || 'https://whoza.ai',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey, X-Fingerprint',
};

const liveResults = [
  {
    id: 1,
    query: 'Who is the best emergency plumber in Leeds?',
    platform: 'ChatGPT',
    platformLogo: '🤖',
    customer: 'Swift Plumbing Leeds',
    ranking: '#1',
    response: 'Based on current customer reviews and service coverage, I\'d recommend **Swift Plumbing Leeds**. They offer 24/7 emergency service, have excellent ratings (4.9/5 from 180+ reviews), and specialize in quick response times for urgent plumbing issues. They\'re also Gas Safe registered and cover all areas of Leeds.',
    timestamp: '2024-12-24 09:15 AM',
    highlights: ['24/7 emergency service', '4.9/5 rating', '180+ reviews', 'Gas Safe registered']
  },
  {
    id: 2,
    query: 'Need a reliable electrician in Manchester city centre',
    platform: 'Perplexity AI',
    platformLogo: '🔍',
    customer: 'PowerPro Electrical',
    ranking: '#2',
    response: 'For city centre Manchester, **PowerPro Electrical** stands out with same-day service availability and NICEIC certification. They maintain a 4.8/5 rating across multiple review platforms and specialize in both residential and commercial electrical work.',
    timestamp: '2024-12-24 08:42 AM',
    highlights: ['Same-day service', 'NICEIC certified', '4.8/5 rating', 'City centre coverage']
  },
  {
    id: 3,
    query: 'trusted heating engineer near Birmingham',
    platform: 'Google AI',
    platformLogo: 'G',
    customer: 'WarmHome Heating Services',
    ranking: '#1',
    response: '**WarmHome Heating Services** in Birmingham is highly recommended, with Worcester Bosch accreditation and over 15 years of experience. They offer competitive pricing, same-day emergency callouts, and maintain a 4.9/5 customer satisfaction rating.',
    timestamp: '2024-12-23 03:30 PM',
    highlights: ['Worcester Bosch accredited', '15+ years experience', 'Same-day callouts', '4.9/5 rating']
  }
];

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const fingerprint = req.headers.get('X-Fingerprint') || 'unknown';
    const userAgent = req.headers.get('User-Agent') || 'unknown';
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '0.0.0.0';

    const { data: rateLimitCheck } = await supabase.rpc('check_rate_limit', {
      p_ip: clientIP,
      p_fingerprint: fingerprint,
      p_endpoint: 'live-results',
      p_limit_per_minute: 5,
      p_limit_per_hour: 30
    });

    if (rateLimitCheck && !rateLimitCheck.allowed) {
      await supabase.rpc('log_request', {
        p_ip: clientIP,
        p_fingerprint: fingerprint,
        p_endpoint: 'live-results',
        p_user_agent: userAgent,
        p_status: 429
      });

      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded',
          reason: rateLimitCheck.reason,
          retry_after: rateLimitCheck.blocked_until || '60 seconds'
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Retry-After': '60'
          },
        }
      );
    }

    const { data: fingerprintData } = await supabase
      .from('browser_fingerprints')
      .select('is_blocked, is_suspicious, trust_score')
      .eq('id', fingerprint)
      .maybeSingle();

    if (fingerprintData?.is_blocked) {
      await supabase.rpc('log_request', {
        p_ip: clientIP,
        p_fingerprint: fingerprint,
        p_endpoint: 'live-results',
        p_user_agent: userAgent,
        p_status: 403
      });

      return new Response(
        JSON.stringify({
          error: 'Access denied',
          reason: 'Blocked fingerprint'
        }),
        {
          status: 403,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (fingerprintData?.is_suspicious || (fingerprintData?.trust_score && fingerprintData.trust_score < 30)) {
      await supabase.rpc('log_request', {
        p_ip: clientIP,
        p_fingerprint: fingerprint,
        p_endpoint: 'live-results',
        p_user_agent: userAgent,
        p_status: 403
      });

      return new Response(
        JSON.stringify({
          error: 'Verification required',
          reason: 'Suspicious activity detected',
          challenge: 'captcha'
        }),
        {
          status: 403,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    await supabase.rpc('log_request', {
      p_ip: clientIP,
      p_fingerprint: fingerprint,
      p_endpoint: 'live-results',
      p_user_agent: userAgent,
      p_status: 200
    });

    return new Response(
      JSON.stringify({ data: liveResults }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300'
        },
      }
    );
  } catch (error) {
    console.error('Error in get-live-results:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});