# Whoza.ai VO Design Brief — World-Class UX Upgrade
## Comprehensive Prompt Package for v0.dev | Version 1.1 | FORENSICALLY AUDITED

---

## EXECUTIVE SUMMARY

**Objective:** Generate three distinct homepage design concepts for whoza.ai using the **existing component library**, achieving 9/10+ visual design standards, aligned with UK tradespeople demographic psychology, and dovetail seamlessly with the existing React 19 + Vite + Supabase backend.

**CRITICAL CONTEXT:** The current homepage (`src/pages/Home.jsx`) already contains all major components needed for all three concepts:
- `LostRevenueCalculator` (Concept A: "The Job Site")
- `DashboardPreview` (Concept B: "The Dashboard")
- `TestimonialCarousel` + `GoogleReviews` (Concept C: "The Testimonial")
- Plus: `NewHero`, `AudioDemoPlayer`, `MeetTheTeam`, `PricingTeaser`, `FAQAccordion`, `FinalCTA`, `StickyCTA`, `TrustBadgeBand`, `ComparisonTable`, `IntegrationLogoBand`, `SocialProofBand`, `StatsBand`, `ProblemSolution`, `HowItWorks`

**VO is NOT building from scratch.** VO is creating three distinct homepage *layouts* that **reorganise, restyle, and reprioritise** these existing components into three different visual narratives. Some new wrapper/styling components may be needed, but the core functionality and content already exists.

**Demographic:** UK tradespeople (plumbers, electricians, builders, roofers, locksmiths, gardeners, painters) — predominantly male, 25–55, self-employed or small business owners, time-poor, mobile-first browsing, value honesty and straight talk over corporate polish.

**Design Mandate:** Premium but approachable. World-class without being alienating. Sophisticated enough to convert skeptical tradespeople, simple enough to understand in 3 seconds.

**Output Format:** Three complete homepage React component files (`HomeConceptA.jsx`, `HomeConceptB.jsx`, `HomeConceptC.jsx`) that import and arrange existing components from `src/components/`, with new wrapper/layout components where needed. Must be ready to drop into `/src/pages/`.

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
3. **Three-Persona Colour System:** Katie (blue), Rex (green), Claire (amber) — this is a brand asset, not a bug
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

## PART 3: EXISTING DESIGN SYSTEM (MUST USE)

### ⚠️ CRITICAL: VO Must Use Existing CSS

**DO NOT create new CSS tokens or component classes.** The following design system already exists at `src/styles/design-system.css` and is actively used across the codebase.

### Typography (Already Defined)

**Fonts loaded:** Inter, JetBrains Mono, Space Grotesk (via Google Fonts in design-system.css)

| Token | Value | Usage |
|-------|-------|-------|
| `--font-heading` | `'Inter', system-ui, sans-serif` | Headings |
| `--font-body` | `'Inter', system-ui, sans-serif` | Body text |
| `--font-accent` | `'Space Grotesk', 'Inter', sans-serif` | Display numbers, accent text |
| `--font-mono` | `'JetBrains Mono', monospace` | Data, stats, code |
| `--text-hero` | `clamp(2rem, 5vw, 3.5rem)` | Hero H1 |
| `--text-h2` | `clamp(1.75rem, 3vw, 2.5rem)` | Section headings |
| `--text-h3` | `clamp(1.25rem, 2vw, 1.75rem)` | Card headings |
| `--text-body` | `1rem` (16px) | Body text |
| `--text-body-lg` | `1.125rem` (18px) | Lead paragraphs |
| `--text-sm` | `0.9375rem` (15px) | Small text |
| `--text-xs` | `0.875rem` (14px) | Captions |

### Colour System (Already Defined)

**Persona Colours (Brand Asset):**
| Token | Value | Owner |
|-------|-------|-------|
| `--katie-blue` | `#2563EB` | Katie — AI Voice Agent |
| `--katie-blue-dark` | `#1D4ED8` | Hover states |
| `--katie-blue-light` | `#DBEAFE` | Subtle backgrounds |
| `--katie-blue-glow` | `rgba(37, 99, 235, 0.15)` | Glow effects |
| `--rex-green` | `#059669` | Rex — Visibility Analyst |
| `--rex-green-dark` | `#047857` | Hover states |
| `--rex-green-light` | `#D1FAE5` | Subtle backgrounds |
| `--claire-amber` | `#D97706` | Claire — Review Collector |
| `--claire-amber-dark` | `#B45309` | Hover states |
| `--claire-amber-light` | `#FEF3C7` | Subtle backgrounds |

