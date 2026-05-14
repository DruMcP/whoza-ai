const fs = require('fs')
const path = require('path')

const file = process.argv[2] || '/root/.openclaw/workspace/whoza-ai-v0/components/whoza/hero.tsx'
let content = fs.readFileSync(file, 'utf8')
let count = 0

// Pattern 1: Trust Pills UL
content = content.replace(
  /style=\{\{\s*display:\s*"flex",\s*flexWrap:\s*"wrap",\s*gap:\s*10,\s*marginBottom:\s*24,\s*listStyle:\s*"none",\s*padding:\s*0,\s*\}\}/g,
  'className="flex flex-wrap gap-2.5 mb-6 list-none p-0"'
)

// Pattern 2: Trust Pills LI
content = content.replace(
  /style=\{\{\s*display:\s*"inline-flex",\s*alignItems:\s*"center",\s*gap:\s*6,\s*background:\s*"rgba\(255,255,255,0\.06\)",\s*color:\s*"#94A3B8",\s*fontSize:\s*13,\s*padding:\s*"8px\s*14px",\s*borderRadius:\s*20,\s*border:\s*"1px\s*solid\s*rgba\(255,255,255,0\.08\)",\s*\}\}/g,
  'className="inline-flex items-center gap-1.5 bg-white/[0.06] text-slate-400 text-[13px] px-3.5 py-2 rounded-[20px] border border-white/[0.08]"'
)

// Pattern 3: Founder Bar
content = content.replace(
  /style=\{\{\s*display:\s*"flex",\s*alignItems:\s*"center",\s*gap:\s*14,\s*padding:\s*16,\s*background:\s*"rgba\(255,255,255,0\.04\)",\s*border:\s*"1px\s*solid\s*rgba\(255,255,255,0\.08\)",\s*borderRadius:\s*12,\s*marginBottom:\s*20,\s*\}\}/g,
  'className="flex items-center gap-3.5 p-4 bg-white/[0.04] border border-white/[0.08] rounded-xl mb-5"'
)

// Pattern 4: Secondary button
content = content.replace(
  /style=\{\{\s*fontSize:\s*15,\s*color:\s*"#94A3B8",\s*fontWeight:\s*500,\s*fontFamily:\s*"var\(--font-inter\),\s*Inter,\s*system-ui,\s*-apple-system,\s*sans-serif",\s*minHeight:\s*44,\s*\}\}/g,
  'className="text-[15px] text-slate-400 font-medium font-sans min-h-[44px]"'
)

// Pattern 5: CTA Group
content = content.replace(
  /style=\{\{\s*display:\s*"flex",\s*flexDirection:\s*"column",\s*gap:\s*12,\s*marginBottom:\s*20,\s*alignItems:\s*"flex-start",\s*\}\}/g,
  'className="flex flex-col gap-3 mb-5 items-start"'
)

// Pattern 6: Stats row
content = content.replace(
  /style=\{\{\s*display:\s*"flex",\s*gap:\s*24,\s*marginTop:\s*16,\s*\}\}/g,
  'className="flex gap-6 mt-4"'
)

// Pattern 7: Stat item
content = content.replace(
  /style=\{\{\s*display:\s*"flex",\s*flexDirection:\s*"column",\s*gap:\s*2,\s*\}\}/g,
  'className="flex flex-col gap-0.5"'
)

// Pattern 8: Stat number
content = content.replace(
  /style=\{\{\s*fontSize:\s*20,\s*fontWeight:\s*700,\s*color:\s*"#fff",\s*\}\}/g,
  'className="text-xl font-bold text-white"'
)

// Pattern 9: Stat label
content = content.replace(
  /style=\{\{\s*fontSize:\s*12,\s*color:\s*"#64748B",\s*\}\}/g,
  'className="text-xs text-slate-500"'
)

// Pattern 10: Trade category pill
content = content.replace(
  /style=\{\{\s*display:\s*"inline-flex",\s*alignItems:\s*"center",\s*gap:\s*6,\s*padding:\s*"6px\s*12px",\s*background:\s*"rgba\(255,255,255,0\.05\)",\s*borderRadius:\s*20,\s*border:\s*"1px\s*solid\s*rgba\(255,255,255,0\.08\)",\s*fontSize:\s*13,\s*color:\s*"#94A3B8",\s*\}\}/g,
  'className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.05] rounded-[20px] border border-white/[0.08] text-[13px] text-slate-400"'
)

// Pattern 11: Phone mockup container
content = content.replace(
  /style=\{\{\s*position:\s*"relative",\s*zIndex:\s*10,\s*maxWidth:\s*420,\s*width:\s*"100%",\s*\}\}/g,
  'className="relative z-10 max-w-[420px] w-full"'
)

// Pattern 12: Floating label
content = content.replace(
  /style=\{\{\s*position:\s*"absolute",\s*top:\s*-12,\s*right:\s*-12,\s*background:\s*"rgba\(16,185,129,0\.2\)",\s*color:\s*"#10B981",\s*fontSize:\s*11,\s*fontWeight:\s*600,\s*padding:\s*"4px\s*8px",\s*borderRadius:\s*6,\s*\}\}/g,
  'className="absolute -top-3 -right-3 bg-emerald-500/[0.2] text-emerald-500 text-[11px] font-semibold px-2 py-1 rounded-md"'
)

fs.writeFileSync(file, content, 'utf8')

const remaining = (content.match(/style=\{\{/g) || []).length
console.log(`Remaining inline styles in ${path.basename(file)}: ${remaining}`)
