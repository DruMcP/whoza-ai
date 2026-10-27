import { Metadata } from "next"
import { Newsreader } from "next/font/google"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { BlogListingSchema } from "@/components/whoza/blog-schema"
import { PreferredSourceButton } from "@/components/whoza/preferred-source-button"
import { FeaturedSlider } from "@/components/whoza/blog/featured-slider"
import { BlogGrid } from "@/components/whoza/blog/blog-grid"
import { RevealObserver } from "@/components/whoza/blog/reveal-observer"
import { blogIndex } from "@/lib/blog-index"

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Blog: AI Call Answering for UK Trades | whoza.ai",
  description: "AI voice agent insights, trade business growth tips, and lead capture strategies for UK plumbers, electricians, gas engineers and builders. Book more jobs.",
  alternates: {
    canonical: "https://whoza.ai/blog",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/blog",
    siteName: "Whoza.ai",
    title: "Blog | whoza.ai",
    description: "AI voice agent insights, trade business growth tips, and lead capture strategies for UK plumbers, electricians, gas engineers and builders. Book more jobs.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "whoza.ai Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | whoza.ai",
    description: "AI voice agent insights, trade business growth tips, and lead capture strategies for UK plumbers, electricians, gas engineers and builders. Book more jobs.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const revalidate = 3600

export default function BlogPage() {
  const featured = blogIndex.filter((post) => post.featured)

  return (
    <div className="min-h-screen bg-[var(--v2-paper)] text-[var(--v2-body)] v2-page">
      <Header />
      <BlogListingSchema posts={blogIndex.map(({ slug, title, excerpt, date, category, url }) => ({ slug, title, excerpt, date, category, url }))} />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Blog", item: "https://whoza.ai/blog" },
      ]} />
      <RevealObserver />

      <main id="main-content" className="overflow-x-clip pb-24">
        {/* Heading */}
        <div className="mx-auto max-w-[1120px] px-4 pb-12 pt-28 text-center sm:px-6 sm:pb-16 sm:pt-36">
          <h1
            data-reveal="load"
            className="mx-auto max-w-4xl text-balance text-[clamp(38px,5.6vw,72px)] font-bold leading-[1.02] tracking-[-0.035em] text-[var(--v2-ink)]"
          >
            Latest articles from the{" "}
            <span className={`${serif.className} font-medium italic tracking-[-0.02em] text-[var(--v2-green)]`}>whoza.ai</span>{" "}
            blog
          </h1>
          <p
            data-reveal="load"
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="v2-lead mx-auto mt-6 max-w-2xl"
          >
            AI voice agent insights, business growth strategies, and practical tips to help UK tradespeople capture more leads and book more jobs.
          </p>
        </div>

        {/* Featured slider */}
        <div data-reveal="load" style={{ "--reveal-delay": "220ms" } as React.CSSProperties}>
          <FeaturedSlider posts={featured} />
        </div>

        {/* All articles */}
        <section aria-labelledby="all-articles-heading" className="mx-auto mt-24 max-w-[1120px] px-4 sm:mt-32 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center" data-reveal>
            <h2 id="all-articles-heading" className="v2-h2">
              Recent guides <span className="v2-accent">&amp; research</span>
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--v2-body)] sm:text-[17px]">
              Practical guides for UK tradespeople, and our own research on missed calls, AI search and voice agents.
            </p>
          </div>
          <BlogGrid posts={blogIndex} perPage={6} />
        </section>

        <div className="mx-auto mt-16 max-w-[1120px] px-4 sm:px-6">
          <PreferredSourceButton label="See more from whoza.ai in Google." />
        </div>
      </main>

      <Footer />
    </div>
  )
}