**Neutrals:**
| Token | Value | Usage |
|-------|-------|-------|
| `--navy-900` | `#0F172A` | Dark backgrounds, primary text |
| `--navy-800` | `#1E293B` | Cards, secondary dark |
| `--slate-500` | `#64748B` | Body text |
| `--slate-400` | `#94A3B8` | Captions, meta |
| `--slate-200` | `#E2E8F0` | Borders |
| `--slate-100` | `#F1F5F9` | Light backgrounds |
| `--white` | `#FFFFFF` | Primary background |
| `--off-white` | `#F8FAFC` | Section backgrounds |

### Component Classes (Already Defined — Use These)

**Buttons:**
```
.ds-btn           — Base button (48px min-height, flex center)
.ds-btn-primary  — Blue gradient, white text, shadow
.ds-btn-secondary — Transparent, navy border
.ds-btn-cta      — Full gradient blue
.ds-btn-lg       — Larger padding (56px min-height)
```

**Cards:**
```
.ds-card              — White bg, 16px radius, slate-200 border, shadow
.ds-card-dark         — Navy-800 bg, navy-700 border
.ds-card-persona-katie — Blue gradient top, light blue bg
.ds-card-persona-rex   — Green gradient top, light green bg
.ds-card-persona-claire — Amber gradient top, light amber bg
```

**Badges:**
```
.ds-badge         — Base pill badge
.ds-badge-green  — Green bg, green text
.ds-badge-amber  — Amber bg, amber text
.ds-badge-blue   — Blue bg, blue text
.ds-badge-navy   — Navy bg, white text
```

**Typography Utilities:**
```
.ds-heading-hero  — Hero H1 style
.ds-heading-2     — H2 style
.ds-heading-3     — H3 style
.ds-body          — Body text
.ds-body-lg       — Large body
.ds-caption       — Uppercase small label
.ds-mono          — Monospace numbers
```

**Layout Utilities:**
```
.ds-container     — Max-width 1200px, responsive padding
.ds-section       — Section padding (80–128px vertical)
.ds-section-sm    — Smaller section padding
.ds-reveal        — Scroll reveal (opacity 0 → 1, translateY 24px → 0)
```

**Animations (Already Defined):**
```
.ds-float           — Float animation (3s infinite)
.ds-float-delayed   — Float with delay (4s infinite)
.ds-score-pulse     — Pulse glow animation (2s infinite)
```

### Spacing System (Already Defined)

Base unit: **8px**

| Token | Value |
|-------|-------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |
| `--space-3xl` | 64px |
| `--space-4xl` | 96px |
| `--space-5xl` | 128px |

**Rule:** Use existing tokens. Every spacing value is already defined.

### Scroll Reveal System (Already Implemented)

`Home.jsx` already implements:
```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.ds-reveal').forEach((el) => observer.observe(el));
```

**Use `.ds-reveal` class on any element that should fade up on scroll.** Add `is-visible` is handled automatically.

### Reduced Motion (Already Handled)

```css
@media (prefers-reduced-motion: reduce) {
  .ds-reveal { opacity: 1; transform: none; transition: none; }
  .ds-float, .ds-float-delayed { animation: none; }
  .ds-btn:hover { transform: none; }
  .ds-card:hover { transform: none; }
}
```

---

## PART 4: EXISTING COMPONENTS INVENTORY

### Components VO Can Import and Reuse

All these components already exist at `src/components/`:

| Component | What It Does | Concepts Used In |
|-----------|-------------|------------------|
| `NewHero` | Hero section with headline, CTA, social proof | All |
| `LostRevenueCalculator` | Interactive calculator (missed calls × job value = £ lost) | A (flagship) |
| `DashboardPreview` | Animated dashboard mockup with stats | B (flagship) |
| `TestimonialCarousel` | Auto-advancing testimonials with photos | C (flagship) |
| `GoogleReviews` | Google Reviews widget with real reviews | C |
| `AudioDemoPlayer` | Voice demo player with transcript | All |
| `MeetTheTeam` | Katie/Rex/Claire cards with descriptions | All |
| `PricingTeaser` | 4-tier pricing cards (Capture/Convert/Grow/Scale) | All |
| `FAQAccordion` | Expandable FAQ items | All |
| `FinalCTA` | Bottom CTA section | All |
| `StickyCTA` | Fixed bottom banner on mobile | All |
| `TrustBadgeBand` | ICO/GDPR/Gas Safe badges | All |
| `ComparisonTable` | Competitor comparison table | All |
| `IntegrationLogoBand` | Tool integration logos | All |
| `SocialProofBand` | User count + rating badge | All |
| `StatsBand` | Key metrics (1,200+ users, 4.9/5, etc.) | All |
| `ProblemSolution` | Before/after comparison | All |
| `HowItWorks` | 3-step process | All |
| `Header` | Navigation bar | All |
| `Footer` | Site footer | All |
| `FloatingChatWidget` | WhatsApp widget | All |
| `SEO` | Meta tags, schema.org | All |

