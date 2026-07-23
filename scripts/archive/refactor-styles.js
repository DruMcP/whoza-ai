const fs = require('fs')
const path = require('path')

const componentsDir = path.join(__dirname, 'components', 'whoza')

// Define replacement patterns: [regex, replacement]
const patterns = [
  // Simple colors
  [/style=\{\{ color: "#EF4444" \}\}/g, 'className="text-red-500"'],
  [/style=\{\{ color: "#10B981" \}\}/g, 'className="text-emerald-500"'],
  [/style=\{\{ color: "#3B82F6" \}\}/g, 'className="text-blue-500"'],
  [/style=\{\{ color: "#F59E0B" \}\}/g, 'className="text-amber-500"'],
  [/style=\{\{ color: "#FFFFFF" \}\}/g, 'className="text-white"'],
  [/style=\{\{ color: "#D63031" \}\}/g, 'className="text-[#D63031]"'],
  [/style=\{\{ color: "#9CA3AF" \}\}/g, 'className="text-slate-400"'],
  [/style=\{\{ color: "#94A3B8" \}\}/g, 'className="text-slate-400"'],
  [/style=\{\{ color: "#6B7280" \}\}/g, 'className="text-gray-500"'],
  [/style=\{\{ color: "#64748B" \}\}/g, 'className="text-slate-500"'],
  [/style=\{\{ color: "#D1D5DB" \}\}/g, 'className="text-gray-300"'],
  [/style=\{\{ color: "#555555" \}\}/g, 'className="text-[#555555]"'],
  
  // Simple layouts
  [/style=\{\{ textAlign: "center" \}\}/g, 'className="text-center"'],
  [/style=\{\{ display: "block" \}\}/g, 'className="block"'],
  [/style=\{\{ transform: 'translateY\(-50%\)' \}\}/g, 'className="-translate-y-1/2"'],
  [/style=\{\{ minWidth: 0 \}\}/g, 'className="min-w-0"'],
  [/style=\{\{ maxWidth: 540 \}\}/g, 'className="max-w-[540px]"'],
  [/style=\{\{ fontSize: 20 \}\}/g, 'className="text-xl"'],
  [/style=\{\{ marginBottom: "2px" \}\}/g, 'className="mb-0.5"'],
  [/style=\{\{ scrollBehavior: "smooth" \}\}/g, 'className="scroll-smooth"'],
  [/style=\{\{ objectFit: "contain" \}\}/g, 'className="object-contain"'],
  
  // Font + color combos
  [/style=\{\{ fontSize: 13, color: "#FFFFFF" \}\}/g, 'className="text-[13px] text-white"'],
  [/style=\{\{ fontSize: 13, color: "#94A3B8" \}\}/g, 'className="text-[13px] text-slate-400"'],
  [/style=\{\{ fontSize: 13, color: "#6B7280" \}\}/g, 'className="text-[13px] text-gray-500"'],
  [/style=\{\{ fontSize: 13, color: "#F59E0B" \}\}/g, 'className="text-[13px] text-amber-500"'],
  [/style=\{\{ fontSize: 13, color: "#D1D5DB" \}\}/g, 'className="text-[13px] text-gray-300"'],
  [/style=\{\{ fontSize: 13, color: "#64748B" \}\}/g, 'className="text-[13px] text-slate-500"'],
  [/style=\{\{ fontSize: 14, color: "#9CA3AF" \}\}/g, 'className="text-sm text-slate-400"'],
  [/style=\{\{ fontSize: 14, color: "#FFFFFF" \}\}/g, 'className="text-sm text-white"'],
  [/style=\{\{ fontSize: 14, color: "#10B981" \}\}/g, 'className="text-sm text-emerald-500"'],
  [/style=\{\{ fontSize: 15, color: "#94A3B8" \}\}/g, 'className="text-[15px] text-slate-400"'],
  [/style=\{\{ fontSize: 17, color: "#94A3B8" \}\}/g, 'className="text-[17px] text-slate-400"'],
  [/style=\{\{ fontSize: 17, fontWeight: 600, color: "#FFFFFF" \}\}/g, 'className="text-[17px] font-semibold text-white"'],
  [/style=\{\{ fontSize: 18, color: "#9CA3AF" \}\}/g, 'className="text-lg text-slate-400"'],
  [/style=\{\{ fontSize: 20, fontWeight: 700, color: "#10B981" \}\}/g, 'className="text-xl font-bold text-emerald-500"'],
  [/style=\{\{ fontSize: 20, fontWeight: 700, color: "#3B82F6" \}\}/g, 'className="text-xl font-bold text-blue-500"'],
  [/style=\{\{ fontSize: 20, fontWeight: 700, color: "#F59E0B" \}\}/g, 'className="text-xl font-bold text-amber-500"'],
  [/style=\{\{ fontSize: 12, color: "#94A3B8", marginTop: 4 \}\}/g, 'className="text-xs text-slate-400 mt-1"'],
  [/style=\{\{ fontSize: 12, color: "#6B7280", fontVariantNumeric: "tabular-nums" \}\}/g, 'className="text-xs text-gray-500 tabular-nums"'],
  [/style=\{\{ fontSize: 12, color: "#EF4444", marginTop: 4 \}\}/g, 'className="text-xs text-red-500 mt-1"'],
  [/style=\{\{ fontSize: 13, color: "#6B7280", fontWeight: 500, minWidth: 60 \}\}/g, 'className="text-[13px] text-gray-500 font-medium min-w-[60px]"'],
  [/style=\{\{ fontSize: 13, color: "#94A3B8", margin: 0 \}\}/g, 'className="text-[13px] text-slate-400 m-0"'],
  [/style=\{\{ fontSize: 13, color: "#94A3B8", letterSpacing: "0.01em" \}\}/g, 'className="text-[13px] text-slate-400 tracking-wide"'],
  [/style=\{\{ fontSize: 13, color: "#FFFFFF", fontWeight: 600 \}\}/g, 'className="text-[13px] text-white font-semibold"'],
  
  // Background patterns
  [/style=\{\{ background: "rgba\(255,255,255,0.1\)" \}\}/g, 'className="bg-white/10"'],
  [/style=\{\{ background: "rgba\(255,255,255,0.06\)" \}\}/g, 'className="bg-white/[0.06]"'],
  [/style=\{\{ background: "rgba\(255,255,255,0.04\)" \}\}/g, 'className="bg-white/[0.04]"'],
  [/style=\{\{ background: "rgba\(16,185,129,0.08\)", filter: "blur\(120px\)" \}\}/g, 'className="bg-emerald-500/[0.08] blur-[120px]"'],
  [/style=\{\{ background: "rgba\(16,185,129,0.05\)", filter: "blur\(100px\)" \}\}/g, 'className="bg-emerald-500/[0.05] blur-[100px]"'],
  [/style=\{\{ background: "rgba\(0,0,0,0.7\)", backdropFilter: "blur\(8px\)" \}\}/g, 'className="bg-black/70 backdrop-blur"'],
  [/style=\{\{ background: "linear-gradient\(135deg, #059669, #10B981\)", minHeight: 44 \}\}/g, 'className="bg-gradient-to-br from-emerald-600 to-emerald-500 min-h-[44px]"'],
  
  // Border + color
  [/style=\{\{ color: "#FFFFFF", minHeight: 44, minWidth: 44 \}\}/g, 'className="text-white min-h-[44px] min-w-[44px]"'],
  [/style=\{\{ color: "#9CA3AF", minHeight: 48, minWidth: 48 \}\}/g, 'className="text-slate-400 min-h-[48px] min-w-[48px]"'],
  [/style=\{\{ color: "#6B7280", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" \}\}/g, 'className="text-gray-500 font-sans"'],
  [/style=\{\{ color: "#FFFFFF", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" \}\}/g, 'className="text-white font-sans"'],
  [/style=\{\{ color: "#10B981", textDecoration: "none" \}\}/g, 'className="text-emerald-500 no-underline"'],
  [/style=\{\{ color: "#D63031", fontWeight: 700 \}\}/g, 'className="text-[#D63031] font-bold"'],
  [/style=\{\{ color: "#10B981", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" \}\}/g, 'className="text-emerald-500 font-sans"'],
  [/style=\{\{ color: "#9CA3AF", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" \}\}/g, 'className="text-slate-400 font-sans"'],
  [/style=\{\{ color: "#64748B", fontStyle: "normal" \}\}/g, 'className="text-slate-500 not-italic"'],
  [/style=\{\{ fontSize: 13, color: "#9CA3AF", marginBottom: 4 \}\}/g, 'className="text-[13px] text-slate-400 mb-1"'],
  [/style=\{\{ fontSize: 13, color: "#FFFFFF", fontWeight: 600 \}\}/g, 'className="text-[13px] text-white font-semibold"'],
  [/style=\{\{ fontSize: "13px" \}\}/g, 'className="text-[13px]"'],
  [/style=\{\{ fontSize: 15, color: "#94A3B8", fontWeight: 500, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" \}\}/g, 'className="text-[15px] text-slate-400 font-medium font-sans"'],
  [/style=\{\{ fontSize: 13, color: "#94A3B8", fontWeight: 500, minWidth: 60 \}\}/g, 'className="text-[13px] text-slate-400 font-medium min-w-[60px]"'],
  [/style=\{\{ display: "block", color: "#D63031" \}\}/g, 'className="block text-[#D63031]"'],
  [/style=\{\{ display: "block", color: "#10B981" \}\}/g, 'className="block text-emerald-500"'],
  
  // Complex backgrounds in location-hero
  [/style=\{\{ background: "rgba\(16,185,129,0.15\)", border: "1px solid rgba\(16,185,129,0.3\)", color: "#10B981" \}\}/g, 'className="bg-emerald-500/[0.15] border border-emerald-500/[0.3] text-emerald-500"'],
  [/style=\{\{ background: "rgba\(255,255,255,0.06\)", color: "#94A3B8" \}\}/g, 'className="bg-white/[0.06] text-slate-400"'],
  [/style=\{\{ background: "rgba\(255,255,255,0.1\)", border: "1px solid rgba\(255,255,255,0.2\)" \}\}/g, 'className="bg-white/10 border border-white/20"'],
  [/style=\{\{ background: "#1A1A2E", border: "2px solid rgba\(255,255,255,0.1\)" \}\}/g, 'className="bg-[#1A1A2E] border-2 border-white/10"'],
  [/style=\{\{ background: "#10B981", fontSize: 10, fontWeight: 600, color: "#FFFFFF" \}\}/g, 'className="bg-emerald-500 text-[10px] font-semibold text-white"'],
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

// Get all .tsx files in components/whoza/
const files = fs.readdirSync(componentsDir)
  .filter(f => f.endsWith('.tsx'))
  .map(f => path.join(componentsDir, f))

let totalReplacements = 0
for (const file of files) {
  totalReplacements += processFile(file)
}

console.log(`\nTotal replacements: ${totalReplacements}`)

// Count remaining inline styles
let remaining = 0
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8')
  const matches = content.match(/style=\{\{/g)
  if (matches) remaining += matches.length
}
console.log(`Remaining inline styles: ${remaining}`)
