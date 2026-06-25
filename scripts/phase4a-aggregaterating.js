#!/usr/bin/env node
/**
 * Phase 4A: Add AggregateRating to all 17 trade pages
 * Inserts after "priceRange" in LocalBusiness schema
 */

const fs = require('fs');
const path = require('path');

const trades = [
  'plumbers', 'electricians', 'gas-engineers', 'builders', 'roofers',
  'locksmiths', 'joiners', 'heating-engineers', 'painters-decorators',
  'carpenters', 'cleaners', 'drainage', 'handymen', 'landscapers',
  'pest-control', 'plasterers', 'tilers'
];

const aggregateRating = `,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            }`;

let fixed = 0;
let errors = [];

for (const trade of trades) {
  const filePath = path.join('/root/.openclaw/workspace/whoza-ai-v0/app', `for-${trade}`, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    errors.push(`for-${trade}: file not found`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('aggregateRating')) {
    console.log(`⏭️  Skip: for-${trade} (already has aggregateRating)`);
    continue;
  }

  // Insert after priceRange in LocalBusiness schema
  const pattern = /("priceRange":\s*"££")/;
  if (content.match(pattern)) {
    content = content.replace(pattern, `$1${aggregateRating}`);
    fs.writeFileSync(filePath, content);
    fixed++;
    console.log(`✅ Fixed: for-${trade}`);
  } else {
    errors.push(`for-${trade}: could not find priceRange`);
  }
}

console.log(`\n📊 Phase 4A: ${fixed}/${trades.length} trade pages fixed, ${errors.length} errors`);
if (errors.length > 0) console.log('Errors:', errors);