### How to Use Existing Components

**Import pattern:**
```javascript
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewHero from '../components/NewHero';
import LostRevenueCalculator from '../components/LostRevenueCalculator';
import DashboardPreview from '../components/DashboardPreview';
import TestimonialCarousel from '../components/TestimonialCarousel';
import GoogleReviews from '../components/GoogleReviews';
import AudioDemoPlayer from '../components/AudioDemoPlayer';
import MeetTheTeam from '../components/MeetTheTeam';
import PricingTeaser from '../components/PricingTeaser';
import FAQAccordion from '../components/FAQAccordion';
import FinalCTA from '../components/FinalCTA';
import StickyCTA from '../components/StickyCTA';
import TrustBadgeBand from '../components/TrustBadgeBand';
import ComparisonTable from '../components/ComparisonTable';
import IntegrationLogoBand from '../components/IntegrationLogoBand';
import SocialProofBand from '../components/SocialProofBand';
import StatsBand from '../components/StatsBand';
import ProblemSolution from '../components/ProblemSolution';
import HowItWorks from '../components/HowItWorks';
import SEO from '../components/SEO';
import FloatingChatWidget from '../components/FloatingChatWidget';
```

**Important:** These components may need **props or wrapper divs** for styling variations. VO should create thin wrapper components (e.g., `HeroWrapperA.jsx`) if needed, not duplicate component logic.

---

## PART 5: THREE HOMEPAGE CONCEPTS

### Concept A: "The Job Site" — Bold, Direct, No-Nonsense

**Vibe:** Walks onto site with a mug of tea, gets straight to work.

**Hero Priority:** `NewHero` with full-bleed background image of a clean tradesperson van with dark gradient overlay.

**Section Order:**
1. `Header`
2. `NewHero` — H1: "Never Miss Another Job", subhead with price, CTA row
3. `SocialProofBand` + `StatsBand` — Trust micro-bar
4. `LostRevenueCalculator` — **FLAGSHIP:** This is the hero below-the-fold. Full section, prominent.
5. `ProblemSolution` — Before/after
6. `MeetTheTeam` — Katie/Rex/Claire cards (bento grid style)
7. `AudioDemoPlayer` — "Hear Katie in Action"
8. `PricingTeaser` — Simple pricing cards
9. `TestimonialCarousel` — 3 key testimonials
10. `FAQAccordion`
11. `FinalCTA`
12. `Footer`
13. `FloatingChatWidget` + `StickyCTA`

**Visual Direction:**
- Light mode dominant
- Lost Jobs Calculator is the star — big, bold numbers, amber for loss, green for recovery
- Use existing `.revenue-calculator-section` CSS
- Testimonial cards: `.ds-card` with `.testimonial-metric` badges

---

### Concept B: "The Dashboard" — Product-First, Data-Driven

**Vibe:** Opens the app, sees everything working, feels in control.

**Hero Priority:** `NewHero` but with `DashboardPreview` as the dominant visual element.

**Section Order:**
1. `Header`
2. `NewHero` — H1: "Your AI Team, Always On". Right side: `DashboardPreview` floating in 3D perspective.
3. `SocialProofBand` — "1,200+ tradespeople | 4.9/5 | 14-day free trial"
4. `MeetTheTeam` — **FLAGSHIP:** Three AI persona cards as bento grid, prominently featured. Use `.ds-card-persona-katie`, `.ds-card-persona-rex`, `.ds-card-persona-claire`
5. `HowItWorks` — 3 steps with connecting line
6. `DashboardPreview` — Full-width version with more detail
7. `AudioDemoPlayer` — Live demo of Katie booking
8. `PricingTeaser` — Bento grid pricing cards
9. `ComparisonTable` — vs competitors
10. `TestimonialCarousel` — Brief, 2 testimonials
11. `TrustBadgeBand` — ICO/GDPR badges
12. `FAQAccordion`
13. `FinalCTA`
14. `Footer`
15. `FloatingChatWidget` + `StickyCTA`

**Visual Direction:**
- Dark hero section (`--navy-900` gradient), light below
- `DashboardPreview` is the star — animated, floating, data-rich
- Persona cards with colour-coded tops (blue/green/amber)
- Use existing `.ds-card-persona-*` classes

---

### Concept C: "The Testimonial" — Trust-First, Peer-Proof

**Vibe:** Mate at the pub says "I'm using this, it's class."

**Hero Priority:** Split layout — left: value prop, right: massive testimonial card with real photo.

