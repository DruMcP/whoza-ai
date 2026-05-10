# WHUZA.AI HERO SECTION — WORLD-CLASS BUILD PROMPT v4.0
## Zero Errors. Zero Ambiguity. 9.5/10 Execution.
### Staging: https://whoza-ai-staging-349.netlify.app/
### Date: 10 May 2026 | FINAL PRODUCTION SPEC

---

## BUILDER QUICK START (Read This First — 60 Seconds)

1. **You have PNG icon images attached.** Convert to SVG first (Vectorizer.AI or Illustrator). If impossible in 24hrs, use PNG at 2× resolution and update all `src` paths from `.svg` to `.png`.
2. **Build in order: P0 → P1 → P2.** Do not skip. Do not start P2 until P0 and P1 are live.
3. **The phone mockup is pure CSS.** No images needed for the frame. Only icons go inside it.
4. **Test on real devices before declaring done:** iPhone SE (375px) and 1366×768 laptop.
5. **If any element cannot be built exactly as specified, remove it entirely.** A broken element scores 0. No element is better than a broken one.
6. **Run Lighthouse before handoff.** Mobile score must be ≥90. LCP <1.2s. If not, fix performance section before declaring complete.

---

## P0 — ASSET PREPARATION + EMERGENCY FIXES (Deploy Today)

---

### P0.1 ICON ASSET CONVERSION (Do This Before Writing Code)

**Input:** You have 2 PNG images containing the persona icon set and UI icon set.

**Output Required:**

```
/public/icons/
  /personas/
    katie.svg          (64×64 viewBox, coral #FF6B6B)
    katie-mono.svg     (64×64 viewBox, stroke-only #1A1A2E, 2px stroke)
    mark.svg           (64×64 viewBox, teal #0F4C75)
    mark-mono.svg      (64×64 viewBox, stroke-only #1A1A2E, 2px stroke)
    claire.svg         (64×64 viewBox, gold #F6B93B)
    claire-mono.svg    (64×64 viewBox, stroke-only #1A1A2E, 2px stroke)
    rex.svg            (64×64 viewBox, emerald #00B894)
    rex-mono.svg       (64×64 viewBox, stroke-only #1A1A2E, 2px stroke)
  /ui/
    phone.svg, whatsapp.svg, sms.svg, email.svg
    accept-job.svg, decline-job.svg, callback.svg
    review-star.svg, competitor.svg, ai-visibility.svg
    calendar.svg, location.svg, money.svg, security.svg
    setup.svg, 24-7.svg, play.svg, close.svg, menu.svg, chevron.svg
    (All: 24×24 viewBox, 2px stroke, monochrome default)
  /favicon/
    favicon.ico (32×32, from simplified Katie silhouette)
    favicon-16x16.png
    favicon-32x32.png
    apple-touch-icon.png
```

**SVG Conversion Method:**
1. Go to https://vectorizer.ai/ or use Adobe Illustrator
2. Upload each persona icon PNG
3. Settings: High detail, 64×64 viewBox, preserve colours exactly as shown
4. Export as SVG. Open in code editor. Remove all `<title>`, `<desc>`, and editor metadata.
5. Run through https://jakearchibald.github.io/svgomg/ with "Precision: 2", "Prefer viewBox to width/height"
6. Verify file size <5KB per icon.

**Monochrome Variant Method:**
1. Open the coloured SVG in code editor
2. Remove all `fill` attributes
3. Add to root `<svg>`: `stroke="#1A1A2E" stroke-width="2" fill="none"`
4. Ensure all paths use `stroke-linecap="round" stroke-linejoin="round"`

**Fallback (If SVG Conversion Fails):**
- Use the PNGs at 2× resolution (128×128 source, display at 64×64 via CSS)
- Optimise through https://tinypng.com/
- Update ALL `<img src>` in this prompt from `.svg` to `.png`
- Add `width="64" height="64"` explicitly to every `<img>` tag
- **Warning:** This will slightly reduce dark-mode quality and crispness at small sizes. SVG strongly preferred.

**Deadline:** 4 hours.

---

### P0.2 FIX OR REMOVE THE BROKEN LIVE COUNTER

**Current:** "Since you opened this page, UK trades have missed 0 calls. That's approximately £0 in lost work."

**This single element is destroying credibility for every data claim on the site.**

**Fix (Preferred):**

Replace the existing counter markup with this exact implementation:

