#!/usr/bin/env node
/**
 * Phase 4D (part 2): Add BlogPosting schema with speakable to static blog posts
 */

const fs = require('fs');
const path = require('path');

const staticPosts = [
  { dir: '247-call-answering-uk-trades-guide-2026', title: '247 Call Answering UK Trades Guide 2026', desc: 'Complete guide to 24/7 call answering for UK tradespeople.' },
  { dir: 'ai-call-answering-pricing-guide-uk-2026', title: 'AI Call Answering Pricing Guide UK 2026', desc: 'Pricing guide for AI call answering services in the UK.' },
  { dir: 'ai-call-answering-uk-tradespeople-definitive-guide-2026', title: 'AI Call Answering UK Tradespeople Definitive Guide 2026', desc: 'Definitive guide to AI call answering for UK tradespeople.' },
  { dir: 'best-ai-call-answering-service-uk-2026', title: 'Best AI Call Answering Service UK 2026', desc: 'Independent comparison of the best AI call answering services in the UK.' },
  { dir: 'best-ai-call-answering-service-uk-trades-2026', title: 'Best AI Call Answering Service UK Trades 2026', desc: 'Comparison of AI call answering services for UK trades.' },
  { dir: 'best-ai-phone-answering-uk-trades-2026', title: 'Best AI Phone Answering UK Trades 2026', desc: 'Comparison of AI phone answering services for UK trades.' },
  { dir: 'how-much-do-missed-calls-cost-uk-trades', title: 'How Much Do Missed Calls Cost UK Trades', desc: 'Analysis of the true cost of missed calls for UK tradespeople.' },
];

let fixed = 0;

for (const post of staticPosts) {
  const filePath = path.join('/root/.openclaw/workspace/whoza-ai-v0/app/blog', post.dir, 'page.tsx');
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('BlogPosting')) {
    console.log(`⏭️ Skip: ${post.dir}`);
    continue;
  }

  const schema = `
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "${post.title}",
            "description": "${post.desc}",
            "image": "https://whoza.ai/og-image.webp",
            "datePublished": "2026-06-20",
            "dateModified": "2026-06-20",
            "author": { "@type": "Organization", "name": "whoza.ai", "url": "https://whoza.ai" },
            "publisher": { "@type": "Organization", "name": "whoza.ai", "url": "https://whoza.ai" },
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": [".post-intro", ".key-statistics"]
            }
          })
        }}
      />
`;

  // Insert before closing </>
  const pattern = /(<Footer \/>\s*<\/div>\s*)/;
  if (content.match(pattern)) {
    content = content.replace(pattern, schema + '$1');
    fs.writeFileSync(filePath, content);
    fixed++;
    console.log(`✅ Fixed: ${post.dir}`);
  } else {
    console.log(`❌ Could not find insertion point: ${post.dir}`);
  }
}

console.log(`\n📊 Phase 4D part 2: ${fixed}/${staticPosts.length} static blog posts fixed`);
