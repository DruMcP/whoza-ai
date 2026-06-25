#!/usr/bin/env node
/**
 * Phase 3A (retry): Add city cross-links to remaining 5 trade pages
 * Uses 'id="faq"' pattern for pages with different section structure
 */

const fs = require('fs');
const path = require('path');

const remaining = [
  { slug: 'builders', plural: 'Builders', color: 'blue' },
  { slug: 'roofers', plural: 'Roofers', color: 'slate' },
  { slug: 'locksmiths', plural: 'Locksmiths', color: 'gray' },
  { slug: 'heating-engineers', plural: 'Heating Engineers', color: 'orange' },
  { slug: 'painters-decorators', plural: 'Painters & Decorators', color: 'purple' },
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

for (const trade of remaining) {
  const filePath = path.join('/root/.openclaw/workspace/whoza-ai-v0/app', `for-${trade.slug}`, 'page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('Available in your city')) {
    console.log(`⏭️  Skip: for-${trade.slug}`);
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

  // Look for {/* FAQ */} or id="faq" pattern
  const pattern = /({\/\*\s*FAQ\s*\*\/})/;
  if (content.match(pattern)) {
    content = content.replace(pattern, section + '$1');
    fs.writeFileSync(filePath, content);
    fixed++;
    console.log(`✅ Fixed: for-${trade.slug}`);
  } else {
    console.log(`❌ Could not find: for-${trade.slug}`);
  }
}

console.log(`\n📊 Phase 3A retry: ${fixed}/${remaining.length} fixed`);
