import { apiCache } from '../cache/apiCache';
import { logApiUsage } from './usageLogger';
import { supabase } from '../supabase';

const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const PLACES_API_BASE = 'https://maps.googleapis.com/maps/api/place';

async function callGooglePlacesAPI(endpoint, params, userId, businessId) {
  const startTime = Date.now();

  try {
    const url = new URL(`${PLACES_API_BASE}/${endpoint}/json`);
    url.searchParams.append('key', GOOGLE_PLACES_API_KEY);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, value);
      }
    });

    const response = await fetch(url.toString());
    const responseTimeMs = Date.now() - startTime;
    const statusCode = response.status;

    if (!response.ok) {
      const errorText = await response.text();
      await logApiUsage({
        provider: 'google_places',
        endpoint,
        userId,
        businessId,
        statusCode,
        errorMessage: errorText,
        responseTimeMs,
        cacheHit: false,
      });

      throw new Error(`Google Places API error: ${statusCode} - ${errorText}`);
    }

    const data = await response.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      await logApiUsage({
        provider: 'google_places',
        endpoint,
        userId,
        businessId,
        statusCode,
        errorMessage: data.error_message || data.status,
        responseTimeMs,
        cacheHit: false,
      });

      throw new Error(`Google Places API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
    }

    await logApiUsage({
      provider: 'google_places',
      endpoint,
      userId,
      businessId,
      statusCode,
      responseTimeMs,
      cacheHit: false,
    });

    return data;
  } catch (error) {
    const responseTimeMs = Date.now() - startTime;
    await logApiUsage({
      provider: 'google_places',
      endpoint,
      userId,
      businessId,
      statusCode: 0,
      errorMessage: error.message,
      responseTimeMs,
      cacheHit: false,
    });

    throw error;
  }
}

export async function findBusinessByName(businessName, location, userId, businessId, tradeType = null) {
  try {
    if (!businessName?.trim() || !location?.trim()) {
      throw new Error('Business name and location are required');
    }

    if (!GOOGLE_PLACES_API_KEY || GOOGLE_PLACES_API_KEY === 'your-google-places-api-key-here') {
            throw new Error('Google Places API key not configured');
    }

    const cacheParams = { businessName, location, tradeType };
    const cachedResult = await apiCache.get('google_places', 'textsearch', cacheParams);

    if (cachedResult) {
      await logApiUsage({
        provider: 'google_places',
        endpoint: 'textsearch',
        userId,
        businessId,
        statusCode: 200,
        responseTimeMs: 0,
        cacheHit: true,
      });

      return cachedResult;
    }

    let searchQuery = businessName;
    if (tradeType?.trim()) {
      searchQuery += ` ${tradeType}`;
    }
    searchQuery += ` in ${location}`;

    
    let data = await callGooglePlacesAPI('textsearch', {
      query: searchQuery,
      region: 'uk',
      locationbias: 'circle:500000@54.5,-2.0',
    }, userId, businessId);

    if (data.status === 'ZERO_RESULTS' && tradeType?.trim()) {
            const fallbackQuery = `${businessName} in ${location}`;
      
      data = await callGooglePlacesAPI('textsearch', {
        query: fallbackQuery,
        region: 'uk',
        locationbias: 'circle:500000@54.5,-2.0',
      }, userId, businessId);
    }

    if (data.status === 'ZERO_RESULTS') {
            const findPlaceQuery = `${businessName} ${location}`;
      
      data = await callGooglePlacesAPI('findplacefromtext', {
        input: findPlaceQuery,
        inputtype: 'textquery',
        fields: 'place_id,name,formatted_address,business_status',
        locationbias: 'circle:500000@54.5,-2.0',
      }, userId, businessId);

      const result = {
        found: data.status === 'OK' && data.candidates && data.candidates.length > 0,
        candidates: data.candidates || [],
        results: data.candidates || [],
        status: data.status,
        searchMethod: 'findplacefromtext',
      };

      
      await apiCache.set('google_places', 'textsearch', cacheParams, result, 200);

      return result;
    }

    const result = {
      found: data.status === 'OK' && data.results && data.results.length > 0,
      candidates: data.results || [],
      results: data.results || [],
      status: data.status,
      searchMethod: 'textsearch',
    };

    
    await apiCache.set('google_places', 'textsearch', cacheParams, result, 200);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPlaceDetails(placeId, userId, businessId) {
  try {
    if (!GOOGLE_PLACES_API_KEY || GOOGLE_PLACES_API_KEY === 'your-google-places-api-key-here') {
      throw new Error('Google Places API key not configured');
    }

    const cacheParams = { placeId };
    const cachedResult = await apiCache.get('google_places', 'details', cacheParams);

    if (cachedResult) {
      await logApiUsage({
        provider: 'google_places',
        endpoint: 'details',
        userId,
        businessId,
        statusCode: 200,
        responseTimeMs: 0,
        cacheHit: true,
      });

      return cachedResult;
    }

    const data = await callGooglePlacesAPI('details', {
      place_id: placeId,
      fields: [
        'name',
        'formatted_address',
        'formatted_phone_number',
        'website',
        'rating',
        'user_ratings_total',
        'reviews',
        'opening_hours',
        'photos',
        'business_status',
        'types',
        'url',
      ].join(','),
    }, userId, businessId);

    const result = data.result || null;

    await apiCache.set('google_places', 'details', cacheParams, result, 200);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function verifyAndFetchBusinessData(businessId, userId) {
  try {
    const { data: profile } = await supabase
      .from('business_profiles')
      .select('*, users!inner(*)')
      .eq('id', businessId)
      .single();

    if (!profile) {
      throw new Error('Business profile not found');
    }

    const businessName = profile.users.business_name;
    const location = profile.users.service_area || profile.users.postcode;
    const tradeType = profile.users.trade_type;

    if (!businessName || !location) {
      throw new Error('Business name and location required for verification');
    }

    const searchResult = await findBusinessByName(businessName, location, userId, businessId, tradeType);

    if (!searchResult.found || searchResult.candidates.length === 0) {
      await supabase
        .from('visibility_checks')
        .insert({
          business_id: businessId,
          check_type: 'google_places',
          query: `${businessName} ${location}`,
          provider: 'google_places',
          response_data: { search_result: searchResult },
          visibility_score: 0,
          mentioned: false,
          sentiment: 'none',
          confidence: 0,
          metadata: { verification_status: 'not_found' },
        });

      return {
        verified: false,
        found: false,
        message: 'Business not found on Google. This significantly impacts AI visibility.',
      };
    }

    const placeId = searchResult.candidates[0].place_id;
    const placeDetails = await getPlaceDetails(placeId, userId, businessId);

    const verifiedData = {
      verified: true,
      found: true,
      place_id: placeId,
      name: placeDetails.name,
      address: placeDetails.formatted_address,
      phone: placeDetails.formatted_phone_number,
      website: placeDetails.website,
      rating: placeDetails.rating,
      total_reviews: placeDetails.user_ratings_total,
      reviews: placeDetails.reviews?.slice(0, 5),
      opening_hours: placeDetails.opening_hours,
      photos_count: placeDetails.photos?.length || 0,
      business_status: placeDetails.business_status,
      types: placeDetails.types,
      google_url: placeDetails.url,
    };

    let visibilityScore = 30;

    if (verifiedData.rating) {
      if (verifiedData.rating >= 4.5) visibilityScore += 20;
      else if (verifiedData.rating >= 4.0) visibilityScore += 15;
      else if (verifiedData.rating >= 3.5) visibilityScore += 10;
    }

    if (verifiedData.total_reviews) {
      if (verifiedData.total_reviews >= 50) visibilityScore += 20;
      else if (verifiedData.total_reviews >= 25) visibilityScore += 15;
      else if (verifiedData.total_reviews >= 10) visibilityScore += 10;
      else if (verifiedData.total_reviews >= 5) visibilityScore += 5;
    }

    if (verifiedData.website) visibilityScore += 10;
    if (verifiedData.phone) visibilityScore += 5;
    if (verifiedData.photos_count >= 5) visibilityScore += 10;
    if (verifiedData.opening_hours) visibilityScore += 5;

    visibilityScore = Math.min(100, visibilityScore);

    await supabase
      .from('visibility_checks')
      .insert({
        business_id: businessId,
        check_type: 'google_places',
        query: `${businessName} ${location}`,
        provider: 'google_places',
        response_data: { place_details: placeDetails },
        visibility_score: visibilityScore,
        mentioned: true,
        sentiment: verifiedData.rating >= 4.0 ? 'positive' : verifiedData.rating >= 3.0 ? 'neutral' : 'negative',
        confidence: 1.0,
        context_snippet: placeDetails.name,
        metadata: {
          verification_status: 'verified',
          place_id: placeId,
        },
      });

    return verifiedData;
  } catch (error) {
    throw error;
  }
}
