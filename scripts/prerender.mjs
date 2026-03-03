/**
 * Prerender Script for Whoza.ai
 * 
 * Generates static HTML files for each URL in the sitemap with correct:
 * - Canonical tags (fixes "Non-canonical page in sitemap" - 62 URLs)
 * - Title tags (fixes "H1 tag missing or empty" - 62 URLs)
 * - Meta descriptions
 * - Robots meta
 * 
 * This runs AFTER vite build and creates individual index.html files
 * in the dist/ directory for each route.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const baseUrl = 'https://whoza.ai';

// ─── Blog Posts ───────────────────────────────────────────────────────────────
const blogPosts = [
  { slug: 'top-10-ai-visibility-strategies-uk-tradespeople-2026', title: 'Top 10 AI Visibility Strategies for UK Tradespeople in 2026 | Whoza.ai', description: 'The definitive list of the top 10 strategies UK tradespeople must use to dominate AI search results and get cited by ChatGPT, Perplexity, and Google AI.' },
  { slug: 'uk-trades-business-playbook-ai-search-visibility-2026', title: 'The UK Trades Business Playbook for AI Search Visibility in 2026 | Whoza.ai', description: 'A comprehensive, evidence-based playbook for UK plumbers, electricians, and tradespeople to dominate AI search in 2026.' },
  { slug: 'us-contractors-guide-ai-search-visibility-2026', title: "The US Contractor's Guide to AI Search Visibility in 2026 | Whoza.ai", description: 'Learn how US contractors, plumbers, electricians, and HVAC technicians can get recommended by ChatGPT, Google AI, and Perplexity.' },
  { slug: 'why-bing-matters-for-ai-search-the-perplexity-connection', title: 'Why Bing Matters for AI Search: The Perplexity Connection | Whoza.ai', description: 'Discover why Bing is a critical component of your AEO strategy and how Bing powers Perplexity AI recommendations.' },
  { slug: 'how-ai-search-engines-choose-which-local-businesses-to-recommend', title: 'How AI Search Engines Choose Which Local Businesses to Recommend | Whoza.ai', description: 'Learn how AI search engines like ChatGPT and Google AI decide which local businesses to recommend to customers.' },
  { slug: 'the-ultimate-guide-to-google-business-profile-optimization-for-ai-search-2026', title: 'The Ultimate Guide to Google Business Profile Optimization for AI Search 2026 | Whoza.ai', description: 'Master Google Business Profile optimization to get recommended by AI search engines in 2026.' },
  { slug: 'why-your-business-isnt-showing-up-in-chatgpt-recommendations-and-how-to-fix-it', title: "Why Your Business Isn't Showing Up in ChatGPT Recommendations | Whoza.ai", description: 'Discover why your trade business is invisible to ChatGPT and AI search engines, and the exact steps to fix it.' },
  { slug: 'how-uk-tradespeople-can-get-found-on-chatgpt-and-ai-search-in-2026', title: 'How UK Tradespeople Can Get Found on ChatGPT and AI Search in 2026 | Whoza.ai', description: 'A step-by-step guide for UK plumbers, electricians, and builders to get found on ChatGPT and AI search engines.' },
  { slug: 'how-uk-tradespeople-can-get-recommended-by-chatgpt-in-2026', title: 'How UK Tradespeople Can Get Recommended by ChatGPT in 2026 | Whoza.ai', description: 'Learn the proven strategies UK tradespeople use to get recommended by ChatGPT and AI assistants in 2026.' },
  { slug: 'electricians-guide-to-google-ai-overviews-how-to-get-featured', title: "Electrician's Guide to Google AI Overviews: How to Get Featured | Whoza.ai", description: 'A complete guide for electricians to get featured in Google AI Overviews and win more local customers.' },
  { slug: 'how-to-create-an-faq-page-that-ai-can-find-and-reference', title: 'How to Create an FAQ Page That AI Can Find and Reference | Whoza.ai', description: 'Learn how to create FAQ pages that AI search engines can easily find, parse, and reference in their answers.' },
  { slug: 'ai-visibility-manchester-trades-2026-guide', title: 'AI Visibility for Manchester Tradespeople: 2026 Guide | Whoza.ai', description: 'The complete guide for Manchester plumbers, electricians, and builders to dominate AI search in 2026.' },
  { slug: 'what-is-ai-visibility-uk-tradespeople-2026', title: 'What Is AI Visibility? A Guide for UK Tradespeople in 2026 | Whoza.ai', description: 'Understand what AI visibility means for your trade business and why it matters more than traditional SEO in 2026.' },
  { slug: 'how-uk-tradespeople-get-found-ai-search-2026', title: 'How UK Tradespeople Get Found in AI Search in 2026 | Whoza.ai', description: 'Discover the exact methods UK tradespeople are using to get found and recommended by AI search engines in 2026.' },
  { slug: 'best-practices-tradespeople-london-local-ai-visibility-guide', title: 'Best Practices for London Tradespeople: Local AI Visibility Guide | Whoza.ai', description: 'The definitive best practices guide for London tradespeople to improve their local AI visibility and win more clients.' },
  { slug: 'how-plumbers-can-get-found-in-chatgpt-a-step-by-step-guide', title: 'How Plumbers Can Get Found in ChatGPT: A Step-by-Step Guide | Whoza.ai', description: 'A detailed step-by-step guide for plumbers to get recommended by ChatGPT and AI search engines.' },
  { slug: 'how-plumbers-can-get-found-in-chatgpt-2026', title: 'How Plumbers Can Get Found in ChatGPT in 2026 | Whoza.ai', description: 'Learn how plumbers can optimise their online presence to get recommended by ChatGPT and AI assistants in 2026.' },
  { slug: 'electricians-guide-to-google-ai-overviews-2026', title: "Electrician's Guide to Google AI Overviews in 2026 | Whoza.ai", description: 'How electricians can get featured in Google AI Overviews and dominate local AI search results in 2026.' },
  { slug: 'ai-visibility-for-london-tradespeople-2026', title: 'AI Visibility for London Tradespeople in 2026 | Whoza.ai', description: 'How London plumbers, electricians, and builders can dominate AI search and get more local jobs in 2026.' },
  { slug: 'how-to-create-faq-page-ai-can-find-2026', title: 'How to Create an FAQ Page AI Can Find in 2026 | Whoza.ai', description: 'Step-by-step guide to creating FAQ pages that AI search engines like ChatGPT and Perplexity will cite in 2026.' },
  { slug: 'roofers-10-step-checklist-ai-visibility-2026', title: "Roofer's 10-Step Checklist for AI Visibility in 2026 | Whoza.ai", description: 'A practical 10-step checklist for roofers to improve their AI visibility and get recommended by ChatGPT in 2026.' },
  { slug: 'why-bing-matters-for-ai-search-2026', title: 'Why Bing Matters for AI Search in 2026 | Whoza.ai', description: 'Understand why Bing is essential for AI search visibility and how to optimise your trade business for Bing in 2026.' },
  { slug: 'manchester-vs-birmingham-local-seo-strategies-2026', title: 'Manchester vs Birmingham: Local SEO Strategies for Tradespeople 2026 | Whoza.ai', description: 'Compare AI visibility strategies for tradespeople in Manchester and Birmingham, and learn which tactics work best.' },
  { slug: 'roofers-checklist-10-steps-to-ai-visibility-2026', title: "Roofer's Checklist: 10 Steps to AI Visibility in 2026 | Whoza.ai", description: 'The essential 10-step checklist every roofer needs to achieve AI visibility and win more local jobs in 2026.' },
  { slug: 'how-ai-search-engines-choose-plumber-recommendation-manchester', title: 'How AI Search Engines Choose a Plumber Recommendation in Manchester | Whoza.ai', description: 'Discover how AI search engines select which Manchester plumbers to recommend and how to be the one they choose.' },
  { slug: 'why-ai-search-wont-recommend-your-trade-business-and-how-to-fix-it', title: "Why AI Search Won't Recommend Your Trade Business (And How to Fix It) | Whoza.ai", description: 'Understand the exact reasons AI search engines ignore your trade business and the proven fixes to get recommended.' },
  { slug: 'google-ai-overviews-stealing-clicks-guide-uk-tradespeople', title: 'Google AI Overviews Are Stealing Your Clicks: A Guide for UK Tradespeople | Whoza.ai', description: 'Learn how to turn Google AI Overviews from a threat into an opportunity for your UK trade business.' },
  { slug: 'how-ai-search-engines-rank-local-tradespeople-aeo-geo-guide-2026', title: 'How AI Search Engines Rank Local Tradespeople: The Complete AEO & GEO Guide for 2026 | Whoza.ai', description: 'Discover exactly how ChatGPT, Perplexity, and Google AI Overviews decide which plumbers, electricians, and roofers to recommend. Learn the seven proven AEO and GEO strategies to improve your AI visibility score and become the trusted answer for local trade searches in 2026.' },
];

// ─── UK Cities ────────────────────────────────────────────────────────────────
const ukCities = [
  { slug: 'london', name: 'London', region: 'Greater London', tradespeople: 150000 },
  { slug: 'birmingham', name: 'Birmingham', region: 'West Midlands', tradespeople: 32000 },
  { slug: 'manchester', name: 'Manchester', region: 'North West', tradespeople: 28000 },
  { slug: 'leeds', name: 'Leeds', region: 'Yorkshire', tradespeople: 24000 },
  { slug: 'glasgow', name: 'Glasgow', region: 'Scotland', tradespeople: 22000 },
  { slug: 'liverpool', name: 'Liverpool', region: 'North West', tradespeople: 18000 },
  { slug: 'newcastle', name: 'Newcastle', region: 'North East', tradespeople: 16000 },
  { slug: 'sheffield', name: 'Sheffield', region: 'Yorkshire', tradespeople: 18000 },
  { slug: 'bristol', name: 'Bristol', region: 'South West', tradespeople: 20000 },
  { slug: 'edinburgh', name: 'Edinburgh', region: 'Scotland', tradespeople: 14000 },
  { slug: 'leicester', name: 'Leicester', region: 'East Midlands', tradespeople: 14000 },
  { slug: 'nottingham', name: 'Nottingham', region: 'East Midlands', tradespeople: 13000 },
  { slug: 'cardiff', name: 'Cardiff', region: 'Wales', tradespeople: 12000 },
  { slug: 'coventry', name: 'Coventry', region: 'West Midlands', tradespeople: 11000 },
  { slug: 'southampton', name: 'Southampton', region: 'South East', tradespeople: 10000 },
  { slug: 'bradford', name: 'Bradford', region: 'Yorkshire', tradespeople: 16000 },
  { slug: 'belfast', name: 'Belfast', region: 'Northern Ireland', tradespeople: 12000 },
];

// ─── US Cities ────────────────────────────────────────────────────────────────
const usCities = [
  { slug: 'new-york', name: 'New York', state: 'NY', contractors: 125000 },
  { slug: 'los-angeles', name: 'Los Angeles', state: 'CA', contractors: 95000 },
  { slug: 'chicago', name: 'Chicago', state: 'IL', contractors: 68000 },
  { slug: 'houston', name: 'Houston', state: 'TX', contractors: 62000 },
  { slug: 'phoenix', name: 'Phoenix', state: 'AZ', contractors: 48000 },
  { slug: 'philadelphia', name: 'Philadelphia', state: 'PA', contractors: 42000 },
  { slug: 'san-antonio', name: 'San Antonio', state: 'TX', contractors: 38000 },
  { slug: 'san-diego', name: 'San Diego', state: 'CA', contractors: 36000 },
  { slug: 'dallas', name: 'Dallas', state: 'TX', contractors: 52000 },
  { slug: 'san-jose', name: 'San Jose', state: 'CA', contractors: 32000 },
  { slug: 'austin', name: 'Austin', state: 'TX', contractors: 35000 },
  { slug: 'jacksonville', name: 'Jacksonville', state: 'FL', contractors: 28000 },
  { slug: 'fort-worth', name: 'Fort Worth', state: 'TX', contractors: 30000 },
  { slug: 'columbus', name: 'Columbus', state: 'OH', contractors: 26000 },
  { slug: 'charlotte', name: 'Charlotte', state: 'NC', contractors: 29000 },
];

// ─── Static Pages ─────────────────────────────────────────────────────────────
const staticPages = [
  { path: '/how-it-works/', title: 'How It Works | Whoza.ai - AI Employee for Tradespeople', description: 'Learn how Rex, your AI employee, helps tradespeople improve visibility on Google, ChatGPT, and AI search tools with weekly actionable tasks.' },
  { path: '/pricing/', title: 'Pricing | Whoza.ai - Affordable AI Marketing for Tradespeople', description: 'Simple, transparent pricing for tradespeople. Get more local jobs with Rex for £99/month. No contracts, cancel anytime. GDPR compliant.' },
  { path: '/case-studies/', title: 'Case Studies | Whoza.ai - Real Results for UK Tradespeople', description: 'See how plumbers, electricians, roofers and other tradespeople are getting more local jobs through improved AI visibility with Rex.' },
  { path: '/free-score/', title: 'Free AI Visibility Score | Whoza.ai - Check Your Online Presence', description: 'Get your free AI Visibility Score in 60 seconds. See how likely your trade business is to be named and recommended on ChatGPT, Google AI, and Perplexity.' },
  { path: '/contact/', title: 'Contact Us | Whoza.ai - Get in Touch', description: 'Have questions about AI-powered visibility for tradespeople? Contact Whoza.ai for support, inquiries, or to learn more about our service.' },
  { path: '/blog/', title: 'Blog | Whoza.ai - AI Visibility Guides for Tradespeople', description: 'Expert guides on AI visibility, AEO, and digital marketing for UK plumbers, electricians, builders, and tradespeople.' },
  { path: '/trust/', title: 'Trust & Security | Whoza.ai - GDPR Compliant AI for Trades', description: 'Learn why UK tradespeople trust Whoza.ai. GDPR compliant, secure data handling, and human-approved tasks for peace of mind.' },
  { path: '/privacy/', title: 'Privacy Policy | Whoza.ai - Your Data is Protected', description: 'Read our privacy policy to learn how we protect your data. GDPR compliant AI marketing platform for UK tradespeople.' },
  { path: '/terms/', title: 'Terms of Service | Whoza.ai - Fair Terms for Tradespeople', description: 'Review our terms of service. Transparent, fair terms for UK tradespeople using our AI marketing platform.' },
];

// ─── Read base index.html ─────────────────────────────────────────────────────
const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

function generateHtml(canonicalPath, title, description) {
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  let html = baseHtml;

  // Replace canonical tag
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description.replace(/"/g, '&quot;')}" />`
  );

  // Replace og:url
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );

  // Replace og:title
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />`
  );

  // Replace og:description
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />`
  );

  // Replace twitter:title
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}" />`
  );

  // Replace twitter:description
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}" />`
  );

  return html;
}

function writeHtml(urlPath, title, description) {
  const dirPath = path.join(distDir, urlPath.replace(/^\//, ''));
  fs.mkdirSync(dirPath, { recursive: true });
  const filePath = path.join(dirPath, 'index.html');
  const html = generateHtml(urlPath, title, description);
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`  ✓ ${urlPath}`);
}

// ─── Generate all pages ───────────────────────────────────────────────────────
console.log('\n🔧 Prerendering static HTML for all routes...\n');

console.log('📄 Static pages:');
for (const page of staticPages) {
  writeHtml(page.path, page.title, page.description);
}

console.log('\n📝 Blog posts:');
for (const post of blogPosts) {
  const urlPath = `/blog/${post.slug}/`;
  writeHtml(urlPath, post.title, post.description);
}

console.log('\n🇬🇧 UK city pages:');
for (const city of ukCities) {
  const urlPath = `/uk/ai-visibility/${city.slug}/`;
  const title = `AI Visibility for Tradespeople in ${city.name} | Whoza.ai`;
  const description = `Get your AI Visibility Score in ${city.name}. Join over ${city.tradespeople.toLocaleString()} tradespeople optimising their online presence for AI search. From £59/month.`;
  writeHtml(urlPath, title, description);
}

console.log('\n🇺🇸 US city pages:');
for (const city of usCities) {
  const urlPath = `/us/ai-visibility/${city.slug}/`;
  const title = `AI Visibility for Contractors in ${city.name}, ${city.state} | Whoza.ai`;
  const description = `Get your AI Visibility Score in ${city.name}. Join over ${city.contractors.toLocaleString()} contractors optimising their online presence for AI search. From $79/month.`;
  writeHtml(urlPath, title, description);
}

console.log('\n✅ Prerender complete!\n');

// ─── Summary ──────────────────────────────────────────────────────────────────
const totalPages = staticPages.length + blogPosts.length + ukCities.length + usCities.length;
console.log(`📊 Summary:`);
console.log(`   Static pages: ${staticPages.length}`);
console.log(`   Blog posts:   ${blogPosts.length}`);
console.log(`   UK cities:    ${ukCities.length}`);
console.log(`   US cities:    ${usCities.length}`);
console.log(`   Total:        ${totalPages} pages prerendered\n`);
