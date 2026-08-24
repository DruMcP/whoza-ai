# Content Editing Rules

## Source Registry

All statistics and claims must be traceable to `app/data/page.tsx`.

- **Verified**: Source loaded and confirmed (green badge)
- **Descriptive**: Our arithmetic from verified sources (amber badge)
- **Unverified**: Vendor marketing or unconfirmed (red badge)
- **Withdrawn**: Removed from site, documented with reason

## Forbidden Patterns

- No `Review` or `AggregateRating` schema markup anywhere
- No invented statistics, prices, company numbers, or URLs
- No "Industry Surveys", "WEF / Industry Data", or similar fake attributions
- No withdrawn sources (411 Locals, Dialzara) in visible copy or schema

## Trade × City Pages

- Canonical registry: `lib/trade-city-pages.ts`
- Use `<TradeCityLinks trade="for-{trade}" />` in hub pages
- Component auto-hides when trade has no city pages
- Sitemap reads from `TRADE_CITY_PAGES` directly

## Link Checking

Run `npx vitest run` before every commit. The dead-link test:
1. Checks literal hrefs against valid routes
2. Expands `.map()` template hrefs over hardcoded arrays
3. Fails on any unresolved `${...}` template pattern

## Adding a New Trade or City

1. Add to `TRADE_CITY_PAGES` in `lib/trade-city-pages.ts`
2. Create `app/for-{trade}-{city}/page.tsx`
3. Run tests to confirm no dead links
4. Update sitemap (auto-generated from registry)
