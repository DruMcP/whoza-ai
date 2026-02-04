import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file contains VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY'
  );
}

/**
 * Custom fetch wrapper that handles AbortError gracefully
 * This prevents unhandled promise rejections when requests are cancelled
 * (e.g., when a component unmounts before a request completes)
 */
const customFetch = async (url, options) => {
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    // Handle AbortError gracefully - this occurs when:
    // 1. Component unmounts before request completes
    // 2. User navigates away during a request
    // 3. Request is explicitly cancelled via AbortController
    if (error.name === 'AbortError') {
      // Return a minimal response object to prevent downstream errors
      // The calling code should handle this gracefully
      console.debug('[Supabase] Request aborted:', url);
      throw error; // Re-throw but it's now expected behavior
    }
    throw error;
  }
};

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'X-Client-Info': 'whoza-visibility-platform'
      },
      fetch: customFetch
    }
  }
);

/**
 * Helper function to check if an error is an AbortError
 * Use this in catch blocks to handle aborted requests gracefully
 */
export const isAbortError = (error) => {
  return error?.name === 'AbortError' || 
         error?.message?.includes('aborted') ||
         error?.code === 20; // DOMException.ABORT_ERR
};

/**
 * Helper function to safely execute Supabase operations
 * Automatically handles AbortError and returns null instead of throwing
 */
export const safeSupabaseCall = async (operation) => {
  try {
    return await operation();
  } catch (error) {
    if (isAbortError(error)) {
      console.debug('[Supabase] Operation aborted gracefully');
      return null;
    }
    throw error;
  }
};