```html
<div class="live-counter" id="live-counter">
  <p class="counter-text">
    Since you opened this page, UK trades have missed 
    <span class="counter-number" id="missed-calls">0</span> 
    calls. That's approximately 
    <span class="counter-number" id="lost-value">£0</span> 
    in lost work.
  </p>
  <p class="counter-source">Source: ONS Business Population Estimates 2025</p>
</div>
```

```javascript
(function() {
  var callRatePerSecond = 0.31;
  var avgJobValue = 120;
  var conversionRate = 0.35;

  var callsEl = document.getElementById('missed-calls');
  var valueEl = document.getElementById('lost-value');

  if (!callsEl || !valueEl) return;

  var elapsed = 0;

  setInterval(function() {
    elapsed++;
    var calls = Math.floor(elapsed * callRatePerSecond);
    var value = Math.floor(calls * avgJobValue * conversionRate);

    callsEl.textContent = calls.toLocaleString('en-GB');
    valueEl.textContent = '£' + value.toLocaleString('en-GB');
  }, 1000);
})();
```

```css
.live-counter {
  text-align: center;
  padding: 24px 0;
  border-top: 1px solid #E2E8F0;
  margin-top: 32px;
}

.counter-text {
  font-size: 15px;
  color: #475569;
  line-height: 1.6;
  margin: 0;
}

.counter-number {
  font-weight: 700;
  color: #1A1A2E;
  font-variant-numeric: tabular-nums;
  min-width: 3ch;
  display: inline-block;
}

.counter-number:empty::before {
  content: '...';
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.counter-source {
  font-size: 12px;
  color: #94A3B8;
  margin: 8px 0 0;
}
```

**Remove (Only if Fix Fails):**
Delete the entire `#live-counter` block from the DOM. Do not leave empty space or placeholder text.

**Deadline:** 4 hours.

---

### P0.3 REMOVE "VERIFIED GOOGLE REVIEWS · 5.0 RATING" BADGE

**Action:**
1. Remove the badge entirely.
2. Change section heading to: "What Early Users Are Saying"
3. Add: `<p class="pilot-note">Feedback from our UK pilot programme</p>`
4. Remove "Garth McPherson" testimonial or add: `<span class="relation-note">Family member of founder</span>`

```css
.pilot-note {
  font-size: 14px;
  color: #718096;
  margin-bottom: 24px;
  text-align: center;
}

.relation-note {
  font-size: 12px;
  color: #94A3B8;
  font-style: italic;
  display: block;
  margin-top: 4px;
}
```

**Deadline:** 4 hours.

---

### P0.4 REMOVE DUPLICATE "BUILT FOR..." LINES

**Current:** Two lines. **Replace with one:**

```html
<p class="hero-social-proof">Built for plumbers, electricians & heating engineers across the UK</p>
```

```css
.hero-social-proof {
  font-size: 13px;
  color: #718096;
  margin: 24px 0 0;
  text-align: left;
}

@media (max-width: 640px) {
  .hero-social-proof {
    text-align: center;
  }
}
```

**Deadline:** 4 hours.

---

## P1 — HERO REBUILD (Deploy Within 48 Hours)

---

### P1.1 CRITICAL CSS (Inline in <head>)

Copy this exactly into `<head>` before any external stylesheets. This ensures the hero renders in <1.2s LCP.

```html
<style>
  /* Critical Hero CSS — Inline First */
  .hero-container {
    display: grid;
    grid-template-columns: 55% 45%;
    gap: 60px;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 100px 24px 80px;
    position: relative;
    z-index: 1;
  }
  .hero-h1 {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 52px;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    color: #1A1A2E;
    margin: 0 0 16px;
  }
  .cta-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #1A1A2E;
    color: #FFFFFF;
    font-family: 'Inter', sans-serif;
    font-size: 17px;
    font-weight: 600;
    padding: 16px 32px;
    border-radius: 12px;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(26, 26, 46, 0.25);
    width: fit-content;
  }
  @media (max-width: 1024px) {
    .hero-container { grid-template-columns: 1fr; gap: 48px; padding: 80px 24px 60px; }
    .hero-h1 { font-size: 40px; }
  }
  @media (max-width: 640px) {
    .hero-container { padding: 48px 16px 40px; gap: 32px; }
    .hero-h1 { font-size: 36px; }
    .cta-primary { width: 100%; height: 56px; font-size: 16px; }
  }
</style>
```

