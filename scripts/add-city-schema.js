const fs = require('fs');
const path = require('path');

const appDir = '/root/.openclaw/workspace/whoza-ai-v0/app';

// Trade singular/plural names and city regions
const TRADE_NAMES = {
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

const CITY_REGION = {
  london: "Greater London",
  manchester: "Greater Manchester",
  birmingham: "West Midlands",
  leeds: "West Yorkshire",
  glasgow: "Greater Glasgow",
  bristol: "City of Bristol",
  liverpool: "Merseyside",
  edinburgh: "City of Edinburgh",
};

// LIVE_CITY_PAGES map
const LIVE_CITY_PAGES = {
  plumbers: ["london", "manchester", "birmingham", "leeds", "glasgow", "bristol", "liverpool", "edinburgh"],
  electricians: ["london", "manchester", "birmingham", "glasgow", "edinburgh"],
  builders: ["london", "manchester", "birmingham", "glasgow", "edinburgh"],
  roofers: ["london", "glasgow", "edinburgh"],
  locksmiths: ["london", "manchester", "glasgow", "edinburgh"],
  landscapers: ["london", "glasgow", "edinburgh"],
  "heating-engineers": ["london", "manchester", "glasgow", "edinburgh"],
  "pest-control": ["london", "glasgow", "edinburgh"],
  cleaners: ["london", "glasgow", "edinburgh"],
  drainage: ["glasgow", "edinburgh"],
  joiners: ["glasgow", "edinburgh"],
  plasterers: ["glasgow", "edinburgh"],
  tilers: ["glasgow", "edinburgh"],
  carpenters: ["glasgow", "bristol", "edinburgh"],
  handymen: ["london", "glasgow", "edinburgh"],
  "gas-engineers": ["london", "glasgow", "edinburgh"],
};

let fixed = 0;
for (const [tradeSlug, cities] of Object.entries(LIVE_CITY_PAGES)) {
  for (const city of cities) {
    const dirName = `for-${tradeSlug}-${city}`;
    const pagePath = path.join(appDir, dirName, 'page.tsx');
    if (!fs.existsSync(pagePath)) {
      console.log(`Missing: ${dirName}`);
      continue;
    }

    let content = fs.readFileSync(pagePath, 'utf8');
    const original = content;

    // Add import if not present
    if (!content.includes('import CityTradeSchema')) {
      const importMatch = content.match(/import .* from ["'].*["'];?\n/);
      if (importMatch) {
        const importStr = importMatch[0];
        const importIdx = content.indexOf(importStr) + importStr.length;
        content = content.slice(0, importIdx) + `import CityTradeSchema from "@/components/CityTradeSchema";\n` + content.slice(importIdx);
      }
    }

    // Check if CityTradeSchema is already used
    if (content.includes('<CityTradeSchema')) {
      console.log(`  Already has CityTradeSchema: ${dirName}`);
      continue;
    }

    const [tradeSingular, tradePlural] = TRADE_NAMES[tradeSlug] || [tradeSlug, tradeSlug];
    const region = CITY_REGION[city] || "";
    const pageUrl = `https://whoza.ai/${dirName}`;

    const componentProps = `trade="${tradeSingular}" tradePlural="${tradePlural}" city="${city.charAt(0).toUpperCase() + city.slice(1)}"${region ? ` region="${region}"` : ''} pageUrl="${pageUrl}"`;
    const componentLine = `      <CityTradeSchema ${componentProps} />`;

    // Find the main tag or a good insertion point
    const mainIdx = content.indexOf('<main');
    if (mainIdx !== -1) {
      // Insert after the opening <main> tag
      const mainCloseIdx = content.indexOf('>', mainIdx) + 1;
      content = content.slice(0, mainCloseIdx) + '\n' + componentLine + content.slice(mainCloseIdx);
    } else {
      // Insert after the first script tag or at the beginning of the return
      const returnIdx = content.indexOf('return (');
      if (returnIdx !== -1) {
        const insertIdx = content.indexOf('(', returnIdx) + 1;
        content = content.slice(0, insertIdx) + '\n' + componentLine + content.slice(insertIdx);
      }
    }

    if (content !== original) {
      fs.writeFileSync(pagePath, content);
      fixed++;
      console.log(`  Fixed: ${dirName}`);
    }
  }
}

console.log(`\nFixed ${fixed} city pages`);
