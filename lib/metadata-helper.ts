import { Metadata } from 'next'

/**
 * Helper to create page metadata with proper canonical URL
 * Usage: export const metadata = createPageMetadata('/pricing', 'Pricing | whoza.ai', '...')
 */
export function createPageMetadata(
  path: string,
  title: string,
  description: string,
  options?: Partial<Metadata>
): Metadata {
  const baseUrl = 'https://whoza.ai'
  const canonicalUrl = path === '/' ? baseUrl : `${baseUrl}${path}`

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    ...options,
  }
}