**Section Order:**
1. `Header`
2. `NewHero` — Split: Left = H1 + subhead + CTA. Right = Large testimonial card (Mike Tanner) with `.testimonial-metric` badge
3. `TrustBadgeBand` — ICO/GDPR/Gas Safe/NICEIC/FMB badges
4. `TestimonialCarousel` — **FLAGSHIP:** Prominent, large cards, auto-advancing
5. `GoogleReviews` — Real Google reviews widget
6. `ProblemSolution` — Before/after with real quotes
7. `AudioDemoPlayer` — Video testimonials grid (2×2)
8. `MeetTheTeam` — Brief AI team intro
9. `LostRevenueCalculator` — Embedded, smaller
10. `PricingTeaser`
11. `FAQAccordion`
12. `FinalCTA` — "Join 1,200+ tradespeople who never miss a job"
13. `Footer`
14. `FloatingChatWidget` + `StickyCTA`

**Visual Direction:**
- Warm background (`--off-white` or slight cream tint)
- Testimonials are the star — large photos, real names, specific outcomes
- Use existing `.testimonial-card`, `.testimonial-avatar`, `.testimonial-metric` CSS
- Google Reviews widget prominently placed

---

## PART 6: TECHNICAL REQUIREMENTS FOR VO

### Stack Compatibility (Non-Negotiable)

**VO must output code compatible with:**
- React 19 (functional components, hooks)
- Vite 7 (not Next.js, not Create React App)
- React Router v7 (BrowserRouter, Routes, Route, useNavigate)
- Client-side rendering (static site hosted on Netlify)
- Supabase JS v2 (auth, database, edge functions)
- No server-side rendering

### Animation Stack (Already Installed)

**Framer Motion is already installed (`"framer-motion": "^12.26.2"`). VO may use it for:**
- Scroll-triggered animations (`motion.div` with `whileInView`)
- Staggered reveals (`staggerChildren`)
- Hover micro-interactions (`whileHover`, `whileTap`)
- Page transitions (`AnimatePresence`)

**CSS Animations (already in design-system.css):**
- `.ds-reveal` — Scroll fade-up (use IntersectionObserver + `is-visible` class)
- `.ds-float` — Continuous float animation
- `.ds-score-pulse` — Pulse glow

**Rule:** Use the **simplest tool** for the job. CSS for simple hover states, framer-motion for scroll-triggered or staggered effects.

### Styling Approach

**Primary:** Use existing CSS classes from `src/styles/design-system.css`
- `.ds-btn`, `.ds-card`, `.ds-heading-hero`, `.ds-reveal`, etc.

**Secondary:** Component-scoped styles using `<style jsx>` (existing pattern in `FloatingChatWidget.jsx`)

**Avoid:** Creating new global CSS files unless necessary for concept-specific styles.

### File Structure

```
src/
  pages/
    HomeConceptA.jsx     ← Concept A homepage
    HomeConceptB.jsx     ← Concept B homepage
    HomeConceptC.jsx     ← Concept C homepage
  components/
    Header.jsx           ← EXISTING — use as-is
    Footer.jsx           ← EXISTING — use as-is
    NewHero.jsx          ← EXISTING — may need props for variants
    LostRevenueCalculator.jsx  ← EXISTING
    DashboardPreview.jsx       ← EXISTING
    TestimonialCarousel.jsx    ← EXISTING
    ... (all other existing components)
    wrappers/
      HeroWrapperA.jsx   ← NEW — thin wrapper for Concept A hero styling
      HeroWrapperB.jsx   ← NEW — thin wrapper for Concept B hero styling
      HeroWrapperC.jsx   ← NEW — thin wrapper for Concept C hero styling
```

### Build Requirements

**Must work with existing build pipeline:**
```bash
npx vite build
node scripts/prerender.mjs
node scripts/generate-sitemap.mjs
```

**Constraints:**
- No additional NPM dependencies without approval
- Keep bundle size under 200KB gzipped for homepage
- All images must use WebP with fallbacks
- Icons: Use Lucide React (already installed) — no Font Awesome

### Accessibility Requirements (WCAG 2.2 AA)

- Colour contrast: Minimum 4.5:1 for body text, 3:1 for large text
- Focus indicators: Visible 2px outline on all interactive elements
- Alt text: All images must have descriptive alt text
- Semantic HTML: Proper heading hierarchy (H1 → H2 → H3)
- ARIA labels: Where icons are used without text
- Reduced motion: Respect `prefers-reduced-motion` (already handled in design-system.css)
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

### Real Testimonial Data (Already in Codebase)

These are the actual testimonials from `TestimonialCarousel.jsx`. VO must use real data, not placeholders:

