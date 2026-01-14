# Third-Party Integrations Strategy

## Integration Architecture Overview

This document outlines the strategy, architecture, and implementation plan for third-party integrations with Rex, prioritizing secure, scalable, and user-friendly connections to external services.

## Architecture Principles

### 1. Security First
- All API keys stored server-side only (Edge Functions + Database)
- Encrypted credential storage in database
- OAuth 2.0 for user-authorized integrations
- Webhook signature verification
- Rate limiting and abuse prevention
- Audit logging for all integration activities

### 2. Reliability & Resilience
- Retry logic with exponential backoff
- Circuit breaker pattern for failing services
- Webhook event queuing and processing
- Idempotent operations (prevent duplicate processing)
- Graceful degradation when services unavailable
- Comprehensive error handling and logging

### 3. Scalability
- Asynchronous processing for heavy operations
- Batch processing for bulk operations
- Event-driven architecture with queues
- Caching for frequently accessed data
- Rate limit management
- Horizontal scaling ready

### 4. User Experience
- Clear authorization flows
- Transparent status updates
- Helpful error messages
- Easy disconnect/reconnect
- Integration health monitoring
- Usage analytics and insights

## Integration Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                       USER INTERFACE                             │
│  • Integration settings page                                     │
│  • OAuth authorization flows                                     │
│  • Connection status display                                     │
│  • Usage metrics and insights                                    │
└─────────────────────┬───────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│                  INTEGRATION LAYER                               │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐          │
│  │         Integration Manager Service               │          │
│  │  • Credential management                          │          │
│  │  • Connection lifecycle                           │          │
│  │  • Health monitoring                              │          │
│  │  • Error handling                                 │          │
│  └──────────────────┬───────────────────────────────┘          │
│                     │                                            │
│  ┌──────────────────┼───────────────────────────────┐          │
│  │                  │                                 │          │
│  ▼                  ▼                                 ▼          │
│  Stripe          Google Business              Social Media       │
│  Service         Profile Service              Services           │
│                                                                  │
└────────────────────┬─────────────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────────────┐
│                  EDGE FUNCTIONS LAYER                             │
│                                                                   │
│  • process-stripe-webhooks    (Stripe events)                    │
│  • sync-google-profile        (GBP data sync)                    │
│  • process-social-webhooks    (Social media events)              │
│  • refresh-integration-tokens (OAuth token refresh)              │
│  • check-integration-health   (Health monitoring)                │
│                                                                   │
└────────────────────┬─────────────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────────────┐
│                  DATABASE LAYER                                   │
│                                                                   │
│  • integration_providers      (Available integrations)           │
│  • user_integrations          (User connections)                 │
│  • integration_credentials    (Encrypted credentials)            │
│  • integration_webhooks       (Webhook events)                   │
│  • integration_sync_log       (Sync history)                     │
│  • stripe_customers           (Stripe customer data)             │
│  • stripe_subscriptions       (Subscription data)                │
│  • google_business_profiles   (GBP data cache)                   │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

## Integration Data Flow

### OAuth Authorization Flow

```
User clicks "Connect Google"
        ↓
Frontend initiates OAuth
        ↓
Redirect to Google OAuth consent screen
        ↓
User authorizes access
        ↓
Google redirects back with auth code
        ↓
Edge Function: exchange code for tokens
        ↓
Store encrypted tokens in database
        ↓
Mark integration as active
        ↓
Display success message
        ↓
Begin initial data sync (async)
```

### Webhook Processing Flow

```
External Service (e.g., Stripe)
        ↓
POST webhook event to Edge Function
        ↓
Verify webhook signature
        ↓
Store raw event in database
        ↓
Queue event for processing
        ↓
Process event asynchronously
        ↓
Update relevant database tables
        ↓
Trigger user notifications (if needed)
        ↓
Mark event as processed
        ↓
Return 200 OK to external service
```

### Data Sync Flow

