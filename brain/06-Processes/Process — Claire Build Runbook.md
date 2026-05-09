---
created: 2026-05-02
updated: 2026-05-02
tags: [process, claire, build, runbook, sop]
owner: Agent-1 / Agent-2
trigger: Dru go-ahead on Claire MVP
---

# Process — Claire Build Runbook

## Purpose
Step-by-step SOP for building the Claire Post-Job Conversion Engine MVP. ~9 days from go-ahead to working system.

## Prerequisites
- [ ] Dru explicit go-ahead
- [ ] n8n instance running (self-hosted or cloud)
- [ ] Supabase project with existing whoza.ai schema
- [ ] Trillet master account with API credentials
- [ ] Twilio account with SMS fallback credentials
- [ ] Google Business Profile direct link for test trades

## Phase 1: Foundation (Days 1-3)

### Day 1 — Supabase Schema
1. Create `review_requests` table (see spec for full schema)
2. Add indexes: `client_id` + `status`, `phone` + `created_at`, `sent_at`
3. Create edge function stub: `claire-trigger` (accepts job completion webhook)
4. Seed test data: 10 fake review requests in various statuses

### Day 2 — n8n Workflow Skeleton
1. Create workflow: "Claire — Job Completed Trigger"
2. Add webhook node: `POST /claire/job-completed`
3. Add wait node: 4 hours (configurable by job type)
4. Add Supabase node: insert into `review_requests` with status = `pending`
5. Test end-to-end with curl → n8n → Supabase

### Day 3 — Messaging Layer
1. Create message template (see spec Section 3.3)
2. Add Trillet WhatsApp send node to n8n workflow
3. Add Twilio SMS fallback node (if WhatsApp fails or no WhatsApp)
4. Test: trigger → wait → message sent → status updated to `sent`
5. Validate message rendering on actual WhatsApp

## Phase 2: Dashboard & Follow-up (Days 4-6)

### Day 4 — Dashboard Widget
1. Create `ClaireDashboard.jsx` component
2. Metrics: requested / received / conversion rate / rating / total reviews
3. Impact statement: "Your improved rating is helping you win more jobs"
4. Add to `/portal` route alongside existing voice dashboard
5. Wire to Supabase real-time subscription on `review_requests`

### Day 5 — Follow-up Engine
1. Extend n8n workflow: after 24h, check if `review_completed == false`
2. If false → send 1 reminder (gentle tone, same link)
3. Update `review_requests.reminder_sent = true`
4. Add spam guard: never send more than 1 reminder per job
5. Test: trigger → wait 4h → send → wait 24h → check → reminder → done

### Day 6 — Tracking & Analytics
1. Add `link_clicked` tracking (review link with UTM + redirect)
2. Add `review_completed` inference (manual check + webhook if available)
3. Build conversion rate calculation: `completed / sent`
4. Add job-type breakdown: emergency vs. standard vs. install
5. Test all tracking paths with simulated data

## Phase 3: Integration & Polish (Days 7-9)

### Day 7 — Trillet Integration
1. Connect Trillet job completion webhook to n8n trigger
2. Map Trillet call data to `review_requests` fields
3. Test with real Trillet test call
4. Validate WhatsApp message sends from same thread as original call

### Day 8 — Edge Functions
1. Build `claire-trigger` edge function: accepts webhook, validates, inserts to Supabase
2. Build `claire-track` edge function: accepts click events, updates status
3. Add RLS policies: client_id isolation
4. Deploy to staging Supabase

### Day 9 — Testing & Hardening
1. Run full end-to-end test: Trillet call → job complete → Claire trigger → WhatsApp → click → dashboard update
2. Test edge cases: no phone number, duplicate job, failed message, spam complaint
3. Performance test: 50 simultaneous triggers
4. Security audit: webhook validation, rate limiting, RLS
5. Document: update this runbook with actual steps used

## Go-Live Checklist
- [ ] All 6 layers tested end-to-end
- [ ] Dashboard shows live metrics
- [ ] Zero 500 errors in 100 test runs
- [ ] Message tone approved by Dru
- [ ] Review link verified (opens GBP correctly)
- [ ] Reminder frequency validated (not spammy)
- [ ] RLS policies prevent cross-client data leakage
- [ ] n8n workflow is version-controlled (export JSON)

## Rollback Plan
1. Disable n8n workflow (toggle off)
2. Claire dashboard component hidden behind feature flag
3. Supabase schema remains (no destructive migrations)
4. Messages stop immediately (no queue depth)

## Post-MVP Monitoring
- Daily: review request volume, conversion rate, error rate
- Weekly: rating improvement trend, spam complaint rate
- Monthly: revenue attribution (jobs won from highly-reviewed status)

## Related
- [[Project — Pre-Production Build]] — Parent project
- [[Decision — Claire is Post-Job Conversion Engine]] — Product positioning
- [[docs/CLAIRE_MVP_SPEC.md]] — Full technical specification
- [[Index — Processes]]