---

### P1.2 HERO SECTION MARKUP

```html
<section class="hero">
  <div class="hero-container">

    <!-- TEXT COLUMN -->
    <div class="hero-text">
      <h1 class="hero-h1">
        Your phone's ringing.<br>
        <span class="h1-accent">Katie's got it.</span>
      </h1>
      <p class="hero-subhead">
        The AI call handler built for UK trades. Answers every missed call, 
        qualifies real jobs, and sends them straight to your WhatsApp — so you 
        accept, call back, or decline in two taps.
      </p>
      <p class="hero-closer">No apps. No dashboards. Just more work.</p>

      <div class="trust-pills">
        <span class="pill"><span class="pill-check">✓</span> 7-day free trial</span>
        <span class="pill"><span class="pill-check">✓</span> No card required</span>
        <span class="pill"><span class="pill-check">✓</span> Live in 30 minutes</span>
        <span class="pill"><span class="pill-check">✓</span> Your existing number</span>
      </div>

      <div class="hero-actions">
        <a href="#signup" class="cta-primary">Try Katie Free — Start Catching Calls</a>
        <a href="#demo" class="cta-secondary">See how it works →</a>
      </div>

      <p class="hero-social-proof">Built for plumbers, electricians & heating engineers across the UK</p>
    </div>

    <!-- VISUAL COLUMN -->
    <div class="hero-visual">
      <div class="phone-mockup">
        <div class="phone-notch"></div>
        <div class="phone-screen">

          <div class="wa-header">
            <div class="wa-avatar">
              <img src="/icons/katie.svg" alt="" width="36" height="36">
            </div>
            <div class="wa-info">
              <div class="wa-name">Whoza AI 🤖</div>
              <div class="wa-status">Business Account</div>
            </div>
          </div>

          <div class="wa-date">Today</div>

          <div class="wa-notification">
            <span class="wa-notif-icon">🔔</span>
            Whoza AI captured a new lead
          </div>

          <div class="wa-chat-bubble">
            <div class="wa-sender">New enquiry from Sarah Williams</div>
            <div class="wa-job-type">🔧 Plumbing</div>
            <div class="wa-message">
              "Hi, I have a leaking boiler in my kitchen and no hot water. 
              Can someone come out today please?"
            </div>
            <div class="wa-time">09:41</div>
          </div>

          <div class="lead-card">
            <div class="lead-header">
              <img src="/icons/ui/calendar.svg" alt="" width="16" height="16">
              Lead Summary
            </div>
            <div class="lead-grid">
              <div class="lead-row"><span class="lead-label">Name</span><span class="lead-val">Sarah Williams</span></div>
              <div class="lead-row"><span class="lead-label">Job Type</span><span class="lead-val">Boiler Repair</span></div>
              <div class="lead-row"><span class="lead-label">Location</span><span class="lead-val">Bristol, BS16</span></div>
              <div class="lead-row"><span class="lead-label">Priority</span><span class="lead-val priority-high">🔴 High</span></div>
              <div class="lead-row"><span class="lead-label">Job Value</span><span class="lead-val">£250 – £450</span></div>
              <div class="lead-row"><span class="lead-label">AI Verified</span><span class="lead-val verified">✓ Verified</span></div>
            </div>
          </div>

          <div class="wa-actions">
            <button class="wa-btn btn-accept">👍 Accept</button>
            <button class="wa-btn btn-callback">📞 Call Back</button>
            <button class="wa-btn btn-decline">❌ Decline</button>
            <button class="wa-btn btn-reschedule">⏰ Reschedule</button>
          </div>

          <div class="ai-badge">
            <img src="/icons/katie-mono.svg" alt="" width="14" height="14">
            <span>AI Qualification: Verified — Not spam | Real postcode | Job confirmed</span>
          </div>

        </div>
      </div>

      <!-- FLOATING DATA CARDS -->
      <div class="float-card float-revenue">
        <div class="float-icon"><img src="/icons/katie.svg" alt="" width="20" height="20"></div>
        <div class="float-number">£480</div>
        <div class="float-label">recovered today</div>
      </div>

      <div class="float-card float-leads">
        <div class="float-icon"><img src="/icons/mark.svg" alt="" width="20" height="20"></div>
        <div class="float-number">23</div>
        <div class="float-label">leads this week</div>
      </div>

      <div class="float-card float-reviews">
        <div class="float-icon"><img src="/icons/claire.svg" alt="" width="20" height="20"></div>
        <div class="float-number">4.9</div>
        <div class="float-label">average review</div>
      </div>

      <div class="float-card float-growth">
        <div class="float-icon"><img src="/icons/rex.svg" alt="" width="20" height="20"></div>
        <div class="float-number">+5</div>
        <div class="float-label">jobs vs last month</div>
      </div>

    </div>
  </div>
</section>
```

