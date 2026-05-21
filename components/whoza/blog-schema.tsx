"use client"

import Script from "next/script"

interface BlogPostSchemaProps {
  posts: {
    slug: string
    title: string
    excerpt: string
    date: string
    category: string
  }[]
}

export function BlogListingSchema({ posts }: BlogPostSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        url: `https://whoza.ai/blog/${post.slug}`,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          "@type": "Organization",
          name: "Whoza.ai",
          url: "https://whoza.ai",
        },
        publisher: {
          "@type": "Organization",
          name: "Whoza.ai",
          logo: {
            "@type": "ImageObject",
            url: "https://whoza.ai/og-image.webp",
          },
        },
        image: "https://whoza.ai/og-image.webp",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://whoza.ai/blog/${post.slug}`,
        },
        articleSection: post.category,
      },
    })),
  }

  return (
    <Script
      id="blog-listing-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
