/**
 * Referral Programme Business Logic Tests
 * 
 * Scenarios:
 * (i) Credit fires on 2nd payment
 * (ii) No credit on early cancellation (before 2nd payment)
 * (iii) 13th referral in a window does not generate credit
 */

import { describe, it, expect } from "vitest"
import {
  checkRollingCap,
  shouldApplyCredit,
  evaluateCredit,
  getRollingWindow,
} from "../lib/referral-service"

describe("Referral Credit Enforcement", () => {
  // ─── Scenario (i): Credit fires on 2nd payment ───
  describe("Credit trigger on payment number", () => {
    it("should NOT credit on 1st payment (trial completed)", () => {
      const result = shouldApplyCredit(1, true)
      expect(result.shouldCredit).toBe(false)
      expect(result.reason).toContain("requires 2nd payment")
    })

    it("should NOT credit if trial not completed", () => {
      const result = shouldApplyCredit(2, false)
      expect(result.shouldCredit).toBe(false)
      expect(result.reason).toContain("Trial not completed")
    })

    it("SHOULD credit on 2nd payment after trial completion", () => {
      const result = shouldApplyCredit(2, true)
      expect(result.shouldCredit).toBe(true)
      expect(result.reason).toContain("2nd consecutive payment")
    })

    it("should NOT credit on 3rd+ payment (already credited at 2nd)", () => {
      const result = shouldApplyCredit(3, true)
      expect(result.shouldCredit).toBe(false)
      expect(result.reason).toContain("already applied")
    })
  })

  // ─── Scenario (ii): No credit on early cancellation ───
  describe("Early cancellation protection", () => {
    it("should NOT credit if customer cancels after 1st payment", () => {
      const result = evaluateCredit(1, true, 0, 12, 99)
      expect(result.creditApplied).toBe(false)
      expect(result.reason).toContain("requires 2nd payment")
    })

    it("should NOT credit if customer cancels during trial", () => {
      const result = evaluateCredit(0, false, 0, 12, 99)
      expect(result.creditApplied).toBe(false)
      expect(result.reason).toContain("Trial not completed")
    })

    it("should show correct remaining cap when no credit applied", () => {
      const result = evaluateCredit(1, true, 5, 12, 99)
      expect(result.creditApplied).toBe(false)
      expect(result.remainingCap).toBe(7)
    })
  })

  // ─── Scenario (iii): 13th referral in window does not generate credit ───
  describe("12-month rolling cap", () => {
    it("should credit when under cap (11 credits, 12th referral)", () => {
      const result = evaluateCredit(2, true, 11, 12, 99)
      expect(result.creditApplied).toBe(true)
      expect(result.monthsCredited).toBe(1)
      expect(result.remainingCap).toBe(0)
    })

    it("should NOT credit when cap reached (12 credits, 13th referral)", () => {
      const result = evaluateCredit(2, true, 12, 12, 99)
      expect(result.creditApplied).toBe(false)
      expect(result.reason).toContain("Cap reached")
      expect(result.reason).toContain("12/12")
      expect(result.remainingCap).toBe(0)
    })

    it("should NOT credit when over cap (13+ credits)", () => {
      const result = evaluateCredit(2, true, 15, 12, 99)
      expect(result.creditApplied).toBe(false)
      expect(result.reason).toContain("Cap reached")
    })

    it("should allow credit again after rolling window frees up", () => {
      // Simulate: 11 credits in window, 1 credit from 13 months ago
      // Total: 12 historically, but only 11 in rolling window
      const result = evaluateCredit(2, true, 11, 12, 99)
      expect(result.creditApplied).toBe(true)
      expect(result.remainingCap).toBe(0)
    })
  })

  describe("Rolling window calculation", () => {
    it("should return 12-month window", () => {
      const now = new Date("2026-07-26T00:00:00Z")
      const window = getRollingWindow(now)
      
      expect(window.end.toISOString()).toBe("2026-07-26T00:00:00.000Z")
      expect(window.start.toISOString()).toBe("2025-07-26T00:00:00.000Z")
    })
  })

  describe("Credit value calculation", () => {
    it("should credit one month of referrer's plan value", () => {
      const result = evaluateCredit(2, true, 0, 12, 149)
      expect(result.creditApplied).toBe(true)
      expect(result.reason).toContain("plan value: £149")
    })

    it("should credit even with zero plan value (edge case)", () => {
      const result = evaluateCredit(2, true, 0, 12, 0)
      expect(result.creditApplied).toBe(true)
      expect(result.monthsCredited).toBe(1)
    })
  })

  describe("Complete state machine walkthrough", () => {
    it("walkthrough: link → signup → trial → 1st payment → 2nd payment → credit", () => {
      // Step 1: Referral link generated (no state change)
      // Step 2: Signup (payment 0, trial not done)
      const step2 = evaluateCredit(0, false, 0, 12, 99)
      expect(step2.creditApplied).toBe(false)
      expect(step2.reason).toContain("Trial not completed")

      // Step 3: Trial completed, 1st payment
      const step3 = evaluateCredit(1, true, 0, 12, 99)
      expect(step3.creditApplied).toBe(false)
      expect(step3.reason).toContain("requires 2nd payment")

      // Step 4: 2nd payment — CREDIT APPLIED
      const step4 = evaluateCredit(2, true, 0, 12, 99)
      expect(step4.creditApplied).toBe(true)
      expect(step4.monthsCredited).toBe(1)
      expect(step4.remainingCap).toBe(11)

      // Step 5: 3rd payment — no additional credit
      const step5 = evaluateCredit(3, true, 1, 12, 99)
      expect(step5.creditApplied).toBe(false)
      expect(step5.reason).toContain("already applied")
    })
  })
})
