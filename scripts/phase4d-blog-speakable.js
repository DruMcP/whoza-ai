#!/usr/bin/env node
/**
 * Phase 4D: Add SpeakableSpecification to blog posts
 * - Add to [slug]/page.tsx template (covers all dynamic posts)
 * - Add to top 7 static blog posts
 */

const fs = require('fs');
const path = require('path');

const speakableSchema = `,
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".post-intro", ".key-statistics"]
  }`;

// 1. Update the [slug] template (covers all dynamic blog posts)
const templatePath = '/root/.openclaw/workspace/whoza-ai-v0/app/blog/[slug]/page.tsx';
if (fs.existsSync(templatePath)) {
  let template = fs.readFileSync(templatePath, 'utf8');
  if (!template.includes('speakable')) {
    // Find BlogPosting schema and add speakable before closing bracket
    const pattern = /("articleSection"\s*:\s*"[^"]*"\s*)(\})/;
    if (template.match(pattern)) {
      template = template.replace(pattern, '$1' + speakableSchema + '$2');
      fs.writeFileSync(templatePath, template);
      console.log('✅ Updated: blog/[slug] template');
    } else {
      console.log('❌ Could not find BlogPosting schema in template');
    }
  } else {
    console.log('⏭️  Skip: blog/[slug] template (already has speakable)');
  }
}

// 2. Update static blog posts
const staticPosts = [
  '247-call-answering-uk-trades-guide-2026',
  'ai-call-answering-pricing-guide-uk-2026',
  'ai-call-answering-uk-tradespeople-definitive-guide-2026',
  'best-ai-call-answering-service-uk-2026',
  'best-ai-call-answering-service-uk-trades-2026',
  'best-ai-phone-answering-uk-trades-2026',
  'how-much-do-missed-calls-cost-uk-trades'
];

let fixed = 0;

for (const post of staticPosts) {
  const filePath = path.join('/root/.openclaw/workspace/whoza-ai-v0/app/blog', post, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Missing: ${post}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('speakable')) {
    console.log(`⏭️  Skip: ${post}`);
    continue;
  }

  // Try to find BlogPosting schema
  const pattern = /("articleSection"\s*:\s*"[^"]*"\s*)(\})/;
  if (content.match(pattern)) {
    content = content.replace(pattern, '$1' + speakableSchema + '$2');
    fs.writeFileSync(filePath, content);
    fixed++;
    console.log(`✅ Fixed: ${post}`);
  } else {
    console.log(`❌ Could not find BlogPosting schema: ${post}`);
  }
}

console.log(`\n📊 Phase 4D: ${fixed}/${staticPosts.length} static blog posts fixed`);
