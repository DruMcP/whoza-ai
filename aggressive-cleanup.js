const fs = require('fs')
const path = require('path')

const componentsDir = path.join(__dirname, 'components', 'whoza')

// Multi-line patterns with flexible whitespace
const filePatterns = {
  'hero.tsx': [
    {
      pattern: /style=\{\{\s*margin:\s*0,\s*padding:\s*"16px\s*20px",\s*background:\s*"rgba\(255,255,255,0\.04\)",\s*borderLeft:\s*"3px\s*solid\s*#B07D12",\s*borderRadius:\s*"0\s*12px\s*12px\s*0",\s*\}\}/,
      replacement: 'className="m-0 px-5 py-4 bg-white/[0.04] border-l-[3px] border-[#B07D12] rounded-r-xl"'
    },
    {
      pattern: /style=\{\{\s*fontSize:\s*15,\s*fontStyle:\s*"italic",\s*color:\s*"#94A3B8",\s*lineHeight:\s*1\.5,\s*margin:\s*"0\s*0\s*10px",\s*\}\}/,
      replacement: 'className="text-[15px] italic text-slate-400 leading-relaxed mb-2.5"'
    },
    {
      pattern: /style=\{\{\s*display:\s*"flex",\s*alignItems:\s*"center",\s*gap:\s*12,\s*flexWrap:\s*"wrap",\s*\}\}/,
      replacement: 'className="flex items-center gap-3 flex-wrap"'
    },
    {
      pattern: /style=\{\{\s*fontSize:\s*13,\s*fontStyle:\s*"normal",\s*color:\s*"#6B7280",\s*\}\}/,
      replacement: 'className="text-[13px] not-italic text-gray-500"'
    },
    {
      pattern: /style=\{\{\s*width:\s*48,\s*height:\s*48,\s*borderRadius:\s*"50%",\s*overflow:\s*"hidden",\s*flexShrink:\s*0,\s*border:\s*"2px\s*solid\s*rgba\(255,255,255,0\.1\)",\s*background:\s*"#1A1A2E",\s*display:\s*"flex",\s*alignItems:\s*"center",\s*justifyContent:\s*"center",\s*\}\}/,
      replacement: 'className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white/10 bg-[#1A1A2E] flex items-center justify-center"'
    },
    {
      pattern: /style=\{\{\s*fontSize:\s*14,\s*fontWeight:\s*500,\s*color:\s*"#FFFFFF",\s*margin:\s*"0\s*0\s*4px",\s*lineHeight:\s*1\.3,\s*\}\}/,
      replacement: 'className="text-sm font-medium text-white mb-1 leading-snug"'
    },
    {
      pattern: /style=\{\{\s*fontSize:\s*12,\s*color:\s*"#64748B",\s*margin:\s*0,\s*lineHeight:\s*1\.4,\s*\}\}/,
      replacement: 'className="text-xs text-slate-500 m-0 leading-snug"'
    },
    {
      pattern: /style=\{\{\s*fontSize:\s*11,\s*color:\s*"#64748B",\s*margin:\s*0,\s*\}\}/,
      replacement: 'className="text-[11px] text-slate-500 m-0"'
    },
    {
      pattern: /style=\{\{\s*display:\s*"flex",\s*gap:\s*24,\s*marginTop:\s*16,\s*\}\}/,
      replacement: 'className="flex gap-6 mt-4"'
    },
    {
      pattern: /style=\{\{\s*display:\s*"flex",\s*flexDirection:\s*"column",\s*gap:\s*2,\s*\}\}/,
      replacement: 'className="flex flex-col gap-0.5"'
    },
    {
      pattern: /style=\{\{\s*fontSize:\s*20,\s*fontWeight:\s*700,\s*color:\s*"#fff",\s*\}\}/,
      replacement: 'className="text-xl font-bold text-white"'
    },
    {
      pattern: /style=\{\{\s*fontSize:\s*12,\s*color:\s*"#64748B",\s*\}\}/,
      replacement: 'className="text-xs text-slate-500"'
    },
  ],
  'location-hero.tsx': [
    {
      pattern: /style=\{\{\s*background:\s*"linear-gradient\(135deg,\s*#0F1729\s*0%,\s*#1A1A2E\s*50%,\s*#0F1729\s*100%\)",\s*paddingTop:\s*"var\(--section-py-xl\)",\s*paddingBottom:\s*"var\(--section-py-xl\)",\s*\}\}/,
      replacement: 'className="bg-gradient-to-br from-[#0F1729] via-[#1A1A2E] to-[#0F1729] pt-[var(--section-py-xl)] pb-[var(--section-py-xl)]"'
    },
    {
      pattern: /style=\{\{\s*display:\s*"grid",\s*gridTemplateColumns:\s*"1fr\s*1fr",\s*gap:\s*"clamp\(40px,\s*4vw,\s*80px\)",\s*alignItems:\s*"center",\s*\}\}/,
      replacement: 'className="grid grid-cols-2 gap-[clamp(40px,4vw,80px)] items-center"'
    },
    {
      pattern: /style=\{\{\s*fontFamily:\s*"var\(--font-inter\),\s*Inter,\s*system-ui,\s*-apple-system,\s*sans-serif",\s*fontSize:\s*"clamp\(32px,\s*4vw,\s*48px\)",\s*fontWeight:\s*800,\s*lineHeight:\s*1\.1,\s*letterSpacing:\s*"-0\.02em",\s*color:\s*"#fff",\s*marginBottom:\s*16\s*\}\}/,
      replacement: 'className="font-sans text-[clamp(32px,4vw,48px)] font-extrabold leading-tight tracking-tight text-white mb-4"'
    },
    {
      pattern: /style=\{\{\s*fontFamily:\s*"var\(--font-inter\),\s*Inter,\s*system-ui,\s*-apple-system,\s*sans-serif",\s*fontSize:\s*18,\s*lineHeight:\s*1\.6,\s*color:\s*"#94A3B8",\s*maxWidth:\s*480\s*\}\}/,
      replacement: 'className="font-sans text-lg leading-relaxed text-slate-400 max-w-[480px]"'
    },
    {
      pattern: /style=\{\{\s*display:\s*"inline-flex",\s*alignItems:\s*"center",\s*gap:\s*8,\s*background:\s*"#fff",\s*color:\s*"#1A1A2E",\s*fontFamily:\s*"var\(--font-inter\),\s*Inter,\s*system-ui,\s*-apple-system,\s*sans-serif",\s*fontSize:\s*16,\s*fontWeight:\s*700,\s*padding:\s*"14px\s*28px",\s*borderRadius:\s*12,\s*textDecoration:\s*"none"\s*\}\}/,
      replacement: 'className="inline-flex items-center gap-2 bg-white text-[#1A1A2E] font-sans text-base font-bold px-7 py-3.5 rounded-xl no-underline"'
    },
    {
      pattern: /style=\{\{\s*display:\s*"flex",\s*flexWrap:\s*"wrap",\s*gap:\s*10,\s*marginTop:\s*24\s*\}\}/,
      replacement: 'className="flex flex-wrap gap-2.5 mt-6"'
    },
    {
      pattern: /style=\{\{\s*display:\s*"inline-flex",\s*alignItems:\s*"center",\s*gap:\s*6,\s*padding:\s*"6px\s*12px",\s*background:\s*"rgba\(255,255,255,0\.05\)",\s*borderRadius:\s*20,\s*border:\s*"1px\s*solid\s*rgba\(255,255,255,0\.08\)",\s*fontSize:\s*13,\s*color:\s*"#94A3B8"\s*\}\}/,
      replacement: 'className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.05] rounded-[20px] border border-white/[0.08] text-[13px] text-slate-400"'
    },
    {
      pattern: /style=\{\{\s*display:\s*"grid",\s*gridTemplateColumns:\s*"repeat\(3,\s*1fr\)",\s*gap:\s*16,\s*marginTop:\s*32\s*\}\}/,
      replacement: 'className="grid grid-cols-3 gap-4 mt-8"'
    },
    {
      pattern: /style=\{\{\s*textAlign:\s*"center",\s*padding:\s*16,\s*background:\s*"rgba\(255,255,255,0\.03\)",\s*borderRadius:\s*12,\s*border:\s*"1px\s*solid\s*rgba\(255,255,255,0\.06\)"\s*\}\}/,
      replacement: 'className="text-center p-4 bg-white/[0.03] rounded-xl border border-white/[0.06]"'
    },
    {
      pattern: /style=\{\{\s*fontSize:\s*24,\s*fontWeight:\s*800,\s*color:\s*"#fff",\s*marginBottom:\s*4\s*\}\}/,
      replacement: 'className="text-2xl font-extrabold text-white mb-1"'
    },
    {
      pattern: /style=\{\{\s*fontSize:\s*12,\s*color:\s*"#64748B",\s*lineHeight:\s*1\.4\s*\}\}/,
      replacement: 'className="text-xs text-slate-500 leading-snug"'
    },
  ],
}

function processFile(filePath, patterns) {
  let content = fs.readFileSync(filePath, 'utf8')
  let original = content
  let replacements = 0

  for (const { pattern, replacement } of patterns) {
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

let totalReplacements = 0
for (const [filename, patterns] of Object.entries(filePatterns)) {
  const filePath = path.join(componentsDir, filename)
  if (fs.existsSync(filePath)) {
    totalReplacements += processFile(filePath, patterns)
  }
}

console.log(`\nTotal replacements: ${totalReplacements}`)

// Count remaining across all files
const files = fs.readdirSync(componentsDir)
  .filter(f => f.endsWith('.tsx'))
  .map(f => path.join(componentsDir, f))

let remaining = 0
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8')
  const matches = content.match(/style=\{\{/g)
  if (matches) remaining += matches.length
}
console.log(`Remaining inline styles: ${remaining}`)
