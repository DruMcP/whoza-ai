import { supabase, supabaseUrl, supabaseAnonKey } from '../lib/supabase';

/**
 * Stripe Integration Service
 * Handles Stripe-specific operations: subscriptions, customers, invoices
 */

/**
 * Get Stripe customer for current user
 * @param {string} userId - User ID
 * @returns {Promise<Object|null>} Stripe customer or null
 */
export async function getStripeCustomer(userId) {
  try {
    const { data, error } = await supabase
      .from('stripe_customers')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Get available Stripe products and prices
 * @returns {Promise<Array>} List of products with prices
 */
export async function getStripeProducts() {
  try {
    const { data, error } = await supabase
      .from('stripe_products')
      .select(`
        *,
        prices:stripe_prices(*)
      `)
      .eq('active', true)
      .order('name');

    if (error) throw error;
    return data || [];
  } catch (error) {
    throw error;
  }
}

/**
 * Create checkout session for subscription
 * @param {string} userId - User ID
 * @param {string} priceId - Stripe price ID
 * @param {string} successUrl - Success redirect URL
 * @param {string} cancelUrl - Cancel redirect URL
 * @returns {Promise<Object>} Checkout session with URL
 */
export async function createCheckoutSession(userId, priceId, successUrl, cancelUrl) {
  try {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/create-checkout-session`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          price_id: priceId,
          success_url: successUrl,
          cancel_url: cancelUrl
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create checkout session');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Get user's active subscription
 * @param {string} userId - User ID
 * @returns {Promise<Object|null>} Active subscription or null
 */
export async function getActiveSubscription(userId) {
  try {
    const { data, error } = await supabase
      .from('stripe_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .in('status', ['active', 'trialing'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Get all user subscriptions (including cancelled)
 * @param {string} userId - User ID
 * @returns {Promise<Array>} List of subscriptions
 */
export async function getAllSubscriptions(userId) {
  try {
    const { data, error } = await supabase
      .from('stripe_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    throw error;
  }
}

/**
 * Cancel subscription at period end
 * @param {string} subscriptionId - Stripe subscription ID
 * @returns {Promise<Object>} Updated subscription
 */
export async function cancelSubscription(subscriptionId) {
  try {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/manage-subscription`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription_id: subscriptionId,
          action: 'cancel'
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to cancel subscription');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Resume cancelled subscription
 * @param {string} subscriptionId - Stripe subscription ID
 * @returns {Promise<Object>} Updated subscription
 */
export async function resumeSubscription(subscriptionId) {
  try {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/manage-subscription`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription_id: subscriptionId,
          action: 'resume'
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to resume subscription');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Update subscription (upgrade/downgrade)
 * @param {string} subscriptionId - Stripe subscription ID
 * @param {string} newPriceId - New price ID
 * @returns {Promise<Object>} Updated subscription
 */
export async function updateSubscription(subscriptionId, newPriceId) {
  try {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/manage-subscription`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription_id: subscriptionId,
          action: 'update',
          new_price_id: newPriceId
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update subscription');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Get user's invoices
 * @param {string} userId - User ID
 * @param {number} limit - Number of invoices to fetch
 * @returns {Promise<Array>} List of invoices
 */
export async function getInvoices(userId, limit = 20) {
  try {
    const { data, error } = await supabase
      .from('stripe_invoices')
      .select('*')
      .eq('user_id', userId)
      .order('created', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    throw error;
  }
}

/**
 * Get user's payment methods
 * @param {string} userId - User ID
 * @returns {Promise<Array>} List of payment methods
 */
export async function getPaymentMethods(userId) {
  try {
    const { data, error } = await supabase
      .from('stripe_payment_methods')
      .select('*')
      .eq('user_id', userId)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    throw error;
  }
}

/**
 * Check if user has active subscription
 * @param {string} userId - User ID
 * @returns {Promise<boolean>} True if user has active subscription
 */
export async function hasActiveSubscription(userId) {
  try {
    const subscription = await getActiveSubscription(userId);
    return subscription !== null;
  } catch (error) {
    return false;
  }
}

/**
 * Get subscription features for user
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Feature flags
 */
export async function getSubscriptionFeatures(userId) {
  try {
    const subscription = await getActiveSubscription(userId);

    if (!subscription) {
      return {
        tier: 'free',
        features: {
          max_tasks_per_month: 10,
          email_campaigns: false,
          analytics: false,
          priority_support: false,
          custom_branding: false
        }
      };
    }

    // Get product features from subscription items
    const items = subscription.items;
    if (!items || items.length === 0) {
      return { tier: 'free', features: {} };
    }

    // In a real implementation, you would fetch the product details
    // and map features based on the price/product
    // For now, return example features
    return {
      tier: 'pro',
      features: {
        max_tasks_per_month: -1, // unlimited
        email_campaigns: true,
        analytics: true,
        priority_support: true,
        custom_branding: true
      }
    };
  } catch (error) {
    return { tier: 'free', features: {} };
  }
}

/**
 * Format currency amount from cents
 * @param {number} cents - Amount in cents
 * @param {string} currency - Currency code (default: 'gbp')
 * @returns {string} Formatted amount
 */
export function formatCurrency(cents, currency = 'gbp') {
  const amount = cents / 100;
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(amount);
}

/**
 * Format subscription status for display
 * @param {string} status - Stripe subscription status
 * @returns {Object} Display status with color and label
 */
export function formatSubscriptionStatus(status) {
  const statusMap = {
    'active': { label: 'Active', color: 'green' },
    'trialing': { label: 'Trial', color: 'blue' },
    'past_due': { label: 'Past Due', color: 'orange' },
    'canceled': { label: 'Cancelled', color: 'red' },
    'unpaid': { label: 'Unpaid', color: 'red' },
    'incomplete': { label: 'Incomplete', color: 'gray' },
    'incomplete_expired': { label: 'Expired', color: 'gray' },
    'paused': { label: 'Paused', color: 'gray' }
  };

  return statusMap[status] || { label: status, color: 'gray' };
}

export default {
  getStripeCustomer,
  getStripeProducts,
  createCheckoutSession,
  getActiveSubscription,
  getAllSubscriptions,
  cancelSubscription,
  resumeSubscription,
  updateSubscription,
  getInvoices,
  getPaymentMethods,
  hasActiveSubscription,
  getSubscriptionFeatures,
  formatCurrency,
  formatSubscriptionStatus
};
