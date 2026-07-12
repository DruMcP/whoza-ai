const fs = require('fs');
const path = require('path');

const appDir = '/root/.openclaw/workspace/whoza-ai-v0/app';

// All 17 trade slugs
const trades = [
  'builders', 'carpenters', 'cleaners', 'drainage', 'electricians',
  'gas-engineers', 'handymen', 'heating-engineers', 'joiners',
  'landscapers', 'locksmiths', 'painters-decorators', 'pest-control',
  'plasterers', 'plumbers', 'roofers', 'tilers'
];

console.log(`Processing ${trades.length} trade pages`);

let fixed = 0;
for (const tradeSlug of trades) {
  const tradeDir = `for-${tradeSlug}`;
  const pagePath = path.join(appDir, tradeDir, 'page.tsx');
  if (!fs.existsSync(pagePath)) {
    console.log(`  Missing: ${tradeDir}`);
    continue;
  }

  let content = fs.readFileSync(pagePath, 'utf8');
  const original = content;

  // Find the CITY LINKS comment
  const cityLinksIdx = content.indexOf('{/* ─── CITY LINKS ─── */}');
  if (cityLinksIdx === -1) {
    // Some pages might have a different comment format or no comment
    // Try to find "Your City" heading
    const cityHeadingIdx = content.indexOf('in Your City');
    if (cityHeadingIdx === -1) {
      console.log(`  No CITY LINKS section in ${tradeDir}`);
      continue;
    }
    // Find the <section> before the heading
    const sectionStart = content.lastIndexOf('<section', cityHeadingIdx);
    if (sectionStart === -1) {
      console.log(`  No <section> before city heading in ${tradeDir}`);
      continue;
    }
    // Find the </section> after the heading
    const sectionEnd = content.indexOf('</section>', cityHeadingIdx);
    if (sectionEnd === -1) {
      console.log(`  No </section> after city heading in ${tradeDir}`);
      continue;
    }
    const endIdx = sectionEnd + '</section>'.length;
    
    const before = content.substring(0, sectionStart);
    const after = content.substring(endIdx);
    content = before + `        {/* ─── CITY LINKS ─── */}\n        <TradeCityLinks tradeSlug="${tradeSlug}" />` + after;
  } else {
    // Standard CITY LINKS comment found
    const sectionEnd = content.indexOf('</section>', cityLinksIdx);
    if (sectionEnd === -1) {
      console.log(`  No </section> after CITY LINKS in ${tradeDir}`);
      continue;
    }
    const endIdx = sectionEnd + '</section>'.length;
    
    const before = content.substring(0, cityLinksIdx);
    const after = content.substring(endIdx);
    content = before + `{/* ─── CITY LINKS ─── */}\n        <TradeCityLinks tradeSlug="${tradeSlug}" />` + after;
  }

  // Add import if not present
  if (!content.includes('import { TradeCityLinks }')) {
    const importMatch = content.match(/import .* from ["'].*["'];?\n/);
    if (importMatch) {
      const importStr = importMatch[0];
      const importIdx = content.indexOf(importStr) + importStr.length;
      content = content.slice(0, importIdx) + `import { TradeCityLinks } from "@/components/TradeCityLinks";\n` + content.slice(importIdx);
    }
  }

  if (content !== original) {
    fs.writeFileSync(pagePath, content);
    fixed++;
    console.log(`  Fixed ${tradeDir}`);
  }
}

console.log(`\nFixed ${fixed} trade pages`);
