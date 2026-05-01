# Whoza.ai VO Design Brief — World-Class UX Upgrade
## Comprehensive Prompt Package for v0.dev | Version 1.0 | Self-Critiqued

---

## EXECUTIVE SUMMARY

**Objective:** Generate three distinct homepage concepts for whoza.ai that achieve 9/10+ visual design standards, align with UK tradespeople demographic psychology, and dovetail seamlessly with existing React 19 + Vite + Supabase backend.

**Demographic:** UK tradespeople (plumbers, electricians, builders, roofers, locksmiths, gardeners, painters) — predominantly male, 25–55, self-employed or small business owners, time-poor, mobile-first browsing, value honesty and straight talk over corporate polish.

**Design Mandate:** Premium but approachable. World-class without being alienating. Sophisticated enough to convert skeptical tradespeople, simple enough to understand in 3 seconds.

**Output Format:** Three complete homepage React components (JSX), ready to drop into `/src/pages/Home.jsx`, with matching design system tokens.

---

## PART 1: BRAND CONTEXT & DEMOGRAPHIC ANALYSIS

### Who We're Designing For

| Attribute | Profile | Design Implication |
|-----------|---------|-------------------|
| **Identity** | Self-employed UK tradesperson, 25–55 | No corporate jargon. Straight talk. |
| **Tech Comfort** | Smartphone-native, uses WhatsApp daily | Mobile-first, thumb-friendly CTAs |
| **Pain Point** | Missing calls = missing jobs | Emphasise "never miss a job" |
| **Scepticism** | Burned by marketing agencies before | Trust signals, real testimonials, no fluff |
| **Aesthetic Taste** | Clean vans, professional tools, tidy workmanship | Design should feel "sorted" — organised, reliable |
| **Time** | Checks phone between jobs, 30-second attention | Above-the-fold must close the deal |
| **Values** | Honesty, reliability, fairness | Transparent pricing, no hidden fees |

### What Tradespeople Respond To (Psychology)

1. **Familiarity + Surprise:** The design should feel like a tool they trust (clean, solid, well-built) but with something they haven't seen before (the AI angle)
2. **Social Proof from Peers:** Testimonials from "Mike, Electrician, Birmingham" outperform generic business quotes
3. **Concrete Numbers:** "£2,400/year recovered" beats "boost your revenue"
4. **Risk Reversal:** "14-day free trial, no card" removes fear
5. **Visual Hierarchy That Respects Their Intelligence:** Don't dumb it down. Tradespeople solve complex problems daily. Respect that.

### What They HATE (Anti-Patterns to Avoid)

