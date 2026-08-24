const fs = require('fs');
const path = require('path');

const root = '/root/.openclaw/workspace/whoza-ai';

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

for (const { file, trade, current } of pages) {
  const fullPath = path.join(root, file);
  let content = fs.readFileSync(fullPath, 'utf-8');

  // Find the start of the .map block
  const startMarker = '{["London", "Manchester", "Birmingham", "Glasgow", "Bristol", "Liverpool", "Leeds", "Edinburgh"].map(city => (';
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) {
    console.log(`SKIP (no start marker): ${file}`);
    continue;
  }

  // Find the end of the .map block: ))}
  const endMarker = '))}';
  let endIdx = content.indexOf(endMarker, startIdx);
  if (endIdx === -1) {
    console.log(`SKIP (no end marker): ${file}`);
    continue;
  }
  endIdx += endMarker.length;

  // Replace the entire block
  const oldBlock = content.substring(startIdx, endIdx);
  const newBlock = `<TradeCityLinks trade="${trade}" current="${current}" />`;

  content = content.substring(0, startIdx) + newBlock + content.substring(endIdx);
  fs.writeFileSync(fullPath, content);
  console.log(`REPLACED: ${file} (${oldBlock.length} chars → ${newBlock.length} chars)`);
}