---

### P1.3 HERO CSS (External Stylesheet — Load After Critical CSS)

```css
/* ========================================
   HERO SECTION — WORLD-CLASS SPEC
   ======================================== */

.hero {
  background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #F1F5F9 100%);
  position: relative;
  overflow: hidden;
  padding: 0;
}

/* Subtle grid pattern */
.hero::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    linear-gradient(rgba(226, 232, 240, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(226, 232, 240, 0.3) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.5;
  pointer-events: none;
}

/* TEXT COLUMN */
.hero-text {
  max-width: 540px;
}

.h1-accent {
  color: #FF6B6B;
}

.hero-subhead {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: #475569;
  margin: 0 0 12px;
}

.hero-closer {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: #1A1A2E;
  margin: 0 0 28px;
}

.trust-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #F1F5F9;
  color: #475569;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid #E2E8F0;
}

.pill-check {
  color: #FF6B6B;
  font-weight: 700;
}

.hero-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.cta-primary:hover {
  transform: scale(1.02);
  background: #0F4C75;
  box-shadow: 0 6px 20px rgba(26, 26, 46, 0.35);
}

.cta-secondary {
  display: inline-flex;
  align-items: center;
  color: #475569;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
  width: fit-content;
}

.cta-secondary:hover {
  color: #1A1A2E;
}

.cta-secondary::after {
  content: ' →';
  transition: margin-left 0.2s;
}

.cta-secondary:hover::after {
  margin-left: 4px;
}

/* ========================================
   PHONE MOCKUP — PREMIUM DEPTH
   ======================================== */

.hero-visual {
  position: relative;
  width: 100%;
  min-width: 420px;
  height: 560px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.phone-mockup {
  width: 300px;
  background: #1A1A2E;
  border-radius: 44px;
  padding: 10px;
  box-shadow: 
    0 30px 60px -15px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(0, 0, 0, 0.04),
    inset 0 0 0 2px rgba(255,255,255,0.08),
    0 20px 40px -10px rgba(26, 26, 46, 0.1);
  position: relative;
  z-index: 2;
  animation: phoneFloat 6s ease-in-out infinite;
}

/* Screen gloss overlay */
.phone-mockup::before {
  content: '';
  position: absolute;
  top: 10px; left: 10px; right: 10px;
  height: 35%;
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%);
  border-radius: 36px 36px 0 0;
  pointer-events: none;
  z-index: 5;
}

/* Side volume button */
.phone-mockup::after {
  content: '';
  position: absolute;
  left: -3px; top: 100px;
  width: 3px; height: 40px;
  background: #2D2D3A;
  border-radius: 2px 0 0 2px;
}

.phone-notch {
  position: absolute;
  top: 10px; left: 50%;
  transform: translateX(-50%);
  width: 100px; height: 28px;
  background: #1A1A2E;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  z-index: 10;
}

.phone-screen {
  background: #F0F2F5;
  border-radius: 36px;
  overflow: hidden;
  padding-top: 24px;
  height: 520px;
  overflow-y: auto;
  scrollbar-width: none;
}

.phone-screen::-webkit-scrollbar {
  display: none;
}

/* WhatsApp UI */
.wa-header {
  background: #075E54;
  padding: 10px 14px 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.wa-avatar {
  width: 36px; height: 36px;
  background: #128C7E;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.wa-avatar img {
  width: 24px; height: 24px;
  filter: brightness(0) invert(1);
}

.wa-name { color: white; font-size: 14px; font-weight: 600; }
.wa-status { color: rgba(255,255,255,0.7); font-size: 11px; }

.wa-date {
  text-align: center;
  font-size: 11px;
  color: #8696A0;
  padding: 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.wa-notification {
  background: #FFF9C4;
  margin: 0 12px 8px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  color: #1A1A2E;
  text-align: center;
  font-weight: 500;
}

.wa-chat-bubble {
  background: white;
  margin: 0 12px 8px;
  padding: 10px 12px;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.08);
  border-left: 3px solid #FF6B6B;
}

.wa-sender { font-size: 13px; font-weight: 600; color: #1A1A2E; margin-bottom: 4px; }
.wa-job-type { font-size: 11px; color: #475569; margin-bottom: 6px; }
.wa-message { font-size: 13px; color: #1A1A2E; line-height: 1.4; margin-bottom: 6px; }
.wa-time { font-size: 10px; color: #8696A0; text-align: right; }

/* Lead Card */
.lead-card {
  background: white;
  margin: 0 12px 8px;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

.lead-header {
  font-size: 12px;
  font-weight: 700;
  color: #1A1A2E;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.lead-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.lead-row { display: flex; flex-direction: column; gap: 2px; }
.lead-label { font-size: 10px; color: #8696A0; text-transform: uppercase; letter-spacing: 0.03em; }
.lead-val { font-size: 12px; font-weight: 600; color: #1A1A2E; }
.priority-high { color: #E74C3C; }
.verified { color: #00B894; }

/* Action Buttons */
.wa-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  padding: 0 12px 8px;
}

.wa-btn {
  border: none;
  padding: 8px 0;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
}

.btn-accept { background: #00B894; color: white; }
.btn-callback { background: #E6F3FF; color: #0F4C75; }
.btn-decline { background: #FFF0F0; color: #E74C3C; }
.btn-reschedule { background: #FFF8E6; color: #B38600; }

/* AI Badge */
.ai-badge {
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 6px;
  padding: 8px 10px;
  margin: 0 12px 12px;
  font-size: 10px;
  color: #166534;
  display: flex;
  align-items: center;
  gap: 6px;
  line-height: 1.3;
}

.ai-badge img { flex-shrink: 0; }

/* ========================================
   FLOATING DATA CARDS
   ======================================== */

.float-card {
  position: absolute;
  background: white;
  border-radius: 14px;
  padding: 14px 18px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  border: 1px solid #E2E8F0;
  min-width: 130px;
  text-align: center;
  z-index: 3;
}

.float-icon {
  width: 36px; height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
}

.float-icon img { width: 22px; height: 22px; }

.float-number {
  font-size: 22px;
  font-weight: 800;
  color: #1A1A2E;
  font-family: 'Inter', sans-serif;
  line-height: 1;
}

.float-label { font-size: 11px; color: #718096; margin-top: 4px; }

/* Card positions — desktop (percentage-based for collision safety) */
.float-revenue {
  top: 5%;
  right: -5%;
  animation: cardFloat 4s ease-in-out infinite;
  border-top: 3px solid #FF6B6B;
}
.float-revenue .float-icon { background: #FFF0F0; }

.float-leads {
  bottom: 20%;
  left: -8%;
  animation: cardFloat 4s ease-in-out infinite;
  animation-delay: 1.3s;
  border-top: 3px solid #0F4C75;
}
.float-leads .float-icon { background: #E6F3FF; }

.float-reviews {
  top: 18%;
  left: -3%;
  animation: cardFloat 4s ease-in-out infinite;
  animation-delay: 2.6s;
  border-top: 3px solid #F6B93B;
}
.float-reviews .float-icon { background: #FFF8E6; }

.float-growth {
  bottom: 12%;
  right: -2%;
  animation: cardFloat 4s ease-in-out infinite;
  animation-delay: 1s;
  border-top: 3px solid #00B894;
}
.float-growth .float-icon { background: #E6FFF9; }

/* Animations */
@keyframes phoneFloat {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
}

@keyframes cardFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@media (prefers-reduced-motion: reduce) {
  .phone-mockup, .float-card { animation: none; }
}

/* ========================================
   TABLET BREAKPOINT (641px – 1024px)
   ======================================== */

@media (max-width: 1024px) and (min-width: 641px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 80px 24px 60px;
  }
  .hero-visual {
    order: -1;
    height: 400px;
    min-width: auto;
  }
  .phone-mockup {
    transform: scale(0.9);
  }
  .float-card {
    transform: scale(0.85);
  }
  .float-revenue { right: 15%; top: 0; }
  .float-leads { left: 10%; bottom: 10%; }
  .float-reviews { left: 20%; top: 5%; }
  .float-growth { right: 20%; bottom: 5%; }
}

/* ========================================
   MOBILE BREAKPOINT (< 640px)
   ======================================== */

@media (max-width: 640px) {
  .hero-visual {
    height: auto;
    min-height: 420px;
    min-width: auto;
    order: 2;
  }
  .phone-mockup {
    width: 260px;
    margin: 0 auto;
  }
  .phone-screen {
    height: 440px;
  }
  .float-reviews,
  .float-growth {
    display: none;
  }
  .float-revenue {
    top: 0;
    right: 5%;
    transform: scale(0.85);
  }
  .float-leads {
    bottom: 10%;
    left: 5%;
    transform: scale(0.85);
  }
  .hero-text {
    text-align: center;
    max-width: 100%;
  }
  .hero-subhead,
  .hero-closer {
    font-size: 16px;
  }
  .trust-pills {
    justify-content: center;
  }
  .hero-actions {
    align-items: center;
  }
  .cta-secondary {
    margin: 0 auto;
  }
}
```

