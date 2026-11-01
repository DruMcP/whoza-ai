// Posts written in the admin console at app.whoza.ai, read from its public API. The API cleans
// their HTML before storing it (allow-listed tags, no scripts or event handlers), so content_html
// is safe to render as it arrives. Everything else on /blog stays in lib/blog-index.ts.

import type { BlogIndexEntry } from "@/lib/blog-index"

const API = (process.env.WHOZA_API_URL || "https://api.whoza.ai").replace(/\/$/, "")

/** How quickly a published or edited post reaches the site. */
const REVALIDATE_SECONDS = 300

export interface RemoteBlogSummary {
  slug: string
  title: string
  excerpt: string
  category: string
  author_name: string
  reading_minutes: number
  cover_image_url: string | null
  cover_image_alt: string
  published_at: string
  updated_at: string
}

export interface RemoteBlogPost extends RemoteBlogSummary {
  content_html: string
  seo_title: string
  seo_description: string
}

/** Published posts, newest first. An outage returns an empty list, so /blog still shows the articles in the repo. */
export async function fetchRemoteBlogPosts(): Promise<RemoteBlogSummary[]> {
  try {
    const res = await fetch(`${API}/api/v1/blog?limit=100`, { next: { revalidate: REVALIDATE_SECONDS } })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data.posts) ? data.posts : []
  } catch {
    return []
  }
}

/**
 * One published post, or null when there is no such post. A failed request throws instead of
 * returning null: the page then keeps serving its last good copy, where a null would turn a live
 * article into a 404 that search engines can see.
 */
export async function fetchRemoteBlogPost(slug: string): Promise<RemoteBlogPost | null> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null
  const res = await fetch(`${API}/api/v1/blog/${slug}`, { next: { revalidate: REVALIDATE_SECONDS } })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Blog API answered ${res.status} for ${slug}`)
  return res.json()
}

/** A remote post as the blog cards and article header expect it. */
export function toBlogEntry(post: RemoteBlogSummary): BlogIndexEntry {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    readTime: `${post.reading_minutes} min read`,
    date: post.published_at.slice(0, 10),
    category: post.category,
    cover: "whatsapp-lead",
    image: post.cover_image_url || undefined,
  }
}

/** Remote posts first, newest at the top. A slug the repo already has stays the repo's article. */
export function withRemotePosts(entries: BlogIndexEntry[], remote: RemoteBlogSummary[]): BlogIndexEntry[] {
  const taken = new Set(entries.map((entry) => entry.slug))
  return [...remote.filter((post) => !taken.has(post.slug)).map(toBlogEntry), ...entries]
}
