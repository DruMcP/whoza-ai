// whoza.ai Stripe Product & Price Configuration
// Match these to your Stripe Dashboard products/prices

export const STRIPE_PRODUCTS = {
  starter: {
    name: "Starter",
    description: "AI call handling for UK tradespeople — Capture + deliver jobs",
    monthlyPrice: 5900, // £59.00 in pence
    perJobPrice: 450,    // £4.50 in pence
    includedMinutes: 100,
    jobsIncluded: 0,
  },
  growth: {
    name: "Growth",
    description: "Full revenue system — 15 jobs included",
    monthlyPrice: 12500, // £125.00 in pence
    perJobPrice: 325,    // £3.25 in pence
    includedMinutes: 300,
    jobsIncluded: 15,
  },
  pro: {
    name: "Pro",
    description: "High-volume + AI growth — 40 jobs included",
    monthlyPrice: 23000, // £230.00 in pence
    perJobPrice: 275,    // £2.75 in pence
    includedMinutes: 700,
    jobsIncluded: 40,
  },
  scale: {
    name: "Scale",
    description: "Multi-location businesses — 100 jobs included",
    monthlyPrice: 39900, // £399.00 in pence
    perJobPrice: 225,    // £2.25 in pence
    includedMinutes: 1500,
    jobsIncluded: 100,
  },
}

export const STRIPE_ADDONS = {
  minutesBundle: {
    name: "100 Minute Bundle",
    description: "Extra call handling minutes at discounted rate",
    price: 2000, // £20.00 in pence
  },
  consultancy: {
    name: "Done-for-you AI & Automation Support",
    description: "Extra help setting up your AI assistant",
    pricePerHour: 20000, // £200.00 per hour in pence
  },
}

// Overage pricing (not a product, just a rate)
export const OVERAGE_RATE_PER_MINUTE = 26 // £0.26 in pence

// Currency
export const CURRENCY = "gbp"
