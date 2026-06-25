const fs = require('fs');
const path = require('path');

const BLOG_DIR = '/root/.openclaw/workspace/whoza-ai-v0/app/blog';
const RESEARCH_DIR = '/root/.openclaw/workspace/whoza-ai-v0/app/research';
const RESOURCES_DIR = '/root/.openclaw/workspace/whoza-ai-v0/app/resources';

// Static blog posts (exclude [slug] dynamic page)
const staticBlogPosts = [
  '247-call-answering-uk-trades-guide-2026',
  'ai-call-answering-pricing-guide-uk-2026',
  'ai-call-answering-uk-tradespeople-definitive-guide-2026',
  'ai-receptionist-vs-human-cost-guide-2026',
  'best-ai-call-answering-service-uk-2026',
  'best-ai-call-answering-service-uk-trades-2026',
  'best-ai-phone-answering-uk-trades-2026',
  'how-much-do-missed-calls-cost-uk-trades',
];

const researchPages = [
  'ai-voice-agents-uk-trades-2026',
  'caller-experience-revolution-ai-voice-agents-2026',
  'the-true-cost-of-missed-calls-2026',
  'voice-agent-technology-state-of-art-2026',
];

const resourcePages = [
  'google-business-profile-checklist-trades',
  'missed-call-cost-calculator',
  'trade-business-growth-toolkit',
];

function addAuthorBylineAfterH1(content, authorName, authorTitle, date) {
  // Find </h1> and add author byline + last updated after it
  const h1Regex = /(<\/h1>)/;
  const byline = `

              <div className="flex flex-wrap items-center gap-4 text-white/40 text-sm mt-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>${authorName}</span>
                  ${authorTitle ? `<span className="text-white/30">— ${authorTitle}</span>` : ''}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime="${date}">${date}</time>
                </div>
              </div>
              <div className="mt-2 text-white/30 text-sm">
                Last updated: <time dateTime="${date}">${date}</time>
              </div>`;
  
  return content.replace(h1Regex, `$1${byline}`);
}

function addLastUpdatedAfterH1(content, date) {
  const h1Regex = /(<\/h1>)/;
  const byline = `

              <div className="mt-4 text-white/30 text-sm">
                Last updated: <time dateTime="${date}">${date}</time>
              </div>`;
  return content.replace(h1Regex, `$1${byline}`);
}

function fixAuthorSchema(content) {
  // Change author Organization to Person for static blog posts
  return content.replace(
    /"author":\s*\{\s*"@type":\s*"Organization",\s*"name":\s*"([^"]+)"\s*\}/g,
    `"author": { "@type": "Person", "name": "$1" }`
  );
}

function processStaticBlogPost(slug) {
  const filePath = path.join(BLOG_DIR, slug, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.log(`Missing: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Extract author from metadata
  const authorMatch = content.match(/authors:\s*\[\{\s*name:\s*"([^"]+)"/);
  const authorName = authorMatch ? authorMatch[1] : 'Trade Tech Review';
  const authorTitle = 'Research Team';
  
  // Extract date from datePublished in schema
  const dateMatch = content.match(/datePublished:\s*"([^"]+)"/);
  const date = dateMatch ? dateMatch[1] : '2026-06-06';
  
  // Check if User and Calendar are already imported
  if (!content.includes('User,')) {
    content = content.replace(/import\s+\{([^}]+)\}\s+from\s+"lucide-react"/, (match, imports) => {
      const newImports = imports.includes('User') ? imports : `${imports}, User`;
      const finalImports = newImports.includes('Calendar') ? newImports : `${newImports}, Calendar`;
      return `import {${finalImports}} from "lucide-react"`;
    });
  }
  
  // Add author byline after H1
  content = addAuthorBylineAfterH1(content, authorName, authorTitle, date);
  
  // Fix author schema
  content = fixAuthorSchema(content);
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated: ${filePath}`);
}

function processResearchPage(slug) {
  const filePath = path.join(RESEARCH_DIR, slug, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.log(`Missing: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  const authorName = 'whoza.ai';
  const authorTitle = 'Research Team';
  const date = '2026-06-06';
  
  // Check if User and Calendar are imported
  if (!content.includes('User,')) {
    content = content.replace(/import\s+\{([^}]+)\}\s+from\s+"lucide-react"/, (match, imports) => {
      const newImports = imports.includes('User') ? imports : `${imports}, User`;
      const finalImports = newImports.includes('Calendar') ? newImports : `${newImports}, Calendar`;
      return `import {${finalImports}} from "lucide-react"`;
    });
  }
  
  // Add author byline after H1
  content = addAuthorBylineAfterH1(content, authorName, authorTitle, date);
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated: ${filePath}`);
}

function processResourcePage(slug) {
  const filePath = path.join(RESOURCES_DIR, slug, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.log(`Missing: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  const date = '2026-06-06';
  
  // Check if Calendar is imported
  if (!content.includes('Calendar,')) {
    content = content.replace(/import\s+\{([^}]+)\}\s+from\s+"lucide-react"/, (match, imports) => {
      const finalImports = imports.includes('Calendar') ? imports : `${imports}, Calendar`;
      return `import {${finalImports}} from "lucide-react"`;
    });
  }
  
  // Add last updated after H1
  content = addLastUpdatedAfterH1(content, date);
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated: ${filePath}`);
}

// Fix 2 H1s on google-business-profile-checklist-trades
function fixDoubleH1() {
  const filePath = path.join(RESOURCES_DIR, 'google-business-profile-checklist-trades', 'page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find second H1 and change to H2
  const h1Matches = [...content.matchAll(/<h1/g)];
  if (h1Matches.length > 1) {
    // Find the second h1 opening and closing
    const secondH1Index = h1Matches[1].index;
    // Replace the second <h1 with <h2 and </h1> with </h2>
    const beforeSecond = content.substring(0, secondH1Index);
    const afterSecond = content.substring(secondH1Index);
    const fixedAfter = afterSecond.replace(/<h1/, '<h2').replace(/<\/h1>/, '</h2>');
    content = beforeSecond + fixedAfter;
    console.log(`Fixed double H1 in: ${filePath}`);
  }
  
  fs.writeFileSync(filePath, content);
}

// Run
console.log('Processing static blog posts...');
staticBlogPosts.forEach(processStaticBlogPost);

console.log('\nProcessing research pages...');
researchPages.forEach(processResearchPage);

console.log('\nProcessing resource pages...');
resourcePages.forEach(processResourcePage);

console.log('\nFixing double H1...');
fixDoubleH1();

console.log('\nDone!');
