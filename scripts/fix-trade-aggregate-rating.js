const fs = require('fs');
const path = require('path');

const appDir = '/root/.openclaw/workspace/whoza-ai-v0/app';

function findTradePages(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name.startsWith('for-')) {
      const pagePath = path.join(fullPath, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        files.push(pagePath);
      }
    }
  }
  return files;
}

const pages = findTradePages(appDir);
console.log(`Found ${pages.length} trade/city pages`);

let fixed = 0;
for (const pagePath of pages) {
  let content = fs.readFileSync(pagePath, 'utf8');
  const original = content;
  
  // Match aggregateRating blocks - more flexible regex
  content = content.replace(
    /"aggregateRating":\s*\{[\s\S]*?"ratingValue":\s*"[\d.]+"[\s\S]*?\},?/g,
    ''
  );
  
  if (content !== original) {
    fs.writeFileSync(pagePath, content);
    fixed++;
    console.log(`Fixed: ${path.relative(appDir, pagePath)}`);
  }
}

console.log(`Fixed ${fixed} pages total`);
