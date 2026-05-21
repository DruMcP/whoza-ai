interface ReviewSchemaProps {
  reviews: {
    name: string
    text: string
    rating: number
    date?: string
  }[]
  itemReviewed: {
    name: string
    url: string
    image?: string
  }
}

export function ReviewSchema({ reviews, itemReviewed }: ReviewSchemaProps) {
  const aggregateRating = {
    "@type": "AggregateRating",
    ratingValue: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    bestRating: 5,
    worstRating: 1,
    reviewCount: reviews.length,
  }

  const reviewSchema = reviews.map((review) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.name,
    },
    reviewBody: review.text,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    datePublished: review.date || "2026-05-01",
    publisher: {
      "@type": "Organization",
      name: "Whoza.ai",
    },
  }))

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: itemReviewed.name,
    url: itemReviewed.url,
    image: itemReviewed.image || "https://whoza.ai/og-image.webp",
    aggregateRating,
    review: reviewSchema,
  }

  return (
    <script
      id="review-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
