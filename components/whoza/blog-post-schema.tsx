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
  breadcrumbItems?: { name: string; item: string }[]
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
  breadcrumbItems,
}: BlogPostArticleSchemaProps) {
  const isDru = author === "Dru McPherson" || author === "Dru"
  const isOrg = author === "Whoza.ai Research Team" || author === "whoza.ai" || author === "Whoza.ai"
  const authorObj = isDru
    ? { "@id": "https://whoza.ai/#dru-mcpherson" }
    : isOrg
    ? { "@id": "https://whoza.ai/#organization" }
    : { "@type": "Person" as const, name: author, jobTitle: authorTitle }

  const blogPosting = {
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: "https://whoza.ai/og-image.webp",
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: authorObj,
    publisher: {
      "@id": "https://whoza.ai/#organization",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://whoza.ai/blog/${slug}`,
    },
    articleSection: category,
    wordCount: excerpt.length * 8,
    inLanguage: "en-GB",
    isPartOf: {
      "@type": "Blog",
      "@id": "https://whoza.ai/blog",
      name: "whoza.ai Blog",
    },
  }

  if (breadcrumbItems && breadcrumbItems.length > 0) {
    const breadcrumbList = {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    }

    const graphSchema = {
      "@context": "https://schema.org",
      "@graph": [blogPosting, breadcrumbList],
    }

    return (
      <script
        id="blog-post-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />
    )
  }

  const schema = {
    "@context": "https://schema.org",
    ...blogPosting,
  }

  return (
    <script
      id="blog-post-article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