| Name | Trade | Location | Time | Outcome | Quote |
|------|-------|----------|------|---------|-------|
| Mike Tanner | Electrician | Birmingham | 8 months | +3 jobs/month | "I was missing 4-5 calls a week while I was on jobs..." |
| Sarah Hendricks | Plumbing & Heating | Clapham, London | 5 months | £1,200/mo recovered | "Before whoza.ai, my voicemail was full by Friday..." |
| Dave O'Brien | Roofing Contractor | Manchester | 12 months | 4.9★ Google rating | "Claire's review follow-ups are automatic..." |
| Aisha Patel | Kitchen Fitter | Leeds | 3 months | +2 jobs/week | "Rex showed me I wasn't listed on two directories..." |
| Tom Walsh | Builder & Carpenter | Glasgow | 10 months | £800/mo saved on VA | [from existing component] |

### Pricing Data (Already in Codebase)

From `PricingTeaser.jsx`:

| Plan | Price | Included | Overage | Popular? |
|------|-------|----------|---------|----------|
| Capture | £59/mo | Lead capture only | N/A | No |
| Convert | £119/mo | 15 AI-booked jobs | £3 per extra | Yes |
| Grow | £199/mo | 40 AI-booked jobs | £2.50 per extra | No |
| Scale | £349/mo | 100 AI-booked jobs | £2 per extra | No |

**All plans include:** AI visibility scores, Weekly action plan, AI voice agent, WhatsApp summaries, Calendar sync, Review management

### Pricing Display Rules

- Always show the price. Never hide it.
- Format: "£59/month" (write it out, not "£59/mo")
- Include: "inc VAT" (UK legal requirement)
- Highlight: "14-day free trial" above pricing
- Show: "No credit card required" (removes friction)
- Avoid: "Starting from..." (sounds like hidden tiers)

### Forbidden Words

- "Solution" (too vague)
- "Optimise" (agency speak)
- "Synergy" (nonsense)
- "Leverage" (corporate)
- "Best-in-class" (unprovable)
- "Scalable" (irrelevant to sole trader)

### Required Words

- "Job" (not "lead", not "opportunity")
- "Calls" (specific, relatable)
- "Month" (clear billing cycle)
- "Trial" (risk reversal)
- "Cancel anytime" (removes fear)

---

## PART 8: LOGO & BRAND ASSETS

### Logo

**File:** `/production_logo.png`
**Usage:** `<img src="/production_logo.png" alt="Whoza.ai - AI for Tradespeople" style={{ maxHeight: '40px', width: 'auto' }} />`

**Note:** Do not replace with text wordmark unless Dru approves.

### Persona Icons

Use Lucide React icons for persona representation:
- Katie (Voice): `Headset`, `Phone`, `Mic`
- Rex (Visibility): `Search`, `TrendingUp`, `BarChart3`
- Claire (Reviews): `Star`, `MessageSquare`, `ThumbsUp`

---

## PART 9: BACKEND INTEGRATION POINTS

### Supabase Edge Functions (Active)

| Function | Purpose |
|----------|---------|
| `join-waitlist` | Add user to waitlist |
| `check-trial-availability` | Check if trial slots available |
| `get-waitlist-status` | Get waitlist position/status |
| `get-live-results` | Get real-time visibility scores |
| `create-checkout-session` | Stripe checkout |
| `stripe-webhook` | Payment webhooks |
| `trillet-create-subaccount` | Voice subaccount provisioning |
| `send-call-summary` | Post-call WhatsApp summaries |
| `send-review-request` | Automated review follow-ups |

### Auth Flow (Must Preserve)

- Sign-in: `/sign-in` → Supabase OAuth/email → redirect to `/auth/callback`
- Portal: `/portal` (protected route, requires auth)
- Checkout: `/checkout` (protected route)
- Admin: `/admin` (protected + role check)

### WhatsApp Integration

- Number: `07831643012` (UK mobile)
- Link format: `https://wa.me/447831643012?text=...`
- Component: `FloatingChatWidget.jsx` (already exists, use as-is)

---

## PART 10: RESPONSIVE BEHAVIOUR

### Breakpoints (Consistent with Existing CSS)

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
- Lost Jobs Calculator: Sliders become number steppers on touch

---

## PART 11: SEO & META REQUIREMENTS

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

**Note:** The existing `SEO` component handles meta tags. VO should ensure the homepage passes the correct schema to `<SEO schemas={schemas} />`.

---

## PART 12: SELF-CRITIQUE & ACCURACY CHECK (V1.1)

### What This Brief Gets Right