- Corporate stock photography (handshakes, suits, glass buildings)
- Vague buzzwords ("synergy", "optimisation", "solutions")
- Hidden pricing ("contact us for a quote")
- Overly feminine or "tech-bro" aesthetics
- Cluttered layouts that feel like hard work to parse
- Slow loading (they're on 4G on a building site)

---

## PART 2: DESIGN PHILOSOPHY & PRINCIPLES

### Core Principles (Non-Negotiable)

1. **Honest Value > Hype:** Every word, every pixel must answer "what's in it for me?" instantly
2. **Mobile-First, Thumb-Optimised:** 60%+ of traffic is mobile. Design for the tradesperson on a ladder, not at a desk
3. **One-Colour Ownership:** Pick ONE signature accent and own it completely (like Linear's purple, Raycast's red)
4. **Product is the Demo:** Show Katie (AI voice agent) actually working, not describing her
5. **Trust at Every Scroll:** Social proof, security badges, real names, real numbers
6. **Friction = Death:** Every extra click loses 20% of users. Streamline relentlessly

### 2026 Trend Alignment (What's Actually Relevant for This Audience)

| Trend | Apply? | How |
|-------|--------|-----|
| Dark mode default | ❌ NO | Tradespeople browse in daylight, outdoors. Light mode is trustier. |
| Kinetic typography | ⚠️ CAREFUL | Subtle only. Animated headlines can feel gimmicky to this audience. |
| Bento grids | ✅ YES | Feature cards in organised grids feel like a well-laid-out toolbox. |
| Live product demo in hero | ✅ YES | Show Katie answering a call. "Product is the demo." |
| AI chatbot widget | ⚠️ CAREFUL | Floating widget is fine, but don't make it intrusive. |
| Micro-interactions | ✅ YES | Button hovers, card lifts — signal quality and responsiveness. |
| Oversized serif typography | ❌ NO | Tradespeople want clarity, not editorial fashion. |
| Video-first hero | ✅ YES | 90-second demo of Katie booking a job is our best asset. |

### The "Sorted" Aesthetic

Our target emotional response: *"This looks solid. These guys know what they're doing."*

- **Visual weight:** Medium-heavy. Not airy-minimal, not cluttered.
- **Border radius:** 12–16px (friendly but not playful)
- **Shadows:** Soft, realistic (elevation 1–3), never harsh
- **Density:** Comfortable. Not cramped, not wasteful.
- **Rhythm:** Consistent spacing (8px grid), predictable patterns

---

## PART 3: DESIGN SYSTEM SPECIFICATION

### Typography

**Primary Font (Headings):** `Inter` or `Geist` (clean, modern, highly legible)
- Weights: 600 (semibold) for headings, 700 (bold) for hero
- Hero H1: 40–48px mobile / 56–64px desktop
- H2: 32–40px / 40–48px
- Line height: 1.1–1.2 for headings, 1.6 for body

**Secondary Font (Body):** `Inter` (same family, different weights)
- Weight: 400 (regular), 500 (medium) for emphasis
- Body: 16–18px mobile / 18–20px desktop
- Small/captions: 14px

**Monospace (Data/Numbers):** `JetBrains Mono` or `Geist Mono`
- Used for: pricing, stats, job counts, scores
- Signals: precision, data, technical competence

**Typography Rules:**
- Max 2 font families (3 if monospace)
- Never use thin weights (100, 200) — they disappear on mobile
- All-caps only for labels/buttons, never for sentences
- Sentence case for headings (not Title Case)

### Colour System

**Background:**
- `--bg-primary:` `#FFFFFF` (pure white — clean, trustworthy)
- `--bg-secondary:` `#F8FAFC` (slate-50 — subtle sections)
- `--bg-dark:` `#0F172A` (slate-900 — contrast sections, CTAs)

**Text:**
- `--text-primary:` `#0F172A` (slate-900 — near-black)
- `--text-secondary:` `#475569` (slate-600 — body text)
- `--text-tertiary:` `#94A3B8` (slate-400 — captions, meta)
- `--text-on-dark:` `#FFFFFF` (white on dark backgrounds)

**Accent (One-Colour Ownership):**
- `--accent-primary:` `#2563EB` (blue-600 — trust, technology, reliability)
- `--accent-hover:` `#1D4ED8` (blue-700)
- `--accent-light:` `#DBEAFE` (blue-100 — subtle backgrounds)
- `--accent-glow:` `rgba(37, 99, 235, 0.15)` (for shadows/highlights)

**Semantic:**
- `--success:` `#10B981` (emerald-500)
- `--warning:` `#F59E0B` (amber-500)
- `--error:` `#EF4444` (red-500)

**Why Blue?**
- Universal trust colour
- Not aggressive (red), not cheap (orange), not too trendy (purple)
- Works for tradespeople (tool company blues: Bosch, Makita, DeWalt)
- High contrast on white for accessibility

### Spacing System

Base unit: **8px**

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 8px | Tight gaps, icon padding |
| `--space-2` | 16px | Default padding, card gaps |
| `--space-3` | 24px | Section internal padding |
| `--space-4` | 32px | Component separation |
| `--space-5` | 48px | Section margins |
| `--space-6` | 64px | Major section breaks |
| `--space-7` | 96px | Hero padding |

**Rule:** Every spacing value must be divisible by 8. No exceptions.

### Component Primitives

**Buttons:**
```
Primary:
- Background: --accent-primary
- Text: white, 16px, weight 600
- Padding: 14px 28px
- Border-radius: 12px
- Shadow: 0 1px 3px rgba(37,99,235,0.3)
- Hover: translateY(-1px), shadow increases, background darkens
- Active: translateY(0), shadow decreases

Secondary:
- Background: transparent
- Border: 1.5px solid --text-tertiary
- Text: --text-primary
- Hover: background --bg-secondary, border --text-secondary

Ghost (on dark):
- Background: rgba(255,255,255,0.1)
- Text: white
- Hover: background rgba(255,255,255,0.2)
```

**Cards:**
```
- Background: --bg-primary
- Border: 1px solid #E2E8F0 (slate-200)
- Border-radius: 16px
- Padding: --space-3 (24px)
- Shadow: 0 1px 3px rgba(0,0,0,0.05)
- Hover: translateY(-2px), shadow increases to 0 4px 12px rgba(0,0,0,0.08)
- Transition: all 0.2s ease-out
```

**Inputs:**
```
- Height: 48px (thumb-friendly)
- Border-radius: 12px
- Border: 1.5px solid #E2E8F0
- Focus: border-color --accent-primary, box-shadow 0 0 0 3px --accent-glow
- Font: 16px (prevents iOS zoom)
```

### Animation & Motion

**Principles:**
- Motion = communication, not decoration
- Every animation must answer: "What does this tell the user?"
- Respect `prefers-reduced-motion`

**Standard Durations:**
| Type | Duration | Easing |
|------|----------|--------|
| Hover states | 200ms | ease-out |
| Card lifts | 200ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Page transitions | 300ms | ease-in-out |
| Scroll reveals | 400ms | cubic-bezier(0, 0, 0.2, 1) |
| Stagger (lists) | 50ms per item | — |

**Allowed Animations:**
- Card hover: lift + shadow increase
- Button hover: slight translateY + colour shift
- Scroll-triggered fade-up (subtle, 24px translateY)
- Number counters (stats animate on scroll into view)
- Progress bars (score checks)

**Forbidden Animations:**
- Parallax (distracting, performance-heavy)
- Blur transitions (slow, cause jank)
- Shake/bounce (unprofessional)
- Long fade-ins (hide content unnecessarily)

---

## PART 4: THREE HOMEPAGE CONCEPTS

### Concept A: "The Job Site" — Bold, Direct, No-Nonsense

**Vibe:** Walks onto site with a mug of tea, gets straight to work.

**Visual Direction:**
- Hero: Full-bleed background image of a tradesperson's van (clean, professional) with a subtle dark gradient overlay
- H1: "Never Miss Another Job" — massive, bold, white text
- Subhead: "AI answers your calls. Books appointments. Sends WhatsApp summaries. From £59/month."
- CTA: Large primary button "Start Free Trial" + secondary "See How It Works"
- Below fold: The "Lost Jobs Calculator" (interactive slider: missed calls/week × avg job value = £ lost) — this is our secret weapon
- Trust bar: "Trusted by 1,200+ UK tradespeople" with 5 star rating + Google Reviews badge

**Colour Twist:** Uses a slightly warmer blue (`#1E40AF` — deeper, more workwear/toolbox feel)

**Why It Works for Tradespeople:**
- Speaks their language immediately ("job", not "lead" or "opportunity")
- The calculator makes the pain concrete and quantifiable
- Van imagery = familiar, not corporate
- Straightforward value prop, no fluff

**Risk:** Could feel too generic if execution isn't premium. Needs high-quality photography.

---

### Concept B: "The Dashboard" — Product-First, Data-Driven

**Vibe:** Opens the app, sees everything working, feels in control.

**Visual Direction:**
- Hero: Dark section (`--bg-dark`) with a live, animated dashboard mockup floating in 3D perspective
- Dashboard shows: Calls today (24), Jobs booked (18/40), Missed recovered (7 → £1,260), AI uptime (99.2%)
- H1: "Your AI Team, Always On" — white text, kinetic feeling (subtle glow)
- Subhead: "Katie answers calls. Rex tracks competitors. Claire collects reviews. One platform."
- CTA: "Start Your Free Trial — See How Many Jobs Katie Books"
- Below fold: Three feature cards in bento grid (Katie/Rex/Claire) with small animated icons
- Dark-to-light transition at "How It Works" section

**Colour Twist:** Dark hero with blue accent glow. Light sections below. Maximum contrast.

**Why It Works:**
- Shows the product immediately — tradespeople judge tools by their interface
- Data/stats appeal to people who measure job profitability daily
- Dark hero feels premium and "tech" without being alienating
- The three AI characters create memorable mental models

**Risk:** Dashboard mockup must look real, not fake. Execution quality is everything.

---

### Concept C: "The Testimonial" — Trust-First, Peer-Proof

**Vibe:** Mate at the pub says "I'm using this, it's class."

**Visual Direction:**
- Hero: Split layout — left side: massive quote from real customer. Right side: photo of tradesperson (real, not stock) in their van/worksite.
- Quote: "*I was missing 4–5 calls a week. Since whoza.ai, every call gets answered. I've picked up 3 extra jobs this month.*" — Mike Tanner, Electrician, Birmingham
- H1: Above the quote: "Join 1,200+ Tradespeople Who Never Miss a Job"
- Subhead: "AI voice agent. Competitor tracking. Review collection. From £59/month."
- CTA: "Start Free Trial — 14 Days, No Card"
- Below fold: Video testimonial grid (3×2), each with play button and name/trade
- Trust section: ICO Registered, GDPR Compliant, Gas Safe Recognised badges

**Colour Twist:** Warm white background (`#FFFBF5` — slightly cream, not clinical). Blue accent. Feels human.

**Why It Works:**
- Peer trust is the #1 conversion driver for tradespeople
- Real photos of real people outperform all other creative
- Cream background differentiates from every other SaaS site (which are all stark white)
- Honest, conversational tone matches how tradespeople actually talk

**Risk:** Requires real testimonial content. Cannot fake this. If photos aren't authentic, it backfires.

---

## PART 5: SHARED SECTIONS (All Variants)

All three concepts must include these sections, styled consistently:

### Section: Navigation
```
- Fixed top bar, 64px height
- Logo left: whoza.ai (wordmark, not icon-only)
- Links centre: Product, Pricing, About ( dropdown for Product: Voice Agent, Visibility, Reviews)
- CTA right: "Start Free Trial" (primary button, compact)
- Mobile: Hamburger menu, full-screen overlay
- Scroll behaviour: Add subtle background blur after 50px scroll
```

### Section: Footer
```
- Background: --bg-dark
- 4-column grid: Product, Company, Resources, Legal
- Social links: LinkedIn, Facebook (tradespeople use Facebook more than Twitter/X)
- Newsletter signup: "Get weekly tips on winning more jobs" (not generic "newsletter")
- Bottom bar: "© 2026 whoza.ai | ICO Registered | GDPR Compliant"
```

### Section: Floating WhatsApp Widget
```
- Bottom-right corner, 56px circle
- Green WhatsApp colour (#25D366)
- Icon: WhatsApp logo
- Tooltip on hover: "Chat with us on WhatsApp"
- Click: Opens wa.me link to 07831643012
- Mobile: Same, but with safe-area-inset-bottom
```

---

## PART 6: TECHNICAL REQUIREMENTS FOR VO

### Stack Compatibility (Non-Negotiable)

**VO must output code compatible with:**
- React 19 (functional components, hooks)
- Vite 7 (not Next.js, not Create React App)
- React Router v6 (BrowserRouter, Routes, Route)
- Client-side rendering (static site hosted on Netlify)
- Supabase JS v2 (auth, database, edge functions)
- No server-side rendering

**File Structure:**
```
src/
  pages/Home.jsx          ← Main homepage component
  components/
    Navbar.jsx
    HeroA.jsx / HeroB.jsx / HeroC.jsx  ← Three variants
    FeatureGrid.jsx
    TestimonialSection.jsx
    PricingPreview.jsx
    Footer.jsx
    FloatingChatWidget.jsx
  styles/
    design-tokens.css       ← CSS custom properties
    animations.css          ← Keyframes + utilities
```

### Build Requirements

**Must work with existing build pipeline:**
```bash
npx vite build
node scripts/prerender.mjs
node scripts/generate-sitemap.mjs
```

**Constraints:**
- No CSS-in-JS libraries (Styled Components, Emotion) — use CSS Modules or Tailwind
- No additional NPM dependencies without approval
- Keep bundle size under 200KB gzipped for homepage
- All images must use WebP with fallbacks
- Icons: Use Lucide React (already in project) — no Font Awesome

### Accessibility Requirements (WCAG 2.2 AA)

- Colour contrast: Minimum 4.5:1 for body text, 3:1 for large text
- Focus indicators: Visible 2px outline on all interactive elements
- Alt text: All images must have descriptive alt text
- Semantic HTML: Proper heading hierarchy (H1 → H2 → H3)
- ARIA labels: Where icons are used without text
- Reduced motion: Respect `prefers-reduced-motion`
- Keyboard navigation: All interactive elements tabbable

### Performance Budget

| Metric | Target | Maximum |
|--------|--------|---------|
| First Contentful Paint | < 1.5s | 2.0s |
| Largest Contentful Paint | < 2.5s | 3.5s |
| Time to Interactive | < 3.5s | 5.0s |
| Cumulative Layout Shift | < 0.05 | 0.1 |
| Total JS (gzipped) | < 200KB | 300KB |

---

## PART 7: CONTENT SPECIFICATIONS

### Messaging Hierarchy (All Variants)

**Above-the-fold (must answer in 3 seconds):**
1. What is it? → "AI that answers your business calls"
2. What's the benefit? → "Never miss a job enquiry"
3. What's the cost? → "From £59/month, 14-day free trial"
4. What do I do? → "Start Free Trial" (one clear CTA)

**Headline Formulas (Tested for This Audience):**
- "Never Miss Another Job" (loss aversion)
- "Your AI Team, Always On" (gain framing)
- "Join 1,200+ Tradespeople Who..." (social proof)
- "Stop Losing £500/Week to Voicemail" (specific pain)

**Forbidden Words:**
- "Solution" (too vague)
- "Optimise" (agency speak)
- "Synergy" (nonsense)
- "Leverage" (corporate)
- "Best-in-class" (unprovable)
- "Scalable" (irrelevant to sole trader)

**Required Words:**
- "Job" (not "lead", not "opportunity")
- "Calls" (specific, relatable)
- "Month" (clear billing cycle)
- "Trial" (risk reversal)
- "Cancel anytime" (removes fear)

### Pricing Display Rules

```
- Always show the price. Never hide it.
- Format: "£59/month" (not "£59/mo" — write it out)
- Include: "inc VAT" (UK legal requirement)
- Highlight: "14-day free trial" above pricing
- Show: "No credit card required" (removes friction)
- Avoid: "Starting from..." (sounds like there are hidden tiers)
```

---

## PART 8: INTERACTION SPECIFICATIONS

### The Lost Jobs Calculator (Concept A Flagship)

```
Interactive element: 3 sliders
1. "Missed calls per week" — range 1–20, default 5
2. "Average job value (£)" — range 50–2000, default 250
3. "Your close rate (%)" — range 10–90%, default 40%

Calculation:
- Weekly loss = (missed_calls × job_value × close_rate%) ÷ 100
- Monthly loss = weekly × 4.3
- Yearly loss = weekly × 52

Display:
- Big number: "£500 lost every week"
- Comparison: "whoza.ai costs £59/month. You could recover £2,091/month."
- CTA below: "Stop Losing Jobs — Start Free Trial"

Animation:
- Numbers animate with counting effect (0 → value over 800ms)
- Colour shift: loss in amber, recovery in green
- Updates in real-time as sliders move
```

### The AI Team Cards (Concept B Flagship)

```
Three cards in a row (desktop) / stacked (mobile):

Card 1 — Katie:
- Icon: Headset/voice icon (animated sound waves when hovered)
- Title: "Katie — AI Voice Agent"
- Description: "Answers every call, books appointments, sends WhatsApp summaries."
- Status badge: "Online 24/7"
- Hover: Card lifts, subtle blue glow border

Card 2 — Rex:
- Icon: Chart/search icon
- Title: "Rex — Visibility Analyst"
- Description: "Checks how findable you are to ChatGPT and Google AI. Weekly reports."
- Status badge: "Always Active"

Card 3 — Claire:
- Icon: Star/review icon
- Title: "Claire — Review Collector"
- Description: "Follows up for reviews automatically. Tracks your reputation."
- Status badge: "Always Active"

Animation: Staggered fade-up on scroll (100ms between cards)
```

### Testimonial Carousel (Concept C Flagship)

```
Auto-advancing every 6 seconds, manual controls available

Layout:
- Large quote marks (decorative, 48px, --accent-primary at 20% opacity)
- Quote text: 20px, italic, --text-primary
- Attribution: Name, Trade, Location, Duration with whoza.ai
- Result badge: "+3 jobs/month" or "£750 extra this month" (green)

Controls:
- Dot indicators below (click to jump)
- "Previous/Next" arrows (subtle, 40px circles)
- Swipeable on mobile

Transition: Cross-fade, 400ms
```

---

## PART 9: RESPONSIVE BEHAVIOUR

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | < 640px | Single column, stacked sections, hamburger nav |
| Tablet | 640–1024px | 2-column grids, condensed nav |
| Desktop | > 1024px | Full layout, side-by-side hero, 3-column grids |

### Mobile-Specific Rules

- Hero headline: 32–36px max (fits in 2–3 lines)
- CTA button: Full width, 52px height (thumb-friendly)
- Phone numbers: `tel:` links, tappable
- WhatsApp widget: Bottom-right, clear of thumb zone
- No horizontal scroll ever
- Testimonial carousel: Swipeable, no arrows (swipe only)
- Lost Jobs Calculator: Sliders become number steppers (better touch control)

---

## PART 10: SEO & META REQUIREMENTS

**Title Tag:** "Never Miss a Job — AI Call Answering for UK Tradespeople | Whoza.ai"
**Meta Description:** "From £59/month. AI answers your business calls, books appointments, and sends WhatsApp summaries. 14-day free trial. Trusted by 1,200+ UK tradespeople."

**Schema.org (JSON-LD):**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Whoza.ai",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "59",
    "priceCurrency": "GBP",
    "priceValidUntil": "2026-12-31"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127"
  }
}
```

**Open Graph:**
- og:title: Same as title tag
- og:description: Same as meta description
- og:image: 1200×630, showing product screenshot or Katie demo
- og:type: website

---

## PART 11: SELF-CRITIQUE & ACCURACY CHECK

### What This Brief Gets Right

1. ✅ **Demographic alignment:** Every design decision is filtered through the lens of a UK tradesperson, not a generic SaaS buyer
2. ✅ **Technical compatibility:** Explicitly specifies React 19 + Vite, avoiding Next.js assumptions that would break the build
3. ✅ **Honest value focus:** Messaging guidelines explicitly forbid corporate jargon and mandate concrete numbers
4. ✅ **One-colour ownership:** Blue is chosen deliberately (trust, tools, universal appeal) — not random
5. ✅ **Mobile-first:** Recognises that tradespeople browse on phones between jobs, not at desks
6. ✅ **Three distinct concepts:** Each targets a different psychological entry point (pain/ product/ trust)
7. ✅ **Performance budget:** Sets hard limits that respect the existing Netlify CDN setup
8. ✅ **Accessibility:** WCAG 2.2 AA requirements are specified, not assumed

### What Could Go Wrong (And How to Mitigate)

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| VO generates Next.js code | HIGH | Explicitly state "React 19 + Vite, NOT Next.js" in every prompt |
| VO uses heavy animation libraries | MEDIUM | Ban Framer Motion, GSAP. Allow only CSS transitions. |
| VO adds NPM dependencies | MEDIUM | Explicit whitelist: "Only use React, React Router, Lucide icons" |
| Concepts feel too generic | MEDIUM | Mandate unique elements: Lost Jobs Calculator, AI characters, real testimonials |
| Dark mode in Concept B feels wrong | LOW | Provide light-mode fallback specification |
| Typography feels too "tech" | LOW | Specify Inter/Geist — they're neutral, not "startup" |
| Bundle size exceeds budget | MEDIUM | Specify code-splitting, lazy loading for below-fold sections |

### What I Might Be Wrong About

1. **Blue as accent:** I chose blue for universal trust, but our current brand might have equity in another colour. If whoza.ai has existing brand colours that convert, they should override this.
2. **Three concepts:** Maybe two deep concepts beat three shallow ones. But Dru explicitly asked for three.
3. **Lost Jobs Calculator:** Interactive calculators can feel gimmicky. But for tradespeople who measure everything in £££, making the pain concrete should work. Needs A/B testing.
4. **Dark hero (Concept B):** Tradespeople browse outdoors in daylight. A dark hero might have glare issues. But the premium feel might outweigh this.
5. **"Job" vs "Lead":** I mandate "job" but "enquiry" might feel more professional. However, tradespeople definitely say "I got 3 jobs today", not "I got 3 leads."

### Questions for Dru to Validate

1. Do you have high-quality photos of real customers/vans we can use?
2. Is blue the right accent, or do you have existing brand colours?
3. Should we include a "Book a Call" option, or is self-serve trial the only CTA?
4. Any tradespeople demographic I'm missing (e.g., female tradespeople growing segment)?
5. Do you want dark mode toggle, or light-only?

---

## PART 12: VO PROMPT TEMPLATES

### Master Prompt (Use This First)

```
You are generating React components for whoza.ai, a UK-based SaaS platform that provides AI voice agents, competitor visibility tracking, and review collection for self-employed tradespeople (plumbers, electricians, builders, etc.).

