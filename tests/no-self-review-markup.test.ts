// tests/no-self-review-markup.test.ts
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['app', 'components', 'lib', 'content'];
const SKIP = new Set(['node_modules', '.next', 'dist', '.git']);
const BANNED = /"@type":\s*"AggregateRating"|"@type":\s*"Review"/;

function walk(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir)) {
    if (SKIP.has(e)) continue;
    const p = join(dir, e);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}

test('no self-serving review markup anywhere in the source', () => {
  const offenders = ROOTS
    .filter(r => { try { statSync(r); return true; } catch { return false; } })
    .flatMap(r => walk(r))
    .filter(f => /\.(ts|tsx|js|jsx|json|md|mdx|html)$/.test(f))
    .filter(f => BANNED.test(readFileSync(f, 'utf8')));
  expect(offenders).toEqual([]);
});