---

## P2 — STICKY NAV + PERFORMANCE (Deploy Within 72 Hours)

---

### P2.1 STICKY NAVIGATION

```html
<nav class="nav-sticky">
  <div class="nav-container">
    <a href="/" class="nav-brand">
      <div class="nav-icon">
        <img src="/icons/katie-mono.svg" alt="" width="24" height="24" fetchpriority="high">
      </div>
      <span class="nav-logo">whoza.ai</span>
    </a>
    <div class="nav-links">
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <a href="#signup" class="nav-cta">Try Katie Free</a>
    </div>
    <button class="nav-menu-toggle" aria-label="Open menu">
      <img src="/icons/ui/menu.svg" alt="" width="24" height="24">
    </button>
  </div>
</nav>
```

```css
.nav-sticky {
  position: fixed;
  top: 0; left: 0; right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 1000;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  padding: 0;
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}

.nav-sticky.visible {
  transform: translateY(0);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.nav-icon {
  width: 32px; height: 32px;
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E72 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon img {
  width: 20px; height: 20px;
  filter: brightness(0) invert(1);
}

.nav-logo {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: #1A1A2E;
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-links a {
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-links a:hover { color: #1A1A2E; }

.nav-cta {
  background: #FF6B6B;
  color: white !important;
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
}

.nav-cta:hover { background: #E55A5A; }

.nav-menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .nav-menu-toggle { display: block; }
}

/* Offset hero for fixed nav */
.hero {
  padding-top: 60px;
}
```

