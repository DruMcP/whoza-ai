# SEO Fix Plan for whoza.ai

## Critical Issues to Fix

### 1. 51 Pages with Redirect → Fix: Add server-side 301 redirects
- `/login` → `/sign-in` (client-side Navigate, needs server 301)
- `/privacy-policy` → `/privacy` (client-side Navigate, needs server 301)
- `/competitor` → `/competitor-analysis` (client-side Navigate, needs server 301)
- `/free-score` → `/competitor-analysis` (already in _redirects ✓)
- Trailing slash normalization issues

### 2. 20 Pages Excluded by noindex → Fix: Remove accidental noindex
- Homepage: `Home.jsx` passes `homeFAQSchema` to SEO, but prerender also injects it
- Protected routes (`/portal/*`, `/tasks/*`, `/reports/*`) serve SPA shell with 200 status
- Need to investigate and fix

### 3. 8 Alternate canonical pages → Fix: Add canonical tags for duplicate blog posts
- 8 pairs of near-duplicate blog posts need canonical/merge

### 4. 2 Duplicate FAQPage schema → Fix: Remove duplicate schema injection
- Homepage gets FAQ schema from BOTH prerender and Home.jsx SEO component
- Need to remove one source

### 5. Sitemap issues → Fix: Remove redirect URLs, fix lastmod dates
- All lastmod dates are stale (2026-04-26)
- Contains redirecting URLs

### 6. 1 Redirect error → Fix: Check for redirect loops
### 7. 1 Not found (404) → Fix: Remove 404 URLs from sitemap
### 8. 1 Blocked by robots.txt → Fix: Remove blocked URLs from sitemap

## Implementation Order
1. Fix _redirects + netlify.toml (server-side redirects)
2. Fix prerender.mjs (remove redirect routes from staticPages, fix sitemap)
3. Fix sitemap.xml (remove redirects, fix dates)
4. Fix Home.jsx (remove duplicate FAQ schema)
5. Fix BlogPost.jsx (add canonical support, ensure no duplicate schema)
6. Fix blogPosts.js (add canonicalTo for duplicate posts)
7. Fix robots.txt if needed
