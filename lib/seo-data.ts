// Verified live /for-{trade}-{city} pages (July 2026). Everything else 404s.
export const LIVE_CITY_PAGES: Record<string, string[]> = {
  "plumbers":          ["london","manchester","birmingham","leeds","glasgow","bristol","liverpool","edinburgh"],
  "electricians":      ["london","manchester","birmingham","glasgow","edinburgh"],
  "builders":          ["london","manchester","birmingham","glasgow","edinburgh"],
  "roofers":           ["london","glasgow","edinburgh"],
  "locksmiths":        ["london","manchester","glasgow","edinburgh"],
  "landscapers":       ["london","glasgow","edinburgh"],
  "heating-engineers": ["london","manchester","glasgow","edinburgh"],
  "pest-control":      ["london","glasgow","edinburgh"],
  "cleaners":          ["london","glasgow","edinburgh"],
  "drainage":          ["glasgow","edinburgh"],
  "joiners":           ["glasgow","edinburgh"],
  "plasterers":        ["glasgow","edinburgh"],
  "tilers":            ["glasgow","edinburgh"],
  "carpenters":        ["glasgow","bristol","edinburgh"],
  "handymen":          ["london","glasgow","edinburgh"],
  "gas-engineers":     ["london","glasgow","edinburgh"],
};

export const TRADE_NAMES: Record<string, [string, string]> = {
  "plumbers": ["Plumber", "Plumbers"],
  "electricians": ["Electrician", "Electricians"],
  "builders": ["Builder", "Builders"],
  "roofers": ["Roofer", "Roofers"],
  "locksmiths": ["Locksmith", "Locksmiths"],
  "landscapers": ["Landscaper", "Landscapers"],
  "heating-engineers": ["Heating Engineer", "Heating Engineers"],
  "pest-control": ["Pest Control Technician", "Pest Control Services"],
  "cleaners": ["Cleaner", "Cleaners"],
  "drainage": ["Drainage Specialist", "Drainage Specialists"],
  "joiners": ["Joiner", "Joiners"],
  "plasterers": ["Plasterer", "Plasterers"],
  "tilers": ["Tiler", "Tilers"],
  "carpenters": ["Carpenter", "Carpenters"],
  "handymen": ["Handyman", "Handymen"],
  "gas-engineers": ["Gas Engineer", "Gas Engineers"],
};

export const CITY_REGION: Record<string, string> = {
  london: "Greater London",
  manchester: "Greater Manchester",
  birmingham: "West Midlands",
  leeds: "West Yorkshire",
  glasgow: "Greater Glasgow",
  bristol: "City of Bristol",
  liverpool: "Merseyside",
  edinburgh: "City of Edinburgh",
};

export const TRADE_SLUGS = Object.keys(LIVE_CITY_PAGES);

export function getLiveCityPages(): { trade: string; city: string; url: string }[] {
  const pages: { trade: string; city: string; url: string }[] = [];
  for (const [trade, cities] of Object.entries(LIVE_CITY_PAGES)) {
    for (const city of cities) {
      pages.push({ trade, city, url: `https://whoza.ai/for-${trade}-${city}` });
    }
  }
  return pages;
}

export function getCitiesForTrade(trade: string): string[] {
  return LIVE_CITY_PAGES[trade] || [];
}

export function isLiveCityPage(trade: string, city: string): boolean {
  return (LIVE_CITY_PAGES[trade] || []).includes(city);
}
