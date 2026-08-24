// Single source of truth for trade×city internal linking.
// Regenerate with `npm run gen:trade-cities` — never hand-edit.
export const TRADE_CITY_PAGES: Record<string, string[]> = {
  "for-builders":           ["birmingham", "edinburgh", "glasgow", "london", "manchester"],
  "for-electricians":       ["birmingham", "edinburgh", "glasgow", "london", "manchester"],
  "for-gas-engineers":      ["edinburgh", "glasgow", "london"],
  "for-heating-engineers":  ["edinburgh", "glasgow", "london", "manchester"],
  "for-plumbers":           ["birmingham", "edinburgh", "glasgow", "london", "manchester"],
  "for-roofers":            ["edinburgh", "glasgow", "london"],
}
