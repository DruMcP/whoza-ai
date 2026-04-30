import { supabase } from '../lib/supabase';

/**
 * Trial waitlist service
 * Handles checking trial availability, joining waitlist, and checking status
 * Uses supabase.functions.invoke() — works with proper JWT-format anon key
 */

export async function checkTrialAvailability() {
  try {
    const { data, error } = await supabase.functions.invoke('check-trial-availability', {
      method: 'GET',
    });
    
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Failed to check trial availability:', err);
    // Fail open - assume available if we can't check
    return { available: true, slots_remaining: 25, slots_total: 25 };
  }
}

export async function joinWaitlist({
  email,
  business_name,
  trade_type,
  phone,
  website_url,
  postcode,
}) {
  try {
    const { data, error } = await supabase.functions.invoke('join-waitlist', {
      body: {
        email,
        business_name,
        trade_type,
        phone,
        website_url,
        postcode,
      },
    });
    
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Failed to join waitlist:', err);
    throw err;
  }
}

export async function getWaitlistStatus(email) {
  try {
    const { data, error } = await supabase.functions.invoke('get-waitlist-status', {
      body: { email },
    });
    
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Failed to get waitlist status:', err);
    return { on_waitlist: false };
  }
}

export async function claimTrialSlot(email) {
  try {
    const { data, error } = await supabase.rpc('claim_trial_slot', {
      p_email: email,
    });
    
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Failed to claim trial slot:', err);
    return { available: false, message: 'Unable to claim slot. Please try again.' };
  }
}
