import { supabase, supabaseUrl, supabaseAnonKey } from '../lib/supabase';

/**
 * Integration Management Service
 * Handles connection, disconnection, and management of third-party integrations
 */

/**
 * Get list of available integration providers
 * @param {string} category - Optional category filter
 * @returns {Promise<Array>} List of integration providers
 */
export async function getAvailableIntegrations(category = null) {
  try {
    let query = supabase
      .from('integration_providers')
      .select('*')
      .in('status', ['active', 'beta'])
      .order('display_name');

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    // TODO: Review error handling: console.error('Error fetching available integrations:', error)
    throw error;
  }
}

/**
 * Get user's connected integrations
 * @param {string} userId - User ID
 * @returns {Promise<Array>} List of user's integrations
 */
export async function getUserIntegrations(userId) {
  try {
    const { data, error } = await supabase
      .from('user_integrations')
      .select(`
        *,
        provider:integration_providers(*)
      `)
      .eq('user_id', userId)
      .order('connected_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    // TODO: Review error handling: console.error('Error fetching user integrations:', error)
    throw error;
  }
}

/**
 * Get specific integration for user
 * @param {string} userId - User ID
 * @param {string} providerName - Provider name (e.g., 'stripe', 'google_business_profile')
 * @returns {Promise<Object|null>} Integration object or null
 */
export async function getUserIntegration(userId, providerName) {
  try {
    const { data, error} = await supabase
      .from('user_integrations')
      .select(`
        *,
        provider:integration_providers(*)
      `)
      .eq('user_id', userId)
      .eq('provider.name', providerName)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    // TODO: Review error handling: console.error(`Error fetching ${providerName} integration:`, error)
    throw error;
  }
}

/**
 * Disconnect an integration
 * @param {string} integrationId - Integration ID to disconnect
 * @returns {Promise<void>}
 */
export async function disconnectIntegration(integrationId) {
  try {
    const { error } = await supabase
      .from('user_integrations')
      .update({
        status: 'disconnected',
        disconnected_at: new Date().toISOString()
      })
      .eq('id', integrationId);

    if (error) throw error;

    // Delete associated credentials
    const { error: credError } = await supabase
      .from('integration_credentials')
      .delete()
      .eq('user_integration_id', integrationId);

    if (credError) throw credError;
  } catch (error) {
    // TODO: Review error handling: console.error('Error disconnecting integration:', error)
    throw error;
  }
}

/**
 * Update integration settings
 * @param {string} integrationId - Integration ID
 * @param {Object} settings - Settings object
 * @returns {Promise<Object>} Updated integration
 */
export async function updateIntegrationSettings(integrationId, settings) {
  try {
    const { data, error } = await supabase
      .from('user_integrations')
      .update({ settings })
      .eq('id', integrationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    // TODO: Review error handling: console.error('Error updating integration settings:', error)
    throw error;
  }
}

/**
 * Trigger manual sync for an integration
 * @param {string} integrationId - Integration ID
 * @returns {Promise<void>}
 */
export async function triggerManualSync(integrationId) {
  try {
    // This will call the appropriate edge function based on integration type
    const { data: integration } = await supabase
      .from('user_integrations')
      .select('provider:integration_providers(name)')
      .eq('id', integrationId)
      .single();

    if (!integration) {
      throw new Error('Integration not found');
    }

    // Call the sync edge function
    const syncFunction = getSyncFunctionName(integration.provider.name);

    const response = await fetch(
      `${supabaseUrl}/functions/v1/${syncFunction}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ integration_id: integrationId })
      }
    );

    if (!response.ok) {
      throw new Error('Sync failed');
    }

    return await response.json();
  } catch (error) {
    // TODO: Review error handling: console.error('Error triggering manual sync:', error)
    throw error;
  }
}

/**
 * Get sync history for an integration
 * @param {string} integrationId - Integration ID
 * @param {number} limit - Number of records to fetch
 * @returns {Promise<Array>} Sync log entries
 */
export async function getIntegrationSyncHistory(integrationId, limit = 20) {
  try {
    const { data, error } = await supabase
      .from('integration_sync_log')
      .select('*')
      .eq('user_integration_id', integrationId)
      .order('started_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    // TODO: Review error handling: console.error('Error fetching sync history:', error)
    throw error;
  }
}

/**
 * Get webhook events for an integration
 * @param {string} integrationId - Integration ID
 * @param {number} limit - Number of records to fetch
 * @returns {Promise<Array>} Webhook events
 */
export async function getIntegrationWebhooks(integrationId, limit = 50) {
  try {
    const { data, error } = await supabase
      .from('integration_webhooks')
      .select('*')
      .eq('user_integration_id', integrationId)
      .order('received_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    // TODO: Review error handling: console.error('Error fetching webhook events:', error)
    throw error;
  }
}

/**
 * Get integration health status
 * @param {string} integrationId - Integration ID
 * @returns {Promise<Object>} Health status
 */
export async function getIntegrationHealth(integrationId) {
  try {
    const { data: integration, error } = await supabase
      .from('user_integrations')
      .select('health_status, last_health_check_at, last_synced_at, token_expires_at')
      .eq('id', integrationId)
      .single();

    if (error) throw error;

    // Calculate health metrics
    const now = new Date();
    const lastSync = integration.last_synced_at ? new Date(integration.last_synced_at) : null;
    const tokenExpiry = integration.token_expires_at ? new Date(integration.token_expires_at) : null;

    const health = {
      status: integration.health_status,
      last_check: integration.last_health_check_at,
      last_sync: integration.last_synced_at,
      issues: []
    };

    // Check for issues
    if (tokenExpiry && tokenExpiry < now) {
      health.issues.push({ type: 'token_expired', message: 'Authentication token has expired' });
    } else if (tokenExpiry && (tokenExpiry - now) / (1000 * 60 * 60 * 24) < 7) {
      health.issues.push({ type: 'token_expiring', message: 'Authentication token expiring soon' });
    }

    if (lastSync && (now - lastSync) / (1000 * 60 * 60) > 48) {
      health.issues.push({ type: 'sync_stale', message: 'Data has not synced in over 48 hours' });
    }

    return health;
  } catch (error) {
    // TODO: Review error handling: console.error('Error checking integration health:', error)
    throw error;
  }
}

/**
 * Helper function to get sync function name for provider
 * @param {string} providerName - Provider name
 * @returns {string} Edge function name
 */
function getSyncFunctionName(providerName) {
  const syncFunctions = {
    'stripe': 'sync-stripe-data',
    'google_business_profile': 'sync-google-profile',
    'facebook_business': 'sync-facebook-data',
    'instagram_business': 'sync-instagram-data',
    'linkedin_company': 'sync-linkedin-data',
    'twitter_business': 'sync-twitter-data',
    'hubspot': 'sync-hubspot-data',
    'mailchimp': 'sync-mailchimp-data',
    'google_analytics': 'sync-google-analytics',
    'trustpilot': 'sync-trustpilot-data'
  };

  return syncFunctions[providerName] || 'sync-integration-data';
}

export default {
  getAvailableIntegrations,
  getUserIntegrations,
  getUserIntegration,
  disconnectIntegration,
  updateIntegrationSettings,
  triggerManualSync,
  getIntegrationSyncHistory,
  getIntegrationWebhooks,
  getIntegrationHealth
};
