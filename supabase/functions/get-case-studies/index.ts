import { createClient } from 'npm:@supabase/supabase-js@2.89.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') || 'https://whoza.ai',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey, X-Fingerprint',
};

const caseStudiesData = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Plumber',
    location: 'Birmingham',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    businessName: 'Mitchell Plumbing Services',
    established: '2015',
    teamSize: '3 employees',
    challenge: {
      headline: 'Invisible in the AI Search Era',
      description: 'Sarah was getting most of her work through word-of-mouth and traditional directories, but new customers struggled to find her online.',
      painPoints: [
        'Zero visibility in AI search results',
        'Outdated Google Business profile',
        'No strategy for online reviews'
      ]
    },
    results: {
      metrics: [
        { label: 'AI Visibility Score', before: '34', after: '78', unit: '/100', improvement: '+129%' },
        { label: 'Monthly Enquiries', before: '8', after: '24', unit: '', improvement: '+200%' }
      ]
    },
    quote: 'Within two months of using Rex, I started appearing in ChatGPT responses for local plumbers.'
  },
  {
    id: 2,
    name: 'James Chen',
    role: 'Electrician',
    location: 'Manchester',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    businessName: 'Chen Electrical Ltd',
    established: '2012',
    teamSize: '5 employees',
    challenge: {
      headline: 'Good Reputation, Poor Online Presence',
      description: 'James had built a solid reputation locally but his digital presence hadn\'t kept pace.',
      painPoints: [
        'Website last updated in 2018',
        'Only 12 online reviews',
        'Spending £800/month on Google Ads'
      ]
    },
    results: {
      metrics: [
        { label: 'AI Visibility Score', before: '28', after: '82', unit: '/100', improvement: '+193%' },
        { label: 'Monthly Enquiries', before: '15', after: '32', unit: '', improvement: '+113%' }
      ]
    },
    quote: 'Rex\'s approach works. I\'ve cut my advertising costs in half while getting more enquiries than ever.'
  },
  {
    id: 3,
    name: 'Tom Harrison',
    role: 'Heating Engineer',
    location: 'Leeds',
    photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    businessName: 'Harrison Heating & Gas Services',
    established: '2018',
    teamSize: 'Solo trader',
    challenge: {
      headline: 'Seasonal Business with Unpredictable Lead Flow',
      description: 'Tom\'s heating business was heavily seasonal with extreme fluctuations.',
      painPoints: [
        'Extreme seasonal fluctuations',
        'Limited online reviews',
        'Not appearing in AI search results'
      ]
    },
    results: {
      metrics: [
        { label: 'AI Visibility Score', before: '22', after: '76', unit: '/100', improvement: '+245%' },
        { label: 'Summer Bookings', before: '4', after: '14', unit: '/month', improvement: '+250%' }
      ]
    },
    quote: 'Rex has transformed my business. I used to dread the summer months when work dried up.'
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
      p_endpoint: 'case-studies',
      p_limit_per_minute: 3,
      p_limit_per_hour: 20
    });

    if (rateLimitCheck && !rateLimitCheck.allowed) {
      await supabase.rpc('log_request', {
        p_ip: clientIP,
        p_fingerprint: fingerprint,
        p_endpoint: 'case-studies',
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
        p_endpoint: 'case-studies',
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
        p_endpoint: 'case-studies',
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
      p_endpoint: 'case-studies',
      p_user_agent: userAgent,
      p_status: 200
    });

    return new Response(
      JSON.stringify({ data: caseStudiesData }),
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
    console.error('Error in get-case-studies:', error);
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