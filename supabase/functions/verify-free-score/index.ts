import { createClient } from 'npm:@supabase/supabase-js@2';
import * as cheerio from 'npm:cheerio@1.0.0-rc.12';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface FreeScoreRequest {
  email: string;
  businessName: string;
  location: string;
  tradeType: string;
  websiteUrl?: string;
  csrfToken: string;
  turnstileToken?: string;
  honeypot?: string;
}

interface GooglePlaceData {
  placeId?: string;
  displayName?: string;
  formattedAddress?: string;
  businessStatus?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
  types?: string[];
  reviews?: Array<{ text: string; rating: number }>;
}

interface WebsiteData {
  exists: boolean;
  isSecure: boolean;
  hasServicesPage: boolean;
  hasContactPage: boolean;
  hasAboutPage: boolean;
  hasTestimonials: boolean;
  hasSocialLinks: boolean;
  hasAccreditations: boolean;
  bodyText?: string;
}

interface ReviewAnalysis {
  positiveThemes: string;
  negativeThemes: string;
}

interface ContentAnalysis {
  clarity: number;
  trustworthiness: number;
  expertise: number;
}

interface PerplexityResults {
  answerabilityAccurate: boolean;
  citesWebsite: boolean;
  mentionedInComparison: boolean;
}

interface PillarScores {
  clarity: number;
  consensus: number;
  answerability: number;
  safety: number;
  context: number;
}

function getAdminWhitelist(): string[] {
  const adminEmails = Deno.env.get('ADMIN_WHITELIST_EMAILS');
  return adminEmails ? adminEmails.split(',').map(email => email.trim()) : [];
}

const DISPOSABLE_DOMAINS = [
  'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'throwaway.email',
  'mailinator.com', 'maildrop.cc', 'temp-mail.org', 'fakeinbox.com',
  'trashmail.com', 'yopmail.com', 'dispostable.com', 'mailnesia.com'
];

function getClientIP(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  return '127.0.0.1';
}

function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return DISPOSABLE_DOMAINS.includes(domain);
}

function validateBusinessName(name: string): { valid: boolean; error?: string } {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Business name is required' };
  }
  const trimmed = name.trim();
  if (trimmed.length < 3) {
    return { valid: false, error: 'Business name must be at least 3 characters' };
  }
  if (trimmed.length > 100) {
    return { valid: false, error: 'Business name must be less than 100 characters' };
  }
  if (!/^[a-zA-Z0-9\s\-&',\.]+$/.test(trimmed)) {
    return { valid: false, error: 'Business name contains invalid characters' };
  }
  return { valid: true };
}

function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  return { valid: true };
}

function validateLocation(location: string): { valid: boolean; error?: string } {
  if (!location || typeof location !== 'string') {
    return { valid: false, error: 'Location is required' };
  }
  const trimmed = location.trim();
  if (trimmed.length < 3 || trimmed.length > 100) {
    return { valid: false, error: 'Location must be between 3 and 100 characters' };
  }
  return { valid: true };
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = Deno.env.get('TURNSTILE_SECRET_KEY');
  if (!secretKey) {
    console.warn('Turnstile not configured, skipping verification');
    return true;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: ip
      })
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

async function searchGooglePlace(businessName: string, location: string): Promise<GooglePlaceData> {
  const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
  if (!apiKey) {
    console.warn('Google Places API key not configured');
    return {};
  }

  try {
    const textQuery = `${businessName}, ${location}, UK`;
    console.log('[GOOGLE PLACES] Searching for:', textQuery);

    const searchResponse = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName'
      },
      body: JSON.stringify({ textQuery })
    });

    if (!searchResponse.ok) {
      console.error('[GOOGLE PLACES] Search failed:', await searchResponse.text());
      return {};
    }

    const searchData = await searchResponse.json();
    const places = searchData.places || [];

    if (places.length === 0) {
      console.log('[GOOGLE PLACES] No places found');
      return {};
    }

    const placeId = places[0].id;
    console.log('[GOOGLE PLACES] Found place ID:', placeId);

    const detailsResponse = await fetch(`https://places.googleapis.com/v1/${placeId}`, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'id,displayName,formattedAddress,businessStatus,websiteUri,rating,userRatingCount,types,reviews'
      }
    });

    if (!detailsResponse.ok) {
      console.error('[GOOGLE PLACES] Details fetch failed:', await detailsResponse.text());
      return { placeId };
    }

    const placeData = await detailsResponse.json();
    console.log('[GOOGLE PLACES] Place details retrieved successfully');

    return {
      placeId: placeData.id,
      displayName: placeData.displayName?.text,
      formattedAddress: placeData.formattedAddress,
      businessStatus: placeData.businessStatus,
      websiteUri: placeData.websiteUri,
      rating: placeData.rating,
      userRatingCount: placeData.userRatingCount,
      types: placeData.types || [],
      reviews: (placeData.reviews || []).map((r: any) => ({
        text: r.text?.text || '',
        rating: r.rating || 0
      }))
    };
  } catch (error) {
    console.error('[GOOGLE PLACES] Error:', error);
    return {};
  }
}