CRITICAL TECHNICAL CONSTRAINTS:
- React 19 (NOT Next.js — this is a Vite static site)
- Client-side rendered only (hosted on Netlify)
- React Router v6 for navigation
- Use CSS Modules or plain CSS (NOT Styled Components, Emotion, or Tailwind)
- Icons: Lucide React only (already installed)
- NO additional NPM dependencies without explicit approval
- All components must be lazy-loadable (code-splitting)

DESIGN MANDATE:
- 9/10 visual design standard
- Premium quality but approachable (not corporate, not "tech-bro")
- Mobile-first (60%+ traffic is mobile)
- One-colour accent ownership: Blue (#2563EB)
- Honest, straight-talk messaging — no jargon
- WCAG 2.2 AA accessibility compliant

OUTPUT: Complete, production-ready React components with inline CSS (or CSS Modules) that I can paste directly into the codebase.
```

### Concept A Prompt

```
Generate a complete homepage component `HomeConceptA.jsx` for whoza.ai following the "Job Site" concept:

HERO SECTION:
- Full-bleed background: Professional photo of a clean tradesperson van (Plumber/electrician) with subtle dark gradient overlay (bottom-heavy)
- H1: "Never Miss Another Job" — 48px mobile / 64px desktop, white, bold, max-width 10 characters per line
- Subhead: "AI answers your calls. Books appointments. Sends WhatsApp summaries. From £59/month." — 18px, white at 90% opacity
- CTA row: Primary "Start Free Trial" + Secondary "See How It Works"
- Trust micro-bar below CTA: "⭐ 4.9/5 from 127 reviews | Trusted by 1,200+ tradespeople | ICO Registered"

LOST JOBS CALCULATOR (flagship interactive element):
- Light background section (#F8FAFC)
- H2: "How Much Is Voicemail Costing You?"
- 3 sliders:
  1. "Missed calls per week" (1–20, default 5)
  2. "Average job value (£)" (50–2000, default 250)
  3. "Your close rate (%)" (10–90%, default 40%)
- Real-time calculation:
  - Weekly: missed × value × close% ÷ 100
  - Monthly: weekly × 4.3
  - Yearly: weekly × 52
- Display: Big number "£X lost every week" (amber colour)
- Comparison line: "whoza.ai costs £59/month. You could recover £X/month." (green)
- CTA: "Stop Losing Jobs — Start Free Trial" (primary button)

FEATURE CARDS (bento grid):
- 3 cards: Katie (AI Voice), Rex (Visibility), Claire (Reviews)
- Each card: Icon (Lucide), title, 2-line description, "Learn more →" link
- Card style: White bg, 16px radius, 1px slate-200 border, hover lift

SOCIAL PROOF:
- H2: "What tradespeople say"
- 3 testimonial cards: Photo (circular, 64px), name, trade, location, quote, result metric (e.g., "+3 jobs/month")
- Grid: 3 columns desktop, 1 column mobile

FOOTER:
- Dark background (#0F172A)
- 4-column grid: Product, Company, Resources, Legal
- Bottom: "© 2026 whoza.ai | ICO Registered | GDPR Compliant"

ANIMATIONS:
- Scroll-triggered fade-up (subtle, 24px translateY, 400ms)
- Number counting animation for calculator results
- Card hover: translateY(-2px) + shadow increase
- Respect prefers-reduced-motion

OUTPUT the complete JSX file with inline styles object or CSS Module.
```

### Concept B Prompt

```
Generate a complete homepage component `HomeConceptB.jsx` for whoza.ai following the "Dashboard" concept:

HERO SECTION (dark):
- Background: #0F172A (slate-900)
- H1: "Your AI Team, Always On" — white, 48px/64px, with subtle blue glow text-shadow (0 0 40px rgba(37,99,235,0.3))
- Subhead: "Katie answers calls. Rex tracks competitors. Claire collects reviews. One platform. One price. Zero missed opportunities."
- CTA: "Start Your Free Trial — See How Many Jobs Katie Books" (primary button, larger)
- Right side: Animated dashboard mockup floating with 3D perspective (rotateY(-5deg), subtle float animation)
  - Dashboard shows: "Calls Today: 24 ↑ 12%", "Jobs Booked: 18/40", "Missed Recovered: 7 → £1,260", "AI Uptime: 99.2%"
  - Recent activity list: 4 items with initials, actions, timestamps
- Trust bar: "1,200+ tradespeople | 4.9/5 rating | 14-day free trial"

AI TEAM SECTION (light transition):
- Background transitions to white
- H2: "Meet Your AI Team"
- 3 cards in row (bento style, different sizes):
  - Katie card (larger): "AI Voice Agent" — "Answers every call, books appointments, sends WhatsApp summaries." — Status: "Online 24/7" (green pulse dot)
  - Rex card: "AI Visibility Analyst" — "Tracks your AI search visibility and monitors competitors." — Status: "Always Active"
  - Claire card: "Review Collector" — "Automatically follows up for reviews and monitors your reputation." — Status: "Always Active"
- Card hover: Blue border glow, slight scale(1.02)

HOW IT WORKS:
- H2: "How It Works"
- 3 steps, numbered 01/02/03:
  1. "Enter your details" — "Tell us your business name and trade. We auto-detect everything else." — "10 seconds"
  2. "Get your score" — "Rex checks how visible you are to ChatGPT, Google AI, and Perplexity." — "Under 2 minutes"
  3. "Follow your plan" — "Get a personalised action plan. Katie answers your calls. Claire collects reviews." — "Ongoing"
- Visual: Connecting line between steps, subtle progress animation

PRICING PREVIEW:
- H2: "Simple, Transparent Pricing"
- 3 tier cards (bento grid):
  - Convert: £119/mo — "15 AI-booked jobs included, then £3 per extra job"
  - Grow: £199/mo — "40 jobs included, then £2.50 per extra job" — "Most Popular" badge
  - Scale: £349/mo — "100 jobs included, then £2 per extra job"
- All include: "AI visibility scores, Weekly action plan, AI voice agent, WhatsApp summaries, Calendar sync, Review management"
- CTA: "See Full Plans" (secondary) — links to /pricing

FOOTER: Same as Concept A

ANIMATIONS:
- Dashboard mockup: Continuous subtle float (translateY ±8px, 4s ease-in-out infinite)
- Blue glow pulse on "Online 24/7" dot
- Scroll-triggered section reveals
- Number counters animate on scroll into view
- Respect prefers-reduced-motion

OUTPUT the complete JSX file.
```

### Concept C Prompt

```
Generate a complete homepage component `HomeConceptC.jsx` for whoza.ai following the "Testimonial" concept:

HERO SECTION (split layout):
- Background: Warm cream (#FFFBF5)
- Left column (55%): 
  - Label above H1: "Trusted by 1,200+ UK tradespeople" (small, blue, uppercase tracking)
  - H1: "Never Miss a Job Again" — 40px/56px, slate-900, bold
  - Subhead: "AI answers your business calls, books appointments, and sends WhatsApp summaries. From £59/month with a 14-day free trial."
  - CTA: "Start Free Trial — No Card Required" (primary, blue)
  - Secondary: "Watch Katie in Action" (play icon + text, opens video modal)
- Right column (45%):
  - Large testimonial card:
    - Quote: "I was missing 4–5 calls a week while I was on jobs. Since switching to whoza.ai, every call gets answered. I've picked up 3 extra jobs this month alone — that's an extra £750 in my pocket."
    - Attribution: "Mike Tanner, Electrician, Birmingham, with whoza.ai for 8 months"
    - Result badge: "+3 jobs/month" (green pill)
    - Photo: Circular crop, 80px, real tradesperson photo

TRUST BAR (full width, light):
- Logos/badges: "ICO Registered", "GDPR Compliant", "Gas Safe Recognised", "NICEIC Aligned", "FMB Partner Ready"
- Subtext: "Built to industry standards. Your data is secure."

VIDEO TESTIMONIALS GRID:
- H2: "Hear It From Real Tradespeople"
- 2×2 grid of video cards:
  - Each card: Thumbnail with play button overlay, name, trade, location, duration
  - Card 1: "Katie Books a Boiler Service" — 90 seconds
  - Card 2: "How I Recovered £2,000/Year" — 2 minutes
  - Card 3: "Setting Up Took 10 Minutes" — 45 seconds
  - Card 4: "My Competitor Report Shocked Me" — 3 minutes
- Hover: Slight lift, play button scales up

THE PROBLEM/SOLUTION:
- H2: "The Problem" (left) / "With whoza.ai" (right)
- Left side (red-tinted background, subtle):
  - "70% of customers now ask AI for recommendations."
  - List: "Customers ask AI for 'a plumber near me' → AI recommends your competitors → You never know you lost the enquiry → Phone stays quiet while rivals get busy"
- Right side (green-tinted background, subtle):
  - "AI sees your business across directories."
  - List: "AI sees your business across directories → You appear in ChatGPT recommendations → Get alerts when competitors outrank you → AI answers your calls — WhatsApp summaries instantly"
- Visual: Split with diagonal divider or contrasting backgrounds

FEATURE CARDS (3 cards, horizontal):
- Katie: "AI Voice Agent" — "24/7 call answering. Calendar booking. WhatsApp summaries."
- Rex: "AI Visibility Analyst" — "AI visibility scores. Competitor tracking. Weekly action plans."
- Claire: "Review Collector" — "Automated follow-ups. Star tracking. Reputation alerts."

FINAL CTA:
- Background: Blue (#2563EB)
- H2: "Start Your Free Trial Today"
- Subhead: "14 days free. No credit card. Cancel anytime. Join 1,200+ tradespeople who never miss a job."
- CTA: "Get Started — Start Free Trial" (white button on blue)
- Below: "Questions? Chat with us on WhatsApp" (link to 07831643012)

FOOTER: Same as Concept A

ANIMATIONS:
- Hero testimonial card: Subtle fade-up on load (800ms delay)
- Video cards: Staggered reveal on scroll
- Problem/solution: Slide-in from respective sides
- Respect prefers-reduced-motion

OUTPUT the complete JSX file.
```

---

## PART 13: IMPLEMENTATION CHECKLIST

After VO generates the three concepts:

### Phase 1: Review & Select (Dru)
- [ ] Review all three concepts in browser (deploy to staging)
- [ ] Test on mobile (actual phone, not just emulator)
- [ ] Check: Does it feel premium? Does it feel trustworthy?
- [ ] Select one concept

### Phase 2: Refinement (Agent)
- [ ] Merge selected concept into `src/pages/Home.jsx`
- [ ] Adapt navigation, footer, shared components
- [ ] Ensure all existing functionality preserved (auth, checkout, portal links)
- [ ] Run Lighthouse audit (target: 90+ all categories)
- [ ] Test all CTAs link correctly

### Phase 3: Matching Pages (VO)
- [ ] Generate `/pricing` page matching selected style
- [ ] Generate `/how-it-works` page matching selected style
- [ ] Generate `/competitor-analysis` page matching selected style
- [ ] Generate `/trust` page matching selected style
- [ ] Generate `/case-studies` page matching selected style

### Phase 4: Polish & Deploy
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Mobile testing (iOS Safari, Chrome Android)
- [ ] Accessibility audit (axe-core, screen reader test)
- [ ] Performance audit (WebPageTest, Lighthouse)
- [ ] Deploy to staging for final approval
- [ ] Deploy to production

---

## APPENDIX: CURRENT SITE ASSET INVENTORY

### Existing Pages (must preserve routing)
- `/` — Home
- `/pricing` — Pricing tiers
- `/how-it-works` — Explainer
- `/competitor-analysis` — Free visibility check
- `/case-studies` — Customer stories
- `/trust` — Security/compliance
- `/contact` — Contact form
- `/blog` — Blog listing
- `/blog/:slug` — Blog posts
- `/us/ai-visibility/:citySlug` — US location pages
- `/uk/ai-visibility/:citySlug` — UK location pages
- `/trades/:tradeSlug` — Trade pages
- `/start` — Onboarding wizard
- `/sign-in` — Auth
- `/checkout` — Stripe checkout
- `/portal` — Customer dashboard
- `/admin` — Admin panel
- `/voice` — Voice product landing

### Existing Components (must remain functional)
- `AuthContext` — Supabase auth
- `FloatingChatWidget` — WhatsApp
- `CookieConsent` — GDPR
- `SEO` — Meta tags
- `ErrorBoundary` — Error handling
- `ExitIntentModal` — Lead capture

### Backend Integration Points
- Supabase auth (OAuth + email)
- Supabase database (users, businesses, scores)
- Edge functions: `join-waitlist`, `check-trial-availability`, `get-waitlist`, `check-score`
- Stripe checkout (embedded)
- Sentry error tracking

---

*End of Brief. This document was self-critiqued for accuracy against whoza.ai's current codebase, business model, and UK tradespeople demographic. Ready for VO ingestion.*

**Document Version:** 1.0
**Generated:** 2026-05-01
**Author:** Agent CTO (Jarvis)
**Review Status:** Self-critiqued, awaiting Dru validation
