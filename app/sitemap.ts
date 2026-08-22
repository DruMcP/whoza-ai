import { MetadataRoute } from 'next'
import { execSync } from 'child_process'
import { blogPostContents } from '@/lib/blog-content'
import { existsSync, readdirSync } from 'fs'

// Verified live /for-{trade}-{city} pages (August 2026)
// Removed low-value combos flagged as duplicate by GSC.
// Keeping: plumbers, electricians, builders, roofers, heating-engineers, gas-engineers
const LIVE_CITY_PAGES: Record<string, string[]> = {
  "plumbers": ["london","manchester","birmingham","glasgow","edinburgh"],
  "electricians": ["london","manchester","birmingham","glasgow","edinburgh"],
  "builders": ["london","manchester","birmingham","glasgow","edinburgh"],
  "roofers": ["london","glasgow","edinburgh"],
  "heating-engineers": ["london","manchester","glasgow","edinburgh"],
  "gas-engineers": ["london","glasgow","edinburgh"],
};

// All live trade hub pages (17 total)
const ALL_TRADE_HUBS = [
  "plumbers", "electricians", "builders", "roofers",
  "heating-engineers", "gas-engineers",
  // Additional hubs not in city combos but still live and indexable
  "locksmiths", "carpenters", "painters-decorators", "landscapers",
  "pest-control", "cleaners", "drainage", "joiners", "plasterers",
  "tilers", "handymen",
];

const baseUrl = 'https://whoza.ai'

function gitLastMod(filePath: string): string | undefined {
  try {
    const date = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      encoding: 'utf8',
      cwd: process.cwd(),
    }).trim()
    if (date) {
      return new Date(date).toISOString().split('T')[0]
    }
  } catch {
    // git cannot determine date — omit lastmod rather than fabricate
  }
  return undefined
}

function pageUrl(path: string, filePath: string, opts: Omit<MetadataRoute.Sitemap[0], 'url' | 'lastModified'>): MetadataRoute.Sitemap[0] {
  const lastMod = gitLastMod(filePath)
  const entry: MetadataRoute.Sitemap[0] = {
    url: `${baseUrl}${path}`,
    ...opts,
  }
  if (lastMod) {
    entry.lastModified = lastMod
  }
  return entry
}

/**
 * Discover live blog slugs from two sources:
 * 1. Static page.tsx files in app/blog/<slug>/ ( pillar / special posts )
 * 2. Keys in blogPostContents (dynamic [slug] posts)
 * This ensures the sitemap can never drift from the actual live pages.
 */
