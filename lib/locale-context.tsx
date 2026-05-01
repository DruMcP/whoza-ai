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

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<Country>(defaultCountry)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage first
    const stored = localStorage.getItem(STORAGE_KEY) as Country | null
    if (stored && (stored === "uk" || stored === "us")) {
      setCountryState(stored)
      return
    }

    // Auto-detect from browser timezone/locale
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const locale = navigator.language

    if (timezone.startsWith("America/") || locale.startsWith("en-US")) {
      setCountryState("us")
      localStorage.setItem(STORAGE_KEY, "us")
    } else {
      setCountryState("uk")
      localStorage.setItem(STORAGE_KEY, "uk")
    }
  }, [])

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
