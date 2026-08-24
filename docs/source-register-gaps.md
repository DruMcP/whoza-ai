# Source Register Gaps

## Overview

This document inventories claims in the whoza.ai research and content pages that lack verifiable primary sources, or where the cited source is a marketing blog post rather than a peer-reviewed study or official statistics. It was created as part of the R17 audit.

## Methodology

For each claim, we note:
- The claim text
- Where it appears (file, line number where known)
- The cited source
- Assessment of source quality
- Suggested remediation

## Unverifiable Claims

### 1. "62% of business calls go unanswered" (REMOVED in R17.3)

**Status:** ✅ REMOVED

**Original citation:** 411 Locals / getaira.io (2024)

**Assessment:** The source "getaira.io" appears to be a marketing blog with no underlying study, methodology, or raw data. The statistic was widely circulated across multiple research pages but could not be traced to a primary research document.

**Action taken:** Removed from all research pages and meta descriptions. Replaced with verified figures where available (e.g., Moneypenny 2016 at 33%, Paperclip Research 2025 at 47%).

---

### 2. "24% of missed calls result in a competitor being contacted within 15 minutes"

**Location:** `app/research/cost-of-missed-calls-uk-trades-2026/page.tsx:20`, `app/research/ai-voice-agents-uk-trades-2026/page.tsx`

**Cited source:** Not explicitly cited in the FAQ entry; appears to be an orphaned statistic.

**Assessment:** No primary source identified. The figure may be derived from aggregated industry blog posts rather than a specific study.

**Suggested remediation:** Find a primary source or replace with a verified figure. If no source can be found, add a note that the figure is an industry estimate.

---

### 3. "£30 billion annually to missed calls" (UK total)

**Location:** Multiple research pages

**Cited source:** BT/Avaya (2025)

**Assessment:** BT/Avaya partnership did release a "missed call calculator" tool in the past, but the £30 billion figure appears to be an extrapolation rather than a published study. The methodology (sample size, geographic scope, year) is not readily verifiable.

**Suggested remediation:** Contact BT/Avaya for the original methodology document, or replace with a more conservative estimate from a verifiable source (e.g., ONS business population estimates × average missed call value).

---

### 4. "Average small business loses ~£120,000 annually" to missed calls

**Location:** `app/research/ai-voice-agents-uk-trades-2026/page.tsx`

**Cited source:** AMBS Call Center (2025)

**Assessment:** AMBS Call Center appears to be a B2B service provider. The figure is likely derived from their own calculator or blog content rather than an independent study.

**Suggested remediation:** Verify if AMBS published a methodology paper. If not, replace with a calculation based on verifiable inputs (average UK trade business revenue × missed call rate × conversion rate).

---

### 5. "69% of callers who reach voicemail leave no message"

**Location:** Multiple research and blog pages

**Cited source:** Moneypenny Small Business Call Report (2016)

**Assessment:** ✅ VERIFIED — Moneypenny is a legitimate UK call answering service. The 2016 report is a known industry study. However, the figure is nearly 10 years old. A more recent study would strengthen the claim.

**Suggested remediation:** Retain but add caveat: "According to Moneypenny's 2016 Small Business Call Report — the most recent comprehensive study available."

---

### 6. "47% of initial calls went unanswered" (UK SMEs)

**Location:** `app/research/ai-voice-agents-uk-trades-2026/page.tsx`

**Cited source:** Paperclip Research (2025)

**Assessment:** Paperclip Research appears to be a small research consultancy. The 2025 study of 142 UK SMEs is relatively small sample size. While the source appears legitimate, the narrow sample should be noted.

**Suggested remediation:** Add methodology note: "Study of 142 UK SMEs, Paperclip Research, 2025."

---

### 7. "34% of calls missed" (businesses with 2-5 employees)

**Location:** `app/research/the-true-cost-of-missed-calls-2026/page.tsx`

**Cited source:** Replicant AI (2024)

**Assessment:** Replicant AI is a legitimate AI company. However, the figure may be derived from their own customer data rather than an independent, published study.

**Suggested remediation:** Verify if Replicant published a methodology document. If not, qualify as "industry estimate."

---

## Source Quality Tiers

| Tier | Description | Examples |
|------|-------------|----------|
| A | Peer-reviewed study, government statistics, established research body | ONS, Moneypenny (established firm, older data) |
| B | Industry report from known consultancy, methodology disclosed | Paperclip Research (small but disclosed sample) |
| C | Company blog post, calculator tool, no methodology disclosed | 411 Locals/getaira.io, AMBS Call Center |
| D | No source found, orphaned statistic | "24% within 15 minutes" |

## Recommendations

1. **Establish a source verification workflow:** Before adding any statistic to research pages, require: (a) primary source URL, (b) sample size and methodology, (c) publication date.
2. **Add "Source" sections to all research pages:** Every statistic should have a clickable citation.
3. **Annual audit:** Review all statistics annually for source rot (broken links, retracted studies).
4. **Conservative estimates:** When in doubt, use the most conservative verified figure rather than the most dramatic.

## Last Updated

2026-08-25 — Created during R17 audit. Removed all Tier C/D "62%" claims attributed to 411 Locals/getaira.io.
