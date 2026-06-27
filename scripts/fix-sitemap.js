const fs = require("fs");
let content = fs.readFileSync("app/sitemap.ts", "utf8");

// Replace the single lastMod with section-specific dates
content = content.replace(
  `const lastMod = '2026-06-20'`,
  `const coreLastMod = '2026-06-20'\n  const resourceLastMod = '2026-06-21'\n  const toolLastMod = '2026-06-22'\n  const tradeLastMod = '2026-06-23'\n  const comboLastMod = '2026-06-24'\n  const locationLastMod = '2026-06-25'\n  const blogLastMod = '2026-06-26'\n  const policyLastMod = '2026-06-27'`
);

// Core pages - first batch (homepage + first few)
let coreBatch1 = content.indexOf("// Core pages");
let coreBatch2 = content.indexOf("// Resources");
if (coreBatch1 !== -1 && coreBatch2 !== -1) {
  let section = content.substring(coreBatch1, coreBatch2);
  section = section.replace(/lastModified: lastMod/g, "lastModified: coreLastMod");
  content = content.substring(0, coreBatch1) + section + content.substring(coreBatch2);
}

// Resources section
let resStart = content.indexOf("// Resources");
let resEnd = content.indexOf("// Tools");
if (resStart !== -1 && resEnd !== -1) {
  let section = content.substring(resStart, resEnd);
  section = section.replace(/lastModified: lastMod/g, "lastModified: resourceLastMod");
  content = content.substring(0, resStart) + section + content.substring(resEnd);
}

// Tools section
let toolStart = content.indexOf("// Tools");
let toolEnd = content.indexOf("// Policy pages");
if (toolStart !== -1 && toolEnd !== -1) {
  let section = content.substring(toolStart, toolEnd);
  section = section.replace(/lastModified: lastMod/g, "lastModified: toolLastMod");
  content = content.substring(0, toolStart) + section + content.substring(toolEnd);
}

// Policy pages section
let policyStart = content.indexOf("// Policy pages");
if (policyStart !== -1) {
  let section = content.substring(policyStart);
  section = section.replace(/lastModified: lastMod/g, "lastModified: policyLastMod");
  content = content.substring(0, policyStart) + section;
}

// Static trade landing pages
let tradeStart = content.indexOf("// Static trade landing pages");
let tradeEnd = content.indexOf("// Trade + City combination pages");
if (tradeStart !== -1 && tradeEnd !== -1) {
  let section = content.substring(tradeStart, tradeEnd);
  section = section.replace(/lastModified: lastMod/g, "lastModified: tradeLastMod");
  content = content.substring(0, tradeStart) + section + content.substring(tradeEnd);
}

// Trade + City combination pages
let comboStart = content.indexOf("// Trade + City combination pages");
let comboEnd = content.indexOf("// === REMOVED");
if (comboStart !== -1 && comboEnd !== -1) {
  let section = content.substring(comboStart, comboEnd);
  section = section.replace(/lastModified: lastMod/g, "lastModified: comboLastMod");
  content = content.substring(0, comboStart) + section + content.substring(comboEnd);
}

// Dynamic location pages
let locStart = content.indexOf("// Dynamic location pages");
let locEnd = content.indexOf("// All blog posts");
if (locStart !== -1 && locEnd !== -1) {
  let section = content.substring(locStart, locEnd);
  section = section.replace(/lastModified: lastMod/g, "lastModified: locationLastMod");
  content = content.substring(0, locStart) + section + content.substring(locEnd);
}

// Blog posts
let blogStart = content.indexOf("// All blog posts");
if (blogStart !== -1) {
  let section = content.substring(blogStart);
  section = section.replace(/lastModified: lastMod/g, "lastModified: blogLastMod");
  content = content.substring(0, blogStart) + section;
}

fs.writeFileSync("app/sitemap.ts", content);
console.log("Sitemap updated with staggered lastmod dates");
