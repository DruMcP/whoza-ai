# Launch Ops Agent System - Deployment Guide

**Version:** 1.0.0  
**Date:** January 19, 2026  
**Status:** Ready for Deployment

---

## Overview

The Launch Ops Agent System is a multi-agent AI marketing automation system for whoza.ai. It consists of four specialized agents that work together to create, validate, and manage marketing campaigns for UK tradespeople.

### Agent Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     ORCHESTRATOR                             │
│            (Workflow Coordinator & Manager)                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
┌───────────┐  ┌───────────┐  ┌───────────┐
│   MARA    │  │   CODY    │  │    LEO    │
│ (Strategy)│  │ (Content) │  │(Compliance)│
└───────────┘  └───────────┘  └───────────┘
```

---

## Files Created

### Shared Utilities (`supabase/functions/_shared/`)

| File | Purpose |
|------|---------|
| `launch-ops-types.ts` | TypeScript interfaces for all agents |
| `launch-ops-utils.ts` | Shared utilities (Supabase client, OpenAI calls, logging) |

### Edge Functions (`supabase/functions/`)

| Function | Agent | Purpose |
|----------|-------|---------|
| `launch-ops-orchestrator` | Orchestrator | Coordinates workflow, manages campaigns |
| `launch-ops-mara` | MARA | Creates marketing strategies and content calendars |
| `launch-ops-cody` | Cody | Generates social media content |
| `launch-ops-leo` | Leo | Validates content compliance |

---

## Deployment Steps

### 1. Prerequisites

Ensure you have the Supabase CLI installed:

```bash
npm install -g supabase
```

### 2. Link to Your Project

```bash
cd /path/to/whoza-ai
supabase link --project-ref ryeqbewlmaqewsuvuhlm
```

### 3. Set Environment Variables

The following environment variables must be set in your Supabase project:

```bash
# Required - Already configured in your project
SUPABASE_URL=https://ryeqbewlmaqewsuvuhlm.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
OPENAI_API_KEY=<your-openai-api-key>
```

### 4. Deploy Edge Functions

Deploy all Launch Ops functions:

```bash
# Deploy individual functions
supabase functions deploy launch-ops-orchestrator
supabase functions deploy launch-ops-mara
supabase functions deploy launch-ops-cody
supabase functions deploy launch-ops-leo

# Or deploy all at once
supabase functions deploy
```

### 5. Verify Deployment

```bash
supabase functions list
```

---

## API Reference

### Base URL

```
https://ryeqbewlmaqewsuvuhlm.supabase.co/functions/v1/
```

### Authentication

All requests require the `Authorization` header with your Supabase anon key or service role key:

```
Authorization: Bearer <your-key>
```

---

### Orchestrator API

**Endpoint:** `POST /launch-ops-orchestrator`

The Orchestrator is the main entry point for all operations.

#### Create Campaign

```json
{
  "action": "create_campaign",
  "campaign_goal": "Generate awareness and leads for plumbers in Manchester",
  "target_trade": "plumber",
  "target_territory": "Manchester",
  "duration_weeks": 4
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "success": true,
    "message": "Campaign created and strategy generated successfully",
    "campaign_id": "uuid-here",
    "status": "strategizing",
    "data": { /* MARA strategy output */ }
  }
}
```

#### Generate Content

```json
{
  "action": "generate_content",
  "campaign_id": "uuid-here"
}
```

#### Check Compliance

```json
{
  "action": "check_compliance",
  "post_id": "uuid-here"
}
```

#### Approve Post

```json
{
  "action": "approve_post",
  "post_id": "uuid-here"
}
```

#### Reject Post

```json
{
  "action": "reject_post",
  "post_id": "uuid-here",
  "rejection_reason": "The tone is too aggressive for our brand"
}
```

#### Get Campaign Status

```json
{
  "action": "get_status",
  "campaign_id": "uuid-here"
}
```

---

### Direct Agent APIs

You can also call agents directly for more granular control.

#### MARA (Strategy)

**Endpoint:** `POST /launch-ops-mara`

```json
{
  "campaign_id": "uuid-here",
  "campaign_goal": "Generate awareness for electricians",
  "target_trade": "electrician",
  "target_territory": "London",
  "duration_weeks": 4
}
```

#### Cody (Content)

**Endpoint:** `POST /launch-ops-cody`

```json
{
  "campaign_id": "uuid-here",
  "campaign_goal": "Generate awareness for electricians",
  "target_trade": "electrician",
  "platform": "linkedin",
  "content_bucket": "education"
}
```

#### Leo (Compliance)

**Endpoint:** `POST /launch-ops-leo`

```json
{
  "content": "Your post content here...",
  "platform": "linkedin",
  "post_id": "uuid-here",
  "campaign_id": "uuid-here"
}
```

---

## Workflow Example

### Complete Campaign Creation Flow

```javascript
// 1. Create a campaign (automatically generates strategy)
const createResponse = await fetch(
  'https://ryeqbewlmaqewsuvuhlm.supabase.co/functions/v1/launch-ops-orchestrator',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({
      action: 'create_campaign',
      campaign_goal: 'Generate leads for plumbers in Birmingham',
      target_trade: 'plumber',
      target_territory: 'Birmingham',
      duration_weeks: 4
    })
  }
);