1. ✅ **Demographic alignment:** Every design decision is filtered through the lens of a UK tradesperson
2. ✅ **Technical compatibility:** React 19 + Vite + React Router v7 correctly specified
3. ✅ **Honest value focus:** Messaging guidelines forbid corporate jargon, mandate concrete numbers
4. ✅ **Existing design system acknowledged:** `src/styles/design-system.css` with `.ds-*` classes specified
5. ✅ **Persona colour system celebrated:** Katie blue, Rex green, Claire amber recognised as brand asset
6. ✅ **Mobile-first:** Recognises tradespeople browse on phones between jobs
7. ✅ **Three distinct concepts:** Each targets a different psychological entry point (pain/ product/ trust)
8. ✅ **Performance budget:** Hard limits respect existing Netlify CDN setup
9. ✅ **Accessibility:** WCAG 2.2 AA requirements specified
10. ✅ **Real data used:** Testimonials, pricing, WhatsApp number all match actual codebase
11. ✅ **Framer Motion correctly positioned:** Allowed since already installed, not banned
12. ✅ **Component reuse emphasised:** VO imports existing components, doesn't rebuild

### What Could Go Wrong (And How to Mitigate)

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| VO tries to create new CSS instead of using `.ds-*` classes | HIGH | Explicitly mandate: "Use existing `.ds-btn`, `.ds-card`, `.ds-reveal` classes. Do not create new design tokens." |
| VO duplicates existing component logic | HIGH | Mandate: "Import existing components. Create thin wrappers only." |
| VO adds new NPM dependencies | MEDIUM | Whitelist: "Only React, React Router, Lucide, framer-motion (already installed)" |
| VO generates Next.js code | LOW | Already specified Vite + client-side only |
| Dark hero in Concept B clashes with lime scrollbar | LOW | Note in prompt: "Dark sections use `--navy-900` gradient, scrollbars remain as-is" |
| Testimonial photos don't exist at paths | MEDIUM | Note: "Use placeholder avatars with initials if photo file not confirmed" |

### What I Might Still Be Wrong About

1. **Blue as dominant accent:** The existing design system has three persona colours. A single dominant blue might underutilise the brand's colour depth. However, blue as primary with green/amber as secondary accents is the correct hierarchy.
2. **Concept A calculator prominence:** Making the Lost Jobs Calculator the star of Concept A might feel aggressive. But tradespeople measure everything in £££ — the concrete pain should convert.
3. **Dashboard mockup realism:** Concept B's dashboard preview must look like real software, not a cartoon. The existing `DashboardPreview` component already handles this.
4. **Testimonial photo quality:** Concept C depends on high-quality real photos. If the existing `/images/testimonial-*.jpg` files aren't professional quality, this concept may need adjustment.
5. **"Job" vs "Lead":** I mandate "job" but the existing pricing component uses "AI-booked jobs" — this is correct alignment.

### Questions for Dru to Validate

1. Do the existing testimonial photos (`/images/testimonial-*.jpg`) look professional enough for Concept C's large-format display?
2. Is the lime green scrollbar (`#9EF01A`) in the existing CSS intentional brand equity, or should it be updated?
3. Should Concept B's dark hero use the existing `--gradient-hero` or a new gradient?
4. Any preference for which concept gets the most visual "risk" (e.g., dark hero, split layout)?
5. Should we A/B test the calculator default values (currently: 5 missed calls, £250 job value, 40% close rate)?

---

## PART 13: VO PROMPT TEMPLATES (CORRECTED)

### Master Prompt (Use This First)

```
You are generating React homepage components for whoza.ai, a UK-based SaaS platform that provides AI voice agents, competitor visibility tracking, and review collection for self-employed tradespeople (plumbers, electricians, builders, etc.).

CRITICAL: You are NOT building from scratch. The codebase already has a complete component library and design system. Your job is to reorganise and restyle existing components into three distinct homepage layouts.

EXISTING COMPONENTS (import these, do not rewrite):
- Header, Footer, NewHero, LostRevenueCalculator, DashboardPreview
- TestimonialCarousel, GoogleReviews, AudioDemoPlayer, MeetTheTeam
- PricingTeaser, FAQAccordion, FinalCTA, StickyCTA, TrustBadgeBand
- ComparisonTable, IntegrationLogoBand, SocialProofBand, StatsBand
- ProblemSolution, HowItWorks, SEO, FloatingChatWidget

EXISTING DESIGN SYSTEM (use these CSS classes, do not create new ones):
- Buttons: .ds-btn, .ds-btn-primary, .ds-btn-secondary, .ds-btn-cta, .ds-btn-lg
- Cards: .ds-card, .ds-card-dark, .ds-card-persona-katie, .ds-card-persona-rex, .ds-card-persona-claire
- Badges: .ds-badge, .ds-badge-green, .ds-badge-amber, .ds-badge-blue, .ds-badge-navy
- Typography: .ds-heading-hero, .ds-heading-2, .ds-heading-3, .ds-body, .ds-body-lg, .ds-caption, .ds-mono
- Layout: .ds-container, .ds-section, .ds-section-sm, .ds-reveal
- Animation: .ds-float, .ds-float-delayed (already defined in CSS)

EXISTING DESIGN TOKENS (already in CSS):
- --katie-blue: #2563EB, --rex-green: #059669, --claire-amber: #D97706
- --navy-900: #0F172A, --slate-500: #64748B, --white: #FFFFFF, --off-white: #F8FAFC
- Spacing: --space-xs (4px) through --space-5xl (128px)
- Fonts: --font-heading (Inter), --font-accent (Space Grotesk), --font-mono (JetBrains Mono)

TECHNICAL CONSTRAINTS:
- React 19 + Vite 7 (NOT Next.js)
- React Router v7
- Client-side rendered only (Netlify static site)
- Framer Motion already installed — may use for scroll animations and hover effects
- Lucide React for icons (already installed)
- NO additional NPM dependencies
- Use <style jsx> for component-specific styles (existing pattern)
- All components must be lazy-loadable

DESIGN MANDATE:
- 9/10 visual design standard
- Premium but approachable (not corporate, not "tech-bro")
- Mobile-first (60%+ traffic is mobile)
- Three-persona colour system: Katie (blue), Rex (green), Claire (amber)
- Honest, straight-talk messaging — no jargon
- WCAG 2.2 AA accessibility compliant
- Use .ds-reveal class for scroll-triggered fade-ups (IntersectionObserver already set up in Home.jsx)

OUTPUT: Complete, production-ready React component files that import existing components and arrange them into the specified layout. Create thin wrapper components only where styling variations are needed.
```

