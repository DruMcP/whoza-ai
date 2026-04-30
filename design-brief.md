# Whoza.ai — World-Class Design Brief
**Date:** April 30, 2026
**Product:** AI-powered platform for UK tradespeople (plumbers, electricians, builders, etc.)
**Current Site:** https://whoza-ai-staging.netlify.app
**Goal:** Elevate from "functional SaaS template" to "premium, distinctive, trust-building"

---

## 1. Brand Positioning

**What we are:** The AI team every tradesperson needs but can't afford to hire — voice agent, visibility analyst, and review manager in one platform.

**What we are NOT:** Another AI chatbot company. Another SEO tool. Another call answering service.

**Tone:** Confident, practical, trustworthy. Not Silicon Valley hype. Not corporate sterile. Think "the smartest person on the job site" — direct, knowledgeable, no BS.

**Emotional promise:** "Your competitors are already using AI to steal your customers. We make sure AI recommends YOU instead."

---

## 2. Target Audience Psychology

**Primary:** Solo tradespeople, 30-55, UK-based. Self-employed. Time-poor. Tech-skeptical but pragmatic.

**What they care about:**
- Not missing jobs (revenue)
- Not looking stupid in front of customers (reputation)
- Simple, no-nonsense solutions (time)
- Local, not global (community)

**What they fear:**
- AI that sounds robotic and embarrasses them
- Complex tech they can't manage
- Getting locked into contracts
- Competitors getting ahead

**Design must communicate:**
- This works (proof, testimonials, case studies)
- This is simple (clear steps, no jargon)
- This is for people like me (tradespeople imagery, not tech bros)
- This is trustworthy (ICO, GDPR, real company details)

---

## 3. The Persona Visual System

This is our **distinctive design opportunity**. Most SaaS sites are faceless. We have 3 named AI personas. Each should have a visual identity.

### Katie / Mark — AI Voice Agent
- **Color:** Electric Blue `#2563EB` → `#1D4ED8`
- **Mood:** Friendly, reliable, always-on
- **Visual metaphor:** Sound waves, phone rings, headset, conversation bubbles
- **Animation style:** Gentle pulse (like a live call indicator), smooth transitions
- **Avatar concept:** Abstract circular waveform or friendly silhouette

### Rex — AI Visibility Analyst
- **Color:** Emerald Green `#059669` → `#047857`
- **Mood:** Sharp, data-driven, proactive
- **Visual metaphor:** Radar scans, climbing charts, magnifying glass, competitor maps
- **Animation style:** Counter animations (score climbing), scanning effects
- **Avatar concept:** Abstract eye/chart hybrid or geometric search icon

### Claire — Review Collector
- **Color:** Warm Amber `#D97706` → `#B45309`
- **Mood:** Warm, attentive, reputation-focused
- **Visual metaphor:** Stars, notification bells, customer smiles, review cards
- **Animation style:** Pop-in effects, star fills, gentle bounce
- **Avatar concept:** Abstract star/heart combination or friendly notification shape

### Brand Navy (Neutral/Foundation)
- **Primary:** `#0F172A` (deep navy, not pure black)
- **Secondary:** `#1E293B` (slightly lighter for cards)
- **Background:** `#F8FAFC` (off-white, not sterile white)
- **Text:** `#0F172A` (headings), `#475569` (body), `#94A3B8` (muted)

---

## 4. Color Palette (Complete)

```css
/* Brand Foundation */
--navy-900: #0F172A;        /* Primary headings, hero bg */
--navy-800: #1E293B;        /* Card backgrounds (dark mode) */
--navy-700: #334155;        /* Borders, dividers */
--slate-500: #64748B;       /* Body text */
--slate-400: #94A3B8;       /* Muted text, labels */
--slate-200: #E2E8F0;       /* Light borders */
--slate-100: #F1F5F9;       /* Section backgrounds */
--white: #FFFFFF;
--off-white: #F8FAFC;       /* Page background */

/* Persona Colors */
--katie-blue: #2563EB;      /* Voice agent */
--katie-blue-light: #DBEAFE;
--katie-blue-glow: rgba(37, 99, 235, 0.15);

--rex-green: #059669;       /* Visibility analyst */
--rex-green-light: #D1FAE5;
--rex-green-glow: rgba(5, 150, 105, 0.15);

--claire-amber: #D97706;    /* Review collector */
--claire-amber-light: #FEF3C7;
--claire-amber-glow: rgba(217, 119, 6, 0.15);

/* Functional */
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;

/* Gradients */
--gradient-hero: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%);
--gradient-katie: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
--gradient-rex: linear-gradient(135deg, #059669 0%, #047857 100%);
--gradient-claire: linear-gradient(135deg, #D97706 0%, #B45309 100%);
--gradient-card: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%);
```

