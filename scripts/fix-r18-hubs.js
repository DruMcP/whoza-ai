const fs = require('fs');
const path = require('path');

const root = '/root/.openclaw/workspace/whoza-ai';

// Map of file -> current tradeSlug value -> correct trade value
const replacements = [
  ['app/for-builders/page.tsx', 'builders', 'for-builders'],
  ['app/for-carpenters/page.tsx', 'carpenters', 'for-carpenters'],
  ['app/for-cleaners/page.tsx', 'cleaners', 'for-cleaners'],
  ['app/for-drainage/page.tsx', 'drainage', 'for-drainage'],
  ['app/for-electricians/page.tsx', 'electricians', 'for-electricians'],
  ['app/for-gas-engineers/page.tsx', 'gas engineers', 'for-gas-engineers'],
  ['app/for-handymen/page.tsx', 'handymen', 'for-handymen'],
  ['app/for-heating-engineers/page.tsx', 'heating engineers', 'for-heating-engineers'],
  ['app/for-joiners/page.tsx', 'joiners', 'for-joiners'],
  ['app/for-landscapers/page.tsx', 'landscapers', 'for-landscapers'],
  ['app/for-locksmiths/page.tsx', 'locksmiths', 'for-locksmiths'],
  ['app/for-painters-decorators/page.tsx', 'painters and decorators', 'for-painters-decorators'],
  ['app/for-pest-control/page.tsx', 'pest control', 'for-pest-control'],
  ['app/for-plasterers/page.tsx', 'plasterers', 'for-plasterers'],
  ['app/for-plumbers/page.tsx', 'plumbers', 'for-plumbers'],
  ['app/for-roofers/page.tsx', 'roofers', 'for-roofers'],
  ['app/for-tilers/page.tsx', 'tilers', 'for-tilers'],
];

for (const [file, oldVal, newVal] of replacements) {
  const fullPath = path.join(root, file);
  let content = fs.readFileSync(fullPath, 'utf-8');
  
  // Replace tradeSlug="..." with trade="..."
  const oldPattern = `tradeSlug="${oldVal}"`;
  const newPattern = `trade="${newVal}"`;
  
  if (content.includes(oldPattern)) {
    content = content.replace(oldPattern, newPattern);
    fs.writeFileSync(fullPath, content);
    console.log(`FIXED: ${file} — ${oldPattern} → ${newPattern}`);
  } else {
    console.log(`SKIP: ${file} — pattern not found: ${oldPattern}`);
  }
}
