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
      "@id": "https://whoza.ai/#organization",
    },
  }))

  const ratingValue =
    reviews.length > 0
      ? Math.round(
          (reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length) *
            10,
        ) / 10
      : 0

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: itemReviewed.name,
    url: itemReviewed.url,
    image: itemReviewed.image || "https://whoza.ai/og-image.webp",
    brand: {
      "@type": "Brand",
      name: "Whoza.ai",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
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
