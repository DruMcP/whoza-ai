const fs = require('fs');
const content = fs.readFileSync('lib/blog-content.ts', 'utf8');
const postRegex = /  "([a-z0-9-]+)": \{/g;
let match;
while ((match = postRegex.exec(content)) !== null) {
  const start = match.index;
  let braceCount = 0;
  let end = start;
  for (let i = start; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        end = i + 1;
        break;
      }
    }
  }
  const block = content.substring(start, end);
  const slug = match[1];
  const titleMatch = block.match(/title: "([^"]+)"/);
  const metaMatch = block.match(/metaTitle: "([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : null;
  const metaTitle = metaMatch ? metaMatch[1] : null;
  const effectiveTitle = metaTitle || title;
  if (effectiveTitle && effectiveTitle.length > 60) {
    console.log(`${effectiveTitle.length}c [${slug}]: ${effectiveTitle}`);
  }
}
