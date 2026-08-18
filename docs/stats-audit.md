# Statistics Audit — whoza.ai

> **Date:** 2026-08-18  
> **Scope:** All statistics cited across whoza.ai public pages, research papers, blog posts, press page, and components.  
> **Rule:** Map only. Do not edit, delete, or harmonise without explicit instruction.

---

## 1. The "Big Three" — Known Conflicts

### 1.1 — 33% Missed Call Rate

| Location | Claim | Source | Status |
|----------|-------|--------|--------|
| Homepage (`components/whoza/hero.tsx:290`) | "33% of small businesses fail to answer" | Moneypenny Small Business Call Report, 2020 | ✅ Consistent |
| Press page (`app/press/page.tsx:98`) | "33%" stat box | Moneypenny Small Business Call Report, 2020 | ✅ Consistent |
| Lost Revenue Calculator (`components/whoza/lost-revenue-calculator.tsx:143`) | "33% of small businesses fail to answer calls" | Moneypenny 2020 | ✅ Consistent |
| Calculator form (`components/whoza/calculator-form.tsx:57`) | "UK average varies by trade (Moneypenny 2020: 33% of small businesses miss calls)" | Moneypenny 2020 | ✅ Consistent |
| Missed Call Counter (`components/whoza/missed-call-counter.tsx:91`) | "33% of small businesses fail to answer" | Moneypenny 2020 | ✅ Consistent |
| Blog: How Much Do Missed Calls Cost (`app/blog/how-much-do-missed-calls-cost-uk-trades/page.tsx:149`) | "33%" stat box | Moneypenny 2020 | ✅ Consistent |
| Research: Missed Call Index Q3 (`app/research/missed-call-index-q3-2026/page.tsx`) | "~33% (benchmark)" | Moneypenny 2020 | ✅ Consistent |
| Research: AI Voice Agents UK (`app/research/ai-voice-agents-uk-trades-2026/page.tsx:385`) | "33% of all incoming calls were missed" | Moneypenny 2020 | ✅ Consistent |
| `lib/blog-content.ts` | Multiple references | Moneypenny 2020 | ✅ Consistent |

**Verdict:** Clean. All cite Moneypenny 2020. No conflict.

---

### 1.2 — 69% Voicemail Hang-Up Rate

| Location | Claim | Source | Status |
|----------|-------|--------|--------|
| Homepage (`components/whoza/lost-revenue-calculator.tsx:144`) | "69% of voicemail callers hang up without leaving a message" | *Not attributed in component* | ⚠️ Source gap |
| Press page (`app/press/page.tsx:108`) | "69%" stat box | Moneypenny Small Business Call Report, 2020 | ⚠️ **CONFLICT** |
| Blog: How Much Do Missed Calls Cost (`app/blog/how-much-do-missed-calls-cost-uk-trades/page.tsx:154`) | "69%" stat box | Moneypenny 2020 | ⚠️ **CONFLICT** |
| Blog: Charlie Story (`lib/blog-content.ts:984`) | "69% of them hang up without leaving a message" | Moneypenny 2020 | ⚠️ **CONFLICT** |
| Research: Missed Call Index Q3 (`app/research/missed-call-index-q3-2026/page.tsx`) | "69% of callers who reach voicemail hang up with no message" | Moneypenny 2020 | ⚠️ **CONFLICT** |
| `lib/blog-content.ts:4920` | "69% of voicemail callers hang up without leaving a message" | Moneypenny 2020 | ⚠️ **CONFLICT** |

**Conflict Detail:**
- The Moneypenny 2020 report (as cited in the research paper) states: "33% of calls unanswered" and describes voicemail behaviour but the **69% figure does not appear in the Moneypenny report**.
- The Lost Revenue Calculator lists sources as: "UK micro-business survey 2025, AlwaysOnBooking 2026, JP Automations 2026" — but the 69% stat is not explicitly attributed to any of these.
- Press page attributes 69% to Moneypenny 2020, but this appears to be an error — Moneypenny 2020 covers the 33% missed call rate, not the 69% voicemail hang-up rate.
- The blog post "How Much Do Missed Calls Cost" also attributes 69% to Moneypenny 2020.