```
Scheduled cron job triggers
        ↓
Edge Function: sync-integration-data
        ↓
Fetch list of active integrations
        ↓
For each integration:
  ├─ Check rate limits
  ├─ Fetch data from external API
  ├─ Transform to internal format
  ├─ Update database tables
  ├─ Log sync status
  └─ Handle errors with retry
        ↓
Update last_synced_at timestamp
        ↓
Generate sync report
```

---

## 1. Stripe Integration (Priority)

### Overview

Deep integration with Stripe for subscription billing, payment processing, and revenue management.

### Features

**Phase 1: Subscription Management (MVP)**
- Create and manage subscription plans
- Customer creation and management
- Checkout session creation
- Webhook processing for subscription events
- Subscription status tracking
- Payment method management

**Phase 2: Advanced Features**
- Usage-based billing
- Proration handling
- Trial management
- Discount and coupon management
- Invoice management
- Failed payment recovery

**Phase 3: Analytics & Optimization**
- Revenue analytics
- Churn prediction
- Payment success optimization
- Customer lifetime value tracking
- Subscription upgrade/downgrade flows

### Technical Implementation

#### Database Schema

**stripe_customers**
- Links Stripe customer ID to Rex user
- Stores customer metadata
- Tracks customer status

**stripe_subscriptions**
- Subscription details
- Status tracking
- Price and plan information
- Renewal dates

**stripe_products**
- Product catalog sync
- Pricing information
- Features mapping

**stripe_invoices**
- Invoice history
- Payment status
- PDF links

**stripe_webhook_events**
- Event logging
- Processing status
- Retry tracking

#### Edge Functions

**1. create-checkout-session**
```typescript
// Create Stripe checkout session
// Input: user_id, price_id, success_url, cancel_url
// Output: checkout_session_url
```

**2. process-stripe-webhook**
```typescript
// Process Stripe webhooks
// Events handled:
// - customer.subscription.created
// - customer.subscription.updated
// - customer.subscription.deleted
// - invoice.payment_succeeded
// - invoice.payment_failed
// - customer.created
// - customer.updated
```

**3. create-stripe-customer**
```typescript
// Create Stripe customer from Rex user
// Sync customer data
```

**4. manage-subscription**
```typescript
// Update subscription (upgrade/downgrade/cancel)
// Handle proration
// Update billing cycle
```

**5. sync-stripe-data**
```typescript
// Daily sync of customer and subscription data
// Reconcile discrepancies
```

#### API Integration Points

**Stripe API Calls:**
```javascript
// Customer Management
stripe.customers.create()
stripe.customers.update()
stripe.customers.retrieve()

// Subscription Management
stripe.subscriptions.create()
stripe.subscriptions.update()
stripe.subscriptions.cancel()
stripe.subscriptions.retrieve()

// Checkout
stripe.checkout.sessions.create()
stripe.checkout.sessions.retrieve()

// Payment Methods
stripe.paymentMethods.attach()
stripe.paymentMethods.detach()
stripe.paymentMethods.list()

// Invoices
stripe.invoices.list()
stripe.invoices.retrieve()
stripe.invoices.pay()

// Products & Prices
stripe.products.list()
stripe.prices.list()
```

#### Webhook Events to Handle

**Critical Events:**
- `customer.subscription.created` - New subscription
- `customer.subscription.updated` - Subscription change
- `customer.subscription.deleted` - Cancellation
- `invoice.payment_succeeded` - Successful payment
- `invoice.payment_failed` - Failed payment
- `customer.updated` - Customer data change

**Important Events:**
- `payment_method.attached` - New payment method
- `payment_method.detached` - Removed payment method
- `invoice.created` - New invoice
- `invoice.finalized` - Invoice ready
- `charge.succeeded` - Successful charge
- `charge.failed` - Failed charge

#### Security Measures

