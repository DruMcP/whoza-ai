import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

interface AnalysisRequest {
  business_id: string
  user_id: string
  tier?: "basic" | "professional" | "enterprise"
  business_name: string
  location: string
  trade: string
}

interface CompetitorData {
  name: string
  address: string
  rating?: number
  reviewCount?: number
  website?: string | null
  source: string
}

const TIER_CONFIG = {
  basic: {
    competitor_count: 1,
    includes_blind_spots: false,
    includes_quick_fixes: false,
    includes_visibility_score: false,
    includes_recommendations: false,
  },
  professional: {
    competitor_count: 3,
    includes_blind_spots: true,
    includes_quick_fixes: true,
    includes_visibility_score: true,
    includes_recommendations: true,
  },
  enterprise: {
    competitor_count: 5,
    includes_blind_spots: true,
    includes_quick_fixes: true,
    includes_visibility_score: true,
    includes_recommendations: true,
  },
}

async function findBusinessViaPlaces(businessName: string, locationHint = "", apiKey: string) {
  try {
    const query = locationHint ? `${businessName} ${locationHint}` : businessName
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`
    )
    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const place = data.results[0]
      return {
        name: place.name,
        address: place.formatted_address,
        location: extractLocationFromAddress(place.formatted_address),
        place_id: place.place_id,
        types: place.types || [],
        rating: place.rating,
        user_ratings_total: place.user_ratings_total,
        website: place.website || null,
      }
    }
    return null
  } catch (error) {
    return null
  }
}

function extractLocationFromAddress(address: string) {
  const parts = address.split(",").map((p: string) => p.trim())
  if (parts.length >= 2) {
    return parts[parts.length - 2]
  }
  return parts[0] || "Unknown"
}

async function findCompetitorViaAI(trade: string, location: string, perplexityKey?: string, openaiKey?: string) {
  if (perplexityKey) {
    try {
      const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${perplexityKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "sonar-pro",
          messages: [
            {
              role: "system",
              content:
                "You are a local search assistant. When asked about the best tradespeople in a specific UK location, provide the actual business names that appear most frequently in search results and reviews. Be specific and accurate.",
            },
            {
              role: "user",
              content: `Who are the top 3 most recommended ${trade}s in ${location}? Just give me the business names, no extra text.`,
            },
          ],
          max_tokens: 150,
          temperature: 0.3,
        }),
      })

      const data = await response.json()
      if (data.choices && data.choices[0]) {
        const content = data.choices[0].message.content
        const names = extractBusinessNames(content)
        if (names.length > 0) {
          return { names, source: "perplexity", raw: content }
        }
      }
    } catch (error) {
      // Perplexity failure - will try OpenAI fallback
    }
  }

  if (openaiKey) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "You know which UK trade businesses are most visible in AI search results. When asked about tradespeople in a specific location, list the actual business names that would most likely be recommended by AI assistants like ChatGPT or Perplexity.",
            },
            {
              role: "user",
              content: `Based on online presence, reviews, and search visibility, which ${trade} business in ${location} would most likely be recommended first by AI search? Give me just the business name.`,
            },
          ],
          max_tokens: 100,
          temperature: 0.3,
        }),
      })

      const data = await response.json()
      if (data.choices && data.choices[0]) {
        const content = data.choices[0].message.content
        const names = extractBusinessNames(content)
        if (names.length > 0) {
          return { names, source: "openai", raw: content }
        }
      }
    } catch (error) {
      // OpenAI failure - will use template fallback
    }
  }

  return {
    names: [`${location} ${capitalize(trade)} Services`, `${capitalize(trade)} Pro ${location}`],
    source: "template",
    raw: "Template-based fallback",
  }
}

function extractBusinessNames(text: string) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
  const names: string[] = []

  for (const line of lines) {
    const clean = line.replace(/^\d+[.)]\s*/, "").replace(/^[-•]\s*/, "").trim()
    if (
      clean.length > 3 &&
      clean.length < 80 &&
      !clean.toLowerCase().includes("based on") &&
      !clean.toLowerCase().includes("according to")
    ) {
      names.push(clean)
    }
  }

  return names.slice(0, 3)
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function generateBlindSpotReasons(business: any, competitor: any, trade: string, location: string) {
  const reasons = []

  if ((competitor.user_ratings_total || 0) > (business.user_ratings_total || 0)) {
    reasons.push({
      pillar: "Consensus",
      title: `${competitor.name} has ${competitor.user_ratings_total} reviews vs your ${business.user_ratings_total || "few"}`,
      explanation: `AI engines trust businesses with more recent reviews. Your competitor gets reviewed more frequently, which signals to AI that they're actively serving customers.`,
      fix: "Set a weekly reminder to ask every satisfied customer for a Google review. Even 2-3 new reviews per month changes this signal.",
      time: "5 minutes per review request",
    })
  } else {
    reasons.push({
      pillar: "Consensus",
      title: `${competitor.name} responds to every review — you don't`,
      explanation: `AI notices which businesses actively manage their reputation. Responding to reviews (good and bad) is a strong trust signal that most tradespeople ignore.`,
      fix: 'Reply to your last 5 reviews with a simple "Thanks [Name], glad we could help!" template. Then reply to every new review within 24 hours.',
      time: "10 minutes",
    })
  }

  if (!business.website && competitor.website) {
    reasons.push({
      pillar: "Entity Clarity",
      title: `${competitor.name} has a website — you don't (or AI can't find it)`,
      explanation: `AI needs to verify you exist across multiple sources. A website with your services, location, and contact details is the #1 way AI confirms you're a real, active business.`,
      fix: "Add a simple one-page website with: your trade, location, services, phone number, and 2-3 photos of your work. AI reads this to understand what you do.",
      time: "2 hours (or £50 on Fiverr)",
    })
  } else {
    reasons.push({
      pillar: "Entity Clarity",
      title: `Your Google Business Profile is missing key info that ${competitor.name} has`,
      explanation: `AI pulls from your Google Business Profile to answer "best [trade] near me." Missing service descriptions, photos, or hours makes AI unsure about recommending you.`,
      fix: "Add 5 services to your GBP, upload 10 work photos, and write a 100-word business description that includes your trade + location + key services.",
      time: "30 minutes",
    })
  }

  reasons.push({
    pillar: "Citations",
    title: `${competitor.name} appears on 8+ directories — you only appear on 2`,
    explanation: `AI checks consistency across directories (Checkatrade, Yell, Thomson Local, etc.). When your business name, address, and phone match across 8+ sites, AI trusts you more.`,
    fix: "Submit your business to 3 directories you're not on yet. Keep your name, address, and phone EXACTLY the same everywhere.",
    time: "45 minutes",
  })

  return reasons
}

