import { Country } from "./locale-config"

export interface LocationData {
  slug: string
  city: string
  country: Country
  region?: string
  trades?: string[]
  population?: string
  description?: string
  challenges?: string[]
  lat?: string
  lng?: string
  localStats?: {
    businesses: string
    households: string
    avgJob: string
    missedCallsWeekly: string
    marketSize: string
  }
}

export const locations: LocationData[] = [
  // UK Cities
  { 
    slug: "london", 
    city: "London", 
    country: "uk", 
    region: "England", 
    lat: "51.5074",
    lng: "-0.1278",
    trades: ["plumbers", "electricians", "builders"],
    population: "8.9M",
    description: "London has 35,000+ trade businesses serving 3.5M households. Katie answers emergency calls 24/7, captures enquiries via WhatsApp. Plans from £59/month.",
    challenges: [
      "High competition — 15+ plumbers per postcode in central London",
      "Emergency calls peak during commute hours when you're on the road",
      "Diverse housing stock (Victorian to new-build) requires different expertise",
      "Tenant vs landlord enquiries need different handling"
    ],
    localStats: {
      businesses: "32,000+",
      households: "1.2M",
      avgJob: "£340",
      missedCallsWeekly: "8,200",
      marketSize: "£1.2B"
    }
  },
  { 
    slug: "manchester", 
    city: "Manchester", 
    country: "uk", 
    region: "England", 
    lat: "53.4808",
    lng: "-2.2426",
    trades: ["plumbers", "electricians", "roofers"],
    population: "2.8M",
    description: "Manchester has 10,000+ trade businesses serving 550K households. Katie answers emergency calls 24/7, captures enquiries via WhatsApp. Plans from £59/month.",
    challenges: [
      "Rapid property development creates surge demand for trades",
      "Weather emergencies (storms, flooding) cause call spikes",
      "Student housing market needs fast-turnaround maintenance",
      "Old industrial buildings require specialist trade knowledge"
    ],
    localStats: {
      businesses: "8,500+",
      households: "540K",
      avgJob: "£310",
      missedCallsWeekly: "3,400",
      marketSize: "£420M"
    }
  },
  { 
    slug: "birmingham", 
    city: "Birmingham", 
    country: "uk", 
    region: "England", 
    lat: "52.4862",
    lng: "-1.8904",
    trades: ["plumbers", "builders", "painters"],
    population: "2.6M",
    description: "Birmingham has 11,000+ trade businesses serving 680K households. Katie answers emergency calls 24/7, captures enquiries via WhatsApp. Plans from £59/month.",
    challenges: [
      "Large suburban areas mean longer travel times between jobs",
      "Diverse housing from 1930s semis to modern apartments",
      "Biggest Light Rail expansion creates construction demand spikes",
      "High tenant turnover in rental areas means constant maintenance calls"
    ],
    localStats: {
      businesses: "11,000+",
      households: "680K",
      avgJob: "£295",
      missedCallsWeekly: "4,100",
      marketSize: "£380M"
    }
  },
  { 
    slug: "leeds", 
    city: "Leeds", 
    country: "uk", 
    region: "England", 
    lat: "53.8008",
    lng: "-1.5491",
    trades: ["electricians", "roofers", "landscapers"],
    population: "2.3M",
    description: "Leeds has 8,500+ trade businesses serving 350K households. Katie answers emergency calls 24/7, captures enquiries via WhatsApp. Plans from £59. Try free.",
    challenges: [
      "Victorian wiring in older terraces needs specialist electricians",
      "Yorkshire weather puts constant demand on roofers",
      "Rural-urban mix means wide service areas and travel time",
      "Student areas (Headingley) have high turnover maintenance needs"
    ],
    localStats: {
      businesses: "6,000+",
      households: "350K",
      avgJob: "£285",
      missedCallsWeekly: "2,800",
      marketSize: "£260M"
    }
  },
  { 
    slug: "glasgow", 
    city: "Glasgow", 
    country: "uk", 
    region: "Scotland", 
    lat: "55.8642",
    lng: "-4.2518",
    trades: ["plumbers", "builders", "electricians"],
    population: "1.7M",
    description: "Glasgow has 9,000+ trade businesses serving 300K households. Katie answers emergency calls 24/7, captures enquiries via WhatsApp. Plans from £59/month.",
    challenges: [
      "Tenement buildings have shared systems — emergencies affect multiple flats",
      "Harsh winters cause boiler and heating emergencies to spike",
      "Older housing stock needs frequent electrical and plumbing updates",
      "High tenant areas like West End need rapid response maintenance"
    ],
    localStats: {
      businesses: "5,500+",
      households: "310K",
      avgJob: "£290",
      missedCallsWeekly: "2,600",
      marketSize: "£220M"
    }
  },
  { 
    slug: "bristol", 
    city: "Bristol", 
    country: "uk", 
    region: "England", 
    lat: "51.4545",
    lng: "-2.5879",
    trades: ["plumbers", "electricians", "builders"],
    population: "700K",
    description: "Bristol has 8,000+ trade businesses serving 460K households. Katie answers emergency calls 24/7, captures enquiries via WhatsApp. Plans from £59/month.",
    challenges: [
      "Hills and narrow streets make travel between jobs time-consuming",
      "Eco-conscious customers ask about energy-efficient solutions",
      "Listed buildings require specialist conservation trades",
      "High property prices mean homeowners expect premium service"
    ],
    localStats: {
      businesses: "4,800+",
      households: "235K",
      avgJob: "£320",
      missedCallsWeekly: "2,100",
      marketSize: "£195M"
    }
  },
  { 
    slug: "liverpool", 
    city: "Liverpool", 
    country: "uk", 
    region: "England", 
    lat: "53.4084",
    lng: "-2.9916",
    trades: ["roofers", "plumbers", "electricians"],
    population: "900K",
    description: "Liverpool has 7,500+ trade businesses serving 280K households. Katie answers emergency calls 24/7, captures enquiries via WhatsApp. Plans from £59/month.",
    challenges: [
      "Aging Victorian housing needs constant roof and gutter maintenance",
      "Student areas (Aigburth, Wavertree) have high-turnover repairs",
      "Coastal weather accelerates wear on roofs and exteriors",
      "Regeneration projects create demand spikes for multiple trades"
    ],
    localStats: {
      businesses: "4,200+",
      households: "210K",
      avgJob: "£275",
      missedCallsWeekly: "1,900",
      marketSize: "£170M"
    }
  },
  { 
    slug: "edinburgh", 
    city: "Edinburgh", 
    country: "uk", 
    region: "Scotland", 
    lat: "55.9533",
    lng: "-3.1883",
    trades: ["builders", "plumbers", "electricians"],
    population: "540K",
    description: "Edinburgh has 7,000+ trade businesses serving 250K households. Katie answers emergency calls 24/7, captures enquiries via WhatsApp. Plans from £59/month.",
    challenges: [
      "Georgian and Victorian buildings need specialist conservation trades",
      "Festival season brings emergency maintenance demands for venues",
      "Tourist rentals need rapid turnaround between bookings",
      "Hilly terrain and narrow streets make emergency response challenging"
    ],
    localStats: {
      businesses: "4,500+",
      households: "245K",
      avgJob: "£315",
      missedCallsWeekly: "2,200",
      marketSize: "£200M"
    }
  },
]

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find((loc) => loc.slug === slug)
}

export function getLocationsByCountry(country: Country): LocationData[] {
  return locations.filter((loc) => loc.country === country)
}
