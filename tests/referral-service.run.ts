/**
 * Standalone test runner for referral service logic
 * Run: npx ts-node tests/referral-service.run.ts
 */

import {
  checkRollingCap,
  shouldApplyCredit,
  evaluateCredit,
  getRollingWindow,
} from "../lib/referral-service"

let passed = 0
let failed = 0

function test(name: string, fn: () => void) {
  try {
    fn()
    console.log(`✅ ${name}`)
    passed++
  } catch (e) {
    console.log(`❌ ${name}: ${e}`)
    failed++
  }
}

function expect(actual: any) {
  return {
    toBe(expected: any) {
      if (actual !== expected) {
        throw new Error(`Expected ${expected}, got ${actual}`)
      }
    },
    toContain(substring: string) {
      if (!String(actual).includes(substring)) {
        throw new Error(`Expected "${actual}" to contain "${substring}"`)
      }
    },
  }
}

console.log("=== Referral Programme Business Logic Tests ===\n")

// ─── Scenario (i): Credit fires on 2nd payment ───
console.log("--- Credit trigger on payment number ---")

test("should NOT credit on 1st payment (trial completed)", () => {
  const result = shouldApplyCredit(1, true)
  expect(result.shouldCredit).toBe(false)
  expect(result.reason).toContain("requires 2nd payment")
})

test("should NOT credit if trial not completed", () => {
  const result = shouldApplyCredit(2, false)
  expect(result.shouldCredit).toBe(false)
  expect(result.reason).toContain("Trial not completed")
})

test("SHOULD credit on 2nd payment after trial completion", () => {
  const result = shouldApplyCredit(2, true)
  expect(result.shouldCredit).toBe(true)
  expect(result.reason).toContain("2nd consecutive payment")
})

test("should NOT credit on 3rd+ payment (already credited at 2nd)", () => {
  const result = shouldApplyCredit(3, true)
  expect(result.shouldCredit).toBe(false)
  expect(result.reason).toContain("already applied")
})

// ─── Scenario (ii): No credit on early cancellation ───
console.log("\n--- Early cancellation protection ---")

test("should NOT credit if customer cancels after 1st payment", () => {
  const result = evaluateCredit(1, true, 0, 12, 99)
  expect(result.creditApplied).toBe(false)
  expect(result.reason).toContain("requires 2nd payment")
})

test("should NOT credit if customer cancels during trial", () => {
  const result = evaluateCredit(0, false, 0, 12, 99)
  expect(result.creditApplied).toBe(false)
  expect(result.reason).toContain("Trial not completed")
})

// ─── Scenario (iii): 13th referral in window does not generate credit ───
console.log("\n--- 12-month rolling cap ---")

test("should credit when under cap (11 credits, 12th referral)", () => {
  const result = evaluateCredit(2, true, 11, 12, 99)
  expect(result.creditApplied).toBe(true)
  expect(result.monthsCredited).toBe(1)
})

test("should NOT credit when cap reached (12 credits, 13th referral)", () => {
  const result = evaluateCredit(2, true, 12, 12, 99)
  expect(result.creditApplied).toBe(false)
  expect(result.reason).toContain("Cap reached")
})

test("should NOT credit when over cap (13+ credits)", () => {
  const result = evaluateCredit(2, true, 15, 12, 99)
  expect(result.creditApplied).toBe(false)
  expect(result.reason).toContain("Cap reached")
})

// ─── Rolling window ───
console.log("\n--- Rolling window calculation ---")

test("should return 12-month window", () => {
  const now = new Date("2026-07-26T00:00:00Z")
  const window = getRollingWindow(now)
  expect(window.end.toISOString()).toBe("2026-07-26T00:00:00.000Z")
  expect(window.start.toISOString()).toBe("2025-07-26T00:00:00.000Z")
})

// ─── Complete state machine walkthrough ───
console.log("\n--- Complete state machine walkthrough ---")

test("walkthrough: trial → 1st payment → 2nd payment → credit", () => {
  const step2 = evaluateCredit(0, false, 0, 12, 99)
  expect(step2.creditApplied).toBe(false)

  const step3 = evaluateCredit(1, true, 0, 12, 99)
  expect(step3.creditApplied).toBe(false)

  const step4 = evaluateCredit(2, true, 0, 12, 99)
  expect(step4.creditApplied).toBe(true)
  expect(step4.monthsCredited).toBe(1)

  const step5 = evaluateCredit(3, true, 1, 12, 99)
  expect(step5.creditApplied).toBe(false)
})

console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`)
process.exit(failed > 0 ? 1 : 0)
