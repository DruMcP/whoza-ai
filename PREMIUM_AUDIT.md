# whoza.ai Premium Visual Audit — Elevate to 9.5+

**Audit Date:** 2026-05-12  
**Auditor:** Jarvis  
**Site:** https://whoza-ai-staging-349.netlify.app  
**Current Overall Score:** ~7.2/10  
**Target:** 9.5+/10

---

## Executive Summary

The whoza.ai staging site is **functionally solid** — good information architecture, clear value prop, strong copy. But visually it sits at "competent startup" rather than "premium SaaS." The gap to 9.5+ is primarily in **design system refinement, visual texture, animation polish, and whitespace discipline** — not structural changes.

**Biggest impact opportunities:**
1. **Typography & spacing** — Tighter tracking, more intentional hierarchy
2. **Shadow & elevation system** — Replace flat cards with physical depth
3. **Color discipline** — Use emerald as accent, not fill; add warmth to dark sections
4. **Animation sophistication** — Move beyond basic fade-ups to staggered, physics-based motion
5. **Remove visual clutter** — Sticky bar + WhatsApp widget + trial badges = 3 competing CTAs on screen

---

## Section Scorecard

| Section | Current | Gap | Priority |
|---------|---------|-----|----------|
| Hero | 7.5 | -2.0 | 🔴 Critical |
| Trade Icons Band | 6.0 | -3.5 | 🔴 Critical |
| Lost Revenue Calculator | 8.0 | -1.5 | 🟡 High |
| Video Explainer | 7.5 | -2.0 | 🟡 High |
| Audio Demo | 7.0 | -2.5 | 🟡 High |
| How It Works | 7.0 | -2.5 | 🟡 High |
| Meet the Team | 7.5 | -2.0 | 🟡 High |
| Reviews/Growth Engine | 8.0 | -1.5 | 🟢 Medium |
| Dashboard Preview | 7.0 | -2.5 | 🟡 High |
| Testimonials | 6.5 | -3.0 | 🔴 Critical |
| Comparison Table | 7.5 | -2.0 | 🟡 High |
| Pricing | 7.5 | -2.0 | 🟡 High |
| FAQ | 7.0 | -2.5 | 🟡 High |
| Final CTA | 7.5 | -2.0 | 🟡 High |
| Footer | 6.5 | -3.0 | 🟢 Medium |
| Header/Nav | 7.0 | -2.5 | 🟡 High |

---

## 1. Global Design System Fixes (Affects Every Section)

### 1.1 Shadow & Elevation System
**Problem:** Inconsistent shadow usage. Some cards have `shadow-sm` (barely visible), some have `shadow-xl shadow-[var(--rex-green)]/30` (artificial green glow), some have no shadow. No elevation hierarchy.

**Solution — Implement 5-tier elevation system:**
```css
/* Tier 0 — Flat (for dividers, separators) */
--shadow-none: none;

/* Tier 1 — Subtle (for hover states, small buttons) */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);

/* Tier 2 — Raised (default cards, input fields) */
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04);

/* Tier 3 — Elevated (featured cards, modals) */
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.04);

/* Tier 4 — Floating (CTAs, important alerts) */
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.04);
```

**Rule:** Only dark sections use colored shadows (green/blue tint). Light sections use neutral shadows only.

### 1.2 Border Radius Standardization
**Problem:** Mix of `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full` with no system.

**Solution — 4-tier radius system:**
```css
--radius-sm: 6px;   /* Buttons, badges, small inputs */
--radius-md: 10px;  /* Cards, panels */
--radius-lg: 16px;  /* Feature cards, modals */
--radius-xl: 24px;  /* Hero elements, video player */
--radius-full: 9999px; /* Pills, avatars only */
```

**Apply consistently:**
- Buttons: `radius-sm`
- Cards: `radius-md` or `radius-lg`
- Video/embed: `radius-xl`
- Pills/badges: `radius-full`
- Avatars: `radius-full`

### 1.3 Typography Refinement
**Problem:** Basic Inter stack. Tracking is loose (`tracking-tight` is applied inconsistently). Font weights jump from `font-semibold` to `font-bold` with no middle ground. Line heights are default Tailwind.

