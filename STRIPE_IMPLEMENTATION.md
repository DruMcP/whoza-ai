# Stripe Integration Implementation Guide

## Overview

This guide provides step-by-step instructions for implementing the Stripe integration for subscription billing in Rex.

## Prerequisites

Before implementing Stripe integration, ensure you have:

1. **Stripe Account**: Create account at https://dashboard.stripe.com/register
2. **API Keys**: Obtain from https://dashboard.stripe.com/apikeys
   - Publishable Key (starts with `pk_`)
   - Secret Key (starts with `sk_`)
3. **Webhook Secret**: Will be generated when setting up webhooks
4. **Database**: Migrations already applied (completed ✓)

## Architecture Summary

```
User → Frontend → Edge Function → Stripe API
                       ↓
                  Database (RLS)
                       ↓
                  Webhook ← Stripe
```

**Key Features:**
- Secure server-side API calls only
- PCI compliance through Stripe Checkout
- Webhook-driven subscription updates
- Automatic retry on failures
- Complete audit trail

---

## Phase 1: Environment Setup

### 1.1 Add Environment Variables

Add to your `.env` file (NEVER commit this file):

```env
# Stripe Configuration (Get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_... # or sk_live_... for production
STRIPE_PUBLISHABLE_KEY=pk_test_... # or pk_live_... for production
STRIPE_WEBHOOK_SECRET=whsec_... # Generated when setting up webhooks

# Frontend (already exists)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 1.2 Stripe Account Configuration

**In Stripe Dashboard:**

1. **Set Business Information**
   - Business name and address
   - Tax ID (if applicable)
   - Support email

2. **Enable Payment Methods**
   - Dashboard → Settings → Payment methods
   - Enable: Cards, Google Pay, Apple Pay

3. **Configure Customer Portal** (for self-service)
   - Dashboard → Settings → Customer portal
   - Enable: Update payment method, Cancel subscription
   - Set cancellation behavior (immediate or at period end)

---

## Phase 2: Product & Pricing Setup

### 2.1 Create Products in Stripe

**Via Stripe Dashboard:**

1. Go to Products → Add Product
2. Create your subscription tiers:

**Example: Starter Plan**
```
Name: Starter Plan
Description: Perfect for small businesses getting started
Pricing:
  - Monthly: £10/month
  - Annual: £100/year (save £20)
Features:
  - 50 tasks per month
  - Email support
  - Basic analytics
```

**Example: Pro Plan**
```
Name: Pro Plan
Description: Advanced features for growing businesses
Pricing:
  - Monthly: £30/month
  - Annual: £300/year (save £60)
Features:
  - Unlimited tasks
  - Priority support
  - Advanced analytics
  - Custom branding
```

**Example: Enterprise Plan**
```
Name: Enterprise Plan
Description: Full-featured plan for large organizations
Pricing:
  - Contact for pricing
Features:
  - Everything in Pro
  - Dedicated account manager
  - API access
  - White-label options
