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
