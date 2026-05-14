const fs = require('fs');
const path = require('path');

const componentsDir = '/root/.openclaw/workspace/whoza-ai-v0/components/whoza';

// Define conversions for each file
const conversions = {
  'signup-modal.tsx': [
    {
      // Modal container
      from: /style=\{\{\s*maxWidth:\s*480,\s*maxHeight:\s*"90vh",\s*background:\s*"#1E2229",\s*borderRadius:\s*16,\s*padding:\s*32,\s*\}\}/g,
      to: 'className="max-w-[480px] max-h-[90vh] bg-[#1E2229] rounded-2xl p-8"'
    },
    {
      // Input fields
      from: /style=\{\{\s*background:\s*"#111418",\s*border:\s*errors\.(\w+)\s*\?\s*"1px solid #EF4444"\s*:\s*"1px solid rgba\(255,255,255,0\.06\)",\s*color:\s*"#FFFFFF",\s*fontSize:\s*15,\s*fontFamily:\s*"Inter,\s*-apple-system,\s*BlinkMacSystemFont,\s*sans-serif",\s*\}\}/g,
      to: 'className="bg-[#111418] text-white text-[15px] font-sans border border-white/[0.06] focus:border-white/20"'
    }
  ]
};

// Just show remaining patterns
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filepath = path.join(componentsDir, file);
  const content = fs.readFileSync(filepath, 'utf8');
  const matches = content.match(/style=\{/g);
  if (matches) {
    console.log(`${file}: ${matches.length} inline styles`);
    // Show first few patterns
    const styleMatches = content.match(/style=\{[\s\S]*?\n\s*\}/g);
    if (styleMatches) {
      styleMatches.slice(0, 2).forEach((m, i) => {
        console.log(`  [${i}] ${m.substring(0, 80)}...`);
      });
    }
  }
}
