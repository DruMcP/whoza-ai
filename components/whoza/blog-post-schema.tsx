export interface BlogPostArticleSchemaProps {
  slug: string
  title: string
  description: string
  datePublished: string
  dateModified: string
  author: string
  authorTitle: string
  category: string
  excerpt: string
}

export function BlogPostArticleSchema({
  slug,
  title,
  description,
  datePublished,
  dateModified,
  author,
  authorTitle,
  category,
  excerpt,
}: BlogPostArticleSchemaProps) {
  const isDru = author === "Dru McPherson" || author === "Dru"
  const isOrg = author === "Whoza.ai Research Team" || author === "whoza.ai" || author === "Whoza.ai"
  const authorObj = isDru
    ? { "@id": "https://whoza.ai/#dru-mcpherson" }
    : isOrg
    ? { "@id": "https://whoza.ai/#organization" }
    : { "@type": "Person" as const, name: author, jobTitle: authorTitle }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: "https://whoza.ai/og-image.webp",
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: authorObj,
    publisher: {
      "@type": "Organization",
      name: "Whoza.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://whoza.ai/og-image.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://whoza.ai/blog/${slug}`,
    },
    articleSection: category,
    wordCount: excerpt.length * 8,
    inLanguage: "en-GB",
  }

  return (
    <script
      id="blog-post-article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