**Verdict:** ⚠️ **SOURCE MISMATCH.** The 69% figure is widely attributed to Moneypenny 2020, but that report does not contain this statistic. The true source is likely PATLive (2025) or Forbes/Ruby Research (80% — different figure). The Missed Call Index Q3 2026 explicitly notes: "the widely circulated '85% won't leave voicemail' figures. Neither could be traced to a primary published source."

---

### 1.3 — 78% Hire First Responder

| Location | Claim | Source | Status |
|----------|-------|--------|--------|
| Homepage (`components/whoza/lost-revenue-calculator.tsx:145`) | "78% of customers hire whoever responds first" | *Not attributed in component* | ⚠️ Source gap |
| Press page (`app/press/page.tsx:128`) | "78%" stat box | whoza.ai market research, 2026 | ⚠️ **CONFLICT** |
| Blog: Charlie Story (`lib/blog-content.ts:984`) | "78% of customers hire the first business that answers" | 2026 AlwaysOnBooking consumer report | ⚠️ **CONFLICT** |
| Blog: How Much Do Missed Calls Cost (`app/blog/how-much-do-missed-calls-cost-uk-trades/page.tsx:156`) | "78%" stat box | JP Automations Consumer Study 2026 | ⚠️ **CONFLICT** |
| Research: Caller Experience Revolution (`app/research/caller-experience-revolution-ai-voice-agents-2026/page.tsx:308`) | "78% of customers hire the first business that responds" | Lead Connect (2023) / MIT | ✅ Different source |
| Research: AI Voice Agents UK (`app/research/ai-voice-agents-uk-trades-2026/page.tsx:489`) | "78% of customers hire the first business that responds" | MIT / Lead Connect Research, cited in Zadarma 2026 | ✅ Different source |
| Trade pages (`app/for-plumbers/page.tsx:275`, `app/for-electricians/page.tsx:272`, etc.) | "78% hire first responder" | *Not attributed* | ⚠️ Source gap |

**Conflict Detail:**
- Press page: "whoza.ai market research, 2026"
- Blog (Charlie story): "2026 AlwaysOnBooking consumer report"
- Blog (How Much Do Missed Calls Cost): "JP Automations Consumer Study 2026"
- Research papers: "Lead Connect 2023 / MIT"
- Lost Revenue Calculator: "UK micro-business survey 2025, AlwaysOnBooking 2026, JP Automations 2026"

**Verdict:** ⚠️ **MULTIPLE CONFLICTING SOURCES.** Same 78% figure attributed to at least 4 different sources across the site. At most one can be correct.

---

## 2. Additional Statistics — Mapped

### 2.1 — 62% Missed Call Rate (app.whoza.ai vs research)

| Location | Claim | Source | Status |
|----------|-------|--------|--------|
| Research: True Cost (`app/research/the-true-cost-of-missed-calls-2026/page.tsx:251`) | "Average sole trader misses 62% of incoming calls during working hours" | Replicant AI, 2024 | ✅ Clear attribution |
| Research: True Cost (`app/research/the-true-cost-of-missed-calls-2026/page.tsx:286`) | "62% of unanswered callers immediately contact a competitor" | Dialzara, 2025 | ✅ Clear attribution — **different 62%** |
| Research: AI Voice Agents UK (`app/research/ai-voice-agents-uk-trades-2026/page.tsx:347`) | "33–62% of incoming calls" | 411 Locals, 2024; Paperclip Research, 2025 | ✅ Range, not single figure |
| Research: Missed Call Index Q3 (`app/research/missed-call-index-q3-2026/page.tsx:582`) | Explicitly excluded: "the widely circulated '62% of calls go unanswered'" | — | ✅ Deliberately excluded |

**Verdict:** The 62% figure appears in research papers with clear attribution to Replicant AI (2024) and Dialzara (2025). The Missed Call Index Q3 explicitly excludes it as untraceable. No direct conflict — just multiple 62%s from different sources measuring different things.

