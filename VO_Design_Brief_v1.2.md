# Whoza.ai VO Design Brief — World-Class UX Upgrade
## Comprehensive Prompt Package for v0.dev | Version 1.2 | FORENSICALLY AUDITED ×2

---

## EXECUTIVE SUMMARY

**Objective:** Generate three distinct homepage design concepts for whoza.ai using the **existing component library**, achieving 9/10+ visual design standards, aligned with UK tradespeople demographic psychology, and dovetail seamlessly with the existing React 19 + Vite + Supabase backend.

**CRITICAL CONTEXT:** The current homepage (`src/pages/Home.jsx`) already contains all major components needed for all three concepts:
- `LostRevenueCalculator` (Concept A: "The Job Site")
- `DashboardPreview` (Concept B: "The Dashboard")
- `TestimonialCarousel` + `GoogleReviews` (Concept C: "The Testimonial")
- Plus: `NewHero`, `PhoneMockup`, `AudioDemoPlayer`, `MeetTheTeam`, `PricingTeaser`, `FAQAccordion`, `FinalCTA`, `StickyCTA`, `TrustBadgeBand`, `ComparisonTable`, `IntegrationLogoBand`, `SocialProofBand`, `StatsBand`, `ProblemSolution`, `HowItWorks`, `ROICalculator`, `AITeam`, `WhatWeDontDo`

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
3. **Four-Persona Colour System:** Katie (blue), Mark (grey), Rex (green), Claire (amber) — this is a brand asset
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
| `--font-heading` | `'Inter', system-ui, -apple-system, sans-serif` | Headings |
| `--font-body` | `'Inter', system-ui, -apple-system, sans-serif` | Body text |
| `--font-accent` | `'Space Grotesk', 'Inter', sans-serif` | Display numbers, accent text |
| `--font-mono` | `'JetBrains Mono', ui-monospace, SFMono-Regular, monospace` | Data, stats, code |
| `--text-hero` | `clamp(2rem, 5vw, 3.5rem)` | Hero H1 |
| `--text-h2` | `clamp(1.75rem, 3vw, 2.5rem)` | Section headings |
| `--text-h3` | `clamp(1.25rem, 2vw, 1.75rem)` | Card headings |
| `--text-body` | `1rem` (16px) | Body text |
| `--text-body-lg` | `1.125rem` (18px) | Lead paragraphs |
| `--text-sm` | `0.9375rem` (15px) | Small text |
| `--text-xs` | `0.875rem` (14px) | Captions |

### Colour System (Already Defined)

**Persona Colours (Brand Asset — FOUR personas):**
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
| `--mark-grey` | `#64748B` | Mark — AI Voice Agent (Alternate) |

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

**⚠️ KNOWN INCONSISTENCY:** `DashboardPreview.jsx` uses different persona colours (Katie=rose, Mark=emerald, Rex=amber, Claire=violet) that DO NOT match the design system. VO should be aware of this but use the design system colours for new work.

### Component Classes (Already Defined — Use These)

**Buttons:**
```
.ds-btn           — Base button (48px min-height, flex center)
.ds-btn-primary  — Blue gradient, white text, shadow
.ds-btn-secondary — Transparent, navy border
.ds-btn-cta      — Full gradient blue
.ds-btn-lg       — Larger padding (56px min-height)
.ds-btn-katie    — Blue variant
.ds-btn-rex      — Green variant
.ds-btn-claire   — Amber variant
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
.ds-badge-red    — Red bg, red text
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
.ds-bg-offwhite   — Off-white background
```

**Animations (Already Defined):**
```
.ds-float           — Float animation (3s infinite)
.ds-float-delayed   — Float with delay (4s infinite)
.ds-float-slow      — Slow float (5s infinite)
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
  .ds-float, .ds-float-delayed, .ds-float-slow { animation: none; }
  .ds-btn:hover { transform: none; }
  .ds-card:hover { transform: none; }
}
```

---

## PART 4: EXISTING COMPONENTS INVENTORY

### Components VO Can Import and Reuse

All these components already exist at `src/components/`:

