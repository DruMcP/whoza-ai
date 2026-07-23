# whoza.ai — CTO Warm Handoff Spec

> **Prepared:** 2026-05-25  
> **For:** Incoming CTO  
> **Owner:** Dru (dru@whoz.ai / dru@whoza.ai)  
> **Scope:** Full technical infrastructure, build pipeline, secrets inventory, and operational runbooks for both Staging 349 and Production (whoza.ai).

---

## 1. Executive Summary

| | **Staging 349** | **Production (Soft Launch)** |
|---|---|---|
| **URL** | https://whoza-ai-staging-349.netlify.app | https://www.whoza.ai |
| **Purpose** | Feature-complete development + AEO content | Live soft-launch site |
| **Branch** | `soft-launch` | `main` |
| **Build** | GitHub Actions → Netlify CLI | Netlify build (or manual promote) |
| **Supabase** | `ligjstpxqtkurvteyyhw` (London) | Same staging DB (soft launch phase) |
| **Status** | Active dev, 95+ pages, full SEO | Live, trimmed content, stable |

**Stack:** Next.js 16.2.6 (staging pinned), React 19.2.6, Tailwind CSS v4, TypeScript, Supabase, Stripe (test), Resend, Trillet (voice), Netlify.

---

## 2. GitHub Repository

```
Repo:     DruMcP/whoza-ai
Remote:   https://github.com/DruMcP/whoza-ai.git
Access:   Owner is DruMcP; you will be added as collaborator
```

### Branches

| Branch | Purpose | Deploy Target |
|---|---|---|
| `main` | Production source of truth | `whoza.ai` via promotion gate |
| `soft-launch` | Staging / active development | `whoza-ai-staging-349.netlify.app` auto-deploy |
| `master` | Legacy mirror of main | (kept for backward compat) |
| `v0-staging` | Archived early staging | (inactive) |

> **Rule:** Since 2026-05-18, all active dev is on `soft-launch`. Fixes are pushed to both `soft-launch` and `main` simultaneously.

---

## 3. Netlify Infrastructure

### Staging 349
```
Site Name:    whoza-ai-staging-349
Site ID:      97f8a30c-8ba7-4e98-aef4-cfee00eb91dd
URL:          https://whoza-ai-staging-349.netlify.app
Deploy:       GitHub Actions (.github/workflows/deploy-staging.yml)
Auth Token:   Stored in GitHub Secret NETLIFY_STAGING_TOKEN
```

### Production
```
Site Name:    whoza.ai
Site ID:      9313ac92-d80f-4935-b4f7-61a0c5b07e2d
URL:          https://www.whoza.ai
Deploy:       Promotion gate workflow (.github/workflows/promote-to-prod.yml) or manual Netlify CLI
Auth Token:   Stored in GitHub Secret NETLIFY_PROD_TOKEN (or .env.production)
```

> **⚠️ Critical:** Netlify PATs are **site-specific**. Using the staging token on the production site ID will fail with "Project not found".

---

## 4. Supabase

```
Project ID:   ligjstpxqtkurvteyyhw
Region:       London (eu-west-2)
URL:          https://ligjstpxqtkurvteyyhw.supabase.co
Status:       Shared between staging and production (soft launch phase)
```

### Database Objects
- Migrations in `/supabase/migrations/`
- Edge Functions in `/supabase/functions/`
- Config in `/supabase/config.toml`

### Required Keys (stored in GitHub Secrets + local .env)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only)

---

## 5. Secret Inventory

All secrets are stored in **two places**:
1. **GitHub Repository Secrets** (`Settings → Secrets and variables → Actions`) — used by CI/CD
2. **Local .env files** in the repo root — used for local dev and manual deploys

### File Locations (DO NOT COMMIT)
```
whoza-ai/
├── .env.local          # Dev + shared secrets (Supabase, Stripe test, Resend, etc.)
├── .env.staging        # Staging Netlify deploy config
├── .env.production     # Production Netlify deploy config
└── .gitignore          # (all .env* files are ignored)
```

