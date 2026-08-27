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
  const libFiles = findFiles(path.join(process.cwd(), "lib"), [".tsx", ".ts"]);
  const allFiles = [...appFiles, ...componentFiles, ...libFiles];

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
    const identityFile = path.join(process.cwd(), "lib", "seo", "identity.ts");
    const content = fs.readFileSync(identityFile, "utf8");
    const sameAsMatch = content.match(/export const ORG_SAME_AS = \[([\s\S]*?)\]/);
    expect(sameAsMatch).toBeTruthy();
    const entries = sameAsMatch[1].split(",").filter((s) => s.trim().startsWith("\""));
    expect(entries.length).toBeGreaterThanOrEqual(4);
  });

  test("R7.4 — no broken founder LinkedIn URL", () => {
    const failures = [];
    for (const file of allFiles) {
      const content = fs.readFileSync(file, "utf8");
      if (content.includes("linkedin.com/in/drumcpherson")) {
        failures.push(file);
      }
    }
    expect(failures).toEqual([]);
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
      // Match metadata export description — skip interpolated strings (contain + operator)
      const metadataMatch = content.match(/export\s+const\s+metadata\s*:\s*Metadata\s*=\s*\{([\s\S]*?)\n\}/);
      if (metadataMatch) {
        const block = metadataMatch[1];
        // Skip if description uses string concatenation (interpolated at runtime)
        if (block.includes('description:') && !block.match(/description:\s*"[^"]*"\s*\+/)) {
          const descMatch = block.match(/description:\s*"([^"]+)"/);
          if (descMatch) {
            const len = descMatch[1].length;
            if (len < 120 || len > 160) {
              failures.push({ file: file.replace(process.cwd() + "/", ""), length: len, desc: descMatch[1].substring(0, 50) + "..." });
            }
          }
        }
      }
    }
    expect(failures).toEqual([]);
  });

  test("R8.1 — no dead X handle @whozaai anywhere in source", () => {
    const banned = ["@whozaai"];
    const failures = [];
    for (const file of allFiles) {
      const content = fs.readFileSync(file, "utf8");
      for (const term of banned) {
        if (content.includes(term)) {
          failures.push({ file: file.replace(process.cwd() + "/", ""), term });
        }
      }
    }
    expect(failures).toEqual([]);
  });

  test("R8.6 — no 'Independent comparison' wording in comparison pages", () => {
    // Only checks whosa-vs-* comparison pages and their metadata — not blog/research content
    const banned = ["Independent comparison", "Independent Comparison"];
    const comparisonFiles = appFiles.filter(f => f.includes("/whoza-vs-"));
    const failures = [];
    for (const file of comparisonFiles) {
      const content = fs.readFileSync(file, "utf8");
      for (const term of banned) {
        if (content.includes(term)) {
          failures.push({ file: file.replace(process.cwd() + "/", ""), term });
        }
      }
    }
    expect(failures).toEqual([]);
  });

  test("R9b — no 'Independent research report' wording anywhere", () => {
    const banned = ["Independent research report", "independent research report"];
    const failures = [];
    for (const file of allFiles) {
      const content = fs.readFileSync(file, "utf8");
      for (const term of banned) {
        if (content.includes(term)) {
          failures.push({ file: file.replace(process.cwd() + "/", ""), term });
        }
      }
    }
    expect(failures).toEqual([]);
  });

  test("R9b — no independence or honest-rankings claim anywhere", () => {
    const banned = ["Independent comparison", "Independent Comparison",
                    "independent comparison", "Honest rankings", "honest rankings"];
    const failures = [];
    for (const file of allFiles) {
      const content = fs.readFileSync(file, "utf8");
      for (const term of banned) if (content.includes(term)) failures.push({ file, term });
    }
    expect(failures).toEqual([]);
  });

  test("R8.5 — no empty ld+json script tags in app/ (source-level check)", () => {
    // This is a source-level regex check, not a render-level DOM check.
    // Excludes scripts with dangerouslySetInnerHTML (those have content).
    const failures = [];
    for (const file of appFiles) {
      const content = fs.readFileSync(file, "utf8");
      // Match self-closing <script type="application/ld+json" /> that does NOT have dangerouslySetInnerHTML
      const orphanPattern = /<script[^>]*type=["']application\/ld\+json["'][^>]*\/>/g;
      let match;
      while ((match = orphanPattern.exec(content)) !== null) {
        const start = Math.max(0, match.index - 200);
        const context = content.substring(start, match.index + match[0].length);
        if (!context.includes("dangerouslySetInnerHTML")) {
          failures.push({ file: file.replace(process.cwd() + "/", ""), snippet: match[0] });
        }
      }
    }
    expect(failures).toEqual([]);
  });
});
