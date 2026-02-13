# Google Places API Setup Guide

**Last Updated**: December 31, 2024
**Purpose**: Enable full business verification and accurate visibility scoring in Whoza.ai

---

## Overview

The Google Places API integration provides:
- ✅ Real business verification (confirms business exists on Google)
- ✅ Accurate visibility scoring (40-75 point range vs 30-55 fallback)
- ✅ Google Business Profile analysis (ratings, reviews, photos)
- ✅ Competitive intelligence (review count, rating comparison)
- ✅ Address and location validation

**Status Without API**: Platform works with graceful fallback (basic scoring 30-55 points)
**Status With API**: Full functionality (verified scoring 40-75+ points)

---

## Cost Analysis

### Typical Monthly Costs

**Free VCS Usage** (100 submissions/month):
- Find Place API: 100 calls × $0.017 = $1.70
- Place Details API: 100 calls × $0.017 = $1.70
- **Subtotal**: $3.40/month

**With Caching** (70% cache hit rate):
- Actual API calls: 30/month
- Cost: 30 × $0.034 = $1.02/month

**Typical Real-World Cost**: $1-3/month

### Google Cloud Free Tier
- $200 credit for new accounts (valid for 90 days)
- This covers ~5,900 API calls
- Perfect for testing and initial launch

### API Pricing Breakdown
| API Call Type | Cost per Call | Used For |
|---------------|---------------|----------|
| Find Place (Text) | $0.017 | Business search |
| Place Details (Basic) | $0.017 | Basic info retrieval |
| Place Details (Contact) | $0.003 | Phone number |
| Place Details (Atmosphere) | $0.005 | Reviews, ratings |

**Note**: Our implementation uses Basic + Contact + Atmosphere = $0.025 per business verification

---

## Step-by-Step Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "New Project"
3. Enter project name: `whoza-ai-production` (or your preferred name)
4. Click "Create"
5. Wait for project creation (30-60 seconds)

### Step 2: Enable Required APIs