---

### 2.2 — 85% Never Call Back

| Location | Claim | Source | Status |
|----------|-------|--------|--------|
| Research: True Cost (`app/research/the-true-cost-of-missed-calls-2026/page.tsx:285`) | "85% — Callers who never call back" | PATLive, 2025 | ✅ Clear attribution |
| Research: AI Voice Agents UK (`app/research/ai-voice-agents-uk-trades-2026/page.tsx:481`) | "85% of callers who do not get through will never call back" | PATLive, 2025 | ✅ Clear attribution |
| Research: Caller Experience Revolution (`app/research/caller-experience-revolution-ai-voice-agents-2026/page.tsx:361`) | "PATLive confirms 85% of unanswered callers never call back" | PATLive, 2025 | ✅ Clear attribution |
| Watch page transcript (`app/watch/watch-page-client.tsx:419`) | "69% of them hang up without leaving a message" | — | ⚠️ Says 69%, not 85% |

**Verdict:** ✅ Clean within research papers. PATLive 2025 consistently cited. The watch page says 69% (different stat — voicemail hang-up vs never call back).

---

### 2.3 — £2.3bn Annual UK Trades Loss

| Location | Claim | Source | Status |
|----------|-------|--------|--------|
| Press page (`app/press/page.tsx:118`) | "£2.3bn" stat box | whoza.ai independent research, 2026 | ⚠️ Self-cited |
| Research: Missed Call Index Q3 (`app/research/missed-call-index-q3-2026/page.tsx`) | "£2.3 billion a year in revenue is at risk" | whoza.ai model (based on 885,000 businesses × £2,600) | ✅ Internal model disclosed |
| Research: Cost of Missed Calls (`app/research/cost-of-missed-calls-uk-trades-2026/page.tsx:34`) | "UK trades businesses lose an estimated £2.3 billion annually" | whoza.ai research | ⚠️ Self-cited |

**Verdict:** ⚠️ Self-cited whoza.ai research. The Missed Call Index discloses its model (£2,600 × 885,000 businesses). Other locations cite "whoza.ai independent research" without linking to the methodology.

---

### 2.4 — Annual Loss Figures (£12,000 vs £5,200–£15,600)

| Location | Claim | Context | Status |
|----------|-------|---------|--------|
| Meta descriptions (multiple) | "£12,000/yr" | Marketing shorthand | ⚠️ **CONFLICT** |
| FAQ page (`app/faq/page.tsx:82`) | "£5,200–£15,600 per year" | Detailed FAQ answer | ⚠️ **CONFLICT** |
| Blog: Charlie Story | "£12,000 lost revenue" (4-week winter diary, 47 missed calls) | Specific case study | ✅ Context-specific |
| Blog: Tom the Roofer (`lib/blog-content.ts`) | "£5,200 recovered in 4 weeks" | Specific case study | ✅ Context-specific |
| Calculator layout (`app/resources/missed-call-cost-calculator/layout.tsx`) | "£3,000-£12,000 per year" | Calculator output range | ⚠️ **CONFLICT** |

**Conflict Detail:**
- Meta descriptions use £12,000 as a headline figure.
- FAQ page states £5,200–£15,600 (based on Moneypenny 2020 + conversion maths).
- Calculator says £3,000–£12,000.
- These ranges overlap but are not identical. The £12,000 top-end from meta descriptions matches the calculator top-end but differs from the FAQ top-end (£15,600).

**Verdict:** ⚠️ **RANGE MISMATCH.** £12,000 (meta) vs £15,600 (FAQ) vs £12,000 (calculator max). The FAQ £15,600 appears to include a higher job-value assumption.

---

### 2.5 — 85% WhatsApp Usage (Ofcom)

