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
    solo: number
    business: number
    professional: number
    enterprise: number
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
      solo: 69,
      business: 129,
      professional: 219,
      enterprise: 499,
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
      solo: 89,
      business: 169,
      professional: 289,
      enterprise: 649,
    },
  },
}

export const defaultCountry: Country = "uk"