**Webhook Verification:**
```javascript
// Verify webhook signature
const signature = request.headers.get('stripe-signature');
const event = stripe.webhooks.constructEvent(
  payload,
  signature,
  webhookSecret
);
```

**API Key Management:**
- Store Stripe secret key in environment variables (server-side only)
- Use restricted API keys with minimal permissions
- Rotate keys quarterly
- Never expose in client code

**PCI Compliance:**
- Use Stripe Checkout (Stripe hosts payment form)
- Never store card details
- Use Stripe.js for client-side tokenization
- Maintain PCI compliance through Stripe

#### User Experience Flow

**Subscribe Flow:**
```
1. User selects plan on Pricing page
2. Click "Subscribe" button
3. Redirect to Stripe Checkout (hosted)
4. Enter payment details on Stripe
5. Stripe processes payment
6. Redirect back to success page
7. Webhook creates subscription in database
8. User gains access to premium features
```

**Manage Subscription Flow:**
```
1. User goes to Account Settings
2. View current subscription
3. Options: Upgrade, Downgrade, Cancel
4. Confirm action
5. API call to update subscription
6. Stripe handles proration
7. Database updated via webhook
8. User sees updated status
```

**Failed Payment Flow:**
```
1. Stripe attempts to charge card
2. Payment fails
3. Webhook received: invoice.payment_failed
4. Send notification to user
5. Give user 3 days to update payment method
6. Retry payment (Stripe automatic retry)
7. If still fails: downgrade to free plan
8. Send final notification
```

#### Pricing Strategy Support

**Supported Models:**
- **Fixed pricing**: £10/month, £100/year
- **Tiered pricing**: Starter, Pro, Enterprise
- **Usage-based**: Pay per task generated
- **Hybrid**: Base fee + usage overage

**Features:**
- Multiple currencies support
- Tax calculation (Stripe Tax)
- Coupons and promotions
- Free trials (7, 14, 30 days)
- Annual billing discounts

---

## 2. Google Business Profile API Integration

### Overview

Automate data gathering from Google Business Profile to streamline visibility scoring and task generation.

### Features

**Phase 1: Profile Data Sync**
- Fetch business profile information
- Sync reviews and ratings
- Get business hours and location
- Retrieve photos and media
- Track profile completeness

**Phase 2: Analytics & Insights**
- Search query impressions
- Customer actions (calls, directions, website visits)
- Popular times and visit data
- Review sentiment analysis
- Competitor insights

**Phase 3: Automation & Actions**
- Auto-update business information
- Respond to reviews (with approval)
- Post updates automatically
- Performance recommendations
- Alert on negative reviews

### Technical Implementation

#### Database Schema

**google_business_profiles**
- Cached profile data
- Location information
- Profile completeness score
- Last sync timestamp

**google_business_reviews**
- Review text and rating
- Reviewer information
- Response status
- Sentiment score

**google_business_insights**
- Time-series analytics data
- Search queries
- Customer actions
- Performance metrics

#### OAuth 2.0 Flow

**Scopes Required:**
```
https://www.googleapis.com/auth/business.manage
```

**Authorization Process:**
```javascript
// 1. Initiate OAuth flow
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?
  client_id=${CLIENT_ID}&
  redirect_uri=${REDIRECT_URI}&
  response_type=code&
  scope=https://www.googleapis.com/auth/business.manage&
  access_type=offline&
  prompt=consent`;

// 2. Exchange code for tokens
const tokens = await oauth2Client.getToken(code);

// 3. Store encrypted tokens
await storeIntegrationCredentials(userId, 'google_business', tokens);
```

#### API Integration Points

**Profile Management:**
```javascript
// List accounts and locations
GET /v1/accounts
GET /v1/accounts/{accountId}/locations

// Get location details
GET /v1/accounts/{accountId}/locations/{locationId}