async function analyzeWebsite(url: string): Promise<WebsiteData> {
  const defaultData: WebsiteData = {
    exists: false,
    isSecure: false,
    hasServicesPage: false,
    hasContactPage: false,
    hasAboutPage: false,
    hasTestimonials: false,
    hasSocialLinks: false,
    hasAccreditations: false
  };

  if (!url) {
    return defaultData;
  }

  try {
    console.log('[WEBSITE ANALYSIS] Analyzing:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; WhozaBot/1.0)'
      },
      signal: AbortSignal.timeout(10000)
    });

    if (response.status !== 200) {
      console.log('[WEBSITE ANALYSIS] Website returned status:', response.status);
      return defaultData;
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const websiteUrl = new URL(url);

    const data: WebsiteData = {
      exists: true,
      isSecure: websiteUrl.protocol === 'https:',
      hasServicesPage: false,
      hasContactPage: false,
      hasAboutPage: false,
      hasTestimonials: false,
      hasSocialLinks: false,
      hasAccreditations: false
    };

    const linkTexts = $('a').map((_, el) => $(el).text().toLowerCase()).get().join(' ');
    const allText = $('body').text().toLowerCase();
    data.bodyText = $('body').text().substring(0, 2000);

    data.hasServicesPage = /services?/i.test(linkTexts);
    data.hasContactPage = /contact/i.test(linkTexts);
    data.hasAboutPage = /about/i.test(linkTexts);
    data.hasTestimonials = /testimonials?|reviews?/i.test(allText);

    const hrefs = $('a').map((_, el) => $(el).attr('href') || '').get().join(' ').toLowerCase();
    data.hasSocialLinks = /facebook\.com|instagram\.com|twitter\.com|linkedin\.com/i.test(hrefs);

    const imgAlts = $('img').map((_, el) => $(el).attr('alt') || '').get().join(' ').toLowerCase();
    data.hasAccreditations = /gas safe|niceic|napit|part p|trustmark|checkatrade|certifi|accredit/i.test(imgAlts + allText);

    console.log('[WEBSITE ANALYSIS] Analysis complete:', data);
    return data;
  } catch (error) {
    console.error('[WEBSITE ANALYSIS] Error:', error);
    return defaultData;
  }
}

async function analyzeReviewsWithOpenAI(reviews: Array<{ text: string; rating: number }>): Promise<ReviewAnalysis> {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey || reviews.length === 0) {
    console.warn('[OPENAI] API key not configured or no reviews available');
    return { positiveThemes: 'No reviews available', negativeThemes: 'No reviews available' };
  }

  try {
    console.log('[OPENAI] Analyzing reviews...');
    const recentReviews = reviews.slice(0, 5);
    const reviewText = recentReviews.map(r => `Rating ${r.rating}/5: ${r.text}`).join('\n\n');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'user',
          content: `Analyze the following customer reviews for a local tradesperson. Summarize the key positive and negative themes in one sentence each.\n\n${reviewText}\n\nPositive themes:\nNegative themes:`
        }],
        max_tokens: 200,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      console.error('[OPENAI] Review analysis failed:', await response.text());
      return { positiveThemes: 'Analysis unavailable', negativeThemes: 'Analysis unavailable' };
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';

    const lines = content.split('\n').filter((l: string) => l.trim());
    const positiveThemes = lines.find((l: string) => l.toLowerCase().includes('positive'))?.replace(/positive themes?:?/i, '').trim() || 'Generally positive';
    const negativeThemes = lines.find((l: string) => l.toLowerCase().includes('negative'))?.replace(/negative themes?:?/i, '').trim() || 'Minor concerns';

    console.log('[OPENAI] Review analysis complete');
    return { positiveThemes, negativeThemes };
  } catch (error) {
    console.error('[OPENAI] Review analysis error:', error);
    return { positiveThemes: 'Analysis unavailable', negativeThemes: 'Analysis unavailable' };
  }
}

