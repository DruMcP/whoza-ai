import { NextRequest, NextResponse } from "next/server"
import { verify } from "retell-sdk"

/**
 * Retell signs every webhook and custom-function request with the account API
 * key (header `x-retell-signature`, HMAC over the raw body plus a timestamp).
 * Read the body once, verify it, and only then parse it. Without this check
 * anyone could POST fake call results or trigger bookings and quotes.
 *
 * Returns the parsed body, or a response to send back when the check fails.
 */
export async function readVerifiedRetellBody<T>(req: NextRequest): Promise<{ body: T } | { reject: NextResponse }> {
  const apiKey = process.env.RETELL_API_KEY
  if (!apiKey) {
    console.error("[retell-webhook] RETELL_API_KEY is not set, refusing", req.nextUrl.pathname)
    return { reject: NextResponse.json({ error: "Endpoint not configured" }, { status: 503 }) }
  }

  const signature = req.headers.get("x-retell-signature")
  const raw = await req.text()
  const valid = signature ? await verify(raw, apiKey, signature).catch(() => false) : false
  if (!valid) {
    return { reject: NextResponse.json({ error: "Invalid signature" }, { status: 401 }) }
  }

  try {
    return { body: JSON.parse(raw) as T }
  } catch {
    return { reject: NextResponse.json({ error: "Invalid JSON" }, { status: 400 }) }
  }
}
