/** @type {import('next').NextConfig} */
const nextConfig = {
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
  async redirects() {
    return [
      {
        source: '/blog/5-signs-your-trade-business-needs-an-ai-call-handler',
        destination: '/blog/ai-receptionist-vs-human-receptionist-which-is-right-for-your-trade-business',
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
    ]
  },
}

export default nextConfig