### Complete Variable List

#### Application Secrets
| Variable | Used In | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Build + Runtime | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Build + Runtime | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side | Supabase admin key |
| `STRIPE_SECRET_KEY` | Server-side | Stripe API (test mode currently) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Build | Stripe publishable key |
| `RESEND_API_KEY` | Server-side | Resend email API |
| `GOOGLE_PLACES_API_KEY` | Server-side | Location autocomplete |
| `PERPLEXITY_API_KEY` | Server-side | AI content / research |

#### Netlify Deploy Secrets
| Variable | Used In | Description |
|---|---|---|
| `NETLIFY_STAGING_TOKEN` | GitHub Actions | Staging site deploy PAT |
| `NETLIFY_PROD_TOKEN` | GitHub Actions / manual | Production site deploy PAT |

#### Voice / Trillet
| Variable | Used In | Description |
|---|---|---|
| `TRILLET_API_KEY` | Server-side | Trillet voice platform |
| `TRILLET_API_SECRET` | Server-side | Trillet secret |
| `TRILLET_BASE_URL` | Server-side | `https://api.trillet.ai/v1` |
| `TRILLET_WORKSPACE_ID` | Server-side | `whoza-workspace` |
| `TRILLET_AGENT_ID` | Server-side | `katie-agent` |
| `TRILLET_WEBHOOK_SECRET` | Server-side | Webhook validation |
| `WHATSAPP_PROVIDER` | Server-side | `trillet` |

#### Monitoring (Optional / In Progress)
| Variable | Used In | Description |
|---|---|---|
| `BETTER_UPTIME_API_KEY` | Monitoring | Better Uptime integration |
| `BETTER_UPTIME_API_TOKEN` | Monitoring | Better Uptime token |
| `UPTIME_COM_API_KEY` | Monitoring | Uptime.com integration |
| `UPTIME_COM_API_TOKEN` | Monitoring | Uptime.com token |

#### GitHub
| Variable | Used In | Description |
|---|---|---|
| `GitHub_TOKEN` | Scripts | Repo automation scripts |

---

## 6. GitHub Actions Workflows

All workflows live in `.github/workflows/`.

### 6.1 deploy-staging.yml
**Trigger:** Push to `soft-launch` branch, or manual (`workflow_dispatch`)  
**What it does:**
1. Checks out `soft-launch`
2. `npm ci` with Node 22
3. Builds `.env.local` from secrets inline
4. `npm run build`
5. Installs `netlify-cli` globally
6. Deploys `.next/` to staging site ID via `NETLIFY_STAGING_TOKEN`

**Key config:**
```yaml
site: 97f8a30c-8ba7-4e98-aef4-cfee00eb91dd
env:
  NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_STAGING_TOKEN }}
```

### 6.2 promote-to-prod.yml
**Trigger:** Manual only (`workflow_dispatch`) with confirmation phrase `PROMOTE`  
**What it does:**
1. **Confirm** — human types `PROMOTE`
2. **Lighthouse CI** on staging URLs (score threshold: 90)
3. **Security audit** — blocks if critical vulnerabilities
4. **SEO meta validation** — checks titles, descriptions, canonicals
5. **Link check** — validates no broken links on staging
6. **Webhook health check** — ensures APIs respond
7. **Create PR** — auto-generates promotion PR from `soft-launch` → `main`

> This is the **only** path to production. No direct pushes to `main` for deploy.

### 6.3 security-audit.yml
**Trigger:** Weekly (Mon 07:00 UTC), push to `package.json`/`package-lock.json`, or manual  
**What it does:**
- Runs `npm audit --audit-level=moderate`
- Counts critical / high / moderate vulnerabilities
- Uploads `audit-results.json` artifact
- Creates GitHub issue if critical found
- Auto-creates PR for patchable moderate issues
- **Fails workflow** if critical > 0

