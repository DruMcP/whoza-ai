const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'app/for-builders-birmingham/page.tsx', trade: 'for-builders', current: 'birmingham' },
  { file: 'app/for-builders-london/page.tsx', trade: 'for-builders', current: 'london' },
  { file: 'app/for-builders-manchester/page.tsx', trade: 'for-builders', current: 'manchester' },
  { file: 'app/for-electricians-birmingham/page.tsx', trade: 'for-electricians', current: 'birmingham' },
  { file: 'app/for-electricians-london/page.tsx', trade: 'for-electricians', current: 'london' },
  { file: 'app/for-electricians-manchester/page.tsx', trade: 'for-electricians', current: 'manchester' },
  { file: 'app/for-gas-engineers-london/page.tsx', trade: 'for-gas-engineers', current: 'london' },
  { file: 'app/for-heating-engineers-london/page.tsx', trade: 'for-heating-engineers', current: 'london' },
  { file: 'app/for-heating-engineers-manchester/page.tsx', trade: 'for-heating-engineers', current: 'manchester' },
  { file: 'app/for-plumbers-birmingham/page.tsx', trade: 'for-plumbers', current: 'birmingham' },
  { file: 'app/for-plumbers-london/page.tsx', trade: 'for-plumbers', current: 'london' },
  { file: 'app/for-plumbers-manchester/page.tsx', trade: 'for-plumbers', current: 'manchester' },
  { file: 'app/for-roofers-london/page.tsx', trade: 'for-roofers', current: 'london' },
];

const root = '/root/.openclaw/workspace/whoza-ai';

for (const { file, trade, current } of pages) {
  const fullPath = path.join(root, file);
  let content = fs.readFileSync(fullPath, 'utf-8');

  // Match the entire .map() block: from {["London"... through ))}
  // Use a regex that spans multiple lines
  const pattern = /\{\["London",\s*"Manchester",\s*"Birmingham",\s*"Glasgow",\s*"Bristol",\s*"Liverpool",\s*"Leeds",\s*"Edinburgh"\]\.map\(city\s*=>\s*\(\s*<Link[\s\S]*?<\/Link>\s*\)\)\s*\}/;

  if (pattern.test(content)) {
    content = content.replace(pattern, `<TradeCityLinks trade="${trade}" current="${current}" />`);
    fs.writeFileSync(fullPath, content);
    console.log(`REPLACED map block: ${file}`);
  } else {
    console.log(`SKIP (no match): ${file}`);
  }
}

// Also delete old component if it still exists
const oldComp = path.join(root, 'components/TradeCityLinks.tsx');
if (fs.existsSync(oldComp)) {
  fs.unlinkSync(oldComp);
  console.log('DELETED: components/TradeCityLinks.tsx');
}
