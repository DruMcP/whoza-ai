const fs = require('fs');
const path = require('path');

const root = '/root/.openclaw/workspace/whoza-ai';

// Helper: read file, apply replacements, write back
function processFile(filePath, replacements) {
  const fullPath = path.join(root, filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP (not found): ${filePath}`);
    return false;
  }
  let content = fs.readFileSync(fullPath, 'utf-8');
  let modified = false;

  for (const repl of replacements) {
    const old = repl.old;
    const newText = repl.new || '';
    if (typeof old === 'string') {
      if (content.includes(old)) {
        content = content.replace(old, newText);
        modified = true;
      }
    } else {
      // regex
      if (old.test(content)) {
        content = content.replace(old, newText);
        modified = true;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(fullPath, content);
    console.log(`SAVED: ${filePath}`);
  }
  return modified;
}

// ── ai-voice-agents-uk-trades-2026/page.tsx ───────────────────────────────
processFile('app/research/ai-voice-agents-uk-trades-2026/page.tsx', [
  // JSON-LD citation name
  { old: '      "name": "Missed Business Calls Statistics: 62% of Business Calls Go Unanswered",', new: '      "name": "Missed Business Calls Statistics: UK SME Call Answer Rates",' },
  // FAQ answer - remove 62% sentence, keep rest
  {
    old: /Small businesses miss an average of 62% of incoming calls during working hours \(411 Locals, 2024\), rising to over 80% during peak periods\. /,
    new: ''
  },
  // FAQ answer - remove 62% competitor sentence
  {
    old: / 62% of unanswered callers immediately contact a competitor \(Dialzara, 2025\)\./,
    new: ''
  },
  // Body paragraph - remove 62% sentence
  {
    old: / For the smallest businesses — those with one or two people — missed call rates approaching 62% are not uncommon, with some enterprises missing considerably more \(411 Locals, 2024\)\./,
    new: ''
  },
  // Table cells with 62% - replace with dash
  { old: '                    <td className="px-4 py-3 font-bold text-emerald-400">62%</td>\n', new: '                    <td className="px-4 py-3 font-bold text-emerald-400">—</td>\n' },
  // Remove span with 62% competitor stat
  {
    old: /                <span className="text-white\/80"><strong>62%<\/strong> of unanswered callers immediately contact a competitor \(Dialzara, 2025\)\.\<\/span>/,
    new: '                <span className="text-white/80">Unanswered callers often contact a competitor immediately (Dialzara, 2025).</span>'
  },
  // Remove 411 Locals bibliography entry
  {
    old: /              <p>411 Locals \(2024\)\. 'Missed Business Calls Statistics: 62% of Business Calls Go Unanswered\.' Available at: getaira\.io\. Accessed June 2026\.<\/p>\n/,
    new: ''
  },
  // Remove Sift Digital bibliography entry
  {
    old: /              <p>Sift Digital \(2025\)\. 'The Silent Profit Killer: Why 62% of Your Business Calls Go Unanswered\.' Medium, 19 December 2025\.<\/p>\n/,
    new: ''
  },
  // Meta description paragraphs
  {
    old: /Small businesses miss an average of 62% of incoming calls during working hours \(411 Locals, 2024\), rising to over 80% during peak periods\. /,
    new: ''
  },
  {
    old: / 62% of unanswered callers immediately contact a competitor \(Dialzara, 2025\)\./,
    new: ''
  },
  // Summary with 33-62% range (already fixed by sed, but double-check)
  {
    old: /With 33–62% of calls to UK trade businesses going unanswered/,
    new: 'With 33% of calls to UK trade businesses going unanswered'
  }
]);

// ── cost-of-missed-calls-uk-trades-2026/page.tsx ──────────────────────────
processFile('app/research/cost-of-missed-calls-uk-trades-2026/page.tsx', [
  // FAQ answer 1 - remove 62% sentence
  {
    old: / For sole traders specifically, the missed call rate rises to 62% during working hours \(Replicant AI, 2024\)\./,
    new: ''
  },
  // FAQ answer 2 - remove 62% sentence
  {
    old: / Additionally, 62% of unanswered callers immediately contact a competitor \(Dialzara, 2025\)\./,
    new: ''
  },
  // Body paragraph 1
  {
    old: / For sole traders specifically, the missed call rate rises to 62% during working hours \(Replicant AI, 2024\)\./,
    new: ''
  },
  // Body paragraph 2
  {
    old: / Additionally, 62% of unanswered callers immediately contact a competitor \(Dialzara, 2025\)\./,
    new: ''
  }
]);

// ── the-true-cost-of-missed-calls-2026/page.tsx ──────────────────────────
processFile('app/research/the-true-cost-of-missed-calls-2026/page.tsx', [
  // Remove remaining Dialzara 62% table row
  {
    old: /<tr className="border-b border-white\/5 bg-white\/5"><td className="p-3">Callers contacting competitor immediately<\/td><td className="p-3">62%<\/td><td className="p-3">Dialzara, 2025<\/td><\/tr>\n/,
    new: ''
  },
  // Remove remaining bibliography entries
  {
    old: /            <li>411 Locals \(2024\)\. "Missed Business Calls Statistics: 62% of Business Calls Go Unanswered\." getaira\.io\.<\/li>\n/,
    new: ''
  },
  {
    old: /            <li>Dialzara \(2025\)\. "Missed Call Statistics: 62% Contact Competitor\." dialzara\.com\.<\/li>\n/,
    new: ''
  }
]);

// ── voice-agent-technology-state-of-art-2026/page.tsx ─────────────────────
// The 62% at line 684 is about self-service preference - this is a different statistic
// But per prompt, remove all 62% occurrences
processFile('app/research/voice-agent-technology-state-of-art-2026/page.tsx', [
  {
    old: '<li>62% of end customers prefer self-service for simple issues provided it works effectively</li>',
    new: '<li>A majority of end customers prefer self-service for simple issues provided it works effectively</li>'
  }
]);

console.log('\nDone.');