**Scroll Behaviour (Add to bottom of body, before </body>):**

```javascript
(function() {
  var nav = document.querySelector('.nav-sticky');
  var hero = document.querySelector('.hero');
  if (!nav || !hero) return;

  var heroBottom = hero.offsetTop + hero.offsetHeight;

  window.addEventListener('scroll', function() {
    if (window.scrollY > heroBottom * 0.3) {
      nav.classList.add('visible');
    } else {
      nav.classList.remove('visible');
    }
  });
})();
```

---

### P2.2 PERFORMANCE BUILD PATH

**Step-by-step to achieve PageSpeed Insights ≥90 mobile:**

**1. Font Loading (Add to `<head>`)**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossorigin>
<style>
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-Variable.woff2') format('woff2');
    font-weight: 100 900;
    font-display: swap;
  }
</style>
```

**2. Image Loading Strategy**
```html
<!-- In hero — eager -->
<img src="/icons/katie.svg" alt="" width="36" height="36" fetchpriority="high" loading="eager">

<!-- Below hero — lazy -->
<img src="/icons/mark.svg" alt="" width="20" height="20" loading="lazy">
```

**3. JavaScript Loading**
```html
<!-- Counter — defer (must execute after DOM) -->
<script src="/js/counter.js" defer></script>