async function analyzeContentWithOpenAI(websiteText: string): Promise<ContentAnalysis> {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey || !websiteText) {
    console.warn('[OPENAI] API key not configured or no website text available');
    return { clarity: 5, trustworthiness: 5, expertise: 5 };
  }

  try {
    console.log('[OPENAI] Analyzing website content...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'user',
          content: `Analyze the following website content for a local tradesperson. Rate the clarity of the services offered, the trustworthiness of the content, and the level of expertise demonstrated, each on a scale of 1 to 10. Return ONLY a JSON object with the keys 'clarity', 'trustworthiness', and 'expertise'.\n\n${websiteText.substring(0, 1500)}`
        }],
        max_tokens: 100,
        temperature: 0.3,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      console.error('[OPENAI] Content analysis failed:', await response.text());
      return { clarity: 5, trustworthiness: 5, expertise: 5 };
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '{}';
    const analysis = JSON.parse(content);

    console.log('[OPENAI] Content analysis complete:', analysis);
    return {
      clarity: Math.min(10, Math.max(1, analysis.clarity || 5)),
      trustworthiness: Math.min(10, Math.max(1, analysis.trustworthiness || 5)),
      expertise: Math.min(10, Math.max(1, analysis.expertise || 5))
    };
  } catch (error) {
    console.error('[OPENAI] Content analysis error:', error);
    return { clarity: 5, trustworthiness: 5, expertise: 5 };
  }
}

async function checkAnswerabilityWithPerplexity(businessName: string, location: string): Promise<{ accurate: boolean; citesWebsite: boolean }> {
  const apiKey = Deno.env.get('PERPLEXITY_API_KEY');
  if (!apiKey) {
    console.warn('[PERPLEXITY] API key not configured');
    return { accurate: false, citesWebsite: false };
  }

  try {
    console.log('[PERPLEXITY] Checking answerability...');

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [{
          role: 'user',
          content: `Does ${businessName} in ${location} offer emergency services?`
        }],
        max_tokens: 200
      })
    });

    if (!response.ok) {
      console.error('[PERPLEXITY] Answerability check failed:', await response.text());
      return { accurate: false, citesWebsite: false };
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content || '';
    const citations = data.citations || [];

    const accurate = answer.toLowerCase().includes('yes') || answer.toLowerCase().includes('emergency');
    const citesWebsite = citations.some((c: string) => c.includes(businessName.toLowerCase().replace(/\s+/g, '')));

    console.log('[PERPLEXITY] Answerability check complete:', { accurate, citesWebsite });
    return { accurate, citesWebsite };
  } catch (error) {
    console.error('[PERPLEXITY] Answerability error:', error);
    return { accurate: false, citesWebsite: false };
  }
}

async function checkConsensusWithPerplexity(businessName: string, location: string, tradeType: string): Promise<boolean> {
  const apiKey = Deno.env.get('PERPLEXITY_API_KEY');
  if (!apiKey) {
    console.warn('[PERPLEXITY] API key not configured');
    return false;
  }

  try {
    console.log('[PERPLEXITY] Checking consensus...');

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [{
          role: 'user',
          content: `Who is the best ${tradeType} in ${location}?`
        }],
        max_tokens: 300
      })
    });

    if (!response.ok) {
      console.error('[PERPLEXITY] Consensus check failed:', await response.text());
      return false;
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content || '';

    const mentionedInComparison = answer.toLowerCase().includes(businessName.toLowerCase());

    console.log('[PERPLEXITY] Consensus check complete:', mentionedInComparison);
    return mentionedInComparison;
  } catch (error) {
    console.error('[PERPLEXITY] Consensus error:', error);
    return false;
  }
}