### 6.4 seo-meta.yml
**Trigger:** Daily 05:00 UTC, or manual  
**What it does:**
- Fetches production URLs with `cheerio`
- Validates `<title>` length (≤ 60 chars)
- Validates `meta description` length (≤ 160 chars)
- Validates OG image, canonical URL, hreflang
- Checks trade pages: plumber, electrician, hvac, builder, roofer, landscaper, heating-engineer, painter

### 6.5 lighthouse-ci.yml
**Trigger:** PRs to `main`/`master`, daily 06:00 UTC, manual  
**What it does:**
- Builds site
- Runs Lighthouse on staging + production URLs
- Uploads artifacts

### 6.6 link-check.yml
**Trigger:** Weekly (Sun 03:00 UTC), manual  
**What it does:**
- Uses `lychee` to check all links on staging and production
- Excludes mailto, tel, PDFs, social media
- Outputs markdown reports

---

## 7. Local Development Setup

### Prerequisites
- Node.js ≥ 22 (current active: v22.22.2)
- npm ≥ 10
- Git

### Clone & Install
```bash
git clone https://github.com/DruMcP/whoza-ai.git
cd whoza-ai
cp .env.local.example .env.local  # (or get real .env from Dru)
npm ci
```

### Run Dev
```bash
npm run dev
# → http://localhost:3000
```

### Build (local verification)
```bash
npm run build
# Output: .next/ directory
```

### Manual Staging Deploy
```bash
# Load staging env
set -a; source .env.staging; set +a

# Deploy
npx netlify deploy --prod --site 97f8a30c-8ba7-4e98-aef4-cfee00eb91dd --dir .next
```

### Manual Production Deploy
```bash
# Load production env
set -a; source .env.production; set +a

# Deploy
npx netlify deploy --prod --site 9313ac92-d80f-4935-b4f7-61a0c5b07e2d --dir .next
```

> **⚠️** Always verify after deploy: static assets should return 200, not 404. Check `curl -sI https://whoza.ai/_next/static/chunks/main-app-*.js`

---

## 8. Project Architecture

### Directory Map
```
whoza-ai/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage (25+ sections)
│   ├── pricing/page.tsx          # Pricing page
│   ├── [location]/page.tsx       # Dynamic location pages (16 UK cities)
│   ├── trade/[trade]/page.tsx    # Trade landing pages (7 trades)
│   ├── blog/                     # Blog posts
│   ├── case-studies/             # Case studies
│   ├── dashboard/                # Internal dashboard
│   ├── support/                  # Support page
│   ├── privacy/                  # Privacy policy
│   └── terms/                    # Terms
├── components/
│   ├── sections/                 # Page sections (Hero, Pricing, etc.)
│   └── ui/                       # Reusable UI components
├── lib/
│   ├── locations.ts              # 16 UK location definitions
│   ├── trades.ts                 # 7 trade definitions
│   └── utils.ts                  # Utilities
├── app/sitemap.ts                # Auto-generated sitemap (21+ URLs)
├── app/layout.tsx                # Root layout with Schema markup
├── public/                       # Static assets
├── scripts/                      # Monitoring + deploy scripts
├── supabase/                     # Migrations + Edge Functions
└── .github/workflows/            # CI/CD definitions
```

### Key Pages (Staging has full set)
| Page | Staging | Production | Notes |
|---|---|---|---|
| Homepage `/` | ✅ | ✅ | Core conversion page |
| `/pricing` | ✅ | ✅ | 4 plans + FAQ |
| `/[location]` | ✅ | 16 cities | Dynamic SEO landing |
| `/trade/[trade]` | ✅ | 7 trades | AEO-optimized |
| `/blog` | ✅ | trimmed | Content marketing |
| `/case-studies` | ✅ | trimmed | Social proof |
| `/dashboard` | ✅ | ✅ | Internal tool |
| `/vs-...` comparison | ✅ | ? | Competitor pages |

### Schema Markup (Active)
- Organization, LocalBusiness, SoftwareApplication, Service, WebSite
- Person × 4 (Katie, Claire, Rex, Dru)
- HowTo, FAQPage, AudioObject, BreadcrumbList, Speakable
- Product × 4 (pricing plans), ContactPage