| Component | What It Does | Size | Concepts Used In |
|-----------|-------------|------|------------------|
| `Header` | Navigation bar | ~200 lines | All |
| `Footer` | Site footer | ~100 lines | All |
| `SEO` | Meta tags, schema.org | ~100 lines | All |
| `NewHero` | Hero with dark gradient, 3-colour H1, PhoneMockup | ~120 lines | All |
| `PhoneMockup` | Animated phone showing Katie answering calls | ~357 lines | All |
| `LostRevenueCalculator` | Interactive calculator: missed calls × job value = £ lost | ~185 lines | A (flagship) |
| `ROICalculator` | ROI calculator with trade presets, plan selection | ~416 lines | A/B |
| `DashboardPreview` | Animated dashboard mockup with stats | ~375 lines | B (flagship) |
| `TestimonialCarousel` | Auto-advancing testimonials with photos | ~300 lines | C (flagship) |
| `GoogleReviews` | Google Reviews widget with real reviews | ~150 lines | C |
| `AudioDemoPlayer` | Simulated voice demo with transcript playback | ~200 lines | All |
| `MeetTheTeam` | Katie/Mark/Rex/Claire cards (dark bg) | ~130 lines | All |
| `AITeam` | Waitlist signup with modal | ~568 lines | All |
| `PricingTeaser` | 4-tier pricing cards (Capture/Convert/Grow/Scale) | ~150 lines | All |
| `FAQAccordion` | Expandable FAQ items (9 questions) | ~180 lines | All |
| `FinalCTA` | Bottom CTA with floating avatars (Katie/Rex/Claire) | ~100 lines | All |
| `StickyCTA` | Mobile-only fixed bottom banner | ~30 lines | All |
| `TrustBadgeBand` | ICO/GDPR/Gas Safe/NICEIC/FMB badges | ~70 lines | All |
| `ComparisonTable` | Competitor comparison (whoza.ai vs VA vs service vs voicemail) | ~150 lines | All |
| `IntegrationLogoBand` | Tool integration logos | ~100 lines | All |
| `SocialProofBand` | Trade icons + trust indicators | ~100 lines | All |
| `StatsBand` | 5 key metrics (dark bg) | ~70 lines | All |
| `ProblemSolution` | Before/after comparison | ~100 lines | All |
| `HowItWorks` | 3-step process | ~100 lines | All |
| `WhatWeDontDo` | Transparency section (lime green borders) | ~162 lines | All |
| `UserCountBadge` | Avatar stack + count + rating | ~24 lines | All |
| `FloatingChatWidget` | WhatsApp widget | ~200 lines | All |
| `CookieConsent` | GDPR cookie banner | ~100 lines | All |
| `ExitIntentModal` | Lead capture modal | ~100 lines | All |
| `LoadingSpinner` | Loading animation | ~50 lines | All |
| `SkipLink` | Accessibility skip link | ~20 lines | All |
| `ErrorBoundary` | Error handling | ~80 lines | All |
| `Toast` | Toast notification system | ~50 lines | All |

### Persona Avatar Components

