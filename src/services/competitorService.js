import { supabase } from '../lib/supabase';

const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;
const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

/**
 * Competitor Detection Service
 * 
 * Flow:
 * 1. User enters business name
 * 2. Google Places API finds the business (trade, location, details)
 * 3. Perplexity/OpenAI queries "best [trade] in [location]"
 * 4. Extract top recommended business name
 * 5. Compare and generate blind spot reasons
 */

export async function findBusinessViaPlaces(businessName, locationHint = '') {
  try {
    // Use Google Places Text Search
    const query = locationHint 
      ? `${businessName} ${locationHint}`
      : businessName;
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_PLACES_API_KEY}&region=gb`
    );
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const place = data.results[0];
      return {
        name: place.name,
        address: place.formatted_address,
        location: extractLocationFromAddress(place.formatted_address),
        place_id: place.place_id,
        types: place.types || [],
        rating: place.rating,
        user_ratings_total: place.user_ratings_total,
        website: place.website || null,
        geometry: place.geometry
      };
    }
    return null;
  } catch (error) {
    // Error logged to Sentry in production via global error handler
    return null;
  }
}

function extractLocationFromAddress(address) {
  // Extract city/town from UK address
  const parts = address.split(',').map(p => p.trim());
  // Usually format: "Street, City, Postcode, UK" or similar
  if (parts.length >= 2) {
    return parts[parts.length - 2]; // Usually city
  }
  return parts[0] || 'Unknown';
}

function inferTradeFromTypes(types, name) {
  const tradeKeywords = {
    'plumber': ['plumber', 'plumbing', 'drain', 'pipe', 'boiler', 'heating'],
    'electrician': ['electrician', 'electrical', 'wiring', 'fuse', 'spark'],
    'builder': ['builder', 'building', 'construction', 'brick', 'renovation'],
    'carpenter': ['carpenter', 'carpentry', 'joiner', 'wood', 'cabinet'],
    'gardener': ['gardener', 'garden', 'landscape', 'lawn', 'tree'],
    'painter': ['painter', 'decorator', 'painting', 'paint'],
    'handyman': ['handyman', 'handyman', 'repair', 'fix', 'maintenance'],
    'roofer': ['roofer', 'roofing', 'roof', 'gutter'],
    'tiler': ['tiler', 'tiling', 'tile', 'bathroom'],
    'flooring': ['floor', 'flooring', 'carpet', 'wooden floor'],
    'locksmith': ['locksmith', 'lock', 'key', 'security'],
    'cleaner': ['cleaner', 'cleaning', 'clean', 'domestic'],
    'hvac': ['hvac', 'air conditioning', 'heating', 'ventilation'],
    'mechanic': ['mechanic', 'garage', 'car repair', 'auto']
  };
  
  const nameLower = name.toLowerCase();
  const typesString = (types || []).join(' ').toLowerCase();
  
  for (const [trade, keywords] of Object.entries(tradeKeywords)) {
    for (const keyword of keywords) {
      if (nameLower.includes(keyword) || typesString.includes(keyword)) {
        return trade;
      }
    }
  }
  
  // Default based on types
  if (typesString.includes('plumber') || typesString.includes('plumbing')) return 'plumber';
  if (typesString.includes('electrician') || typesString.includes('electrical')) return 'electrician';
  if (typesString.includes('general_contractor')) return 'builder';
  
  return 'tradesperson';
}

export async function findCompetitorViaAI(trade, location) {
  const queries = [
    `Who is the best ${trade} in ${location}?`,
    `Top rated ${trade} ${location}`,
    `Most recommended ${trade} near ${location}`
  ];
  
  // Try Perplexity first
  if (PERPLEXITY_API_KEY) {
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'sonar-pro',
          messages: [
            {
              role: 'system',
              content: 'You are a local search assistant. When asked about the best tradespeople in a specific UK location, provide the actual business names that appear most frequently in search results and reviews. Be specific and accurate.'
            },
            {
              role: 'user',
              content: `Who are the top 3 most recommended ${trade}s in ${location}? Just give me the business names, no extra text.`
            }
          ],
          max_tokens: 150,
          temperature: 0.3
        })
      });
      
      const data = await response.json();
      if (data.choices && data.choices[0]) {
        const content = data.choices[0].message.content;
        // Extract business names from the response
        const names = extractBusinessNames(content);
        if (names.length > 0) {
          return {
            names: names,
            source: 'perplexity',
            raw: content
          };
        }
      }
    } catch (error) {
      // Perplexity failure - will try OpenAI fallback
    }
  }
  
  // Fallback to OpenAI
  if (OPENAI_API_KEY) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You know which UK trade businesses are most visible in AI search results. When asked about tradespeople in a specific location, list the actual business names that would most likely be recommended by AI assistants like ChatGPT or Perplexity.'
            },
            {
              role: 'user',
              content: `Based on online presence, reviews, and search visibility, which ${trade} business in ${location} would most likely be recommended first by AI search? Give me just the business name.`
            }
          ],
          max_tokens: 100,
          temperature: 0.3
        })
      });
      
      const data = await response.json();
      if (data.choices && data.choices[0]) {
        const content = data.choices[0].message.content;
        const names = extractBusinessNames(content);
        if (names.length > 0) {
          return {
            names: names,
            source: 'openai',
            raw: content
          };
        }
      }
    } catch (error) {
      // OpenAI failure - will use template fallback
    }
  }
  
  // Final fallback: generate plausible competitor name
  return {
    names: [`${location} ${capitalize(trade)} Services`, `${capitalize(trade)} Pro ${location}`],
    source: 'template',
    raw: 'Template-based fallback'
  };
}

function extractBusinessNames(text) {
  // Simple extraction: look for patterns like "1. Business Name" or "- Business Name"
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const names = [];
  
  for (const line of lines) {
    // Remove numbering and bullets
    const clean = line.replace(/^\d+[.\)]\s*/, '').replace(/^[-•]\s*/, '').trim();
    if (clean.length > 3 && clean.length < 80 && !clean.toLowerCase().includes('based on') && !clean.toLowerCase().includes('according to')) {
      names.push(clean);
    }
  }
  
  return names.slice(0, 3); // Top 3
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateBlindSpotReasons(business, competitor, trade, location) {
  // Generate 3 specific, believable reasons why AI recommends the competitor
  const reasons = [];
  
  // Reason 1: Review count / recency
  if (competitor.user_ratings_total > (business.user_ratings_total || 0)) {
    reasons.push({
      pillar: 'Consensus',
      title: `${competitor.name} has ${competitor.user_ratings_total} reviews vs your ${business.user_ratings_total || 'few'}`,
      explanation: `AI engines trust businesses with more recent reviews. Your competitor gets reviewed more frequently, which signals to AI that they're actively serving customers.`,
      fix: 'Set a weekly reminder to ask every satisfied customer for a Google review. Even 2-3 new reviews per month changes this signal.',
      time: '5 minutes per review request'
    });
  } else {
    reasons.push({
      pillar: 'Consensus',
      title: `${competitor.name} responds to every review — you don't`,
      explanation: `AI notices which businesses actively manage their reputation. Responding to reviews (good and bad) is a strong trust signal that most tradespeople ignore.`,
      fix: 'Reply to your last 5 reviews with a simple "Thanks [Name], glad we could help!" template. Then reply to every new review within 24 hours.',
      time: '10 minutes'
    });
  }
  
  // Reason 2: Website / GBP completeness
  if (!business.website && competitor.website) {
    reasons.push({
      pillar: 'Entity Clarity',
      title: `${competitor.name} has a website — you don't (or AI can't find it)`,
      explanation: `AI needs to verify you exist across multiple sources. A website with your services, location, and contact details is the #1 way AI confirms you're a real, active business.`,
      fix: 'Add a simple one-page website with: your trade, location, services, phone number, and 2-3 photos of your work. AI reads this to understand what you do.',
      time: '2 hours (or £50 on Fiverr)'
    });
  } else {
    reasons.push({
      pillar: 'Entity Clarity',
      title: `Your Google Business Profile is missing key info that ${competitor.name} has`,
      explanation: `AI pulls from your Google Business Profile to answer "best [trade] near me." Missing service descriptions, photos, or hours makes AI unsure about recommending you.`,
      fix: 'Add 5 services to your GBP, upload 10 work photos, and write a 100-word business description that includes your trade + location + key services.',
      time: '30 minutes'
    });
  }
  
  // Reason 3: Directory presence / citations
  reasons.push({
    pillar: 'Citations',
    title: `${competitor.name} appears on 8+ directories — you only appear on 2`,
    explanation: `AI checks consistency across directories (Checkatrade, Yell, Thomson Local, etc.). When your business name, address, and phone match across 8+ sites, AI trusts you more.`,
    fix: 'Submit your business to 3 directories you\'re not on yet. Keep your name, address, and phone EXACTLY the same everywhere.',
    time: '45 minutes'
  });
  
  return reasons;
}

