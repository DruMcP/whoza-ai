import { NextRequest, NextResponse } from "next/server"
import { createHash, timingSafeEqual } from "crypto"

/**
 * Guards for API routes.
 *
 * This site has no user sessions, so routes that read customer data, bill, or
 * provision telephony are server-to-server only and must present
 * INTERNAL_API_KEY. Public routes (forms, checkout) are rate limited instead.
 */

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest()
}

/**
 * Require the shared internal key, sent as `x-internal-api-key` or
 * `Authorization: Bearer <key>`. Fails closed: if INTERNAL_API_KEY is not set,
 * every request is refused rather than let through.
 *
 * Returns a response to send back, or null when the caller is authorised.
 */
export function requireInternalKey(req: NextRequest): NextResponse | null {
  const expected = process.env.INTERNAL_API_KEY
  if (!expected) {
    console.error("[api-guard] INTERNAL_API_KEY is not set, refusing request to", req.nextUrl.pathname)
    return NextResponse.json({ error: "Endpoint not configured" }, { status: 503 })
  }

  const bearer = req.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1]
  const provided = req.headers.get("x-internal-api-key") || bearer
  if (!provided || !timingSafeEqual(digest(provided), digest(expected))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return null
}

export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-nf-client-connection-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  )
}

/**
 * Accept a caller-supplied redirect URL only when it points back at this site
 * (the origin the request came in on, or NEXT_PUBLIC_SITE_URL). Anything else
 * falls back, so a checkout session can never hand a customer to another site.
 */
export function sameOriginUrl(req: Request, candidate: unknown, fallback: string): string {
  if (typeof candidate !== "string") return fallback
  try {
    const allowed = new Set([new URL(req.url).origin])
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      allowed.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).origin)
    }
    return allowed.has(new URL(candidate).origin) ? candidate : fallback
  } catch {
    return fallback
  }
}

const buckets = new Map<string, { count: number; resetAt: number }>()
const MAX_BUCKETS = 5000

/**
 * Fixed-window rate limit per client IP. State is in memory, so on serverless
 * it is per warm instance: it blunts bursts and naive abuse, it is not a hard
 * global cap. Put a platform-level limit in front for that.
 *
 * Returns a 429 response to send back, or null when the request may proceed.
 */
export function rateLimit(
  req: Request,
  name: string,
  limit: number,
  windowMs: number
): NextResponse | null {
  const now = Date.now()
  const key = `${name}:${getClientIp(req)}`

  if (buckets.size > MAX_BUCKETS) {
    for (const [k, b] of buckets) {
      if (b.resetAt <= now) buckets.delete(k)
    }
  }

  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return null
  }

  bucket.count += 1
  if (bucket.count > limit) {
    const retryAfter = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    )
  }

  return null
}
