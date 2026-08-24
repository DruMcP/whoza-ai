#!/usr/bin/env node
// scripts/gen-trade-cities.mjs — scan app/for-*-*/page.tsx and rebuild registry
import { readdir, readFile, writeFile } from "fs/promises"
import { join } from "path"

const appDir = new URL("../app", import.meta.url).pathname
const outFile = new URL("../lib/trade-city-pages.ts", import.meta.url).pathname

async function main() {
  const entries = await readdir(appDir, { withFileTypes: true })
  const map = {}

  for (const ent of entries) {
    if (!ent.isDirectory()) continue
    const m = ent.name.match(/^(for-[\w-]+)-([\w-]+)$/)
    if (!m) continue
    const [, trade, city] = m
    if (!map[trade]) map[trade] = []
    map[trade].push(city)
  }

  // sort for stability
  for (const k of Object.keys(map)) {
    map[k].sort()
  }

  const lines = [
    `// Single source of truth for trade×city internal linking.`,
    `// Regenerated automatically by scripts/gen-trade-cities.mjs`,
    `// Run: npm run gen:trade-cities`,
    `export const TRADE_CITY_PAGES: Record<string, string[]> = {`,
  ]
  for (const [trade, cities] of Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]))) {
    const pad = " ".repeat(Math.max(0, 26 - trade.length))
    lines.push(`  "${trade}":${pad}[${cities.map(c => `"${c}"`).join(", ")}],`)
  }
  lines.push(`}`)

  await writeFile(outFile, lines.join("\n") + "\n", "utf8")
  console.log(`Wrote ${Object.keys(map).length} trades with ${Object.values(map).flat().length} city pages to lib/trade-city-pages.ts`)
}

main().catch(e => { console.error(e); process.exit(1) })