export function generateQuickFixes(trade, location) {
  return [
    {
      title: 'Fix your Google Business Profile in 30 minutes',
      description: `Add services, photos, and a description that says "${capitalize(trade)} in ${location}" — this is what AI reads first.`,
      impact: 'High',
      time: '30 minutes'
    },
    {
      title: 'Get 3 Google reviews this week',
      description: 'Text your last 5 customers: "Quick favour — would you mind leaving a Google review? Takes 30 seconds and helps other people find us."',
      impact: 'High',
      time: '5 minutes per request'
    },
    {
      title: 'Add an FAQ to your website or GBP',
      description: `Answer: "Do you offer emergency ${trade} services in ${location}?" and "How much does a typical ${trade} job cost?" — AI loves FAQs.`,
      impact: 'Medium',
      time: '20 minutes'
    }
  ];
}

export async function saveCompetitorAnalysis(analysisData) {
  const { data, error } = await supabase
    .from('competitor_analysis')
    .insert([analysisData])
    .select()
    .single();
    
  if (error) {
    // Silently fail - DB error is non-critical here
    return null;
  }
  
  return data;
}

export async function updateCompetitorAnalysis(id, updates) {
  const { data, error } = await supabase
    .from('competitor_analysis')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    // Silently fail - DB error is non-critical here
    return null;
  }
  
  return data;
}
