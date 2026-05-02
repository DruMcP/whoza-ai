# Claire — Post-Job Conversion Engine

## Overview
Claire automatically converts completed jobs into Google reviews via WhatsApp/SMS, tracks conversion rates, and displays revenue impact in the whoza.ai dashboard.

## Architecture

```
Job Completed → Webhook → Claire Engine → WhatsApp Review Request → Google Review → Dashboard Update
```

## Components

### 1. Database Schema
- `review_requests` table (Supabase)

### 2. Edge Functions
- `claire-trigger` — Handles job completion webhooks from Trillet
- `claire-send-request` — Sends WhatsApp/SMS review requests
- `claire-track` — Tracks link clicks and review completion
- `claire-reminder` — Sends follow-up reminders after 24h

### 3. Dashboard Widget
- `components/whoza/claire-dashboard.tsx` — Client-facing metrics

### 4. Service Layer
- `lib/claire.ts` — Core Claire logic

## API Keys Required (populate tomorrow)
- `TRILLET_API_KEY` — For WhatsApp messaging
- `TWILIO_ACCOUNT_SID` — SMS fallback
- `TWILIO_AUTH_TOKEN` — SMS fallback
- `TWILIO_PHONE_NUMBER` — SMS sender

## Status
🚧 Infrastructure built — awaiting API keys for activation
