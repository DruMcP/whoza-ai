#!/usr/bin/env node
/**
 * Post-build script to inject page-specific SEO meta tags into pre-rendered HTML files
 * This ensures search engine crawlers see the correct meta tags without JavaScript execution
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SEO configuration - must match src/utils/seoConfig.js
const seoConfig = {
  '/': {
    title: 'AI for Tradespeople | Whoza.ai - Get More Local Jobs with Rex',
    description: 'Rex is your AI employee that helps plumbers, electricians, roofers, builders and 50+ trades get more local jobs when customers ask AI for a tradesperson. GDPR compliant.',
  },
  '/how-it-works': {
    title: 'How It Works | Whoza.ai - AI Employee for Tradespeople',
    description: 'Learn how Rex, your AI employee, helps tradespeople improve visibility on Google, ChatGPT, and AI search tools with weekly actionable tasks.',
  },
  '/pricing': {
    title: 'Pricing | Whoza.ai - Affordable AI Marketing for Tradespeople',
    description: 'Simple, transparent pricing for tradespeople. Monitor from £19/month, Improve from £59/month. No contracts, cancel anytime. GDPR compliant.',
  },
  '/trust': {
    title: 'Trust & Security | Whoza.ai - GDPR Compliant AI for Trades',
    description: 'Learn why UK tradespeople trust Whoza.ai. GDPR compliant, secure data handling, and human-approved tasks for peace of mind.',
  },
  '/case-studies': {
    title: 'Case Studies | Whoza.ai - Real Results for UK Tradespeople',
    description: 'See how plumbers, electricians, roofers and other tradespeople are getting more local jobs through improved AI visibility with Rex.',
  },
  '/free-score': {
    title: 'Free Visibility Confidence Score™ | Whoza.ai - Check Your Online Presence',
    description: 'Get your free Visibility Confidence Score™ in 60 seconds. See how likely your trade business is to be named and recommended on ChatGPT, Google AI, and Perplexity.',
  },
  '/start': {
    title: 'Get Started | Whoza.ai - Start Getting More Local Jobs Today',
    description: 'Create your free Whoza.ai account and let Rex help your trade business get found by more local customers on AI search tools.',
  },
  '/contact': {
    title: 'Contact Us | Whoza.ai - Get in Touch',
    description: 'Contact the Whoza.ai team. We are here to help UK tradespeople get found by AI search tools and grow their business.',
  },
  '/privacy': {
    title: 'Privacy Policy | Whoza.ai - Your Data is Protected',
    description: 'Read our privacy policy to learn how we protect your data. GDPR compliant AI marketing platform for UK tradespeople.',
  },
  '/terms': {
    title: 'Terms of Service | Whoza.ai - Fair Terms for Tradespeople',
    description: 'Review our terms of service. Transparent, fair terms for UK tradespeople using our AI marketing platform.',
  },
  '/blog': {
    title: 'AI Visibility Blog for UK Tradespeople | Whoza.ai',
    description: 'Expert guides on AI visibility, Answer Engine Optimization (AEO), and digital marketing for UK plumbers, electricians, builders, and tradespeople.',
  },
  '/signin': {
    title: 'Sign In | Whoza.ai - Access Your Dashboard',
    description: 'Sign in to your Whoza.ai account to access your AI visibility dashboard, tasks, and reports.',
  },
};

const distDir = path.join(__dirname, '..', 'dist');
const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

function injectMetaTags(html, route) {
  const seo = seoConfig[route] || seoConfig['/'];
  const { title, description } = seo;
  const canonicalUrl = `https://whoza.ai${route === '/' ? '' : route}`;

  let modifiedHtml = html;

  // Update title
  modifiedHtml = modifiedHtml.replace(
    /<title>[^<]*<\/title>/,
    `<title>${title}</title>`
  );

  // Update meta description
  modifiedHtml = modifiedHtml.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${description}"`
  );

  // Update Open Graph tags
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${title}"`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${description}"`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonicalUrl}"`
  );

  // Update Twitter tags
  modifiedHtml = modifiedHtml.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${title}"`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${description}"`
  );

  // Add or update canonical link
  if (modifiedHtml.includes('<link rel="canonical"')) {
    modifiedHtml = modifiedHtml.replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${canonicalUrl}"`
    );
  } else {
    modifiedHtml = modifiedHtml.replace(
      '</head>',
      `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`
    );
  }

  return modifiedHtml;
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

console.log('🔍 Injecting SEO meta tags into HTML files...\n');

// Process each route
for (const [route, seo] of Object.entries(seoConfig)) {
  const routePath = route === '/' ? '' : route;
  const dirPath = path.join(distDir, routePath);
  const filePath = path.join(dirPath, 'index.html');

  ensureDir(dirPath);

  const modifiedHtml = injectMetaTags(templateHtml, route);
  fs.writeFileSync(filePath, modifiedHtml);

  console.log(`✅ ${route} -> ${filePath}`);
  console.log(`   Title: ${seo.title}`);
  console.log(`   Description: ${seo.description.substring(0, 60)}...`);
  console.log('');
}

console.log('✨ SEO meta tag injection complete!');