```

### 2.2 Sync Products to Database

Create Edge Function to sync products:

```typescript
// supabase/functions/sync-stripe-products/index.ts
import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@14';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req) => {
  try {
    // Fetch all products from Stripe
    const products = await stripe.products.list({ active: true });

    for (const product of products.data) {
      // Fetch prices for this product
      const prices = await stripe.prices.list({ product: product.id });

      // Upsert product
      await supabase.from('stripe_products').upsert({
        stripe_product_id: product.id,
        name: product.name,
        description: product.description,
        active: product.active,
        features: product.features || [],
        feature_map: product.metadata?.feature_map || {},
        metadata: product.metadata,
        images: product.images,
        last_synced_at: new Date().toISOString()
      }, { onConflict: 'stripe_product_id' });

      // Upsert prices
      for (const price of prices.data) {
        await supabase.from('stripe_prices').upsert({
          stripe_price_id: price.id,
          stripe_product_id: product.id,
          unit_amount: price.unit_amount,
          currency: price.currency,
          billing_scheme: price.billing_scheme,
          recurring_interval: price.recurring?.interval,
          recurring_interval_count: price.recurring?.interval_count,
          recurring_usage_type: price.recurring?.usage_type,
          active: price.active,
          metadata: price.metadata,
          last_synced_at: new Date().toISOString()
        }, { onConflict: 'stripe_price_id' });
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Sync error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
```

**Run sync manually or schedule it daily.**

---

## Phase 3: Checkout Implementation

### 3.1 Create Checkout Session Edge Function

```typescript
// supabase/functions/create-checkout-session/index.ts
import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@14';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { user_id, price_id, success_url, cancel_url } = await req.json();

    // Get or create Stripe customer
    let customer;
    const { data: existingCustomer } = await supabase
      .from('stripe_customers')
      .select('stripe_customer_id, email')
      .eq('user_id', user_id)
      .single();

    if (existingCustomer) {
      customer = { id: existingCustomer.stripe_customer_id };
    } else {
      // Fetch user email
      const { data: user } = await supabase.auth.admin.getUserById(user_id);

      // Create Stripe customer
      customer = await stripe.customers.create({
        email: user.user.email,
        metadata: { rex_user_id: user_id }
      });

      // Store in database
      await supabase.from('stripe_customers').insert({
        user_id,
        stripe_customer_id: customer.id,
        email: user.user.email,
        status: 'active'
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: 'subscription',
      line_items: [{ price: price_id, quantity: 1 }],
      success_url,
      cancel_url,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      metadata: { rex_user_id: user_id }
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

### 3.2 Frontend Checkout Flow

```javascript
// In your Pricing page component
import { createCheckoutSession } from '../services/stripeService';

async function handleSubscribe(priceId) {
  try {
    setLoading(true);

    const { url } = await createCheckoutSession(
      user.id,
      priceId,
      `${window.location.origin}/checkout/success`,
      `${window.location.origin}/pricing`
    );

    // Redirect to Stripe Checkout
    window.location.href = url;
  } catch (error) {
    console.error('Checkout failed:', error);
    alert('Failed to start checkout. Please try again.');
  } finally {
    setLoading(false);
  }
}
```

---

## Phase 4: Webhook Implementation

### 4.1 Create Webhook Handler Edge Function

```typescript
// supabase/functions/process-stripe-webhook/index.ts
import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@14';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req) => {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature')!;

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400
      });
    }

    // Store webhook event
    await supabase.from('stripe_webhook_events').insert({
      stripe_event_id: event.id,
      event_type: event.type,
      api_version: event.api_version,
      event_data: event.data.object,
      raw_payload: body,
      signature_verified: true,
      status: 'processing'
    });

    // Process event
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(event.data.object);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Mark event as processed
    await supabase
      .from('stripe_webhook_events')
      .update({ status: 'processed', processed_at: new Date().toISOString() })
      .eq('stripe_event_id', event.id);

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
});

async function handleSubscriptionUpdate(subscription: any) {
  const { data: customer } = await supabase
    .from('stripe_customers')
    .select('user_id')
    .eq('stripe_customer_id', subscription.customer)
    .single();

  if (!customer) return;

  await supabase.from('stripe_subscriptions').upsert({
    stripe_subscription_id: subscription.id,
    stripe_customer_id: subscription.customer,
    user_id: customer.user_id,
    status: subscription.status,
    items: subscription.items.data,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    cancel_at_period_end: subscription.cancel_at_period_end,
    canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
    trial_start: subscription.trial_start ? new Date(subscription.trial_start * 1000).toISOString() : null,
    trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
    last_synced_at: new Date().toISOString()
  }, { onConflict: 'stripe_subscription_id' });

  // Update user's subscription status in users table
  await supabase
    .from('users')
    .update({ subscription_status: subscription.status })
    .eq('id', customer.user_id);
}

async function handleSubscriptionDeleted(subscription: any) {
  const { data: customer } = await supabase
    .from('stripe_customers')
    .select('user_id')
    .eq('stripe_customer_id', subscription.customer)
    .single();

  if (!customer) return;

  await supabase
    .from('stripe_subscriptions')
    .update({
      status: 'canceled',
      ended_at: new Date().toISOString(),
      last_synced_at: new Date().toISOString()
    })
    .eq('stripe_subscription_id', subscription.id);

  // Downgrade user to free plan
  await supabase
    .from('users')
    .update({ subscription_status: 'canceled' })
    .eq('id', customer.user_id);
}

async function handlePaymentSucceeded(invoice: any) {
  // Store invoice
  const { data: customer } = await supabase
    .from('stripe_customers')
    .select('user_id')
    .eq('stripe_customer_id', invoice.customer)
    .single();

  if (!customer) return;

  await supabase.from('stripe_invoices').upsert({
    stripe_invoice_id: invoice.id,
    stripe_customer_id: invoice.customer,
    stripe_subscription_id: invoice.subscription,
    user_id: customer.user_id,
    number: invoice.number,
    status: invoice.status,
    amount_due: invoice.amount_due,
    amount_paid: invoice.amount_paid,
    amount_remaining: invoice.amount_remaining,
    currency: invoice.currency,
    total: invoice.total,
    paid: invoice.paid,
    created: new Date(invoice.created * 1000).toISOString(),
    invoice_pdf: invoice.invoice_pdf,
    hosted_invoice_url: invoice.hosted_invoice_url,
    last_synced_at: new Date().toISOString()
  }, { onConflict: 'stripe_invoice_id' });

  // Send payment receipt email
  // ... notification service call
}

async function handlePaymentFailed(invoice: any) {
  const { data: customer } = await supabase
    .from('stripe_customers')
    .select('user_id')
    .eq('stripe_customer_id', invoice.customer)
    .single();

  if (!customer) return;

  // Store invoice
  await supabase.from('stripe_invoices').upsert({
    stripe_invoice_id: invoice.id,
    stripe_customer_id: invoice.customer,
    stripe_subscription_id: invoice.subscription,
    user_id: customer.user_id,
    status: 'open',
    // ... other fields
  }, { onConflict: 'stripe_invoice_id' });

  // Send payment failed notification
  // ... notification service call with instructions to update payment method
}
```

### 4.2 Configure Webhook in Stripe

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter webhook URL: `https://your-project.supabase.co/functions/v1/process-stripe-webhook`
4. Select events to listen:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `payment_method.attached`
   - `payment_method.detached`
5. Copy the webhook signing secret and add to `.env`

---

## Phase 5: Subscription Management UI

### 5.1 Account Settings Page

```jsx
// src/pages/AccountSettings.jsx
import { useEffect, useState } from 'react';
import { getActiveSubscription, cancelSubscription, formatCurrency, formatSubscriptionStatus } from '../services/stripeService';
import { useAuth } from '../contexts/AuthContext';

export default function AccountSettings() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscription();
  }, [user]);

  async function loadSubscription() {
    try {
      const sub = await getActiveSubscription(user.id);
      setSubscription(sub);
    } catch (error) {
      console.error('Error loading subscription:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    if (!confirm('Are you sure you want to cancel your subscription? You will retain access until the end of your billing period.')) {
      return;
    }

    try {
      await cancelSubscription(subscription.stripe_subscription_id);
      await loadSubscription();
      alert('Subscription cancelled successfully');
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert('Failed to cancel subscription');
    }
  }

  if (loading) return <div>Loading...</div>;

  if (!subscription) {
    return (
      <div>
        <h2>No Active Subscription</h2>
        <p>You are currently on the free plan.</p>
        <a href="/pricing">View Plans</a>
      </div>
    );
  }

  const status = formatSubscriptionStatus(subscription.status);

  return (
    <div>
      <h2>Subscription</h2>

      <div>
        <span>Status:</span>
        <span style={{ color: status.color }}>{status.label}</span>
      </div>

      <div>
        <span>Current Period:</span>
        <span>
          {new Date(subscription.current_period_start).toLocaleDateString()} -
          {new Date(subscription.current_period_end).toLocaleDateString()}
        </span>
      </div>

      {subscription.cancel_at_period_end && (
        <div>
          <strong>Subscription will cancel on {new Date(subscription.current_period_end).toLocaleDateString()}</strong>
        </div>
      )}

      <div>
        {!subscription.cancel_at_period_end && (
          <button onClick={handleCancel}>Cancel Subscription</button>
        )}
        <a href="/pricing">Change Plan</a>
      </div>
    </div>
  );
}
```

---

## Phase 6: Testing

### 6.1 Test Mode

Use Stripe test mode for development:

**Test Card Numbers:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`

**Expiry:** Any future date
**CVC:** Any 3 digits
**ZIP:** Any 5 digits

### 6.2 Test Scenarios

1. **Successful Subscription**
   - Create checkout session
   - Complete payment with test card
   - Verify subscription created in database
   - Check webhook processed

2. **Failed Payment**
   - Use declining test card
   - Verify failed payment notification sent
   - Check retry schedule

3. **Subscription Cancellation**
   - Cancel active subscription
   - Verify cancel_at_period_end set
   - Confirm access until period end

4. **Webhook Retry**
   - Simulate webhook failure
   - Verify automatic retry

---

## Phase 7: Go Live

### 7.1 Pre-Launch Checklist

- [ ] Switch to live API keys
- [ ] Update webhook endpoint to production URL
- [ ] Test with real (small amount) payment
- [ ] Set up Stripe monitoring alerts
- [ ] Configure backup payment methods
- [ ] Set up customer portal
- [ ] Test subscription cancellation flow
- [ ] Verify invoice emails sent

### 7.2 Monitoring

Monitor these metrics in Stripe Dashboard:

- **MRR (Monthly Recurring Revenue)**
- **Churn Rate**
- **Failed Payments**
- **Subscription Status Distribution**
- **Revenue Per Customer**

### 7.3 Customer Support

Provide customers with:

1. **Billing History** - Link to invoices
2. **Update Payment Method** - Via customer portal
3. **Cancel Subscription** - Self-service or support
4. **Billing Questions** - Support email

---

## Security Best Practices

### ✅ DO:
- Store Stripe keys server-side only
- Verify all webhook signatures
- Use HTTPS for all requests
- Implement idempotency keys for mutations
- Log all payment events
- Use Stripe Checkout (not custom forms)
- Set up fraud detection rules

### ❌ DON'T:
- Expose secret keys in client code
- Store full card numbers
- Process payments without PCI compliance
- Skip webhook signature verification
- Rely solely on client-side checks
- Implement custom payment forms

---

## Common Issues & Solutions

### Issue: Webhook not received
**Solution:**
- Check webhook URL is correct
- Verify endpoint is publicly accessible
- Check Stripe webhook logs
- Ensure signature verification code is correct

### Issue: Duplicate subscriptions
**Solution:**
- Check idempotency in webhook handler
- Verify unique constraints in database
- Use Stripe event IDs for deduplication

### Issue: Payment declined
**Solution:**
- Guide user to update payment method
- Enable automatic retry in Stripe settings
- Send clear failure notifications
- Provide grace period before downgrade

---

**Document Version**: 1.0
**Last Updated**: 2024-12-24
**Status**: Ready for Implementation
**Owner**: Integrations Team

For support, consult:
- Stripe Documentation: https://stripe.com/docs
- Stripe API Reference: https://stripe.com/docs/api
- Supabase Edge Functions: https://supabase.com/docs/guides/functions
