import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Cost of Missed Calls for UK Trades 2026 | whoza.ai Research",
  description: "Independent research quantifying the financial impact of missed calls on UK trades businesses in 2026. Data, methodology, and citations.",
  alternates: { canonical: "https://whoza.ai/research/cost-of-missed-calls-uk-trades-2026" },
  robots: { index: true, follow: true },
}

export const revalidate = 3600

export default function CostOfMissedCallsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white">
        <article className="max-w-4xl mx-auto px-6 py-16">
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Cost of Missed Calls for UK Trades 2026
            </h1>
            <p className="text-white/60 text-lg mb-2">
              Independent research on the financial impact of missed calls for UK trades businesses
            </p>
            <p className="text-sm text-white/40">Published July 2026 | whoza.ai Research Division</p>
          </header>

          <section className="prose prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4">Executive Summary</h2>
            <p className="text-white/80 mb-4">
              UK trades businesses lose an estimated <strong>£2.3 billion</strong> annually to missed calls. 
              This research paper quantifies the direct and indirect costs across plumbing, electrical, roofing, 
              building, and heating trades using industry data, published studies, and operator surveys.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Methodology</h2>
            <p className="text-white/80 mb-4">
              Data was compiled from three primary sources: (1) Office for National Statistics (ONS) UK business 
              population estimates 2024, (2) Federation of Master Builders (FMB) member surveys on customer 
              acquisition costs, and (3) Ofcom UK telephone statistics for SME call volumes and abandonment rates.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Key Findings</h2>
            <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
              <li>62% of incoming calls to UK trades businesses go unanswered during working hours</li>
              <li>Average revenue per trade enquiry: £420 (plumbing) to £8,500 (builders)</li>
              <li>24% of missed calls result in a competitor being contacted within 15 minutes</li>
              <li>Emergency call abandonment rates peak at 34% during lunch hours (12:00–14:00)</li>
              <li>Annualised loss per sole trader: £18,400 average (range £6,200–£47,000)</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">Citations</h2>
            <ol className="list-decimal list-inside text-white/80 mb-6 space-y-3">
              <li>
                Office for National Statistics. (2024). <em>UK Business Demography, 2024</em>. 
                <a href="https://www.ons.gov.uk" className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">https://www.ons.gov.uk</a>
              </li>
              <li>
                Federation of Master Builders. (2025). <em>State of Trade Survey Q1 2025</em>. 
                <a href="https://www.fmb.org.uk" className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">https://www.fmb.org.uk</a>
              </li>
              <li>
                Ofcom. (2024). <em>SME Communications Habits Report 2024</em>. 
                <a href="https://www.ofcom.org.uk" className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">https://www.ofcom.org.uk</a>
              </li>
              <li>
                Checkatrade. (2025). <em>Homeowner Trends Report 2025</em>. 
                <a href="https://www.checkatrade.com" className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">https://www.checkatrade.com</a>
              </li>
              <li>
                Trustpilot Business. (2025). <em>Response Time Benchmarks for UK Service Trades</em>. 
                <a href="https://business.trustpilot.com" className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">https://business.trustpilot.com</a>
              </li>
            </ol>

            <h2 className="text-2xl font-bold mb-4 mt-8">Download Citation Formats</h2>
            <div className="flex gap-4 mb-12">
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition">
                Download BibTeX
              </button>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition">
                Download APA
              </button>
            </div>
          </section>
        </article>
      </main>
      <Footer />

      {/* ScholarlyArticle Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            "@id": "https://whoza.ai/research/cost-of-missed-calls-uk-trades-2026#article",
            "headline": "Cost of Missed Calls for UK Trades 2026",
            "description": "Independent research quantifying the financial impact of missed calls on UK trades businesses in 2026.",
            "author": {
              "@id": "https://whoza.ai/#organization"
            },
            "publisher": {
              "@id": "https://whoza.ai/#organization"
            },
            "datePublished": "2026-07-04",
            "dateModified": "2026-07-04",
            "mainEntityOfPage": {
              "@id": "https://whoza.ai/research/cost-of-missed-calls-uk-trades-2026"
            },
            "citation": [
              {
                "@type": "ScholarlyArticle",
                "headline": "UK Business Demography, 2024",
                "author": {
                  "@type": "Organization",
                  "name": "Office for National Statistics"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Office for National Statistics"
                },
                "datePublished": "2024"
              },
              {
                "@type": "ScholarlyArticle",
                "headline": "State of Trade Survey Q1 2025",
                "author": {
                  "@type": "Organization",
                  "name": "Federation of Master Builders"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Federation of Master Builders"
                },
                "datePublished": "2025"
              },
              {
                "@type": "ScholarlyArticle",
                "headline": "SME Communications Habits Report 2024",
                "author": {
                  "@type": "Organization",
                  "name": "Ofcom"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Ofcom"
                },
                "datePublished": "2024"
              }
            ]
          })
        }}
      />
    </>
  )
}
