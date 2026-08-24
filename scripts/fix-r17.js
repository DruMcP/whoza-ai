const fs = require('fs');
const path = require('path');

// Map: file -> { trade, current }
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
let replaced = 0;

for (const { file, trade, current } of pages) {
  const fullPath = path.join(root, file);
  let content = fs.readFileSync(fullPath, 'utf-8');

  // Pattern: the section containing the city links .map()
  // We need to match from <section className="py-16 lg:py-24"> through </section>
  // that contains the .map() over cities array.
  // Use a regex that finds the section with the map block.

  const oldPattern = /\s+<section className="py-16 lg:py-24">\s+<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">\s+<div className="text-center mb-12">\s+<h2 className="text-3xl sm:text-4xl font-bold mb-4">\s+More [^<]+ Locations\s+<\/h2>\s+<p className="text-white\/60">\s+Katie answers calls for [^<]+ across the UK\.\s+<\/p>\s+<\/div>\s+<div className="flex flex-wrap justify-center gap-3">\s+\{\["London", "Manchester", "Birmingham", "Glasgow", "Bristol",\s+"Liverpool", "Leeds", "Edinburgh"\]\.map\(city => \(\s+<Link\s+key=\{city\}\s+href=\{`\/for-[^`]+-\$\{city\.toLowerCase\(\)\.replace\(\/\\s\+\/g, '-'\)\}`\}\s+className="bg-white\/5 border border-white\/10 rounded-full px-5 py-2\.5 text-sm text-white\/60 hover:bg-white\/10 hover:text-white transition-colors"\s+>\s+\{city\}\s+<\/Link>\s+\)\)\s+<\/div>\s+<div className="mt-8 text-center">\s+<Link\s+href="\/for-[^"]+"\s+className=\{`inline-flex items-center text-[^`]+ hover:text-[^`]+ font-medium transition-colors`\}\s+>\s+View all [^<]+ pages\s+<ArrowRight className="w-4 h-4 ml-2" \/>\s+<\/Link>\s+<\/div>\s+<\/div>\s+<\/section>/;

  // The regex above is too fragile. Let's use a simpler approach:
  // Find and replace the inner div with the map
  const mapStart = content.indexOf('{["London", "Manchester", "Birmingham", "Glasgow", "Bristol",');
  if (mapStart === -1) {
    console.log(`SKIP (no map block): ${file}`);
    continue;
  }

  // Find the opening <div className="flex flex-wrap justify-center gap-3"> before the map
  const divStart = content.lastIndexOf('<div className="flex flex-wrap justify-center gap-3">', mapStart);
  if (divStart === -1) {
    console.log(`SKIP (no div start): ${file}`);
    continue;
  }

  // Find the closing </div> after the map block
  // The map ends with ))} followed by </div>
  const mapEndMarker = '))}\n            </div>';
  const mapEnd = content.indexOf(mapEndMarker, mapStart);
  if (mapEnd === -1) {
    // Try alternative pattern
    const altEnd = content.indexOf('))}\n    </div>', mapStart);
    if (altEnd === -1) {
      console.log(`SKIP (no map end): ${file}`);
      continue;
    }
    const endPos = altEnd + '))}\n    </div>'.length;
    const before = content.slice(0, divStart);
    const after = content.slice(endPos);
    const replacement = `            <TradeCityLinks trade="${trade}" current="${current}" />`;
    content = before + replacement + after;
    replaced++;
    fs.writeFileSync(fullPath, content);
    console.log(`REPLACED: ${file}`);
    continue;
  }

  const endPos = mapEnd + mapEndMarker.length;
  const before = content.slice(0, divStart);
  const after = content.slice(endPos);
  const replacement = `            <TradeCityLinks trade="${trade}" current="${current}" />`;
  content = before + replacement + after;
  replaced++;
  fs.writeFileSync(fullPath, content);
  console.log(`REPLACED: ${file}`);
}

console.log(`\nTotal replaced: ${replaced}/13`);