const { data: campaign } = await createResponse.json();
const campaignId = campaign.campaign_id;

// 2. Generate content (creates and checks compliance automatically)
const contentResponse = await fetch(
  'https://ryeqbewlmaqewsuvuhlm.supabase.co/functions/v1/launch-ops-orchestrator',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({
      action: 'generate_content',
      campaign_id: campaignId
    })
  }
);

const { data: content } = await contentResponse.json();

// 3. Review and approve/reject
if (content.data.compliance.approved) {
  await fetch(
    'https://ryeqbewlmaqewsuvuhlm.supabase.co/functions/v1/launch-ops-orchestrator',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        action: 'approve_post',
        post_id: content.post_id
      })
    }
  );
}
```

---

## Database Tables

The system uses the following tables (already created in Supabase):

| Table | Purpose |
|-------|---------|
| `launch_ops_campaigns` | Campaign metadata and strategy |
| `launch_ops_posts` | Individual posts with compliance status |
| `agent_logs` | Complete audit trail of agent activities |
| `brand_guardrails` | Versioned compliance rules |
| `campaign_memory` | Vector storage for AI learning |

---

## Monitoring & Debugging

### View Agent Logs

```sql
SELECT 
  created_at,
  agent_name,
  action,
  status,
  latency_ms,
  error_message
FROM agent_logs
ORDER BY created_at DESC
LIMIT 50;
```

### View Campaign Performance

```sql
SELECT 
  c.name,
  c.status,
  c.target_trade,
  COUNT(p.id) as total_posts,
  SUM(CASE WHEN p.compliance_status = 'approved' THEN 1 ELSE 0 END) as approved,
  SUM(CASE WHEN p.compliance_status = 'rejected' THEN 1 ELSE 0 END) as rejected
FROM launch_ops_campaigns c
LEFT JOIN launch_ops_posts p ON p.campaign_id = c.id
GROUP BY c.id
ORDER BY c.created_at DESC;
```

### Check Function Logs

```bash
supabase functions logs launch-ops-orchestrator --tail
```

---

## Troubleshooting

### Common Issues

1. **"No active brand guardrails found"**
   - Ensure the `brand_guardrails` table has a row with `is_active = true`

2. **"OpenAI API key not configured"**
   - Set the `OPENAI_API_KEY` environment variable in Supabase

3. **"Campaign not found"**
   - Verify the campaign_id exists in `launch_ops_campaigns`

4. **CORS errors**
   - The functions include CORS headers for `*`, but you may need to restrict this in production

---

## Security Considerations

1. **Service Role Key**: Only use the service role key server-side, never expose it to clients
2. **RLS Policies**: All tables have Row Level Security enabled
3. **Input Validation**: All inputs are validated before processing
4. **Audit Logging**: All agent actions are logged for compliance

---

## Next Steps

1. **Deploy the functions** using the commands above
2. **Test with a sample campaign** using the Orchestrator API
3. **Build a UI** to interact with the system (optional)
4. **Set up monitoring** using the SQL queries provided
5. **Connect to Buffer/Hootsuite** for automated publishing (future enhancement)

---

## Support

For issues or questions, check:
- Supabase function logs: `supabase functions logs <function-name>`
- Agent logs table: `SELECT * FROM agent_logs ORDER BY created_at DESC`
- This documentation for API reference
