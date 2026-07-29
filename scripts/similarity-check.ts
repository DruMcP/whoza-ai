import { locations, getLocationBySlug } from "./lib/locations";

// Simple character-level similarity metric
function similarity(a: string, b: string): number {
  // Use LCS-based approach: find longest common subsequence
  const m = a.length;
  const n = b.length;
  
  // Use a sliding window approach for long strings
  // Split into chunks and find common chunks
  const chunkSize = 100;
  const aChunks = new Set<string>();
  
  for (let i = 0; i <= m - chunkSize; i++) {
    aChunks.add(a.slice(i, i + chunkSize));
  }
  
  let common = 0;
  for (let i = 0; i <= n - chunkSize; i++) {
    if (aChunks.has(b.slice(i, i + chunkSize))) {
      common += chunkSize;
    }
  }
  
  // Also check shorter chunks for tighter matching
  const shortChunk = 50;
  const aShortChunks = new Set<string>();
  for (let i = 0; i <= m - shortChunk; i++) {
    aShortChunks.add(a.slice(i, i + shortChunk));
  }
  for (let i = 0; i <= n - shortChunk; i++) {
    if (aShortChunks.has(b.slice(i, i + shortChunk))) {
      common += shortChunk * 0.5;
    }
  }
  
  const totalUnique = m + n;
  return totalUnique > 0 ? (2 * common) / totalUnique : 0;
}

// Simulate page content by combining all text that would appear on the page
function simulatePageContent(slug: string): string {
  const loc = getLocationBySlug(slug);
  if (!loc) return "";
  
  // Build all the text that would appear on this city page
  let content = "";
  
  // Metadata
  content += `AI Call Answering ${loc.city} | whoza.ai `;
  content += `${loc.description} `;
  
  // Hero
  content += `Stop losing jobs to missed calls. Katie answers your phone 24/7 for ${loc.trades?.join(", ") || "tradespeople"} in ${loc.city}. Book appointments automatically. `;
  content += `${loc.city} ${loc.region} ${loc.jobsThisWeek || ""} `;
  
  // CityContentSection
  content += `The ${loc.city} Trade Market `;
  content += `${loc.description} `;
  
  if (loc.localStats) {
    content += `${loc.localStats.businesses} Trade Businesses `;
    content += `${loc.localStats.households} Households `;
    content += `${loc.localStats.avgJob} Average Job `;
    content += `${loc.localStats.missedCallsWeekly} Missed Calls/Week `;
  }
  
  if (loc.neighbourhoods) {
    content += `Areas We Cover in ${loc.city} ${loc.neighbourhoods.join(" ")} `;
  }
  
  if (loc.associations) {
    content += `Trade Standards in ${loc.city} ${loc.associations.join(" ")} `;
  }
  
  if (loc.responseTime) {
    content += `Response Times in ${loc.city} ${loc.responseTime} `;
  }
  
  if (loc.callVolume) {
    content += `${loc.callVolume} `;
  }
  
  if (loc.localStats) {
    const missed = parseInt(loc.localStats.missedCallsWeekly.replace(/,/g, ""));
    const avg = parseInt(loc.localStats.avgJob.replace(/[^0-9]/g, ""));
    content += `Missed Call Revenue Impact With ${loc.localStats.missedCallsWeekly} missed calls every week, ${loc.city} tradespeople are losing `;
  }
  
  if (loc.testimonial) {
    content += `${loc.testimonial.quote} ${loc.testimonial.name} ${loc.testimonial.trade} ${loc.testimonial.area} `;
  }
  
  if (loc.challenges) {
    content += `Why ${loc.city} Tradespeople Miss Calls ${loc.challenges.join(" ")} `;
  }
  
  if (loc.localStats?.marketSize) {
    content += `${loc.city} trade market value ${loc.localStats.marketSize} `;
  }
  
  // Cross-links (shared)
  const otherCities = locations.filter(l => l.country === "uk" && l.slug !== loc.slug);
  content += `Also Serving Tradespeople Across the UK ${otherCities.map(c => c.city).join(" ")} `;
  
  // City FAQs
  content += `Do you cover all areas of ${loc.city} including suburbs? `;
  content += `Yes — Katie answers calls for tradespeople across ${loc.city} and surrounding areas${loc.neighbourhoods ? `, including ${loc.neighbourhoods.slice(0, 6).join(", ")} and beyond` : ""}. `;
  content += `What's the average response time for tradespeople in ${loc.city}? ${loc.responseTime || ""} `;
  content += `Are missed calls a big problem for ${loc.city} tradespeople? ${loc.localStats?.missedCallsWeekly || ""} ${loc.callVolume || ""} `;
  content += `Does whoza.ai work with local trade associations in ${loc.city}? ${loc.associations ? loc.associations.slice(0, 3).join(", ") : ""} `;
  content += `Can Katie handle emergency calls in ${loc.city} at night and weekends? `;
  content += `How quickly can I get set up in ${loc.city}? `;
  
  // Trade links section
  content += `AI Call Handling for Every Trade in ${loc.city} Whatever your trade, Katie's got you covered in ${loc.city}. `;
  content += `Plumbers Electricians Gas Engineers Builders Roofers Locksmiths Joiners Heating Engineers Painters Carpenters Cleaners Drainage Handymen Landscapers Pest Control Plasterers Tilers `;
  
  // All the shared component content (identical across all cities)
  // This is the bulk of the content and it's identical
  content += `THE PROBLEM 62% of calls to UK trades go unanswered. Most customers won't leave voicemail. They call the next number on Google. `;
  content += `Lost Revenue Calculator Missed calls per week Average job value Conversion rate Weekly loss Monthly loss Yearly loss `;
  content += `THE CORE EXPERIENCE Jobs Land On Your Phone No apps. No logins. No dashboards. Just WhatsApp. This is how you actually get paid work. Tap accept and the job is yours. `;
  content += `HOW IT WORKS 1. Customer calls your number 2. Katie answers instantly 3. Details land in your WhatsApp 4. You accept or decline in one tap `;
  content += `WHAT YOU GET 24/7 call answering WhatsApp job cards Calendar booking Review collection Call transcripts `;
  content += `MEET THE TEAM Katie answers your calls Claire collects reviews Rex grows your business `;
  content += `TRUSTED BY UK TRADESPEOPLE 4.9/5 average rating 500+ tradespeople 50,000+ calls handled £2M+ revenue recovered `;
  content += `PRICING Starter £59/month Growth £125/month Pro £230/month Scale £399/month `;
  content += `FAQ What counts as a booked job? How does the Refer a Trade programme work? How much does Whoza cost in total? Is there a free trial? Is there a contract? `;
  content += `Does it work with my existing phone number? Can I search through my past calls? Can I choose a different voice for my AI? `;
  content += `What happens if someone leaves a voicemail? How many calls can whoza.ai handle at once? What integrations does whoza.ai support? `;
  content += `Can whoza.ai book appointments into my calendar? What accents and voices are available? What trades do you support? `;
  content += `What happens to my data if I cancel? How quickly can I get set up? What happens if Katie can't handle a call? `;
  content += `Will my customers mind an AI answering my phone? `;
  content += `READY TO STOP LOSING JOBS? Start your 7-day free trial. No credit card required. `;
  
  return content;
}

