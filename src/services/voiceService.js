/**
 * Voice Service - Trillet Integration Abstraction
 * whoza.ai AI Voice Agent backend integration
 * 
 * This service handles all Trillet API interactions:
 * - Sub-account management (one per client)
 * - Phone number provisioning (UK numbers)
 * - Call flow configuration
 * - Knowledge base management
 * - Webhook handling
 * - Call analytics retrieval
 */

import { supabase } from '../lib/supabase';

// Trillet API configuration
const TRILLET_API_BASE = 'https://api.trillet.ai/v1';
// NOTE: Store TRILLET_API_KEY in Netlify env vars (server-side only)
// Client-side code should NEVER contain the Trillet API key
const getTrilletKey = () => {
  // In production, this is set in Netlify edge functions or Supabase secrets
  // For client-side preview/demos, we use a read-only approach
  return import.meta.env.VITE_TRILLET_PUBLIC_KEY || '';
};

/**
 * Voice Configuration Types
 * @typedef {Object} VoiceConfig
 * @property {string} business_name - Business name used in AI greeting
 * @property {string} trade_type - plumber, electrician, builder, etc.
 * @property {string[]} services - List of services offered
 * @property {string[]} postcodes - Postcodes covered
 * @property {Object} pricing - Service pricing structure
 * @property {string} calendar_type - google, outlook, servicem8
 * @property {string} calendar_id - Calendar integration ID
 * @property {string[]} emergency_keywords - Words triggering live transfer
 * @property {string} voice_profile - trillet_ai, elevenlabs, custom
 * @property {string} voice_gender - male, female
 * @property {string} language - en-GB
 * @property {boolean} sms_summary - Send SMS after each call
 * @property {boolean} whatsapp_summary - Send WhatsApp after each call
 * @property {string} forward_number - Number for emergency transfers
 */

/**
 * Create a new voice configuration for a client
 * This is called during onboarding after trial signup
 */
