/**
 * Lazy-loaded Supabase client
 * Only loads the Supabase SDK when actually needed (auth pages, API calls)
 * Saves ~163 KB on homepage and other public pages
 */

let supabaseInstance = null;
let supabasePromise = null;

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file contains VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY'
  );
}

/**
 * Lazy load Supabase client
 * Returns a Promise that resolves to the Supabase client instance
 */
export async function getSupabase() {
  // Return existing instance if already loaded
  if (supabaseInstance) {
    return supabaseInstance;
  }

  // Return existing promise if loading in progress
  if (supabasePromise) {
    return supabasePromise;
  }

  // Start loading Supabase
  supabasePromise = import('@supabase/supabase-js').then(({ createClient }) => {
    supabaseInstance = createClient(
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
          }
        }
      }
    );
    return supabaseInstance;
  });

  return supabasePromise;
}

/**
 * Synchronous access to Supabase (for backwards compatibility)
 * Throws error if Supabase hasn't been loaded yet
 * Use getSupabase() instead for new code
 */
export function getSupabaseSync() {
  if (!supabaseInstance) {
    throw new Error(
      'Supabase client not loaded yet. Use await getSupabase() instead of direct import.'
    );
  }
  return supabaseInstance;
}

/**
 * Preload Supabase for pages that will need it soon
 * Call this on route change to auth pages for instant access
 */
export function preloadSupabase() {
  if (!supabaseInstance && !supabasePromise) {
    getSupabase().catch(err => {
      console.error('Failed to preload Supabase:', err);
    });
  }
}

// For backwards compatibility, export a lazy proxy
// This allows existing code to work without changes
export const supabase = new Proxy({}, {
  get(target, prop) {
    if (!supabaseInstance) {
      throw new Error(
        `Supabase client not loaded yet. Use await getSupabase() before accessing supabase.${String(prop)}`
      );
    }
    return supabaseInstance[prop];
  }
});
