import { Country } from "./locale-config"

export interface LocationData {
  slug: string
  city: string
  country: Country
  region?: string
  trades?: string[]
}

export const locations: LocationData[] = [
  // UK Cities
  { slug: "london", city: "London", country: "uk", region: "England", trades: ["plumbers", "electricians", "builders"] },
  { slug: "manchester", city: "Manchester", country: "uk", region: "England", trades: ["plumbers", "electricians", "roofers"] },
  { slug: "birmingham", city: "Birmingham", country: "uk", region: "England", trades: ["plumbers", "builders", "painters"] },
  { slug: "leeds", city: "Leeds", country: "uk", region: "England", trades: ["electricians", "roofers", "landscapers"] },
  { slug: "glasgow", city: "Glasgow", country: "uk", region: "Scotland", trades: ["plumbers", "builders", "electricians"] },
  { slug: "bristol", city: "Bristol", country: "uk", region: "England", trades: ["plumbers", "electricians", "builders"] },
  { slug: "liverpool", city: "Liverpool", country: "uk", region: "England", trades: ["roofers", "plumbers", "electricians"] },
  { slug: "edinburgh", city: "Edinburgh", country: "uk", region: "Scotland", trades: ["builders", "plumbers", "electricians"] },
  
  // US Cities
  { slug: "new-york", city: "New York", country: "us", region: "NY", trades: ["HVAC", "plumbing", "electrical"] },
  { slug: "los-angeles", city: "Los Angeles", country: "us", region: "CA", trades: ["HVAC", "roofing", "landscaping"] },
  { slug: "chicago", city: "Chicago", country: "us", region: "IL", trades: ["plumbing", "HVAC", "electrical"] },
  { slug: "dallas", city: "Dallas", country: "us", region: "TX", trades: ["HVAC", "roofing", "plumbing"] },
  { slug: "houston", city: "Houston", country: "us", region: "TX", trades: ["HVAC", "plumbing", "electrical"] },
  { slug: "phoenix", city: "Phoenix", country: "us", region: "AZ", trades: ["HVAC", "roofing", "landscaping"] },
  { slug: "miami", city: "Miami", country: "us", region: "FL", trades: ["HVAC", "roofing", "electrical"] },
  { slug: "atlanta", city: "Atlanta", country: "us", region: "GA", trades: ["HVAC", "plumbing", "electrical"] },
]

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find((loc) => loc.slug === slug)
}

export function getLocationsByCountry(country: Country): LocationData[] {
  return locations.filter((loc) => loc.country === country)
}
