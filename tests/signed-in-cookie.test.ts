import { describe, expect, it } from "vitest"
import { hasSignedInCookie } from "../hooks/use-signed-in"

// The header shows "Dashboard" instead of "Log in" when app.whoza.ai has left its signed-in flag.
describe("reading the signed-in flag", () => {
  it("finds it among other cookies", () => {
    expect(hasSignedInCookie("_ga=GA1.1.1; whoza_signed_in=1; theme=dark")).toBe(true)
    expect(hasSignedInCookie("whoza_signed_in=1")).toBe(true)
  })

  it("is not fooled by an empty value, a lookalike name or a lookalike value", () => {
    expect(hasSignedInCookie("")).toBe(false)
    expect(hasSignedInCookie("whoza_signed_in=")).toBe(false)
    expect(hasSignedInCookie("not_whoza_signed_in=1")).toBe(false)
    expect(hasSignedInCookie("whoza_signed_in=10")).toBe(false)
  })
})