---

## 5. Typography

**Heading Font:** Inter (or Geist if available)
- H1: 56px, weight 800, letter-spacing -0.02em, line-height 1.1
- H2: 40px, weight 700, letter-spacing -0.01em, line-height 1.2
- H3: 24px, weight 600, letter-spacing 0, line-height 1.3
- H4: 18px, weight 600, letter-spacing 0, line-height 1.4

**Body Font:** Inter
- Body: 16px, weight 400, line-height 1.6
- Body large: 18px, weight 400, line-height 1.5
- Small: 14px, weight 400, line-height 1.5
- Caption: 12px, weight 500, letter-spacing 0.02em, uppercase

**Monospace (for data/numbers):** JetBrains Mono or SF Mono
- Used for: pricing numbers, scores, minutes, stats
- 18px, weight 500, tabular-nums

---

## 6. Layout Principles

### Spacing System
Use 8px base grid:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px
- 4xl: 96px
- 5xl: 128px

### Container
- Max width: 1200px
- Padding: 24px (mobile), 48px (tablet), 64px (desktop)
- Content width: max 720px for text-heavy sections

### Grid
- 12-column on desktop
- 6-column on tablet
- 4-column on mobile
- Gap: 24px (desktop), 16px (mobile)

### Z-Index Hierarchy
1. Background patterns (z-0)
2. Content (z-10)
3. Floating cards/elements (z-20)
4. Navigation (z-50)
5. Modals/overlays (z-100)

---

## 7. Component Design

### Buttons
**Primary CTA**
```
Background: --katie-blue
Text: white
Padding: 14px 28px
Border-radius: 12px
Font: 16px, weight 600
Shadow: 0 4px 14px rgba(37, 99, 235, 0.25)
Hover: translateY(-1px), shadow increases
Active: translateY(0), shadow decreases
Transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)
```

**Secondary**
```
Background: transparent
Border: 1.5px solid --navy-700
Text: --navy-900
Padding: 14px 28px
Border-radius: 12px
Hover: background --slate-100
```

**Persona Buttons (Katie/Rex/Claire)**
Use respective persona colors with matching glow shadows.

### Cards
**Standard Card**
```
Background: white
Border: 1px solid --slate-200
Border-radius: 16px
Padding: 32px
Shadow: 0 1px 3px rgba(0,0,0,0.05)
Hover: shadow increases to 0 8px 30px rgba(0,0,0,0.08), translateY(-2px)
```

**Dark Card (for contrast sections)**
```
Background: --navy-800
Border: 1px solid --navy-700
Border-radius: 16px
Padding: 32px
Text: white
```

**Persona Card (for feature highlights)**
```
Background: gradient from persona-light to white
Border: 1px solid persona-color at 20% opacity
Border-radius: 16px
Padding: 32px
Top accent: 3px solid persona-color
```

### Inputs
```
Background: white
Border: 1.5px solid --slate-200
Border-radius: 12px
Padding: 12px 16px
Font: 16px
Focus: border-color --katie-blue, ring 3px --katie-blue-glow
Placeholder: --slate-400
```

### Badges
```
Padding: 6px 12px
Border-radius: 9999px
Font: 12px, weight 600, uppercase, letter-spacing 0.05em
```

---

## 8. Animation & Motion

### Principles
- Motion should feel **physical** — like real objects, not digital effects
- Use **ease-out** for elements entering (fast start, gentle stop)
- Use **ease-in-out** for continuous motion
- Duration: 200-400ms for micro-interactions, 600-800ms for reveals

### Scroll Reveals
```
Elements fade in + translateY(24px → 0)
Duration: 600ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
Stagger: 100ms between siblings
Trigger: when element is 20% in viewport
```

### Hero Animations
- **Persona avatars:** Gentle floating (translateY oscillation, 3s cycle)
- **Score counters:** Number count-up animation on first view
- **Background:** Subtle gradient shift or mesh gradient (not video)

### Hover States
- Cards: lift + shadow increase (transform + box-shadow)
- Buttons: lift + glow intensify
- Links: underline grows from left (scaleX animation)

### Page Transitions
```
Fade out: 150ms
Fade in: 300ms with slight translateY(8px → 0)
```

### Loading States
- Skeleton screens using --slate-100 with shimmer animation
- Never show spinners alone — always with context text

---

## 9. Page-Specific Design

