import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { PreferredSourceButton } from "@/components/whoza/preferred-source-button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Fragment } from "react"
import { notFound } from "next/navigation"
import { blogPostContents } from "@/lib/blog-content"
import { findBlogEntry, formatBlogDate, type BlogIndexEntry } from "@/lib/blog-index"
import { ArticleCover, ArticleHeader, ArticleInlineCta, RelatedPosts } from "@/components/whoza/blog/article-parts"
import { CtaBand } from "@/components/whoza/cta-band"
import { RevealObserver } from "@/components/whoza/blog/reveal-observer"
import { SharePost } from "@/components/whoza/blog/share-post"

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

// Slugs that also have their own folder under app/blog/. Both routes would
// prerender the same URL and whichever build output is written last wins, so
// the page flipped between two different titles, texts and schemas from one
// deploy to the next. The dedicated page is the one live on whoza.ai, so this
// template must not generate these slugs.
const DEDICATED_PAGE_SLUGS = new Set([
  "ai-call-answering-uk-tradespeople-definitive-guide-2026",
])

export function generateStaticParams() {
  return Object.keys(blogPostContents)
    .filter((slug) => !DEDICATED_PAGE_SLUGS.has(slug))
    .map((slug) => ({ slug }))
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
      "@id": "https://whoza.ai/for-plumbers"
    },
    "articleSection": "Customer Stories",
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

  const customerStoryAuthors = [
    "Mike Harrison", "Tom Edwards", "Gary Mitchell", "Dave Williams", "Mark Harrison",
    "Tom Hartley", "Steve Dawson", "Sarah Jenkins", "James Crawford", "Mark Henderson",
    "Sarah Williams", "Tom Bradley", "Ross McAllister", "Charlie Hardcastle"
  ]
  const isDruAuthor = post.author === "Dru McPherson"
  const needsDisclosure = customerStoryAuthors.includes(post.author)

  const authorSchema = isDruAuthor
    ? { "@id": "https://whoza.ai/#dru-mcpherson" }
    : { "@id": "https://whoza.ai/#organization" }

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
    "@id": `https://whoza.ai/blog/${slug}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "Home", item: "https://whoza.ai/" },
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

  const entry: BlogIndexEntry = findBlogEntry(slug) ?? {
    slug,
    title: post.title,
    excerpt: post.excerpt,
    readTime: post.readTime,
    date: post.date,
    category: post.category,
    cover: "whatsapp-lead",
  }
  // The "try it yourself" box goes roughly halfway through the article.
  const inlineCtaAfter = content.sections.length >= 3 ? Math.floor(content.sections.length / 2) - 1 : -1

  return (
    <div className="min-h-screen bg-[var(--v2-paper)] text-[var(--v2-body)] v2-page">
      <Header />
      <script
        id="blog-post-graph-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />
      <RevealObserver />

      <main id="main-content" className="overflow-x-clip pb-24">
        <article>
          <ArticleHeader entry={entry} title={post.title} author={post.author} authorTitle={post.authorTitle}>
            {needsDisclosure && (
              <div className="mt-6 max-w-[900px] rounded-2xl border border-[var(--v2-line)] bg-white p-4">
                <p className="text-[var(--v2-muted)] text-sm leading-relaxed">
                  <strong className="text-[var(--v2-body)]">About this story.</strong>{" "}
                  This account is based on outcomes reported to us by a whoza.ai customer and written up by the whoza.ai team. Names and figures are the customer&apos;s own. Results vary. See our{" "}
                  <Link href="/data" className="text-[var(--v2-green)] hover:text-[var(--v2-green-hover)] underline">evidence base</Link>{" "}
                  for how we handle numbers.
                </p>
              </div>
            )}
          </ArticleHeader>

          <ArticleCover entry={entry} />

          <div className="mx-auto max-w-[880px] px-4 pt-12 sm:px-6 sm:pt-16">
            <div className="v2-article article-body">
              <p data-reveal className="text-[clamp(19px,1.6vw,22px)] leading-relaxed text-[var(--v2-ink)]">{post.excerpt}</p>
              <p className="text-[14px] text-[var(--v2-muted)]">
                Last updated: <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              </p>

              <div
                data-reveal
                className="whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: formatText(content.introduction) }}
              />

              {content.sections.map((section, idx) => (
                <Fragment key={`section-${idx}`}>
                  <section data-reveal>
                    {section.headingTag === "h2" ? <h2>{section.heading}</h2> : <h3>{section.heading}</h3>}

                    {section.body && (
                      <div
                        className="whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: formatText(section.body) }}
                      />
                    )}

                    {section.table && section.table.length > 0 && (
                      <div className="my-6 overflow-hidden rounded-2xl border border-[var(--v2-line)] bg-white">
                        <table>
                          <tbody>
                            {section.table.map((row, ridx) => (
                              <tr key={`row-${ridx}`} className="border-b border-[var(--v2-line)] last:border-0">
                                <th scope="row" className="w-1/3 bg-[var(--v2-mint)] px-5 py-3.5 text-left font-semibold text-[var(--v2-ink)]">{row.label}</th>
                                <td className="px-5 py-3.5 text-[var(--v2-body)]">{row.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {section.list && section.list.length > 0 && (
                      <ul className="my-6 space-y-3">
                        {section.list.map((item, lidx) => (
                          <li key={`list-${lidx}`} className="flex items-start gap-3">
                            <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[var(--v2-green)]" aria-hidden="true" />
                            <span dangerouslySetInnerHTML={{ __html: formatText(item) }} />
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.callout && (
                      <div className="my-7 rounded-r-2xl border-l-4 border-[var(--v2-green)] bg-[var(--v2-mint)] p-6">
                        <p className="!mb-0 font-medium text-[var(--v2-green-ink)]" dangerouslySetInnerHTML={{ __html: formatText(section.callout) }} />
                      </div>
                    )}
                  </section>
                  {idx === inlineCtaAfter && <ArticleInlineCta source={`blog-${slug}`} />}
                </Fragment>
              ))}

              <div
                data-reveal
                className="mt-12 whitespace-pre-line rounded-[24px] border border-[var(--v2-line)] bg-white p-7 sm:p-9"
                dangerouslySetInnerHTML={{ __html: formatText(content.conclusion) }}
              />

              <div data-reveal className="mt-8">
                <CtaBand
                  id={`blog-${slug}`}
                  compact
                  headingTag="div"
                  heading={["Let Katie answer", "your next missed call"]}
                  text={<span dangerouslySetInnerHTML={{ __html: formatText(content.cta) }} />}
                  primaryLabel="Start your free trial"
                  source={`blog-${slug}-cta`}
                  secondary={{ label: "Hear a real call", href: "/#katie-demo-audio" }}
                />
              </div>

              <section data-reveal className="mt-16">
                <h2>Frequently Asked Questions</h2>
                <div className="divide-y divide-[var(--v2-line)] border-y border-[var(--v2-line)]">
                  {content.faq.map((faq, fidx) => (
                    <div key={`faq-${fidx}`} className="py-6">
                      <h3 className="!mt-0">{faq.question}</h3>
                      <p className="!mb-0">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-14">
              <SharePost url={`https://whoza.ai/blog/${slug}`} title={post.title} />
            </div>
          </div>
        </article>

        <div className="mt-24 sm:mt-32">
          <RelatedPosts slug={slug} />
        </div>

        <div className="mx-auto mt-16 max-w-[880px] px-4 sm:px-6">
          <PreferredSourceButton label="Prefer whoza.ai as a source in Google." />
        </div>
      </main>

      <Footer hideCta />
    </div>
  )
}

function formatText(text: string): string {
  const formatted = text
    // Convert markdown links to HTML anchor tags
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[var(--v2-green)] hover:text-[var(--v2-green-hover)] underline underline-offset-2">$1</a>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
  return formatted
}
