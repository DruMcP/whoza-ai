import { MetadataRoute } from 'next'

// Verified live /for-{trade}-{city} pages (July 2026)
const LIVE_CITY_PAGES: Record<string, string[]> = {
  "plumbers": ["london","manchester","birmingham","leeds","glasgow","bristol","liverpool","edinburgh"],
  "electricians": ["london","manchester","birmingham","glasgow","edinburgh"],
  "builders": ["london","manchester","birmingham","glasgow","edinburgh"],
  "roofers": ["london","glasgow","edinburgh"],
  "locksmiths": ["london","manchester","glasgow","edinburgh"],
  "landscapers": ["london","glasgow","edinburgh"],
  "heating-engineers": ["london","manchester","glasgow","edinburgh"],
  "pest-control": ["london","glasgow","edinburgh"],
  "cleaners": ["london","glasgow","edinburgh"],
  "drainage": ["glasgow","edinburgh"],
  "joiners": ["glasgow","edinburgh"],
  "plasterers": ["glasgow","edinburgh"],
  "tilers": ["glasgow","edinburgh"],
  "carpenters": ["glasgow","bristol","edinburgh"],
  "handymen": ["london","glasgow","edinburgh"],
  "gas-engineers": ["london","glasgow","edinburgh"],
};

const baseUrl = 'https://whoza.ai'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString().split('T')[0]

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/support`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/case-studies`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/sample-call`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/trust`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/best-ai-call-handler-uk-trades`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/missed-calls-cost-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ai-vs-virtual-receptionist`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]

  // Comparison pages
  const comparisonPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/vs-trade-receptionist`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/whoza-vs-clara`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/whoza-vs-moneypenny`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/whoza-vs-team-connect`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/whoza-vs-arrow`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/whoza-vs-ionos`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]

  // Trade pages (17)
  const tradeSlugs = Object.keys(LIVE_CITY_PAGES)
  const tradePages: MetadataRoute.Sitemap = tradeSlugs.map(slug => ({
    url: `${baseUrl}/for-${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // City combo pages (55 live combinations only)
  const comboPages: MetadataRoute.Sitemap = []
  for (const [tradeSlug, cities] of Object.entries(LIVE_CITY_PAGES)) {
    for (const city of cities) {
      comboPages.push({
        url: `${baseUrl}/for-${tradeSlug}-${city}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  }

  // Resources
  const resourcePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/resources/missed-call-cost-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/resources/trade-business-growth-toolkit`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/resources/google-business-profile-checklist-trades`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  // Tools
  const toolPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/tools/lost-jobs-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/tools/quote-generator`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/tools/emergency-pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/tools/rate-checker`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/tools/voicemail-scripts`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/watch`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  // Research pages
  const researchPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/research`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/research/aeo-ai-search-optimisation-2026`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/research/the-true-cost-of-missed-calls-2026`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/research/caller-experience-revolution-ai-voice-agents-2026`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/research/ai-voice-agents-uk-trades-2026`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/research/voice-agent-technology-state-of-art-2026`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/research/cost-of-missed-calls-uk-trades-2026`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  // Press
  const pressPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/press`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  // Blog posts
  const blogSlugs = [
    'ai-receptionist-vs-human-cost-guide-2026',
    '247-call-answering-uk-trades-guide-2026',
    'ai-call-answering-pricing-guide-uk-2026',
    'best-ai-call-answering-service-uk-2026',
    'best-ai-call-answering-service-uk-trades-2026',
    '24-7-call-answering-emergency-trades',
    '3-am-lockout-calls-were-going-to-voicemail-now-i-catch-every-one-sarah-the-locksmith',
    'ai-call-answering-cost-uk',
    'ai-call-answering-trades-uk-guide',
    'ai-call-answering-uk-tradespeople-definitive-guide-2026',
    'ai-phone-technology-complete-guide',
    'ai-receptionist-vs-human-receptionist-which-is-right-for-your-trade-business',
    'ai-vs-human-receptionist-trades',
    'best-ai-phone-answering-uk-trades-2026',
    'builders-lead-generation-guide',
    'google-business-profile-trades',
    'how-ai-call-handlers-are-changing-the-game-for-uk-trades-2026',
    'how-does-ai-call-answering-work',
    'how-much-do-missed-calls-cost-uk-trades',
    'how-to-get-more-google-reviews-trades',
    'how-to-get-more-plumbing-customers',
    'how-to-grow-trade-business-uk-guide',
    'heating-engineer-emergency-call-handling',
    'i-lost-3-emergency-callouts-a-day-heres-how-i-fixed-it-dave-the-sparky',
    'i-lost-a-8000-roof-job-because-i-was-up-a-ladder-mike-the-roofer',
    'i-lost-4000-in-one-storm-season-then-ai-answered-my-phone-tom-the-roofer',
    'i-missed-5-emergency-calls-a-week-then-i-tried-ai-gary-the-plumber',
    'my-phone-rang-12-times-on-a-building-site-tom-the-builder',
    'i-missed-spring-booking-season-ai-captured-47-calls-in-3-weeks-james-the-landscaper',
    'i-was-missing-2000-extension-enquiries-every-month-then-i-tried-ai-steve-the-builder',
    'i-worked-out-i-was-losing-30000-a-year-to-missed-calls-mark-the-gas-engineer',
    'local-seo-trades-complete-guide',
    'locksmith-24-7-call-answering',
    'missed-call-recovery-trades-guide',
    'missed-calls-missed-money-the-real-cost-for-tradespeople',
    'roofing-lead-generation-guide',
    'why-62-percent-of-trade-business-calls-go-unanswered',
    '5-signs-your-trade-business-is-losing-customers-to-missed-calls',
    '7-questions-every-uk-tradesperson-should-ask-before-hiring-a-call-answering-service',
    '8-reasons-uk-tradespeople-switch-to-ai-call-handling-in-2026',
    'i-lost-12000-in-one-winter-to-missed-boiler-calls-charlie-the-heating-engineer',
    'seasonal-missed-call-report-uk-trades-2026',
    'ultimate-faq-tradespeople',
  ]

  const blogPosts: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Legal pages
  const legalPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookie-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/dpa`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/fair-use`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/sla`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/refund-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/modern-slavery`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/accessibility`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/vat-info`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/complaints`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  return [
    ...corePages,
    ...comparisonPages,
    ...tradePages,
    ...comboPages,
    ...resourcePages,
    ...toolPages,
    ...researchPages,
    ...pressPages,
    ...blogPosts,
    ...legalPages,
  ]
}
