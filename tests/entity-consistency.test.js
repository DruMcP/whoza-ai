/**
 * Regression tests for entity-consistency fixes (Round 7).
 *
 * Run: npx jest tests/entity-consistency.test.js
 */

const fs = require("fs");
const path = require("path");

function findFiles(dir, ext) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".next") {
      results.push(...findFiles(full, ext));
    } else if (entry.isFile() && ext.some((e) => entry.name.endsWith(e))) {
      results.push(full);
    }
  }
  return results;
}

describe("R7 Entity Consistency", () => {
  const appFiles = findFiles(path.join(process.cwd(), "app"), [".tsx", ".ts"]);
  const componentFiles = findFiles(path.join(process.cwd(), "components"), [".tsx", ".ts"]);
  const allFiles = [...appFiles, ...componentFiles];

  test("R7.1 — no duplicate Organization nodes on any page", () => {
    const failures = [];
    for (const file of allFiles) {
      const content = fs.readFileSync(file, "utf8");
      // Only flag pages with multiple TOP-LEVEL Organization scripts
      // (not author/publisher inside VideoObject, BlogPosting, etc.)
      const orgBlocks = content.match(/"@type":\s*"Organization"\s*,\s*"@id"/g);
      if (orgBlocks && orgBlocks.length > 1) {
        failures.push(file);
      }
    }
    expect(failures).toEqual([]);
  });

  test("R7.2 — no dead sameAs URLs", () => {
    const deadPatterns = [
      /"https:\/\/twitter\.com\/whozaai"/g,
      /"https:\/\/www\.linkedin\.com\/company\/whoza-ai"/g,
      /"https:\/\/www\.facebook\.com\/whozaai"/g,
      /\+44-7308-048808/g,
      /\+447308048808/g,
    ];
    const failures = [];
    for (const file of allFiles) {
      const content = fs.readFileSync(file, "utf8");
      for (const pattern of deadPatterns) {
        const matches = content.match(pattern);
        if (matches) {
          failures.push({ file, match: matches[0] });
        }
      }
    }
    expect(failures).toEqual([]);
  });

  test("R7.3 — Organization sameAs has ≥4 entries", () => {
    const orgFile = path.join(process.cwd(), "components", "whoza", "organization-schema.tsx");
    const content = fs.readFileSync(orgFile, "utf8");
    const sameAsMatch = content.match(/"sameAs":\s*\[([\s\S]*?)\]/);
    expect(sameAsMatch).toBeTruthy();
    const entries = sameAsMatch[1].split(",").filter((s) => s.trim().startsWith("\""));
    expect(entries.length).toBeGreaterThanOrEqual(4);
  });

  test("R7.5 — contact page LocalBusiness points at Tomintoul", () => {
    const contactFile = path.join(process.cwd(), "app", "contact", "page.tsx");
    const content = fs.readFileSync(contactFile, "utf8");
    expect(content).toContain("Tomintoul");
    expect(content).toContain("AB37 9HA");
    expect(content).toContain("57.254141");
    expect(content).toContain("-3.38239");
  });

  test("R7.6 — no 'registered in Edinburgh' in blog content", () => {
    const blogFile = path.join(process.cwd(), "lib", "blog-content.ts");
    const content = fs.readFileSync(blogFile, "utf8");
    expect(content).not.toContain("registered in Edinburgh");
  });

  test("R7.7 — all page meta descriptions within 120-160 chars", () => {
    const failures = [];
    for (const file of appFiles) {
      const content = fs.readFileSync(file, "utf8");
      // Match metadata export description
      const metadataMatch = content.match(/export\s+const\s+metadata\s*:\s*Metadata\s*=\s*\{([\s\S]*?)\n\}/);
      if (metadataMatch) {
        const descMatch = metadataMatch[1].match(/description:\s*"([^"]+)"/);
        if (descMatch) {
          const len = descMatch[1].length;
          if (len < 120 || len > 160) {
            failures.push({ file: file.replace(process.cwd() + "/", ""), length: len, desc: descMatch[1].substring(0, 50) + "..." });
          }
        }
      }
    }
    expect(failures).toEqual([]);
  });
});
