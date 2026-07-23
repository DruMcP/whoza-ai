const fs = require('fs')
const path = require('path')

const componentsDir = path.join(__dirname, 'components', 'whoza')

// Comprehensive patterns for all files
const patterns = [
  // Layout
  [/style=\{\{ display: "flex", flexDirection: "column", gap: 8 \}\}/g, 'className="flex flex-col gap-2"'],
  [/style=\{\{ display: "flex", flexDirection: "column", gap: 12 \}\}/g, 'className="flex flex-col gap-3"'],
  [/style=\{\{ display: "flex", flexDirection: "column", gap: 16 \}\}/g, 'className="flex flex-col gap-4"'],
  [/style=\{\{ display: "flex", gap: 8 \}\}/g, 'className="flex gap-2"'],
  [/style=\{\{ display: "flex", gap: 12 \}\}/g, 'className="flex gap-3"'],
  [/style=\{\{ display: "flex", gap: 16 \}\}/g, 'className="flex gap-4"'],
  [/style=\{\{ display: "flex", gap: 24 \}\}/g, 'className="flex gap-6"'],
  [/style=\{\{ display: "flex", alignItems: "center", gap: 8 \}\}/g, 'className="flex items-center gap-2"'],
  [/style=\{\{ display: "flex", alignItems: "center", gap: 12 \}\}/g, 'className="flex items-center gap-3"'],
  [/style=\{\{ display: "inline-flex", alignItems: "center", gap: 6 \}\}/g, 'className="inline-flex items-center gap-1.5"'],
  [/style=\{\{ display: "inline-flex", alignItems: "center", gap: 8 \}\}/g, 'className="inline-flex items-center gap-2"'],
  
  // Position
  [/style=\{\{ position: "relative", zIndex: 10 \}\}/g, 'className="relative z-10"'],
  [/style=\{\{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 \}\}/g, 'className="absolute inset-0"'],
  [/style=\{\{ position: "absolute", inset: 0 \}\}/g, 'className="absolute inset-0"'],
  
  // Text
  [/style=\{\{ textAlign: "center" \}\}/g, 'className="text-center"'],
  [/style=\{\{ textAlign: "left" \}\}/g, 'className="text-left"'],
  
  // Colors
  [/style=\{\{ color: "#fff" \}\}/g, 'className="text-white"'],
  [/style=\{\{ color: "#10B981" \}\}/g, 'className="text-emerald-500"'],
  [/style=\{\{ color: "#EF4444" \}\}/g, 'className="text-red-500"'],
  [/style=\{\{ color: "#94A3B8" \}\}/g, 'className="text-slate-400"'],
  [/style=\{\{ color: "#64748B" \}\}/g, 'className="text-slate-500"'],
  [/style=\{\{ color: "#6B7280" \}\}/g, 'className="text-gray-500"'],
  [/style=\{\{ color: "#FFFFFF" \}\}/g, 'className="text-white"'],
  
  // Font sizes
  [/style=\{\{ fontSize: 12 \}\}/g, 'className="text-xs"'],
  [/style=\{\{ fontSize: 13 \}\}/g, 'className="text-[13px]"'],
  [/style=\{\{ fontSize: 14 \}\}/g, 'className="text-sm"'],
  [/style=\{\{ fontSize: 16 \}\}/g, 'className="text-base"'],
  [/style=\{\{ fontSize: 18 \}\}/g, 'className="text-lg"'],
  [/style=\{\{ fontSize: 20 \}\}/g, 'className="text-xl"'],
  [/style=\{\{ fontSize: 24 \}\}/g, 'className="text-2xl"'],
  
  // Backgrounds
  [/style=\{\{ background: "#10B981" \}\}/g, 'className="bg-emerald-500"'],
  [/style=\{\{ background: "#EF4444" \}\}/g, 'className="bg-red-500"'],
  [/style=\{\{ background: "#3B82F6" \}\}/g, 'className="bg-blue-500"'],
  [/style=\{\{ background: "#F59E0B" \}\}/g, 'className="bg-amber-500"'],
  [/style=\{\{ background: "#1A1A2E" \}\}/g, 'className="bg-[#1A1A2E]"'],
  [/style=\{\{ background: "rgba\(255,255,255,0.05\)" \}\}/g, 'className="bg-white/[0.05]"'],
  [/style=\{\{ background: "rgba\(255,255,255,0.06\)" \}\}/g, 'className="bg-white/[0.06]"'],
  [/style=\{\{ background: "rgba\(255,255,255,0.1\)" \}\}/g, 'className="bg-white/10"'],
  
  // Width/Height
  [/style=\{\{ width: "100%" \}\}/g, 'className="w-full"'],
  [/style=\{\{ height: "100%" \}\}/g, 'className="h-full"'],
  [/style=\{\{ width: "100%", height: "100%" \}\}/g, 'className="w-full h-full"'],
  [/style=\{\{ minWidth: 0 \}\}/g, 'className="min-w-0"'],
  [/style=\{\{ flex: 1 \}\}/g, 'className="flex-1"'],
  [/style=\{\{ flex: 1, minWidth: 0 \}\}/g, 'className="flex-1 min-w-0"'],
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
