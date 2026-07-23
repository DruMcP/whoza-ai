const fs = require('fs')
const path = require('path')

const componentsDir = path.join(__dirname, 'components', 'whoza')

// Additional patterns round 2
const patterns = [
  // Font + color + fontFamily combos
  [/style=\{\{ fontSize: 14, color: "#9CA3AF", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" \}\}/g, 'className="text-sm text-slate-400 font-sans"'],
  [/style=\{\{ fontSize: 14, color: "#10B981", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" \}\}/g, 'className="text-sm text-emerald-500 font-sans"'],
  [/style=\{\{ fontSize: 13, color: "#64748B", fontStyle: "normal" \}\}/g, 'className="text-[13px] text-slate-500 not-italic"'],
  [/style=\{\{ fontSize: 13, color: "#10B981", fontWeight: 500 \}\}/g, 'className="text-[13px] text-emerald-500 font-medium"'],
  [/style=\{\{ fontSize: 13, color: "#10B981" \}\}/g, 'className="text-[13px] text-emerald-500"'],
  [/style=\{\{ fontSize: 12, color: "#6B7280", fontStyle: "italic" \}\}/g, 'className="text-xs text-gray-500 italic"'],
  [/style=\{\{ fontSize: 12, color: "#6B7280", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" \}\}/g, 'className="text-xs text-gray-500 font-sans"'],
  [/style=\{\{ fontSize: 12, color: "#6B7280" \}\}/g, 'className="text-xs text-gray-500"'],
  [/style=\{\{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" \}\}/g, 'className="font-sans"'],
  [/style=\{\{ fontSize: 15, color: "#94A3B8", fontWeight: 500, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" \}\}/g, 'className="text-[15px] text-slate-400 font-medium font-sans"'],
  
  // Simple colors remaining
  [/style=\{\{ color: "#fff" \}\}/g, 'className="text-white"'],
  [/style=\{\{ color: "#EF4444", fontSize: 16 \}\}/g, 'className="text-red-500 text-base"'],
  [/style=\{\{ color: "#53BDEB" \}\}/g, 'className="text-[#53BDEB]"'],
  [/style=\{\{ color: "#10B981", fontWeight: 500, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" \}\}/g, 'className="text-emerald-500 font-medium font-sans"'],
  [/style=\{\{ color: "#10B981", fontSize: 14 \}\}/g, 'className="text-emerald-500 text-sm"'],
  [/style=\{\{ color: '#10B981', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" \}\}/g, 'className="text-emerald-500 font-sans"'],
  [/style=\{\{ color: "#6B7280", minHeight: 44, minWidth: 44 \}\}/g, 'className="text-gray-500 min-h-[44px] min-w-[44px]"'],
  
  // Background combos
  [/style=\{\{ background: "rgba\(59,130,246,0.15\)", color: "#60A5FA" \}\}/g, 'className="bg-blue-500/[0.15] text-blue-400"'],
  [/style=\{\{ background: "rgba\(255,255,255,0.04\)", border: "1px solid rgba\(255,255,255,0.06\)" \}\}/g, 'className="bg-white/[0.04] border border-white/[0.06]"'],
  [/style=\{\{ background: "rgba\(239,68,68,0.15\)", color: "#EF4444" \}\}/g, 'className="bg-red-500/[0.15] text-red-500"'],
  [/style=\{\{ background: "rgba\(16,185,129,0.15\)", color: "#10B981" \}\}/g, 'className="bg-emerald-500/[0.15] text-emerald-500"'],
  [/style=\{\{ background: "rgba\(16,185,129,0.08\)", border: "1px solid rgba\(16,185,129,0.15\)" \}\}/g, 'className="bg-emerald-500/[0.08] border border-emerald-500/[0.15]"'],
  [/style=\{\{ background: "rgba\(0,0,0,0.85\)", backdropFilter: "blur\(8px\)" \}\}/g, 'className="bg-black/[0.85] backdrop-blur"'],
  [/style=\{\{ background: "linear-gradient\(135deg, #059669, #10B981\)" \}\}/g, 'className="bg-gradient-to-br from-emerald-600 to-emerald-500"'],
  [/style=\{\{ background: "#EF4444" \}\}/g, 'className="bg-red-500"'],
  [/style=\{\{ background: "#10B981" \}\}/g, 'className="bg-emerald-500"'],
  [/style=\{\{ background: "#3B82F6" \}\}/g, 'className="bg-blue-500"'],
  [/style=\{\{ background: "#F59E0B" \}\}/g, 'className="bg-amber-500"'],
  [/style=\{\{ background: "#1A1A2E" \}\}/g, 'className="bg-[#1A1A2E]"'],
  [/style=\{\{ color: "#10B981", background: "rgba\(16,185,129,0.1\)" \}\}/g, 'className="text-emerald-500 bg-emerald-500/[0.1]"'],
  
  // Border styles
  [/style=\{\{ borderTop: "1px solid rgba\(255,255,255,0.06\)" \}\}/g, 'className="border-t border-white/[0.06]"'],
  [/style=\{\{ borderLeft: "3px solid #B07D12" \}\}/g, 'className="border-l-[3px] border-[#B07D12]"'],
  [/style=\{\{ borderLeft: "3px solid #047857" \}\}/g, 'className="border-l-[3px] border-emerald-700"'],
  [/style=\{\{ borderLeftColor: "#F59E0B" \}\}/g, 'className="border-l-amber-500"'],
  [/style=\{\{ borderLeftColor: "#047857" \}\}/g, 'className="border-l-emerald-700"'],
  
  // Layout
  [/style=\{\{ display: "flex", justifyContent: "flex-end", paddingTop: 40 \}\}/g, 'className="flex justify-end pt-10"'],
  [/style=\{\{ display: "flex", alignItems: "center", gap: 12 \}\}/g, 'className="flex items-center gap-3"'],
  [/style=\{\{ flex: 1, minWidth: 0 \}\}/g, 'className="flex-1 min-w-0"'],
  [/style=\{\{ willChange: "transform" \}\}/g, 'className="will-change-transform"'],
  
  // Font size combos
  [/style=\{\{ fontSize: 13, color: "#6B7280", fontWeight: 500, minWidth: 60 \}\}/g, 'className="text-[13px] text-gray-500 font-medium min-w-[60px]"'],
  [/style=\{\{ fontSize: 13, color: "#94A3B8", margin: 0 \}\}/g, 'className="text-[13px] text-slate-400 m-0"'],
  [/style=\{\{ fontSize: 13, color: "#94A3B8", letterSpacing: "0.01em" \}\}/g, 'className="text-[13px] text-slate-400 tracking-wide"'],
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
