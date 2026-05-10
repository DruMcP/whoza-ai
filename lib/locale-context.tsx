"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Country, LocaleConfig, localeConfigs, defaultCountry } from "./locale-config"

interface LocaleContextType {
  country: Country
  config: LocaleConfig
  setCountry: (country: Country) => void
  formatPrice: (amount: number) => string
}

const LocaleContext = createContext<LocaleContextType | null>(null)

const STORAGE_KEY = "whoza-country"

interface LocaleProviderProps {
  children: ReactNode
  forcedCountry?: Country
}

export function LocaleProvider({ children, forcedCountry }: LocaleProviderProps) {
  const [country, setCountryState] = useState<Country>(forcedCountry || defaultCountry)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // If forcedCountry is provided, always use it (location pages)
    if (forcedCountry) {
      setCountryState(forcedCountry)
      localStorage.setItem(STORAGE_KEY, forcedCountry)
      return
    }

    // Default to UK for all visitors. Only switch to US if user explicitly toggled.
    const stored = localStorage.getItem(STORAGE_KEY) as Country | null
    if (stored && (stored === "uk" || stored === "us")) {
      setCountryState(stored)
    } else {
      // First-time visitor: always UK
      setCountryState("uk")
      localStorage.setItem(STORAGE_KEY, "uk")
    }
  }, [forcedCountry])

  const setCountry = (newCountry: Country) => {
    setCountryState(newCountry)
    localStorage.setItem(STORAGE_KEY, newCountry)
  }

  const config = localeConfigs[country]

  const formatPrice = (amount: number) => {
    return `${config.currencySymbol}${amount}`
  }

  // Prevent hydration mismatch by returning default during SSR
  if (!mounted) {
    return (
      <LocaleContext.Provider
        value={{
          country: defaultCountry,
          config: localeConfigs[defaultCountry],
          setCountry: () => {},
          formatPrice: (amount) => `£${amount}`,
        }}
      >
        {children}
      </LocaleContext.Provider>
    )
  }

  return (
    <LocaleContext.Provider value={{ country, config, setCountry, formatPrice }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}
