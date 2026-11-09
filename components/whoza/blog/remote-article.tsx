import type { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { PreferredSourceButton } from "@/components/whoza/preferred-source-button"
import { CtaBand } from "@/components/whoza/cta-band"
import { ArticleCover, ArticleHeader, RelatedPosts } from "@/components/whoza/blog/article-parts"
import { RevealObserver } from "@/components/whoza/blog/reveal-observer"
import { SharePost } from "@/components/whoza/blog/share-post"
import { toBlogEntry, type RemoteBlogPost } from "@/lib/blog-remote"

const OG_FALLBACK = "https://whoza.ai/og-image.webp"

export function remoteArticleMetadata(post: RemoteBlogPost): Metadata {
  const url = `https://whoza.ai/blog/${post.slug}`
  const title = post.seo_title || `${post.title} | whoza.ai Blog`
  const description = post.seo_description || post.excerpt
  const image = post.cover_image_url || OG_FALLBACK
  return {
    metadataBase: new URL("https://whoza.ai"),
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    authors: [{ name: post.author_name }],
    openGraph: {
      title: post.seo_title || post.title,
      description,
      type: "article",
      authors: [post.author_name],
      tags: [post.category],
      url,
      siteName: "Whoza.ai",
      locale: "en_GB",
      images: [{ url: image, alt: post.cover_image_alt || post.title }],
    },
    twitter: { card: "summary_large_image", title: post.seo_title || post.title, description, images: [image] },
  }
}

/** An article written in the admin console, in the same layout as the articles in the repo. */
export function RemoteArticle({ post }: { post: RemoteBlogPost }) {
  const url = `https://whoza.ai/blog/${post.slug}`
  const entry = toBlogEntry(post)
  const isDru = post.author_name === "Dru McPherson"

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.seo_description || post.excerpt,
        image: post.cover_image_url || OG_FALLBACK,
        datePublished: post.published_at,
        dateModified: post.updated_at,
        author: isDru ? { "@id": "https://whoza.ai/#dru-mcpherson" } : { "@id": "https://whoza.ai/#organization" },
        publisher: { "@id": "https://whoza.ai/#organization" },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        articleSection: post.category,
        inLanguage: "en-GB",
        isPartOf: { "@type": "Blog", "@id": "https://whoza.ai/blog", name: "whoza.ai Blog" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://whoza.ai/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://whoza.ai/blog" },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[var(--v2-paper)] text-[var(--v2-body)] v2-page">
      <Header />
      <script
        id="blog-post-graph-schema"
        type="application/ld+json"
        // A post title containing "</script>" must not be able to end this tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
      />
      <RevealObserver />

      <main id="main-content" className="overflow-x-clip pb-24">
        <article>
          <ArticleHeader
            entry={entry}
            title={post.title}
            author={post.author_name}
            authorTitle={isDru ? "Founder, whoza.ai" : undefined}
          />
          <ArticleCover entry={entry} />

          <div className="mx-auto max-w-[880px] px-4 pt-12 sm:px-6 sm:pt-16">
            <div className="v2-article v2-article-html article-body" dangerouslySetInnerHTML={{ __html: post.content_html }} />

            <div data-reveal className="mt-12">
              <CtaBand
                id={`blog-${post.slug}`}
                compact
                headingTag="div"
                heading={["Let Katie answer", "your next missed call"]}
                primaryLabel="Start your free trial"
                source={`blog-${post.slug}-cta`}
                secondary={{ label: "Hear a real call", href: "/#katie-demo-audio" }}
              />
            </div>

            <div className="mt-14">
              <SharePost url={url} title={post.title} />
            </div>
          </div>
        </article>

        <div className="mt-24 sm:mt-32">
          <RelatedPosts slug={post.slug} />
        </div>

        <div className="mx-auto mt-16 max-w-[880px] px-4 sm:px-6">
          <PreferredSourceButton label="Prefer whoza.ai as a source in Google." />
        </div>
      </main>

      <Footer hideCta />
    </div>
  )
}
