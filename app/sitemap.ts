import { MetadataRoute } from 'next'
import { locations } from '@/lib/locations'
import { trades } from '@/lib/trades'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://whoza.ai'
  const lastMod = '2026-05-08'

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/dpa`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/fair-use`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/sla`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/modern-slavery`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/accessibility`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/vat-info`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/complaints`,
      lastModified: lastMod,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  // Dynamic trade pages
  const tradePages: MetadataRoute.Sitemap = trades.map((trade) => ({
    url: `${baseUrl}/trade/${trade.slug}`,
    lastModified: lastMod,
    changeFrequency: 'weekly',
    priority: 0.75,
  }))

  // Dynamic location pages
  const locationPages: MetadataRoute.Sitemap = locations.map((loc) => ({
    url: `${baseUrl}/${loc.slug}`,
    lastModified: lastMod,
    changeFrequency: 'monthly',
    priority: loc.country === 'uk' ? 0.7 : 0.6,
  }))

  return [...corePages, ...tradePages, ...locationPages]
}
