#!/usr/bin/env node
/**
 * Scottish City Combo Page Generator
 * Generates /for-[trade]-[city] pages for Glasgow and Edinburgh
 */

const fs = require('fs');
const path = require('path');

// Trade configurations
const trades = [
  {
    slug: 'builders',
    singular: 'Builder',
    plural: 'Builders',
    display: 'Builders',
    icon: 'Home',
    color: 'blue',
    jobTypes: 'extensions, renovations & new builds',
    emergencyTypes: 'structural emergencies, urgent repairs & project enquiries',
    problemContext: 'Glasgow\'s tenement buildings and harsh winters create constant demand for builders. With 5,500+ trade businesses competing, every missed call is a lost project.',
    avgJob: '£290',
  },
  {
    slug: 'plumbers',
    singular: 'Plumber',
    plural: 'Plumbers',
    display: 'Plumbers',
    icon: 'Wrench',
    color: 'blue',
    jobTypes: 'burst pipes, boiler repairs, leak detection, drainage & installations',
    emergencyTypes: 'burst pipes, boiler breakdowns, leaks & no water',
    problemContext: 'Glasgow\'s tenement buildings and freezing winters cause constant plumbing emergencies. Burst pipes and boiler failures spike in cold months. Every missed call is a £250+ emergency lost.',
    avgJob: '£290',
  },
  {
    slug: 'electricians',
    singular: 'Electrician',
    plural: 'Electricians',
    display: 'Electricians',
    icon: 'Zap',
    color: 'yellow',
    jobTypes: 'rewiring, consumer units, EICR certificates, emergency faults & EV chargers',
    emergencyTypes: 'power outages, electrical faults, tripped circuits & safety issues',
    problemContext: 'Glasgow\'s mix of Victorian tenements and modern developments creates diverse electrical needs. Older wiring needs frequent updates. Every missed emergency call is a £300+ job lost.',
    avgJob: '£290',
  },
  {
    slug: 'roofers',
    singular: 'Roofer',
    plural: 'Roofers',
    display: 'Roofers',
    icon: 'Home',
    color: 'slate',
    jobTypes: 'storm damage, slipped tiles, leak emergencies & full re-roof quotes',
    emergencyTypes: 'storm damage, active leaks & emergency repairs',
    problemContext: 'Glasgow\'s harsh winters and rainy climate put constant strain on roofs. Tenement buildings have shared roof structures — emergencies affect multiple flats.',
    avgJob: '£290',
  },
  {
    slug: 'heating-engineers',
    singular: 'Heating Engineer',
    plural: 'Heating Engineers',
    display: 'Heating Engineers',
    icon: 'Flame',
    color: 'orange',
    jobTypes: 'boiler breakdowns, servicing, installations & Gas Safety certificates',
    emergencyTypes: 'boiler breakdowns, no heating & gas emergencies',
    problemContext: 'Glasgow\'s harsh winters cause boiler and heating emergencies to spike. Tenement buildings have shared systems — failures affect multiple flats.',
    avgJob: '£290',
  },
  {
    slug: 'locksmiths',
    singular: 'Locksmith',
    plural: 'Locksmiths',
    display: 'Locksmiths',
    icon: 'Key',
    color: 'amber',
    jobTypes: 'lockouts, lock changes, security upgrades & emergency entry',
    emergencyTypes: 'lockouts, broken locks & security breaches',
    problemContext: 'Glasgow\'s high tenant turnover in areas like the West End means constant demand for locksmiths. Every missed emergency callout is £150+ lost.',
    avgJob: '£290',
  },
  {
    slug: 'carpenters',
    singular: 'Carpenter',
    plural: 'Carpenters',
    display: 'Carpenters',
    icon: 'Hammer',
    color: 'amber',
    jobTypes: 'bespoke joinery, kitchen fitting, door installation & woodwork repairs',
    emergencyTypes: 'broken doors, security issues & urgent repairs',
    problemContext: 'Glasgow\'s mix of tenement flats and new developments creates diverse carpentry needs. Older properties need specialist woodwork restoration.',
    avgJob: '£290',
  },
  {
    slug: 'joiners',
    singular: 'Joiner',
    plural: 'Joiners',
    display: 'Joiners',
    icon: 'Hammer',
    color: 'amber',
    jobTypes: 'bespoke joinery, staircases, doors, windows & woodwork',
    emergencyTypes: 'broken doors, window failures & security issues',
    problemContext: 'Glasgow\'s traditional tenement buildings need specialist joinery for windows, doors, and staircases. Every missed enquiry is a lost bespoke job.',
    avgJob: '£290',
  },
  {
    slug: 'plasterers',
    singular: 'Plasterer',
    plural: 'Plasterers',
    display: 'Plasterers',
    icon: 'Paintbrush',
    color: 'cyan',
    jobTypes: 'plastering, skimming, rendering, dry lining & repairs',
    emergencyTypes: 'water damage, cracked plaster & urgent repairs',
    problemContext: 'Glasgow\'s older housing stock needs frequent plastering updates. Tenement buildings have shared walls — damage spreads quickly.',
    avgJob: '£290',
  },
  {
    slug: 'tilers',
    singular: 'Tiler',
    plural: 'Tilers',
    display: 'Tilers',
    icon: 'Grid3x3',
    color: 'cyan',
    jobTypes: 'bathroom tiling, kitchen tiling, floor tiling & mosaic work',
    emergencyTypes: 'loose tiles, water damage & urgent repairs',
    problemContext: 'Glasgow\'s renovation boom means high demand for specialist tilers. Every missed call is a lost £2,000+ bathroom or kitchen job.',
    avgJob: '£290',
  },
  {
    slug: 'gas-engineers',
    singular: 'Gas Engineer',
    plural: 'Gas Engineers',
    display: 'Gas Engineers',
    icon: 'Flame',
    color: 'orange',
    jobTypes: 'Gas Safety certificates, boiler repairs, installations & servicing',
    emergencyTypes: 'gas leaks, boiler breakdowns & carbon monoxide concerns',
    problemContext: 'Glasgow\'s harsh winters and older gas systems create constant demand. Landlords need annual CP12 certificates — a huge repeat market.',
    avgJob: '£290',
  },
  {
    slug: 'handymen',
    singular: 'Handyman',
    plural: 'Handymen',
    display: 'Handymen',
    icon: 'Wrench',
    color: 'green',
    jobTypes: 'general repairs, maintenance, flat packs, odd jobs & property upkeep',
    emergencyTypes: 'urgent repairs, security issues & tenant emergencies',
    problemContext: 'Glasgow\'s busy rental market means constant demand for reliable handymen. Every missed call is a lost £100-£300 job.',
    avgJob: '£290',
  },
  {
    slug: 'cleaners',
    singular: 'Cleaner',
    plural: 'Cleaners',
    display: 'Cleaners',
    icon: 'Sparkles',
    color: 'teal',
    jobTypes: 'domestic cleaning, end-of-tenancy, deep cleans & commercial cleaning',
    emergencyTypes: 'urgent cleans, spillages & end-of-tenancy deadlines',
    problemContext: 'Glasgow\'s high tenant turnover means constant end-of-tenancy cleaning demand. Every missed call is a lost £200+ job.',
    avgJob: '£290',
  },
  {
    slug: 'landscapers',
    singular: 'Landscaper',
    plural: 'Landscapers',
    display: 'Landscapers',
    icon: 'TreePine',
    color: 'green',
    jobTypes: 'garden design, patios, decking, fencing & maintenance',
    emergencyTypes: 'storm damage, fallen trees & urgent clearances',
    problemContext: 'Glasgow\'s parks and green spaces culture drives demand for quality landscaping. Every missed spring enquiry is a lost £5,000+ project.',
    avgJob: '£290',
  },
  {
    slug: 'painters-decorators',
    singular: 'Painter & Decorator',
    plural: 'Painters & Decorators',
    display: 'Painters & Decorators',
    icon: 'Paintbrush',
    color: 'purple',
    jobTypes: 'interior painting, exterior painting, wallpapering & decorative finishes',
    emergencyTypes: 'water damage, urgent touch-ups & pre-sale makeovers',
    problemContext: 'Glasgow\'s property market keeps painters busy. Every missed call is a lost £1,500+ interior or exterior job.',
    avgJob: '£290',
  },
  {
    slug: 'pest-control',
    singular: 'Pest Control',
    plural: 'Pest Control',
    display: 'Pest Control',
    icon: 'Bug',
    color: 'red',
    jobTypes: 'rodent control, insect removal, bird proofing & prevention',
    emergencyTypes: 'infestations, wasp nests & urgent pest issues',
    problemContext: 'Glasgow\'s older tenement buildings are prone to pest issues. Every missed emergency call is a lost £200+ job and a potential health hazard.',
    avgJob: '£290',
  },
  {
    slug: 'drainage',
    singular: 'Drainage Engineer',
    plural: 'Drainage Engineers',
    display: 'Drainage Engineers',
    icon: 'Droplets',
    color: 'blue',
    jobTypes: 'blocked drains, drain repairs, CCTV surveys & emergency unblocking',
    emergencyTypes: 'blocked drains, flooding & sewage backups',
    problemContext: 'Glasgow\'s older drainage systems and heavy rainfall create constant demand. Every missed emergency call is a lost £300+ job.',
    avgJob: '£290',
  },
];