### Homepage
**Hero Section:**
- Dark background (--gradient-hero)
- Large headline with persona names highlighted in their colors
- Subtle animated background: floating particles or gradient mesh
- Three persona cards floating on right (desktop) or stacked (mobile)
- Primary CTA: "Start Free Trial" ( Katie blue )
- Secondary CTA: "See How It Works" (outline)
- Trust bar below: "2,800+ tradespeople using whoza.ai" + star rating

**Problem/Solution Section:**
- Split layout: "Before whoza.ai" vs "With whoza.ai"
- Before: Gray, crossed-out items, sad iconography
- After: Colorful, checkmarks, persona icons

**How It Works:**
- 3 steps with large numbers (01, 02, 03)
- Each step has a persona icon associated
- Connecting line between steps (animated on scroll)

**Pricing Teaser:**
- Show 4 plan cards with included jobs prominently displayed
- Convert plan highlighted with "Most Popular" badge
- Hover reveals additional details including overage rates
- All CTAs point to full pricing page
- Trust line: "We only make more money when you do."

**Testimonials:**
- Large quote cards with trade type badge
- Include metric ("+3 jobs/month", "£2,400/year recovered")
- Auto-rotating carousel with manual controls

### Pricing Page
**Hero:**
- Clean, focused headline: "Only pay when it works. Base fee + £3 per booked job."
- Toggle: Monthly / Annual (annual shows "2 months free" badge)
- Plans in 4-column grid (3-column on tablet, 1 on mobile)

**Plan Cards:**
- Convert card: Elevated, colored border, "Most Popular" banner
- Feature list with checkmarks in persona colors
- Price: Large, tabular-nums
- Green badge: "✓ N AI-booked jobs included"
- Overage: "Then £Y per extra job" in clear text below included count
- "Start Free Trial" button per card
- Starter note: "Lead capture only — no booking automation"

**Cost Calculator:**
- Slider: "How many jobs do you book per month?"
- Shows total cost per plan including base + overage
- Highlights selected plan

**Comparison Table:**
- Old flat pricing vs new hybrid at different usage levels
- Sticky header on scroll
- Alternating row colors for readability
- Checkmarks vs crosses in green/red

### Competitor Analysis (Rex's Page)
**Hero:**
- Rex-green gradient background
- "Meet Rex" badge floating
- Large headline about competitor monitoring
- Illustration: Radar scanning, competitor map, or abstract visibility concept

**Features:**
- 3 cards: Monthly Report, Score Tracking, Weekly Tasks
- Each with Rex-green accent

**How It Works:**
- 4 steps with large numbers
- Each step shows what Rex does

**AI Team Section:**
- Three cards side by side: Katie, Rex, Claire
- Each with persona color, icon, role description
- Cards have subtle hover lift

### Voice Page (Katie/Mark's Page)
**Hero:**
- Katie-blue gradient background
- "Meet Katie (or Mark)" badge
- Headline: "Never Miss a Call. Never Miss a Job."
- Subtle sound wave animation in background

**Demo Section:**
- Phone mockup showing call transcript
- Animated typing effect for AI responses
- "Listen to a real call" audio player

**Features:**
- 6 feature cards with icons
- Each feature connects to a benefit

**Pricing:**
- Same pricing component as main pricing page
- But voice-focused descriptions

---

## 10. Visual Assets Needed

### Illustrations (Custom or Stock)
- Hero illustration: Tradesperson with phone + AI elements
- Persona illustrations: Abstract representations of Katie, Rex, Claire
- Feature illustrations: Phone call, chart climbing, star review
- Empty states: Friendly illustrations for "no data yet"

### Icons
Use **Lucide React** throughout — consistent, clean, open-source
- Persona icons: Custom SVGs combining Lucide elements
  - Katie: `Phone` + `Headphones`
  - Rex: `Search` + `TrendingUp`
  - Claire: `Star` + `MessageCircle`

### Photography
- Tradespeople at work (diverse, UK-specific)
- Phone screenshots (not generic mockups)
- Office/customer interactions
- **Avoid:** Stock photos of people in suits, generic tech imagery

---

## 11. Responsive Breakpoints

```
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: 1024px - 1280px
Wide: > 1280px
```

### Mobile-First Rules
- Hero headline: 32px (mobile) → 56px (desktop)
- Persona cards: Stack vertically on mobile
- Pricing cards: Horizontal scroll or accordion
- Navigation: Hamburger with slide-out panel
- Testimonials: Single card, swipeable

---

## 12. Dark Mode (Future)

**Background:** --navy-900
**Card:** --navy-800
**Text:** white / --slate-300
**Borders:** --navy-700
**Persona colors stay the same** (they pop more on dark)

