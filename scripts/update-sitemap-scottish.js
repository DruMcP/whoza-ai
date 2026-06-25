#!/usr/bin/env node
/**
 * Update sitemap.ts with new Scottish combo pages
 */

const fs = require('fs');

const sitemapPath = '/root/.openclaw/workspace/whoza-ai-v0/app/sitemap.ts';
let content = fs.readFileSync(sitemapPath, 'utf8');

// New Scottish combo pages to add
const newScottishPages = [
  'for-builders-glasgow',
  'for-builders-edinburgh',
  'for-roofers-glasgow',
  'for-roofers-edinburgh',
  'for-heating-engineers-glasgow',
  'for-heating-engineers-edinburgh',
  'for-locksmiths-glasgow',
  'for-locksmiths-edinburgh',
  'for-carpenters-glasgow',
  'for-carpenters-edinburgh',
  'for-joiners-glasgow',
  'for-joiners-edinburgh',
  'for-plasterers-glasgow',
  'for-plasterers-edinburgh',
  'for-tilers-glasgow',
  'for-tilers-edinburgh',
  'for-gas-engineers-glasgow',
  'for-gas-engineers-edinburgh',
  'for-handymen-glasgow',
  'for-handymen-edinburgh',
  'for-cleaners-glasgow',
  'for-cleaners-edinburgh',
  'for-landscapers-glasgow',
  'for-landscapers-edinburgh',
  'for-painters-decorators-glasgow',
  'for-painters-decorators-edinburgh',
  'for-pest-control-glasgow',
  'for-pest-control-edinburgh',
  'for-drainage-glasgow',
  'for-drainage-edinburgh',
];

// Find the comboPages array and add new entries
const newEntries = newScottishPages.map(slug => 
  `    { url: \`\${baseUrl}/${slug}\`, lastModified: lastMod, changeFrequency: 'monthly', priority: 0.7 },`
).join('\n');

// Insert before the closing bracket of comboPages array
const marker = '    { url: `${baseUrl}/for-handymen-london`, lastModified: lastMod, changeFrequency: \'monthly\', priority: 0.7 },';
if (content.includes(marker)) {
  content = content.replace(marker, marker + '\n' + newEntries);
  fs.writeFileSync(sitemapPath, content);
  console.log(`✅ Sitemap updated with ${newScottishPages.length} new Scottish combo pages`);
} else {
  console.error('❌ Could not find insertion point in sitemap.ts');
  process.exit(1);
}