// Compare similarity between city pairs
const cityPairs = [
  ["london", "manchester"],
  ["glasgow", "edinburgh"],
  ["birmingham", "leeds"],
  ["bristol", "liverpool"],
];

console.log("=== CITY PAGE SIMILARITY REPORT ===\n");

for (const [a, b] of cityPairs) {
  const contentA = simulatePageContent(a);
  const contentB = simulatePageContent(b);
  const sim = similarity(contentA, contentB);
  
  console.log(`${a.toUpperCase()} vs ${b.toUpperCase()}`);
  console.log(`  Page A length: ${contentA.toLocaleString()} chars`);
  console.log(`  Page B length: ${contentB.toLocaleString()} chars`);
  console.log(`  Similarity: ${(sim * 100).toFixed(1)}%`);
  console.log();
}

// Also check all pairwise similarities
console.log("=== ALL PAIRWISE SIMILARITIES ===\n");
const ukCities = locations.filter(l => l.country === "uk");
let totalSim = 0;
let count = 0;

for (let i = 0; i < ukCities.length; i++) {
  for (let j = i + 1; j < ukCities.length; j++) {
    const a = ukCities[i].slug;
    const b = ukCities[j].slug;
    const contentA = simulatePageContent(a);
    const contentB = simulatePageContent(b);
    const sim = similarity(contentA, contentB);
    totalSim += sim;
    count++;
    console.log(`${a} vs ${b}: ${(sim * 100).toFixed(1)}%`);
  }
}

console.log(`\nAverage similarity across all pairs: ${((totalSim / count) * 100).toFixed(1)}%`);
