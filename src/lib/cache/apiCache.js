import { supabase } from '../supabase';

const TTL_DURATIONS = {
  perplexity: 24 * 60 * 60 * 1000,
  google_places: 7 * 24 * 60 * 60 * 1000,
  openai: 60 * 60 * 1000,
};

async function generateCacheKey(provider, endpoint, params) {
  const sortedParams = JSON.stringify(params, Object.keys(params).sort());
  const input = `${provider}:${endpoint}:${sortedParams}`;

  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

export const apiCache = {
  async get(provider, endpoint, params = {}) {
    try {
      const cacheKey = await generateCacheKey(provider, endpoint, params);

      const { data, error } = await supabase
        .from('api_cache')
        .select('*')
        .eq('cache_key', cacheKey)
        .maybeSingle();

      if (error) {
        // TODO: Review error handling: console.error('Cache lookup error:', error)
        return null;
      }

      if (!data) {
        return null;
      }

      const now = new Date();
      const expiresAt = new Date(data.expires_at);

      if (expiresAt < now) {
        await this.delete(cacheKey);
        return null;
      }

      await supabase
        .from('api_cache')
        .update({ hit_count: data.hit_count + 1 })
        .eq('cache_key', cacheKey);

      return data.response_data;
    } catch (error) {
      // TODO: Review error handling: console.error('Cache get error:', error)
      return null;
    }
  },

  async set(provider, endpoint, params, responseData, statusCode, customTTL = null) {
    try {
      const cacheKey = await generateCacheKey(provider, endpoint, params);
      const ttl = customTTL || TTL_DURATIONS[provider] || 60 * 60 * 1000;
      const expiresAt = new Date(Date.now() + ttl);

      const { error } = await supabase
        .from('api_cache')
        .upsert({
          cache_key: cacheKey,
          provider,
          endpoint,
          request_params: params,
          response_data: responseData,
          status_code: statusCode,
          expires_at: expiresAt.toISOString(),
          hit_count: 0,
        }, {
          onConflict: 'cache_key',
        });

      if (error) {
        // TODO: Review error handling: console.error('Cache set error:', error)
        return false;
      }

      return true;
    } catch (error) {
      // TODO: Review error handling: console.error('Cache set error:', error)
      return false;
    }
  },

  async delete(cacheKey) {
    try {
      const { error } = await supabase
        .from('api_cache')
        .delete()
        .eq('cache_key', cacheKey);

      if (error) {
        // TODO: Review error handling: console.error('Cache delete error:', error)
        return false;
      }

      return true;
    } catch (error) {
      // TODO: Review error handling: console.error('Cache delete error:', error)
      return false;
    }
  },

  async invalidate(provider, endpoint = null) {
    try {
      let query = supabase
        .from('api_cache')
        .delete()
        .eq('provider', provider);

      if (endpoint) {
        query = query.eq('endpoint', endpoint);
      }

      const { error } = await query;

      if (error) {
        // TODO: Review error handling: console.error('Cache invalidate error:', error)
        return false;
      }

      return true;
    } catch (error) {
      // TODO: Review error handling: console.error('Cache invalidate error:', error)
      return false;
    }
  },

  async cleanupExpired() {
    try {
      const { data, error } = await supabase
        .rpc('cleanup_expired_cache');

      if (error) {
        // TODO: Review error handling: console.error('Cache cleanup error:', error)
        return 0;
      }

      return data || 0;
    } catch (error) {
      // TODO: Review error handling: console.error('Cache cleanup error:', error)
      return 0;
    }
  },
};
