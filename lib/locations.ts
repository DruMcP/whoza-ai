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
    trades: ["plumbers", "electricians", "builders"],
    population: "8.9M",
    description: "London's competitive trade market means missed calls cost more. With 32,000+ trade businesses competing for 1.2M households, answering every enquiry is critical.",
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
    trades: ["plumbers", "electricians", "roofers"],
    population: "2.8M",
    description: "Manchester's booming property market and rainy climate mean roofers and plumbers are always in demand. But with 8,500+ trade businesses, standing out requires capturing every call.",
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
    trades: ["plumbers", "builders", "painters"],
    population: "2.6M",
    description: "As the UK's second-largest city, Birmingham has a massive trade market. 11,000+ trade businesses serve 680K households, but missed calls cost the local economy millions annually.",
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
    trades: ["electricians", "roofers", "landscapers"],
    population: "2.3M",
    description: "Leeds' mix of Victorian terraces, modern developments, and rural outskirts creates unique trade demands. Electricians and roofers are particularly busy with the city's ongoing regeneration.",
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
    trades: ["plumbers", "builders", "electricians"],
    population: "1.7M",
    description: "Glasgow's tenement buildings and harsh winters create constant demand for plumbers and heating engineers. With 5,500+ trade businesses, competition is fierce and every missed call is a lost job.",
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
    trades: ["plumbers", "electricians", "builders"],
    population: "700K",
    description: "Bristol's booming property market and eco-conscious homeowners drive demand for modern, efficient trade services. The city's 4,800+ trade businesses compete for high-value jobs.",
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
    trades: ["roofers", "plumbers", "electricians"],
    population: "900K",
    description: "Liverpool's mix of historic docks, Victorian housing, and new developments creates varied trade needs. Roofers are especially busy with the city's rainy climate and aging housing stock.",
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
    trades: ["builders", "plumbers", "electricians"],
    population: "540K",
    description: "Edinburgh's UNESCO World Heritage status and seasonal tourism create unique trade demands. Builders and plumbers handle everything from Georgian renovations to modern flat emergencies.",
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
  
  // US Cities
  { 
    slug: "new-york", 
    city: "New York", 
    country: "us", 
    region: "NY", 
    trades: ["HVAC", "plumbing", "electrical"],
    population: "8.3M",
    description: "New York's massive rental market and aging infrastructure keep HVAC, plumbing, and electrical contractors busy 24/7. With millions of apartments and strict regulations, every call matters.",
    challenges: [
      "NYC building codes require licensed professionals for all work",
      "Rent-controlled apartments need landlord-approved contractors",
      "High-rise buildings have complex HVAC and plumbing systems",
      "Emergency calls peak during extreme weather events"
    ],
    localStats: {
      businesses: "45,000+",
      households: "3.1M",
      avgJob: "$520",
      missedCallsWeekly: "12,000",
      marketSize: "$2.1B"
    }
  },
  { 
    slug: "los-angeles", 
    city: "Los Angeles", 
    country: "us", 
    region: "CA", 
    trades: ["HVAC", "roofing", "landscaping"],
    population: "3.9M",
    description: "LA's sprawling metro area and Mediterranean climate create year-round demand for HVAC, roofing, and landscaping. With 28,000+ trade businesses, capturing every call is essential.",
    challenges: [
      "Sprawling metro area means long drive times between jobs",
      "Earthquake retrofitting creates surge demand for structural trades",
      "Heat waves cause AC emergency call spikes",
      "Drought restrictions affect landscaping and irrigation work"
    ],
    localStats: {
      businesses: "28,000+",
      households: "1.4M",
      avgJob: "$480",
      missedCallsWeekly: "7,500",
      marketSize: "$1.3B"
    }
  },
  { 
    slug: "chicago", 
    city: "Chicago", 
    country: "us", 
    region: "IL", 
    trades: ["plumbing", "HVAC", "electrical"],
    population: "2.7M",
    description: "Chicago's extreme winters and summers put constant strain on HVAC and plumbing systems. With 18,000+ trade businesses, the competition for emergency calls is intense.",
    challenges: [
      "Extreme temperature swings stress HVAC systems year-round",
      "Frozen pipes in winter create emergency plumbing surges",
      "Old brick buildings need specialist electrical updates",
      "Lake-effect weather causes unpredictable demand spikes"
    ],
    localStats: {
      businesses: "18,000+",
      households: "1.1M",
      avgJob: "$450",
      missedCallsWeekly: "5,200",
      marketSize: "$810M"
    }
  },
  { 
    slug: "dallas", 
    city: "Dallas", 
    country: "us", 
    region: "TX", 
    trades: ["HVAC", "roofing", "plumbing"],
    population: "2.6M",
    description: "Dallas's rapid growth and extreme heat make HVAC the king of trades. With 15,000+ trade businesses serving a booming population, missed calls mean lost market share.",
    challenges: [
      "100°F+ summers cause AC system failures daily",
      "Hail storms create roofing emergency surges",
      "Rapid suburban expansion means wide service areas",
      "New construction codes require specialist HVAC knowledge"
    ],
    localStats: {
      businesses: "15,000+",
      households: "920K",
      avgJob: "$420",
      missedCallsWeekly: "4,800",
      marketSize: "$630M"
    }
  },
  { 
    slug: "houston", 
    city: "Houston", 
    country: "us", 
    region: "TX", 
    trades: ["HVAC", "plumbing", "electrical"],
    population: "2.3M",
    description: "Houston's humidity and hurricane season create unique trade challenges. HVAC systems work overtime, and post-storm repairs spike demand for all trades.",
    challenges: [
      "Humidity causes mold issues requiring HVAC and remediation",
      "Hurricane season creates post-storm repair surges",
      "Flood-prone areas need emergency plumbing and electrical",
      "Rapid growth in suburbs means constant new installation work"
    ],
    localStats: {
      businesses: "14,000+",
      households: "850K",
      avgJob: "$410",
      missedCallsWeekly: "4,400",
      marketSize: "$580M"
    }
  },
  { 
    slug: "phoenix", 
    city: "Phoenix", 
    country: "us", 
    region: "AZ", 
    trades: ["HVAC", "roofing", "landscaping"],
    population: "1.7M",
    description: "Phoenix's desert heat makes HVAC essential for survival. With 120°F summers, AC failures are emergencies. The city's 9,000+ trade businesses handle constant demand.",
    challenges: [
      "120°F+ temperatures make AC failures life-threatening emergencies",
      "Monsoon season damages roofs and causes flooding",
      "Desert landscaping requires specialist irrigation knowledge",
      "Rapid growth creates constant new construction demand"
    ],
    localStats: {
      businesses: "9,000+",
      households: "580K",
      avgJob: "$390",
      missedCallsWeekly: "3,200",
      marketSize: "$350M"
    }
  },
  { 
    slug: "miami", 
    city: "Miami", 
    country: "us", 
    region: "FL", 
    trades: ["HVAC", "roofing", "electrical"],
    population: "460K",
    description: "Miami's tropical climate and hurricane risk keep HVAC, roofing, and electrical contractors busy year-round. With 7,500+ trade businesses, competition is fierce.",
    challenges: [
      "Hurricane season requires storm-ready roofing and electrical",
      "Salt air corrodes HVAC systems faster than inland areas",
      "High humidity causes mold and electrical issues",
      "Tourist rentals need rapid turnaround between guests"
    ],
    localStats: {
      businesses: "7,500+",
      households: "180K",
      avgJob: "$460",
      missedCallsWeekly: "2,800",
      marketSize: "$310M"
    }
  },
  { 
    slug: "atlanta", 
    city: "Atlanta", 
    country: "us", 
    region: "GA", 
    trades: ["HVAC", "plumbing", "electrical"],
    population: "500K",
    description: "Atlanta's hot summers and rapid suburban sprawl create constant demand for HVAC and plumbing. With 8,000+ trade businesses, capturing every call is critical.",
    challenges: [
      "Suburban sprawl means 30+ minute drives between jobs",
      "Hot, humid summers push AC systems to failure",
      "Clay soil causes foundation and plumbing issues",
      "Rapid growth in outer counties creates service gaps"
    ],
    localStats: {
      businesses: "8,000+",
      households: "210K",
      avgJob: "$400",
      missedCallsWeekly: "3,000",
      marketSize: "$320M"
    }
  },
]

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find((loc) => loc.slug === slug)
}

export function getLocationsByCountry(country: Country): LocationData[] {
  return locations.filter((loc) => loc.country === country)
}
