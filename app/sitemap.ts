import { MetadataRoute } from 'next'
import { locations } from '@/lib/locations'
import { trades } from '@/lib/trades'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://whoza.ai'
  const lastMod = '2026-06-05'

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
    // New Phase 4 linkable assets
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

  // Dynamic trade pages
  const tradePages: MetadataRoute.Sitemap = trades.map((trade) => ({
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

  // Blog posts
  const blogPosts: MetadataRoute.Sitemap = [
    // Trade landing pages
    {
      url: `${baseUrl}/for-plumbers`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/for-electricians`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/for-gas-engineers`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/for-builders`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/for-roofers`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/for-locksmiths`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/for-joiners`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/for-hvac`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/for-painters-decorators`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // New Phase 1-3 blog posts
    {
      url: `${baseUrl}/blog/ai-call-answering-trades-uk-guide`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/ai-call-answering-cost-uk`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/how-to-grow-trade-business-uk-guide`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/why-62-percent-of-trade-business-calls-go-unanswered`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/ai-vs-human-receptionist-trades`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/how-does-ai-call-answering-work`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/missed-call-recovery-trades-guide`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/ai-phone-technology-complete-guide`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/24-7-call-answering-emergency-trades`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/how-to-get-more-plumbing-customers`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/local-seo-trades-complete-guide`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/google-business-profile-trades`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/how-to-get-more-google-reviews-trades`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/roofing-lead-generation-guide`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/builders-lead-generation-guide`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/hvac-emergency-call-handling`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/locksmith-24-7-call-answering`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/i-worked-out-i-was-losing-30000-a-year-to-missed-calls-mark-the-gas-engineer`,
      lastModified: '2026-06-05',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026`,
      lastModified: '2026-05-20',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/i-missed-5-emergency-calls-a-week-then-i-tried-ai-gary-the-plumber`,
      lastModified: '2026-06-02',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/i-lost-3-emergency-callouts-a-day-heres-how-i-fixed-it-dave-the-sparky`,
      lastModified: '2026-05-31',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // New UGC posts — June 2026
    {
      url: `${baseUrl}/blog/i-lost-4000-in-one-storm-season-then-ai-answered-my-phone-tom-the-roofer`,
      lastModified: '2026-06-07',
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/i-was-missing-2000-extension-enquiries-every-month-then-i-tried-ai-steve-the-builder`,
      lastModified: '2026-06-07',
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/3-am-lockout-calls-were-going-to-voicemail-now-i-catch-every-one-sarah-the-locksmith`,
      lastModified: '2026-06-07',
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/i-missed-spring-booking-season-ai-captured-47-calls-in-3-weeks-james-the-landscaper`,
      lastModified: '2026-06-07',
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/best-ai-phone-answering-uk-trades-2026`,
      lastModified: '2026-05-22',
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/how-much-do-missed-calls-cost-uk-trades`,
      lastModified: '2026-05-22',
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/how-ai-call-handlers-are-changing-the-game-for-uk-trades-2026`,
      lastModified: '2026-05-15',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/missed-calls-missed-money-the-real-cost-for-tradespeople`,
      lastModified: '2026-05-12',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/ai-receptionist-vs-human-receptionist-which-is-right-for-your-trade-business`,
      lastModified: '2026-05-10',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  return [...corePages, ...blogPosts, ...tradePages, ...locationPages]
}
