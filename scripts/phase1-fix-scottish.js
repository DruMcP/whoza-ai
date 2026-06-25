#!/usr/bin/env node
/**
 * Phase 1: Fix Scottish combo pages
 * - Add city-links section before FAQ
 * - Add VideoObject schema to JSON-LD
 * - Add Organization schema to JSON-LD
 */

const fs = require('fs');
const path = require('path');

const scottishPages = [
  'for-builders-glasgow', 'for-builders-edinburgh',
  'for-roofers-glasgow', 'for-roofers-edinburgh',
  'for-heating-engineers-glasgow', 'for-heating-engineers-edinburgh',
  'for-locksmiths-glasgow', 'for-locksmiths-edinburgh',
  'for-carpenters-glasgow', 'for-carpenters-edinburgh',
  'for-joiners-glasgow', 'for-joiners-edinburgh',
  'for-plasterers-glasgow', 'for-plasterers-edinburgh',
  'for-tilers-glasgow', 'for-tilers-edinburgh',
  'for-gas-engineers-glasgow', 'for-gas-engineers-edinburgh',
  'for-handymen-glasgow', 'for-handymen-edinburgh',
  'for-cleaners-glasgow', 'for-cleaners-edinburgh',
  'for-landscapers-glasgow', 'for-landscapers-edinburgh',
  'for-painters-decorators-glasgow', 'for-painters-decorators-edinburgh',
  'for-pest-control-glasgow', 'for-pest-control-edinburgh',
  'for-drainage-glasgow', 'for-drainage-edinburgh',
];

// Parse slug to get trade and city
function parseSlug(slug) {
  const parts = slug.replace('for-', '').split('-');
  // Last part is city
  const city = parts.pop();
  const tradeSlug = parts.join('-');
  return { tradeSlug, city };
}

// Trade display names
const tradeNames = {
  'builders': 'Builder',
  'roofers': 'Roofer',
  'heating-engineers': 'Heating Engineer',
  'locksmiths': 'Locksmith',
  'carpenters': 'Carpenter',
  'joiners': 'Joiner',
  'plasterers': 'Plasterer',
  'tilers': 'Tiler',
  'gas-engineers': 'Gas Engineer',
  'handymen': 'Handyman',
  'cleaners': 'Cleaner',
  'landscapers': 'Landscaper',
  'painters-decorators': 'Painter & Decorator',
  'pest-control': 'Pest Control',
  'drainage': 'Drainage Engineer',
};

// City display names
const cityNames = {
  'glasgow': 'Glasgow',
  'edinburgh': 'Edinburgh',
};

// UK cities for cross-links
const ukCities = [
  { slug: 'london', name: 'London' },
  { slug: 'manchester', name: 'Manchester' },
  { slug: 'birmingham', name: 'Birmingham' },
  { slug: 'leeds', name: 'Leeds' },
  { slug: 'glasgow', name: 'Glasgow' },
  { slug: 'bristol', name: 'Bristol' },
  { slug: 'liverpool', name: 'Liverpool' },
  { slug: 'edinburgh', name: 'Edinburgh' },
];

function generateCityLinksSection(tradeSlug, currentCity) {
  const tradeName = tradeNames[tradeSlug] || tradeSlug;
  const tradePlural = tradeName + 's';
  
  const cityLinks = ukCities
    .filter(c => c.slug !== currentCity)
    .map(c => `    <Link href="/for-${tradeSlug}-${c.slug}" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70 hover:text-white transition-all">${c.name}</Link>`)
    .join('\n');

  return `
        {/* ─── CITY LINKS ─── */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              AI Call Answering for ${tradePlural} Across the UK
            </h2>
            <p className="text-white/60 mb-6">
              Katie answers calls for ${tradePlural.toLowerCase()} in cities nationwide. Find your location:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
${cityLinks}
            </div>
            <div className="mt-6">
              <Link href="/for-${tradeSlug}" className="inline-flex items-center text-${currentCity === 'glasgow' ? 'blue' : 'indigo'}-400 hover:text-${currentCity === 'glasgow' ? 'blue' : 'indigo'}-300 text-sm font-medium transition-all">
                View all ${tradePlural} →
              </Link>
            </div>
          </div>
        </section>

        <div className="section-divider" />
`;
}

function addSchemaToJsonLd(content, tradeSlug, city) {
  const videoObjectSchema = `              {
                "@type": "VideoObject",
                "name": "Whoza.ai 60-Second Demo — Katie Answers Every Call",
                "description": "Watch Katie, Whoza's AI call handler, capture a missed enquiry in under 60 seconds. The call is answered instantly, the enquiry lands in WhatsApp, Claire requests a review, and Rex delivers growth insights. Built for UK tradespeople.",
                "thumbnailUrl": "https://whoza.ai/og-image.webp",
                "uploadDate": "2026-06-01",
                "duration": "PT60S",
                "embedUrl": "https://whoza.ai",
                "publisher": {
                  "@type": "Organization",
                  "name": "whoza.ai",
                  "logo": { "@type": "ImageObject", "url": "https://whoza.ai/logo.png" }
                }
              },
              {
                "@type": "Organization",
                "@id": "https://whoza.ai/#organization",
                "name": "whoza.ai",
                "url": "https://whoza.ai",
                "logo": { "@type": "ImageObject", "url": "https://whoza.ai/logo.png" },
                "sameAs": [
                  "https://twitter.com/whozaai",
                  "https://www.linkedin.com/company/whoza-ai"
                ]
              },`;

  // Insert before the closing ] of @graph array - find the last BreadcrumbList closing and insert before it
  const pattern = /(              \{\n                "@type": "BreadcrumbList",)/;
  if (content.match(pattern)) {
    return content.replace(pattern, `${videoObjectSchema}\n$1`);
  }
  
  return content;
}

function insertCityLinks(content, tradeSlug, city) {
  const cityLinksSection = generateCityLinksSection(tradeSlug, city);
  
  // Insert before FAQ section
  const faqPattern = /(\{\/\*\s*─── QUESTIONS.*───\s*\*\/\})/;
  if (content.match(faqPattern)) {
    return content.replace(faqPattern, `${cityLinksSection}$1`);
  }
  
  // Fallback: insert before "Questions" heading
  const questionsPattern = /(<h2 className="text-3xl sm:text-4xl font-bold mb-4">\s*\n\s*Questions)/;
  if (content.match(questionsPattern)) {
    return content.replace(questionsPattern, `${cityLinksSection}$1`);
  }
  
  return content;
}

let fixed = 0;
let errors = [];

for (const pageSlug of scottishPages) {
  const { tradeSlug, city } = parseSlug(pageSlug);
  const filePath = path.join('/root/.openclaw/workspace/whoza-ai-v0/app', pageSlug, 'page.tsx');
  
  if (!fs.existsSync(filePath)) {
    errors.push(`${pageSlug}: file not found`);
    continue;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add city links section
    content = insertCityLinks(content, tradeSlug, city);
    
    // Add VideoObject + Organization schema
    content = addSchemaToJsonLd(content, tradeSlug, city);
    
    fs.writeFileSync(filePath, content);
    fixed++;
    console.log(`✅ Fixed: ${pageSlug}`);
  } catch (err) {
    errors.push(`${pageSlug}: ${err.message}`);
    console.error(`❌ Error: ${pageSlug}: ${err.message}`);
  }
}

console.log(`\n📊 Phase 1 Summary: ${fixed}/${scottishPages.length} pages fixed, ${errors.length} errors`);
if (errors.length > 0) {
  console.log('\nErrors:');
  errors.forEach(e => console.log(`  - ${e}`));
}
