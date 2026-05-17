# Uptime.com Manual Monitor Setup Guide

## Already Created (1/10)
- ✅ `www.whoza.ai: HTTP(S)` — checking www.whoza.ai every 5 min from UK, US-East, US-West

## Add These 9 Manually via Dashboard

Log into [uptime.com](https://uptime.com) → Monitoring → Add Check

---

### 1. whoza-staging-homepage
| Field | Value |
|-------|-------|
| **Check Type** | HTTP(S) |
| **Name** | whoza-staging-homepage |
| **URL** | `https://whoza-ai-staging-349.netlify.app/` |
| **Interval** | 5 minutes |
| **Locations** | UK, US-East (New York), US-West (Los Angeles) |
| **Expected Status** | 200 |
| **Tags** | whoza, staging, homepage |

---

### 2. whoza-voice-webhook
| Field | Value |
|-------|-------|
| **Check Type** | HTTP(S) |
| **Name** | whoza-voice-webhook |
| **URL** | `https://www.whoza.ai/api/health/trillet` |
| **Interval** | 5 minutes |
| **Locations** | UK, US-East |
| **Expected Status** | 200 |
| **Tags** | whoza, production, voice, webhook |

---

### 3. whoza-trade-plumber
| Field | Value |
|-------|-------|
| **Check Type** | HTTP(S) |
| **Name** | whoza-trade-plumber |
| **URL** | `https://whoza-ai-staging-349.netlify.app/trade/plumber` |
| **Interval** | 10 minutes |
| **Locations** | UK |
| **Expected Status** | 200 |
| **Tags** | whoza, trade, plumber |

---

### 4. whoza-trade-electrician
| Field | Value |
|-------|-------|
| **Check Type** | HTTP(S) |
| **Name** | whoza-trade-electrician |
| **URL** | `https://whoza-ai-staging-349.netlify.app/trade/electrician` |
| **Interval** | 10 minutes |
| **Locations** | UK |
| **Expected Status** | 200 |
| **Tags** | whoza, trade, electrician |

---

### 5. whoza-trade-heating
| Field | Value |
|-------|-------|
| **Check Type** | HTTP(S) |
| **Name** | whoza-trade-heating |
| **URL** | `https://whoza-ai-staging-349.netlify.app/trade/heating-engineer` |
| **Interval** | 10 minutes |
| **Locations** | UK |
| **Expected Status** | 200 |
| **Tags** | whoza, trade, heating |

---

### 6. whoza-supabase-auth
| Field | Value |
|-------|-------|
| **Check Type** | HTTP(S) |
| **Name** | whoza-supabase-auth |
| **URL** | `https://ligjstpxqtkurvteyyhw.supabase.co/auth/v1/health` |
| **Interval** | 5 minutes |
| **Locations** | UK, US-East, US-West |
| **Expected Status** | 200 |
| **Tags** | whoza, infrastructure, supabase, auth |

---

### 7. whoza-dashboard-login
| Field | Value |
|-------|-------|
| **Check Type** | HTTP(S) |
| **Name** | whoza-dashboard-login |
| **URL** | `https://www.whoza.ai/dashboard` |
| **Interval** | 10 minutes |
| **Locations** | UK, US-East |
| **Expected Status** | 200 (or 302/401 if auth required) |
| **Tags** | whoza, production, dashboard |

---

### 8. whoza-api-calls
| Field | Value |
|-------|-------|
| **Check Type** | HTTP(S) |
| **Name** | whoza-api-calls |
| **URL** | `https://ligjstpxqtkurvteyyhw.supabase.co/rest/v1/calls?limit=1` |
| **Interval** | 10 minutes |
| **Locations** | UK, US-East |
| **Expected Status** | 200 |
| **Tags** | whoza, infrastructure, supabase, api |

---

### 9. whoza-webhook-receiver
| Field | Value |
|-------|-------|
| **Check Type** | HTTP(S) |
| **Name** | whoza-webhook-receiver |
| **URL** | `https://www.whoza.ai/api/trillet-webhook` |
| **Interval** | 5 minutes |
| **Locations** | UK, US-East |
| **Expected Status** | 200 (or 405 if HEAD not allowed — set method to GET) |
| **Tags** | whoza, production, webhook |

---

## Alert Configuration

For each check, set up:
1. **Contact Group**: Dru McPherson (or your preferred group)
2. **Escalation**: Immediate email
3. **Status Page**: Add to whoza.ai public status page (if configured)

## Verification

After adding all 9, verify at:
- Dashboard: https://uptime.com/dashboard
- API list: `curl -H "Authorization: Token 5bc4a..." https://uptime.com/api/v1/checks/`

Total: **10 monitors** (1 existing + 9 new) covering production, staging, voice, trades, and infrastructure.
