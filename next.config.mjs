/** @type {import('next').NextConfig} */
const nextConfig = {
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
      // === Signup convenience redirects ===
      { source: '/waitlist', destination: '/signup', permanent: true },
      { source: '/sign-up', destination: '/signup', permanent: true },
      { source: '/get-started', destination: '/signup', permanent: true },
      { source: '/start', destination: '/signup', permanent: true },
      { source: '/join', destination: '/signup', permanent: true },

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
        source: '/for-bathroom-fitters',
        destination: '/',
        permanent: true,
      },
      {
        source: '/for-scaffolders',
        destination: '/',
        permanent: true,
      },
      {
        source: '/trade/painter',
        destination: '/for-painters-decorators',
        permanent: true,
      },
      {
        source: '/case-studies/2',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/resources/local-seo-checklist-trades',
        destination: '/resources',
        permanent: true,
      },

      // === CRITICAL: Redirect missing comparison pages ===
      {
        source: '/whoza-vs-virtual-receptionist',
        destination: '/ai-vs-virtual-receptionist',
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
      { source: '/trade/plumber', destination: '/for-plumbers', permanent: true },
      { source: '/trade/electrician', destination: '/for-electricians', permanent: true },
      { source: '/trade/gas-engineer', destination: '/for-gas-engineers', permanent: true },
      { source: '/trade/builder', destination: '/for-builders', permanent: true },
      { source: '/trade/roofer', destination: '/for-roofers', permanent: true },
      { source: '/trade/locksmith', destination: '/for-locksmiths', permanent: true },
      { source: '/trade/heating-engineer', destination: '/for-heating-engineers', permanent: true },
      { source: '/trade/drainage', destination: '/for-drainage', permanent: true },
      { source: '/trade/carpenter', destination: '/for-carpenters', permanent: true },
      { source: '/trade/joiner', destination: '/for-joiners', permanent: true },
      { source: '/trade/plasterer', destination: '/for-plasterers', permanent: true },
      { source: '/trade/tiler', destination: '/for-tilers', permanent: true },
      { source: '/trade/handyman', destination: '/for-handymen', permanent: true },
      { source: '/trade/landscaper', destination: '/for-landscapers', permanent: true },
      { source: '/trade/landscapers', destination: '/for-landscapers', permanent: true },
      { source: '/trade/pest-control', destination: '/for-pest-control', permanent: true },
      { source: '/trade/cleaners', destination: '/for-cleaners', permanent: true },
    ]
  },
  // === TTFB OPTIMIZATION: Aggressive Edge Caching ===
  async headers() {
    return [
      // LLMS.TXT response headers per llmstxt.org spec
      {
        source: '/llms.txt',
        headers: [
          { key: 'Link', value: '</llms.txt>; rel="llms-txt"' },
          { key: 'X-Llms-Txt', value: '/llms.txt' },
        ],
      },
      {
        source: '/llms-full.txt',
        headers: [
          { key: 'Link', value: '</llms.txt>; rel="llms-txt"' },
          { key: 'X-Llms-Txt', value: '/llms.txt' },
        ],
      },
      {
        source: '/.well-known/llms.txt',
        headers: [
          { key: 'Link', value: '</llms.txt>; rel="llms-txt"' },
          { key: 'X-Llms-Txt', value: '/llms.txt' },
        ],
      },
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
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
    ]
  },
}

export default nextConfig
