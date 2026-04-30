// Shared rate limiter for Supabase Edge Functions
// Uses in-memory store with automatic cleanup

interface RateLimitEntry {
  count: number;
  resetAt: number;
  windowStart: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Check if a request is rate limited
 * @param identifier - IP address or user ID
 * @param maxRequests - Max requests per window (default: 10)
 * @param windowMs - Time window in ms (default: 60s)
 * @returns Object with allowed status and remaining count
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60_000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const key = `${identifier}:${Math.floor(now / windowMs)}`;
  const entry = store.get(key);

  if (!entry) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt, windowStart: now });
    return { allowed: true, remaining: maxRequests - 1, resetAt };
  }

  if (now > entry.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt, windowStart: now });
    return { allowed: true, remaining: maxRequests - 1, resetAt };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt };
}

/**
 * Get client IP from request headers
 * Falls back to 'unknown' if no IP found
 */
export function getClientIP(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    req.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

/**
 * Create a rate-limited response
 */
export function rateLimitResponse(remaining: number, resetAt: number): Response {
  return new Response(
    JSON.stringify({
      error: 'Rate limit exceeded. Please try again later.',
      retryAfter: Math.ceil((resetAt - Date.now()) / 1000),
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Remaining': String(remaining),
        'X-RateLimit-Reset': String(Math.ceil(resetAt / 1000)),
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