<!-- Analytics — async -->
<script src="/js/analytics.js" async></script>
```

**4. SVG Optimisation**
Run all SVGs through this command before deployment:
```bash
npx svgo --config '{"plugins": [{"name": "preset-default", "params": {"overrides": {"removeViewBox": false}}}]}' /public/icons/*.svg
```

**5. Verification Command**
```bash
npx lighthouse https://whoza-ai-staging-349.netlify.app/ --preset=desktop --output=json --output-path=./lighthouse-report.json
```

**Must achieve:**
- Performance ≥ 90
- LCP < 1.2s
- CLS < 0.05
- FID < 50ms

If any metric fails, revisit:
- Is critical CSS inlined? (Should be)
- Are fonts preloaded? (Must be)
- Are below-fold images lazy? (Must be)
- Is the counter script deferred? (Must be)

---

## P3 — QA CHECKLIST (Verify Before Handoff)

### Visual QA
- [ ] Desktop (1366×768): Two-column layout visible, phone on right, text on left
- [ ] Desktop: Phone has black frame, rounded corners (44px), notch, side button, screen gloss
- [ ] Desktop: 4 floating cards visible around phone with staggered float animation
- [ ] Desktop: Cards do not overlap text column at 1280px width
- [ ] Tablet (768px): Single column, phone above text, scaled to 0.9
- [ ] Mobile (375px): Text first, phone below, 2 cards visible (revenue + leads)
- [ ] Mobile: Primary CTA is full-width, 56px height, thumb-reachable
- [ ] No synthetic faces anywhere on site
- [ ] All persona icons display with correct colours (Katie coral, Mark teal, Claire gold, Rex emerald)
- [ ] All UI icons are monochrome by default, coloured only in feature contexts
- [ ] Counter increments every ~3 seconds (not stuck at 0)
- [ ] "5.0 Rating" badge removed
- [ ] CTA reads exactly: "Try Katie Free — Start Catching Calls"
- [ ] Secondary CTA "See how it works →" present and clickable
- [ ] Trust pills in single horizontal row with coral checkmarks
- [ ] Only ONE "Built for..." line present
- [ ] Sticky nav appears on scroll with Katie icon and "Try Katie Free" button
- [ ] Nav hides when scrolling back to top

### Performance QA
- [ ] PageSpeed Insights Mobile ≥ 90
- [ ] LCP < 1.2s
- [ ] CLS < 0.05
- [ ] No console errors
- [ ] Animations respect `prefers-reduced-motion`

### Accessibility QA
- [ ] All decorative icons have `alt=""`
- [ ] All interactive icons have `aria-label`
- [ ] Colour contrast ≥ 4.5:1 for all text
- [ ] Keyboard-navigable CTAs (Tab to focus, Enter to activate)
- [ ] Focus states visible: `outline: 2px solid #FF6B6B; outline-offset: 2px;`

---

## THE 9.5 SCORECARD

Score each 1–10. Weighted average must be ≥ 9.5. Any single item < 8 = rework.

| # | Criterion | Weight | Score | Weighted |
|---|-----------|--------|-------|----------|
| 1 | Desktop two-column layout | 12% | ___ | ___ |
| 2 | Phone mockup looks like real phone (gloss, shadow, side button) | 12% | ___ | ___ |
| 3 | Floating data cards positioned around phone without collision | 10% | ___ | ___ |
| 4 | No synthetic faces — premium icons only | 10% | ___ | ___ |
| 5 | Counter works or is removed | 8% | ___ | ___ |
| 6 | CTA is "Try Katie Free — Start Catching Calls" | 8% | ___ | ___ |
| 7 | Mobile layout correct (phone below text, 2 cards, full-width CTA) | 10% | ___ | ___ |
| 8 | Tablet breakpoint handled (768px–1024px) | 8% | ___ | ___ |
| 9 | Sticky nav with icon + CTA, scroll-triggered | 8% | ___ | ___ |
| 10 | PageSpeed Insights ≥ 90 mobile | 14% | ___ | ___ |
| | **TOTAL** | **100%** | | **___** |

**Pass Threshold:** ≥ 9.5. **Fail:** < 9.5 or any single score < 8.

---

## FINAL BUILDER RULES

1. **Copy-paste the CSS exactly.** Do not approximate colours, sizes, or spacing.
2. **Do not skip steps.** Every P0 item is required before P1. Every P1 item before P2.
3. **Test on real devices.** iPhone SE (375px) and 1366×768 laptop before declaring done.
4. **If an element cannot be built as specified, remove it entirely.** A broken element scores 0.
5. **Run Lighthouse before handoff.** Mobile score must be ≥90.
6. **Ask before improvising.** If a spec seems impossible, message for clarification. Do not guess.

---

## CONTACT

**Brief Owner:** Dru McPherson, whoza.ai  
**Questions:** Ask before building. Do not improvise.  
**Deploy cadence:** P0 today, P1 within 48hrs, P2 within 72hrs.

---

*End of World-Class Build Prompt v4.0*
