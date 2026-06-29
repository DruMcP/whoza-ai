const cheerio = require('cheerio');
const fs = require('fs');

const urls = [
  'https://www.whoza.ai/',
  'https://www.whoza.ai/pricing',
  'https://www.whoza.ai/for-plumbers',
  'https://www.whoza.ai/for-electricians',
  'https://www.whoza.ai/for-gas-engineers',
  'https://www.whoza.ai/for-builders',
  'https://www.whoza.ai/for-roofers',
  'https://www.whoza.ai/for-landscapers',
  'https://www.whoza.ai/for-heating-engineers',
  'https://www.whoza.ai/for-painters-decorators',
  'https://www.whoza.ai/support',
  'https://www.whoza.ai/privacy',
  'https://www.whoza.ai/terms',
];

const utilityPages = ['/support', '/privacy', '/terms', '/cookie-policy', '/refund-policy', '/fair-use', '/modern-slavery', '/sla', '/dpa', '/vat-info'];

const issues = [];

async function check() {
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'whoza-seo-agent/1.0' } });
      const html = await res.text();
      const $$ = cheerio.load(html);

      const title = $$('title').text();
      const desc = $$('meta[name="description"]').attr('content');
      const ogImage = $$('meta[property="og:image"]').attr('content');
      const canonical = $$('link[rel="canonical"]').attr('href');
      const isUtility = utilityPages.some(p => url.includes(p));

      if (!title) {
        issues.push({url, type: 'title', issue: 'Missing'});
      } else if (!isUtility && (title.length < 30 || title.length > 60)) {
        issues.push({url, type: 'title', value: title, issue: 'Length: ' + title.length + ' (expected 30-60)'});
      }

      if (!desc) {
        issues.push({url, type: 'description', issue: 'Missing'});
      } else if (!isUtility && (desc.length < 120 || desc.length > 160)) {
        issues.push({url, type: 'description', value: desc, issue: 'Length: ' + desc.length + ' (expected 120-160)'});
      }

      if (!ogImage) {
        issues.push({url, type: 'og:image', issue: 'Missing'});
      }

      if (!canonical) {
        issues.push({url, type: 'canonical', issue: 'Missing'});
      }
    } catch (e) {
      issues.push({url, type: 'fetch', issue: e.message});
    }
  }

  const issuesJson = JSON.stringify(issues);
  fs.appendFileSync(process.env.GITHUB_ENV, 'ISSUES=' + issuesJson + '\n');
  console.log('Found ' + issues.length + ' issue(s)');
  if (issues.length > 0) {
    console.log(JSON.stringify(issues, null, 2));
  }
}

check().catch(e => {
  console.error(e);
  process.exit(1);
});
