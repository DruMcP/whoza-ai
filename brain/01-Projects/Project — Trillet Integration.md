# Trillet Integration — Pre-Trial Build Task List
**Target:** 1st June Launch
**Pre-trial build:** 8 May → 22 May (15 days)
**Trial window:** 23 May → 29 May (7 days free)
**Paid plan switch:** 30 May
**Launch deploy:** 1 June

---

## Phase 1: Pre-Trial Build (Now — 22 May)

### Week 1: Core Infrastructure (8 May — 15 May)

| Day | Task | Status | File(s) |
|-----|------|--------|---------|
| 1-2 | **Real Trillet API service** — replace stub with production-ready client, env var handling, retry logic | ✅ DONE 8 May | `lib/trillet-server.ts` |
| 1-2 | **Webhook security** — signature verification, IP allowlisting, payload validation | ✅ DONE 8 May | `app/api/trillet-webhook/route.ts` |
| 2-3 | **Call database schema** — Supabase migrations for calls, enquiries, transcripts | ✅ DONE 8 May | `lib/trillet-webhook.ts` |
| 3-4 | **Dashboard call history** — real-time call list, status badges, transcript viewer | ✅ DONE 8 May | `components/dashboard/call-history.tsx` |
| 4-5 | **Accept/Call Back/Decline API** — action endpoints with WhatsApp delivery | ✅ DONE 8 May | `app/api/enquiries/[id]/action/route.ts` |
| 5 | **Error handling** — missed calls, voicemail, failed transfers, retry queues | ✅ DONE 8 May | `lib/trillet-server.ts`, `lib/trillet-webhook.ts` |

### Week 2: Polish & Integration (16 May — 22 May)

| Day | Task | Status | File(s) |
|-----|------|--------|---------|
| 6-7 | **Number provisioning UI** — UK number selection, porting flow, divert setup | ✅ DONE 8 May | `components/dashboard/phone-setup.tsx` |
| 7-8 | **Call recording playback** — audio player for transcripts, download/share | ✅ DONE 8 May (in `call-history.tsx`) | `components/dashboard/call-history.tsx` |
| 8-9 | **Usage tracking** — minutes consumed, plan limits, overage warnings | ✅ DONE 8 May | `lib/usage.ts` |
| 9-10 | **Real-time updates** — WebSocket or polling for live call status | ✅ DONE 8 May | `hooks/use-calls.ts` |
| 10-12 | **Integration audit** — zero errors, full build, security review | ✅ DONE 9 May | All files |
| 12-15 | **Mock → real switch** — environment toggles, staging config ready | ✅ DONE 9 May | `.env.staging`, `lib/trillet-config.ts` |

---

## Phase 2: Trial Testing (23 May — 29 May)

| Day | Task | Owner |
|-----|------|-------|
| 23 | Activate Trillet trial, get production credentials | Dru |
| 23-24 | Swap staging to real API keys, test basic connectivity | Jarvis |
| 24-25 | Live call testing: dial number, hear Katie answer, qualify enquiry | Dru + Jarvis |
| 25-26 | WhatsApp delivery testing: verify enquiry reaches phone | Dru |
| 26-27 | Webhook stress test: multiple simultaneous calls | Jarvis |
| 27-28 | Edge case testing: voicemail, missed calls, failed transfer, after-hours | Dru + Jarvis |
| 28-29 | Dashboard validation: real call data appears, actions work end-to-end | Jarvis |

---

## Phase 3: Production (30 May — 1 June)

| Day | Task | Owner |
|-----|------|-------|
| 30 | Upgrade to paid Trillet plan, lock production credentials | Dru |
| 30 | Production deploy: swap staging → whoza.ai domain | Jarvis |
| 31 | DNS cutover, SSL verification, CDN cache clear | Jarvis |
| 1 June | **LAUNCH** — monitor for 24h, standby for hotfixes | Dru + Jarvis |

---

## Risk Log

| Risk | Mitigation |
|------|-----------|
| Trillet API has undocumented quirks | Pre-build with mock data + flexible types |
| UK number provisioning delays | Build number-setup UI with "pending" states |
| Webhook signature format changes | Abstract signature verification, easy to swap |
| Call audio quality issues | Build recording playback for QA review |
| Trial period too short for full test | Pre-build everything so trial = pure testing |

---

## Files to Create/Modify (Pre-Trial)

1. `lib/trillet.ts` — Production API client
2. `lib/trillet-webhook.ts` — Webhook processor with Supabase integration
3. `app/api/trillet-webhook/route.ts` — Secure endpoint with signature verification
4. `app/api/enquiries/[id]/action/route.ts` — Accept/Call Back/Decline actions
5. `components/dashboard/call-history.tsx` — Call list with filtering
6. `components/dashboard/call-recording.tsx` — Audio playback for transcripts
7. `components/dashboard/phone-setup.tsx` — Number provisioning UI
8. `hooks/use-calls.ts` — Real-time call data hook
9. `hooks/use-call-status.ts` — Live call status polling
10. `lib/usage.ts` — Minutes tracking and limit checking
11. `supabase/migrations/xxx_trillet_calls.sql` — Database schema
12. `.env.staging` — Trillet staging credentials template

---

## Zero-Errors Policy

- Build after every file change
- TypeScript strict mode — no `any` without justification
- All API routes have error handling + logging
- All components have loading + error states
- Security: webhook signatures, rate limiting, input validation

**Started:** 2026-05-08
**Last updated:** 2026-05-08