function calculateECEScore(
  googleData: GooglePlaceData,
  websiteData: WebsiteData,
  tradeType: string,
  reviewAnalysis: ReviewAnalysis,
  contentAnalysis: ContentAnalysis,
  perplexityResults: PerplexityResults
): { totalScore: number; pillarScores: PillarScores; recommendations: string[] } {
  const pillarScores: PillarScores = {
    clarity: 0,
    consensus: 0,
    answerability: 0,
    safety: 0,
    context: 0
  };

  const recommendations: string[] = [];

  if (googleData.placeId) {
    pillarScores.clarity += 5;
  } else {
    recommendations.push('Claim your Google Business Profile to appear in local searches');
  }

  if (websiteData.exists && websiteData.isSecure) {
    pillarScores.clarity += 5;
  } else if (!websiteData.exists) {
    recommendations.push('Create a professional website to establish online presence');
  } else if (!websiteData.isSecure) {
    recommendations.push('Add SSL certificate (HTTPS) to your website for security and trust');
  }

  if (googleData.formattedAddress) {
    pillarScores.clarity += 5;
  }

  pillarScores.clarity += Math.round((contentAnalysis.clarity / 10) * 5);

  const reviewCount = googleData.userRatingCount || 0;
  const rating = googleData.rating || 0;

  if (reviewCount === 0) {
    recommendations.push('Encourage customers to leave Google reviews to build trust');
  } else if (reviewCount >= 1 && reviewCount <= 3) {
    pillarScores.consensus += 5;
  } else if (reviewCount >= 4 && reviewCount <= 9) {
    pillarScores.consensus += 10;
  } else if (reviewCount >= 10 && reviewCount <= 19) {
    pillarScores.consensus += 15;
  } else if (reviewCount >= 20 && reviewCount <= 49) {
    pillarScores.consensus += 20;
  } else if (reviewCount >= 50) {
    pillarScores.consensus += 25;
  }

  if (rating >= 4.5) {
    pillarScores.consensus += 3;
  } else if (rating >= 4.0) {
    pillarScores.consensus += 2;
  } else if (rating > 0) {
    pillarScores.consensus += 1;
  }

  if (perplexityResults.mentionedInComparison) {
    pillarScores.consensus += 2;
  }

  if (!websiteData.exists) {
    recommendations.push('Build a website with service details, contact info, and about page');
  } else {
    if (websiteData.hasServicesPage) {
      pillarScores.answerability += 4;
    } else {
      recommendations.push('Add a clear services page listing what you offer');
    }

    if (websiteData.hasContactPage) {
      pillarScores.answerability += 4;
    } else {
      recommendations.push('Create a contact page with phone, email, and service areas');
    }

    if (websiteData.hasAboutPage) {
      pillarScores.answerability += 3;
    }

    if (websiteData.hasTestimonials) {
      pillarScores.answerability += 3;
    }

    if (perplexityResults.answerabilityAccurate) {
      pillarScores.answerability += 3;
    }

    if (perplexityResults.citesWebsite) {
      pillarScores.answerability += 3;
    }
  }

  if (websiteData.hasAccreditations) {
    pillarScores.safety += 5;
  } else {
    recommendations.push('Display professional accreditations and certifications prominently');
  }

  if (websiteData.hasSocialLinks) {
    pillarScores.safety += 2;
  }

  if (rating >= 4.0) {
    pillarScores.safety += 3;
  }

  pillarScores.safety += Math.round((contentAnalysis.trustworthiness / 10) * 5);

  const tradeLower = tradeType.toLowerCase();
  const types = (googleData.types || []).map(t => t.toLowerCase());

  const tradeCategories = [
    'electrician', 'plumber', 'carpenter', 'painter', 'builder',
    'roofer', 'heating', 'gas', 'hvac', 'contractor'
  ];

  const hasRelevantCategory = tradeCategories.some(cat =>
    tradeLower.includes(cat) || types.some(t => t.includes(cat))
  );

  if (hasRelevantCategory) {
    pillarScores.context += 5;
  }

  if (googleData.formattedAddress) {
    pillarScores.context += 5;
  }

  pillarScores.context += Math.round((contentAnalysis.expertise / 10) * 5);

  const totalScore = Math.round(
    pillarScores.clarity +
    pillarScores.consensus +
    pillarScores.answerability +
    pillarScores.safety +
    pillarScores.context
  );

  const topRecommendations = recommendations.slice(0, 3);
  if (topRecommendations.length === 0) {
    topRecommendations.push('Continue building your online presence with regular content updates');
  }

  return { totalScore, pillarScores, recommendations: topRecommendations };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  console.log('='.repeat(80));
  console.log('🚀 [ECE V2.1] NEW FREE SCORE REQUEST STARTED');
  console.log('='.repeat(80));

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const googlePlacesApiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
  const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');

  console.log('🔑 API Key Status Check:');
  console.log(`   - Google Places: ${googlePlacesApiKey ? '✅ SET' : '❌ MISSING'}`);
  console.log(`   - OpenAI: ${openaiApiKey ? '✅ SET' : '❌ MISSING'}`);
  console.log(`   - Perplexity: ${perplexityApiKey ? '✅ SET' : '❌ MISSING'}`);

  try {
    const ip = getClientIP(req);
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const referrer = req.headers.get('referer') || 'direct';

    const requestData: FreeScoreRequest = await req.json();

    console.log('📋 Request Data:');
    console.log(`   - Business: ${requestData.businessName}`);
    console.log(`   - Location: ${requestData.location}`);
    console.log(`   - Trade Type: ${requestData.tradeType}`);
    console.log(`   - Email: ${requestData.email}`);
    console.log(`   - Website: ${requestData.websiteUrl || 'Not provided'}`);
    console.log(`   - IP: ${ip}`);

    console.log('[VERIFY FREE SCORE] Request from IP:', ip);
    console.log('[VERIFY FREE SCORE] 🔍 HONEYPOT VALUE RECEIVED:', requestData.honeypot);
    console.log('[VERIFY FREE SCORE] 🔍 HONEYPOT IS EMPTY:', !requestData.honeypot || requestData.honeypot.trim() === '');
    console.log('[VERIFY FREE SCORE] 🔍 EMAIL VALUE RECEIVED:', requestData.email);

    if (requestData.honeypot && requestData.honeypot.trim() !== '') {
      console.log('[VERIFY FREE SCORE] ❌ Honeypot triggered - bot detected. Value received:', JSON.stringify(requestData.honeypot));
      await supabase.rpc('log_abuse_attempt', {
        p_email: requestData.email,
        p_ip: ip,
        p_abuse_type: 'honeypot',
        p_details: { honeypot_value: requestData.honeypot },
        p_user_agent: userAgent,
        p_referrer: referrer
      });
      return new Response(
        JSON.stringify({ success: true, message: 'Processing...' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    const { data: csrfValid } = await supabase.rpc('verify_csrf_token', {
      p_token: requestData.csrfToken
    });

    if (!csrfValid) {
      console.log('[VERIFY FREE SCORE] Invalid CSRF token');
      await supabase.rpc('log_abuse_attempt', {
        p_email: requestData.email,
        p_ip: ip,
        p_abuse_type: 'invalid_csrf',
        p_user_agent: userAgent,
        p_referrer: referrer
      });
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid security token. Please refresh and try again.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
      );
    }

    const nameValidation = validateBusinessName(requestData.businessName);
    if (!nameValidation.valid) {
      await supabase.rpc('log_abuse_attempt', {
        p_email: requestData.email,
        p_ip: ip,
        p_abuse_type: 'invalid_data',
        p_details: { field: 'businessName', error: nameValidation.error },
        p_user_agent: userAgent
      });
      return new Response(
        JSON.stringify({ success: false, error: nameValidation.error }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const emailValidation = validateEmail(requestData.email);
    if (!emailValidation.valid) {
      return new Response(
        JSON.stringify({ success: false, error: emailValidation.error }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const locationValidation = validateLocation(requestData.location);
    if (!locationValidation.valid) {
      return new Response(
        JSON.stringify({ success: false, error: locationValidation.error }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    if (isDisposableEmail(requestData.email)) {
      console.log('[VERIFY FREE SCORE] Disposable email detected');
      await supabase.rpc('log_abuse_attempt', {
        p_email: requestData.email,
        p_ip: ip,
        p_abuse_type: 'disposable_email',
        p_user_agent: userAgent
      });
      return new Response(
        JSON.stringify({ success: false, error: 'Please use a valid business email address.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    let turnstileVerified = false;
    let usingFallback = false;

    if (!requestData.turnstileToken || requestData.turnstileToken === 'fallback' || requestData.turnstileToken.trim() === '') {
      console.log('[VERIFY FREE SCORE] Turnstile fallback mode');
      usingFallback = true;
      turnstileVerified = false;
    } else {
      turnstileVerified = await verifyTurnstile(requestData.turnstileToken, ip);
      if (!turnstileVerified) {
        console.log('[VERIFY FREE SCORE] Turnstile verification failed');
        usingFallback = true;
        await supabase.rpc('log_abuse_attempt', {
          p_email: requestData.email,
          p_ip: ip,
          p_abuse_type: 'captcha_failed',
          p_user_agent: userAgent
        });
      }
    }

    const isWhitelisted = getAdminWhitelist().includes(requestData.email.toLowerCase().trim());

    if (!isWhitelisted) {
      if (usingFallback) {
        const { data: recentFallback } = await supabase
          .from('free_score_rate_limits')
          .select('last_submission_at')
          .eq('ip_address', ip)
          .gte('last_submission_at', new Date(Date.now() - 60 * 60 * 1000).toISOString())
          .single();

        if (recentFallback) {
          const waitMinutes = Math.ceil((new Date(recentFallback.last_submission_at).getTime() + 60 * 60 * 1000 - Date.now()) / 60000);
          await supabase.rpc('log_abuse_attempt', {
            p_email: requestData.email,
            p_ip: ip,
            p_abuse_type: 'fallback_rate_limit',
            p_details: { mode: 'fallback', wait_minutes: waitMinutes },
            p_user_agent: userAgent
          });
          return new Response(
            JSON.stringify({
              success: false,
              error: `Please wait ${waitMinutes} minutes before submitting again.`,
              rateLimited: true,
              fallbackMode: true
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 }
          );
        }
      }

      const { data: emailCheck } = await supabase.rpc('check_email_rate_limit', {
        p_email: requestData.email
      });

      if (emailCheck && !emailCheck.allowed) {
        await supabase.rpc('log_abuse_attempt', {
          p_email: requestData.email,
          p_ip: ip,
          p_abuse_type: 'rate_limit',
          p_details: emailCheck,
          p_user_agent: userAgent
        });
        return new Response(
          JSON.stringify({
            success: false,
            error: emailCheck.message || 'Rate limit exceeded',
            rateLimited: true,
            nextAllowedDate: emailCheck.next_allowed_at
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 }
        );
      }

      const { data: ipCheck } = await supabase.rpc('check_ip_rate_limit', {
        p_ip: ip
      });

      if (ipCheck && !ipCheck.allowed) {
        await supabase.rpc('log_abuse_attempt', {
          p_email: requestData.email,
          p_ip: ip,
          p_abuse_type: 'ip_rate_limit',
          p_details: ipCheck,
          p_user_agent: userAgent
        });
        return new Response(
          JSON.stringify({
            success: false,
            error: ipCheck.message || 'Too many requests from your location',
            rateLimited: true,
            nextAllowedDate: ipCheck.next_allowed_at
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 }
        );
      }
    }

    console.log('');
    console.log('━'.repeat(80));
    console.log('📊 [ECE V2.1] STARTING API AGGREGATION PHASE');
    console.log('━'.repeat(80));
    console.log('');

    console.log('🔍 [1/5] Calling Google Places API...');
    const googleData = await searchGooglePlace(requestData.businessName, requestData.location);
    console.log(`✅ [1/5] Google Places completed: ${googleData.placeId ? 'FOUND' : 'NOT FOUND'}`);

    if (!googleData.placeId) {
      await supabase
        .from('free_score_rate_limits')
        .upsert({
          email: requestData.email,
          ip_address: ip,
          business_name: requestData.businessName,
          location: requestData.location,
          user_agent: userAgent,
          submission_count: 1,
          last_submission_at: new Date().toISOString(),
          next_allowed_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          turnstile_verified: turnstileVerified
        }, {
          onConflict: 'email',
          ignoreDuplicates: false
        });

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Score calculated successfully',
          email: requestData.email,
          score: 8,
          pillarScores: { clarity: 0, consensus: 0, answerability: 0, safety: 0, context: 0 },
          recommendations: [
            'Claim your Google Business Profile to start appearing in local searches',
            'Create a professional website to establish your online presence',
            'Encourage satisfied customers to leave Google reviews'
          ],
          summaryText: 'Your business is currently not visible on Google. This means potential customers using AI tools like ChatGPT or Google AI cannot find you. The good news: fixing this is straightforward and will dramatically improve your visibility.',
          turnstileVerified,
          fallbackMode: usingFallback
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    console.log('');
    console.log('🌐 [2/5] Analyzing website...');
    const websiteUrl = requestData.websiteUrl || googleData.websiteUri;
    console.log(`   - URL: ${websiteUrl || 'None'}`);
    const websiteData = await analyzeWebsite(websiteUrl || '');
    console.log(`✅ [2/5] Website analysis completed: ${websiteData.exists ? 'EXISTS' : 'NOT FOUND'}`);

    console.log('');
    console.log('🤖 [3/5] Calling OpenAI for review analysis...');
    const reviewAnalysis = await analyzeReviewsWithOpenAI(googleData.reviews || []);
    console.log(`✅ [3/5] OpenAI review analysis completed`);
    console.log(`   - Positive themes: ${reviewAnalysis.positiveThemes.substring(0, 50)}...`);
    console.log(`   - Negative themes: ${reviewAnalysis.negativeThemes.substring(0, 50)}...`);

    console.log('');
    console.log('🤖 [4/5] Calling OpenAI for content analysis...');
    const contentAnalysis = await analyzeContentWithOpenAI(websiteData.bodyText || '');
    console.log(`✅ [4/5] OpenAI content analysis completed`);
    console.log(`   - Clarity: ${contentAnalysis.clarity}/10`);
    console.log(`   - Trustworthiness: ${contentAnalysis.trustworthiness}/10`);
    console.log(`   - Expertise: ${contentAnalysis.expertise}/10`);

    console.log('');
    console.log('🔮 [5/5] Calling Perplexity AI (2 queries in parallel)...');
    const [answerability, mentionedInComparison] = await Promise.all([
      checkAnswerabilityWithPerplexity(requestData.businessName, requestData.location),
      checkConsensusWithPerplexity(requestData.businessName, requestData.location, requestData.tradeType)
    ]);
    console.log(`✅ [5/5] Perplexity AI completed`);
    console.log(`   - Answerability accurate: ${answerability.accurate}`);
    console.log(`   - Cites website: ${answerability.citesWebsite}`);
    console.log(`   - Mentioned in comparison: ${mentionedInComparison}`);

    const perplexityResults: PerplexityResults = {
      answerabilityAccurate: answerability.accurate,
      citesWebsite: answerability.citesWebsite,
      mentionedInComparison
    };

    console.log('');
    console.log('━'.repeat(80));
    console.log('🧮 [ECE V2.1] CALCULATING FINAL SCORE');
    console.log('━'.repeat(80));
    const { totalScore, pillarScores, recommendations } = calculateECEScore(
      googleData,
      websiteData,
      requestData.tradeType,
      reviewAnalysis,
      contentAnalysis,
      perplexityResults
    );

    console.log('');
    console.log('🎯 FINAL ECE V2.1 SCORE:', totalScore, '/ 100');
    console.log('');
    console.log('📊 Pillar Breakdown:');
    console.log(`   1. Entity Clarity:      ${pillarScores.clarity}/20`);
    console.log(`   2. Consensus Alignment: ${pillarScores.consensus}/30`);
    console.log(`   3. Answer Readiness:    ${pillarScores.answerability}/20`);
    console.log(`   4. Risk Reduction:      ${pillarScores.safety}/15`);
    console.log(`   5. Context Precision:   ${pillarScores.context}/15`);
    console.log('');
    console.log('💡 Top Recommendations:');
    recommendations.forEach((rec, i) => console.log(`   ${i + 1}. ${rec}`));
    console.log('');
    console.log('='.repeat(80));

    let summaryText = '';
    if (totalScore <= 25) {
      summaryText = 'Your business has minimal AI visibility. Most potential customers using AI search tools won\'t find you. However, we\'ve identified quick wins that can dramatically improve your score in just a few weeks.';
    } else if (totalScore <= 50) {
      summaryText = 'Your business has some visibility, but competitors with stronger online presence are likely being recommended instead of you. We\'ve identified specific areas where focused improvements will make the biggest difference.';
    } else if (totalScore <= 75) {
      summaryText = 'Your business has good AI visibility! You have a solid foundation. With some targeted improvements to your weakest areas, you could be consistently recommended by AI tools ahead of your competitors.';
    } else {
      summaryText = 'Excellent work! Your business has strong AI visibility and is likely being recommended by AI tools. Keep maintaining this high standard and stay ahead of competitors by addressing our recommendations.';
    }

    // CRITICAL: Check if we've already sent an email recently (server-side deduplication)
    console.log('🔍 Checking for recent email sends to prevent duplicates...');
    const { data: recentRateLimit, error: rateLimitCheckError } = await supabase
      .from('free_score_rate_limits')
      .select('last_submission_at, email_sent_at')
      .eq('email', requestData.email)
      .maybeSingle();

    const now = Date.now();
    let skipEmail = false;

    if (isWhitelisted && recentRateLimit?.email_sent_at) {
      const timeSinceLastEmail = now - new Date(recentRateLimit.email_sent_at).getTime();
      console.log(`✅ ADMIN WHITELIST - Bypassing email deduplication (last email sent ${Math.round(timeSinceLastEmail / 1000)}s ago)`);
    }

    if (recentRateLimit?.email_sent_at && !isWhitelisted) {
      const timeSinceLastEmail = now - new Date(recentRateLimit.email_sent_at).getTime();
      const DUPLICATE_PREVENTION_WINDOW = 10000; // 10 seconds

      if (timeSinceLastEmail < DUPLICATE_PREVENTION_WINDOW) {
        skipEmail = true;
        console.log(`⚠️ DUPLICATE EMAIL BLOCKED - Email sent ${Math.round(timeSinceLastEmail / 1000)}s ago (< ${DUPLICATE_PREVENTION_WINDOW / 1000}s window)`);
      }
    }

    await supabase
      .from('free_score_rate_limits')
      .upsert({
        email: requestData.email,
        ip_address: ip,
        business_name: requestData.businessName,
        location: requestData.location,
        user_agent: userAgent,
        submission_count: 1,
        last_submission_at: new Date().toISOString(),
        next_allowed_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        turnstile_verified: turnstileVerified,
        email_sent_at: skipEmail ? recentRateLimit.email_sent_at : new Date().toISOString()
      }, {
        onConflict: 'email',
        ignoreDuplicates: false
      });

    let emailSent = false;

    if (skipEmail) {
      console.log('✅ Skipping email send - duplicate prevented at server level');
      emailSent = false; // Mark as not sent (duplicate)
    } else {
      try {
        console.log('');
        console.log('📧 Sending results email...');
        const emailResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-free-score-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: requestData.email,
          businessName: requestData.businessName,
          score: totalScore,
          tradeType: requestData.tradeType,
          location: requestData.location,
          websiteUrl: requestData.websiteUrl,
          summaryText: summaryText,
          pillarScores: {
            clarity: pillarScores.clarity,
            consensus: pillarScores.consensus,
            answerability: pillarScores.answerability,
            safety: pillarScores.safety,
            context: pillarScores.context
          },
          recommendations: recommendations
        }),
      });

        const emailResult = await emailResponse.json();

        if (emailResponse.ok && emailResult.success) {
          console.log('✅ Email sent successfully! Email ID:', emailResult.emailId);
          emailSent = true;

          // Update email_sent_at timestamp
          await supabase
            .from('free_score_rate_limits')
            .update({ email_sent_at: new Date().toISOString() })
            .eq('email', requestData.email);
        } else {
          console.error('❌ Email send failed:', emailResult.error);
        }
      } catch (emailError) {
        console.error('❌ Email send exception:', emailError.message);
      }
    }

    console.log('[ECE V2.0] World-class score complete', {
      turnstileVerified,
      usingFallback,
      score: totalScore,
      emailSent
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Score calculated successfully',
        email: requestData.email,
        score: totalScore,
        pillarScores,
        recommendations,
        summaryText,
        turnstileVerified,
        fallbackMode: usingFallback,
        whitelisted: isWhitelisted || undefined,
        email_sent: emailSent
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    console.error('[VERIFY FREE SCORE] Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'An unexpected error occurred'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});