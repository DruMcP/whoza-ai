/**
 * Referral Programme Business Logic
 * Enforces: 12-month cap, credit-on-2nd-payment trigger, rolling window
 */

export interface ReferralCreditResult {
  success: boolean
  creditApplied: boolean
  monthsCredited: number
  reason: string
  remainingCap: number
}

export interface ReferralWindow {
  referrerId: string
  windowStart: Date  // 12 months ago from now
  windowEnd: Date    // now
  creditsInWindow: number
  cap: number
}

const MONTHS_CAP = 12
const ROLLING_MONTHS = 12

/**
 * Check if a referrer has cap room in the rolling 12-month window
 */
export function checkRollingCap(
  creditsInWindow: number,
  cap: number = MONTHS_CAP
): { hasCap: boolean; remaining: number } {
  const remaining = Math.max(0, cap - creditsInWindow)
  return { hasCap: remaining > 0, remaining }
}

/**
 * Determine if credit should be applied based on payment history
 * Credit only fires on the referee's SECOND successful payment
 * (after completing the 7-day trial)
 */
export function shouldApplyCredit(
  paymentNumber: number,
  trialCompleted: boolean
): { shouldCredit: boolean; reason: string } {
  if (!trialCompleted) {
    return { shouldCredit: false, reason: "Trial not completed" }
  }
  if (paymentNumber < 2) {
    return { shouldCredit: false, reason: `Payment ${paymentNumber} — credit requires 2nd payment` }
  }
  if (paymentNumber === 2) {
    return { shouldCredit: true, reason: "2nd consecutive payment — credit eligible" }
  }
  // Payment 3+ — credit already applied at payment 2
  return { shouldCredit: false, reason: "Credit already applied at 2nd payment" }
}

/**
 * Calculate credit value: one month of referrer's current plan
 */
export function calculateCreditValue(referrerPlanValue: number): number {
  return referrerPlanValue // One month of referrer's plan
}

/**
 * Full credit evaluation — the authoritative business logic
 */
export function evaluateCredit(
  paymentNumber: number,
  trialCompleted: boolean,
  creditsInRollingWindow: number,
  cap: number = MONTHS_CAP,
  referrerPlanValue: number = 0
): ReferralCreditResult {
  // 1. Check trial completion
  const triggerCheck = shouldApplyCredit(paymentNumber, trialCompleted)
  if (!triggerCheck.shouldCredit) {
    return {
      success: true,
      creditApplied: false,
      monthsCredited: 0,
      reason: triggerCheck.reason,
      remainingCap: cap - creditsInRollingWindow,
    }
  }

  // 2. Check rolling cap
  const capCheck = checkRollingCap(creditsInRollingWindow, cap)
  if (!capCheck.hasCap) {
    return {
      success: true,
      creditApplied: false,
      monthsCredited: 0,
      reason: `Cap reached: ${creditsInRollingWindow}/${cap} free months in rolling ${ROLLING_MONTHS}-month window`,
      remainingCap: 0,
    }
  }

  // 3. Apply credit
  return {
    success: true,
    creditApplied: true,
    monthsCredited: 1,
    reason: `Credit applied: 1 free month (plan value: £${referrerPlanValue})`,
    remainingCap: capCheck.remaining - 1,
  }
}

/**
 * Get the rolling window date range (12 months back from now)
 */
export function getRollingWindow(now: Date = new Date()): { start: Date; end: Date } {
  const end = now
  const start = new Date(now)
  start.setMonth(start.getMonth() - ROLLING_MONTHS)
  return { start, end }
}
