/*
  # Stripe Product Seeding Migration
  # 
  # This creates the 3 pricing tiers in the database.
  # After running this, you MUST create matching products in Stripe Dashboard
  # and update the stripe_price_id values below.
  #
  # Steps after running this migration:
  # 1. Go to https://dashboard.stripe.com/products
  # 2. Create 3 products with recurring prices:
  #    - Free Trial (£0/month) 
  #    - Improve (£59/month or £53/month annual)
  #    - Priority (£149/month or £134/month annual)
  # 3. Copy the Price IDs (price_xxxxxxxx)
  # 4. Update stripe_prices table with real Price IDs
  # 5. Configure webhook endpoint in Stripe
  */

-- ============================================================================
-- STEP 1: Seed Stripe Products
-- ============================================================================

INSERT INTO stripe_products (stripe_product_id, name, description, active, features, created_at, updated_at)
VALUES 
  (
    'prod_free_trial_placeholder',
    'Free Trial',
    'Full access for 90 days. Zero risk. Zero commitment. Weekly AI visibility score reports, progress tracking, and personalized insights.',
    true,
    ARRAY[
      'Weekly AI visibility score reports',
      'Track your progress over 12 weeks',
      'Personalized improvement insights',
      'Whitelist access to new features (Chloe & Simon)',
      'Full Improve plan access included'
    ],
    NOW(),
    NOW()
  ),
  (
    'prod_improve_placeholder',
    'Improve',
    'Weekly personalised tasks from Rex. Step-by-step action plans you approve before doing. Progress tracking across all 5 pillars. Email support. Monthly progress reports.',
    true,
    ARRAY[
      'Weekly personalised tasks from Rex (your AI employee)',
      'Step-by-step action plans you approve before doing',
      'Progress tracking across all 5 pillars',
      'Email support',
      'Monthly progress reports',
      '30-day money-back guarantee'
    ],
    NOW(),
    NOW()
  ),
  (
    'prod_priority_placeholder',
    'Priority',
    'Everything in Improve, plus priority task review with human oversight, conservative approach for reputation-sensitive businesses, competitor tracking (up to 5), quarterly strategy calls, and priority email support (24-hour response).',
    true,
    ARRAY[
      'Everything in Improve, plus:',
      'Priority task review (human oversight on every recommendation)',
      'Conservative approach - we flag anything that could affect your reputation',
      'Dedicated account manager check-ins',
      'Competitor tracking (up to 5 competitors)',
      'Quarterly strategy calls',
      'Priority email support (24-hour response)',
      '30-day money-back guarantee'
    ],
    NOW(),
    NOW()
  )
ON CONFLICT (stripe_product_id) DO NOTHING;

-- ============================================================================
-- STEP 2: Seed Stripe Prices (Monthly + Annual for paid plans)
-- ============================================================================

-- Free Trial (monthly at £0)
INSERT INTO stripe_prices (stripe_price_id, stripe_product_id, unit_amount, currency, recurring_interval, active, created_at, updated_at)
VALUES 
  (
    'price_free_trial_monthly_placeholder',
    'prod_free_trial_placeholder',
    0,
    'gbp',
    'month',
    true,
    NOW(),
    NOW()
  )
ON CONFLICT (stripe_price_id) DO NOTHING;

-- Improve Monthly (£59)
INSERT INTO stripe_prices (stripe_price_id, stripe_product_id, unit_amount, currency, recurring_interval, active, created_at, updated_at)
VALUES 
  (
    'price_improve_monthly_placeholder',
    'prod_improve_placeholder',
    5900,
    'gbp',
    'month',
    true,
    NOW(),
    NOW()
  )
ON CONFLICT (stripe_price_id) DO NOTHING;

-- Improve Annual (£53/month = £636/year, 10% discount)
INSERT INTO stripe_prices (stripe_price_id, stripe_product_id, unit_amount, currency, recurring_interval, active, created_at, updated_at)
VALUES 
  (
    'price_improve_annual_placeholder',
    'prod_improve_placeholder',
    63600,
    'gbp',
    'year',
    true,
    NOW(),
    NOW()
  )
ON CONFLICT (stripe_price_id) DO NOTHING;

-- Priority Monthly (£149)
INSERT INTO stripe_prices (stripe_price_id, stripe_product_id, unit_amount, currency, recurring_interval, active, created_at, updated_at)
VALUES 
  (
    'price_priority_monthly_placeholder',
    'prod_priority_placeholder',
    14900,
    'gbp',
    'month',
    true,
    NOW(),
    NOW()
  )
ON CONFLICT (stripe_price_id) DO NOTHING;

-- Priority Annual (£134/month = £1,608/year, 10% discount)
INSERT INTO stripe_prices (stripe_price_id, stripe_product_id, unit_amount, currency, recurring_interval, active, created_at, updated_at)
VALUES 
  (
    'price_priority_annual_placeholder',
    'prod_priority_placeholder',
    160800,
    'gbp',
    'year',
    true,
    NOW(),
    NOW()
  )
ON CONFLICT (stripe_price_id) DO NOTHING;

-- ============================================================================
-- STEP 3: Verify insertion
-- ============================================================================

SELECT 
  sp.name AS product,
  sp.stripe_product_id,
  sp.active,
  spr.stripe_price_id,
  spr.unit_amount / 100.0 AS price_gbp,
  spr.recurring_interval,
  spr.active AS price_active
FROM stripe_products sp
LEFT JOIN stripe_prices spr ON sp.stripe_product_id = spr.stripe_product_id
ORDER BY sp.created_at, spr.unit_amount;
