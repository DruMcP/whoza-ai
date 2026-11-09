import { fetchRemoteBlogPosts } from "@/lib/blog-remote"

/**
 * Sitemap for posts written in the admin console, listed in robots.txt next to /sitemap.xml.
 *
 * Separate on purpose. /sitemap.xml is frozen at build time and scripts/ci-seo-guard.js fails the
 * build on any URL it did not expect, so a post in it would stop the next deploy of the whole site.
 * Publishing a post must never be able to do that, and it should not have to wait for a deploy.
 */
export const revalidate = 300

const xml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

export async function GET() {
  const urls = (await fetchRemoteBlogPosts())
    .map(
      (post) =>
        `<url><loc>https://whoza.ai/blog/${xml(post.slug)}</loc><lastmod>${xml(post.updated_at.slice(0, 10))}</lastmod></url>`,
    )
    .join("")
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
  return new Response(body, { headers: { "Content-Type": "application/xml" } })
}
