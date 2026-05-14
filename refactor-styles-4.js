const fs = require('fs')
const path = require('path')

const componentsDir = path.join(__dirname, 'components', 'whoza')

// Round 4 - complex static patterns in hero.tsx and location-hero.tsx
const patterns = [
  // Hero section background
  [/style=\{\{\s*background: "linear-gradient\(135deg, #0F1729 0%, #1A1A2E 50%, #0F1729 100%\)",\s*paddingTop: "var\(--section-py-xl\)"\s*\}\}/g, 
   'className="bg-gradient-to-br from-[#0F1729] via-[#1A1A2E] to-[#0F1729] pt-[var(--section-py-xl)]"'],
  
  // Grid layouts
  [/style=\{\{\s*display: "grid",\s*gridTemplateColumns: "55% 45%",\s*gap: "clamp\(40px, 4vw, 80px\)",\s*alignItems: "start",\s*paddingBottom: 80\s*\}\}/g,
   'className="grid grid-cols-[55%_45%] gap-[clamp(40px,4vw,80px)] items-start pb-20"'],
  
  // Complex CTA button styles
  [/style=\{\{\s*display: "inline-flex",\s*alignItems: "center",\s*justifyContent: "center",\s*background: "#fff",\s*color: "#1A1A2E",\s*fontFamily: "var\(--font-inter\), Inter, system-ui, -apple-system, sans-serif",\s*fontSize: 17,\s*fontWeight: 700,\s*padding: "16px 32px",\s*borderRadius: 12,\s*textDecoration: "none",\s*border: "none",\s*cursor: "pointer",\s*minHeight: 56,\s*whiteSpace: "nowrap",\s*boxShadow: "0 4px 14px rgba\(255,255,255,0.15\)"\s*\}\}/g,
   'className="inline-flex items-center justify-center bg-white text-[#1A1A2E] font-sans text-[17px] font-bold px-8 py-4 rounded-xl no-underline border-none cursor-pointer min-h-[56px] whitespace-nowrap shadow-[0_4px_14px_rgba(255,255,255,0.15)]"'],
]

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  let original = content
  let replacements = 0
  
  for (const [pattern, replacement] of patterns) {
    const matches = content.match(pattern)
    if (matches) {
      content = content.replace(pattern, replacement)
      replacements += matches.length
    }
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`✓ ${path.basename(filePath)}: ${replacements} replacements`)
    return replacements
  }
  return 0
}

const files = fs.readdirSync(componentsDir)
  .filter(f => f.endsWith('.tsx'))
  .map(f => path.join(componentsDir, f))

let totalReplacements = 0
for (const file of files) {
  totalReplacements += processFile(file)
}

console.log(`\nTotal replacements: ${totalReplacements}`)

let remaining = 0
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8')
  const matches = content.match(/style=\{\{/g)
  if (matches) remaining += matches.length
}
console.log(`Remaining inline styles: ${remaining}`)
