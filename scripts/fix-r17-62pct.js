const fs = require('fs');
const path = require('path');

const root = '/root/.openclaw/workspace/whoza-ai';

// Files to process and their specific replacements
const replacements = [
  {
    file: 'app/research/caller-experience-revolution-ai-voice-agents-2026/page.tsx',
    changes: [
      // Remove paragraph with 62% from 411 Locals
      {
        old: /Research from 411 Locals found that small businesses miss an average of 62% of incoming calls during working hours, rising to over 80% during peak periods such as Monday mornings and Friday afternoons when demand is highest and staff availability lowest\./,
        new: 'Research indicates missed call rates rise significantly during peak periods such as Monday mornings and Friday afternoons when demand is highest and staff availability lowest.'
      },
      // Remove 62% table cell - replace with dash or remove row
      {
        old: '<td className="px-4 py-3 font-medium text-emerald-400">62%</td>',
        new: '<td className="px-4 py-3 font-medium text-emerald-400">—</td>'
      },
      // Remove bibliography entry
      {
        old: /\s*<li>411 Locals \(2024\)\. &apos;Missed Business Calls Statistics: 62% of Business Calls Go Unanswered\.\&apos;<\/li>/,
        new: ''
      }
    ]
  },
  {
    file: 'app/research/the-true-cost-of-missed-calls-2026/page.tsx',
    changes: [
      // Update range 34-62% to 34%
      { old: '<span className="text-emerald-400 font-bold mr-3 min-w-[80px]">34-62%</span>', new: '<span className="text-emerald-400 font-bold mr-3 min-w-[80px]">34%</span>' },
      // Remove sentence about 62% sole trader
      {
        old: /A 2024 survey of UK micro-businesses found that the average sole trader misses 62% of incoming calls during working hours\. For businesses with 2-5 employees, the figure drops to 34%, but remains substantial \(Replicant AI, 2024\)\./,
        new: 'A 2024 survey of UK micro-businesses found that for businesses with 2-5 employees, the missed call rate is 34% (Replicant AI, 2024).'
      },
      // Remove 62% table row for sole trader
      {
        old: /<tr className="border-b border-white\/5"><td className="p-3">Average sole trader missed call rate<\/td><td className="p-3">62%<\/td><td className="p-3">Replicant AI, 2024<\/td><\/tr>\n/,
        new: ''
      },
      // Keep Dialzara 62% but it's about competitors - this one might be valid, check prompt
      // Actually prompt says remove ALL 62% occurrences
      {
        old: /Dialzara's 2025 research found that 62% of unanswered callers immediately contact a competitor\. The business that answers first usually gets the job\. When a trade business misses a call, the caller does not wait — they move to the next name on their list \(Dialzara, 2025\)\./,
        new: 'When a trade business misses a call, the caller does not wait — they move to the next name on their list (Dialzara, 2025).'
      },
      // Update summary sentence
      {
        old: /With 34-62% of calls missed and each representing £250-£1,200 in lost revenue/,
        new: 'With 34% of calls missed and each representing £250-£1,200 in lost revenue'
      },
      // Remove 411 Locals bibliography
      {
        old: /\s*<li><strong>411 Locals \(2024\)\.<\/strong> "Missed Business Calls Statistics: 62% of Business Calls Go Unanswered\." getaira\.io\.<\/li>\n/,
        new: ''
      },
      // Remove Dialzara 62% bibliography if it's only about the 62% stat
      {
        old: /\s*<li><strong>Dialzara \(2025\)\.<\/strong> "Missed Call Statistics: 62% Contact Competitor\." dialzara\.com\.<\/li>\n/,
        new: ''
      },
      // Remove meta description paragraph with 62%
      {
        old: /Research shows 34-62% of incoming calls to UK trade businesses go unanswered\. The average sole trader misses 62% of calls during working hours, while businesses with 2-5 employees miss 34% \(Replicant AI, 2024\)\. After-hours, 70-85% of calls go unanswered\./,
        new: 'Research shows 34% of incoming calls to UK trade businesses with 2-5 employees go unanswered (Replicant AI, 2024). After-hours, 70-85% of calls go unanswered.'
      }
    ]
  },
  {
    file: 'app/research/missed-call-index-q3-2026/page.tsx',
    changes: [
      // The 62% here is already marked as excluded - keep it, it's saying it's deliberately excluded
    ]
  }
];

for (const { file, changes } of replacements) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP (not found): ${file}`);
    continue;
  }
  let content = fs.readFileSync(fullPath, 'utf-8');
  let modified = false;

  for (const { old, new: newText } of changes) {
    if (typeof old === 'string') {
      if (content.includes(old)) {
        content = content.replace(old, newText);
        modified = true;
        console.log(`  REPLACED string: ${file}`);
      }
    } else {
      // regex
      if (old.test(content)) {
        content = content.replace(old, newText);
        modified = true;
        console.log(`  REPLACED regex: ${file}`);
      }
    }
  }

  if (modified) {
    fs.writeFileSync(fullPath, content);
    console.log(`SAVED: ${file}`);
  } else {
    console.log(`NO CHANGES: ${file}`);
  }
}
