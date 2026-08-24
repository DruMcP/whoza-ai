#!/usr/bin/env node
// scripts/fix-trade-city-links.mjs — replace hardcoded city link blocks with TradeCityLinks component

import { readdir, readFile, writeFile } from "fs/promises"
import { join } from "path"

const appDir = "./app"

async function main() {
  const entries = await readdir(appDir, { withFileTypes: true })
  let fixed = 0

  for (const ent of entries) {
    if (!ent.isDirectory()) continue
    const m = ent.name.match(/^(for-[\w-]+)-([\w-]+)$/)
    if (!m) continue
    const [, trade, city] = m
    const pagePath = join(appDir, ent.name, "page.tsx")

    let content = await readFile(pagePath, "utf8")
    const original = content

    // Add import if missing
    if (!content.includes('import { TradeCityLinks }')) {
      const lines = content.split('\n')
      let lastImportIdx = -1
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import ')) lastImportIdx = i
      }
      if (lastImportIdx >= 0) {
        lines.splice(lastImportIdx + 1, 0, 'import { TradeCityLinks } from "@/components/whoza/trade-city-links"')
        content = lines.join('\n')
      }
    }

    // Find the div with flex flex-wrap justify-center gap-3 that contains city links
    // Replace just that div (and its contents) with TradeCityLinks
    const pattern = /<div className="flex flex-wrap justify-center gap-3">\s*\n(\s*<Link href="\/for-[^"]+"[^>]*>[^<]+<\/Link>\s*\n)+\s*<\/div>/

    const replacement = `<TradeCityLinks trade="${trade}" current="${city}" />`

    if (pattern.test(content)) {
      content = content.replace(pattern, replacement)
    }

    if (content !== original) {
      await writeFile(pagePath, content, "utf8")
      fixed++
      console.log(`Fixed: ${ent.name}`)
    } else {
      console.log(`No change: ${ent.name}`)
    }
  }

  console.log(`\nFixed ${fixed} files`)
}

main().catch(e => { console.error(e); process.exit(1) })