function discoverBlogSlugs(): string[] {
  const slugs = new Set<string>()

  // 1. Static blog post directories (each has its own page.tsx)
  try {
    const entries = readdirSync('app/blog', { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== '[slug]') {
        const pagePath = `app/blog/${entry.name}/page.tsx`
        if (existsSync(pagePath)) {
          slugs.add(entry.name)
        }
      }
    }
  } catch {
    // ignore
  }

  // 2. Dynamic blog posts from blogPostContents
  for (const slug of Object.keys(blogPostContents)) {
    slugs.add(slug)
  }

  return Array.from(slugs).sort()
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    pageUrl('/', 'app/page.tsx', { changeFrequency: 'daily', priority: 1.0 }),
    pageUrl('/signup', 'app/signup/page.tsx', { changeFrequency: 'monthly', priority: 0.9 }),
    pageUrl('/pricing', 'app/pricing/page.tsx', { changeFrequency: 'weekly', priority: 0.9 }),
    pageUrl('/how-it-works', 'app/how-it-works/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    // /blog entry built separately after newestPostDate is computed
    pageUrl('/faq', 'app/faq/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/support', 'app/support/page.tsx', { changeFrequency: 'monthly', priority: 0.5 }),
    pageUrl('/contact', 'app/contact/page.tsx', { changeFrequency: 'monthly', priority: 0.5 }),
    pageUrl('/about', 'app/about/page.tsx', { changeFrequency: 'monthly', priority: 0.5 }),
    pageUrl('/refer', 'app/refer/page.tsx', { changeFrequency: 'monthly', priority: 0.5 }),
    pageUrl('/case-studies', 'app/case-studies/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    pageUrl('/locations', 'app/locations/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    pageUrl('/sample-call', 'app/sample-call/page.tsx', { changeFrequency: 'weekly', priority: 0.7 }),
    pageUrl('/trust', 'app/trust/page.tsx', { changeFrequency: 'yearly', priority: 0.3 }),
    pageUrl('/best-ai-call-handler-uk-trades', 'app/best-ai-call-handler-uk-trades/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/data', 'app/data/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/ai-vs-virtual-receptionist', 'app/ai-vs-virtual-receptionist/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
  ]

  // Comparison pages
  const comparisonPages: MetadataRoute.Sitemap = [
    pageUrl('/vs-trade-receptionist', 'app/vs-trade-receptionist/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/whoza-vs-clara', 'app/whoza-vs-clara/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/whoza-vs-moneypenny', 'app/whoza-vs-moneypenny/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/whoza-vs-team-connect', 'app/whoza-vs-team-connect/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
    pageUrl('/whoza-vs-arrow', 'app/whoza-vs-arrow/page.tsx', { changeFrequency: 'monthly', priority: 0.8 }),
  ]

  // Trade pages (17 total — all live trade hubs)
  const tradePages: MetadataRoute.Sitemap = ALL_TRADE_HUBS.map(slug =>
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
    pageUrl('/missed-calls-cost-calculator', 'app/missed-calls-cost-calculator/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    pageUrl('/resources/trade-business-growth-toolkit', 'app/resources/trade-business-growth-toolkit/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
    pageUrl('/resources/google-business-profile-checklist-trades', 'app/resources/google-business-profile-checklist-trades/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
  ]

  // Tools
  const toolPages: MetadataRoute.Sitemap = [
    pageUrl('/tools/quote-generator', 'app/tools/quote-generator/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
    pageUrl('/tools/emergency-pricing', 'app/tools/emergency-pricing/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
    pageUrl('/tools/rate-checker', 'app/tools/rate-checker/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
    pageUrl('/tools/voicemail-scripts', 'app/tools/voicemail-scripts/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
    pageUrl('/watch', 'app/watch/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
  ]

  // Orphaned pages — discovered pages with content but missing from sitemap
  // NOTE: /missed-calls-cost-calculator is already in resourcePages (priority 0.7)
  const orphanedPages: MetadataRoute.Sitemap = [
    pageUrl('/accents', 'app/accents/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
    pageUrl('/booking', 'app/booking/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    pageUrl('/how-many-calls-at-once', 'app/how-many-calls-at-once/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
    pageUrl('/integrations', 'app/integrations/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
    pageUrl('/is-it-a-phone-tree', 'app/is-it-a-phone-tree/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
    pageUrl('/multi-location', 'app/multi-location/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
    pageUrl('/will-my-customers-mind', 'app/will-my-customers-mind/page.tsx', { changeFrequency: 'monthly', priority: 0.6 }),
  ]

  // Research pages
  const researchPages: MetadataRoute.Sitemap = [
    pageUrl('/research', 'app/research/page.tsx', { changeFrequency: 'weekly', priority: 0.7 }),
    pageUrl('/research/missed-call-index-q3-2026', 'app/research/missed-call-index-q3-2026/page.tsx', { changeFrequency: 'weekly', priority: 0.8 }),
    pageUrl('/research/emergency-triage-safety-ai-voice-agents-2026', 'app/research/emergency-triage-safety-ai-voice-agents-2026/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    pageUrl('/research/aeo-ai-search-optimisation-2026', 'app/research/aeo-ai-search-optimisation-2026/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    pageUrl('/research/the-true-cost-of-missed-calls-2026', 'app/research/the-true-cost-of-missed-calls-2026/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    pageUrl('/research/caller-experience-revolution-ai-voice-agents-2026', 'app/research/caller-experience-revolution-ai-voice-agents-2026/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    pageUrl('/research/ai-voice-agents-uk-trades-2026', 'app/research/ai-voice-agents-uk-trades-2026/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
    pageUrl('/research/voice-agent-technology-state-of-art-2026', 'app/research/voice-agent-technology-state-of-art-2026/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
  ]

  // Press
  const pressPages: MetadataRoute.Sitemap = [
    pageUrl('/press', 'app/press/page.tsx', { changeFrequency: 'monthly', priority: 0.7 }),
  ]

  // Blog posts — dynamically discovered from content + static files
  const blogSlugs = discoverBlogSlugs()

  // Find newest blog post date for /blog listing page lastmod
  const newestPostDate = blogSlugs
    .map((slug) => {
      const post = blogPostContents[slug]
      const staticPagePath = `app/blog/${slug}/page.tsx`
      return post?.date || (existsSync(staticPagePath) ? gitLastMod(staticPagePath) : undefined)
    })
    .filter((d): d is string => !!d)
    .sort((a, b) => b.localeCompare(a))[0]

  const blogPosts: MetadataRoute.Sitemap = blogSlugs.map((slug) => {
    const post = blogPostContents[slug]
    const staticPagePath = `app/blog/${slug}/page.tsx`
    const lastModified = post?.date || (existsSync(staticPagePath) ? gitLastMod(staticPagePath) : undefined)
    const entry: MetadataRoute.Sitemap[0] = {
      url: `${baseUrl}/blog/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.7,
    }
    if (lastModified) {
      entry.lastModified = lastModified
    }
    return entry
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

  // /blog listing page — lastmod = newest child post (not git date of listing page)
  const blogIndexEntry: MetadataRoute.Sitemap[0] = {
    url: `${baseUrl}/blog`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }
  if (newestPostDate) {
    blogIndexEntry.lastModified = newestPostDate
  }

  return [
    ...corePages,
    blogIndexEntry,
    ...comparisonPages,
    ...tradePages,
    ...comboPages,
    ...locationPages,
    ...resourcePages,
    ...toolPages,
    ...orphanedPages,
    ...researchPages,
    ...pressPages,
    ...blogPosts,
    ...legalPages,
  ]
}