### Concept A Prompt

```
Generate `HomeConceptA.jsx` following the "Job Site" concept. Import and arrange existing components in this order:

1. <SEO schemas={schemas} />
2. <Header />
3. <main id="main-content" role="main">
   <NewHero /> — Full-bleed van background with gradient overlay
   <SocialProofBand /> + <StatsBand /> — Trust micro-bar
   <LostRevenueCalculator /> — FLAGSHIP: Prominent, full-width
   <ProblemSolution />
   <MeetTheTeam /> — Bento grid, persona cards
   <AudioDemoPlayer />
   <PricingTeaser />
   <TestimonialCarousel /> — 3 testimonials
   <FAQAccordion />
   <FinalCTA />
   </main>
4. <Footer />
5. <FloatingChatWidget />
6. <StickyCTA />

HERO STYLING:
- Use existing .ds-heading-hero for H1: "Never Miss Another Job"
- Subhead: .ds-body-lg, white at 90% opacity
- CTA: .ds-btn-primary + .ds-btn-secondary
- Background: Full-bleed image with dark gradient overlay (CSS: linear-gradient)

LOST JOBS CALCULATOR:
- Use existing <LostRevenueCalculator /> component
- Wrap in a section with .ds-section class
- Background: --off-white (#F8FAFC)

USE EXISTING CSS CLASSES:
- .ds-reveal on every section for scroll animations
- .ds-container for content width constraint
- .ds-section for section padding
- .ds-card for any new cards

Add IntersectionObserver setup in useEffect (copy pattern from existing Home.jsx).

OUTPUT: Complete JSX file with all imports and layout.
```

### Concept B Prompt

```
Generate `HomeConceptB.jsx` following the "Dashboard" concept. Import and arrange existing components in this order:

1. <SEO schemas={schemas} />
2. <Header />
3. <main id="main-content" role="main">
   <HeroSectionB /> — NEW WRAPPER: Dark hero with DashboardPreview floating
   <SocialProofBand /> — "1,200+ tradespeople | 4.9/5 | 14-day free trial"
   <MeetTheTeam /> — FLAGSHIP: Prominent bento grid with persona cards
   <HowItWorks /> — 3 steps with connecting line
   <DashboardPreview /> — Full-width version
   <AudioDemoPlayer />
   <PricingTeaser /> — Bento grid pricing cards
   <ComparisonTable />
   <TestimonialCarousel /> — Brief, 2 testimonials
   <TrustBadgeBand />
   <FAQAccordion />
   <FinalCTA />
   </main>
4. <Footer />
5. <FloatingChatWidget />
6. <StickyCTA />

HERO SECTION (new wrapper component):
- Background: --navy-900 gradient (use existing --gradient-hero)
- Left: H1 "Your AI Team, Always On" (.ds-heading-hero, white)
- Right: <DashboardPreview /> floating with 3D perspective (rotateY(-5deg))
- CTA: .ds-btn-cta (large)

MEET THE TEAM (flagship):
- Use existing <MeetTheTeam /> but wrap in prominent section
- Cards: .ds-card-persona-katie (blue), .ds-card-persona-rex (green), .ds-card-persona-claire (amber)
- Staggered reveal animation using framer-motion (already installed)

DASHBOARD PREVIEW:
- Use existing <DashboardPreview />
- Add subtle float animation: .ds-float class (already in CSS)

USE EXISTING CSS CLASSES throughout.
Add IntersectionObserver for .ds-reveal elements.

OUTPUT: Complete JSX file with imports, HeroSectionB wrapper, and layout.
```