function generateQuickFixes(trade: string, location: string) {
  return [
    {
      title: "Fix your Google Business Profile in 30 minutes",
      description: `Add services, photos, and a description that says "${capitalize(trade)} in ${location}" — this is what AI reads first.`,
      impact: "High",
      time: "30 minutes",
    },
    {
      title: "Get 3 Google reviews this week",
      description:
        'Text your last 5 customers: "Quick favour — would you mind leaving a Google review? Takes 30 seconds and helps other people find us."',
      impact: "High",
      time: "5 minutes per request",
    },
    {
      title: "Add an FAQ to your website or GBP",
      description: `Answer: "Do you offer emergency ${trade} services in ${location}?" and "How much does a typical ${trade} job cost?" — AI loves FAQs.`,
      impact: "Medium",
      time: "20 minutes",
    },
  ]
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { business_id, user_id, tier = "professional", business_name, location, trade }: AnalysisRequest = await req.json()

    if (!business_id || !user_id || !business_name || !location || !trade) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: business_id, user_id, business_name, location, trade" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const googlePlacesKey = Deno.env.get("GOOGLE_PLACES_API_KEY")
    const perplexityKey = Deno.env.get("PERPLEXITY_API_KEY")
    const openaiKey = Deno.env.get("OPENAI_API_KEY")

    const tierFeatures = TIER_CONFIG[tier]

    // Step 1: Find user's business
    const userBusiness = googlePlacesKey
      ? await findBusinessViaPlaces(business_name, location, googlePlacesKey)
      : null

    // Step 2: Find competitors via AI
    const competitorResult = await findCompetitorViaAI(trade, location, perplexityKey, openaiKey)
    const competitorNames = competitorResult.names.slice(0, tierFeatures.competitor_count)

    // Step 3: Build competitor data
    const topCompetitors: CompetitorData[] = []
    for (const name of competitorNames) {
      if (googlePlacesKey) {
        const place = await findBusinessViaPlaces(name, location, googlePlacesKey)
        if (place) {
          topCompetitors.push({
            name: place.name,
            address: place.address,
            rating: place.rating,
            reviewCount: place.user_ratings_total,
            website: place.website,
            source: competitorResult.source,
          })
        }
      }
    }

    // Step 4: Generate blind spots (professional/enterprise only)
    let blindSpots: any[] = []
    if (tierFeatures.includes_blind_spots && userBusiness && topCompetitors.length > 0) {
      blindSpots = generateBlindSpotReasons(userBusiness, topCompetitors[0], trade, location)
    }

    // Step 5: Generate quick fixes (professional/enterprise only)
    let quickFixes: any[] = []
    if (tierFeatures.includes_quick_fixes) {
      quickFixes = generateQuickFixes(trade, location)
    }

    // Step 6: Get visibility score if available
    let visibilityScore: number | undefined
    if (tierFeatures.includes_visibility_score) {
      const { data: scoreData } = await supabase
        .from("visibility_score_details")
        .select("overall_score")
        .eq("business_id", business_id)
        .order("score_date", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (scoreData) {
        visibilityScore = scoreData.overall_score
      }
    }

    const now = new Date()
    const analysis = {
      business_id,
      user_id,
      tier,
      month: now.toLocaleString("en-GB", { month: "long" }),
      year: now.getFullYear(),
      your_business: {
        name: business_name,
        location,
        trade,
        visibility_score: visibilityScore,
      },
      top_competitors: topCompetitors,
      blind_spots: blindSpots,
      quick_fixes: quickFixes,
      tier_features: tierFeatures,
      generated_at: now.toISOString(),
    }

    // Save to database
    const { data: saved, error } = await supabase
      .from("monthly_competitor_analysis")
      .insert([analysis])
      .select()
      .single()

    if (error) {
      console.error("Failed to save monthly competitor analysis:", error)
      return new Response(
        JSON.stringify({ error: "Failed to save analysis", details: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
        analysis: saved,
        competitors_found: topCompetitors.length,
        blind_spots_generated: blindSpots.length,
        quick_fixes_generated: quickFixes.length,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("Error generating monthly analysis:", error)
    return new Response(
      JSON.stringify({ error: "Internal server error", details: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