// City configurations
const cities = {
  glasgow: {
    city: 'Glasgow',
    slug: 'glasgow',
    population: '1.7M',
    businesses: '5,500+',
    households: '310K',
    avgJob: '£290',
    missedCallsWeekly: '2,600',
    marketSize: '£220M',
    lat: '55.8642',
    lng: '-4.2518',
    context: 'Glasgow\'s tenement buildings and harsh winters',
    challenges: 'Tenement buildings have shared systems — emergencies affect multiple flats. Harsh winters cause boiler and heating emergencies to spike. Older housing stock needs frequent updates.',
    color: 'blue',
  },
  edinburgh: {
    city: 'Edinburgh',
    slug: 'edinburgh',
    population: '540K',
    businesses: '4,500+',
    households: '245K',
    avgJob: '£315',
    missedCallsWeekly: '2,200',
    marketSize: '£200M',
    lat: '55.9533',
    lng: '-3.1883',
    context: 'Edinburgh\'s Georgian and Victorian buildings',
    challenges: 'Georgian and Victorian buildings need specialist conservation trades. Festival season brings emergency maintenance demands for venues. Tourist rentals need rapid turnaround between bookings.',
    color: 'indigo',
  },
};

function generatePage(trade, cityKey) {
  const city = cities[cityKey];
  const tradeSlug = trade.slug;
  const citySlug = city.slug;
  const pageSlug = `for-${tradeSlug}-${citySlug}`;
  const url = `https://whoza.ai/${pageSlug}`;
  const parentUrl = `https://whoza.ai/for-${tradeSlug}`;
  
  // Trade-specific icon mapping
  const iconMap = {
    'builders': 'Home',
    'roofers': 'Home', 
    'heating-engineers': 'Flame',
    'locksmiths': 'Key',
    'carpenters': 'Hammer',
    'joiners': 'Hammer',
    'plasterers': 'Paintbrush',
    'tilers': 'Grid3x3',
    'gas-engineers': 'Flame',
    'handymen': 'Wrench',
    'cleaners': 'Sparkles',
    'landscapers': 'TreePine',
    'painters-decorators': 'Paintbrush',
    'pest-control': 'Bug',
    'drainage': 'Droplets',
  };
  
  const iconName = iconMap[tradeSlug] || 'Wrench';
  const colorName = trade.color || 'blue';
  
  // Build imports avoiding duplicates
  const baseIcons = ['ArrowRight', 'Phone', iconName, 'Shield', 'Clock', 'PoundSterling', 'CheckCircle2', 'Star', 'AlertTriangle', 'TrendingUp', 'Users', 'Home'];
  const uniqueIcons = [...new Set(baseIcons)];
  const importsStr = uniqueIcons.join(', ');
  
  return `import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
import { ${importsStr} } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AI Call Answering for ${trade.plural} in ${city.city} | whoza.ai",
  description: "Stop losing ${trade.slug.replace(/-/g, ' ')} jobs to missed calls in ${city.city}. Katie answers 24/7, captures ${trade.emergencyTypes}, and sends WhatsApp alerts in 3 seconds. 7-day free trial.",
  alternates: {
    canonical: "${url}",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "${url}",
    siteName: "Whoza.ai",
    title: "AI Call Answering for ${trade.plural} in ${city.city} | whoza.ai",
    description: "Stop losing ${trade.slug.replace(/-/g, ' ')} jobs to missed calls in ${city.city}. Katie answers 24/7, captures ${trade.emergencyTypes}, and sends WhatsApp alerts in 3 seconds. 7-day free trial.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai — AI Call Answering for ${trade.plural} in ${city.city}" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "AI Call Answering for ${trade.plural} in ${city.city} | whoza.ai",
    description: "Stop losing ${trade.slug.replace(/-/g, ' ')} jobs to missed calls in ${city.city}. Katie answers 24/7, captures ${trade.emergencyTypes}, and sends WhatsApp alerts in 3 seconds. 7-day free trial.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    "question": "How much does AI call answering cost for ${trade.slug.replace(/-/g, ' ')} in ${city.city}?",
    "answer": "whoza.ai starts at £59/month for the Starter plan. That's less than one ${trade.singular.toLowerCase()} job in ${city.city}. Every plan includes unlimited AI calls, WhatsApp delivery, and a 7-day free trial. Most ${trade.plural.toLowerCase()} recover the cost within 48 hours by capturing just one missed job."
  },
  {
    "question": "Can Katie handle emergency calls for ${trade.slug.replace(/-/g, ' ')} in ${city.city}?",
    "answer": "Absolutely. Katie answers 24/7, including nights, weekends, and bank holidays. She identifies emergency calls and marks them as highest priority in your WhatsApp alert. Whether you're in ${city.city} or anywhere in the UK, you'll see the emergency tag immediately and can respond within minutes."
  },
  {
    "question": "What information does Katie collect from ${trade.slug.replace(/-/g, ' ')} customers in ${city.city}?",
    "answer": "Katie captures: full name, phone number, ${city.city} postcode, property type, job description, urgency level, preferred appointment time, and how they found you. For emergencies, she also asks about immediate safety concerns and property damage extent."
  },
  {
    "question": "Does it work with my existing ${city.city} business phone number?",
    "answer": "Yes. You simply set up call forwarding from your existing ${city.city} business number to your whoza.ai number. Your customers dial the same number they've always used — Katie answers when you can't. Setup takes under 10 minutes and works with both mobile and landline numbers."
  },
  {
    "question": "How quickly can I get set up as a ${trade.singular.toLowerCase()} in ${city.city}?",
    "answer": "Most ${trade.plural.toLowerCase()} in ${city.city} are live and capturing calls within 30 minutes. Sign up, connect your number via call forwarding, set your greeting and business details, and Katie starts answering immediately. No hardware, no IT team, no technical knowledge required."
  },
  {
    "question": "What makes whoza.ai different for ${trade.slug.replace(/-/g, ' ')} in ${city.city}?",
    "answer": "Unlike generic call answering services, Katie is trained specifically for ${trade.plural.toLowerCase()}. She understands ${trade.jobTypes} — and with ${city.businesses} trade businesses competing in ${city.city}, capturing every call gives you a real competitive edge."
  }
]

export const revalidate = 3600

export default function For${trade.singular.replace(/[^a-zA-Z0-9]/g, '')}${city.city}Page() {
  return (
    <>
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "For ${trade.plural}", item: "${parentUrl}" },
        { name: "${city.city}", item: "${url}" },
      ]} />
      <FAQPageSchema faqs={faqs} />

      <script
        id="${tradeSlug}-${citySlug}-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "FAQPage",
                "mainEntity": faqs.map(f => ({"@type":"Question","name":f.question,"acceptedAnswer":{"@type":"Answer","text":f.answer}}))
              },
              {
                "@type": "LocalBusiness",
                "name": "whoza.ai - AI Call Answering for ${trade.plural} in ${city.city}",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "${city.city}",
                  "addressCountry": "GB"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "${city.lat}",
                  "longitude": "${city.lng}"
                },
                "priceRange": "££",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "reviewCount": "127"
                }
              },
              {
                "@type": "Service",
                "serviceType": "AI Call Answering for ${trade.plural}",
                "areaServed": {
                  "@type": "City",
                  "name": "${city.city}"
                }
              },
              {
                "@type": "VideoObject",
                "name": "Whoza.ai 60-Second Demo — Katie Answers Every Call",
                "description": "Watch Katie, Whoza's AI call handler, capture a missed enquiry in under 60 seconds. The call is answered instantly, the enquiry lands in WhatsApp, Claire requests a review, and Rex delivers growth insights. Built for UK tradespeople.",
                "thumbnailUrl": "https://whoza.ai/og-image.webp",
                "uploadDate": "2026-06-01",
                "duration": "PT60S",
                "embedUrl": "https://whoza.ai",
                "publisher": {
                  "@type": "Organization",
                  "name": "whoza.ai",
                  "logo": { "@type": "ImageObject", "url": "https://whoza.ai/logo.png" }
                }
              },
              {
                "@type": "Organization",
                "@id": "https://whoza.ai/#organization",
                "name": "whoza.ai",
                "url": "https://whoza.ai",
                "logo": { "@type": "ImageObject", "url": "https://whoza.ai/logo.png" },
                "sameAs": [
                  "https://twitter.com/whozaai",
                  "https://www.linkedin.com/company/whoza-ai"
                ]
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whoza.ai" },
                  { "@type": "ListItem", "position": 2, "name": "For ${trade.plural}", "item": "${parentUrl}" },
                  { "@type": "ListItem", "position": 3, "name": "${city.city}", "item": "${url}" }
                ]
              }
            ]
          })
        }}
      />

      <main id="main-content" role="main" className="pb-24 lg:pb-0 bg-[var(--navy-900)] text-white">
        <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-${colorName}-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-${colorName}-500/10 text-${colorName}-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <${iconName} className="w-4 h-4" />
                  ${trade.plural} in ${city.city}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
                  Never Miss a{" "}
                  <span className="text-${colorName}-400">${trade.singular}</span>{" "}
                  Job in ${city.city} Again
                </h1>
                <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-xl">
                  ${city.city} has ${city.businesses} trade businesses competing for ${city.households} households. 
                  With ${city.missedCallsWeekly} missed calls every week across the city, 
                  Katie ensures you capture every ${trade.slug.replace(/-/g, ' ')} enquiry — ${trade.jobTypes}.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-8 py-4 text-lg rounded-lg transition-all hover:scale-[1.02] shadow-2xl shadow-emerald-500/40"
                  >
                    Start Your Free 7-Day Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 text-lg rounded-lg transition-all border border-white/20"
                  >
                    See Pricing
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-white/50">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    No credit card required
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Setup in 30 minutes
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Cancel anytime
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-${colorName}-500/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-${colorName}-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Incoming Call</p>
                      <p className="text-xs text-white/50">${city.city} — ${trade.singular} Enquiry</p>
                    </div>
                    <span className="ml-auto text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">URGENT</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-sm text-white/70">"Hello, you've reached the business. I'm Katie, your digital assistant. How can I help today?"</p>
                    </div>
                    <div className="bg-${colorName}-500/10 rounded-lg p-3 border-${colorName}-500/20 border">
                      <p className="text-sm text-white/90">"I need a ${trade.singular.toLowerCase()} urgently in ${city.city}!"</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-sm text-white/70">"I understand — let me get your details so I can get help to you quickly. Can you confirm your ${city.city} postcode?"</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      WhatsApp sent in 2.8 seconds
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                ${city.city} ${trade.plural} Market
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                The numbers that matter for ${trade.plural.toLowerCase()} in ${city.city}.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { icon: Users, label: "Trade Businesses", value: "${city.businesses}", color: "text-${colorName}-400" },
                { icon: Home, label: "Households", value: "${city.households}", color: "text-${colorName}-400" },
                { icon: PoundSterling, label: "Avg Job Value", value: "${city.avgJob}", color: "text-emerald-400" },
                { icon: Phone, label: "Missed Calls/Week", value: "${city.missedCallsWeekly}", color: "text-red-400" },
                { icon: TrendingUp, label: "Market Size", value: "${city.marketSize}", color: "text-amber-400" },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                    <Icon className={\`w-8 h-8 \${item.color} mx-auto mb-3\`} />
                    <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                    <div className="text-sm text-white/50">{item.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                The Real Cost of Missed Calls for ${trade.plural} in ${city.city}
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                ${city.challenges}
              </p>
            </div>
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className={\`w-12 h-12 rounded-xl bg-${colorName}-500/10 border-${colorName}-500/20 border flex items-center justify-center flex-shrink-0\`}>
                    <AlertTriangle className={\`w-6 h-6 text-${colorName}-400\`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">While You're on the Job</h3>
                    <p className="text-white/60 leading-relaxed">
                      You're mid-job and your phone rings. Can't answer — hands full, focused on the task. Check missed call at break. Customer already booked someone else.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">After Hours & Emergencies</h3>
                    <p className="text-white/60 leading-relaxed">
                      A customer calls about an urgent issue at 8pm while you're having dinner. They leave a voicemail, then call the next ${trade.singular.toLowerCase()} on Google. You lose a ${city.avgJob}+ job.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center">
              <p className="text-emerald-200 font-medium text-lg">
                The average ${city.city} ${trade.singular.toLowerCase()} misses multiple calls per day = 
                <strong> £45,000+</strong> in lost revenue per year
              </p>
              <p className="text-emerald-200/70 text-sm mt-1">
                Based on ${city.avgJob} avg job value with 35% conversion rate
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                How Katie Works for ${trade.plural} in ${city.city}
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Three simple steps from missed call to booked job. No apps to check. No dashboards to monitor.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: Phone,
                  title: "Katie Answers Instantly",
                  description: \`Customer calls your ${city.city} number. Katie picks up in under 2 rings with your branded greeting — 24/7, even when you're on another job or after hours.\`,
                },
                {
                  step: "02",
                  icon: ${iconName},
                  title: "She Qualifies the Job",
                  description: \`Katie asks the right questions: ${city.city} postcode, problem type, urgency level, property type, and when they need you. She identifies emergencies and marks them as urgent.\`,
                },
                {
                  step: "03",
                  icon: Phone,
                  title: "WhatsApp Alert in 3 Seconds",
                  description: "A structured message lands on your phone: name, number, postcode, problem, urgency, and estimated value. Tap Accept, Call Back, or Decline. Customer gets an instant SMS either way.",
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="relative">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-8 h-full">
                      <div className="text-5xl font-bold text-white/10 mb-4">{item.step}</div>
                      <div className={\`w-12 h-12 rounded-xl bg-${colorName}-500/10 border-${colorName}-500/20 border flex items-center justify-center mb-4\`}>
                        <Icon className={\`w-6 h-6 text-${colorName}-400\`} />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                      <p className="text-white/60 leading-relaxed">{item.description}</p>
                    </div>
                    {idx < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <ArrowRight className="w-8 h-8 text-white/20" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── CITY LINKS ─── */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              AI Call Answering for ${trade.plural} Across the UK
            </h2>
            <p className="text-white/60 mb-6">
              Katie answers calls for ${trade.plural.toLowerCase()} in cities nationwide. Find your location:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/for-${trade.slug}-london" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">London</Link>
              <Link href="/for-${trade.slug}-manchester" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Manchester</Link>
              <Link href="/for-${trade.slug}-birmingham" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Birmingham</Link>
              <Link href="/for-${trade.slug}-leeds" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Leeds</Link>
              <Link href="/for-${trade.slug}-glasgow" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Glasgow</Link>
              <Link href="/for-${trade.slug}-bristol" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Bristol</Link>
              <Link href="/for-${trade.slug}-liverpool" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Liverpool</Link>
              <Link href="/for-${trade.slug}-edinburgh" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">Edinburgh</Link>
            </div>
            <div className="mt-6">
              <Link href="/for-${trade.slug}" className="inline-flex items-center text-${trade.color}-400 hover:text-${trade.color}-300 text-sm font-medium transition-all">
                View all ${trade.plural} →
              </Link>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Questions ${trade.plural} in ${city.city} Ask
              </h2>
              <p className="text-white/60">
                Everything you need to know about AI call answering for ${trade.plural.toLowerCase()} in ${city.city}.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6" itemScope itemType="https://schema.org/Question">
                  <h3 className="text-lg font-semibold mb-3" itemProp="name">{faq.question}</h3>
                  <p className="text-white/60 leading-relaxed" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <span itemProp="text">{faq.answer}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Trusted by ${trade.plural} Across the UK
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Shield, label: "GDPR Compliant", sub: "UK data centres" },
                { icon: Clock, label: "24/7 Coverage", sub: "Including bank holidays" },
                { icon: PoundSterling, label: "£1.2M+ Revenue", sub: "Recovered for trades" },
                { icon: Star, label: "4.9/5 Rating", sub: "From verified users" },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                    <Icon className={\`w-8 h-8 text-${colorName}-400 mx-auto mb-3\`} />
                    <p className="font-semibold text-white">{item.label}</p>
                    <p className="text-sm text-white/50">{item.sub}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-${colorName}-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Stop Losing ${trade.singular} Jobs in ${city.city} Today
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
              Every missed call is a competitor gaining a customer. Katie answers 24/7, captures every enquiry, and delivers it to your WhatsApp in 3 seconds.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[var(--rex-green)] hover:bg-[var(--rex-green-hover)] text-white font-bold px-8 py-4 text-lg rounded-lg transition-all hover:scale-[1.02] shadow-2xl shadow-emerald-500/40"
            >
              Start Your Free 7-Day Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/50">
              {["No credit card required", "Setup in 30 minutes", "Cancel anytime", "24/7 call answering"].map(point => (
                <span key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {point}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
`;
}

// Generate pages
const targetDir = '/root/.openclaw/workspace/whoza-ai-v0/app';
const scottishTrades = trades;

let generated = 0;
let errors = [];

for (const trade of scottishTrades) {
  for (const cityKey of ['glasgow', 'edinburgh']) {
    const city = cities[cityKey];
    const dir = path.join(targetDir, `for-${trade.slug}-${city.slug}`);
    const file = path.join(dir, 'page.tsx');
    
    // Skip if already exists
    if (fs.existsSync(file)) {
      console.log(`SKIP: ${file} already exists`);
      continue;
    }
    
    try {
      const content = generatePage(trade, cityKey);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(file, content);
      generated++;
      console.log(`✅ Generated: ${file}`);
    } catch (err) {
      errors.push(`${file}: ${err.message}`);
      console.error(`❌ Error: ${file}: ${err.message}`);
    }
  }
}

console.log(`\n📊 Summary: ${generated} pages generated, ${errors.length} errors`);
if (errors.length > 0) {
  console.log('\nErrors:');
  errors.forEach(e => console.log(`  - ${e}`));
}
