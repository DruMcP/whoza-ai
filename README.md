# whoza.ai

White-label AI voice-agent platform for UK tradespeople. Built with Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui.

## Quick Start

```bash
npm install
npm run dev
```

## Architecture

- **App Router** (`app/`): Next.js 15 with static generation + ISR
- **Components** (`components/`): shadcn/ui base + Whoza custom components
- **Content** (`lib/blog-content.ts`, `lib/seo-data.ts`): Static content registries
- **City Pages** (`lib/trade-city-pages.ts`): Canonical source for trade×city combos
- **Tests** (`tests/`): Vitest — dead links, self-review markup, format, referral service
- **Data** (`app/data/page.tsx`): Source registry and audit trail

## Key Files

| File | Purpose |
|------|---------|
| `lib/trade-city-pages.ts` | Canonical registry of live trade×city pages |
| `components/whoza/trade-city-links.tsx` | Renders city links for trade hub pages (auto-hides if no cities) |
| `lib/seo-data.ts` | Trade names, adjectives, city metadata |
| `lib/blog-content.ts` | Blog post content registry |
| `app/sitemap.ts` | Dynamic sitemap using `TRADE_CITY_PAGES` |
| `tests/no-dead-internal-links.test.ts` | Three-pass link checker (literal, template, unresolvable) |
| `app/data/page.tsx` | Source registry: verified, descriptive, unverified, withdrawn |

## Content Policy

- No invented statistics, prices, company numbers, or URLs
- No `Review` or `AggregateRating` schema markup
- All claims traceable to `app/data/page.tsx` registry
- Withdrawn sources documented with reason

## Deploy

Push to `main` → Netlify auto-builds. Never run `netlify deploy` CLI.