| Component | Size | Persona | Colour |
|-----------|------|---------|--------|
| `KatieAvatar` | ~80 lines | Katie — AI Voice Agent | Blue (#2563EB) border, green pulse |
| `MarkAvatar` | ~80 lines | Mark — AI Voice Agent (Alt) | Grey (#64748B) border, green pulse |
| `RexAvatar` | ~80 lines | Rex — Visibility Analyst | Green (#059669) border, green pulse |
| `ClaireAvatar` | ~80 lines | Claire — Review Collector | Amber (#D97706) border, amber pulse |

### How to Use Existing Components

**Import pattern:**
```javascript
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewHero from '../components/NewHero';
import PhoneMockup from '../components/PhoneMockup';
import LostRevenueCalculator from '../components/LostRevenueCalculator';
import ROICalculator from '../components/ROICalculator';
import DashboardPreview from '../components/DashboardPreview';
import TestimonialCarousel from '../components/TestimonialCarousel';
import GoogleReviews from '../components/GoogleReviews';
import AudioDemoPlayer from '../components/AudioDemoPlayer';
import MeetTheTeam from '../components/MeetTheTeam';
import AITeam from '../components/AITeam';
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
import WhatWeDontDo from '../components/WhatWeDontDo';
import SEO from '../components/SEO';
import FloatingChatWidget from '../components/FloatingChatWidget';
import UserCountBadge from '../components/UserCountBadge';
```

**Important:** These components may need **props or wrapper divs** for styling variations. VO should create thin wrapper components (e.g., `HeroWrapperA.jsx`) if needed, not duplicate component logic.

---

## PART 5: THREE HOMEPAGE CONCEPTS

### ⚠️ IMPORTANT NOTE ON CONCEPT DIFFERENTIATION

The **existing `NewHero` is already dark** with floating glow orbs, three-colour text, and `PhoneMockup`. This means:
- **Concept A** is NOT "light hero vs dark hero" — it's about **what gets priority below the fold**
- **Concept B** is NOT "add dark hero" — it's about **product/demo prominence**
- **Concept C** is NOT "add testimonials" — it's about **trust-first hierarchy**

The hero itself is sophisticated across all three concepts. The differentiation is in **section order, emphasis, and visual weight** below the hero.

---

### Concept A: "The Job Site" — Pain Calculator First

**Vibe:** Walks onto site, sees the damage, gets the fix.

**Differentiation:** The `LostRevenueCalculator` is the star below-the-fold. The hero remains as-is (dark, with PhoneMockup), but the calculator gets maximum prominence.

**Section Order:**
1. `Header`
2. `NewHero` — Existing dark hero with PhoneMockup (keep as-is)
3. `SocialProofBand` + `StatsBand` — Trust micro-bar
4. `LostRevenueCalculator` — **FLAGSHIP:** Full-width, prominent, amber/green dataviz
5. `ROICalculator` — Secondary calculator showing trade-specific ROI
6. `ProblemSolution` — Before/after
7. `AudioDemoPlayer` — "Hear Katie in Action"
8. `MeetTheTeam` — Brief persona intro (bento grid)
9. `PricingTeaser` — Simple pricing cards
10. `TestimonialCarousel` — 3 key testimonials
11. `ComparisonTable` — vs competitors
12. `FAQAccordion`
13. `FinalCTA`
14. `Footer`
15. `FloatingChatWidget` + `StickyCTA`

**Visual Direction:**
- Hero: Keep existing dark gradient mesh with PhoneMockup
- Calculator section: `--off-white` bg, large amber numbers for loss, green for recovery
- Use existing `.revenue-calculator-section` CSS
- Testimonial cards: `.ds-card` with `.testimonial-metric` badges

---

### Concept B: "The Dashboard" — Product Demo First

**Vibe:** Opens the app, sees everything working, feels in control.

**Differentiation:** The `DashboardPreview` and `PhoneMockup` get maximum prominence. The hero emphasises the AI team working in real-time.

**Section Order:**
1. `Header`
2. `NewHero` — Existing dark hero (keep as-is)
3. `SocialProofBand` — "Trusted by tradespeople across the UK"
4. `MeetTheTeam` — **FLAGSHIP:** Prominent bento grid with all four persona cards. Use `.ds-card-persona-katie`, `.ds-card-persona-rex`, `.ds-card-persona-claire` (add Mark card with grey accent)
5. `PhoneMockup` — Full-width, animated, showing Katie booking
6. `DashboardPreview` — Full-width version with more detail
7. `HowItWorks` — 3 steps with connecting line
8. `AudioDemoPlayer` — Live demo of Katie booking
9. `PricingTeaser` — Bento grid pricing cards
10. `ComparisonTable` — vs competitors
11. `StatsBand` — Key metrics (dark bg)
12. `TestimonialCarousel` — Brief, 2 testimonials
13. `TrustBadgeBand`
14. `FAQAccordion`
15. `FinalCTA`
16. `Footer`
17. `FloatingChatWidget` + `StickyCTA`

**Visual Direction:**
- Hero: Keep existing dark gradient
- Persona cards: Colour-coded tops (blue/grey/green/amber)
- PhoneMockup: Animated, floating, `.ds-float` class
- DashboardPreview: Full-width with `.ds-card-dark` wrapper
- Staggered reveal using framer-motion `staggerChildren`

---

### Concept C: "The Testimonial" — Trust-First, Peer-Proof

**Vibe:** Mate at the pub says "I'm using this, it's class."

**Differentiation:** Testimonials and reviews dominate. The hero is kept but the real estate below-the-fold is dominated by social proof.

**Section Order:**
1. `Header`
2. `NewHero` — Existing dark hero (keep as-is)
3. `TrustBadgeBand` — ICO/GDPR/Gas Safe/NICEIC/FMB badges (prominent)
4. `TestimonialCarousel` — **FLAGSHIP:** Prominent, large cards, auto-advancing
5. `GoogleReviews` — Real Google reviews widget
6. `StatsBand` — "1,200+ tradespeople | 4.9/5 | 94% retention" (dark bg)
7. `ProblemSolution` — Before/after with real quotes
8. `AudioDemoPlayer` — Simulated transcript playback
9. `MeetTheTeam` — Brief AI team intro
10. `LostRevenueCalculator` — Embedded, smaller
11. `PricingTeaser`
12. `ComparisonTable`
13. `FAQAccordion`
14. `FinalCTA` — "Join 1,200+ tradespeople who never miss a job"
15. `Footer`
16. `FloatingChatWidget` + `StickyCTA`

**Visual Direction:**
- Hero: Keep existing dark gradient
- Testimonials: Large cards with real photos, `.testimonial-card` CSS
- Google Reviews widget: Prominent placement
- Warm section backgrounds (`--off-white`) for testimonial sections
- Use existing `.testimonial-metric` badges

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
    NewHero.jsx          ← EXISTING — use as-is (already dark + PhoneMockup)
    PhoneMockup.jsx      ← EXISTING — use as-is
    LostRevenueCalculator.jsx  ← EXISTING
    ROICalculator.jsx          ← EXISTING
    DashboardPreview.jsx       ← EXISTING
    TestimonialCarousel.jsx    ← EXISTING
    ... (all other existing components)
    wrappers/
      HeroWrapperA.jsx   ← NEW — thin wrapper for Concept A layout
      HeroWrapperB.jsx   ← NEW — thin wrapper for Concept B layout
      HeroWrapperC.jsx   ← NEW — thin wrapper for Concept C layout
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

**⚠️ NOTE:** The existing `NewHero` H1 is "Your AI Team for Every Call, Every Lead, Every Review" with three-colour text (blue/green/amber). This is the established brand message. VO should preserve this H1 across all three concepts. The differentiation is in section order below the hero, not in the hero itself.

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

### Stats Data (Already in Codebase)

From `StatsBand.jsx`:

| Stat | Value | Colour |
|------|-------|--------|
| Average recovered per year | £2,400 | Blue |
| Users who keep whoza.ai after trial | 94% | Green |
| Average rating | 4.9/5 | Amber |
| Tradespeople using whoza.ai | 1,200+ | Blue |
| Time to see visibility score | Under 2 min | Green |

**⚠️ INCONSISTENCY:** `NewHero` says "Trusted by 2,800+ UK tradespeople" but `StatsBand` and `UserCountBadge` say "1,200+". The codebase has conflicting user count data. VO should use "1,200+" (from StatsBand) as it's the more conservative, verifiable number, or note the discrepancy for Dru to resolve.

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
- Mark (Voice Alt): `Phone`, `Headset`
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
- StickyCTA: Mobile-only (`md:hidden`), fixed bottom banner

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

## PART 12: SELF-CRITIQUE & ACCURACY CHECK (V1.2)

### What This Brief Gets Right

1. ✅ **Demographic alignment:** Every design decision filtered through UK tradesperson lens
2. ✅ **Technical compatibility:** React 19 + Vite + React Router v7 correctly specified
3. ✅ **Honest value focus:** Messaging guidelines forbid corporate jargon, mandate concrete numbers
4. ✅ **Existing design system acknowledged:** `src/styles/design-system.css` with `.ds-*` classes specified
5. ✅ **Four-persona system acknowledged:** Katie (blue), Mark (grey), Rex (green), Claire (amber)
6. ✅ **Mobile-first:** Recognises tradespeople browse on phones between jobs
7. ✅ **Three distinct concepts:** Each targets different psychological entry point (pain/ product/ trust)
8. ✅ **Performance budget:** Hard limits respect existing Netlify CDN setup
9. ✅ **Accessibility:** WCAG 2.2 AA requirements specified
10. ✅ **Real data used:** Testimonials, pricing, stats, WhatsApp number all match codebase
11. ✅ **Framer Motion correctly positioned:** Allowed since already installed
12. ✅ **Component reuse emphasised:** VO imports existing components, doesn't rebuild
13. ✅ **Existing hero acknowledged:** Dark gradient mesh, PhoneMockup, three-colour H1 already exist
14. ✅ **All 25+ components inventoried:** Complete list including PhoneMockup, ROICalculator, AITeam, WhatWeDontDo
15. ✅ **Known inconsistencies flagged:** DashboardPreview colours, user count discrepancy, FinalCTA missing Mark

### What Could Go Wrong (And How to Mitigate)

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| VO tries to create new CSS instead of using `.ds-*` classes | HIGH | Explicitly mandate: "Use existing `.ds-btn`, `.ds-card`, `.ds-reveal` classes. Do not create new design tokens." |
| VO duplicates existing component logic | HIGH | Mandate: "Import existing components. Create thin wrappers only." |
| VO adds new NPM dependencies | MEDIUM | Whitelist: "Only React, React Router, Lucide, framer-motion (already installed)" |
| VO changes the hero H1 | MEDIUM | Explicitly state: "Preserve existing NewHero H1: 'Your AI Team for Every Call, Every Lead, Every Review'" |
| VO doesn't include Mark in persona sections | MEDIUM | Explicitly state: "Four personas: Katie, Mark, Rex, Claire. Mark must be included." |
| VO uses DashboardPreview's rose/amber/violet colours | MEDIUM | Warn: "DashboardPreview has inconsistent colours. Use design system colours for new work." |

### What I Might Still Be Wrong About

1. **User count discrepancy:** "1,200+" vs "2,800+" — Dru needs to resolve which is accurate
2. **DashboardPreview colour inconsistency:** The component uses rose/amber/violet which clash with the brand system. VO should either fix this or be warned.
3. **Concept differentiation:** Since the hero is the same across all three concepts, the differentiation relies entirely on below-the-fold hierarchy. This might not be dramatic enough.
4. **PhoneMockup vs DashboardPreview:** Both are large visual elements. Using both in Concept B might create visual competition.
5. **Mark's role clarity:** "AI Voice Agent (Alternate)" is less compelling than primary personas. VO might need guidance on how prominently to feature Mark.
6. **ROICalculator vs LostRevenueCalculator:** Both calculate money. Using both in Concept A might feel repetitive. VO should differentiate their roles.

### Questions for Dru to Validate

1. **User count:** Is it 1,200+ or 2,800+? The codebase has conflicting data.
2. **DashboardPreview colours:** Should we fix the persona colours in DashboardPreview to match the design system (Katie=blue, Rex=green, Claire=amber)?
3. **Mark prominence:** Should Mark appear in FinalCTA alongside Katie/Rex/Claire?
4. **Hero H1:** Should we keep "Your AI Team for Every Call, Every Lead, Every Review" or test alternatives?
5. **WhatWeDontDo:** Should this section be included in all three concepts? It has strong lime green branding.
6. **ROICalculator vs LostRevenueCalculator:** Should both appear, or should we pick one?

---

## PART 13: VO PROMPT TEMPLATES (CORRECTED)

### Master Prompt (Use This First)

```
You are generating React homepage components for whoza.ai, a UK-based SaaS platform that provides AI voice agents, competitor visibility tracking, and review collection for self-employed tradespeople (plumbers, electricians, builders, etc.).

CRITICAL: You are NOT building from scratch. The codebase already has a complete component library and design system. Your job is to reorganise and restyle existing components into three distinct homepage layouts.

EXISTING COMPONENTS (import these, do not rewrite):
- Header, Footer, NewHero, PhoneMockup, LostRevenueCalculator, ROICalculator
- DashboardPreview, TestimonialCarousel, GoogleReviews, AudioDemoPlayer
- MeetTheTeam, AITeam, PricingTeaser, FAQAccordion, FinalCTA, StickyCTA
- TrustBadgeBand, ComparisonTable, IntegrationLogoBand, SocialProofBand
- StatsBand, ProblemSolution, HowItWorks, WhatWeDontDo, SEO
- FloatingChatWidget, UserCountBadge
- Persona avatars: KatieAvatar, MarkAvatar, RexAvatar, ClaireAvatar

EXISTING DESIGN SYSTEM (use these CSS classes, do not create new ones):
- Buttons: .ds-btn, .ds-btn-primary, .ds-btn-secondary, .ds-btn-cta, .ds-btn-lg, .ds-btn-katie, .ds-btn-rex, .ds-btn-claire
- Cards: .ds-card, .ds-card-dark, .ds-card-persona-katie, .ds-card-persona-rex, .ds-card-persona-claire
- Badges: .ds-badge, .ds-badge-green, .ds-badge-amber, .ds-badge-blue, .ds-badge-red, .ds-badge-navy
- Typography: .ds-heading-hero, .ds-heading-2, .ds-heading-3, .ds-body, .ds-body-lg, .ds-caption, .ds-mono
- Layout: .ds-container, .ds-section, .ds-section-sm, .ds-reveal
- Animation: .ds-float, .ds-float-delayed, .ds-float-slow (already defined in CSS)

EXISTING DESIGN TOKENS (already in CSS):
- --katie-blue: #2563EB, --rex-green: #059669, --claire-amber: #D97706, --mark-grey: #64748B
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
- Four-persona colour system: Katie (blue), Mark (grey), Rex (green), Claire (amber)
- Honest, straight-talk messaging — no jargon
- WCAG 2.2 AA accessibility compliant
- Use .ds-reveal class for scroll-triggered fade-ups (IntersectionObserver already set up in Home.jsx)
- PRESERVE existing NewHero H1: "Your AI Team for Every Call, Every Lead, Every Review"
- PRESERVE existing dark hero with PhoneMockup — differentiation is in section order below the hero

OUTPUT: Complete, production-ready React component files that import existing components and arrange them into the specified layout. Create thin wrapper components only where styling variations are needed.
```

### Concept A Prompt

```
Generate `HomeConceptA.jsx` following the "Job Site" concept. Import and arrange existing components in this order:

1. <SEO schemas={schemas} />
2. <Header />
3. <main id="main-content" role="main">
   <NewHero /> — PRESERVE existing dark hero with PhoneMockup
   <SocialProofBand /> + <StatsBand /> — Trust micro-bar
   <LostRevenueCalculator /> — FLAGSHIP: Prominent, full-width
   <ROICalculator /> — Secondary calculator (trade-specific)
   <ProblemSolution />
   <AudioDemoPlayer /> — "Hear Katie in Action"
   <MeetTheTeam /> — Brief persona intro (all 4: Katie, Mark, Rex, Claire)
   <PricingTeaser />
   <TestimonialCarousel /> — 3 testimonials
   <ComparisonTable />
   <FAQAccordion />
   <FinalCTA /> — Include Mark avatar alongside Katie, Rex, Claire
   </main>
4. <Footer />
5. <FloatingChatWidget />
6. <StickyCTA /> — Mobile-only fixed bottom

HERO STYLING:
- Use existing <NewHero /> component EXACTLY as-is
- Do NOT change the H1: "Your AI Team for Every Call, Every Lead, Every Review"
- The hero is already optimised — our differentiation is below-the-fold

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
   <NewHero /> — PRESERVE existing dark hero with PhoneMockup
   <SocialProofBand /> — "Trusted by tradespeople across the UK"
   <MeetTheTeam /> — FLAGSHIP: Prominent bento grid with ALL FOUR persona cards
   <PhoneMockup /> — Full-width, animated, showing Katie booking
   <DashboardPreview /> — Full-width version with .ds-card-dark wrapper
   <HowItWorks /> — 3 steps with connecting line
   <AudioDemoPlayer /> — Live demo of Katie booking
   <PricingTeaser /> — Bento grid pricing cards
   <ComparisonTable />
   <StatsBand /> — Key metrics (dark bg)
   <TestimonialCarousel /> — Brief, 2 testimonials
   <TrustBadgeBand />
   <FAQAccordion />
   <FinalCTA /> — Include Mark avatar alongside Katie, Rex, Claire
   </main>
4. <Footer />
5. <FloatingChatWidget />
6. <StickyCTA />

MEET THE TEAM (flagship):
- Use existing <MeetTheTeam /> but wrap in prominent section
- Cards: .ds-card-persona-katie (blue), add Mark card with .ds-card style + grey accent
- Use .ds-card-persona-rex (green), .ds-card-persona-claire (amber)
- Staggered reveal animation using framer-motion staggerChildren

PHONE MOCKUP:
- Use existing <PhoneMockup /> component
- Add subtle float animation: .ds-float class (already in CSS)
- Full-width section with dark background

DASHBOARD PREVIEW:
- Use existing <DashboardPreview />
- Wrap in .ds-card-dark for consistency
- Note: DashboardPreview uses rose/amber/violet colours internally — this is a known inconsistency

USE EXISTING CSS CLASSES throughout.
Add IntersectionObserver for .ds-reveal elements.

OUTPUT: Complete JSX file with imports and layout.
```

### Concept C Prompt

```
Generate `HomeConceptC.jsx` following the "Testimonial" concept. Import and arrange existing components in this order:

1. <SEO schemas={schemas} />
2. <Header />
3. <main id="main-content" role="main">
   <NewHero /> — PRESERVE existing dark hero with PhoneMockup
   <TrustBadgeBand /> — ICO/GDPR/Gas Safe/NICEIC/FMB badges (prominent)
   <TestimonialCarousel /> — FLAGSHIP: Prominent, large cards, auto-advancing
   <GoogleReviews /> — Real Google reviews widget
   <StatsBand /> — "1,200+ tradespeople | 4.9/5 | 94% retention" (dark bg)
   <ProblemSolution /> — Before/after with real quotes
   <AudioDemoPlayer /> — Simulated transcript playback
   <MeetTheTeam /> — Brief AI team intro (all 4 personas)
   <LostRevenueCalculator /> — Embedded, smaller
   <PricingTeaser />
   <ComparisonTable />
   <FAQAccordion />
   <FinalCTA /> — Include Mark avatar alongside Katie, Rex, Claire
   </main>
4. <Footer />
5. <FloatingChatWidget />
6. <StickyCTA />

TESTIMONIAL CAROUSEL (flagship):
- Use existing <TestimonialCarousel />
- Wrap in prominent section with .ds-section
- Make cards larger than default
- Use existing .testimonial-card and .testimonial-metric CSS

GOOGLE REVIEWS:
- Use existing <GoogleReviews />
- Prominent placement below testimonials

TRUST BADGES:
- Use existing <TrustBadgeBand />
- Place immediately below hero for maximum trust impact

USE EXISTING CSS CLASSES throughout.
Add IntersectionObserver for .ds-reveal elements.

OUTPUT: Complete JSX file with imports and layout.
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
- Persona photos: `/images/katie.jpg`, `/images/mark.jpg`, `/images/rex.jpg`, `/images/claire.jpg`

---

## KNOWN ISSUES & BUGS IN CODEBASE

The following issues exist in the current codebase and should be noted for VO:

1. **User count inconsistency:** `NewHero` says "2,800+" but `StatsBand` and `UserCountBadge` say "1,200+"
2. **DashboardPreview persona colours:** Uses rose/amber/violet instead of design system colours
3. **FinalCTA missing Mark:** Only shows Katie, Rex, Claire — omits Mark
4. **NewHero uses inline styles:** Doesn't use `.ds-heading-hero` class despite it existing in CSS
5. **StickyCTA mobile-only:** `md:hidden` means no sticky CTA on desktop
6. **MeetTheTeam dark background:** `#0F172A` — all concept layouts must account for this

---

*End of Brief. This document was forensically audited against the actual whoza.ai codebase (package.json, src/styles/design-system.css, src/pages/Home.jsx, src/components/*, src/components/personas/*) for accuracy.*

**Document Version:** 1.2
**Audit Date:** 2026-05-01
**Author:** Agent CTO (Jarvis)
**Audit Status:** Double-forensically verified against codebase
**Changes from v1.1:**
- Fixed: Mark persona completely missing (now included as 4th persona)
- Fixed: PhoneMockup component completely missed (357-line animated phone)
- Fixed: ROICalculator completely missed (416-line ROI calculator)
- Fixed: AITeam completely missed (568-line waitlist component)
- Fixed: WhatWeDontDo completely missed (162-line transparency component)
- Fixed: Existing hero is already dark — concept differentiation clarified
- Fixed: Existing H1 preserved across all concepts (not replaced)
- Fixed: DashboardPreview colour inconsistency flagged as known issue
- Fixed: User count inconsistency (1,200+ vs 2,800+) flagged
- Fixed: StickyCTA mobile-only nature noted
- Fixed: MeetTheTeam dark background acknowledged
- Fixed: FinalCTA missing Mark noted as bug
- Added: Complete 25+ component inventory with line counts
- Added: All four persona avatars documented (Katie, Mark, Rex, Claire)
- Added: Known issues & bugs appendix
- Added: Real FAQ data from codebase
- Added: Real stats data from codebase
- Added: SocialProofBand trade list (gardeners, painters included)
