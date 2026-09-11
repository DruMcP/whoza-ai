/**
 * One email check for every form on the site.
 *
 * Six forms — the exit-intent modal, both calculators, both referral forms and the quote
 * generator — each did their own thing, and most did nothing beyond `includes("@")` or the
 * browser's `type="email"`. Neither rejects `xyz@gmail`: browsers do not require a dot after
 * the @, so an address with no domain extension sailed through and the form reported success.
 *
 * The pattern is the one the waitlist form already used, lifted here so there is a single
 * definition to correct if it ever needs to change.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value: string): boolean {
  return EMAIL.test((value || "").trim())
}

/**
 * The message to show under the field, or "" when the address is fine.
 *
 * Deliberately says what is wrong rather than "invalid email": a tradesperson who typed
 * `xyz@gmail` needs to know the ending is missing, not that they have failed a test.
 */
export function emailError(value: string): string {
  const email = (value || "").trim()
  if (!email) return "Enter your email address"
  if (!email.includes("@")) return "Enter a full email address, including the @"
  if (!EMAIL.test(email)) return "That email needs a domain ending, like .com or .co.uk"
  return ""
}
