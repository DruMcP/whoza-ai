import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { NextRequest } from "next/server"
import { requireInternalKey, rateLimit, sameOriginUrl } from "../lib/api-guard"

const req = (headers: Record<string, string> = {}, url = "https://whoza.ai/api/enquiries") =>
  new NextRequest(url, { headers })

describe("requireInternalKey", () => {
  const original = process.env.INTERNAL_API_KEY
  afterEach(() => {
    if (original === undefined) delete process.env.INTERNAL_API_KEY
    else process.env.INTERNAL_API_KEY = original
  })

  it("fails closed when INTERNAL_API_KEY is not configured", () => {
    delete process.env.INTERNAL_API_KEY
    expect(requireInternalKey(req())?.status).toBe(503)
    // even a caller who guesses an empty key must not get through
    expect(requireInternalKey(req({ "x-internal-api-key": "" }))?.status).toBe(503)
  })

  it("rejects a missing or wrong key", () => {
    process.env.INTERNAL_API_KEY = "secret"
    expect(requireInternalKey(req())?.status).toBe(401)
    expect(requireInternalKey(req({ "x-internal-api-key": "wrong" }))?.status).toBe(401)
    expect(requireInternalKey(req({ "x-internal-api-key": "secre" }))?.status).toBe(401)
    expect(requireInternalKey(req({ authorization: "Bearer wrong" }))?.status).toBe(401)
  })

  it("accepts the key via header or bearer token", () => {
    process.env.INTERNAL_API_KEY = "secret"
    expect(requireInternalKey(req({ "x-internal-api-key": "secret" }))).toBeNull()
    expect(requireInternalKey(req({ authorization: "Bearer secret" }))).toBeNull()
  })
})

describe("rateLimit", () => {
  it("allows up to the limit, then returns 429 with Retry-After", () => {
    const r = req({ "x-nf-client-connection-ip": "203.0.113.1" })
    for (let i = 0; i < 3; i++) expect(rateLimit(r, "t-limit", 3, 60_000)).toBeNull()
    const blocked = rateLimit(r, "t-limit", 3, 60_000)
    expect(blocked?.status).toBe(429)
    expect(Number(blocked?.headers.get("Retry-After"))).toBeGreaterThan(0)
  })

  it("tracks clients and routes separately", () => {
    const a = req({ "x-nf-client-connection-ip": "203.0.113.2" })
    const b = req({ "x-nf-client-connection-ip": "203.0.113.3" })
    expect(rateLimit(a, "t-separate", 1, 60_000)).toBeNull()
    expect(rateLimit(a, "t-separate", 1, 60_000)?.status).toBe(429)
    expect(rateLimit(b, "t-separate", 1, 60_000)).toBeNull()
    expect(rateLimit(a, "t-other-route", 1, 60_000)).toBeNull()
  })

  it("resets once the window has passed", async () => {
    const r = req({ "x-nf-client-connection-ip": "203.0.113.4" })
    expect(rateLimit(r, "t-window", 1, 20)).toBeNull()
    expect(rateLimit(r, "t-window", 1, 20)?.status).toBe(429)
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(rateLimit(r, "t-window", 1, 20)).toBeNull()
  })
})

describe("sameOriginUrl", () => {
  const original = process.env.NEXT_PUBLIC_SITE_URL
  const fallback = "https://whoza.ai/dashboard?success=true"
  const r = req({}, "https://whoza.ai/api/stripe/checkout")

  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://whoza.ai"
  })
  afterEach(() => {
    if (original === undefined) delete process.env.NEXT_PUBLIC_SITE_URL
    else process.env.NEXT_PUBLIC_SITE_URL = original
  })

  it("keeps a URL on this site", () => {
    const ok = "https://whoza.ai/pricing?canceled=true"
    expect(sameOriginUrl(r, ok, fallback)).toBe(ok)
  })

  it("replaces a URL pointing anywhere else", () => {
    expect(sameOriginUrl(r, "https://evil.example/thanks", fallback)).toBe(fallback)
    expect(sameOriginUrl(r, "https://whoza.ai.evil.example/", fallback)).toBe(fallback)
    expect(sameOriginUrl(r, "https://whoza.ai@evil.example/", fallback)).toBe(fallback)
    expect(sameOriginUrl(r, "http://whoza.ai/downgrade", fallback)).toBe(fallback)
    expect(sameOriginUrl(r, "javascript:alert(1)", fallback)).toBe(fallback)
  })

  it("falls back on missing or malformed input", () => {
    expect(sameOriginUrl(r, undefined, fallback)).toBe(fallback)
    expect(sameOriginUrl(r, 42, fallback)).toBe(fallback)
    expect(sameOriginUrl(r, "not a url", fallback)).toBe(fallback)
  })
})
