export type Country = "uk" | "us"

export interface LocaleConfig {
  country: Country
  currency: string
  currencySymbol: string
  language: {
    trades: string
    tradesPeople: string
    tradesperson: string
  }
  examples: {
    trades: string[]
    cities: string[]
  }
  pricing: {
    starter: number
    growth: number
    pro: number
    scale: number
    business: number
  }
}

export const localeConfigs: Record<Country, LocaleConfig> = {
  uk: {
    country: "uk",
    currency: "GBP",
    currencySymbol: "£",
    language: {
      trades: "trades",
      tradesPeople: "tradespeople",
      tradesperson: "tradesperson",
    },
    examples: {
      trades: ["plumbers", "electricians", "builders", "roofers", "painters", "landscapers"],
      cities: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Bristol"],
    },
    pricing: {
      starter: 59,
      growth: 125,
      pro: 230,
      scale: 399,
      business: 59,
    },
  },
  us: {
    country: "us",
    currency: "USD",
    currencySymbol: "$",
    language: {
      trades: "contractors",
      tradesPeople: "contractors",
      tradesperson: "contractor",
    },
    examples: {
      trades: ["HVAC", "roofing", "plumbing", "electrical", "remodeling", "landscaping"],
      cities: ["New York", "Dallas", "Chicago", "Los Angeles", "Houston", "Phoenix"],
    },
    pricing: {
      starter: 59,
      growth: 125,
      pro: 230,
      scale: 399,
      business: 59,
    },
  },
}

export const defaultCountry: Country = "uk"