1. Navigate to [API Library](https://console.cloud.google.com/apis/library)
2. Search for and enable these APIs:
   - **Places API** (REQUIRED)
   - **Maps JavaScript API** (RECOMMENDED - for future map features)
   - **Geocoding API** (OPTIONAL - for enhanced location services)

**For Each API:**
1. Click the API name
2. Click "Enable"
3. Wait for activation (10-30 seconds)

### Step 3: Create API Key

1. Navigate to [Credentials](https://console.cloud.google.com/apis/credentials)
2. Click "Create Credentials" → "API Key"
3. Copy the generated API key (starts with `AIza...`)
4. **IMPORTANT**: Immediately click "Restrict Key" for security

### Step 4: Restrict API Key (Security Critical)

**Application Restrictions:**
1. Choose "HTTP referrers (websites)"
2. Add your domains:
   ```
   https://yourdomain.com/*
   https://*.yourdomain.com/*
   http://localhost:*
   http://localhost:5173/*
   ```

**API Restrictions:**
1. Choose "Restrict key"
2. Select only:
   - ✅ Places API
   - ✅ Maps JavaScript API (if enabled)
   - ✅ Geocoding API (if enabled)

3. Click "Save"

**Why Restrict?**
- Prevents unauthorized use if key is exposed
- Limits blast radius of security incidents
- Reduces risk of quota exhaustion attacks

### Step 5: Set Up Billing (Required)

**IMPORTANT**: Google Places API requires billing enabled, even for free tier usage.

1. Navigate to [Billing](https://console.cloud.google.com/billing)
2. Click "Link a billing account" or "Create billing account"
3. Enter payment information
4. **Set Budget Alert**:
   - Go to [Budgets & Alerts](https://console.cloud.google.com/billing/budgets)
   - Click "Create Budget"
   - Set amount: $10/month
   - Add alert at 50%, 90%, 100%
   - Add your email for notifications

**Safety Tip**: Budget alerts prevent surprise charges

### Step 6: Configure Environment Variable

**Local Development:**
1. Open your `.env` file
2. Add the line:
   ```bash
   VITE_GOOGLE_PLACES_API_KEY=AIza...your-actual-key
   ```
3. Save the file
4. Restart your dev server

**Production Deployment:**

**For Vercel:**
```bash
vercel env add VITE_GOOGLE_PLACES_API_KEY
# Paste your API key when prompted
# Select: Production, Preview, Development
```

**For Netlify:**
1. Go to Site Settings → Environment Variables
2. Add new variable:
   - Key: `VITE_GOOGLE_PLACES_API_KEY`
   - Value: `AIza...your-actual-key`
3. Save and redeploy

**For Other Platforms:**
- Add environment variable through platform's dashboard
- Ensure variable is named exactly: `VITE_GOOGLE_PLACES_API_KEY`
- Redeploy application after adding variable

---

## Testing the Integration

### Test 1: Verify API Key Works

**Using Browser Console:**
1. Open [Google Places API Tester](https://developers.google.com/maps/documentation/places/web-service/search-find-place)
2. Try a test request:
   ```
   https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&key=YOUR_API_KEY
   ```
3. Expected response: JSON with `status: "OK"` and place results

### Test 2: Test in Application (Local)

**Method 1: Use Free VCS Form**
1. Start dev server: `npm run dev`
2. Navigate to `/free-score`
3. Fill in form:
   - Business Name: "Apple Store"
   - Trade: "Technology"
   - Location: "London, UK"
   - Website: "https://apple.com"
   - Email: "test@example.com"
4. Submit form
5. Check browser console for:
   ```
   ✅ Google Places API: Found business
   ✅ Score: 65-75 (with Google data)
   ```

**Method 2: Direct API Test (Browser Console)**
```javascript
// Run in browser console on any page of your app
const testGooglePlaces = async () => {
  const { findBusinessByName } = await import('./src/lib/api/googlePlacesService.js');

  try {
    const result = await findBusinessByName('Apple Store', 'London, UK', null, null);
    console.log('✅ Google Places API Working:', result);
    return result;
  } catch (error) {
    console.error('❌ Google Places API Error:', error.message);
    return null;
  }
};

await testGooglePlaces();
```

**Expected Results:**

**With Valid API Key:**
```javascript
{
  found: true,
  candidates: [
    {
      place_id: "ChIJ...",
      name: "Apple Store",
      formatted_address: "235 Regent St, London...",
      business_status: "OPERATIONAL"
    }
  ],
  status: "OK"
}
```

**Without API Key (Fallback):**
```javascript
Error: Google Places API key not configured
// Application continues with fallback scoring (30-55 points)
```

### Test 3: Verify Scoring Difference

**Without Google API** (Fallback Mode):
- Business with website: ~55/100
- Business without website: ~40/100
- Range: 30-55 points

**With Google API** (Full Mode):
- Business verified on Google: 40-75+ points
- Business not found: 0-30 points
- More accurate, data-driven scores

---

## Integration Points

### 1. Free Visibility Confidence Score (Primary Use)

**File**: `src/services/freeScoreService.js`
**Function**: `submitFreeScore()`

**Flow:**
```javascript
User submits Free VCS form
  ↓
freeScoreService.submitFreeScore()
  ↓
Calls: findBusinessByName() from googlePlacesService
  ↓
IF API key configured:
  ✅ Find business on Google
  ✅ Calculate score (40-75)
  ✅ Return verified data
ELSE:
  ⚠️ Fall back to basic scoring (30-55)
  ⚠️ Use heuristics instead of verification
  ↓
Continue: Database save → Email → Display
```

**Scoring Algorithm (With Google API):**
```javascript
Base Score: 30 points (business found on Google)

Rating Bonus:
  - 4.5+ stars: +20 points
  - 4.0-4.4 stars: +15 points
  - 3.5-3.9 stars: +10 points

Review Count Bonus:
  - 50+ reviews: +20 points
  - 25-49 reviews: +15 points
  - 10-24 reviews: +10 points
  - 5-9 reviews: +5 points

Additional Factors:
  - Has website: +10 points
  - Has phone: +5 points
  - Has 5+ photos: +10 points
  - Has opening hours: +5 points

Maximum Score: 100 points
Typical Range: 40-75 points
```

### 2. Business Verification (Portal Feature)

**File**: `src/lib/api/googlePlacesService.js`
**Function**: `verifyAndFetchBusinessData()`

**Used By**: Authenticated users in the Portal
**Purpose**: Comprehensive business profile verification
**Data Retrieved**:
- Business name and address
- Phone number and website
- Google rating and review count
- Sample reviews (top 5)
- Photos count
- Opening hours
- Business status (open/closed)
- Google Maps URL

### 3. Caching Layer

**File**: `src/lib/cache/apiCache.js`
**Strategy**: LRU (Least Recently Used) cache
**TTL**: 200 seconds per entry
**Cache Hit Rate**: ~70% expected

**Benefits:**
- Reduces API costs by 70%
- Faster response times (0ms vs 200-500ms)
- Minimizes quota usage

**Implementation:**
```javascript
// Cache key format:
// provider:endpoint:params_hash
// Example: "google_places:findplacefromtext:cafe_london_uk"

// Automatic cache expiry after 200 seconds
// Automatic cache eviction when memory limit reached (100 entries)
```

### 4. Usage Logging

**File**: `src/lib/api/usageLogger.js`
**Table**: `api_usage_logs` (Supabase)

**Tracked Metrics:**
- Provider (google_places)
- Endpoint (findplacefromtext, details)
- Status code
- Response time (ms)
- Cache hit/miss
- Error messages
- User ID and Business ID (when available)

**Benefits:**
- Cost monitoring
- Performance tracking
- Error detection
- Usage analytics

---

## Troubleshooting

### Error: "API key not valid"

**Cause**: API key not configured or incorrect

**Solutions:**
1. Check `.env` file has correct key (starts with `AIza...`)
2. Restart dev server after adding key
3. Verify key is not restricted to different domain
4. Check API key hasn't been deleted in Google Cloud Console

### Error: "This API project is not authorized to use this API"

**Cause**: Places API not enabled for your project

**Solutions:**
1. Go to [API Library](https://console.cloud.google.com/apis/library)
2. Search "Places API"
3. Click "Enable"
4. Wait 2-3 minutes for propagation
5. Try again

### Error: "REQUEST_DENIED - Billing must be enabled"

**Cause**: Billing not set up on Google Cloud project

**Solutions:**
1. Go to [Billing](https://console.cloud.google.com/billing)
2. Link billing account
3. Add payment method
4. Wait 5-10 minutes for activation
5. Try again

**Note**: You won't be charged without usage exceeding free tier

### Error: "OVER_QUERY_LIMIT"

**Cause**: Exceeded daily quota or rate limit

**Solutions:**
1. Check [Quotas](https://console.cloud.google.com/apis/api/places-backend.googleapis.com/quotas)
2. Verify caching is working (check `api_usage_logs` table)
3. Consider increasing quota (usually not needed)
4. Implement request throttling if needed

**Prevention**: Our caching layer should keep you under limits

### Warning: "Google Places API key not configured - skipping verification"

**Cause**: This is expected behavior when API key not configured

**Impact**:
- ✅ Application works normally
- ⚠️ Uses fallback scoring (30-55 points)
- ⚠️ No real business verification

**Solution**: Add API key to enable full functionality (optional)

### High Costs (Unexpected Charges)

**Diagnose:**
1. Check usage: [Google Cloud Console](https://console.cloud.google.com/apis/dashboard)
2. Review `api_usage_logs` table:
   ```sql
   SELECT
     DATE(created_at) as date,
     COUNT(*) as calls,
     SUM(CASE WHEN cache_hit THEN 1 ELSE 0 END) as cache_hits,
     AVG(response_time_ms) as avg_response_time
   FROM api_usage_logs
   WHERE provider = 'google_places'
   GROUP BY DATE(created_at)
   ORDER BY date DESC;
   ```
3. Check for cache misses (should be <30%)
4. Look for error loops (repeated failed requests)

**Prevention:**
- Set budget alerts ($10/month recommended)
- Monitor weekly via Google Cloud Console
- Review `api_usage_logs` regularly

---

## Security Best Practices

### 1. API Key Protection

**DO:**
- ✅ Add `.env` to `.gitignore` (already done)
- ✅ Use environment variables for all API keys
- ✅ Restrict API key to specific domains/IPs
- ✅ Restrict API key to specific APIs only
- ✅ Rotate API keys periodically (quarterly recommended)
- ✅ Use different keys for dev/staging/production

**DON'T:**
- ❌ Commit API keys to Git
- ❌ Share API keys in Slack/email
- ❌ Use same API key across multiple projects
- ❌ Leave API keys unrestricted
- ❌ Hardcode API keys in source code

### 2. Monitor for Abuse

**Set Up Alerts:**
1. Budget alerts (Google Cloud Console)
2. Quota alerts (API Dashboard)
3. Error rate monitoring (Supabase logs)

**Review Weekly:**
- API usage patterns
- Cache hit rates
- Error logs
- Cost trends

### 3. Rate Limiting

**Current Implementation:**
- Cache layer (reduces calls by 70%)
- Error handling (prevents retry loops)
- No client-side rate limiting (rely on Google's limits)

**Consider Adding:**
- Client-side rate limiting for high-traffic sites
- Request queuing for bulk operations
- Exponential backoff on errors

---

## API Quotas & Limits

### Default Quotas (per Project)

| Metric | Limit | Notes |
|--------|-------|-------|
| Requests per day | 1,000 free | Then pay-per-use |
| Requests per second | 100 | Usually sufficient |
| Requests per user per second | 10 | Per unique IP |

### Request a Quota Increase

1. Go to [Quotas](https://console.cloud.google.com/apis/api/places-backend.googleapis.com/quotas)
2. Select quota to increase
3. Click "Edit Quotas"
4. Enter new limit and justification
5. Wait for approval (24-48 hours)

**When to Increase:**
- Expecting >1,000 Free VCS submissions/day
- Running bulk verification jobs
- High-traffic periods (campaigns, launches)

**Typical Needs:**
- Startup: 1,000/day (default) ✅
- Growth: 5,000/day
- Scale: 10,000+/day

---

## Migration Guide

### Enabling API on Existing Installation

**Current State**: Fallback mode (30-55 scoring)
**Target State**: Full mode (40-75 verified scoring)

**Steps:**
1. Complete Google Cloud setup (Steps 1-5 above)
2. Add `VITE_GOOGLE_PLACES_API_KEY` to environment
3. Deploy/restart application
4. Test with Free VCS submission
5. Verify improved scoring (40-75 range)
6. Monitor costs daily for first week

**No Code Changes Required**: Integration already built with graceful fallback

**Migration Impact:**
- ✅ Existing submissions unaffected
- ✅ New submissions get verified scores
- ✅ User experience improves immediately
- ✅ No data migration needed

**Rollback Plan:**
- Remove `VITE_GOOGLE_PLACES_API_KEY` from environment
- Application reverts to fallback mode automatically
- No downtime or errors

---

## Advanced Configuration

### Custom Caching Strategy

**Current**: LRU cache, 200-second TTL, 100 entries

**To Customize** (`src/lib/cache/apiCache.js`):
```javascript
// Increase cache size (more memory usage)
maxSize: 500  // default: 100

// Increase TTL (longer cache, less accurate)
ttl: 600  // default: 200 seconds (3.3 minutes)

// Disable cache (for debugging)
const cachedResult = null;  // Skip cache read
```

### Field Selection Optimization

**Current**: Full field set (name, address, phone, rating, reviews, etc.)

**To Reduce Costs**, edit `src/lib/api/googlePlacesService.js:160-173`:
```javascript
// Minimal fields (cheapest)
fields: 'name,rating,user_ratings_total,business_status'

// Recommended fields (balanced)
fields: 'name,formatted_address,rating,user_ratings_total,website,formatted_phone_number,business_status'

// Full fields (most expensive, current default)
fields: 'name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,reviews,opening_hours,photos,business_status,types,url'
```

**Cost Impact:**
- Minimal: $0.017/call
- Recommended: $0.022/call
- Full: $0.034/call

### Environment-Specific Keys

**Best Practice**: Use different API keys for each environment

```bash
# .env.development
VITE_GOOGLE_PLACES_API_KEY=AIza...dev-key

# .env.staging
VITE_GOOGLE_PLACES_API_KEY=AIza...staging-key

# .env.production
VITE_GOOGLE_PLACES_API_KEY=AIza...production-key
```

**Benefits:**
- Isolate quotas per environment
- Track costs per environment
- Easier to debug issues
- Security isolation

---

## Monitoring & Maintenance

### Weekly Checklist

**Monday Morning:**
1. Review last week's costs in [Google Cloud Console](https://console.cloud.google.com/billing)
2. Check cache hit rate in `api_usage_logs`:
   ```sql
   SELECT
     COUNT(*) FILTER (WHERE cache_hit = true)::float / COUNT(*) * 100 as cache_hit_rate
   FROM api_usage_logs
   WHERE provider = 'google_places'
     AND created_at >= NOW() - INTERVAL '7 days';
   ```
3. Review error logs for patterns
4. Verify quota usage (should be <50% of limit)

**Expected Metrics:**
- Cache hit rate: 60-80%
- Average response time: 200-500ms (without cache)
- Average response time: 0-50ms (with cache)
- Daily costs: $0.10-1.00 (depending on traffic)
- Error rate: <2%

### Monthly Checklist

**First Monday of Month:**
1. Review total monthly costs (should be $1-5)
2. Check for unusual spikes in usage
3. Verify API key restrictions still in place
4. Update budget alerts if needed
5. Review and clean old cache entries (automatic)

### Quarterly Checklist

**Every 3 Months:**
1. Rotate API keys (security best practice)
2. Review quota limits (increase if needed)
3. Optimize field selection if costs high
4. Update documentation for any changes
5. Test failover to fallback mode

---

## Support & Resources

### Official Documentation
- [Places API Overview](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Places API Usage & Billing](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing)
- [Places API Quotas](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing#quotas)
- [Google Cloud Console](https://console.cloud.google.com/)

### Whoza.ai Documentation
- `FINAL_TEST_REPORT.md` - Complete system testing
- `PRODUCTION_READINESS_CHECKLIST.md` - Deployment guide
- `API_INTEGRATION_STATUS.md` - All API integrations
- `.env.example` - Environment variables reference

### Common Questions

**Q: Is Google Places API required?**
A: No. The platform works without it (fallback scoring 30-55). Adding it improves accuracy (40-75 verified scoring).

**Q: How much does it cost?**
A: Typically $1-3/month with caching. New accounts get $200 free credit (90 days).

**Q: What happens if I exceed quota?**
A: API returns error, application falls back to basic scoring automatically. No downtime.

**Q: Can I use this for commercial projects?**
A: Yes. Google Places API Terms of Service allow commercial use.

**Q: How often should I rotate keys?**
A: Quarterly recommended. More frequently if key is compromised.

**Q: What if Google changes pricing?**
A: Monitor via billing alerts. Budget alerts protect against surprises.

---

## Changelog

### v1.0.0 - December 31, 2024
- Initial documentation created
- Complete setup guide
- Testing procedures documented
- Security best practices added
- Troubleshooting section added
- Cost analysis completed

---

## Next Steps

1. ✅ Complete Google Cloud setup (Steps 1-5)
2. ✅ Add API key to `.env` file
3. ✅ Test integration with Free VCS
4. ✅ Set up budget alerts ($10/month)
5. ✅ Monitor costs weekly for first month
6. ⚠️ Consider adding to staging/production environments
7. ⚠️ Schedule quarterly API key rotation

**Estimated Setup Time**: 15-20 minutes
**Recommended For**: Production deployments, accurate scoring
**Optional For**: Development, testing, MVP launches

---

**Questions?** Refer to FINAL_TEST_REPORT.md for detailed technical analysis.

**Ready to Deploy?** Check PRODUCTION_READINESS_CHECKLIST.md for complete deployment guide.
