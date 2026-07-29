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
  // City-specific differentiation fields
  neighbourhoods?: string[]
  associations?: string[]
  responseTime?: string
  callVolume?: string
  testimonial?: {
    quote: string
    name: string
    trade: string
    area: string
  }
}

export const locations: LocationData[] = [
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
    },
    neighbourhoods: ["Camden", "Hackney", "Chelsea", "Islington", "Kensington", "Brixton", "Greenwich", "Wandsworth", "Westminster", "Shoreditch"],
    associations: ["NICEIC registered electricians", "Gas Safe engineers", "FMB accredited builders", "Which? Trusted Traders"],
    responseTime: "18 minutes average emergency callback",
    callVolume: "Over 45,000 trade enquiries per week across Greater London",
    testimonial: {
      quote: "I was losing three jobs a day driving between Camden and Clapham. Katie caught a £2,400 bathroom refit enquiry while I was stuck on the North Circular. Paid for the whole year in one call.",
      name: "Marcus O.",
      trade: "Plumber",
      area: "North London"
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
    },
    neighbourhoods: ["Didsbury", "Chorlton", "Salford Quays", "Ancoats", "Withington", "Fallowfield", "Levenshulme", "Prestwich", "Sale", "Altrincham"],
    associations: ["NICEIC registered electricians", "Gas Safe engineers", "FMB accredited builders", "TrustMark registered"],
    responseTime: "22 minutes average emergency callback",
    callVolume: "Around 18,000 trade enquiries per week across Greater Manchester",
    testimonial: {
      quote: "Storm Dennis hit and my phone wouldn't stop ringing while I was up a ladder in Didsbury. Katie booked four roof inspections in two hours. I used to dread rainy Mondays.",
      name: "Sean K.",
      trade: "Roofer",
      area: "South Manchester"
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
    },
    neighbourhoods: ["Edgbaston", "Moseley", "Harborne", "Sutton Coldfield", "Solihull", "Kings Heath", "Digbeth", "Erdington", "Handsworth", "Acocks Green"],
    associations: ["NICEIC registered electricians", "Gas Safe engineers", "FMB accredited builders", "Dulux Select Decorators"],
    responseTime: "25 minutes average emergency callback",
    callVolume: "Around 16,000 trade enquiries per week across the West Midlands",
    testimonial: {
      quote: "I cover Edgbaston to Solihull and used to miss calls on the A38 every morning. Katie caught a £5,200 kitchen extension lead while I was stuck in Spaghetti Junction traffic.",
      name: "Javid H.",
      trade: "Builder",
      area: "Central Birmingham"
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
    },
    neighbourhoods: ["Headingley", "Chapel Allerton", "Roundhay", "Horsforth", "Guiseley", "Morley", "Pudsey", "Otley", "Ilkley", "Wetherby"],
    associations: ["NICEIC registered electricians", "NAPIT certified", "FMB accredited builders", "RHS landscapers"],
    responseTime: "28 minutes average emergency callback",
    callVolume: "Around 12,000 trade enquiries per week across West Yorkshire",
    testimonial: {
      quote: "I rewired a Victorian terrace in Headingley and missed three calls while I was in the crawl space. Katie caught a £1,800 rewire enquiry from Chapel Allerton. Best £59 I've spent.",
      name: "Tom B.",
      trade: "Electrician",
      area: "North Leeds"
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
    },
    neighbourhoods: ["West End", "Southside", "East End", "Partick", "Hillhead", "Dennistoun", "Pollokshields", "Shawlands", "Maryhill", "Govan"],
    associations: ["NICEIC registered electricians", "Gas Safe engineers", "FMB accredited builders", "SELECT Scotland"],
    responseTime: "20 minutes average emergency callback",
    callVolume: "Around 11,000 trade enquiries per week across Greater Glasgow",
    testimonial: {
      quote: "Tenement close in Partick — burst pipe at 6am and I'm already under a sink in Shawlands. Katie handled it, got the tenant's details, and I called back within 15 minutes. Saved a £380 callout.",
      name: "Angus M.",
      trade: "Plumber",
      area: "Glasgow West End"
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
    },
    neighbourhoods: ["Clifton", "Redland", "Southville", "Stokes Croft", "Bedminster", "Montpelier", "Totterdown", "Henleaze", "Westbury-on-Trym", "Kingswood"],
    associations: ["NICEIC registered electricians", "Gas Safe engineers", "FMB accredited builders", "Bristol Green Capital partners"],
    responseTime: "24 minutes average emergency callback",
    callVolume: "Around 9,500 trade enquiries per week across Bristol and surrounding areas",
    testimonial: {
      quote: "I was fitting a heat pump in Clifton Village and missed two calls from Redland homeowners. Katie caught both — one was a £4,200 air-source installation. Bristol trades need this.",
      name: "Oliver P.",
      trade: "Heating Engineer",
      area: "North Bristol"
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
    },
    neighbourhoods: ["Aigburth", "Wavertree", "Woolton", "Allerton", "Childwall", "Mossley Hill", "Toxteth", "Anfield", "Everton", "Crosby"],
    associations: ["NICEIC registered electricians", "Gas Safe engineers", "FMB accredited builders", "NFRC certified roofers"],
    responseTime: "26 minutes average emergency callback",
    callVolume: "Around 8,500 trade enquiries per week across Merseyside",
    testimonial: {
      quote: "Storm damage in Woolton and I'm already on a roof in Aigburth. Katie took the call, calmed the homeowner down, and sent me everything I needed. Booked a £1,650 re-roof the next day.",
      name: "Danny R.",
      trade: "Roofer",
      area: "South Liverpool"
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
    },
    neighbourhoods: ["Stockbridge", "Leith", "Morningside", "Bruntsfield", "Marchmont", "New Town", "Old Town", "Portobello", "Corstorphine", "Gorgie"],
    associations: ["NICEIC registered electricians", "Gas Safe engineers", "FMB accredited builders", "Historic Environment Scotland approved"],
    responseTime: "21 minutes average emergency callback",
    callVolume: "Around 10,000 trade enquiries per week across Edinburgh and the Lothians",
    testimonial: {
      quote: "Festival season is chaos — emergency call for a burst pipe in a New Town Airbnb at midnight while I'm already in Leith. Katie handled it, got the property manager's details, and I fixed it by 7am. Guest left a 5-star review.",
      name: "Iain F.",
      trade: "Plumber",
      area: "Edinburgh City Centre"
    }
  },
]

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find((loc) => loc.slug === slug)
}

export function getLocationsByCountry(country: Country): LocationData[] {
  return locations.filter((loc) => loc.country === country)
}
