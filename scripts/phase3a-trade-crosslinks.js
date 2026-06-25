#!/usr/bin/env node
/**
 * Phase 3A: Add city cross-links to all 16 trade pages
 * Inserts a city-links section before the FAQ section
 */

const fs = require('fs');
const path = require('path');

const trades = [
  { slug: 'plumbers', plural: 'Plumbers', color: 'blue' },
  { slug: 'electricians', plural: 'Electricians', color: 'yellow' },
  { slug: 'gas-engineers', plural: 'Gas Engineers', color: 'orange' },
  { slug: 'builders', plural: 'Builders', color: 'blue' },
  { slug: 'roofers', plural: 'Roofers', color: 'slate' },
  { slug: 'locksmiths', plural: 'Locksmiths', color: 'gray' },
  { slug: 'joiners', plural: 'Joiners', color: 'amber' },
  { slug: 'heating-engineers', plural: 'Heating Engineers', color: 'orange' },
  { slug: 'painters-decorators', plural: 'Painters & Decorators', color: 'purple' },
  { slug: 'carpenters', plural: 'Carpenters', color: 'amber' },
  { slug: 'cleaners', plural: 'Cleaners', color: 'cyan' },
  { slug: 'drainage', plural: 'Drainage Engineers', color: 'blue' },
  { slug: 'handymen', plural: 'Handymen', color: 'green' },
  { slug: 'landscapers', plural: 'Landscapers', color: 'green' },
  { slug: 'pest-control', plural: 'Pest Control', color: 'red' },
  { slug: 'plasterers', plural: 'Plasterers', color: 'gray' },
  { slug: 'tilers', plural: 'Tilers', color: 'blue' },
];

const cities = [
  { slug: 'london', name: 'London' },
  { slug: 'manchester', name: 'Manchester' },
  { slug: 'birmingham', name: 'Birmingham' },
  { slug: 'leeds', name: 'Leeds' },
  { slug: 'glasgow', name: 'Glasgow' },
  { slug: 'bristol', name: 'Bristol' },
  { slug: 'liverpool', name: 'Liverpool' },
  { slug: 'edinburgh', name: 'Edinburgh' },
];

let fixed = 0;
let errors = [];

for (const trade of trades) {
  const filePath = path.join('/root/.openclaw/workspace/whoza-ai-v0/app', `for-${trade.slug}`, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    errors.push(`for-${trade.slug}: file not found`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has city links
  if (content.includes('Available in your city')) {
    console.log(`⏭️  Skip: for-${trade.slug} (already has city links)`);
    continue;
  }

  const cityLinks = cities.map(c =>
    `    <Link href="/for-${trade.slug}-${c.slug}" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">${c.name}</Link>`
  ).join('\n');

  const section = `
        {/* ─── CITY LINKS ─── */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              AI Call Answering for ${trade.plural} in Your City
            </h2>
            <p className="text-white/60 mb-6">
              Katie answers calls for ${trade.plural.toLowerCase()} across the UK. Find your location:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
${cityLinks}
            </div>
          </div>
        </section>

        <div className="section-divider" />
`;

  // Find FAQ section and insert before it
  const faqPattern = /(<section[^>]*className="py-16[^"]*"[^>]*>\s*<div[^>]*className="max-w-4xl[^"]*"[^>]*>\s*<div[^>]*className="text-center[^"]*"[^>]*>)/;
  const match = content.match(faqPattern);

  if (match) {
    content = content.replace(match[0], section + match[0]);
    fs.writeFileSync(filePath, content);
    fixed++;
    console.log(`✅ Fixed: for-${trade.slug}`);
  } else {
    // Try simpler pattern
    const simplePattern = /(<section className="py-16 lg:py-24">\s*<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">)/;
    const simpleMatch = content.match(simplePattern);
    if (simpleMatch) {
      content = content.replace(simpleMatch[0], section + simpleMatch[0]);
      fs.writeFileSync(filePath, content);
      fixed++;
      console.log(`✅ Fixed: for-${trade.slug} (simple)`);
    } else {
      errors.push(`for-${trade.slug}: could not find FAQ section`);
    }
  }
}

console.log(`\n📊 Phase 3A: ${fixed}/${trades.length} trade pages fixed, ${errors.length} errors`);
if (errors.length > 0) {
  console.log('Errors:', errors);
}
