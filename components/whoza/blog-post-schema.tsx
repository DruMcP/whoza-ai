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
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: "https://whoza.ai/og-image.webp",
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
      jobTitle: authorTitle,
    },
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
