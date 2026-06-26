/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  // Cache-busting deploy — force fresh CDN upload
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  trailingSlash: false,
  allowedDevOrigins: [
    'vm-6ndpnuoz41hduvbfu6ks15wb.vusercontent.net',
    '*.vusercontent.net',
  ],
  async rewrites() {
    return [
      // Static text files must bypass dynamic routing ([location] catch-all)
      {
        source: '/ai.txt',
        destination: '/ai.txt',
      },
      {
        source: '/llms.txt',
        destination: '/llms.txt',
      },
      {
        source: '/llms-full.txt',
        destination: '/llms-full.txt',
      },
      {
        source: '/robots.txt',
        destination: '/robots.txt',
      },
    ]
  },

    async redirects() {
    return [

      // === Research paper slug fix ===
      {
        source: '/research/ai-voice-agents-customer-satisfaction-2026',
        destination: '/research/caller-experience-revolution-ai-voice-agents-2026',
        permanent: true,
      },
      {
        source: '/research/voice-agent-technology-state-of-the-art-2026',
        destination: '/research/voice-agent-technology-state-of-art-2026',
        permanent: true,
      },

      {
        source: '/blog/5-signs-your-trade-business-needs-an-ai-call-handler',
        destination: '/blog/ai-receptionist-vs-human-receptionist-which-is-right-for-your-trade-business',
        permanent: true,
      },

      // === CRITICAL: Redirect missing comparison pages to homepage ===
      {
        source: '/whoza-vs-answer',
        destination: '/',
        permanent: true,
      },
      {
        source: '/whoza-vs-yourbusinessnumber',
        destination: '/',
        permanent: true,
      },

      {
        source: '/for-hvac',
        destination: '/for-heating-engineers',
        permanent: true,
      },

      // === CRITICAL: Redirect dead bare trade URLs to /for-[trade] ===
      {
        source: '/plumber',
        destination: '/for-plumbers',
        permanent: true,
      },

      {
        source: '/electrician',
        destination: '/for-electricians',
        permanent: true,
      },

      {
        source: '/roofer',
        destination: '/for-roofers',
        permanent: true,
      },

      {
        source: '/locksmith',
        destination: '/for-locksmiths',
        permanent: true,
      },

      {
        source: '/drainage',
        destination: '/for-drainage',
        permanent: true,
      },

      {
        source: '/landscaper',
        destination: '/for-landscapers',
        permanent: true,
      },

      {
        source: '/pest-control',
        destination: '/for-pest-control',
        permanent: true,
      },

      {
        source: '/cleaner',
        destination: '/for-cleaners',
        permanent: true,
      },

      {
        source: '/heating-engineer',
        destination: '/for-heating-engineers',
        permanent: true,
      },

      {
        source: '/builder',
        destination: '/for-builders',
        permanent: true,
      },

      // === CRITICAL: Redirect missing UK city pages to homepage ===
      {
        source: '/sheffield',
        destination: '/',
        permanent: true,
      },

      {
        source: '/newcastle',
        destination: '/',
        permanent: true,
      },

      {
        source: '/cardiff',
        destination: '/',
        permanent: true,
      },

      {
        source: '/nottingham',
        destination: '/',
        permanent: true,
      },

      {
        source: '/coventry',
        destination: '/',
        permanent: true,
      },

      {
        source: '/bradford',
        destination: '/',
        permanent: true,
      },

      {
        source: '/belfast',
        destination: '/',
        permanent: true,
      },

      {
        source: '/derby',
        destination: '/',
        permanent: true,
      },

      // === Redirect dead combo pages ===
      {
        source: '/plumber-london',
        destination: '/london',
        permanent: true,
      },
      {
        source: '/electrician-london',
        destination: '/london',
        permanent: true,
      },
      {
        source: '/roofer-london',
        destination: '/london',
        permanent: true,
      },

      // === Trailing slash redirects (CRITICAL: prevents duplicate content) ===
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },

      {
        source: '/blog/hvac-emergency-call-handling',
        destination: '/blog/heating-engineer-emergency-call-handling',
        permanent: true,
      },

      {
        source: '/blog/case-study-how-a-london-electrician-recovered-12k-month-with-ai-call-handling',
        destination: '/blog/i-lost-3-emergency-callouts-a-day-heres-how-i-fixed-it-dave-the-sparky',
        permanent: true,
      },

      {
        source: '/blog/how-katie-answers-captures-and-delivers-enquiries-in-3-seconds',
        destination: '/blog/how-ai-call-handlers-are-changing-the-game-for-uk-trades-2026',
        permanent: true,
      },

      {
        source: '/blog/how-to-never-miss-an-emergency-call-again-plumbers-electricians-roofers',
        destination: '/blog/i-missed-5-emergency-calls-a-week-then-i-tried-ai-gary-the-plumber',
        permanent: true,
      },

      {
        source: '/blog/how-whatsapp-delivery-changes-everything-for-tradespeople',
        destination: '/blog/how-ai-call-handlers-are-changing-the-game-for-uk-trades-2026',
        permanent: true,
      },

      {
        source: '/blog/how-whoza-ai-works-with-your-existing-phone-number',
        destination: '/blog/how-ai-call-handlers-are-changing-the-game-for-uk-trades-2026',
        permanent: true,
      },

      {
        source: '/blog/how-ai-call-handling-works-with-your-existing-phone-number',
        destination: '/blog/how-ai-call-handlers-are-changing-the-game-for-uk-trades-2026',
        permanent: true,
      },

      {
        source: '/blog/moneypenny-vs-whoza-ai-which-receptionist-service-is-right-for-trades',
        destination: '/blog/ai-receptionist-vs-human-receptionist-which-is-right-for-your-trade-business',
        permanent: true,
      },

      {
        source: '/blog/roi-calculator-how-much-could-an-ai-call-handler-save-your-trade-business',
        destination: '/blog/how-much-do-missed-calls-cost-uk-trades',
        permanent: true,
      },

      {
        source: '/blog/missed-calls-missed-money',
        destination: '/blog/missed-calls-cost-uk-trades',
        permanent: true,
      },
      {
        source: '/blog/the-7-day-free-trial-what-to-expect-when-you-try-katie',
        destination: '/blog/missed-calls-missed-money-the-real-cost-for-tradespeople',
        permanent: true,
      },

      {
        source: '/blog/the-truth-about-ai-voice-agents-what-google-reviews-say',
        destination: '/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026',
        permanent: true,
      },

      {
        source: '/blog/why-tradespeople-need-a-revenue-team-not-just-a-virtual-receptionist',
        destination: '/blog/ai-receptionist-vs-human-receptionist-which-is-right-for-your-trade-business',
        permanent: true,
      },

      // === GSC 404 FIX: Redirect dead AI-visibility blog posts (2026-06-14) ===
      // Local SEO / getting found cluster
      {
        source: '/blog/what-is-ai-visibility-and-why-does-it-matter-for-your-trade-business',
        destination: '/blog/local-seo-trades-complete-guide',
        permanent: true,
      },
      {
        source: '/blog/what-is-ai-visibility-uk-tradespeople-2026',
        destination: '/blog/local-seo-trades-complete-guide',
        permanent: true,
      },
      {
        source: '/blog/how-uk-tradespeople-get-found-ai-search-2026',
        destination: '/blog/local-seo-trades-complete-guide',
        permanent: true,
      },
      {
        source: '/blog/why-bing-matters-for-ai-search-2026',
        destination: '/blog/local-seo-trades-complete-guide',
        permanent: true,
      },
      {
        source: '/blog/why-bing-matters-for-ai-search-the-perplexity-connection',
        destination: '/blog/local-seo-trades-complete-guide',
        permanent: true,
      },
      {
        source: '/blog/best-practices-tradespeople-london-local-ai-visibility-guide',
        destination: '/blog/local-seo-trades-complete-guide',
        permanent: true,
      },
      {
        source: '/blog/ai-search-optimization-beginners-guide-get-found-chatgpt-perplexity-2026',
        destination: '/blog/local-seo-trades-complete-guide',
        permanent: true,
      },
      {
        source: '/blog/the-ultimate-guide-to-ai-search-optimization-for-tradespeople',
        destination: '/blog/local-seo-trades-complete-guide',
        permanent: true,
      },
      {
        source: '/blog/top-10-ai-visibility-strategies-uk-tradespeople-2026',
        destination: '/blog/local-seo-trades-complete-guide',
        permanent: true,
      },
      {
        source: '/blog/manchester-vs-birmingham-local-seo-strategies-2026',
        destination: '/blog/local-seo-trades-complete-guide',
        permanent: true,
      },
      {
        source: '/blog/how-ai-search-engines-choose-which-local-businesses-to-recommend',
        destination: '/blog/local-seo-trades-complete-guide',
        permanent: true,
      },
      {
        source: '/blog/how-ai-search-engines-rank-local-tradespeople-aeo-geo-guide-2026',
        destination: '/blog/local-seo-trades-complete-guide',
        permanent: true,
      },
      // Business growth / playbook cluster
      {
        source: '/blog/the-uk-trades-business-playbook-for-ai-search-visibility-in-2026',
        destination: '/blog/how-to-grow-trade-business-uk-guide',
        permanent: true,
      },
      {
        source: '/blog/uk-trades-business-playbook-ai-search-visibility-2026',
        destination: '/blog/how-to-grow-trade-business-uk-guide',
        permanent: true,
      },
      // Reviews cluster
      {
        source: '/blog/how-reviews-influence-ai-search-recommendations-tradespeople-2026',
        destination: '/blog/how-to-get-more-google-reviews-trades',
        permanent: true,
      },
      // FAQ cluster
      {
        source: '/blog/how-to-create-faq-page-ai-can-find-2026',
        destination: '/blog/ultimate-faq-tradespeople',
        permanent: true,
      },
      {
        source: '/blog/how-to-create-an-faq-page-that-ai-can-find-and-reference',
        destination: '/blog/ultimate-faq-tradespeople',
        permanent: true,
      },
      // GSC 404 FIX: Missing blog redirects (2026-06-16)
      {
        source: '/blog/how-ai-search-engines-choose-plumber-recommendation-manchester',
        destination: '/blog/how-to-get-more-plumbing-customers',
        permanent: true,
      },
      {
        source: '/blog/electricians-guide-to-google-ai-overviews-how-to-get-featured',
        destination: '/blog/i-lost-3-emergency-callouts-a-day-heres-how-i-fixed-it-dave-the-sparky',
        permanent: true,
      },
      {
        source: '/blog/how-uk-tradespeople-can-get-recommended-by-chatgpt-in-2026',
        destination: '/blog/local-seo-trades-complete-guide',
        permanent: true,
      },
      // Trade-specific clusters
      {
        source: '/blog/roofers-checklist-10-steps-to-ai-visibility-2026',
        destination: '/blog/roofing-lead-generation-guide',
        permanent: true,
      },
      {
        source: '/blog/electricians-guide-to-google-ai-overviews-2026',
        destination: '/blog/i-lost-3-emergency-callouts-a-day-heres-how-i-fixed-it-dave-the-sparky',
        permanent: true,
      },
      {
        source: '/blog/how-plumbers-can-get-found-in-chatgpt-a-step-by-step-guide',
        destination: '/blog/how-to-get-more-plumbing-customers',
        permanent: true,
      },
      {
        source: '/blog/how-plumbers-can-get-found-in-chatgpt-2026',
        destination: '/blog/how-to-get-more-plumbing-customers',
        permanent: true,
      },
      // === GSC 404 FIX: Dead internal link pages ===
      {
        source: '/ai-call-answering-plumbers',
        destination: '/for-plumbers',
        permanent: true,
      },
      {
        source: '/ai-call-answering-electricians',
        destination: '/for-electricians',
        permanent: true,
      },
      {
        source: '/ai-call-answering-builders',
        destination: '/for-builders',
        permanent: true,
      },
      {
        source: '/ai-call-answering-roofers',
        destination: '/for-roofers',
        permanent: true,
      },
      {
        source: '/ai-call-answering-locksmiths',
        destination: '/for-locksmiths',
        permanent: true,
      },
      {
        source: '/ai-call-answering-heating-engineers',
        destination: '/for-heating-engineers',
        permanent: true,
      },
      {
        source: '/ai-call-answering-landscapers',
        destination: '/for-landscapers',
        permanent: true,
      },
      {
        source: '/ai-call-answering-pest-control',
        destination: '/for-pest-control',
        permanent: true,
      },
      {
        source: '/ai-call-answering-cleaners',
        destination: '/for-cleaners',
        permanent: true,
      },
      {
        source: '/sign-in',
        destination: '/',
        permanent: true,
      },
      // === Missing short URL redirects ===
      {
        source: '/blog/roofers-checklist',
        destination: '/blog/roofing-lead-generation-guide',
        permanent: true,
      },
      {
        source: '/blog/electricians-guide',
        destination: '/blog/i-lost-3-emergency-callouts-a-day-heres-how-i-fixed-it-dave-the-sparky',
        permanent: true,
      },
      // Trade page aliases — redirect /trade/* to /for-* for missing entries
      {
        source: '/trade/landscapers',
        destination: '/for-landscapers',
        permanent: true,
      },
      {
        source: '/trade/pest-control',
        destination: '/for-pest-control',
        permanent: true,
      },
      {
        source: '/trade/cleaners',
        destination: '/for-cleaners',
        permanent: true,
      },
    ]
  },
  // === TTFB OPTIMIZATION: Aggressive Edge Caching ===
  async headers() {
    return [
      // Cache static assets aggressively at CDN edge
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Cache static images at edge — 30 days
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, immutable' },
        ],
      },
      // Cache OG image — 30 days
      {
        source: '/og-image.webp',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, immutable' },
        ],
      },
      // Cache favicon — 30 days
      {
        source: '/favicon.ico',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, immutable' },
        ],
      },
      // Cache other static assets — 30 days
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|gif|ico|woff|woff2|ttf|eot|otf|js|css)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
        ],
      },
      // HTML pages: stale-while-revalidate for ISR
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ]
  },
}

export default nextConfig
