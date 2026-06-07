import { MetadataRoute } from 'next'
import { locations } from '@/lib/locations'
import { trades } from '@/lib/trades'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://whoza.ai'
  const lastMod = '2026-06-07'

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/vs-trade-receptionist`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/whoza-vs-clara`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/whoza-vs-moneypenny`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/whoza-vs-team-connect`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/whoza-vs-arrow`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/whoza-vs-ionos`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/trust`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/best-ai-call-handler-uk-trades`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/missed-calls-cost-calculator`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai-vs-virtual-receptionist`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sample-call`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Resources
    {
      url: `${baseUrl}/resources/missed-call-cost-calculator`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resources/trade-business-growth-toolkit`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resources/google-business-profile-checklist-trades`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    // Tools
    {
      url: `${baseUrl}/tools/lost-jobs-calculator`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tools/quote-generator`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tools/emergency-pricing`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tools/rate-checker`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tools/voicemail-scripts`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/watch`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // Policy pages
    {
      url: `${baseUrl}/privacy`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/dpa`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/fair-use`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/sla`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/modern-slavery`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/accessibility`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/vat-info`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/complaints`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  // Static trade landing pages (for-*)
  const tradePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/for-plumbers`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-electricians`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-gas-engineers`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-builders`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-roofers`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-locksmiths`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-joiners`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-hvac`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-painters-decorators`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
    // Previously missing — now added
    { url: `${baseUrl}/for-carpenters`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-cleaners`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-drainage`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-handymen`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-landscapers`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-pest-control`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-plasterers`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-tilers`, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.85 },
  ]

  // Dynamic trade subdirectory pages (trade/*)
  const tradeSubPages: MetadataRoute.Sitemap = trades.map((trade) => ({
    url: `${baseUrl}/trade/${trade.slug}`,
    lastModified: lastMod,
    changeFrequency: 'weekly',
    priority: 0.75,
  }))

  // Dynamic location pages — UK only
  const locationPages: MetadataRoute.Sitemap = locations
    .filter((loc) => loc.country === 'uk')
    .map((loc) => ({
      url: `${baseUrl}/${loc.slug}`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  // All blog posts (static + dynamic from blog-content.ts)
  const blogSlugs = [
    // Static blog pages (separate page.tsx files)
    '247-call-answering-uk-trades-guide-2026',
    'ai-call-answering-pricing-guide-uk-2026',
    'best-ai-call-answering-service-uk-2026',
    'best-ai-call-answering-service-uk-trades-2026',
    // Dynamic blog posts (from blog-content.ts)
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
    'hvac-emergency-call-handling',
    'i-lost-3-emergency-callouts-a-day-heres-how-i-fixed-it-dave-the-sparky',
    'i-lost-4000-in-one-storm-season-then-ai-answered-my-phone-tom-the-roofer',
    'i-missed-5-emergency-calls-a-week-then-i-tried-ai-gary-the-plumber',
    'i-missed-spring-booking-season-ai-captured-47-calls-in-3-weeks-james-the-landscaper',
    'i-was-missing-2000-extension-enquiries-every-month-then-i-tried-ai-steve-the-builder',
    'i-worked-out-i-was-losing-30000-a-year-to-missed-calls-mark-the-gas-engineer',
    'local-seo-trades-complete-guide',
    'locksmith-24-7-call-answering',
    'missed-call-recovery-trades-guide',
    'missed-calls-missed-money-the-real-cost-for-tradespeople',
    'roofing-lead-generation-guide',
    'why-62-percent-of-trade-business-calls-go-unanswered',
  ]

  const blogPosts: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: lastMod,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...corePages, ...tradePages, ...tradeSubPages, ...locationPages, ...blogPosts]
}
