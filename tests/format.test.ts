import { describe, it, expect } from "vitest"
import { formatGBPCompact } from "../lib/format"

describe("formatGBPCompact", () => {
  it("formats sub-1000 values", () => {
    expect(formatGBPCompact(523)).toBe("£523")
    expect(formatGBPCompact(0)).toBe("£0")
    expect(formatGBPCompact(-100)).toBe("£0")
  })

  it("formats thousands with k suffix", () => {
    expect(formatGBPCompact(523_000)).toBe("£523k")
    expect(formatGBPCompact(798_000)).toBe("£798k")
  })

  it("formats millions with M suffix", () => {
    expect(formatGBPCompact(1_054_000)).toBe("£1.05M")
    expect(formatGBPCompact(2_788_000)).toBe("£2.79M")
    expect(formatGBPCompact(12_500_000)).toBe("£13M")
    expect(formatGBPCompact(999_600)).toBe("£1M")
  })

  it("accepts custom currency symbol", () => {
    expect(formatGBPCompact(1_054_000, "$")).toBe("$1.05M")
    expect(formatGBPCompact(523_000, "$")).toBe("$523k")
  })

  it("handles non-finite values", () => {
    expect(formatGBPCompact(NaN)).toBe("£0")
    expect(formatGBPCompact(Infinity)).toBe("£0")
  })
})