### Sitemap
- Auto-generated via `app/sitemap.ts`
- Currently 21+ production URLs
- Staging has 95+ prerendered pages

---

## 9. Monitoring & Alerting

### Scripts (in `/scripts/`)
| Script | Purpose |
|---|---|
| `health-check.js` | Endpoint monitoring (18 checks) |
| `monitor.sh` | Wrapper for scheduled health checks |
| `setup-better-uptime.sh` | Better Uptime integration setup |
| `check-run.py` | GitHub Actions run checker |

### External Monitoring (In Progress)
- **Better Uptime** — status page + alerts (API keys in `.env.local`)
- **AlertOps** — incident escalation (replacing Opsgenie)
- **Uptime.com** — secondary uptime monitoring

### Manual Health Check
```bash
curl -sI https://whoza.ai/_next/static/chunks/main-app-*.js | head -1
curl -sI https://whoza.ai/og-image.webp | head -1
curl -s https://whoza.ai/sitemap.xml | head -5
```

---

## 10. Security & Compliance

### Current Posture
- `npm audit` runs: **0 vulnerabilities** (as of 2026-05-25)
- `postcss` override: `$postcss` forces all nested deps to root version 8.5.15
- No critical vulnerabilities in dependency tree

### Secrets Hygiene
- `.env.*` files are in `.gitignore`
- Netlify PATs are site-specific (staging ≠ production)
- GitHub repository secrets are the CI/CD source of truth
- Local `.env` files should never be committed

### SSL / DNS
- Both sites served over HTTPS (Netlify-managed certificates)
- Production domain: `whoza.ai` + `www.whoza.ai`
- Staging: `whoza-ai-staging-349.netlify.app`

---

## 11. Known Issues & Gotchas

### Build
- **DO NOT** set `output: 'export'` or `distDir: 'dist'` in `next.config.js` — breaks Netlify
- Let `@netlify/plugin-nextjs` handle the build
- Build command: `next build` (or `npm run build`)

### Deploy
- Static assets can 404 even if deploy says "success" — always verify with `curl -sI`
- CDN cache can serve stale 404s — append `?nocache=1` to bypass
- Netlify tokens expire periodically — if deploy fails with auth errors, rotate the PAT

### Branch Discipline
- Since 2026-05-18: fixes go to `soft-launch` first, then cherry-pick/merge to `main`
- `main` is production — no direct feature commits
- Use `promote-to-prod.yml` workflow for all production releases

### Supabase
- Single shared DB for both staging and production (soft launch phase)
- Service role key has full admin access — protect it

### Lost Credentials
- Netlify PATs have been lost before (stored in `.env` files locally)
- Always verify `.env.staging` and `.env.production` are present and valid after any system reset

---

## 12. Escalation & Contacts

| Role | Contact | For |
|---|---|---|
| Business Owner | Dru (dru@whoza.ai) | Strategy, pricing, partnerships |
| Technical Partner | [Partner name] | Trillet voice integration, backend |
| This Doc | Jarvis (AI agent) | Infrastructure questions, deploy issues |

---

## 13. Quick Reference Card

```
REPO:        DruMcP/whoza-ai
STAGING:     https://whoza-ai-staging-349.netlify.app
PROD:        https://www.whoza.ai
SUPABASE:    https://ligjstpxqtkurvteyyhw.supabase.co
NODE:        22.x
NEXT:        16.2.6 (staging pinned)
REACT:       19.2.6
STAGING_ID:  97f8a30c-8ba7-4e98-aef4-cfee00eb91dd
PROD_ID:     9313ac92-d80f-4935-b4f7-61a0c5b07e2d
BRANCH_DEV:  soft-launch
BRANCH_LIVE: main
```

---

*Document generated by Jarvis for whoza.ai CTO handoff.  
Secrets values are intentionally redacted — obtain from Dru or GitHub repository secrets.*
