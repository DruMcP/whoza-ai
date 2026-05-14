const fs = require('fs')
const path = require('path')

const file = '/root/.openclaw/workspace/whoza-ai-v0/components/whoza/location-hero.tsx'
let content = fs.readFileSync(file, 'utf8')

// Pattern 1: Section background
content = content.replace(
  /style=\{\{\s*background:\s*"linear-gradient\(135deg,\s*#0F1729\s*0%,\s*#1A1A2E\s*50%,\s*#0F1729\s*100%\)",\s*paddingTop:\s*"var\(--section-py-xl\)",\s*paddingBottom:\s*"var\(--section-py-xl\)"\s*\}\}/g,
  'className="bg-gradient-to-br from-[#0F1729] via-[#1A1A2E] to-[#0F1729] pt-[var(--section-py-xl)] pb-[var(--section-py-xl)]"'
)

// Pattern 2: Grid layout
content = content.replace(
  /style=\{\{\s*display:\s*"grid",\s*gridTemplateColumns:\s*"1fr\s*1fr",\s*gap:\s*"clamp\(40px,\s*4vw,\s*80px\)",\s*alignItems:\s*"center"\s*\}\}/g,
  'className="grid grid-cols-2 gap-[clamp(40px,4vw,80px)] items-center"'
)

// Pattern 3: H1 styles
content = content.replace(
  /style=\{\{\s*fontFamily:\s*"var\(--font-inter\),\s*Inter,\s*system-ui,\s*-apple-system,\s*sans-serif",\s*fontSize:\s*"clamp\(32px,\s*4vw,\s*48px\)",\s*fontWeight:\s*800,\s*lineHeight:\s*1.1,\s*letterSpacing:\s*"-0.02em",\s*color:\s*"#fff",\s*marginBottom:\s*16\s*\}\}/g,
  'className="font-sans text-[clamp(32px,4vw,48px)] font-extrabold leading-tight tracking-tight text-white mb-4"'
)

// Pattern 4: Subtitle
content = content.replace(
  /style=\{\{\s*fontFamily:\s*"var\(--font-inter\),\s*Inter,\s*system-ui,\s*-apple-system,\s*sans-serif",\s*fontSize:\s*18,\s*lineHeight:\s*1.6,\s*color:\s*"#94A3B8",\s*maxWidth:\s*480\s*\}\}/g,
  'className="font-sans text-lg leading-relaxed text-slate-400 max-w-[480px]"'
)

// Pattern 5: CTA button
content = content.replace(
  /style=\{\{\s*display:\s*"inline-flex",\s*alignItems:\s*"center",\s*gap:\s*8,\s*background:\s*"#fff",\s*color:\s*"#1A1A2E",\s*fontFamily:\s*"var\(--font-inter\),\s*Inter,\s*system-ui,\s*-apple-system,\s*sans-serif",\s*fontSize:\s*16,\s*fontWeight:\s*700,\s*padding:\s*"14px\s*28px",\s*borderRadius:\s*12,\s*textDecoration:\s*"none"\s*\}\}/g,
  'className="inline-flex items-center gap-2 bg-white text-[#1A1A2E] font-sans text-base font-bold px-7 py-3.5 rounded-xl no-underline"'
)

// Pattern 6: Trust badges
content = content.replace(
  /style=\{\{\s*display:\s*"flex",\s*flexWrap:\s*"wrap",\s*gap:\s*10,\s*marginTop:\s*24\s*\}\}/g,
  'className="flex flex-wrap gap-2.5 mt-6"'
)

// Pattern 7: Trust badge item
content = content.replace(
  /style=\{\{\s*display:\s*"inline-flex",\s*alignItems:\s*"center",\s*gap:\s*6,\s*padding:\s*"6px\s*12px",\s*background:\s*"rgba\(255,255,255,0\.05\)",\s*borderRadius:\s*20,\s*border:\s*"1px\s*solid\s*rgba\(255,255,255,0\.08\)",\s*fontSize:\s*13,\s*color:\s*"#94A3B8"\s*\}\}/g,
  'className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.05] rounded-[20px] border border-white/[0.08] text-[13px] text-slate-400"'
)

// Pattern 8: Stats grid
content = content.replace(
  /style=\{\{\s*display:\s*"grid",\s*gridTemplateColumns:\s*"repeat\(3,\s*1fr\)",\s*gap:\s*16,\s*marginTop:\s*32\s*\}\}/g,
  'className="grid grid-cols-3 gap-4 mt-8"'
)

// Pattern 9: Stat card
content = content.replace(
  /style=\{\{\s*textAlign:\s*"center",\s*padding:\s*16,\s*background:\s*"rgba\(255,255,255,0\.03\)",\s*borderRadius:\s*12,\s*border:\s*"1px\s*solid\s*rgba\(255,255,255,0\.06\)"\s*\}\}/g,
  'className="text-center p-4 bg-white/[0.03] rounded-xl border border-white/[0.06]"'
)

// Pattern 10: Stat number
content = content.replace(
  /style=\{\{\s*fontSize:\s*24,\s*fontWeight:\s*800,\s*color:\s*"#fff",\s*marginBottom:\s*4\s*\}\}/g,
  'className="text-2xl font-extrabold text-white mb-1"'
)

// Pattern 11: Stat label
content = content.replace(
  /style=\{\{\s*fontSize:\s*12,\s*color:\s*"#64748B",\s*lineHeight:\s*1.4\s*\}\}/g,
  'className="text-xs text-slate-500 leading-snug"'
)

fs.writeFileSync(file, content, 'utf8')

const remaining = (content.match(/style=\{\{/g) || []).length
console.log(`Remaining inline styles in ${path.basename(file)}: ${remaining}`)
