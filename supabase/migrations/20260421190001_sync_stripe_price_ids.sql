/*
  # Stripe Product Sync Script
  # 
  # Run this AFTER creating products in Stripe Dashboard to sync real IDs.
  # 
  # HOW TO USE:
  # 1. Create products in Stripe Dashboard (https://dashboard.stripe.com/products)
  # 2. Copy the real Price IDs (price_xxxxxxxxxxxxxx)
  # 3. Update the variables below
  # 4. Run this script via Supabase SQL Editor
  #
  # IMPORTANT: Replace ALL placeholder IDs with real Stripe IDs before running.
  */

-- ============================================================================
-- CONFIGURATION: Replace with your REAL Stripe Price IDs
-- ============================================================================

-- Get these from Stripe Dashboard → Products → [Your Product] → Pricing
-- They look like: price_1Pxxxxxxxxxxxxxxxxxxxxx

DO $$
DECLARE
  v_price_free_trial       text := 'price_xxxxxxxxxxxxxxx';  -- Free trial price ID
  v_price_improve_monthly  text := 'price_xxxxxxxxxxxxxxx';  -- Improve monthly
  v_price_improve_annual   text := 'price_xxxxxxxxxxxxxxx';  -- Improve annual
  v_price_priority_monthly text := 'price_xxxxxxxxxxxxxxx';  -- Priority monthly
  v_price_priority_annual  text := 'price_xxxxxxxxxxxxxxx';  -- Priority annual
BEGIN
  -- Only run if at least one real ID is provided
  IF v_price_free_trial = 'price_xxxxxxxxxxxxxxx' THEN
    RAISE NOTICE 'WARNING: Using placeholder IDs. Replace with real Stripe Price IDs before running.';
    RETURN;
  END IF;

  -- Update Free Trial price
  UPDATE stripe_prices 
  SET stripe_price_id = v_price_free_trial,
      updated_at = NOW()
  WHERE stripe_price_id = 'price_free_trial';

  -- Update Improve monthly
  UPDATE stripe_prices 
  SET stripe_price_id = v_price_improve_monthly,
      updated_at = NOW()
  WHERE stripe_price_id = 'price_improve_monthly';

  -- Update Improve annual
  UPDATE stripe_prices 
  SET stripe_price_id = v_price_improve_annual,
      updated_at = NOW()
  WHERE stripe_price_id = 'price_improve_annual';

  -- Update Priority monthly
  UPDATE stripe_prices 
  SET stripe_price_id = v_price_priority_monthly,
      updated_at = NOW()
  WHERE stripe_price_id = 'price_priority_monthly';

  -- Update Priority annual
  UPDATE stripe_prices 
  SET stripe_price_id = v_price_priority_annual,
      updated_at = NOW()
  WHERE stripe_price_id = 'price_priority_annual';

  RAISE NOTICE 'Stripe Price IDs updated successfully!';
END $$;

-- ============================================================================
-- VERIFICATION: Check all prices have real IDs
-- ============================================================================

SELECT 
  sp.name AS product,
  spr.stripe_price_id,
  CASE 
    WHEN spr.stripe_price_id LIKE 'price_%' AND LENGTH(spr.stripe_price_id) > 20 
    THEN '✅ Real Stripe ID'
    ELSE '❌ Still placeholder - update needed'
  END AS status,
  spr.unit_amount / 100.0 AS price_gbp,
  spr.recurring_interval
FROM stripe_products sp
JOIN stripe_prices spr ON sp.stripe_product_id = spr.stripe_product_id
ORDER BY spr.unit_amount;
