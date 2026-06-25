const fs = require('fs');
const path = require('path');

function findFiles(dir, pattern) {
  const results = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !file.startsWith('.') && !file.startsWith('node_modules')) {
      results.push(...findFiles(fullPath, pattern));
    } else if (pattern.test(file)) {
      results.push(fullPath);
    }
  }
  return results;
}

const pages = findFiles('/root/.openclaw/workspace/whoza-ai-v0/app', /page\.(tsx|ts|jsx|js)$/);
const audit = [];

for (const page of pages) {
  const content = fs.readFileSync(page, 'utf8');
  const relPath = page.replace('/root/.openclaw/workspace/whoza-ai-v0/', '');
  
  const h1Count = (content.match(/<h1/g) || []).length;
  const hasCanonical = content.includes('canonical');
  const hasOgTitle = content.includes('og:title') || (content.includes('title:') && content.includes('openGraph'));
  const hasOgDesc = content.includes('og:description') || (content.includes('description:') && content.includes('openGraph'));
  const hasOgImage = content.includes('og:image') || (content.includes('images:') && content.includes('openGraph'));
  const hasOgUrl = content.includes('og:url') || (content.includes('url:') && content.includes('openGraph'));
  const hasOgType = content.includes('og:type') || (content.includes('type:') && content.includes('openGraph'));
  const hasOgLocale = content.includes('og:locale') || (content.includes('locale:') && content.includes('openGraph'));
  const hasOgSiteName = content.includes('og:site_name') || (content.includes('siteName:') && content.includes('openGraph'));
  const hasTwitterCard = content.includes('twitter:');
  const hasArticleTag = content.includes('<article');
  const hasTimeTag = content.includes('<time');
  const hasLastUpdated = content.toLowerCase().includes('last updated') || content.toLowerCase().includes('last modified');
  const hasPersonSchema = content.includes('"@type": "Person"') || content.includes("'@type': 'Person'");
  const hasDateModified = content.includes('dateModified');
  
  audit.push({
    path: relPath,
    h1Count,
    hasCanonical,
    hasOgTitle,
    hasOgDesc,
    hasOgImage,
    hasOgUrl,
    hasOgType,
    hasOgLocale,
    hasOgSiteName,
    hasTwitterCard,
    hasArticleTag,
    hasTimeTag,
    hasLastUpdated,
    hasPersonSchema,
    hasDateModified
  });
}

// Summary
console.log('=== SEO AUDIT SUMMARY ===\n');
console.log('Total pages:', audit.length);
console.log('Pages with 0 H1:', audit.filter(p => p.h1Count === 0).length);
console.log('Pages with >1 H1:', audit.filter(p => p.h1Count > 1).length);
console.log('Pages missing canonical:', audit.filter(p => !p.hasCanonical).length);
console.log('Pages missing og:title:', audit.filter(p => !p.hasOgTitle).length);
console.log('Pages missing og:desc:', audit.filter(p => !p.hasOgDesc).length);
console.log('Pages missing og:image:', audit.filter(p => !p.hasOgImage).length);
console.log('Pages missing og:url:', audit.filter(p => !p.hasOgUrl).length);
console.log('Pages missing og:type:', audit.filter(p => !p.hasOgType).length);
console.log('Pages missing og:locale:', audit.filter(p => !p.hasOgLocale).length);
console.log('Pages missing og:siteName:', audit.filter(p => !p.hasOgSiteName).length);
console.log('Pages missing twitter:card:', audit.filter(p => !p.hasTwitterCard).length);
console.log('Pages missing <article>:', audit.filter(p => !p.hasArticleTag).length);
console.log('Pages missing <time>:', audit.filter(p => !p.hasTimeTag).length);
console.log('Pages missing Last Updated:', audit.filter(p => !p.hasLastUpdated).length);
console.log('Pages missing Person schema:', audit.filter(p => !p.hasPersonSchema).length);
console.log('Pages missing dateModified:', audit.filter(p => !p.hasDateModified).length);

console.log('\n=== DETAILED REPORT ===\n');
for (const p of audit) {
  const issues = [];
  if (p.h1Count === 0) issues.push('no-h1');
  if (p.h1Count > 1) issues.push(`h1=${p.h1Count}`);
  if (!p.hasCanonical) issues.push('no-canonical');
  if (!p.hasOgTitle) issues.push('no-og-title');
  if (!p.hasOgDesc) issues.push('no-og-desc');
  if (!p.hasOgImage) issues.push('no-og-image');
  if (!p.hasOgUrl) issues.push('no-og-url');
  if (!p.hasOgType) issues.push('no-og-type');
  if (!p.hasOgLocale) issues.push('no-og-locale');
  if (!p.hasOgSiteName) issues.push('no-og-sitename');
  if (!p.hasTwitterCard) issues.push('no-twitter');
  if (!p.hasLastUpdated) issues.push('no-last-updated');
  if (issues.length > 0) {
    console.log(`${p.path}: ${issues.join(', ')}`);
  }
}
