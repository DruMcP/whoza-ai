/**
 * Sitemap Generator for Whoza.ai
 * 
 * Generates sitemap.xml dynamically from the same data sources as prerender.mjs
 * Uses SITE_URL env var for the base URL (staging vs production)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const baseUrl = process.env.SITE_URL || 'https://whoza.ai';

// ─── Data (mirrors prerender.mjs) ─────────────────────────────────────────────
const staticPages = [
  { path: '/', title: 'Whoza.ai — AI Visibility for UK Tradespeople', description: 'Get recommended by ChatGPT, Google AI, and Perplexity. AI voice agent, visibility scoring, and weekly action plans for plumbers, electricians, and tradespeople.', changefreq: 'weekly', priority: '1.0' },
  { path: '/video/', title: 'See How AI Recommends Your Trade Business | Whoza.ai', description: 'Watch how AI search engines choose which trade businesses to recommend. See real examples and understand what makes your business visible.', changefreq: 'monthly', priority: '0.9' },
  { path: '/competitor-analysis/', title: 'Free AI Visibility Competitor Analysis | Whoza.ai', description: 'See who AI recommends for your trade in your area. Get a free competitor analysis and discover how to get recommended by ChatGPT and Google AI.', changefreq: 'weekly', priority: '1.0' },
  { path: '/pricing/', title: 'Pricing — Plans from £59/month inc VAT | Whoza.ai', description: 'Four plans for tradespeople: Core £59/mo, Pro £99/mo, Growth £169/mo, Unlimited £249/mo. All inc VAT. AI visibility, voice agent, WhatsApp, calendar sync. 14-day free trial.', changefreq: 'weekly', priority: '0.9' },
  { path: '/how-it-works/', title: 'How Whoza.ai Works | AI Visibility for Tradespeople', description: 'Learn how Whoza.ai helps tradespeople get found by AI search engines. Simple weekly tasks, AI voice agent, and monthly visibility reports.', changefreq: 'weekly', priority: '0.9' },
  { path: '/trust/', title: 'Trust & Privacy | Whoza.ai', description: 'GDPR compliant, ICO registered (ZC077271), secure data handling, and human-approved tasks for peace of mind.', changefreq: 'monthly', priority: '0.7' },
  { path: '/start/', title: 'Start Your Free Trial | Whoza.ai', description: 'Start your 14-day free trial. Full access to every feature. No credit card required.', changefreq: 'weekly', priority: '0.9' },
  { path: '/terms/', title: 'Terms of Service | Whoza.ai', description: 'Terms of service for Whoza.ai. Read our terms before using our AI visibility platform for tradespeople.', changefreq: 'yearly', priority: '0.3' },
  { path: '/privacy/', title: 'Privacy Policy | Whoza.ai', description: 'Privacy policy for Whoza.ai. Learn how we protect your data and comply with GDPR.', changefreq: 'yearly', priority: '0.3' },
  { path: '/cookie-policy/', title: 'Cookie Policy | Whoza.ai', description: 'Cookie policy for Whoza.ai. Learn about the cookies we use and how to manage your preferences.', changefreq: 'yearly', priority: '0.3' },
  { path: '/blog/', title: 'AI Visibility Blog for Tradespeople | Whoza.ai', description: 'Expert guides on AI search visibility for UK tradespeople. Learn how to get recommended by ChatGPT, Google AI, and Perplexity.', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact/', title: 'Contact Whoza.ai | Support & Sales', description: 'Contact the Whoza.ai team for support, sales, or partnership enquiries.', changefreq: 'yearly', priority: '0.5' },
  { path: '/voice/', title: 'AI Voice Agent for Tradespeople | Whoza.ai', description: 'Never miss another job enquiry. 24/7 AI call answering, WhatsApp summaries, calendar booking, emergency patch-through, and spam filtering.', changefreq: 'weekly', priority: '0.9' },
];

const blogPosts = [
  'top-10-ai-visibility-strategies-uk-tradespeople-2026',
  'uk-trades-business-playbook-ai-search-visibility-2026',
  'us-contractors-guide-ai-search-visibility-2026',
  'why-bing-matters-for-ai-search-the-perplexity-connection',
  'how-ai-search-engines-choose-which-local-businesses-to-recommend',
  'the-ultimate-guide-to-google-business-profile-optimization-for-ai-search-2026',
  'why-your-business-isnt-showing-up-in-chatgpt-recommendations-and-how-to-fix-it',
  'how-uk-tradespeople-can-get-found-on-chatgpt-and-ai-search-in-2026',
  'how-uk-tradespeople-can-get-recommended-by-chatgpt-in-2026',
  'electricians-guide-to-google-ai-overviews-how-to-get-featured',
  'how-to-create-an-faq-page-that-ai-can-find-and-reference',
  'ai-visibility-manchester-trades-2026-guide',
  'what-is-ai-visibility-uk-tradespeople-2026',
  'how-uk-tradespeople-get-found-ai-search-2026',
  'best-practices-tradespeople-london-local-ai-visibility-guide',
  'how-plumbers-can-get-found-in-chatgpt-a-step-by-step-guide',
  'how-plumbers-can-get-found-in-chatgpt-2026',
  'electricians-guide-to-google-ai-overviews-2026',
  'ai-visibility-for-london-tradespeople-2026',
  'how-to-create-faq-page-ai-can-find-2026',
  'roofers-10-step-checklist-ai-visibility-2026',
  'why-bing-matters-for-ai-search-2026',
  'manchester-vs-birmingham-local-seo-strategies-2026',
  'roofers-checklist-10-steps-to-ai-visibility-2026',
  'how-ai-search-engines-choose-plumber-recommendation-manchester',
  'why-ai-search-wont-recommend-your-trade-business-and-how-to-fix-it',
  'google-ai-overviews-stealing-clicks-guide-uk-tradespeople',
  'how-ai-search-engines-rank-local-tradespeople-aeo-geo-guide-2026',
  'how-reviews-influence-ai-search-recommendations-tradespeople-2026',
];

const ukCities = [
  'london', 'birmingham', 'manchester', 'leeds', 'glasgow', 'liverpool',
  'newcastle', 'sheffield', 'bristol', 'edinburgh', 'leicester', 'nottingham',
  'cardiff', 'coventry', 'southampton', 'bradford'
];

const usCities = [
  { slug: 'new-york', state: 'NY' },
  { slug: 'los-angeles', state: 'CA' },
  { slug: 'chicago', state: 'IL' },
  { slug: 'houston', state: 'TX' },
  { slug: 'phoenix', state: 'AZ' },
  { slug: 'philadelphia', state: 'PA' },
  { slug: 'san-antonio', state: 'TX' },
  { slug: 'san-diego', state: 'CA' },
  { slug: 'dallas', state: 'TX' },
  { slug: 'san-jose', state: 'CA' },
  { slug: 'austin', state: 'TX' },
  { slug: 'jacksonville', state: 'FL' },
  { slug: 'fort-worth', state: 'TX' },
  { slug: 'columbus', state: 'OH' },
  { slug: 'charlotte', state: 'NC' },
];

const trades = [
  'plumber', 'electrician', 'builder', 'decorator', 'painter',
  'carpenter', 'joiner', 'roofer', 'plasterer', 'landscaper',
  'gardener', 'locksmith', 'heating-engineer', 'gas-fitter', 'tiler',
  'flooring-specialist', 'kitchen-fitter', 'bathroom-fitter',
  'handyman', 'glazier', 'window-fitter', 'driveway-specialist',
  'fence-installer', 'loft-conversion', 'extensions-builder',
  'conservatory-installer', 'solar-panel-installer', 'heat-pump-installer',
  'ev-charger-installer', 'scaffolding-contractor', 'plasterer-drywall',
  'stonemason', 'bricklayer', 'damp-proofing-specialist', 'pest-control',
  'drainage-engineer', 'tree-surgeon', 'garden-designer', 'patio-installer',
  'decking-installer', 'fencing-contractor', 'landscaping-contractor',
  'driveway-contractor', 'tarmac-contractor', 'asphalt-contractor',
  'concreting-specialist', 'groundworker', 'excavation-contractor',
  'demolition-contractor', 'waste-removal', 'skip-hire', 'cleaning-service',
  'carpet-cleaner', 'upholstery-cleaner', 'window-cleaner', 'oven-cleaner',
  'pressure-washer', 'gutter-cleaner', 'chimney-sweep', 'fireplace-installer',
  'stove-installer', 'boiler-engineer', 'underfloor-heating',
  'radiator-installer', 'plumbing-heating', 'gas-engineer', 'oil-engineer',
  'renewable-energy', 'solar-installer', 'battery-storage',
  'air-conditioning', 'ventilation-engineer', 'refrigeration-engineer',
  'catering-equipment', 'commercial-kitchen', 'restaurant-fitter',
  'shop-fitter', 'office-fitter', 'industrial-flooring', 'epoxy-flooring',
  'polished-concrete', 'resin-flooring', 'carpet-fitter', 'vinyl-fitter',
  'laminate-fitter', 'wood-flooring', 'parquet-flooring', 'sports-flooring',
  'rubber-flooring', 'medical-flooring', 'antistatic-flooring',
  'acoustic-flooring', 'underfloor-heating-installer', 'bathroom-designer',
  'kitchen-designer', 'interior-designer', 'architect', 'surveyor',
  'structural-engineer', 'planning-consultant', 'building-inspector',
  'party-wall-surveyor', 'quantity-surveyor', 'project-manager',
  'construction-manager', 'site-manager', 'foreman', 'labourer', 'subcontractor',
  'general-contractor', 'specialist-contractor', 'design-build',
  'turnkey-contractor', 'maintenance-contractor', 'facilities-management',
  'property-maintenance', 'block-management', 'estate-management',
  'housing-association', 'local-authority', 'council-contractor',
  'framework-contractor', 'approved-contractor', 'accredited-contractor',
  ' insured-contractor', 'guaranteed-contractor', 'warranty-contractor',
  'emergency-contractor', '24-hour-contractor', 'out-of-hours-contractor',
];

// ─── Generate sitemap ─────────────────────────────────────────────────────────
const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Static pages
for (const page of staticPages) {
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}${page.path}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += `  </url>\n`;
}

// Blog posts
for (const slug of blogPosts) {
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/blog/${slug}/</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.7</priority>\n`;
  xml += `  </url>\n`;
}

// UK city pages
for (const slug of ukCities) {
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/uk/ai-visibility/${slug}/</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.6</priority>\n`;
  xml += `  </url>\n`;
}

// US city pages
for (const city of usCities) {
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/us/ai-visibility/${city.slug}/</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.6</priority>\n`;
  xml += `  </url>\n`;
}

// Trade pages
for (const slug of trades) {
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/trades/${slug}/</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.6</priority>\n`;
  xml += `  </url>\n`;
}

xml += `</urlset>\n`;

// Write to dist/
fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');

const totalUrls = staticPages.length + blogPosts.length + ukCities.length + usCities.length + trades.length;
console.log(`✅ Sitemap generated: ${totalUrls} URLs using base ${baseUrl}`);
