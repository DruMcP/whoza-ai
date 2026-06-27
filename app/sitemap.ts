import { MetadataRoute } from 'next'
import { locations } from '@/lib/locations'
import { trades } from '@/lib/trades'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://whoza.ai'
  const coreLastMod = '2026-06-20'
  const resourceLastMod = '2026-06-21'
  const toolLastMod = '2026-06-22'
  const tradeLastMod = '2026-06-23'
  const comboLastMod = '2026-06-24'
  const locationLastMod = '2026-06-25'
  const blogLastMod = '2026-06-26'
  const policyLastMod = '2026-06-27'

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: coreLastMod,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: coreLastMod,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: coreLastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/vs-trade-receptionist`,
      lastModified: coreLastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/whoza-vs-clara`,
      lastModified: coreLastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/whoza-vs-moneypenny`,
      lastModified: coreLastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/whoza-vs-team-connect`,
      lastModified: coreLastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/whoza-vs-arrow`,
      lastModified: coreLastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/whoza-vs-ionos`,
      lastModified: coreLastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: coreLastMod,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: coreLastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/trust`,
      lastModified: coreLastMod,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: coreLastMod,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: coreLastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: coreLastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/best-ai-call-handler-uk-trades`,
      lastModified: coreLastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/missed-calls-cost-calculator`,
      lastModified: coreLastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai-vs-virtual-receptionist`,
      lastModified: coreLastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sample-call`,
      lastModified: coreLastMod,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Resources
    {
      url: `${baseUrl}/resources/missed-call-cost-calculator`,
      lastModified: resourceLastMod,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resources/trade-business-growth-toolkit`,
      lastModified: resourceLastMod,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resources/google-business-profile-checklist-trades`,
      lastModified: resourceLastMod,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    // Tools
    {
      url: `${baseUrl}/tools/lost-jobs-calculator`,
      lastModified: toolLastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tools/quote-generator`,
      lastModified: toolLastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tools/emergency-pricing`,
      lastModified: toolLastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tools/rate-checker`,
      lastModified: toolLastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tools/voicemail-scripts`,
      lastModified: toolLastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/watch`,
      lastModified: toolLastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: toolLastMod,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/research/aeo-ai-search-optimisation-2026`,
      lastModified: toolLastMod,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/research/the-true-cost-of-missed-calls-2026`,
      lastModified: toolLastMod,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
  {
      url: `${baseUrl}/research/caller-experience-revolution-ai-voice-agents-2026`,
      lastModified: toolLastMod,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/research/ai-voice-agents-uk-trades-2026`,
      lastModified: toolLastMod,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/research/voice-agent-technology-state-of-art-2026`,
      lastModified: toolLastMod,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    // Policy pages
    {
      url: `${baseUrl}/privacy`,
      lastModified: policyLastMod,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: policyLastMod,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: policyLastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/dpa`,
      lastModified: policyLastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/fair-use`,
      lastModified: policyLastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/sla`,
      lastModified: policyLastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: policyLastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/modern-slavery`,
      lastModified: policyLastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/accessibility`,
      lastModified: policyLastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/vat-info`,
      lastModified: policyLastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/complaints`,
      lastModified: policyLastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  // Static trade landing pages (for-*)
  const tradePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/for-plumbers`, lastModified: policyLastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-electricians`, lastModified: policyLastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-gas-engineers`, lastModified: policyLastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-builders`, lastModified: policyLastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-roofers`, lastModified: policyLastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-locksmiths`, lastModified: policyLastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-joiners`, lastModified: policyLastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-heating-engineers`, lastModified: policyLastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-painters-decorators`, lastModified: policyLastMod, changeFrequency: 'weekly', priority: 0.85 },
    // Previously missing — now added
    { url: `${baseUrl}/for-carpenters`, lastModified: policyLastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-cleaners`, lastModified: policyLastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-drainage`, lastModified: policyLastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-handymen`, lastModified: policyLastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-landscapers`, lastModified: policyLastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-pest-control`, lastModified: policyLastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-plasterers`, lastModified: policyLastMod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/for-tilers`, lastModified: policyLastMod, changeFrequency: 'weekly', priority: 0.85 },
  ]

  // Trade + City combination pages
  const comboPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/for-plumbers-london`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-electricians-london`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-plumbers-manchester`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-electricians-manchester`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-plumbers-birmingham`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-builders-london`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-locksmiths-london`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-heating-engineers-london`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-roofers-london`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-plumbers-glasgow`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-plumbers-bristol`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-electricians-birmingham`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-gas-engineers-london`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-locksmiths-manchester`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-builders-manchester`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-plumbers-leeds`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-plumbers-liverpool`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-electricians-glasgow`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-heating-engineers-manchester`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-builders-birmingham`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-cleaners-london`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-plumbers-edinburgh`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-landscapers-london`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-handymen-london`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-builders-glasgow`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-builders-edinburgh`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-roofers-glasgow`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-roofers-edinburgh`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-heating-engineers-glasgow`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-heating-engineers-edinburgh`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-locksmiths-glasgow`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-locksmiths-edinburgh`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-carpenters-glasgow`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-carpenters-edinburgh`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-joiners-glasgow`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-joiners-edinburgh`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-plasterers-glasgow`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-plasterers-edinburgh`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-tilers-glasgow`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-tilers-edinburgh`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-gas-engineers-glasgow`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-gas-engineers-edinburgh`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-handymen-glasgow`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-handymen-edinburgh`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-cleaners-glasgow`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-cleaners-edinburgh`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-landscapers-glasgow`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-landscapers-edinburgh`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-painters-decorators-glasgow`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-painters-decorators-edinburgh`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-pest-control-glasgow`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-pest-control-edinburgh`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-drainage-glasgow`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/for-drainage-edinburgh`, lastModified: policyLastMod, changeFrequency: 'monthly', priority: 0.7 },
  ]

  // === REMOVED: Dynamic trade subdirectory pages (/trade/*) ===
  // These duplicate the /for-[trade] static pages. 
  // Keeping them live with canonical tags pointing to /for-[trade] 
  // but NOT in sitemap to avoid duplicate content issues.
  // const tradeSubPages: MetadataRoute.Sitemap = trades.map((trade) => ({
  //   url: `${baseUrl}/trade/${trade.slug}`,
  //   lastModified: policyLastMod,
  //   changeFrequency: 'weekly',
  //   priority: 0.75,
  // }))
  const tradeSubPages: MetadataRoute.Sitemap = []

  // Dynamic location pages — UK only
  const locationPages: MetadataRoute.Sitemap = locations
    .filter((loc) => loc.country === 'uk')
    .map((loc) => ({
      url: `${baseUrl}/${loc.slug}`,
      lastModified: policyLastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  // All blog posts (static + dynamic from blog-content.ts)
  const blogSlugs = [
    // Static blog pages (separate page.tsx files)
    'ai-receptionist-vs-human-cost-guide-2026',
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
    // NEW UGC listicles (June 2026)
    '5-signs-your-trade-business-is-losing-customers-to-missed-calls',
    '7-questions-every-uk-tradesperson-should-ask-before-hiring-a-call-answering-service',
    '8-reasons-uk-tradespeople-switch-to-ai-call-handling-in-2026',
    // NEW: Heating engineer UGC (June 2026)
    'i-lost-12000-in-one-winter-to-missed-boiler-calls-charlie-the-heating-engineer',
    // NEW: Seasonal data research (June 2026)
    'seasonal-missed-call-report-uk-trades-2026',
    // NEW: Ultimate FAQ (June 2026)
    'ultimate-faq-tradespeople',
  ]

  const blogPosts: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: policyLastMod,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...corePages, ...tradePages, ...comboPages, ...tradeSubPages, ...locationPages, ...blogPosts]
}