// Update location
PATCH /v1/accounts/{accountId}/locations/{locationId}
```

**Reviews:**
```javascript
// List reviews
GET /v1/accounts/{accountId}/locations/{locationId}/reviews

// Reply to review
PUT /v1/accounts/{accountId}/locations/{locationId}/reviews/{reviewId}/reply
```

**Insights:**
```javascript
// Get location insights
POST /v1/accounts/{accountId}/locations/{locationId}:reportInsights
```

#### Edge Functions

**1. sync-google-profile**
```typescript
// Scheduled daily sync
// Fetch profile data
// Update database
// Calculate visibility impact
```

**2. process-google-reviews**
```typescript
// Fetch new reviews
// Analyze sentiment
// Generate response suggestions
// Notify user
```

**3. refresh-google-tokens**
```typescript
// Refresh OAuth tokens before expiry
// Update stored credentials
```

#### Data Sync Strategy

**Sync Frequency:**
- Profile info: Daily
- Reviews: Every 6 hours
- Insights: Daily
- Photos: Weekly

**Rate Limiting:**
- 100 requests per 100 seconds (Google limit)
- Implement exponential backoff
- Queue requests for batch processing

#### User Benefits

**Automated Visibility Scoring:**
- Google profile completeness affects score
- Review count and rating factored in
- Response rate to reviews tracked
- Photo quality and quantity scored

**Task Generation:**
- "Respond to 3 new reviews"
- "Add 5 photos to Google profile"
- "Update business hours for holiday"
- "Complete missing profile sections"

**Insights Dashboard:**
- Show Google search impressions
- Display customer actions trends
- Review analytics
- Competitor comparison

---

## 3. Social Media Integrations

### Overview

Connect to major social media platforms to expand visibility tracking and content management.

### Platforms (Priority Order)

1. **Facebook Business** (High priority)
2. **Instagram Business** (High priority)
3. **LinkedIn Company Pages** (Medium priority)
4. **Twitter/X Business** (Medium priority)
5. **TikTok Business** (Low priority)

### Common Features Across Platforms

**Profile Management:**
- Sync profile information
- Track follower growth
- Monitor engagement metrics
- Content performance analytics

**Content Publishing:**
- Schedule posts
- Cross-post to multiple platforms
- Content calendar
- Performance tracking

**Engagement Tracking:**
- Monitor mentions
- Track comments and replies
- Sentiment analysis
- Response time tracking

**Analytics:**
- Reach and impressions
- Engagement rate
- Follower demographics
- Best posting times

### Technical Implementation

#### Database Schema

**social_media_accounts**
- Platform type (Facebook, Instagram, etc.)
- Account details
- Connection status
- Access tokens (encrypted)

**social_media_posts**
- Post content
- Platform-specific IDs
- Performance metrics
- Scheduled/published timestamps

**social_media_metrics**
- Time-series data
- Platform-specific KPIs
- Aggregated analytics

#### OAuth Implementation (Platform Specific)

**Facebook/Instagram (Meta):**
```javascript
// Scopes
pages_show_list
pages_read_engagement
instagram_basic
instagram_manage_insights

// OAuth Flow
const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?
  client_id=${APP_ID}&
  redirect_uri=${REDIRECT_URI}&
  scope=pages_show_list,pages_read_engagement,instagram_basic&
  state=${STATE}`;
```

**LinkedIn:**
```javascript
// Scopes
r_organization_social
w_organization_social
rw_organization_admin

// OAuth Flow (standard OAuth 2.0)
```

#### Edge Functions

**1. sync-social-profiles**
```typescript
// Sync profile data from all connected platforms
// Update metrics
// Calculate social visibility score
```

**2. publish-social-content**
```typescript
// Publish scheduled posts
// Cross-post to multiple platforms
// Track publishing success
```

**3. process-social-webhooks**
```typescript
// Handle real-time updates
// New comments, mentions, messages
// Engagement notifications
```

#### Integration Benefits

