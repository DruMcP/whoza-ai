#!/usr/bin/env node
/**
 * Phase 4C (part 2): Add SpeakableSpecification to all 4 research pages
 */

const fs = require('fs');
const path = require('path');

const researchPages = [
  'aeo-ai-search-optimisation-2026',
  'ai-voice-agents-uk-trades-2026',
  'caller-experience-revolution-ai-voice-agents-2026',
  'voice-agent-technology-state-of-art-2026'
];

const speakable = `,
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".executive-summary", ".key-findings"]
  }`;

let fixed = 0;

for (const dir of researchPages) {
  const filePath = path.join('/root/.openclaw/workspace/whoza-ai-v0/app/research', dir, 'page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('speakable')) {
    console.log(`⏭️  Skip: ${dir} (already has speakable)`);
    continue;
  }

  // Insert after the last closing bracket of keywords array, before the next property
  const pattern = /("keywords":\s*\[[\s\S]*?\]\s*)(,?\s*\n\s*"(?:mainEntityOfPage|author|publisher))/;
  const match = content.match(pattern);
  
  if (match) {
    content = content.replace(match[0], match[1] + speakable + '$2');
    fs.writeFileSync(filePath, content);
    fixed++;
    console.log(`✅ Fixed: ${dir}`);
  } else {
    console.log(`❌ Could not find keywords array in: ${dir}`);
  }
}

console.log(`\n📊 Phase 4C part 2: ${fixed}/${researchPages.length} research pages fixed`);