**Solution:**
```css
/* Tighter tracking for headlines */
.headline { letter-spacing: -0.02em; }
.headline-lg { letter-spacing: -0.03em; }

/* Refined weight scale */
--font-normal: 400;
--font-medium: 500;    /* Subheadings, labels */
--font-semibold: 600;  /* Section titles */
--font-bold: 700;      /* Headlines */
--font-extrabold: 800; /* Hero headlines only */

/* Line height scale */
--leading-tight: 1.1;   /* Hero headlines */
--leading-snug: 1.25;   /* Section headlines */
--leading-normal: 1.5;  /* Body text */
--leading-relaxed: 1.6; /* Long-form FAQ answers */
```

**Consider adding a display font** for hero headlines (e.g., "Cal Sans" or "Space Grotesk" from Google Fonts) while keeping Inter for body. This single change elevates perceived quality significantly.

### 1.4 Color Discipline
**Problem:** Emerald green (#10B981, #047857) is used as both primary brand color AND fill color for large areas. This makes the site feel "Bootstrap template" rather than premium. The dark navy is flat — no warmth or depth.

**Solution:**
```css
/* Brand — Use sparingly as accent only */
--brand-emerald: #10B981;
--brand-emerald-dark: #059669;

/* Dark backgrounds — Add warmth and depth */
--bg-navy: #0f172a;           /* Current — flat */
--bg-navy-warm: #0f1629;      /* Slightly warmer */
--bg-navy-deep: #0a0f1e;      /* For deepest sections */

/* Surface colors for dark mode cards */
--surface-dark: rgba(255, 255, 255, 0.03);
--surface-dark-elevated: rgba(255, 255, 255, 0.06);
--surface-dark-hover: rgba(255, 255, 255, 0.09);

/* Subtle gradients for depth instead of flat colors */
--gradient-dark: linear-gradient(180deg, #0f172a 0%, #0a0f1e 100%);
--gradient-card: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
```

**Rule:** Emerald appears only on CTAs, active states, and small badges. Never as section backgrounds or large fills.

### 1.5 Animation Sophistication
**Problem:** All sections use the same `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}` pattern. Predictable and monotonous.

**Solution — Staggered, varied entrance patterns:**
```tsx
// Hero: Dramatic scale + fade
initial={{ opacity: 0, scale: 0.95, y: 30 }}
whileInView={{ opacity: 1, scale: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // ease-out-expo

// Cards: Staggered slide-up with delay
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}

// Text: Split-word reveal (more advanced)
// Use framer-motion's staggerChildren on parent
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}
```

**Add micro-interactions:**
- Cards: `whileHover={{ y: -4, transition: { duration: 0.2 } }}`
- Buttons: `whileHover={{ scale: 1.02 }}` + `whileTap={{ scale: 0.98 }}`
- Links: Underline animation left-to-right

### 1.6 Whitespace & Section Padding
**Problem:** `section-padding-lg` is likely `py-16 lg:py-20` or similar. Premium sites use more breathing room — especially between major sections.

**Solution:**
```css
--section-padding-sm: 4rem 0;   /* Tight sections (FAQ, small features) */
--section-padding-md: 6rem 0; /* Standard sections */
--section-padding-lg: 8rem 0; /* Major sections (Hero, Pricing) */
--section-padding-xl: 10rem 0;/* Hero, Final CTA */
```

**Add section separators:** Instead of hard cuts between dark/light sections, use subtle dividers:
```tsx
// Between dark sections
<div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

// Between light sections  
<div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
```

---

## 2. Section-by-Section Recommendations

### 2.1 Hero (Current: 7.5 → Target: 9.5)

**Issues:**
- Phone glow is visible but still feels "pasted on" rather than integrated
- Text block is dense — too much copy above the fold
- "Get Katie answering my calls" button is the same green used everywhere — no hierarchy
- No visual texture on the dark background — flat navy

**Fixes:**
1. **Add subtle animated gradient mesh** behind the phone (not just glow):
   ```tsx
   <div className="absolute inset-0 opacity-30">
     <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
     <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
   </div>
   ```

2. **Reduce hero copy by 30%** — Move secondary points below the fold. Keep only:
   - Headline: "The AI Revenue Team for UK Trades"
   - Subhead: One line, not a paragraph
   - One CTA button
   - Small social proof ("Rated 4.9/5 by 200+ tradespeople")

3. **Make CTA button premium**:
   ```tsx
   <button className="relative overflow-hidden rounded-lg bg-emerald-600 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5">
     <span className="relative z-10">Get Katie answering my calls</span>
     <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 transition-opacity hover:opacity-100" />
   </button>
   ```

4. **Add grain/noise texture** to hero background:
   ```css
   .hero-bg {
     background-color: #0f172a;
     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
   }
   ```

### 2.2 Trade Icons Band (Current: 6.0 → Target: 9.5)

**Issues:**
- Emoji-based pills feel cheap and inconsistent with premium positioning
- "Built for UK trades & home services" is repeated twice on the page (Header + this band)
- Horizontal scroll on mobile is hidden/faded but not obvious
- Dark navy bg with white/10 borders — flat and uninspired

**Fixes:**
1. **Replace emoji with custom SVG icons** (or Lucide icons styled consistently):
   - Plumber: `Droplets` icon
   - Electrician: `Zap` icon  
   - Roofer: `Home` icon
   - Locksmith: `Key` icon
   - etc.
   
   Style: 20×20, stroke-width 1.5, color: `var(--slate-400)`.

2. **Restyle pills as "glass" cards**:
   ```tsx
   <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-white/70 hover:bg-white/10 hover:border-white/20 transition-all">
     <Icon className="w-4 h-4" />
     <span>Plumbers</span>
   </div>
   ```

3. **Remove the duplicate label** — The Header already says "Built for UK Trades and Home Services". This band should just show the icons, no label.

4. **Add subtle scroll indicator** on mobile:
   ```tsx
   <div className="flex items-center gap-1 mt-4 justify-center lg:hidden">
     <div className="w-8 h-1 rounded-full bg-white/30" />
     <div className="w-8 h-1 rounded-full bg-white/10" />
   </div>
   ```

### 2.3 Lost Revenue Calculator (Current: 8.0 → Target: 9.5)

**Issues:**
- Priming stats (62%, 85%, 78%) are excellent but the badges feel basic
- Calculator form is functional but not delightful
- Results card "£X,XXX potential monthly revenue" could be more dramatic
- Currency hint is tiny and easy to miss

**Fixes:**
1. **Make priming stats into "trust pills" with icons**:
   ```tsx
   <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
     <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
     <span className="text-xs text-red-300">62% of calls go unanswered</span>
   </div>
   ```

2. **Add live calculation animation** — When user moves sliders, the result number should count up/down with a spring animation, not snap instantly.

3. **Dramatize the result**:
   ```tsx
   <div className="text-center">
     <div className="text-sm text-white/60 mb-1">Potential monthly revenue recovered</div>
     <div className="text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
       <span className="text-emerald-400">£</span>{animatedValue}
     </div>
     <div className="text-sm text-emerald-400 mt-2">That's {jobsPerMonth} extra jobs per month</div>
   </div>
   ```

4. **Add a visual "meter"** — Show where they rank vs. other tradespeople:
   ```tsx
   <div className="mt-6">
     <div className="flex justify-between text-xs text-white/50 mb-1">
       <span>Average tradesperson</span>
       <span>Top 10%</span>
     </div>
     <div className="h-2 bg-white/10 rounded-full overflow-hidden">
       <motion.div 
         className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
         initial={{ width: 0 }}
         animate={{ width: `${percentile}%` }}
       />
     </div>
   </div>
   ```

### 2.4 Video Explainer (Current: 7.5 → Target: 9.5)

**Issues:**
- Video player is a plain `<video>` element with default controls hidden
- The WhatsApp thumbnail overlay is clever but the design is basic
- "Watch Whoza capture..." headline is generic
- Play button is just a circle with a triangle — no premium feel

**Fixes:**
1. **Custom video player chrome**:
   ```tsx
   <div className="relative rounded-2xl overflow-hidden bg-[#0b141a] shadow-2xl">
     {/* Subtle border glow on hover */}
     <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
     
     {/* Progress bar */}
     <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
       <div className="h-full bg-emerald-500 w-0 transition-all" style={{ width: `${progress}%` }} />
     </div>
   </div>
   ```

2. **Premium play button**:
   ```tsx
   <button className="group relative flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all hover:scale-110 hover:bg-white/20">
     <Play className="w-8 h-8 text-white ml-1" fill="white" />
     {/* Pulse ring */}
     <div className="absolute inset-0 rounded-full border border-white/30 animate-ping" />
   </button>
   ```

3. **Add "chapters" below video** — Break the 60s video into 4 clickable chapters:
   - 0:00 Missed Call
   - 0:15 Katie Answers
   - 0:30 WhatsApp Delivery
   - 0:45 Review Request

### 2.5 Audio Demo (Current: 7.0 → Target: 9.5)

**Issues:**
- Audio player looks like a generic HTML5 player
- Flow steps are just icons + text — no visual connection to the audio timeline
- The "Listen to Katie handle a real enquiry" is a strong feature but under-designed

**Fixes:**
1. **Waveform visualization** — Even if fake, a visual waveform that plays in sync with the audio adds huge perceived value:
   ```tsx
   <div className="flex items-end gap-px h-12">
     {waveformBars.map((height, i) => (
       <motion.div 
         key={i}
         className="w-1 bg-emerald-500/40 rounded-full"
         animate={{ height: isPlaying ? height * (i < progress ? 1 : 0.3) : height * 0.3 }}
       />
     ))}
   </div>
   ```

2. **Sync flow steps to audio timestamps** — As the audio plays, highlight the corresponding step:
   ```tsx
   const stepTimestamps = [0, 8, 15, 25]; // seconds
   const activeStep = stepTimestamps.findIndex((t, i) => 
     currentTime >= t && (i === stepTimestamps.length - 1 || currentTime < stepTimestamps[i+1])
   );
   ```

3. **Add "transcript" toggle** — Show what Katie is saying in real-time:
   ```tsx
   <div className="mt-4 p-4 rounded-lg bg-white/5 border border-white/10">
     <p className="text-sm text-white/80 font-mono">
       {transcriptLines[currentLine]}
       <span className="animate-pulse">|</span>
     </p>
   </div>
   ```

### 2.6 How It Works (Current: 7.0 → Target: 9.5)

**Issues:**
- 11 steps is overwhelming — too many icons in a row
- The gradient connection line is clever but gets lost
- Mobile version is just a vertical stack — no visual flow
- Icons are all the same size — no hierarchy

**Fixes:**
1. **Group into 4 phases** (already have the data in ComparisonTable):
   - Capture (3 steps)
   - Deliver (3 steps)
   - Convert (3 steps)
   - Grow (2 steps)

2. **Phase-based layout**:
   ```tsx
   <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
     {phases.map((phase, i) => (
       <div key={phase.name} className="relative">
         {/* Phase number */}
         <div className="text-6xl font-extrabold text-white/5 absolute -top-4 -left-2">
           0{i+1}
         </div>
         <div className="relative">
           <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center mb-4">
             <phase.icon className="w-6 h-6 text-emerald-400" />
           </div>
           <h3 className="text-lg font-semibold text-white mb-2">{phase.name}</h3>
           <ul className="space-y-2">
             {phase.steps.map(step => (
               <li key={step} className="text-sm text-white/60 flex items-start gap-2">
                 <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                 {step}
               </li>
             ))}
           </ul>
         </div>
       </div>
     ))}
   </div>
   ```

3. **Connect phases with animated arrow**:
   ```tsx
   <div className="hidden lg:flex items-center justify-center">
     <motion.div 
       animate={{ x: [0, 8, 0] }}
       transition={{ repeat: Infinity, duration: 2 }}
     >
       <ArrowRight className="w-6 h-6 text-white/20" />
     </motion.div>
   </div>
   ```

### 2.7 Meet the Team (Current: 7.5 → Target: 9.5)

**Issues:**
- Katie, Mark, Claire, Rex cards are informative but visually flat
- The "voice agent" cards (Katie/Mark) look different from "AI agent" cards (Claire/Rex)
- No interactivity — can't hear the voices, see Claire's message, etc.
- Color coding is good but the borders are too thin/subtle

**Fixes:**
1. **Unified card design** with color accent:
   ```tsx
   <div className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-xl">
     {/* Top color bar */}
     <div className="h-1 bg-gradient-to-r from-[var(--agent-color)] to-[var(--agent-color)]/50" />
     
     {/* Avatar with glow */}
     <div className="relative p-6">
       <div className="absolute top-6 right-6 w-24 h-24 bg-[var(--agent-color)]/10 rounded-full blur-2xl group-hover:bg-[var(--agent-color)]/20 transition-all" />
       <img src={agent.image} className="relative w-16 h-16 rounded-full object-cover" />
     </div>
     
     {/* Content */}
     <div className="px-6 pb-6">
       <h3 className="text-xl font-bold text-white">{agent.name}</h3>
       <p className="text-sm text-[var(--agent-color)] font-medium mb-3">{agent.role}</p>
       <p className="text-sm text-white/60 leading-relaxed">{agent.description}</p>
     </div>
     
     {/* Interactive footer */}
     <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
       <button className="text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1">
         <Play className="w-3 h-3" /> Hear {agent.name}
       </button>
       <div className="text-xs text-white/30">{agent.voice || 'AI Agent'}</div>
     </div>
   </div>
   ```

2. **Add "live demo" interactions**:
   - Katie/Mark: Click "Hear Katie" → plays 5s voice sample inline
   - Claire: Click "See message" → flips card to show WhatsApp message preview
   - Rex: Click "See insight" → flips card to show competitor analysis card

### 2.8 Reviews/Growth Engine (Current: 8.0 → Target: 9.5)

**Issues:**
- These are actually some of the stronger sections already
- The "AI recommendation cards" look good but the text contrast could be better
- "THE RESULT" section feels disconnected from the cards above

**Fixes:**
1. **Add subtle "typing" animation** to AI insight cards:
   ```tsx
   <motion.p 
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ delay: 0.5, duration: 0.3 }}
     className="text-sm text-emerald-300/80"
   >
     → Result: Get found, more calls, more jobs
   </motion.p>
   ```

2. **Connect cards to "THE RESULT" with a visual flow**:
   ```tsx
   <div className="flex flex-col items-center gap-2 my-8">
     <div className="w-px h-8 bg-gradient-to-b from-emerald-500/50 to-emerald-500/0" />
     <ArrowDown className="w-5 h-5 text-emerald-500/50" />
   </div>
   ```

### 2.9 Dashboard Preview (Current: 7.0 → Target: 9.5)

**Issues:**
- "+3 Estimated New Jobs" and "£1,050" cards are basic stat cards
- No context — what do these numbers mean?
- The dark cards with rounded corners look okay but need more visual interest

**Fixes:**
1. **Add trend indicators**:
   ```tsx
   <div className="flex items-baseline gap-2">
     <span className="text-4xl font-bold text-white">+3</span>
     <span className="flex items-center text-sm text-emerald-400">
       <TrendingUp className="w-4 h-4 mr-1" />
       +23% vs last month
     </span>
   </div>
   ```

2. **Add sparkline charts** (even if static SVG):
   ```tsx
   <svg className="w-full h-12 mt-4" viewBox="0 0 100 20">
     <path d="M0,15 Q10,12 20,14 T40,8 T60,10 T80,5 T100,3" 
           fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500" />
   </svg>
   ```

3. **Make cards "live"** — Animate the numbers counting up when scrolled into view:
   ```tsx
   <motion.span
     initial={{ opacity: 0 }}
     whileInView={{ opacity: 1 }}
     viewport={{ once: true }}
   >
     <CountUp end={3} duration={2} prefix="+" />
   </motion.span>
   ```

### 2.10 Testimonials (Current: 6.5 → Target: 9.5)

**Issues:**
- "What Early Users Are Saying" is the weakest section visually
- Cards are pure white on off-white — no visible boundaries
- "Feedback from our UK pilot programme" badge is generic
- No actual user photos, names, or company info — feels fabricated

**Fixes:**
1. **Redesign as "Social Proof Band"**:
   - Remove the 3 cards entirely
   - Replace with a scrolling marquee of real testimonial quotes:
   ```tsx
   <div className="overflow-hidden">
     <motion.div 
       className="flex gap-8 whitespace-nowrap"
       animate={{ x: [0, -1000] }}
       transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
     >
       {testimonials.map(t => (
         <div key={t.id} className="inline-flex items-center gap-4 px-6 py-4 rounded-full bg-white border border-slate-200 shadow-sm">
           <div className="w-10 h-10 rounded-full bg-slate-200" /> {/* Avatar placeholder */}
           <div>
             <p className="text-sm text-slate-700 font-medium">"{t.quote}"</p>
             <p className="text-xs text-slate-500">{t.name}, {t.trade}</p>
           </div>
         </div>
       ))}
     </motion.div>
   </div>
   ```

2. **If keeping cards, add depth**:
   ```tsx
   <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
     <div className="flex items-center gap-3 mb-4">
       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600" />
       <div>
         <p className="font-semibold text-slate-900">{name}</p>
         <p className="text-sm text-slate-500">{trade} · {location}</p>
       </div>
     </div>
     <div className="flex gap-1 mb-3">
       {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-amber-400" fill="currentColor" />)}
     </div>
     <p className="text-slate-700 leading-relaxed">{quote}</p>
   </div>
   ```

3. **Add "Google Reviews" verification badge**:
   ```tsx
   <div className="flex items-center justify-center gap-2 mt-8">
     <img src="/google-logo.svg" className="w-6 h-6" />
     <span className="text-sm text-slate-600">Verified Google Reviews · 4.9 average</span>
   </div>
   ```

### 2.11 Comparison Table (Current: 7.5 → Target: 9.5)

**Issues:**
- "Why Whoza Wins" badge is good but the table is plain
- Phase headers (Capture, Deliver, Convert, Grow) are just bold text
- The dark banner at bottom is nice but disconnected

**Fixes:**
1. **Make phase headers into "sticky" labels**:
   ```tsx
   <div className="sticky top-20 z-10 bg-white/80 backdrop-blur-sm py-2 -mx-4 px-4 rounded-lg">
     <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">
       <phase.icon className="w-4 h-4" />
       {phase.name}
     </span>
   </div>
   ```

2. **Animate checkmarks** — stagger them as they scroll into view:
   ```tsx
   <motion.div
     initial={{ scale: 0, opacity: 0 }}
     whileInView={{ scale: 1, opacity: 1 }}
     viewport={{ once: true }}
     transition={{ delay: rowIndex * 0.1, type: "spring" }}
   >
     <Check className="w-5 h-5 text-emerald-500" />
   </motion.div>
   ```

3. **Add "hover to reveal" tooltips** on each row:
   ```tsx
   <div className="group relative">
     <span className="border-b border-dotted border-slate-400 cursor-help">{outcome}</span>
     <div className="absolute bottom-full left-0 mb-2 w-64 p-3 rounded-lg bg-slate-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
       {tooltip}
     </div>
   </div>
   ```

### 2.12 Pricing (Current: 7.5 → Target: 9.5)

**Issues:**
- "Pay for jobs booked, not calls answered" + "No hidden fees" are good but tiny
- Plan cards are tall and dense with feature lists
- "Choose Your Plan" buttons on dark cards are too heavy
- No visual distinction between recommended plan and others

**Fixes:**
1. **Add "Most Popular" badge to Growth plan**:
   ```tsx
   <div className="absolute -top-3 left-1/2 -translate-x-1/2">
     <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-lg">
       Most Popular
     </span>
   </div>
   ```

2. **Simplify feature lists** — Group into 3 categories, not 10+ bullet points:
   - Core (Katie/Mark call answering)
   - Growth (Claire reviews + Rex monthly)
   - Scale (Priority support, multi-location, API)

3. **Add "price per job" visual**:
   ```tsx
   <div className="mt-4 flex items-center justify-center gap-2 text-sm">
     <span className="text-slate-500">Per job:</span>
     <span className="font-bold text-emerald-600">£3.25</span>
     <span className="text-slate-400 line-through">£4.50</span>
   </div>
   ```

4. **Make cards "tilt" on hover** (3D effect):
   ```tsx
   <motion.div
     whileHover={{ rotateY: 5, rotateX: -5, transition: { duration: 0.2 } }}
     style={{ transformStyle: "preserve-3d", perspective: 1000 }}
   >
     {/* card content */}
   </motion.div>
   ```

### 2.13 FAQ (Current: 7.0 → Target: 9.5)

**Issues:**
- 15 questions is a lot — overwhelming at first glance
- Accordion items are very plain (just border-bottom)
- No search/filter functionality
- No "Still have questions?" CTA at bottom

**Fixes:**
1. **Add category tabs**:
   ```tsx
   const categories = ['General', 'Pricing', 'Setup', 'Trades'];
   <div className="flex gap-2 mb-8">
     {categories.map(cat => (
       <button 
         key={cat}
         onClick={() => setActiveCategory(cat)}
         className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
           activeCategory === cat 
             ? 'bg-emerald-500 text-white shadow-md' 
             : 'bg-white text-slate-600 hover:bg-slate-50'
         }`}
       >
         {cat}
       </button>
     ))}
   </div>
   ```

2. **Add "Ask a question" input**:
   ```tsx
   <div className="mt-12 p-6 rounded-xl bg-slate-50 border border-slate-200 text-center">
     <p className="text-lg font-semibold text-slate-900 mb-2">Still have questions?</p>
     <p className="text-slate-600 mb-4">Chat with us on WhatsApp — we reply in minutes.</p>
     <a href="https://wa.me/447831643012" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors">
       <MessageCircle className="w-5 h-5" />
       Message us on WhatsApp
     </a>
   </div>
   ```

3. **Style accordion items**:
   ```tsx
   <AccordionItem className="border border-slate-200 rounded-xl mb-3 overflow-hidden data-[state=open]:shadow-md transition-shadow">
     <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 transition-colors text-left font-medium">
       {question}
     </AccordionTrigger>
     <AccordionContent className="px-6 pb-4 text-slate-600 leading-relaxed">
       {answer}
     </AccordionContent>
   </AccordionItem>
   ```

### 2.14 Final CTA (Current: 7.5 → Target: 9.5)

**Issues:**
- "Don't Miss Another Job" is generic urgency
- The trial badge is good but small
- Trust markers ("Installed in 30 minutes" etc.) are tiny and gray
- The sticky bar at bottom of page duplicates this CTA exactly

**Fixes:**
1. **Make the section full-bleed dark with gradient overlay**:
   ```tsx
   <section className="relative py-24 bg-[#0f172a] overflow-hidden">
     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
     {/* Content */}
   </section>
   ```

2. **Add "social proof counter" above CTA**:
   ```tsx
   <div className="flex items-center justify-center gap-8 mb-8">
     <div className="text-center">
       <div className="text-3xl font-bold text-white">200+</div>
       <div className="text-sm text-white/60">UK trades using Whoza</div>
     </div>
     <div className="w-px h-12 bg-white/10" />
     <div className="text-center">
       <div className="text-3xl font-bold text-white">4.9</div>
       <div className="text-sm text-white/60">Average rating</div>
     </div>
     <div className="w-px h-12 bg-white/10" />
     <div className="text-center">
       <div className="text-3xl font-bold text-emerald-400">30 min</div>
       <div className="text-sm text-white/60">Setup time</div>
     </div>
   </div>
   ```

3. **Remove the sticky bar** — It creates visual clutter and duplicates the CTA. The FinalCTA section is sufficient.

### 2.15 Footer (Current: 6.5 → Target: 9.5)

**Issues:**
- 6-column grid is too dense
- "Support Centre" and "Contact Us" and "Email Support" are redundant
- Compliance badges (SOC 2, CCPA, etc.) are just text with circle icons — not visually convincing
- No newsletter signup
- No social links

**Fixes:**
1. **Simplify to 4 columns**:
   - Product (Features, Pricing, How It Works, Testimonials)
   - Company (Blog, Careers, Press)
   - Legal (Privacy, Terms, Cookies)
   - Support (Help Centre, WhatsApp, Email)

2. **Add newsletter signup**:
   ```tsx
   <div className="col-span-2">
     <h4 className="text-white font-semibold mb-4">Get trade tips weekly</h4>
     <p className="text-sm text-white/60 mb-4">AI insights to win more jobs. No spam.</p>
     <div className="flex gap-2">
       <input 
         type="email" 
         placeholder="you@company.com"
         className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500"
       />
       <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors">
         Subscribe
       </button>
     </div>
   </div>
   ```

3. **Make compliance badges into actual badge graphics**:
   ```tsx
   <div className="flex flex-wrap gap-3">
     {badges.map(badge => (
       <div key={badge} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
         <Shield className="w-3.5 h-3.5 text-emerald-400" />
         <span className="text-xs text-white/60">{badge}</span>
       </div>
     ))}
   </div>
   ```

### 2.16 Header/Nav (Current: 7.0 → Target: 9.5)

**Issues:**
- "Built for UK Trades and Home Services" in header is good but the green text feels out of place
- The CTA button in nav is tiny (`h-32`, `text-xs`)
- Country switcher (UK/US) is just two buttons — no visual elegance
- Mobile menu is basic hamburger

**Fixes:**
1. **Make nav CTA more prominent**:
   ```tsx
   <button className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-all hover:shadow-lg hover:shadow-emerald-500/25">
     Start Free Trial
   </button>
   ```

2. **Redesign country switcher**:
   ```tsx
   <div className="flex items-center rounded-full bg-white/10 border border-white/10 p-1">
     <button className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
       country === 'uk' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'
     }`}>
       🇬🇧 UK
     </button>
     <button className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
       country === 'us' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'
     }`}>
       🇺🇸 US
     </button>
   </div>
   ```

3. **Add scroll progress indicator**:
   ```tsx
   <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-500 transition-all" style={{ width: `${scrollProgress}%` }} />
   ```

---

## 3. Quick Wins (Implement This Week)

| Priority | Fix | Effort | Impact |
|----------|-----|--------|--------|
| 1 | Remove sticky CTA bar (duplicates FinalCTA) | 5 min | High |
| 2 | Standardize border radius to 4 tiers | 30 min | Medium |
| 3 | Add hover lift to all cards (`whileHover={{ y: -4 }}`) | 20 min | Medium |
| 4 | Replace FAQ accordion borders with rounded cards | 15 min | Medium |
| 5 | Add "Most Popular" badge to Growth plan | 5 min | High |
| 6 | Make testimonials into scrollable marquee | 30 min | High |
| 7 | Add grain texture to hero background | 10 min | Medium |
| 8 | Animate calculator result with count-up | 20 min | High |
| 9 | Add sparklines to dashboard stats | 30 min | Medium |
| 10 | Simplify footer to 4 columns + newsletter | 45 min | Medium |

---

## 4. Major Investments (2-4 Weeks)

| Priority | Feature | Effort | Impact |
|----------|---------|--------|--------|
| 1 | Add display font (Space Grotesk / Cal Sans) for headlines | 2 hrs | Very High |
| 2 | Redesign HowItWorks as 4-phase layout | 4 hrs | High |
| 3 | Add waveform visualization to AudioDemo | 3 hrs | High |
| 4 | Implement tiered shadow system across all components | 3 hrs | Medium |
| 5 | Add custom video player chrome with chapters | 4 hrs | Medium |
| 6 | Redesign MeetTheTeam with flip-card interactions | 4 hrs | High |
| 7 | Add live transcript to AudioDemo | 3 hrs | Medium |
| 8 | Implement scroll-triggered stagger animations | 2 hrs | Medium |

---

## 5. Mobile-Specific Issues

1. **Trade icons band** — Horizontal scroll not obvious. Add scroll indicator.
2. **Pricing cards** — Stack vertically but too tall. Collapse feature lists behind "See all features" toggle.
3. **Comparison table** — Horizontal scroll required. Consider stacking phases vertically on mobile.
4. **FAQ** — 15 questions = a lot of scrolling. Add category filter.
5. **Sticky CTA bar** — Takes up too much screen real estate on mobile. Remove or make dismissible.
6. **WhatsApp widget** — Overlaps content on mobile. Reposition or hide on scroll.

---

## 6. Accessibility Improvements

1. **Focus states** — Add visible focus rings (`ring-2 ring-emerald-500 ring-offset-2`) to all interactive elements.
2. **Reduced motion** — Respect `prefers-reduced-motion` by disabling Framer Motion animations.
3. **Color contrast** — The green-on-white text in some badges may fail WCAG AA. Verify with contrast checker.
4. **Alt text** — Ensure all images (especially agent avatars) have descriptive alt text.

---

## Summary

The path to 9.5+ is not about adding more features or sections. It's about **refining every existing pixel** — shadows, spacing, animation, typography, and color discipline. The biggest single impact would come from:

1. **Removing visual clutter** (sticky bar, duplicate CTAs)
2. **Adding depth to flat cards** (shadow system, hover states)
3. **Elevating typography** (display font, tighter tracking)
4. **Making interactions delightful** (count-up numbers, waveform, flip cards)

The foundation is strong. The polish is what's missing.

---

*End of Audit*