**Visibility Scoring:**
- Social presence completeness
- Posting frequency
- Engagement rate
- Follower growth

**Task Generation:**
- "Post 3 times this week"
- "Respond to 5 pending comments"
- "Share customer testimonial"
- "Update profile bio with keywords"

---

## 4. Additional Business Tool Integrations

### CRM Integrations

**HubSpot** (Priority)
- Sync customer data
- Track interactions
- Pipeline visibility
- Contact enrichment

**Salesforce**
- Customer relationship data
- Sales pipeline
- Activity tracking

**Pipedrive**
- Deal tracking
- Contact management
- Sales analytics

### Email Marketing Integrations

**Mailchimp** (Priority)
- Sync email lists
- Campaign performance
- Subscriber engagement
- Automated workflows

**SendGrid**
- Email deliverability
- Campaign analytics
- Template management

**ConvertKit**
- Creator-focused features
- Subscriber segmentation
- Automation sequences

### Communication Integrations

**Slack**
- Notifications
- Alerts
- Bot commands
- Team collaboration

**Microsoft Teams**
- Notifications
- Alerts
- Bot integration

### Analytics Integrations

**Google Analytics**
- Website traffic data
- Conversion tracking
- User behavior
- Traffic sources

**Mixpanel**
- Product analytics
- User journey tracking
- Cohort analysis

### Review Platform Integrations

**Trustpilot**
- Review aggregation
- Response management
- Rating tracking

**Yelp Business**
- Profile management
- Review monitoring
- Analytics

---

## Integration Management System

### User Interface

**Integration Settings Page:**
```
┌─────────────────────────────────────────────────┐
│  Available Integrations                          │
├─────────────────────────────────────────────────┤
│                                                  │
│  [Stripe Logo]                                  │
│  Stripe                                 ✓ Active│
│  Subscription billing and payments              │
│  Connected: Dec 24, 2024                        │
│  [Manage] [Disconnect]                          │
│                                                  │
│  [Google Business Profile Logo]                 │
│  Google Business Profile           Not Connected│
│  Sync your business profile data                │
│  [Connect]                                      │
│                                                  │
│  [Facebook Logo]                                │
│  Facebook Business                 Not Connected│
│  Manage your Facebook presence                  │
│  [Connect]                                      │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Integration Detail Page:**
```
┌─────────────────────────────────────────────────┐
│  ← Back to Integrations                         │
│                                                  │
│  Google Business Profile                        │
│  Status: ✓ Active                               │
│  Connected: Dec 24, 2024                        │
│  Last Synced: 2 hours ago                       │
│                                                  │
│  ┌───────────────────────────────────────────┐ │
│  │  Recent Activity                           │ │
│  │  • Synced 12 reviews                       │ │
│  │  • Updated profile information             │ │
│  │  • Fetched insights data                   │ │
│  └───────────────────────────────────────────┘ │
│                                                  │
│  ┌───────────────────────────────────────────┐ │
│  │  Settings                                  │ │
│  │  ☑ Auto-sync profile daily                │ │
│  │  ☑ Notify on new reviews                  │ │
│  │  ☐ Auto-respond to positive reviews       │ │
│  └───────────────────────────────────────────┘ │
│                                                  │
│  [Sync Now] [Disconnect]                        │
│                                                  │
└─────────────────────────────────────────────────┘
```

### Database Schema

**integration_providers**
- Provider metadata (name, logo, description)
- API endpoints
- OAuth configuration
- Supported features
- Status (active, beta, deprecated)

**user_integrations**
- User-specific connections
- Connection status
- Settings and preferences
- Last sync timestamp
- Health status

**integration_credentials**
- Encrypted API keys
- OAuth tokens (access + refresh)
- Token expiry
- Encryption method

**integration_webhooks**
- Webhook events received
- Processing status
- Retry count
- Error details

**integration_sync_log**
- Sync history
- Records synced
- Errors encountered
- Duration
- Next scheduled sync

---

## Security & Compliance

### Credential Management

**Encryption:**
```javascript
// Encrypt before storing
const encrypted = await encrypt(credentials, {
  key: ENCRYPTION_KEY,
  algorithm: 'aes-256-gcm'
});

