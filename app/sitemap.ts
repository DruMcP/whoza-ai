import { MetadataRoute } from 'next'
import { execSync } from 'child_process'
import { blogPostContents } from '@/lib/blog-content'

// Verified live /for-{trade}-{city} pages (July 2026)
const LIVE_CITY_PAGES: Record<string, string[]> = {
  "plumbers": ["london","manchester","birmingham","leeds","glasgow","bristol","liverpool","edinburgh"],
  "painters-decorators": ["glasgow","edinburgh"],
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

function gitLastMod(filePath: string): string {
  try {
    const date = execSync(`git log -1 --format=%cs -- "${filePath}"`, {
      encoding: 'utf8',
      cwd: process.cwd(),
    }).trim()
    return date || fallbackDate()
  } catch {
    return fallbackDate()
  }
}

function fallbackDate(): string {
  return gitLastMod('app/sitemap.ts')
}

function pageUrl(path: string, filePath: string, opts: Omit<MetadataRoute.Sitemap[0], 'url' | 'lastModified'>): MetadataRoute.Sitemap[0] {
  return {
    url: `${baseUrl}${path}`,
    lastModified: gitLastMod(filePath),
    ...opts,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    pageUrl('/', 'app/page.tsx', { changeFrequency: 'daily', priority: 1.0 }),
    pageUrl('/signup', 'app/signup/page.tsx', { changeFrequency: 'monthly', priority: 0.9 }),
    pageUrl('/pricing', 'app/pricing/page.tsx', { changeFrequency: 'weekly', priority: 0.9 }),
    pageUrl('/how-it-works', 'app/how-it-works/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    pageUrl('/blog', 'app/blog/page.tsx', { changeFrequency: 'weekly', priority: 0.8 }),
    pageUrl('/faq', 'app/faq/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/support', 'app/support/page.tsx', { changeFrequency: 'monthly', priority: 0.5 }),
    pageUrl('/contact', 'app/contact/page.tsx', { changeFrequency: 'monthly', priority: 0.5 }),
    pageUrl('/about', 'app/about/page.tsx', { changeFrequency: 'monthly', priority: 0.5 }),
    pageUrl('/refer', 'app/refer/page.tsx', { changeFrequency: 'monthly', priority: 0.5 }),
    pageUrl('/case-studies', 'app/case-studies/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    pageUrl('/sample-call', 'app/sample-call/page.tsx', { changeFrequency: 'weekly', priority: 0.7 }),
    pageUrl('/trust', 'app/trust/page.tsx', { changeFrequency: 'yearly', priority: 0.3 }),
    pageUrl('/best-ai-call-handler-uk-trades', 'app/best-ai-call-handler-uk-trades/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/ai-vs-virtual-receptionist', 'app/ai-vs-virtual-receptionist/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
  ]

  // Comparison pages
  const comparisonPages: MetadataRoute.Sitemap = [
    pageUrl('/vs-trade-receptionist', 'app/vs-trade-receptionist/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/whoza-vs-clara', 'app/whoza-vs-clara/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/whoza-vs-moneypenny', 'app/whoza-vs-moneypenny/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/whoza-vs-team-connect', 'app/whoza-vs-team-connect/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/whoza-vs-arrow', 'app/whoza-vs-arrow/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/whoza-vs-ionos', 'app/whoza-vs-ionos/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
  ]

  // Trade pages (17)
  const tradeSlugs = Object.keys(LIVE_CITY_PAGES)
  const tradePages: MetadataRoute.Sitemap = tradeSlugs.map(slug =>
    pageUrl(`/for-${slug}`, `app/for-${slug}/page.tsx`, { changeFrequency: 'weekly', priority: 0.9 })
  )

  // City combo pages (55 live combinations only)
  const comboPages: MetadataRoute.Sitemap = []
  for (const [tradeSlug, cities] of Object.entries(LIVE_CITY_PAGES)) {
    for (const city of cities) {
      comboPages.push(
        pageUrl(`/for-${tradeSlug}-${city}`, `app/for-${tradeSlug}-${city}/page.tsx`, { changeFrequency: 'monthly', priority: 0.8 })
      )
    }
  }

  // Location pages (all served by app/[location]/page.tsx)
  const locationRouteFile = 'app/[location]/page.tsx'
  const locationPages: MetadataRoute.Sitemap = [
    pageUrl('/london', locationRouteFile, { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/manchester', locationRouteFile, { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/birmingham', locationRouteFile, { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/glasgow', locationRouteFile, { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/edinburgh', locationRouteFile, { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/bristol', locationRouteFile, { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/leeds', locationRouteFile, { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/liverpool', locationRouteFile, { changeFrequency: 'monthly', priority: 0.8 }),
  ]

  // Resources
  const resourcePages: MetadataRoute.Sitemap = [
    pageUrl('/resources/missed-call-cost-calculator', 'app/resources/missed-call-cost-calculator/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
    pageUrl('/resources/trade-business-growth-toolkit', 'app/resources/trade-business-growth-toolkit/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
    pageUrl('/resources/google-business-profile-checklist-trades', 'app/resources/google-business-profile-checklist-trades/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
  ]

  // Tools
  const toolPages: MetadataRoute.Sitemap = [
    pageUrl('/tools/lost-jobs-calculator', 'app/tools/lost-jobs-calculator/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
    pageUrl('/tools/quote-generator', 'app/tools/quote-generator/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
    pageUrl('/tools/emergency-pricing', 'app/tools/emergency-pricing/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
    pageUrl('/tools/rate-checker', 'app/tools/rate-checker/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
    pageUrl('/tools/voicemail-scripts', 'app/tools/voicemail-scripts/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
    pageUrl('/watch', 'app/watch/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
  ]

  // Research pages
  const researchPages: MetadataRoute.Sitemap = [
    pageUrl('/research', 'app/research/page.tsx', { changeFrequency: 'weekly', priority: 0.7 }),
    pageUrl('/research/emergency-triage-safety-ai-voice-agents-2026', 'app/research/emergency-triage-safety-ai-voice-agents-2026/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    pageUrl('/research/aeo-ai-search-optimisation-2026', 'app/research/aeo-ai-search-optimisation-2026/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    pageUrl('/research/the-true-cost-of-missed-calls-2026', 'app/research/the-true-cost-of-missed-calls-2026/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    pageUrl('/research/caller-experience-revolution-ai-voice-agents-2026', 'app/research/caller-experience-revolution-ai-voice-agents-2026/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    pageUrl('/research/ai-voice-agents-uk-trades-2026', 'app/research/ai-voice-agents-uk-trades-2026/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    pageUrl('/research/voice-agent-technology-state-of-art-2026', 'app/research/voice-agent-technology-state-of-art-2026/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    pageUrl('/research/cost-of-missed-calls-uk-trades-2026', 'app/research/cost-of-missed-calls-uk-trades-2026/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
  ]

  // Press
  const pressPages: MetadataRoute.Sitemap = [
    pageUrl('/press', 'app/press/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
  ]

  // Blog posts
  const blogSlugs = [
    'what-tradespeople-actually-want-from-ai',
    'ai-search-for-uk-trades',
    'ai-receptionist-vs-human-cost-guide-2026',
    'ai-call-answering-pricing-guide-uk-2026',
    '24-7-call-answering-emergency-trades',
    '3-am-lockout-calls-were-going-to-voicemail-now-i-catch-every-one-sarah-the-locksmith',
    'ai-call-answering-cost-uk',
    'ai-call-answering-uk-tradespeople-definitive-guide-2026',
    'ai-phone-technology-complete-guide',
    'builders-lead-generation-guide',
    'google-business-profile-trades',
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
    'roofing-lead-generation-guide',
    '5-signs-your-trade-business-is-losing-customers-to-missed-calls',
    '7-questions-every-uk-tradesperson-should-ask-before-hiring-a-call-answering-service',
    '8-reasons-uk-tradespeople-switch-to-ai-call-handling-in-2026',
    'i-lost-12000-in-one-winter-to-missed-boiler-calls-charlie-the-heating-engineer',
    'seasonal-missed-call-report-uk-trades-2026',
    'ultimate-faq-tradespeople',
  ]

  const blogPosts: MetadataRoute.Sitemap = blogSlugs.map((slug) => {
    const post = blogPostContents[slug]
    const lastModified = post?.date || gitLastMod(`app/blog/${slug}/page.tsx`)
    return {
      url: `${baseUrl}/blog/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    }
  })

  // Legal pages
  const legalPages: MetadataRoute.Sitemap = [
    pageUrl('/privacy', 'app/privacy/page.tsx', { changeFrequency: 'yearly', priority: 0.3 }),
    pageUrl('/terms', 'app/terms/page.tsx', { changeFrequency: 'yearly', priority: 0.3 }),
    pageUrl('/cookie-policy', 'app/cookie-policy/page.tsx', { changeFrequency: 'yearly', priority: 0.3 }),
    pageUrl('/dpa', 'app/dpa/page.tsx', { changeFrequency: 'yearly', priority: 0.3 }),
    pageUrl('/fair-use', 'app/fair-use/page.tsx', { changeFrequency: 'yearly', priority: 0.3 }),
    pageUrl('/sla', 'app/sla/page.tsx', { changeFrequency: 'yearly', priority: 0.3 }),
    pageUrl('/refund-policy', 'app/refund-policy/page.tsx', { changeFrequency: 'yearly', priority: 0.3 }),
    pageUrl('/modern-slavery', 'app/modern-slavery/page.tsx', { changeFrequency: 'yearly', priority: 0.3 }),
    pageUrl('/accessibility', 'app/accessibility/page.tsx', { changeFrequency: 'yearly', priority: 0.3 }),
    pageUrl('/vat-info', 'app/vat-info/page.tsx', { changeFrequency: 'yearly', priority: 0.3 }),
    pageUrl('/complaints', 'app/complaints/page.tsx', { changeFrequency: 'yearly', priority: 0.3 }),
  ]

  return [
    ...corePages,
    ...comparisonPages,
    ...tradePages,
    ...comboPages,
    ...locationPages,
    ...resourcePages,
    ...toolPages,
    ...researchPages,
    ...pressPages,
    ...blogPosts,
    ...legalPages,
  ]
}