### Concept C Prompt

```
Generate `HomeConceptC.jsx` following the "Testimonial" concept. Import and arrange existing components in this order:

1. <SEO schemas={schemas} />
2. <Header />
3. <main id="main-content" role="main">
   <HeroSectionC /> — NEW WRAPPER: Split layout with testimonial
   <TrustBadgeBand /> — ICO/GDPR/Gas Safe/NICEIC/FMB
   <TestimonialCarousel /> — FLAGSHIP: Large, prominent
   <GoogleReviews /> — Real reviews widget
   <ProblemSolution /> — Before/after with quotes
   <AudioDemoPlayer /> — Video testimonials grid (2×2)
   <MeetTheTeam /> — Brief intro
   <LostRevenueCalculator /> — Embedded, smaller
   <PricingTeaser />
   <FAQAccordion />
   <FinalCTA /> — "Join 1,200+ tradespeople who never miss a job"
   </main>
4. <Footer />
5. <FloatingChatWidget />
6. <StickyCTA />

HERO SECTION (new wrapper component):
- Background: Warm cream tint (slightly off-white, e.g. #FFFBF5 or use --off-white)
- Left column (55%):
  - Label: .ds-caption — "Trusted by 1,200+ UK tradespeople"
  - H1: .ds-heading-hero — "Never Miss a Job Again"
  - Subhead: .ds-body-lg
  - CTA: .ds-btn-primary — "Start Free Trial — No Card Required"
- Right column (45%):
  - Large testimonial card using .ds-card
  - Mike Tanner quote (from existing TestimonialCarousel data)
  - .testimonial-metric badge: "+3 jobs/month" (.ds-badge-green)
  - Photo: circular, 80px

TESTIMONIAL CAROUSEL (flagship):
- Use existing <TestimonialCarousel />
- Wrap in prominent section with .ds-section
- Make cards larger than default

VIDEO TESTIMONIALS:
- Use <AudioDemoPlayer /> but arrange in 2×2 grid
- Card style: .ds-card with thumbnail + play overlay

USE EXISTING CSS CLASSES throughout.
Add IntersectionObserver for .ds-reveal elements.

OUTPUT: Complete JSX file with imports, HeroSectionC wrapper, and layout.
```

---

## PART 14: IMPLEMENTATION CHECKLIST

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
- `FloatingChatWidget` — WhatsApp (uses 07831643012)
- `CookieConsent` — GDPR
- `SEO` — Meta tags, schema.org
- `ErrorBoundary` — Error handling
- `ExitIntentModal` — Lead capture

### Backend Integration Points
- Supabase auth (OAuth + email)
- Supabase database (users, businesses, scores)
- Edge functions: `join-waitlist`, `check-trial-availability`, `get-waitlist-status`, `get-live-results`, `create-checkout-session`, `stripe-webhook`, `send-call-summary`, `send-review-request`
- Stripe checkout (embedded)
- Sentry error tracking (@sentry/react)

### Logo & Assets
- Logo: `/production_logo.png` (used in Header)
- Favicon: `/favicon.svg`
- OG Image: `/og-image.png`
- Testimonial photos: `/images/testimonial-mike.jpg`, `/images/testimonial-sarah.jpg`, `/images/testimonial-dave.jpg`, `/images/testimonial-aisha.jpg`, `/images/testimonial-tom.jpg`

---

*End of Brief. This document was forensically audited against the actual whoza.ai codebase (package.json, src/styles/design-system.css, src/pages/Home.jsx, src/components/*) for accuracy.*

**Document Version:** 1.1
**Audit Date:** 2026-05-01
**Author:** Agent CTO (Jarvis)
**Audit Status:** Forensically verified against codebase
**Changes from v1.0:**
- Fixed: Framer Motion incorrectly banned (now correctly allowed as installed)
- Fixed: Existing design system completely ignored (now fully specified with .ds-* classes)
- Fixed: React Router version (v7, not v6)
- Fixed: Edge function names (get-waitlist-status, get-live-results)
- Fixed: CSS-in-JS ban contradicts codebase (now specifies existing <style jsx> pattern)
- Fixed: Logo path (/production_logo.png, not wordmark)
- Fixed: Space Grotesk font missing (now specified as --font-accent)
- Fixed: Concept scope misunderstood (now clarifies VO reorganises existing components)
- Fixed: Persona colour system underutilised (now celebrated as brand asset)
- Added: Complete existing components inventory
- Added: Real testimonial data from codebase
- Added: Real pricing data from codebase
- Added: Existing scroll reveal system documentation
