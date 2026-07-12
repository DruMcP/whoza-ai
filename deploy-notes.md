## Changes made today (2026-07-13):

### Deploy: SEO/Geo/Schema Batch + New Pages
- **Deploy ID:** `6a54009e1b9df192f64cbf81`
- **Build:** 215 pages, zero errors
- **Status:** Production live at https://whoza.ai

**Key changes deployed:**
- UK city geo coordinates corrected (Perth no longer applied globally)
  - London: 51.5074, -0.1278 ✅
  - Glasgow: 55.8642, -4.2518 ✅
  - Edinburgh: 55.9533, -3.1883 ✅
  - Manchester: 53.4808, -2.2426 ✅
- Pricing schema fixes: `applicableCountry: "GB"`, ISO 4217 `unitCode: "HUR"`
- Meta title/description optimizations across trade/city pages
- New pages: press, booking, integrations, multi-location, how-many-calls-at-once, is-it-a-phone-tree, will-my-customers-mind, accents, research/cost-of-missed-calls-uk-trades-2026
- 5R-AI backlink integration in footer
- LLMS.TXT headers in netlify.toml
- 138 files committed, 3,972 insertions, 2,044 deletions

---

## Changes made today (2026-05-05):

### Round 1 — Critical UX Fixes
- 30-day money-back guarantee added
- VAT display: "ex VAT" → "+VAT" (pricing, calculator, FAQ, bundles)
- Testimonials badge: "Verified Google Reviews · 5.0 Rating"
- "With Whoza?" green fix (#047857)
- Email-only signup form (was 3 fields)
- "White Glove AI" → "Extra Setup Support"
- Mobile responsive verified

### Round 2 — Copy & Positioning
- Reduced "early access" mentions from 20+ to ~13 strategic occurrences
- Team section label: "Meet Katie & The Team" → "Your AI Revenue Team"
- Team headline: "Meet the Team" → "Meet Katie, Mark, Claire & Rex"
- Updated team subtext to describe four AI specialists

### Round 3 — CSS Standardization
- Hero duplicate text fix (removed duplicate banner text)
- Added `.section-padding`, `.section-padding-lg`, `.section-padding-xl` utility classes
- Added `.card-base`, `.card-lg` for consistent cards
- Typography scale: H1=52px, H2=40px, H3=20px, H4=18px
- Gradient transitions: `.gradient-transition-light-to-dark`, `.gradient-transition-dark-to-light`
- Applied to: meet-the-team, testimonials, final-cta, calculator, comparison-table, faq, footer

### Round 4 — Pricing Page + Navigation
- Created `app/pricing/page.tsx` with full layout (Header, Pricing, ComparisonTable, FAQ, FinalCTA, Footer)
- Updated footer links: Pricing → `/pricing`, FAQ → `/pricing#faq`
- Updated header nav: Pricing/FAQ navigate to `/pricing` page (not smooth-scroll anchors)
- Homepage anchors (`#how-it-works`, `#team`, `#testimonials`) still smooth-scroll correctly
- Links work from any page (privacy, terms, etc.)

## Staging site:
**https://whoza-ai-staging-349.netlify.app**

## Files modified today:
- `app/globals.css` — CSS utilities
- `app/pricing/page.tsx` — NEW pricing page
- `components/whoza/comparison-table.tsx` — Section padding
- `components/whoza/faq.tsx` — Section padding, gradient
- `components/whoza/final-cta.tsx` — Section padding, gradient
- `components/whoza/footer.tsx` — Section padding, link updates
- `components/whoza/header.tsx` — Link updates, isPageLink logic
- `components/whoza/hero.tsx` — Duplicate text fix
- `components/whoza/lost-revenue-calculator.tsx` — Section padding, card
- `components/whoza/meet-the-team.tsx` — Section padding, gradient
- `components/whoza/pricing.tsx` — Pricing component
- `components/whoza/testimonials.tsx` — Section padding, card
- Plus 8 other component files

## Verification status:
- ✅ Homepage loads correctly
- ✅ `/pricing` page loads with all cards, comparison table, FAQ
- ✅ `/privacy` footer links navigate correctly
- ✅ Zero console errors
- ✅ Mobile view functional
- ✅ All CSS loading correctly

## Remaining audit items (blocked — need Dru input):
- Specific launch date for FAQ answers
- Video testimonial (need actual video)
- Trade-specific testimonial metadata (real Google reviews — can't fabricate)
- Interactive "Simulate a Call" demo (complex feature)
- Card shadow inconsistencies (some hover, some don't)
- Dark section consistency (audio-demo is only dark navy section)
- Form field standardization

## Ready for production deploy: YES

## Build command:
```bash
cd /root/.openclaw/workspace/whoza-ai-v0 && npx next build
```

## Deploy command:
```bash
cd /root/.openclaw/workspace/whoza-ai-v0 && NETLIFY_AUTH_TOKEN=nfp_6hyBaDqk23yU7pyREfQ3BgEEiZpDomLq78a5 netlify deploy --site 97f8a30c-8ba7-4e98-aef4-cfee00eb91dd --prod --dir=.next
```