// Decrypt when using
const credentials = await decrypt(encryptedData, {
  key: ENCRYPTION_KEY,
  algorithm: 'aes-256-gcm'
});
```

**Key Storage:**
- Master encryption key in Supabase Vault
- Per-integration keys derived from master
- Key rotation every 90 days
- Audit log for key access

### API Security

**Rate Limiting:**
- Per-user limits
- Per-integration limits
- Exponential backoff on errors
- Circuit breaker pattern

**Webhook Security:**
- Signature verification (HMAC)
- IP allowlisting where possible
- Replay attack prevention
- Event deduplication

### Privacy & Compliance

**Data Minimization:**
- Store only necessary data
- Purge old sync data (90 days)
- User can disconnect anytime
- Clear data on disconnect

**User Consent:**
- Explicit permission for each integration
- Clear scope explanation
- Revoke access anytime
- Audit trail of access

**GDPR Compliance:**
- Data portability (export integration data)
- Right to deletion (remove all integration data)
- Data processing agreements with third parties
- User controls over data sharing

---

## Implementation Roadmap

### Phase 1: Foundation (Month 1)
- [ ] Database schema for integration management
- [ ] Integration management UI
- [ ] Credential encryption system
- [ ] Webhook processing framework
- [ ] Basic error handling and retry logic

### Phase 2: Stripe Integration (Month 1-2)
- [ ] Stripe customer and subscription schema
- [ ] Create checkout session edge function
- [ ] Webhook processing for key events
- [ ] Subscription management UI
- [ ] Payment method management
- [ ] Failed payment recovery flow

### Phase 3: Stripe Advanced (Month 2-3)
- [ ] Usage-based billing
- [ ] Proration handling
- [ ] Trial management
- [ ] Coupon and discount system
- [ ] Invoice management
- [ ] Revenue analytics dashboard

### Phase 4: Google Business Profile (Month 3-4)
- [ ] OAuth implementation
- [ ] Profile data sync
- [ ] Review management
- [ ] Insights integration
- [ ] Task generation based on GBP data
- [ ] Visibility score integration

### Phase 5: Social Media (Month 4-6)
- [ ] Facebook/Instagram integration
- [ ] LinkedIn integration
- [ ] Twitter/X integration
- [ ] Content publishing
- [ ] Analytics aggregation
- [ ] Social visibility scoring

### Phase 6: Additional Tools (Month 6+)
- [ ] HubSpot CRM integration
- [ ] Mailchimp integration
- [ ] Slack notifications
- [ ] Google Analytics integration
- [ ] Review platform integrations
- [ ] Custom integration API

---

## Monitoring & Maintenance

### Health Monitoring

**Integration Health Checks:**
- API connectivity
- Token validity
- Rate limit status
- Error rates
- Sync success rates

**Alerts:**
- Integration connection failure
- Token expiration (7 days before)
- Webhook processing failures
- Rate limit approaching (80%)
- Unusual error patterns

### Analytics

**Track Per Integration:**
- Active connections
- API call volume
- Success/failure rates
- Average response time
- Data synced (records/day)
- User engagement with integration features

### Maintenance Tasks

**Daily:**
- Sync active integrations
- Process queued webhooks
- Retry failed operations
- Monitor health checks

**Weekly:**
- Review error logs
- Optimize sync frequency
- Update integration metadata
- Check for API deprecations

**Monthly:**
- Rotate API keys
- Review rate limit usage
- Analyze integration ROI
- Plan new integrations

---

**Document Version**: 1.0
**Last Updated**: 2024-12-24
**Next Review**: Monthly
**Owner**: Integrations Team
