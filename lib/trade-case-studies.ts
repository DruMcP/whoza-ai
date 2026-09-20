// Consolidated case studies + lead-gen content merged from retired blog posts.
// Source posts were 301-redirected to these trade pages — every figure/quote preserved here.
// See netlify.toml redirect section for the mapping.

export interface CaseStudyStat {
  label: string
  value: string
}

export interface CaseStudyStory {
  name: string
  location: string
  trade: string
  quote: string
  body: string[]
  stats: CaseStudyStat[]
  result: string
}

export interface LeadGenTip {
  title: string
  body: string
}

export interface TradeCaseStudyData {
  trade: string
  stories: CaseStudyStory[]
  leadGen?: {
    heading: string
    intro: string
    tips: LeadGenTip[]
  }
}

export const tradeCaseStudies: Record<string, TradeCaseStudyData> = {
  "for-plumbers": {
    trade: "Plumbers",
    stories: [
      {
        name: "Gary Mitchell",
        location: "Clapham, London",
        trade: "Emergency Plumber",
        quote:
          "I was missing five emergency calls a week. Three months of that is sixty calls. Sixty customers who needed a plumber right now and got voicemail instead.",
        body: [
          "Gary has run his emergency plumbing business for eight years. Like most plumbers, he works alone — under sinks, inside boilers, up in lofts. His phone rings constantly, and every ring he can't answer is a customer who rings the next plumber on Google.",
          "He worked out the real cost: five emergency calls a week, missed, over three months. Sixty lost enquiries at his £280 average job value. That is roughly £14,000 a quarter walking to competitors — before you count the repeat work each of those customers would have brought.",
          "He signed up for the 7-day free trial with low expectations. Katie answered every call he missed, qualified the emergency, and sent the details to his WhatsApp. He called back between jobs, quoted, and booked.",
        ],
        stats: [
          { label: "Week 1", value: "18 calls answered · 4 jobs · £1,400 recovered" },
          { label: "Week 2", value: "22 calls · 5 jobs · £1,800 recovered" },
          { label: "Week 3", value: "25 calls · 6 jobs · £2,200 recovered — incl. a £5,000 bathroom fitting enquiry captured while fixing a boiler in Brixton" },
          { label: "Week 4", value: "20 calls · 4 jobs · £1,400 recovered" },
        ],
        result:
          "£6,800 recovered in four weeks against a £59/month plan — the subscription paid for itself in the first morning. Gary's verdict: for a plumber who works alone, it pays for itself roughly eight times over every month.",
      },
    ],
    leadGen: {
      heading: "8 Ways UK Plumbers Get More Customers in 2026",
      intro:
        "Being a great plumber isn't enough — you need a system that brings enquiries in while you're on the tools. These are the eight tactics UK plumbers use to keep their diaries full.",
      tips: [
        {
          title: "1. Dominate 'plumber near me' searches",
          body: "85% of UK customers search online before hiring a tradesperson. A complete, review-rich Google Business Profile with location pages for every area you cover is the single highest-ROI marketing a plumber can do. Top-3 Maps placement captures 44% of local search clicks.",
        },
        {
          title: "2. Answer emergency calls 24/7 — even when you're asleep",
          body: "69% of callers won't leave a voicemail, and 74% contact a competitor within an hour of not reaching you. Emergency plumbing is the most time-sensitive trade of all — a burst pipe at 11pm cannot wait until morning. AI call answering captures the enquiry while you finish the job you're on.",
        },
        {
          title: "3. Build relationships with letting agents and landlords",
          body: "Letting agents need reliable plumbers constantly — boiler checks, leak repairs, tenant callouts. One agent contract can be worth £1,600+ a year in guaranteed work. Offer a priority response time and a monthly summary; agents pay for reliability, not the cheapest rate.",
        },
        {
          title: "4. Get listed on plumbing-specific directories",
          body: "Checkatrade, Rated People, MyBuilder, WaterSafe, and Which? Trusted Traders all rank on Google for plumbing searches and pass trust signals to homeowners. WaterSafe listing is free and signals you're properly qualified.",
        },
        {
          title: "5. Create content that shows your expertise",
          body: "Short answers to the questions customers actually Google — 'what to do if your boiler breaks down in winter', 'why is my water pressure low' — build authority and get surfaced in AI search answers. You don't need a blog: answer three questions a month on your GBP as posts.",
        },
        {
          title: "6. Use seasonal marketing to smooth out income",
          body: "Boiler breakdowns cluster in cold snaps — missed-call volume rises 340% during winter for heating-adjacent trades. Push service plans and CP12 reminders in autumn so the winter surge lands on a booked calendar, not a ringing phone you can't answer.",
        },
        {
          title: "7. Upsell and cross-sell every job",
          body: "On every callout, check the cylinder, the taps, the outdoor tap, the radiator valves. A £280 callout becomes a £600 visit with honest, useful suggestions — and customers remember the plumber who spotted the problem before it flooded the kitchen.",
        },
        {
          title: "8. Build a referral system that actually works",
          body: "Ask every happy customer for one introduction — a neighbour, a family member, their letting agent. A simple '£10 off for them, £25 credit for you' referral scheme compounds fast. Referrals convert at the highest rate of any channel because the trust is pre-loaded.",
        },
      ],
    },
  },

  "for-electricians": {
    trade: "Electricians",
    stories: [
      {
        name: "Dave Williams",
        location: "Lewisham, London",
        trade: "Electrician",
        quote:
          "I was losing three emergency callouts a day. Three. Every single day. I did the maths and wanted to be sick.",
        body: [
          "Dave has been a self-employed electrician for over a decade. His phone rings around 35 times a week — but until recently he could only answer about half of them. The rest went to voicemail while he was inside consumer units, up ladders, or under floors.",
          "Of those 35 weekly calls, roughly 15 are genuine job enquiries. Each emergency callout is worth £180–£400. Missing three a day meant losing roughly £4,200 a month in recoverable revenue — real money that was ringing, unanswered, while he worked.",
          "The calls that hurt most were the emergencies: a young family with no power and a freezer full of food, an elderly woman alone in the dark. Those callers don't leave messages — they ring the next electrician on Google. Dave set up AI call answering so every missed call gets answered instantly, qualified, and delivered to his WhatsApp.",
        ],
        stats: [
          { label: "Weekly calls", value: "35 total — only ~20 answerable while working" },
          { label: "Genuine enquiries", value: "~15 per week going to voicemail" },
          { label: "Avg emergency callout", value: "£180–£400" },
          { label: "Recovered revenue", value: "£4,200/month once AI answered every missed call" },
        ],
        result:
          "Dave stopped losing three emergency callouts a day. Every enquiry now reaches his WhatsApp within seconds of the call ending — he quotes between jobs and books the work the same day.",
      },
    ],
  },

  "for-gas-engineers": {
    trade: "Gas Engineers",
    stories: [
      {
        name: "Mark Harrison",
        location: "Walthamstow, London",
        trade: "Gas Safe Engineer",
        quote:
          "A gas engineer who misses calls while working loses roughly £30,000 a year in recoverable revenue. I worked out the maths properly — not guesses, actual numbers — and I was furious.",
        body: [
          "Mark is 41, Gas Safe registered, and has been self-employed for nine years. He tracked his actual missed calls for a month and built the real cost table for UK trades: a plumber missing five £280 jobs a day loses £50,568 a year; an electrician missing seven £350 jobs loses £88,500; a gas engineer missing five £320 jobs a day — his own situation — loses £57,792 a year.",
          "The maths that convinced him: of the calls he missed while servicing a boiler, one was a landlord in Walthamstow with a £1,250 full heating system enquiry. He would never have known it existed without AI answering.",
          "He tried AI call answering for four weeks and tracked every penny. Katie answered every call, took the enquiry, and sent it to his WhatsApp. He called back between jobs.",
        ],
        stats: [
          { label: "Week 1", value: "16 calls answered · 4 jobs · £1,280 recovered" },
          { label: "Week 2", value: "19 calls · 5 jobs · £1,600 recovered" },
          { label: "Week 3", value: "21 calls · 5 jobs · £1,600 recovered — incl. an £800 boiler install missed while servicing" },
          { label: "Week 4", value: "18 calls · 4 jobs · £2,170 recovered — incl. a £1,250 heating system enquiry from a Walthamstow landlord" },
        ],
        result:
          "£6,650 recovered in four weeks against a £59/month plan. Mark's honest caveats: AI still struggles with complex boiler quotes over the phone, very strong accents occasionally cause errors, and chatty customers wanting a long conversation are better served by a callback. But for capturing every missed enquiry, he calls it the best money he spends.",
      },
    ],
  },

  "for-builders": {
    trade: "Builders",
    stories: [
      {
        name: "Tom",
        location: "West Midlands",
        trade: "Builder",
        quote:
          "My phone rang twelve times on a building site. Twelve. I was pouring concrete. Not one of those callers left a message.",
        body: [
          "Tom runs a small building firm — extensions, renovations, conversions. Building sites are the worst possible place to take a call: machinery noise, concrete being poured, and customers who expect an answer on the second ring.",
          "He started the trial mid-project on a large Edgbaston renovation. The AI handled everything while he kept the site moving — including a £1,200 extension enquiry captured while he was literally pouring foundations, and a £650 garage conversion survey booked in week one.",
        ],
        stats: [
          { label: "Week 1", value: "14 calls answered · 5 jobs · £1,800 recovered" },
          { label: "Week 2", value: "16 calls · 6 jobs · £2,100 recovered — incl. a £1,200 extension captured while pouring foundations" },
          { label: "Week 3", value: "19 calls · 7 jobs · £2,400 recovered on the Edgbaston renovation" },
          { label: "Week 4", value: "12 calls · 4 jobs · £900 + a £2,800 loft conversion survey booked" },
        ],
        result:
          "£7,200+ in captured work in four weeks — plus a £2,800 survey in the pipeline. Builder enquiries are the highest-value calls in trades: one missed extension call can be a £15,000–£60,000 project.",
      },
      {
        name: "Steve",
        location: "Manchester",
        trade: "Builder",
        quote:
          "I was missing £2,000 of extension enquiries every month. Every month. I just couldn't see it because the calls went to voicemail and vanished.",
        body: [
          "Steve specialises in extensions and conversions — high-value projects where a single enquiry can be worth £20,000 or more. But he works on site all day, and his extension enquiries were going straight to voicemail.",
          "He estimated he was missing £2,000 a month in extension enquiries he never even knew about. After switching on AI call answering, the missed enquiries started arriving on his WhatsApp instead of evaporating.",
        ],
        stats: [
          { label: "Week 1", value: "15 calls answered · 5 jobs · £2,100 recovered" },
          { label: "Week 2", value: "18 calls · 6 jobs · £2,800 recovered — incl. a £1,800 kitchen renovation captured on site" },
          { label: "Week 4", value: "20 calls · 7 jobs · £3,800 recovered in storm week" },
          { label: "Week 5", value: "16 calls · 5 jobs · £2,200 recovered — incl. a £2,500 loft conversion enquiry from a landlord" },
        ],
        result:
          "Roughly £12,500 in captured enquiries across five weeks. For builders, the phone is the front door to £15,000–£60,000 projects — voicemail is not a strategy.",
      },
    ],
  },

  "for-roofers": {
    trade: "Roofers",
    stories: [
      {
        name: "Mike",
        location: "Leeds",
        trade: "Roofer",
        quote:
          "I lost an £8,000 roof job because I was up a ladder. By the time I got down and called back, they'd booked someone else.",
        body: [
          "Mike has been roofing for years — repairs, re-roofs, storm damage. His problem is physics: you cannot answer a phone on a pitched roof in the rain. Every call he misses while working is a customer ringing the next roofer on Google.",
          "The job that broke him: an £8,000 full re-roof enquiry missed because he was up a ladder. The homeowner had rung three roofers; the first to answer got the job. It wasn't him.",
          "He now lets AI answer every missed call. Storm weeks are where it pays hardest — three storm damage repairs captured in a single week while he was up on roofs.",
        ],
        stats: [
          { label: "Week 1", value: "16 calls · 5 jobs · £2,100 recovered — incl. £450 slate repair + £780 chimney rebuild" },
          { label: "Week 2 (storm)", value: "23 calls · 7 jobs · £3,800 recovered" },
          { label: "Week 5", value: "19 calls · 4 jobs · £500 immediate + an £8,200 re-roof started — £8,700 total week value" },
        ],
        result:
          "£8,200 re-roof jobs don't come from voicemail. Mike now captures every storm-week call he physically cannot answer.",
      },
      {
        name: "Tom",
        location: "Bristol",
        trade: "Roofer",
        quote:
          "I lost £4,000 in one storm season to missed calls. Then AI answered my phone, and storm season became my best season.",
        body: [
          "Tom has fixed roofs in Bristol for 11 years. Storm season is his busiest and most profitable period — phones ringing off the hook — but also when he can least afford to stop work to answer.",
          "One lost storm season cost him £4,000 in missed repairs. The next storm season, AI answered every call: flat roof repairs, leadwork, slate replacements — all captured while he was on the tools.",
        ],
        stats: [
          { label: "Week 1 (storm)", value: "14 calls · 4 jobs · £1,400 recovered" },
          { label: "Week 2", value: "18 calls · 6 jobs · £2,100 recovered — incl. a £900 flat roof repair" },
          { label: "Week 3", value: "16 calls · 5 jobs · £1,850 recovered — incl. £650 leadwork on a Victorian bay" },
        ],
        result:
          "Every storm-week call now gets answered. Tom's phone stopped being the bottleneck in his best revenue season.",
      },
    ],
    leadGen: {
      heading: "Roofing Lead Generation: The Complete Guide for UK Roofers",
      intro:
        "Roofing is one of the highest-value trades in the UK — a full re-roof is worth £8,000–£25,000, storm damage repairs average £450–£800, even gutter cleaning runs £150–£300. But most roofers struggle with consistent leads because the biggest leak in the funnel isn't the website or reviews — it's the phone.",
      tips: [
        {
          title: "Your phone is your best roofing lead generation tool",
          body: "A roofer's enquiries split into three types: active leaks and storm damage (emergency — caller wants the first available roofer), visible deterioration (urgent — they'll wait a day or two), and planned work like extensions and insurance jobs (scheduled — they'll compare quotes). Missed calls kill the first two categories entirely. 69% of callers won't leave a voicemail; they ring the next roofer.",
        },
        {
          title: "Optimise your Google Business Profile for roofing leads",
          body: "Complete every field, post weekly updates, collect reviews systematically, add Q&A content ('Do you do storm damage repairs?'), enable messaging and respond fast, and use Google Posts for emergency availability during storm weeks. Businesses with complete profiles get 42% more direction requests and 35% more website clicks.",
        },
        {
          title: "Rank for 'roofer near me' and emergency terms",
          body: "Storm damage searches spike 340% during cold snaps and storm events. Pages targeting 'emergency roofer [town]', 'storm damage repair [town]' and 'flat roof repair [town]' capture the highest-intent traffic in the trade — but only if someone answers the phone when the click converts to a call.",
        },
        {
          title: "Convert missed roofing calls into booked jobs",
          body: "AI call handling qualifies each caller (emergency vs planned), captures the address and roof type, and delivers the enquiry to your WhatsApp in seconds. Storm weeks generate simultaneous calls — AI handles unlimited simultaneous calls, something no human receptionist can do. Every storm-damage caller captured is £450–£800; every re-roof enquiry is £8,000+.",
        },
      ],
    },
  },

  "for-locksmiths": {
    trade: "Locksmiths",
    stories: [
      {
        name: "Sarah",
        location: "Manchester",
        trade: "Emergency Locksmith",
        quote:
          "3am lockout calls were going to voicemail. Now I catch every single one. Somebody locked out at 3am is not browsing — they call the first locksmith who answers.",
        body: [
          "Sarah runs a 24/7 emergency locksmith service in Manchester — lockouts at 3am, broken keys, burglary repairs. When someone calls her, they're stressed, locked out, sometimes in danger. Every call is urgent. Every missed call is a competitor's job.",
          "Before AI call answering, her 3am lockout calls went straight to voicemail. Callers in distress don't leave messages — they work down the Google list until someone answers. She was losing the highest-value, highest-urgency jobs in her entire trade.",
          "She'd already tried a traditional call answering service at £150/month — the operators didn't understand locksmith terminology, couldn't distinguish a lockout from a security upgrade, and the message quality was poor. AI answered with trade-specific knowledge from day one.",
        ],
        stats: [
          { label: "Week 1", value: "22 calls answered · 8 jobs · £1,600 recovered" },
          { label: "Week 2", value: "25 calls · 9 jobs · £1,800 recovered — incl. a £450 shop security upgrade in Leeds city centre" },
          { label: "Week 3", value: "19 calls · 7 jobs · £1,400 recovered" },
        ],
        result:
          "Every 3am lockout now gets answered instantly. Sarah captures the calls that previously went to voicemail — and she did it at £59/month, less than half what the human answering service cost.",
      },
    ],
    leadGen: {
      heading: "24/7 Call Answering for Locksmiths: Why Lockouts Can't Wait",
      intro:
        "Lockouts are the most time-sensitive calls in UK trades. Understanding the call types — and what happens when they hit voicemail — is the difference between a full diary and lost jobs.",
      tips: [
        {
          title: "Why lockouts are the most time-sensitive calls in UK trades",
          body: "Three forces collide: immediate customer distress (someone locked out at 3am is cold, stressed, sometimes unsafe), rapid competitor cycling (callers ring the next 3–4 locksmiths within minutes), and after-hours concentration (the majority of lockouts happen outside standard working hours). The first locksmith to answer wins the job almost every time.",
        },
        {
          title: "Prioritise lockout calls vs security upgrade enquiries",
          body: "Emergency lockouts: customer locked out, broken key, post-burglary lock replacement — premium pricing, immediate response. Security upgrades: new locks, uPVC repairs, smart lock installs — planned work, quotable. AI distinguishes between the two and handles each appropriately: instant WhatsApp alert with full details for emergencies, structured enquiry for upgrades.",
        },
        {
          title: "After-hours calls are your biggest hidden revenue source",
          body: "94% of overnight calls go unanswered by small UK businesses. For a 24/7 locksmith, after-hours work commands premium rates — yet that's exactly when a sole trader is asleep. AI answers at 3am, captures the job, and you call back when you wake up to booked work, not a voicemail graveyard.",
        },
        {
          title: "Capture high-value security upgrade enquiries",
          body: "The mixed enquiry — 'I'm locked out AND I want better locks' — is common. AI captures both parts: the immediate emergency and the upsell opportunity. A £80 lockout becomes a £80 callout plus a £300–£500 security upgrade survey.",
        },
      ],
    },
  },

  "for-heating-engineers": {
    trade: "Heating Engineers",
    stories: [
      {
        name: "Charlie",
        location: "Manchester",
        trade: "Heating Engineer",
        quote:
          "£12,000 in one winter to missed boiler calls. Here's the exact maths — because I counted every single one.",
        body: [
          "Charlie is a heating engineer covering Manchester. Winter is his goldmine — and his bottleneck. Boiler breakdowns cluster in cold snaps, and he physically cannot answer the phone while bleeding a radiator in Stretford or crawling through a loft.",
          "In January 2026 he counted: 34 genuine boiler jobs he couldn't answer, at his £350 average. That is £11,900 in lost revenue in a single month. The calls that stung most: a £580 emergency callout at 2am (asleep — gone), a £890 PCB board job where the customer paid a rival £210 more, and £800 of landlord certificates captured from a loft with no signal.",
          "94% of overnight calls go unanswered across small UK businesses — and 69% of people who hit voicemail don't leave a message. In January, with AI answering every missed call, he recovered £8,400 of captured call revenue at a cost of £125/month — a 6,620% ROI. Net gain after subscription: £8,275 in one month.",
        ],
        stats: [
          { label: "January losses", value: "34 missed boiler jobs × £350 = £11,900" },
          { label: "Recovered (4 weeks)", value: "£8,400 captured call revenue" },
          { label: "Cost", value: "£125/month (Growth plan)" },
          { label: "ROI", value: "6,620% — net gain £8,275 in one month" },
        ],
        result:
          "One recovered £580 emergency callout paid for nearly five months of the service. Winter stopped being the season of lost money and became what it should be: his most profitable time of year.",
      },
    ],
    leadGen: {
      heading: "Emergency Call Handling for Heating Engineers",
      intro:
        "Boiler breakdown calls are the most time-sensitive in trades — and the most valuable to capture. Here's how heating emergencies work and how to handle them without losing the jobs you're on.",
      tips: [
        {
          title: "Why boiler breakdown calls are the most time-sensitive in trades",
          body: "Four forces: weather-dependent clustering (breakdowns spike 340% during cold snaps), after-hours and weekend concentration (exactly when you're off the clock), customer panic and rapid decision-making (no heating in January = immediate action), and high callback value (every emergency customer is a future annual service). Missed-call volume for heating engineers rises 340% in winter — the same weeks you can least afford to answer.",
        },
        {
          title: "Identify and prioritise genuine heating emergencies",
          body: "Genuine emergencies: no heating in winter with vulnerable occupants, no hot water for a family, suspected gas leak (advise to call the National Gas Emergency line), total boiler failure in freezing weather. Urgent but not emergency: one radiator cold, intermittent fault, pressure drop with heating still working. Routine: annual services, landlord certificates, upgrades. AI triages callers into these buckets so you see the real emergencies first.",
        },
        {
          title: "After-hours calls are your hidden winter revenue",
          body: "Heating emergencies don't respect business hours — a boiler dies at 6pm on a Sunday in January. 94% of overnight calls go unanswered by small businesses. After-hours emergency work commands premium rates, and a captured 2am £580 callout is pure margin if someone (or something) answers while you sleep.",
        },
        {
          title: "Convert breakdown calls into replacement sales",
          body: "A captured breakdown call is often a £2,000–£4,500 boiler replacement enquiry in disguise. AI captures the boiler model, fault description, and property details — so when you call back, you arrive knowing the likely fix and can quote the replacement on the spot. Charlie's £1,200 boiler job was won because Katie captured the exact model number and fault before he even knew the call existed.",
        },
      ],
    },
  },

  "for-landscapers": {
    trade: "Landscapers",
    stories: [
      {
        name: "James",
        location: "Sheffield",
        trade: "Landscaper",
        quote:
          "I missed spring booking season entirely one year — mowing, hedge trimming, the lot. The calls went to voicemail and vanished. Now AI captured 47 calls in 3 weeks.",
        body: [
          "James runs a landscaping business — garden maintenance, patios, hedge work, turfing. His season compresses into spring and early summer, when everyone's garden wakes up at once and the phones ring constantly.",
          "The problem: spring is also when he's busiest on the tools, and one bad year he missed the entire spring booking rush — dozens of mowing and trimming enquiries went to voicemail and evaporated. 69% of callers never leave a message; they just book the next landscaper.",
          "With AI call answering, spring changed completely: 47 calls captured across three weeks, including an £800 patio cleaning contract captured while he was trimming a hedge.",
        ],
        stats: [
          { label: "Week 1", value: "14 calls · 6 jobs · £1,200 recovered" },
          { label: "Week 2", value: "18 calls · 7 jobs · £1,500 recovered — incl. an £800 patio cleaning contract" },
          { label: "Week 3", value: "15 calls · 5 jobs · £900 recovered" },
        ],
        result:
          "£3,600 recovered in three spring weeks — and no more lost booking seasons. Landscapers live and die by the spring rush; every captured call is next season's booked work.",
      },
    ],
  },

  "for-joiners": {
    trade: "Joiners",
    stories: [
      {
        name: "Ross",
        location: "Glasgow",
        trade: "Joiner",
        quote:
          "The cheapest virtual receptionist I found (£150/month) still costs 2.5x more than whoza.ai Starter. And the AI includes features the human service charges extra for.",
        body: [
          "Ross spent two weeks researching virtual receptionist costs — four different services, spreadsheets, sales calls, free trials, and one very awkward call with a call centre in Milton Keynes. He wanted the honest numbers before spending anything.",
          "His comparison table: a traditional UK virtual receptionist costs £150–£400/month (£1,800–£4,800/year) with 2–5 days setup, one call per agent, email summaries, 12-month contracts typical, and trade knowledge that must be trained from scratch. AI call handling: £59/month (£708/year), 30-minute setup, unlimited simultaneous calls, WhatsApp delivery, pre-trained on trade terminology, no contract.",
          "Beyond cost: 24/7 answering is either an extra charge or not offered by human services; AI includes it. Message delivery by WhatsApp vs email summary. And callers often don't realise they're speaking to AI.",
        ],
        stats: [
          { label: "Monthly cost (UK)", value: "Virtual receptionist £150–£400 vs AI £59" },
          { label: "Annual cost", value: "£1,800–£4,800 vs £708" },
          { label: "Setup time", value: "2–5 days vs 30 minutes" },
          { label: "24/7 answering", value: "Extra charge or not offered vs included" },
          { label: "Simultaneous calls", value: "1 per agent vs unlimited" },
          { label: "Contract", value: "12-month typical vs none" },
        ],
        result:
          "Ross's verdict after the full two-week investigation: the cost comparison is now ridiculous. The cheapest human virtual receptionist costs 2.5x more than AI and includes fewer features.",
      },
    ],
  },
}
