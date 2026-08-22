import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { FileText, Clock, ArrowLeft, User, Calendar, CheckCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { blogPostContents } from "@/lib/blog-content"

// Defensive blocklist: retired blog slugs that must return 404
// These slugs no longer have live content. The page component below
// calls notFound() for any slug in this set.
const RETIRED_BLOG_SLUGS = new Set([
  // AI-visibility cluster (consolidated to local-seo-trades-complete-guide)
  "what-is-ai-visibility-and-why-does-it-matter-for-your-trade-business",
  "what-is-ai-visibility-uk-tradespeople-2026",
  "how-uk-tradespeople-get-found-ai-search-2026",
  "why-bing-matters-for-ai-search-2026",
  "why-bing-matters-for-ai-search-the-perplexity-connection",
  "best-practices-tradespeople-london-local-ai-visibility-guide",
  "ai-search-optimization-beginners-guide-get-found-chatgpt-perplexity-2026",
  "the-ultimate-guide-to-ai-search-optimization-for-tradespeople",
  "top-10-ai-visibility-strategies-uk-tradespeople-2026",
  "manchester-vs-birmingham-local-seo-strategies-2026",
  "how-ai-search-engines-choose-which-local-businesses-to-recommend",
  "how-ai-search-engines-rank-local-tradespeople-aeo-geo-guide-2026",
  "how-ai-search-engines-choose-plumber-recommendation-manchester",
  "how-uk-tradespeople-can-get-recommended-by-chatgpt-in-2026",
  "electricians-guide-to-google-ai-overviews-how-to-get-featured",
  "electricians-guide",
  "electricians-guide-to-google-ai-overviews-2026",
  // Playbook cluster (consolidated to how-to-grow-trade-business-uk-guide)
  "the-uk-trades-business-playbook-for-ai-search-visibility-in-2026",
  "uk-trades-business-playbook-ai-search-visibility-2026",
  // Reviews cluster (consolidated to how-to-get-more-google-reviews-trades)
  "how-reviews-influence-ai-search-recommendations-tradespeople-2026",
  // FAQ cluster (consolidated to ultimate-faq-tradespeople)
  "how-to-create-faq-page-ai-can-find-2026",
  "how-to-create-an-faq-page-that-ai-can-find-and-reference",
  // Trade-specific redirects
  "roofers-checklist-10-steps-to-ai-visibility-2026",
  "roofers-checklist",
  // Abbreviated / old slugs
  "ai-call-answering-trades-uk-guide",
  "247-call-answering-uk-trades-guide-2026",
  "how-ai-call-handlers-are-changing-the-game-for-uk-trades-2026",
  "ai-call-answering-uk-trades",
  "missed-calls-cost-uk-trades",
  "ai-receptionist-vs-human",
  "best-ai-call-answering-service-uk-2026",
  "best-ai-call-answering-service-uk-trades-2026",
  "best-ai-phone-answering-uk-trades-2026",
  "ai-vs-human-receptionist-trades",
  "ai-receptionist-vs-human-receptionist-which-is-right-for-your-trade-business",
  "missed-calls-missed-money-the-real-cost-for-tradespeople",
  "why-62-percent-of-trade-business-calls-go-unanswered",
  "missed-call-recovery-trades-guide",
  "hvac-emergency-call-handling",
  "emergency-call-handling-guide",
  "how-plumbers-can-get-found-in-chatgpt-2026",
  "how-plumbers-can-get-found-in-chatgpt-a-step-by-step-guide",
  "5-signs-your-trade-business-needs-an-ai-call-handler",
  "case-study-how-a-london-electrician-recovered-12k-month-with-ai-call-handling",
  "how-katie-answers-captures-and-delivers-enquiries-in-3-seconds",
  "how-to-never-miss-an-emergency-call-again-plumbers-electricians-roofers",
  "how-whatsapp-delivery-changes-everything-for-tradespeople",
  "how-whoza-ai-works-with-your-existing-phone-number",
  "how-ai-call-handling-works-with-your-existing-phone-number",
  "moneypenny-vs-whoza-ai-which-receptionist-service-is-right-for-trades",
  "roi-calculator-how-much-could-an-ai-call-handler-save-your-trade-business",
  "missed-calls-missed-money",
  "the-7-day-free-trial-what-to-expect-when-you-try-katie",
  "the-truth-about-ai-voice-agents-what-google-reviews-say",
  "why-tradespeople-need-a-revenue-team-not-just-a-virtual-receptionist",
  "hvac-emergency-call-handling",
  "emergency-call-handling-guide",
])

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600

export function generateStaticParams() {
  return Object.keys(blogPostContents).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPostContents[slug]
  if (!post) {
    return {
      title: "Blog Post | whoza.ai",
    }
  }
  return {
    metadataBase: new URL("https://whoza.ai"),
    title: post.metaTitle || `${post.title} | whoza.ai Blog`,
    description: post.schema.description,
    alternates: {
      canonical: `https://whoza.ai/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    authors: [{ name: post.author }],
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.excerpt,
      type: "article",
      authors: [post.author],
      tags: [post.category],
      url: `https://whoza.ai/blog/${slug}`,
      siteName: "Whoza.ai",
      locale: "en_GB",
      images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.excerpt,
      images: ["https://whoza.ai/og-image.webp"],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  // Defensive: retired slugs must 404 even if redirects are bypassed
  if (RETIRED_BLOG_SLUGS.has(slug)) {
    notFound()
  }

  const post = blogPostContents[slug]

  if (!post) {
    notFound()
  }

  const { content } = post

  // Calculate word count from actual content (not excerpt estimate)
  const introWords = content.introduction.split(/\s+/).length
  const sectionWords = content.sections.reduce((acc, section) => {
    const bodyWords = section.body ? section.body.split(/\s+/).length : 0
    const listWords = section.list ? section.list.join(" ").split(/\s+/).length : 0
    const calloutWords = section.callout ? section.callout.split(/\s+/).length : 0
    return acc + bodyWords + listWords + calloutWords
  }, 0)
  const conclusionWords = content.conclusion.split(/\s+/).length
  const ctaWords = content.cta.split(/\s+/).length
  const faqWords = content.faq.reduce((acc, f) => acc + f.question.split(/\s+/).length + f.answer.split(/\s+/).length, 0)
  const wordCount = introWords + sectionWords + conclusionWords + ctaWords + faqWords

  // Generate BlogPosting Article schema JSON-LD
  // Enhanced Article schema for Gary's blog post
  const isGaryPost = slug === "i-missed-5-emergency-calls-a-week-then-i-tried-ai-gary-the-plumber"
  const enhancedArticleSchema = isGaryPost ? {
    "@type": "BlogPosting",
    "headline": "I Missed 5 Emergency Calls a Week. Then I Tried AI.",
    "description": "Self-employed plumber from Clapham shares honest 4-week diary using AI call answering. Real numbers. No BS. £6,800 in recovered jobs.",
    "image": "https://whoza.ai/og-image.webp",
    "datePublished": "2026-05-15",
    "dateModified": "2026-05-15",
    "author": {
      "@id": "https://whoza.ai/#organization"
    },
    "publisher": {
      "@id": "https://whoza.ai/#organization"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://whoza.ai/blog/i-missed-5-emergency-calls-a-week-then-i-tried-ai-gary-the-plumber"
    },
    "articleSection": "UGC / Real Stories",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".article-headline", ".article-body"]
    },
    "about": {
      "@type": "Service",
      "name": "AI Call Answering for Plumbers",
      "provider": {
        "@id": "https://whoza.ai/#organization"
      }
    },
    "isPartOf": {
      "@type": "Blog",
      "@id": "https://whoza.ai/blog",
      "name": "whoza.ai Blog"
    }
  } : null

  const pillarSlugs = [
    "how-does-ai-call-answering-work",
    "ai-call-answering-cost-uk",
    "how-to-grow-trade-business-uk-guide",
    "how-to-get-more-plumbing-customers",
  ]
  const isPillarPost = pillarSlugs.includes(slug)

  const customerStoryAuthors = [
    "Mike Harrison", "Tom Edwards", "Gary Mitchell", "Dave Williams", "Mark Harrison",
    "Tom Hartley", "Steve Dawson", "Sarah Jenkins", "James Crawford", "Mark Henderson",
    "Sarah Williams", "Tom Bradley"
  ]
  const isDruAuthor = post.author === "Dru McPherson"
  const isOrgAuthor = customerStoryAuthors.includes(post.author) || post.author === "Whoza.ai Team"

  const authorSchema = isDruAuthor
    ? { "@id": "https://whoza.ai/#dru-mcpherson" }
    : isOrgAuthor
      ? { "@id": "https://whoza.ai/#organization" }
      : { "@type": "Person" as const, name: post.author, jobTitle: post.authorTitle || "Contributor" }

  const articleSchema = {
    "@type": "BlogPosting",
    headline: post.schema.headline,
    description: post.schema.description,
    image: "https://whoza.ai/og-image.webp",
    datePublished: post.date,
    dateModified: post.date,
    author: authorSchema,
    publisher: {
      "@id": "https://whoza.ai/#organization",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://whoza.ai/blog/${slug}`,
    },
    articleSection: post.category,
    wordCount: wordCount,
    inLanguage: "en-GB",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article h1", "article h2", "article p"],
    },
    isPartOf: {
      "@type": "Blog",
      "@id": "https://whoza.ai/blog",
      name: "whoza.ai Blog",
    },
  }

  const faqEntities = content.faq.map((faq) => ({
    "@type": "Question" as const,
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: faq.answer,
    },
  }))

  const breadcrumbList = {
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "Home", item: "https://whoza.ai" },
      { "@type": "ListItem" as const, position: 2, name: "Blog", item: "https://whoza.ai/blog" },
      { "@type": "ListItem" as const, position: 3, name: post.title, item: `https://whoza.ai/blog/${slug}` },
    ],
  }

  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      isGaryPost && enhancedArticleSchema ? enhancedArticleSchema : articleSchema,
      { "@type": "FAQPage" as const, mainEntity: faqEntities },
      breadcrumbList,
    ],
  }

  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <script
        id="blog-post-graph-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/50 hover:text-emerald-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            {post.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
              {post.authorTitle && <span className="text-white/30">— {post.authorTitle}</span>}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>{post.date}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <div className="mt-2 text-white/30 text-sm">
            Last updated: <time dateTime={post.date}>{post.date}</time>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-10">
          <p className="text-white/70 text-lg leading-relaxed">{post.excerpt}</p>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <div
            className="text-white/80 leading-relaxed whitespace-pre-line mb-10"
            dangerouslySetInnerHTML={{ __html: formatText(content.introduction) }}
          />

          {content.sections.map((section, idx) => (
            <section key={`section-${idx}`} className="mb-10">
              {section.headingTag === "h2" ? (
                <h2 className="text-2xl font-bold text-white mb-4 mt-8">{section.heading}</h2>
              ) : (
                <h3 className="text-xl font-semibold text-white mb-3 mt-6">{section.heading}</h3>
              )}

              <div
                className="text-white/80 leading-relaxed whitespace-pre-line mb-4"
                dangerouslySetInnerHTML={{ __html: formatText(section.body) }}
              />

              {section.table && section.table.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-6">
                  <table className="w-full text-sm">
                    <tbody>
                      {section.table.map((row, ridx) => (
                        <tr key={`row-${ridx}`} className="border-b border-white/10 last:border-0">
                          <td className="px-4 py-3 font-medium text-white/70 w-1/3">{row.label}</td>
                          <td className="px-4 py-3 text-white/90">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.list && section.list.length > 0 && (
                <ul className="space-y-3 mb-6">
                  {section.list.map((item, lidx) => (
                    <li key={`list-${lidx}`} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.callout && (
                <div className="bg-emerald-500/10 border-l-4 border-emerald-500 rounded-r-xl p-6 my-6">
                  <p className="text-emerald-200/90 font-medium leading-relaxed">{section.callout}</p>
                </div>
              )}
            </section>
          ))}

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-10">
            <div
              className="text-white/80 leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: formatText(content.conclusion) }}
            />
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 mb-10 text-center">
            <div
              className="text-white/90 leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: formatText(content.cta) }}
            />
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
            >
              Start Your Free Trial
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {content.faq.map((faq, fidx) => (
                <div key={`faq-${fidx}`} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Posts */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">Related Posts</h2>
            <div className="grid gap-4">
              {Object.entries(blogPostContents)
                .filter(([key]) => key !== slug)
                .slice(0, 3)
                .map(([key, relatedPost]) => (
                  <Link
                    key={key}
                    href={`/blog/${key}`}
                    className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                  >
                    <div className="text-emerald-400 text-sm font-medium mb-2">{relatedPost.category}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{relatedPost.title}</h3>
                    <p className="text-white/60 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                  </Link>
                ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}

function formatText(text: string): string {
  const formatted = text
    // Convert markdown links to HTML anchor tags
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-emerald-400 hover:text-emerald-300 underline">$1</a>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
  return formatted
}