| Location | Claim | Source | Status |
|----------|-------|--------|--------|
| Research: AI Voice Agents UK (`app/research/ai-voice-agents-uk-trades-2026/page.tsx:521`) | "85% of UK adults use WhatsApp regularly" | Ofcom 2025 UK Communications Report | ✅ Consistent |
| Research: AI Voice Agents UK (`app/research/ai-voice-agents-uk-trades-2026/page.tsx:737`) | "85% of UK adults use WhatsApp regularly" | Ofcom 2025 | ✅ Consistent |
| vs Clara page (`app/whoza-vs-clara/page.tsx:267`) | "85% of UK adults use WhatsApp" | Ofcom UK Communications Market Report 2025 | ✅ Consistent |
| vs Arrow page (`app/whoza-vs-arrow/page.tsx:259`) | "85% of UK adults use WhatsApp" | Ofcom UK Communications Market Report 2025 | ✅ Consistent |
| FAQ page (`app/faq/page.tsx:82`) | "85% of UK adults use WhatsApp regularly" | Ofcom 2025 | ✅ Consistent |

**Verdict:** ✅ Clean. All cite Ofcom 2025 consistently.

---

### 2.6 — 60–85% Cost Reduction (AI vs Human Receptionist)

| Location | Claim | Source | Status |
|----------|-------|--------|--------|
| Blog: AI Call Answering Definitive Guide (`app/blog/ai-call-answering-uk-tradespeople-definitive-guide-2026/page.tsx`) | "60–85% less than a human receptionist" | — | ⚠️ Unsourced range |
| AI vs Virtual Receptionist (`app/ai-vs-virtual-receptionist/page.tsx:33`) | "70-85% less" | — | ⚠️ Unsourced range |
| vs Moneypenny (`app/whoza-vs-moneypenny/page.tsx:258`) | "60–85% cost reduction" | — | ⚠️ Unsourced range |

**Verdict:** ⚠️ Unsourced percentage range. No external citation provided.

---

## 3. Summary Table — All Conflicts

| Statistic | Conflict Type | Locations | Severity |
|-----------|--------------|-----------|----------|
| 69% voicemail hang-up | Wrong source attributed (Moneypenny 2020 doesn't contain this) | Press, Blog, Research, Calculator | 🔴 High |
| 78% first responder | 4+ different sources cited for same figure | Press, Blog, Research, Calculator, Trade pages | 🔴 High |
| £12,000 / £5,200–£15,600 / £3,000–£12,000 | Range mismatch across pages | Meta, FAQ, Calculator | 🟡 Medium |
| £2.3bn | Self-cited without external validation | Press, Research | 🟡 Medium |
| 60–85% cost reduction | Unsourced | Blog, Comparison pages | 🟡 Medium |

---

## 4. Clean Statistics (No Conflicts Found)

| Statistic | Source | Locations |
|-----------|--------|-----------|
| 33% missed calls | Moneypenny 2020 | Homepage, Calculator, Press, Blog, Research |
| 85% WhatsApp usage | Ofcom 2025 | Research, FAQ, vs pages |
| 62% sole trader missed calls | Replicant AI 2024 | Research (True Cost) |
| 62% contact competitor | Dialzara 2025 | Research (True Cost) |
| 85% never call back | PATLive 2025 | Research (True Cost, AI Voice Agents) |

---

## 5. Recommendations (For Discussion)

1. **69% voicemail hang-up:** Verify the primary source. PATLive 2025 and Forbes/Ruby Research are candidates. Remove Moneypenny attribution if incorrect.
2. **78% first responder:** Pick one authoritative source (Lead Connect 2023 / MIT appears most cited in research papers) and apply site-wide.
3. **Annual loss range:** Standardise on one range. The FAQ (£5,200–£15,600) is most defensible because it shows working. Update meta descriptions or calculator to match.
4. **£2.3bn:** Link press page citation to the Missed Call Index Q3 methodology page so readers can verify the model.
5. **60–85% cost reduction:** Add a footnote or citation explaining the calculation basis (e.g., human receptionist salary £22k–£28k vs AI £708–£4,788/year).

---

*End of audit. No statistics were changed. This is a mapping document only.*
