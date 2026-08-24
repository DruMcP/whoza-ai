/**
 * Format a monetary value in compact notation.
 * £523000 → "£523k", £1054000 → "£1.05M", £2788000 → "£2.79M"
 */
export function formatGBPCompact(value: number, currency: string = "£"): string {
  if (!Number.isFinite(value) || value <= 0) return `${currency}0`
  if (value >= 1_000_000 || value >= 999_500) {
    const m = value / 1_000_000
    return `${currency}${m >= 10 ? Math.round(m) : m.toFixed(2).replace(/\.?0+$/, "")}M`
  }
  if (value >= 1_000) {
    return `${currency}${Math.round(value / 1_000)}k`
  }
  return `${currency}${Math.round(value)}`
}