export async function createVoiceConfig(userId, config) {
  try {
    // 1. Store config in Supabase
    const { data: voiceConfig, error: dbError } = await supabase
      .from('voice_configs')
      .insert({
        user_id: userId,
        business_name: config.business_name,
        trade_type: config.trade_type,
        services: config.services || [],
        postcodes: config.postcodes || [],
        pricing: config.pricing || {},
        calendar_type: config.calendar_type || 'google',
        calendar_id: config.calendar_id || null,
        emergency_keywords: config.emergency_keywords || ['emergency', 'urgent', 'burst', 'flood', 'gas leak', 'no heat', 'no hot water'],
        voice_profile: config.voice_profile || 'trillet_ai',
        voice_gender: config.voice_gender || 'female',
        language: config.language || 'en-GB',
        sms_summary: config.sms_summary !== false,
        whatsapp_summary: config.whatsapp_summary !== false,
        forward_number: config.forward_number || null,
        status: 'pending_setup',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (dbError) throw dbError;

    // 2. Trigger Trillet sub-account creation via edge function
    // This happens server-side to protect API keys
    const { data: trilletAccount, error: trilletError } = await supabase.functions.invoke('trillet-create-subaccount', {
      body: {
        user_id: userId,
        voice_config_id: voiceConfig.id,
        business_name: config.business_name,
        trade_type: config.trade_type
      }
    });

    if (trilletError) throw trilletError;

    // 3. Update config with Trillet sub-account ID
    await supabase
      .from('voice_configs')
      .update({
        trillet_subaccount_id: trilletAccount.subaccount_id,
        trillet_number: trilletAccount.phone_number,
        status: 'awaiting_divert',
        updated_at: new Date().toISOString()
      })
      .eq('id', voiceConfig.id);

    return {
      success: true,
      voiceConfig: {
        ...voiceConfig,
        trillet_subaccount_id: trilletAccount.subaccount_id,
        trillet_number: trilletAccount.phone_number
      },
      divert_code: `**21*${trilletAccount.phone_number}#`
    };

  } catch (error) {
    console.error('Voice config creation failed:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get voice configuration for a user
 */
export async function getVoiceConfig(userId) {
  try {
    const { data, error } = await supabase
      .from('voice_configs')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return { success: true, config: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Update voice configuration
 */
export async function updateVoiceConfig(userId, updates) {
  try {
    const { data, error } = await supabase
      .from('voice_configs')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    // Sync changes to Trillet via edge function
    await supabase.functions.invoke('trillet-update-config', {
      body: {
        user_id: userId,
        updates
      }
    });

    return { success: true, config: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Activate call divert
 * Called when user confirms they've set up divert on their phone
 */
export async function activateDivert(userId) {
  try {
    const { data, error } = await supabase
      .from('voice_configs')
      .update({
        divert_active: true,
        status: 'active',
        divert_activated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, config: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Deactivate call divert
 */
export async function deactivateDivert(userId) {
  try {
    const { data, error } = await supabase
      .from('voice_configs')
      .update({
        divert_active: false,
        status: 'paused',
        divert_deactivated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, config: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get call analytics for a user
 */
export async function getCallAnalytics(userId, days = 30) {
  try {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const { data, error } = await supabase
      .from('call_logs')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', fromDate.toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Calculate summary metrics
    const analytics = {
      total_calls: data.length,
      answered: data.filter(c => c.status === 'answered').length,
      missed: data.filter(c => c.status === 'missed').length,
      booked: data.filter(c => c.outcome === 'booking_confirmed').length,
      emergency: data.filter(c => c.is_emergency).length,
      spam_blocked: data.filter(c => c.status === 'spam_blocked').length,
      avg_duration: data.length > 0 
        ? Math.round(data.reduce((sum, c) => sum + (c.duration || 0), 0) / data.length)
        : 0,
      calls_by_day: {},
      peak_hours: {}
    };

    // Aggregate by day
    data.forEach(call => {
      const day = call.created_at.split('T')[0];
      analytics.calls_by_day[day] = (analytics.calls_by_day[day] || 0) + 1;
    });

    // Aggregate by hour
    data.forEach(call => {
      const hour = new Date(call.created_at).getHours();
      analytics.peak_hours[hour] = (analytics.peak_hours[hour] || 0) + 1;
    });

    return { success: true, analytics, calls: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get real-time call status (for dashboard)
 */
export async function getRealtimeStatus(userId) {
  try {
    const { data, error } = await supabase
      .from('voice_configs')
      .select('status, divert_active, trillet_number, last_call_at')
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    // Get today's call count
    const today = new Date().toISOString().split('T')[0];
    const { count, error: countError } = await supabase
      .from('call_logs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', today);

    return {
      success: true,
      status: {
        ...data,
        calls_today: count || 0,
        is_online: data.status === 'active' && data.divert_active
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Simulate a test call (for onboarding verification)
 * This triggers a test call to the user's whoza.ai number
 */
export async function triggerTestCall(userId) {
  try {
    const { data, error } = await supabase.functions.invoke('trillet-test-call', {
      body: { user_id: userId }
    });

    if (error) throw error;
    return { success: true, testCall: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get minute usage for current billing period
 */
export async function getMinuteUsage(userId) {
  try {
    // Get current subscription period
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('plan_id, current_period_start, current_period_end')
      .eq('user_id', userId)
      .single();

    if (subError) throw subError;

    // Get call minutes in period
    const { data: calls, error: callError } = await supabase
      .from('call_logs')
      .select('duration')
      .eq('user_id', userId)
      .gte('created_at', subscription.current_period_start)
      .lte('created_at', subscription.current_period_end);

    if (callError) throw callError;

    const usedMinutes = Math.ceil(
      calls.reduce((sum, c) => sum + (c.duration || 0), 0) / 60
    );

    // Plan limits
    const planLimits = {
      solo: 300,
      business: 600,
      professional: 1200,
      enterprise: 3000
    };

    const limit = planLimits[subscription.plan_id] || 300;

    return {
      success: true,
      usage: {
        used: usedMinutes,
        limit,
        remaining: Math.max(0, limit - usedMinutes),
        percentage: Math.round((usedMinutes / limit) * 100),
        period_start: subscription.current_period_start,
        period_end: subscription.current_period_end
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Submit a review after job completion
 * Triggered by Retention Keeper or user action
 */
export async function submitReviewRequest(userId, customerPhone, jobReference) {
  try {
    const { data, error } = await supabase.functions.invoke('send-review-request', {
      body: {
        user_id: userId,
        customer_phone: customerPhone,
        job_reference: jobReference
      }
    });

    if (error) throw error;
    return { success: true, result: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export default {
  createVoiceConfig,
  getVoiceConfig,
  updateVoiceConfig,
  activateDivert,
  deactivateDivert,
  getCallAnalytics,
  getRealtimeStatus,
  triggerTestCall,
  getMinuteUsage,
  submitReviewRequest
};