---

## 13. Accessibility

- Minimum contrast ratio: 4.5:1 for body, 3:1 for large text
- Focus rings: 2px solid with 2px offset
- Reduced motion: Disable animations for `prefers-reduced-motion`
- Alt text for all images
- Semantic HTML throughout
- Keyboard navigation for all interactive elements

---

## 14. Competitive References

### What to Steal From
- **Linear.app** — Dark sections, subtle glows, confident spacing
- **Vercel.com** — Hero animations, floating elements, depth
- **Stripe.com** — Custom illustrations, typography hierarchy
- **Notion.so** — Content density, clean cards, practical feel
- **Claude.ai** — Warm dark mode, approachable AI feel

### What to Avoid
- **Generic SaaS templates** — Too familiar, forgettable
- **Overly playful** — Tradespeople are practical, not whimsical
- **Pure corporate** — Too sterile, no personality
- **Gradient overload** — One or two gradients max per section

---

## 15. Implementation Priority

### Phase 1 (Week 1): Foundation
1. Update global CSS variables (colors, spacing, typography)
2. Redesign buttons, cards, inputs
3. Add Inter font (Google Fonts or self-hosted)
4. Implement scroll reveal animations

### Phase 2 (Week 2): Pages
1. Homepage redesign (hero, personas, problem/solution)
2. Pricing page redesign (cards, comparison table)
3. Competitor analysis page (Rex's page)

### Phase 3 (Week 3): Polish
1. Voice page redesign (Katie/Mark's page)
2. Micro-interactions (hover states, button animations)
3. Mobile optimization
4. Performance audit

### Phase 4 (Week 4): Assets
1. Custom illustrations (if budget allows)
2. Hero background animation
3. Persona avatars
4. Final QA

---

## 16. Success Metrics

**Design quality is subjective, but measure:**
- Time on page (longer = more engaging)
- Scroll depth (deeper = more compelling)
- CTA click rate (higher = clearer value prop)
- Bounce rate (lower = better first impression)
- Conversion rate (trial signups)

**Target:** Homepage score 6.8 → 9.2 within 10 weeks. This drives 40%+ improvement in trial signups through conversion architecture, feature demonstration, and trust signal enhancements. See `9_PLUS_WORLD_CLASS_PLAN.md` for the full dimension-by-dimension roadmap.

---

## 15. 9+ World-Class Execution Plan (Reference)

The full 10-week roadmap to reach 9+ across all 8 competitive dimensions is documented in `9_PLUS_WORLD_CLASS_PLAN.md`. This design brief serves as the visual design specification within that plan.

### Quick Reference: Score Trajectory

| Week | Overall | Key Milestones |
|------|---------|----------------|
| Now | 6.8 | Design system + 5 new components deployed |
| W2 | 7.2 | Exit modal, live chat, testimonial photos |
| W4 | 7.8 | Live demo number, dashboard preview, video |
| W6 | 8.3 | Custom illustrations, hero video, performance pass |
| W8 | 8.8 | A/B tests, personalization, email nurture |
| W10 | **9.2** | Final polish, playground/sandbox, world-class complete |

### Top 3 Immediate Actions (Next 48 Hours)
1. **Phone mockup in hero** — animated phone showing Katie answering a call
2. **Live chat widget** — Intercom/Drift/Tidio installation
3. **Real testimonial photos** — 6 named tradespeople with headshots, locations, outcome tags

---

## 14. Competitive Intelligence & Benchmarking (April 30, 2026)

### 14.1 Competitive Landscape Scorecard

| Competitor | Focus | Price | Overall Score | Key Threat |
|------------|-------|-------|:-------------:|------------|
| TradeReceptionist.com | Voice-only AI receptionist | £29-119/mo | **8.3/10** | 🔴 HIGH — executes voice extremely well |
| NextPhone.com | General AI receptionist (US) | $200+/mo | **8.0/10** | 🟡 MEDIUM — strong demo, phone mockup |
| VoiceFleet.ai | General AI receptionist | $99-599/mo | **6.8/10** | 🟡 MEDIUM — live interactive demo |
| whoza.ai (current) | 3-in-1 visibility + voice + reviews | £59-349/mo + £2-3 per booked job | **5.8/10** | — |

### 14.2 Dimensional Gap Analysis

| Dimension | whoza.ai | TradeReceptionist | Gap |
|-----------|:--------:|:-----------------:|:---:|
| Visual Design | 6.5 | 8.0 | -1.5 |
| Conversion Architecture | 6.0 | 9.0 | -3.0 |
| Trust & Social Proof | 5.5 | 8.5 | -3.0 |
| Content & Messaging | 7.5 | 8.0 | -0.5 |
| Technical Performance | 7.0 | 7.5 | -0.5 |
| Feature Demonstration | 3.0 | 9.0 | **-6.0** |
| Pricing Clarity | 6.0 | 8.5 | -2.5 |
| Mobile Experience | 6.5 | 8.0 | -1.5 |

**Critical insight:** Feature demonstration is our weakest dimension (3.0/10). We have zero audio demo, zero interactive preview, zero product visualization. TradeReceptionist has a 90-second live audio player and phone mockups showing WhatsApp summaries.

### 14.3 Unique Moat (Maintain & Amplify)

whoza.ai is the **only platform combining**:
- AI visibility scoring (Rex) — nobody else has this
- AI voice answering (Katie/Mark) — TradeReceptionist has this alone
- Review collection (Claire) — nobody else has this

The 3-in-1 positioning is the core differentiator. Homepage must make this immediately obvious.

### 14.4 Elements to Adopt from Competitors

#### From TradeReceptionist.com
1. **Lost revenue calculator** — interactive sliders (already implemented)
2. **Audio demo player** — 90-second real call sample (CRITICAL)
3. **Comparison table** — whoza.ai vs Voicemail vs Human VA vs Traditional Answering
4. **WhatsApp chat widget** — floating button for live support
5. **Trust certification badges** — Gas Safe, NICEIC, FMB, TrustMark, CHAS
6. **Named testimonials with photos** — real faces, locations, outcome tags
7. **Urgency close** — "Every call you miss today is a job they book tomorrow"

#### From NextPhone.com
1. **Phone mockup in hero** — animated phone showing Katie answering a call
2. **Stats band** — 5 key metrics in large type with dark background
3. **Process pipeline visualization** — Instant pickup → AI Qualification → Smart Intake → Real-time Booking → CRM Sync
4. **Integration logo grid** — Google Calendar, WhatsApp, Outlook, ServiceM8, Apple Calendar
5. **Two-CTA hero** — "Try for Free" + "Book a Call" (catches both ready and researching visitors)
6. **Extensive FAQ** — 20+ items covering every objection
7. **"Hear us in action" audio player** — prominent button with real customer call

### 14.5 4-Week Roadmap to 8.4/10

**Week 1 — Critical (High Impact, Low-Medium Effort):**
1. Add live audio demo player (Katie answering a boiler repair call)
2. Add homepage comparison table (swipeable, 4 columns)
3. Add WhatsApp chat widget (floating green bubble)
4. Style cookie consent to match design system

**Week 2 — Trust & Conversion:**
5. Real testimonial photos + outcome tags (replace colored circles)
6. Trust certification badges band (Gas Safe, NICEIC, FMB, TrustMark, CHAS)
7. Simplify pricing teaser (3 cards on homepage, monthly/yearly toggle)
8. Urgency close in FinalCTA

**Week 3 — Feature Demo:**
9. Interactive visibility score preview widget
10. Mobile calculator optimization (touch targets ≥44px)
11. Contact form on homepage

**Week 4 — World-Class Polish:**
12. Custom illustrations / Lottie animations
13. Scroll-triggered micro-animations
14. Video background or hero animation

---

## Appendices

### A. Current Site Audit
**Strengths:**
- Clear value proposition
- Good content/copy
- Functional pricing
- Testimonials are real

**Weaknesses:**
- Generic visual identity
- No distinctive brand elements
- Emoji in UI (not premium)
- Flat, undifferentiated cards
- No animation or motion
- Template-y spacing and layouts
- Color palette is forgettable

### B. Technical Notes
- React 19 + Vite
- Tailwind CSS (or equivalent utility classes)
- Framer Motion for animations
- Lucide React for icons
- No external design system dependencies

### C. File Structure for Implementation
```
src/
  styles/
    design-system.css       /* Variables, base styles */
    animations.css          /* Keyframes, scroll reveals */
  components/
    ui/                     /* Reusable components */
      Button.jsx
      Card.jsx
      Input.jsx
      Badge.jsx
    personas/
      KatieAvatar.jsx
      RexAvatar.jsx
      ClaireAvatar.jsx
  pages/
    Home.jsx                /* Phase 2 */
    Pricing.jsx             /* Phase 2 */
    CompetitorAnalysis.jsx  /* Phase 2 */
    VoiceLanding.jsx        /* Phase 3 */
```

---

**Prepared by:** Jarvis (Meme Zoomer)
**For:** Dru, whoza.ai
**Next step:** Hand to frontend implementation agent or v0.dev for generation
