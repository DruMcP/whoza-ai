/**
 * Prerender Script for Whoza.ai
 * 
 * Generates static HTML files for each URL in the sitemap with correct:
 * - Canonical tags
 * - Title tags
 * - Meta descriptions
 * - Robots meta
 * - Static nav/footer links (fixes "Page has no outgoing links" - 66 URLs)
 *   Crawlers (Ahrefs, Googlebot) cannot execute JS, so the React-rendered
 *   Header/Footer are invisible to them. We inject a visually-hidden but
 *   fully-crawlable static nav block into every prerendered page body so
 *   all pages have real <a href> outgoing links in the raw HTML.
 * 
 * This runs AFTER vite build and creates individual index.html files
 * in the dist/ directory for each route.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
// ─── Config ─────────────────────────────────────────────────────────────────
// Use env var for site URL so staging builds don't leak production URLs
const baseUrl = process.env.SITE_URL || 'https://whoza.ai';

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
  { slug: 'how-uk-tradespeople-can-get-recommended-by-chatgpt-in-2026', title: 'How UK Tradespeople Can Get Recommended by ChatGPT in 2026 | Whoza.ai', description: 'Learn the proven strategies UK tradespeople use to get recommended by ChatGPT and AI assistants in 2026.', canonicalTo: 'https://whoza.ai/blog/how-uk-tradespeople-can-get-found-on-chatgpt-and-ai-search-in-2026/' },
  { slug: 'electricians-guide-to-google-ai-overviews-how-to-get-featured', title: "Electrician's Guide to Google AI Overviews: How to Get Featured | Whoza.ai", description: 'A complete guide for electricians to get featured in Google AI Overviews and win more local customers.', canonicalTo: 'https://whoza.ai/blog/electricians-guide-to-google-ai-overviews-2026/' },
  { slug: 'how-to-create-an-faq-page-that-ai-can-find-and-reference', title: 'How to Create an FAQ Page That AI Can Find and Reference | Whoza.ai', description: 'Learn how to create FAQ pages that AI search engines can easily find, parse, and reference in their answers.', canonicalTo: 'https://whoza.ai/blog/how-to-create-faq-page-ai-can-find-2026/' },
  { slug: 'ai-visibility-manchester-trades-2026-guide', title: 'AI Visibility for Manchester Tradespeople: 2026 Guide | Whoza.ai', description: 'The complete guide for Manchester plumbers, electricians, and builders to dominate AI search in 2026.' },
  { slug: 'what-is-ai-visibility-uk-tradespeople-2026', title: 'What Is AI Visibility? A Guide for UK Tradespeople in 2026 | Whoza.ai', description: 'Understand what AI visibility means for your trade business and why it matters more than traditional SEO in 2026.' },
  { slug: 'how-uk-tradespeople-get-found-ai-search-2026', title: 'How UK Tradespeople Get Found in AI Search in 2026 | Whoza.ai', description: 'Discover the exact methods UK tradespeople are using to get found and recommended by AI search engines in 2026.', canonicalTo: 'https://whoza.ai/blog/how-uk-tradespeople-can-get-found-on-chatgpt-and-ai-search-in-2026/' },
  { slug: 'best-practices-tradespeople-london-local-ai-visibility-guide', title: 'Best Practices for London Tradespeople: Local AI Visibility Guide | Whoza.ai', description: 'The definitive best practices guide for London tradespeople to improve their local AI visibility and win more clients.' },
  { slug: 'how-plumbers-can-get-found-in-chatgpt-a-step-by-step-guide', title: 'How Plumbers Can Get Found in ChatGPT: A Step-by-Step Guide | Whoza.ai', description: 'A detailed step-by-step guide for plumbers to get recommended by ChatGPT and AI search engines.', canonicalTo: 'https://whoza.ai/blog/how-plumbers-can-get-found-in-chatgpt-2026/' },
  { slug: 'how-plumbers-can-get-found-in-chatgpt-2026', title: 'How Plumbers Can Get Found in ChatGPT in 2026 | Whoza.ai', description: 'Learn how plumbers can optimise their online presence to get recommended by ChatGPT and AI assistants in 2026.' },
  { slug: 'electricians-guide-to-google-ai-overviews-2026', title: "Electrician's Guide to Google AI Overviews in 2026 | Whoza.ai", description: 'How electricians can get featured in Google AI Overviews and dominate local AI search results in 2026.' },
  { slug: 'ai-visibility-for-london-tradespeople-2026', title: 'AI Visibility for London Tradespeople in 2026 | Whoza.ai', description: 'How London plumbers, electricians, and builders can dominate AI search and get more local jobs in 2026.', canonicalTo: 'https://whoza.ai/blog/best-practices-tradespeople-london-local-ai-visibility-guide/' },
  { slug: 'how-to-create-faq-page-ai-can-find-2026', title: 'How to Create an FAQ Page AI Can Find in 2026 | Whoza.ai', description: 'Step-by-step guide to creating FAQ pages that AI search engines like ChatGPT and Perplexity will cite in 2026.' },
  { slug: 'roofers-10-step-checklist-ai-visibility-2026', title: "Roofer's 10-Step Checklist for AI Visibility in 2026 | Whoza.ai", description: 'A practical 10-step checklist for roofers to improve their AI visibility and get recommended by ChatGPT in 2026.' },
  { slug: 'why-bing-matters-for-ai-search-2026', title: 'Why Bing Matters for AI Search in 2026 | Whoza.ai', description: 'Understand why Bing is essential for AI search visibility and how to optimise your trade business for Bing in 2026.' },
  { slug: 'manchester-vs-birmingham-local-seo-strategies-2026', title: 'Manchester vs Birmingham: Local SEO Strategies for Tradespeople 2026 | Whoza.ai', description: 'Compare AI visibility strategies for tradespeople in Manchester and Birmingham, and learn which tactics work best.' },
  { slug: 'roofers-checklist-10-steps-to-ai-visibility-2026', title: "Roofer's Checklist: 10 Steps to AI Visibility in 2026 | Whoza.ai", description: 'The essential 10-step checklist every roofer needs to achieve AI visibility and win more local jobs in 2026.', canonicalTo: 'https://whoza.ai/blog/roofers-10-step-checklist-ai-visibility-2026/' },
  { slug: 'how-ai-search-engines-choose-plumber-recommendation-manchester', title: 'How AI Search Engines Choose a Plumber Recommendation in Manchester | Whoza.ai', description: 'Discover how AI search engines select which Manchester plumbers to recommend and how to be the one they choose.', canonicalTo: 'https://whoza.ai/blog/how-ai-search-engines-choose-which-local-businesses-to-recommend/' },
  { slug: 'why-ai-search-wont-recommend-your-trade-business-and-how-to-fix-it', title: "Why AI Search Won't Recommend Your Trade Business (And How to Fix It) | Whoza.ai", description: 'Understand the exact reasons AI search engines ignore your trade business and the proven fixes to get recommended.' },
  { slug: 'google-ai-overviews-stealing-clicks-guide-uk-tradespeople', title: 'Google AI Overviews Are Stealing Your Clicks: A Guide for UK Tradespeople | Whoza.ai', description: 'Learn how to turn Google AI Overviews from a threat into an opportunity for your UK trade business.' },
  { slug: 'how-ai-search-engines-rank-local-tradespeople-aeo-geo-guide-2026', title: 'How AI Search Engines Rank Local Tradespeople: The Complete AEO & GEO Guide for 2026 | Whoza.ai', description: 'Discover exactly how ChatGPT, Perplexity, and Google AI Overviews decide which plumbers, electricians, and roofers to recommend. Learn the seven proven AEO and GEO strategies to improve your AI visibility score and become the trusted answer for local trade searches in 2026.' },
  { slug: 'how-reviews-influence-ai-search-recommendations-tradespeople-2026', title: 'How Online Reviews and Ratings Influence AI Search Recommendations for Local Tradespeople | Whoza.ai', description: 'Discover why AI search engines like ChatGPT and Perplexity rely heavily on customer reviews to recommend local tradespeople. Learn the seven proven strategies to turn your review profile into a powerful AI trust signal and dominate local recommendations in 2026.' },
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

// ─── Trades ───────────────────────────────────────────────────────────────────
const trades = [
  { slug: 'plumber', name: 'Plumber', plural: 'Plumbers', description: 'Plumbers are one of the most searched-for trades in AI. When pipes burst or boilers fail, customers ask ChatGPT "Who is the best plumber near me?" — make sure AI names your business.', ukTradespeople: 85000, usTradespeople: 480000 },
  { slug: 'electrician', name: 'Electrician', plural: 'Electricians', description: 'Electricians face fierce local competition. When homeowners need rewiring or businesses need commercial electrical work, AI assistants recommend the most visible electricians. Be that electrician.', ukTradespeople: 65000, usTradespeople: 380000 },
  { slug: 'builder', name: 'Builder', plural: 'Builders', description: 'Builders and general contractors win the biggest jobs — extensions, renovations, and new builds. But AI only recommends builders with strong entity confidence. Let Rex fix that.', ukTradespeople: 120000, usTradespeople: 650000 },
  { slug: 'roofer', name: 'Roofer', plural: 'Roofers', description: "Roofing is urgent — when a roof leaks, customers need someone fast. They ask AI 'Who is the best roofer near me?' Don't let your competitor be the answer.", ukTradespeople: 32000, usTradespeople: 210000 },
  { slug: 'locksmith', name: 'Locksmith', plural: 'Locksmiths', description: "Locksmiths live and die by speed. When someone's locked out, they ask AI 'Emergency locksmith near me open now.' If you're not visible to AI, you're not visible at all.", ukTradespeople: 18000, usTradespeople: 95000 },
  { slug: 'heating-engineer', name: 'Heating Engineer', plural: 'Heating Engineers', description: "When boilers break in winter or AC fails in summer, customers need heating engineers and HVAC technicians fast. AI assistants recommend the most visible and trusted professionals.", ukTradespeople: 42000, usTradespeople: 380000 },
  { slug: 'painter-decorator', name: 'Painter & Decorator', plural: 'Painters & Decorators', description: "Painters and decorators thrive on referrals — but today's referrals come from AI. When customers ask 'Who is a reliable painter near me?' you need to be the answer.", ukTradespeople: 55000, usTradespeople: 290000 },
  { slug: 'carpenter', name: 'Carpenter', plural: 'Carpenters', description: "Carpenters and joiners create bespoke work that AI can't replicate — but AI can recommend you. When customers ask for custom kitchens or fitted wardrobes, be the carpenter AI suggests.", ukTradespeople: 38000, usTradespeople: 180000 },
  { slug: 'tiler', name: 'Tiler', plural: 'Tilers', description: "Tiling is detail work — customers want someone skilled and reliable. When they ask AI 'Who is a good tiler near me?' make sure your business is the one AI trusts.", ukTradespeople: 28000, usTradespeople: 145000 },
  { slug: 'gardener', name: 'Gardener', plural: 'Gardeners', description: "Gardeners and landscapers create outdoor spaces that customers dream about. When they ask AI 'Who is the best landscaper near me?' make sure your beautiful work gets the recognition it deserves.", ukTradespeople: 45000, usTradespeople: 220000 },
  { slug: 'window-installer', name: 'Window Installer', plural: 'Window Installers', description: "Window installers and glaziers handle some of the biggest home improvement investments. When customers ask AI about double glazing or window replacement costs, be the installer AI recommends.", ukTradespeople: 22000, usTradespeople: 115000 },
  { slug: 'bathroom-fitter', name: 'Bathroom Fitter', plural: 'Bathroom Fitters', description: "Bathroom fitting is one of the most profitable trades — but also one of the most competitive. When customers ask AI about bathroom renovation costs, make sure your business is the one AI recommends.", ukTradespeople: 25000, usTradespeople: 135000 },
  { slug: 'kitchen-fitter', name: 'Kitchen Fitter', plural: 'Kitchen Fitters', description: "Kitchen fitting represents the biggest home investment most people make. When customers ask AI 'Who is the best kitchen fitter near me?' you need to be the answer they get.", ukTradespeople: 22000, usTradespeople: 125000 },
  { slug: 'plasterer', name: 'Plasterer', plural: 'Plasterers', description: "Plasterers and drywall contractors are the foundation of every renovation. When builders and homeowners ask AI for plastering services, make sure your smooth finish gets the credit it deserves.", ukTradespeople: 28000, usTradespeople: 145000 },
  { slug: 'flooring-installer', name: 'Flooring Installer', plural: 'Flooring Installers', description: "Flooring installers transform homes room by room. When customers ask AI about hardwood, laminate, or carpet installation costs, make sure your expertise is the answer AI gives.", ukTradespeople: 24000, usTradespeople: 125000 },
  { slug: 'drainage-engineer', name: 'Drainage Engineer', plural: 'Drainage Engineers', description: "Drainage engineers and drain specialists handle the emergencies nobody else wants. When drains block or pipes collapse, customers need someone fast. Be the drainage engineer AI recommends.", ukTradespeople: 15000, usTradespeople: 75000 },
  { slug: 'gas-engineer', name: 'Gas Engineer', plural: 'Gas Engineers', description: "Gas engineers hold critical safety certifications that customers need to trust. When they ask AI for Gas Safe engineers, make sure your credentials and expertise are clearly visible.", ukTradespeople: 35000, usTradespeople: 185000 },
  { slug: 'handyman', name: 'Handyman', plural: 'Handymen', description: "Handymen are the jack-of-all-trades that every homeowner needs. When customers ask AI 'Who is a reliable handyman near me?' you need to be visible for every small job that keeps your diary full.", ukTradespeople: 48000, usTradespeople: 250000 },
  { slug: 'fencing-contractor', name: 'Fencing Contractor', plural: 'Fencing Contractors', description: "Fencing contractors protect what matters most — privacy, security, and property boundaries. When customers ask AI about fence installation costs, make sure your craftsmanship is the answer.", ukTradespeople: 18000, usTradespeople: 95000 },
  { slug: 'scaffolder', name: 'Scaffolder', plural: 'Scaffolders', description: "Scaffolders enable every other trade to work safely at height. When builders and roofers ask AI for scaffolding quotes, make sure your safety record and availability are visible.", ukTradespeople: 15000, usTradespeople: 78000 },
];

// ─── Static Pages ─────────────────────────────────────────────────────────────
const videoPageSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "How Whoza.ai Works — AI Search Optimization for Tradespeople",
  "description": "See how Rex, your AI visibility partner, helps tradespeople get found when customers ask ChatGPT, Google AI, and Perplexity for local services. Weekly 10-minute tasks that improve your AI visibility.",
  "thumbnailUrl": "https://whoza.ai/og-image.png",
  "contentUrl": "https://whoza.ai/whoza-explainer.mp4",
  "uploadDate": "2026-04-24",
  "duration": "PT60S",
  "publisher": {
    "@type": "Organization",
    "name": "Whoza.ai",
    "logo": { "@type": "ImageObject", "url": "https://whoza.ai/favicon.svg" }
  }
};

const staticPages = [
  { path: '/', title: 'Whoza.ai — See Who AI Recommends for Your Trade', description: 'Stop losing jobs to AI-recommended competitors. Rex helps plumbers, electricians, builders & 50+ trades get found when customers ask ChatGPT, Google AI & Perplexity for local services. Start your free competitor analysis.' },
  { path: '/video/', title: 'How Whoza.ai Works — Video | AI Search Optimization for Tradespeople', description: 'Watch how Rex helps tradespeople get found in ChatGPT, Google AI, and Perplexity. Weekly 10-minute tasks. 60-second explainer video.' },
  { path: '/how-it-works/', title: 'How AI Search Optimization Works for Tradespeople | Whoza.ai', description: 'Learn how Rex helps tradespeople appear in ChatGPT and AI search recommendations. Weekly 10-minute tasks that improve your AI visibility across all major platforms. No technical knowledge required.' },
  { path: '/pricing/', title: 'AI Search Optimization Pricing for Tradespeople | Whoza.ai', description: 'Simple pricing from £59/month. Get more local jobs through AI search visibility. 14-day free trial, no credit card required. No contracts, cancel anytime.' },
  { path: '/case-studies/', title: 'AI Search Optimization Results for Tradespeople | Whoza.ai', description: 'See how plumbers, electricians, roofers and other tradespeople are getting more local jobs by appearing in ChatGPT and AI search recommendations.' },
  { path: '/competitor-analysis/', title: 'Why Is My Business Not in ChatGPT? Free Competitor Analysis | Whoza.ai', description: 'Find out why AI search does not recommend your trade business. See who AI recommends for your trade in your area and get 3 quick fixes to start appearing in ChatGPT and Google AI results.' },
  // NOTE: /free-score/ was a 301 redirect to /competitor-analysis/ — do NOT prerender
  // as a separate page. It exists in _redirects for legacy URL support only.
  { path: '/start/', title: 'Start Your AI Search Optimization | Whoza.ai Free Trial', description: 'Create your free account and let Rex help your trade business appear in ChatGPT, Google AI and Perplexity recommendations. 14-day free trial, no credit card required.' },
  // NOTE: /login/ was a client-side redirect to /sign-in/ — do NOT prerender
  // Server-side 301 redirect exists in _redirects for SEO.
  // { path: '/login/', title: 'Sign In | Whoza.ai', description: 'Sign in to your Whoza.ai account to view your AI visibility tasks, reports, and competitor analysis.' },
  { path: '/sign-in/', title: 'Sign In | Whoza.ai', description: 'Sign in to your Whoza.ai account to view your AI visibility tasks, reports, and competitor analysis.' },
  { path: '/contact/', title: 'Contact Us | Whoza.ai - Get in Touch', description: 'Have questions about AI-powered visibility for tradespeople? Contact Whoza.ai for support, inquiries, or to learn more about our service.' },
  { path: '/blog/', title: 'AI Visibility Guides for Tradespeople | Whoza.ai Blog', description: 'Expert guides on AI visibility and digital marketing for plumbers, electricians, builders, and tradespeople.' },
  { path: '/trust/', title: 'Trust & Security | Whoza.ai - GDPR Compliant AI for Trades', description: 'Learn why tradespeople trust Whoza.ai. GDPR compliant, ICO registered (ZC077271), secure data handling, and human-approved tasks for peace of mind.' },
  { path: '/privacy/', title: 'Privacy Policy | Whoza.ai - Your Data is Protected', description: 'Read our privacy policy. GDPR compliant AI search optimization platform. ICO registered.' },
  { path: '/terms/', title: 'Terms of Service | Whoza.ai - Fair Terms for Tradespeople', description: 'Review our terms of service. Transparent, fair terms for tradespeople using our AI search optimization platform.' },
  { path: '/cookie-policy/', title: 'Cookie Policy | Whoza.ai', description: 'Read our cookie policy to learn how we use cookies to improve your experience on Whoza.ai.' },
  { path: '/voice/', title: 'AI Voice Agent for Tradespeople | Never Miss a Call', description: 'Your AI receptionist answers every call 24/7, books jobs into your diary, filters spam, and transfers emergencies. 14-day free trial.' },
  { path: '/voice/setup/', title: 'Set Up AI Voice Agent | Whoza.ai', description: 'Set up your AI voice receptionist in 10 minutes. No technical skills needed.' },
];

// ─── FAQPage Schema for Homepage ──────────────────────────────────────────────
// Injected into the homepage HTML so crawlers see FAQ schema without executing JS.
// This resolves Google Search Console "0 impressions" for FAQ rich results.
const homeFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is AI search optimization and why does my trade business need it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI search optimization (also called AEO or GEO) is the process of making your business discoverable by AI assistants like ChatGPT, Google AI, and Perplexity. When customers ask 'Who's the best plumber near me?' you want AI to name your business. It's the fastest-growing search channel — more people now ask AI for recommendations than use traditional Google search for local services."
      }
    },
    {
      "@type": "Question",
      "name": "Why isn't my business showing up in ChatGPT recommendations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ChatGPT and other AI engines recommend businesses based on three factors: entity clarity (consistent name, address, phone across the web), consensus (mentions on trusted sites like Checkatrade, Google Reviews), and answerability (structured FAQ content on your website). If any of these are weak, AI won't trust you enough to recommend you. Our competitor analysis shows exactly which pillar needs fixing first."
      }
    },
    {
      "@type": "Question",
      "name": "How does Rex, the AI visibility assistant, work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rex analyses your business visibility across all major AI platforms, then sends one simple weekly task (takes 10-15 minutes) to improve your Entity Confidence Score. Tasks include optimizing your Google Business Profile, fixing directory inconsistencies, and adding FAQ schema markup. You review and approve every task before completing it."
      }
    },
    {
      "@type": "Question",
      "name": "How long until I see results from AI search optimization?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most tradespeople see their first AI mentions within 4 weeks. Your competitor position and visibility metrics update monthly, showing measurable progress across all 5 pillars: Clarity, Consensus, Answerability, Safety, and Context. The key is consistency — small weekly tasks compound into significant visibility gains over 90 days."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need technical knowledge to improve my AI visibility?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not at all. Rex designs tasks specifically for non-technical business owners. Tasks are practical actions like 'Add this sentence to your Google Business description' or 'Reply to your latest review with this template.' Each task includes step-by-step instructions that anyone can follow."
      }
    },
    {
      "@type": "Question",
      "name": "How is AI search optimization different from traditional SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional SEO focuses on ranking high in Google's blue-link results. AI search optimization (AEO/GEO) focuses on becoming the business that ChatGPT and Google AI name directly as the answer. Instead of competing for position #1 on a search page, you're competing to be the single recommended answer when someone asks AI for a local tradesperson."
      }
    },
    {
      "@type": "Question",
      "name": "How is whoza.ai different from an SEO agency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike traditional SEO agencies that charge £500-2000/month and focus on backlinks and blog posts, whoza.ai costs from £59/month and focuses specifically on the signals AI engines use to recommend businesses: your Google Business Profile, directory consistency, review strategy, and FAQ content with schema markup. You do the tasks yourself with Rex's guidance, staying in complete control."
      }
    },
    {
      "@type": "Question",
      "name": "Is my data secure with whoza.ai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We're GDPR compliant and registered with the ICO (registration ZC077271). Rex never has your passwords and can't post anything without your approval. We don't collect customer data or payment details (handled securely by Stripe). You can delete your account and all data at any time."
      }
    },
    {
      "@type": "Question",
      "name": "Can I cancel my whoza.ai subscription anytime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. There are no contracts and no cancellation fees. You can cancel your subscription at any time from your account dashboard. Your data belongs to you — if you cancel, you can export everything before leaving."
      }
    }
  ]
};

// ─── Static SEO Nav Block ─────────────────────────────────────────────────────
// This block is injected into the <body> of every prerendered page.
// It is visually hidden (position:absolute; width:1px; height:1px; overflow:hidden)
// so it does not affect the visual layout, but is fully readable by crawlers.
// This resolves the Ahrefs "Page has no outgoing links" critical error across all pages.
// Uses relative URLs so staging builds don't leak production URLs.
const staticNavBlock = `
<nav aria-label="Site navigation" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;">
  <a href="/">Home</a>
  <a href="/how-it-works/">How It Works</a>
  <a href="/pricing/">Pricing</a>
  <a href="/case-studies/">Case Studies</a>
  <a href="/competitor-analysis/">Competitor Analysis</a>
  <a href="/blog/">Blog</a>
  <a href="/trust/">Trust &amp; Security</a>
  <a href="/contact/">Contact</a>
  <a href="/privacy/">Privacy Policy</a>
  <a href="/terms/">Terms of Service</a>
  <a href="/uk/ai-visibility/london/">AI Visibility London</a>
  <a href="/uk/ai-visibility/birmingham/">AI Visibility Birmingham</a>
  <a href="/uk/ai-visibility/manchester/">AI Visibility Manchester</a>
  <a href="/uk/ai-visibility/leeds/">AI Visibility Leeds</a>
  <a href="/uk/ai-visibility/glasgow/">AI Visibility Glasgow</a>
  <a href="/uk/ai-visibility/liverpool/">AI Visibility Liverpool</a>
  <a href="/uk/ai-visibility/bristol/">AI Visibility Bristol</a>
  <a href="/uk/ai-visibility/edinburgh/">AI Visibility Edinburgh</a>
  <a href="/us/ai-visibility/new-york/">AI Visibility New York</a>
  <a href="/us/ai-visibility/los-angeles/">AI Visibility Los Angeles</a>
  <a href="/us/ai-visibility/chicago/">AI Visibility Chicago</a>
  <a href="/us/ai-visibility/houston/">AI Visibility Houston</a>
  <a href="/us/ai-visibility/dallas/">AI Visibility Dallas</a>
  <a href="/trades/plumber/">AI Visibility for Plumbers</a>
  <a href="/trades/electrician/">AI Visibility for Electricians</a>
  <a href="/trades/builder/">AI Visibility for Builders</a>
  <a href="/trades/roofer/">AI Visibility for Roofers</a>
  <a href="/trades/locksmith/">AI Visibility for Locksmiths</a>
</nav>`;

// ─── Read base index.html ─────────────────────────────────────────────────────
const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

function generateHtml(urlPath, title, description, canonicalOverride = null) {
  const canonicalUrl = canonicalOverride || `${baseUrl}${urlPath}`;
  let html = baseHtml;

  // Determine page type for geo/hreflang
  const isUK = urlPath.startsWith('/uk/');
  const isUS = urlPath.startsWith('/us/');
  const isTrade = urlPath.startsWith('/trades/');
  
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

  // Update geo tags for UK/US pages
  if (isUK) {
    html = html.replace(
      /<meta name="geo\.region" content="[^"]*"\s*\/?>/,
      `<meta name="geo.region" content="GB" />`
    );
    html = html.replace(
      /<meta name="geo\.placename" content="[^"]*"\s*\/?>/,
      `<meta name="geo.placename" content="United Kingdom" />`
    );
    html = html.replace(
      /<meta property="og:locale" content="[^"]*"\s*\/?>/,
      `<meta property="og:locale" content="en_GB" />`
    );
  } else if (isUS) {
    html = html.replace(
      /<meta name="geo\.region" content="[^"]*"\s*\/?>/,
      `<meta name="geo.region" content="US" />`
    );
    html = html.replace(
      /<meta name="geo\.placename" content="[^"]*"\s*\/?>/,
      `<meta name="geo.placename" content="United States" />`
    );
    html = html.replace(
      /<meta property="og:locale" content="[^"]*"\s*\/?>/,
      `<meta property="og:locale" content="en_US" />`
    );
  }

  // Add hreflang tags for UK/US pages
  if (isUK || isUS) {
    const citySlug = urlPath.split('/').filter(Boolean).pop();
    const ukUrl = `${baseUrl}/uk/ai-visibility/${citySlug}/`;
    const usUrl = `${baseUrl}/us/ai-visibility/${citySlug}/`;
    const hreflangBlock = `\n    <link rel="alternate" hreflang="en-gb" href="${ukUrl}" />\n    <link rel="alternate" hreflang="en-us" href="${usUrl}" />\n    <link rel="alternate" hreflang="x-default" href="${ukUrl}" />`;
    html = html.replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${canonicalUrl}" />${hreflangBlock}`
    );
  } else if (isTrade) {
    const tradeSlug = urlPath.split('/')[2];
    const tradeUrl = `${baseUrl}/trades/${tradeSlug}/`;
    const hreflangBlock = `\n    <link rel="alternate" hreflang="en-gb" href="${tradeUrl}" />\n    <link rel="alternate" hreflang="en-us" href="${tradeUrl}" />\n    <link rel="alternate" hreflang="x-default" href="${tradeUrl}" />`;
    html = html.replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${canonicalUrl}" />${hreflangBlock}`
    );
  }

  // Update og:image and og:image:secure_url to use the correct domain
  html = html.replace(
    /https:\/\/whoza\.ai\/og-image\.png/g,
    `${baseUrl}/og-image.png`
  );
  html = html.replace(
    /"dateModified": "2025-12-29"/g,
    '"dateModified": "2026-04-26"'
  );

  // Inject VideoObject schema on /video page (required for Google Video indexing)
  if (urlPath === '/video/') {
    const videoScript = `\n<script type="application/ld+json">${JSON.stringify(videoPageSchema)}</script>`;
    html = html.replace('</head>', `${videoScript}\n</head>`);
  }

  // Inject FAQPage schema on homepage (fixes GSC 0 impressions for FAQ)
  if (urlPath === '/') {
    const faqScript = `\n<script type="application/ld+json">${JSON.stringify(homeFAQSchema)}</script>`;
    // Insert before closing </head> tag
    html = html.replace('</head>', `${faqScript}\n</head>`);
    // Add js-active class for CSS dual-visibility FAQ
    html = html.replace('<body>', '<body class="js-active">');
  }

  // Inject static nav block into <body> immediately after <div id="root"></div>
  // This ensures crawlers see real outgoing links in the raw HTML (fixes Ahrefs error).
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"></div>${staticNavBlock}`
  );

  return html;
}

function writeHtml(urlPath, title, description, canonicalOverride = null) {
  const dirPath = path.join(distDir, urlPath.replace(/^\//, ''));
  fs.mkdirSync(dirPath, { recursive: true });
  const filePath = path.join(dirPath, 'index.html');
  const html = generateHtml(urlPath, title, description, canonicalOverride);
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
  writeHtml(urlPath, post.title, post.description, post.canonicalTo || null);
}

console.log('\n🇬🇧 UK city pages:');
for (const city of ukCities) {
  const urlPath = `/uk/ai-visibility/${city.slug}/`;
  const title = `See Who AI Recommends in ${city.name} | Whoza.ai Competitor Analysis`;
  const description = `See who AI recommends for your trade in ${city.name}. Check your competitor and get 3 quick fixes to start appearing in ChatGPT and Google AI results.`;
  writeHtml(urlPath, title, description);
}

console.log('\n🇺🇸 US city pages:');
for (const city of usCities) {
  const urlPath = `/us/ai-visibility/${city.slug}/`;
  const title = `See Who AI Recommends in ${city.name}, ${city.state} | Whoza.ai Competitor Analysis`;
  const description = `See who AI recommends for your trade in ${city.name}, ${city.state}. Check your competitor and get 3 quick fixes to start appearing in ChatGPT and Google AI results.`;
  writeHtml(urlPath, title, description);
}

console.log('\n🔨 Trade pages:');
for (const trade of trades) {
  const urlPath = `/trades/${trade.slug}/`;
  const title = `AI Visibility for ${trade.plural} | Get Recommended by ChatGPT | Whoza.ai`;
  const description = trade.description;
  writeHtml(urlPath, title, description);
}

console.log('\n✅ Prerender complete!\n');

// ─── Summary ──────────────────────────────────────────────────────────────────
const totalPages = staticPages.length + blogPosts.length + ukCities.length + usCities.length + trades.length;
console.log(`📊 Summary:`);
console.log(`   Static pages: ${staticPages.length}`);
console.log(`   Blog posts:   ${blogPosts.length}`);
console.log(`   UK cities:    ${ukCities.length}`);
console.log(`   US cities:    ${usCities.length}`);
console.log(`   Trade pages:  ${trades.length}`);
console.log(`   Total:        ${totalPages} pages prerendered\n`);
