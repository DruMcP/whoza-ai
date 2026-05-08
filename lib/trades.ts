export interface TradeData {
  slug: string
  singular: string
  plural: string
  display: string
  headline: string
  subheadline: string
  metaDescription: string
  problemStatements: string[]
  solutionStatements: string[]
  howItWorks: {
    step: number
    title: string
    description: string
  }[]
  faqs: {
    question: string
    answer: string
  }[]
  stats: {
    label: string
    value: string
  }[]
  relatedLocations: string[]
}

export const trades: TradeData[] = [
  {
    slug: "plumber",
    singular: "plumber",
    plural: "plumbers",
    display: "Plumbers",
    headline: "AI Call Answering for Plumbers — Never Miss an Emergency Again",
    subheadline: "Burst pipes, boiler breakdowns, blocked drains. Customers call when it hurts. Katie answers every call, qualifies the job, and sends the details to your phone in 30 seconds.",
    metaDescription: "Stop losing emergency plumbing jobs to missed calls. AI call answering for plumbers in the UK. Katie answers 24/7, qualifies jobs, and sends WhatsApp alerts. 14-day free trial.",
    problemStatements: [
      "Emergency calls go to voicemail — customer calls the next plumber on Google",
      "Quoting jobs over the phone wastes time you could spend fixing",
      "After-hours calls from tenants and landlords pile up unanswered",
      "You can't tell if it's a £50 tap fix or a £2,000 boiler replacement until you call back"
    ],
    solutionStatements: [
      "Katie answers every call in 2 rings — even at 2am on a Sunday",
      "She asks: postcode, problem type, urgency, budget — then pings your WhatsApp",
      "You see 'Emergency burst pipe — SW11 — tenant — call back urgently' before you even pick up",
      "Customers feel heard. You feel in control. Jobs get booked while you sleep"
    ],
    howItWorks: [
      { step: 1, title: "Customer calls your number", description: "Katie picks up instantly with a friendly, professional greeting customised for your plumbing business" },
      { step: 2, title: "She qualifies the job", description: "Asks for postcode, problem type (leak, boiler, drain, etc.), urgency level, and property type" },
      { step: 3, title: "You get a WhatsApp alert", description: "Full job details arrive on your phone in 30 seconds — postcode, problem, urgency, and customer number" },
      { step: 4, title: "Accept, callback or decline", description: "Tap to accept the job, schedule a callback, or decline if you're fully booked — customer gets an instant SMS update" }
    ],
    faqs: [
      { question: "How much does AI call answering cost for a plumber?", answer: "Whoza starts at £59/month + VAT for the Starter plan. That's less than the cost of one missed emergency call. Every plan includes unlimited AI calls, WhatsApp delivery, and 14-day free trial. Overage minutes are £0.26/minute." },
      { question: "Can Katie handle emergency plumbing calls at 2am?", answer: "Yes. Katie answers 24/7, including nights, weekends, and bank holidays. She identifies emergency calls (burst pipes, no heating, gas leaks) and marks them as high urgency in your WhatsApp alert so you see them first." },
      { question: "What information does Katie collect from plumbing customers?", answer: "Katie collects: full name, phone number, postcode, property type (house/flat/commercial), problem description, urgency level (routine/urgent/emergency), preferred appointment time, and how they found you." },
      { question: "Will customers know they're talking to AI?", answer: "Yes — Katie introduces herself as your AI assistant. Customers appreciate the honesty and the instant response. Most prefer a friendly AI that answers immediately over voicemail or a ringing phone." },
      { question: "How do I get plumbing reviews after completing a job?", answer: "Claire — our review collection agent — automatically sends a WhatsApp message to every customer whose job you mark as complete. She asks for a Google review, makes it one-tap easy, and follows up politely if needed." }
    ],
    stats: [
      { label: "Plumbing calls missed weekly", value: "68%" },
      { label: "Average emergency call value", value: "£340" },
      { label: "Setup time", value: "30 min" }
    ],
    relatedLocations: ["london", "manchester", "birmingham", "glasgow", "bristol", "liverpool"]
  },
  {
    slug: "electrician",
    singular: "electrician",
    plural: "electricians",
    display: "Electricians",
    headline: "AI Call Answering for Electricians — Capture Every Spark of Opportunity",
    subheadline: "Electrical faults, rewiring quotes, safety certificates. When customers call, they're often worried or in a hurry. Katie answers in seconds, calms the situation, and captures every detail.",
    metaDescription: "AI call answering for electricians in the UK. Katie answers emergency and routine calls 24/7, qualifies electrical jobs, and sends WhatsApp alerts. Never miss a £500+ job again. Free trial.",
    problemStatements: [
      "Emergency electrical calls (no power, sparking sockets) go unanswered after 6pm",
      "You can't quote EICRs or rewires over the phone — but you need the lead details",
      "Domestic, commercial, and landlord enquiries all need different qualification",
      "Repeat callers (property managers) want to feel recognised — but you can't remember every name"
    ],
    solutionStatements: [
      "Katie answers every electrical call with a calm, professional tone",
      "She identifies emergency vs. routine, domestic vs. commercial, and property size",
      "Landlord enquiries get tagged for fast follow-up — your biggest repeat customer base",
      "Regular customers are recognised by phone number and greeted by name"
    ],
    howItWorks: [
      { step: 1, title: "Customer calls about an electrical issue", description: "Katie answers with your branded greeting and immediately asks whether it's an emergency (no power, sparking, burning smell) or routine work" },
      { step: 2, title: "Job details captured in 45 seconds", description: "Postcode, property type, job category (fault finding, rewiring, EICR, EV charger, etc.), and whether it's a landlord or homeowner" },
      { step: 3, title: "Smart alert sent to your phone", description: "WhatsApp message with full context: 'Emergency fault — no power — 3-bed house — SE22 — landlord — callback urgently'" },
      { step: 4, title: "Accept and book, or queue for tomorrow", description: "Tap to accept, schedule a callback with time preference, or queue for your next available slot — customer gets confirmation instantly" }
    ],
    faqs: [
      { question: "Can Katie handle emergency electrical calls?", answer: "Yes. Katie is trained to identify electrical emergencies (no power, burning smell, sparking, shock risk) and marks them as highest priority. You'll get an immediate WhatsApp alert with an emergency tag so you can respond within minutes." },
      { question: "How does AI call answering work for EICR and landlord certificates?", answer: "Katie recognises landlord and letting agent enquiries by asking the right questions. She captures property portfolio size, certificate type (EICR, PAT, fire alarm), number of properties, and urgency. These are tagged as 'landlord' in your dashboard for fast bulk follow-up." },
      { question: "Can customers book appointments directly?", answer: "Yes. Katie can check your calendar availability and offer specific time slots. When a customer confirms, the appointment is saved to your dashboard and both parties receive confirmation messages." },
      { question: "What if I need to call the customer back first?", answer: "Tap 'Call Back' in your WhatsApp alert. Katie sends the customer an SMS with your estimated callback time. When you're ready, the customer's number and full job details are one tap away." },
      { question: "Is there a setup fee for electricians?", answer: "No setup fee. The £59/month Starter plan includes everything: AI answering, WhatsApp alerts, enquiry dashboard, and review collection. You can be live and taking calls within 30 minutes of signup." }
    ],
    stats: [
      { label: "Electrical calls go unanswered", value: "61%" },
      { label: "Average EICR lead value", value: "£180" },
      { label: "Emergency call response time", value: "3 min" }
    ],
    relatedLocations: ["london", "manchester", "birmingham", "leeds", "glasgow", "bristol", "liverpool", "edinburgh"]
  },
  {
    slug: "builder",
    singular: "builder",
    plural: "builders",
    display: "Builders",
    headline: "AI Call Answering for Builders — From Enquiry to Project Brief",
    subheadline: "Extensions, renovations, new builds. Big jobs start with a phone call. Katie captures the full project scope, budget signals, and timeline — so you walk into every quote meeting prepared.",
    metaDescription: "AI call answering for builders and construction companies. Katie qualifies extension, renovation, and new build enquiries 24/7. Captures budget range, timeline, and project scope. Free 14-day trial.",
    problemStatements: [
      "Extension and renovation enquiries need detailed qualification — but you miss the call on site",
      "Unqualified site visits waste half a day and cost £200+ in fuel and labour",
      "You can't tell if it's a £5k loft conversion or a £50k extension from a missed call",
      "Multiple decision-makers (couples) — Katie speaks to whoever calls, captures both contacts"
    ],
    solutionStatements: [
      "Katie qualifies building projects with 8 key questions — budget, timeline, property type, planning status",
      "You get a full project brief on WhatsApp before you even call back",
      "Budget signals help you prioritise: £50k+ extensions get flagged for same-day callback",
      "Both partners' contact details captured — no more 'let me check with my wife' delays"
    ],
    howItWorks: [
      { step: 1, title: "Homeowner calls about an extension", description: "Katie answers with your building company's branded greeting and asks about project type, property size, and budget range" },
      { step: 2, title: "Full project qualification", description: "Captures: project type (extension, renovation, new build, loft conversion), property type and size, budget range, timeline, planning permission status, and both decision-makers' contacts" },
      { step: 3, title: "Project brief to your phone", description: "WhatsApp alert: 'Extension enquiry — 4-bed detached — £40-60k budget — 6-month timeline — planning not yet applied — SW19 — both partners contactable'" },
      { step: 4, title: "Accept for site visit or request more info", description: "Tap to accept (triggers site visit booking), call back (sends SMS to customer), or decline (sends polite referral message)" }
    ],
    faqs: [
      { question: "Can Katie qualify building project budgets?", answer: "Yes. Katie tactfully asks for budget range using bracketed options (£10-20k, £20-50k, £50k+). This helps you prioritise high-value enquiries and avoid unqualified site visits. The budget is included in every WhatsApp alert." },
      { question: "Does AI call answering work for large construction projects?", answer: "Yes. Katie handles everything from small repairs to £500k+ commercial builds. For large projects, she captures additional details: project manager contact, architect details, planning reference number, and tender deadline." },
      { question: "Can Katie handle multiple project types?", answer: "Yes. Katie is trained to identify and categorise: extensions, loft conversions, basement conversions, renovations, new builds, commercial fit-outs, maintenance contracts, and emergency repairs. Each type gets routed with the right qualification questions." },
      { question: "How do I handle follow-up with qualified leads?", answer: "Your dashboard shows every qualified lead with full project details. Tap 'Call Back' to schedule a follow-up, 'Accept' to move to quote stage, or 'Decline' to free up capacity. Claire sends review requests after every completed project." },
      { question: "What's the ROI for builders using AI call answering?", answer: "One missed £40k extension pays for 5+ years of Whoza. Builders using Katie report capturing 40% more enquiries and reducing unqualified site visits by 60%. Average ROI is 12x in the first quarter." }
    ],
    stats: [
      { label: "Builder enquiries missed monthly", value: "54%" },
      { label: "Average extension project value", value: "£45k" },
      { label: "Unqualified site visits saved", value: "60%" }
    ],
    relatedLocations: ["london", "manchester", "birmingham", "leeds", "glasgow", "bristol", "liverpool", "edinburgh"]
  },
  {
    slug: "roofer",
    singular: "roofer",
    plural: "roofers",
    display: "Roofers",
    headline: "AI Call Answering for Roofers — Every Leak is a Lead",
    subheadline: "Storm damage, slipped tiles, full re-roofs. When water's coming through the ceiling, customers call fast and expect an answer. Katie never misses a roofing call — rain or shine, day or night.",
    metaDescription: "AI call answering for roofers in the UK. Katie captures emergency leak calls, storm damage enquiries, and full re-roof quotes 24/7. WhatsApp alerts with job details and photos. Free trial.",
    problemStatements: [
      "Storm damage calls peak when you're already on a roof — impossible to answer",
      "Customers with active leaks will call 3-4 roofers — first to answer gets the job",
      "Insurance work requires photos and documentation — hard to capture over a ringing phone",
      "You can't see the roof from the ground — but you need to know if it's a tile fix or full re-roof"
    ],
    solutionStatements: [
      "Katie answers every roofing call while you're up a ladder or driving between jobs",
      "She identifies leak severity, roof type, property age, and insurance status",
      "Customers can text photos to a dedicated number — Katie links them to the enquiry",
      "Insurance work flagged for immediate callback — these are your highest-value jobs"
    ],
    howItWorks: [
      { step: 1, title: "Storm hits — phones start ringing", description: "Katie answers every call with your roofing company's greeting. She identifies if it's an active leak, storm damage, or routine maintenance" },
      { step: 2, title: "Roof-specific qualification", description: "Captures: roof type (tile, slate, flat, metal), property age, leak location, insurance status, and whether photos are available. Active leaks get emergency priority" },
      { step: 3, title: "WhatsApp with full context", description: "Alert shows: 'Active leak — bedroom ceiling — 1930s semi — tiled roof — insured — photos available — urgent callback' with customer number and photo link" },
      { step: 4, title: "Accept emergency or schedule survey", description: "For active leaks: tap to accept and head straight there. For quotes: schedule a roof survey with time preference. Insurance work gets flagged for priority handling" }
    ],
    faqs: [
      { question: "How does Katie handle storm damage emergencies?", answer: "Katie identifies storm damage by keywords (leak, water coming through, storm, wind damage) and marks the enquiry as emergency priority. You'll get an immediate WhatsApp with 'STORM DAMAGE — URGENT' in the header. Customers also receive an SMS confirming help is on the way." },
      { question: "Can customers send roof photos to Katie?", answer: "Yes. Katie invites customers to send photos to a dedicated WhatsApp number. Photos are automatically linked to the enquiry in your dashboard, so you can assess the damage before you even call back." },
      { question: "Does AI call answering work for insurance roofing claims?", answer: "Yes. Katie specifically asks about insurance status and captures the insurance company name, policy number, and loss adjuster details when available. Insurance work is tagged as 'insurance' in your dashboard for specialised follow-up." },
      { question: "What if I can't get to an emergency call immediately?", answer: "Tap 'Call Back' and set an estimated arrival time. Katie sends the customer an SMS: 'Your roofer will call you back within 30 minutes. Emergency priority confirmed.' Most customers appreciate the transparency over silence." },
      { question: "How much is a missed roofing job worth?", answer: "Emergency tile repairs average £200-400. Full re-roofs are £8,000-25,000. Insurance claims can exceed £50,000. At £59/month, capturing one missed re-roof pays for 10+ years of Whoza." }
    ],
    stats: [
      { label: "Roofing calls missed in storms", value: "73%" },
      { label: "Average emergency repair value", value: "£320" },
      { label: "Full re-roof average value", value: "£14k" }
    ],
    relatedLocations: ["manchester", "birmingham", "leeds", "glasgow", "liverpool", "edinburgh"]
  },
  {
    slug: "landscaper",
    singular: "landscaper",
    plural: "landscapers",
    display: "Landscapers",
    headline: "AI Call Answering for Landscapers — From Garden Dream to Design Brief",
    subheadline: "Garden redesigns, patio installations, maintenance contracts. Customers have visions but struggle to describe them. Katie draws out the details — budget, timeline, garden size, style preferences — so you arrive with a plan, not just a tape measure.",
    metaDescription: "AI call answering for landscapers and garden designers. Katie qualifies garden projects 24/7, captures budget, style preferences, and timeline. Never miss a £10k+ garden redesign enquiry. Free trial.",
    problemStatements: [
      "Garden enquiries are vague ('I want something nice') — Katie asks the right questions to reveal scope",
      "You're working outdoors with dirty hands — answering the phone is impractical",
      "Seasonal peaks (spring rush) mean 3-4x normal call volume — impossible to handle alone",
      "Commercial maintenance contracts need different qualification than residential redesigns"
    ],
    solutionStatements: [
      "Katie qualifies garden projects with structured questions: size, style, features, budget, timeline",
      "She identifies commercial vs. residential, one-off vs. maintenance contract",
      "Spring rush? Katie handles unlimited simultaneous calls — no busy signals ever",
      "You get a full design brief: 'Garden redesign — 200m² — contemporary — patio + water feature — £15-25k — start in April'"
    ],
    howItWorks: [
      { step: 1, title: "Customer calls about a garden project", description: "Katie answers while you're mid-plant or on a digger. She asks whether it's a redesign, patio, driveway, maintenance, or tree work" },
      { step: 2, title: "Landscape qualification in 60 seconds", description: "Captures: garden size, property type, style preference (contemporary, traditional, low-maintenance, family-friendly), key features (patio, lawn, water feature, lighting), budget range, and start month" },
      { step: 3, title: "Design brief to your phone", description: "WhatsApp alert: 'Garden redesign — 150m² Victorian terrace — traditional style — patio + lawn + planting — £12-18k — start May — SW6' — full context before you call back" },
      { step: 4, title: "Accept for design visit or send portfolio", description: "Tap to accept (schedule design consultation), call back (send estimate first), or decline (sends polite message with referral). Commercial enquiries flagged for priority handling" }
    ],
    faqs: [
      { question: "Can Katie handle spring rush call volumes?", answer: "Yes. Katie handles unlimited simultaneous calls with zero wait time. During your busiest season, every caller gets answered instantly — no busy signals, no voicemail, no lost enquiries. One landscaper captured 23 enquiries in a single April Saturday using Katie." },
      { question: "How does AI call answering work for commercial landscaping contracts?", description: "Katie identifies commercial enquiries (business name, site address, contract type) and asks about: site size, service frequency (weekly/monthly), additional services (snow clearance, litter picking), contract length, and decision-maker details. Commercial leads are tagged for fast follow-up." },
      { question: "Can Katie collect garden photos from customers?", answer: "Yes. Katie invites customers to send photos of their current garden to a dedicated WhatsApp number. Photos are linked to the enquiry in your dashboard, so you can prepare ideas and a rough estimate before the design visit." },
      { question: "What information do I get for a landscaping enquiry?", answer: "Every WhatsApp alert includes: customer name and number, postcode, garden size, property type, project type, style preference, key features requested, budget range, timeline, how they found you, and whether photos are available. Commercial enquiries also include site details." },
      { question: "How do I convert landscaping enquiries into booked jobs?", answer: "Tap 'Accept' to move to design consultation booking. Katie checks your calendar and offers available slots. For budget-conscious customers, tap 'Call Back' to discuss options. After every completed project, Claire automatically requests a Google review to build your local reputation." }
    ],
    stats: [
      { label: "Garden enquiries missed in spring", value: "58%" },
      { label: "Average redesign project value", value: "£18k" },
      { label: "Commercial contract value", value: "£8k/yr" }
    ],
    relatedLocations: ["london", "manchester", "birmingham", "leeds", "glasgow", "bristol", "liverpool", "edinburgh"]
  },
  {
    slug: "hvac",
    singular: "hvac",
    plural: "hvac",
    display: "HVAC",
    headline: "AI Call Answering for HVAC Engineers — Hot Leads, Cool Conversions",
    subheadline: "Boiler breakdowns, AC installations, heat pump upgrades. When heating fails in winter or AC fails in summer, customers call in distress. Katie answers with empathy, qualifies the system type, and gets you the details fast.",
    metaDescription: "AI call answering for HVAC engineers and heating contractors. Katie handles boiler breakdowns, AC installations, and heat pump enquiries 24/7. WhatsApp alerts with system details and priority. Free trial.",
    problemStatements: [
      "Boiler breakdowns in winter = peak call volume when you're already on jobs",
      "Customers can't describe their heating system ('the white box thing') — Katie knows the right questions",
      "Heat pump enquiries are complex (government grants, MCS certification, property suitability)",
      "Landlord contracts and service agreements need different handling than one-off repairs"
    ],
    solutionStatements: [
      "Katie identifies system type from customer descriptions and asks clarifying questions",
      "Boiler make/model, fault symptoms, property size, and heating system type all captured",
      "Heat pump enquiries include grant eligibility, property age, and insulation status",
      "Landlord and letting agent calls tagged for service contract upsell"
    ],
    howItWorks: [
      { step: 1, title: "Customer calls with heating or cooling issue", description: "Katie answers with HVAC-specific greeting and identifies whether it's a breakdown, installation, service, or heat pump enquiry" },
      { step: 2, title: "System-specific qualification", description: "Captures: system type (boiler, furnace, AC, heat pump, ventilation), make/model if known, property size and type, fault symptoms, warranty status, and whether it's a landlord or homeowner" },
      { step: 3, title: "Smart alert with system context", description: "WhatsApp: 'Boiler breakdown — Worcester Bosch 30i — no hot water — 3-bed semi — warranty active — landlord — urgent — NW3' — you know the parts to bring before you arrive" },
      { step: 4, title: "Emergency repair or scheduled service", description: "Tap 'Accept' for emergency dispatch with ETA. Tap 'Call Back' to schedule service visit. Heat pump enquiries get routed to your specialist team with full property assessment notes" }
    ],
    faqs: [
      { question: "Can Katie identify different heating and cooling systems?", answer: "Yes. Katie is trained on common UK heating systems: combi boilers, system boilers, heat-only boilers, air source heat pumps, ground source heat pumps, electric heating, and air conditioning. She asks clarifying questions when customers describe symptoms ('no hot water', 'strange noise', 'error code E119')." },
      { question: "How does AI call answering handle heat pump enquiries?", answer: "Katie recognises heat pump interest and asks about: property age, insulation status, current heating system, garden space (for ground source), grant interest (Boiler Upgrade Scheme), and MCS certification requirements. These enquiries are tagged 'heat-pump' for specialist follow-up." },
      { question: "Can Katie handle landlord and service contract calls?", answer: "Yes. Katie identifies landlords and letting agents and asks about: number of properties, service contract status, certificate requirements (Gas Safety, EPC), and preferred service frequency. These are tagged 'landlord' for your service contract team." },
      { question: "What happens when a customer has an emergency breakdown?", answer: "Katie identifies emergency keywords (no heating, no hot water, leaking, error code, cold house) and marks the enquiry as emergency priority. You get an immediate WhatsApp with an 'EMERGENCY' header. Customer receives SMS: 'Emergency call logged. Engineer callback within 15 minutes.'" },
      { question: "How does the 14-day free trial work for HVAC companies?", answer: "Sign up, choose a UK number or forward your existing one, and Katie starts answering immediately. Full access to all features: AI answering, WhatsApp alerts, enquiry dashboard, and review collection. Cancel anytime before day 14 — no charge. Most HVAC companies see ROI within the first week." }
    ],
    stats: [
      { label: "HVAC calls missed in winter", value: "67%" },
      { label: "Average emergency repair", value: "£280" },
      { label: "Heat pump enquiry value", value: "£8k" }
    ],
    relatedLocations: ["london", "manchester", "birmingham", "leeds", "glasgow", "bristol"]
  },
  {
    slug: "painter",
    singular: "painter",
    plural: "painters",
    display: "Painters",
    headline: "AI Call Answering for Painters & Decorators — Colour Every Call with Revenue",
    subheadline: "Interior refresh, exterior repaints, commercial projects. Customers often underestimate the scope ('just a quick lick of paint'). Katie gently draws out the full job details — rooms, surfaces, access, timeline — so you quote with confidence.",
    metaDescription: "AI call answering for painters and decorators. Katie qualifies interior, exterior, and commercial painting jobs 24/7. Captures room count, surface types, access details, and budget. Free 14-day trial.",
    problemStatements: [
      "'Just a quick paint job' often turns into 3 rooms + ceilings + woodwork — but you find out too late",
      "You're up a ladder with paint on your hands — answering calls is dangerous and messy",
      "Commercial painting contracts need different pricing (sq metre rates, out-of-hours access, scaffolding)",
      "Colour consultation enquiries need time allocation — but you can't tell from a missed call"
    ],
    solutionStatements: [
      "Katie qualifies painting jobs with structured questions: rooms, surfaces, condition, access, finish type",
      "She identifies commercial vs. residential, interior vs. exterior, and new paint vs. repaint",
      "You get a full job spec: '3-bed interior — 4 rooms + hallway — walls + ceilings + woodwork — Dulux — start next week'",
      "Colour consultation requests flagged so you can allocate design time before the quote"
    ],
    howItWorks: [
      { step: 1, title: "Customer calls for a painting quote", description: "Katie answers while you're mid-brush or on scaffolding. She asks whether it's interior, exterior, or commercial, and how many rooms/surfaces" },
      { step: 2, title: "Painting job qualification", description: "Captures: room count and sizes, surface types (walls, ceilings, woodwork, doors), current condition (new plaster, repaint, repair needed), access (ground floor, scaffolding needed), finish type (matte, silk, eggshell), and preferred paint brand" },
      { step: 3, title: "Job spec to your phone", description: "WhatsApp: 'Interior repaint — 3 rooms + hallway — walls + ceilings + skirting — good condition — Dulux Trade — start in 2 weeks — SE15' — full spec before you quote" },
      { step: 4, title: "Accept for quote visit or send estimate", description: "Tap 'Accept' to schedule a quote visit with customer. Tap 'Call Back' to discuss via phone first. Commercial jobs tagged for priority handling and different pricing structure" }
    ],
    faqs: [
      { question: "Can Katie handle both residential and commercial painting enquiries?", answer: "Yes. Katie identifies commercial enquiries by asking about business type, site size, access hours, and whether scaffolding is required. Commercial jobs are tagged separately in your dashboard with priority handling." },
      { question: "How does AI call answering help with painting job quoting?", description: "Katie captures the full scope: room dimensions, surface condition, number of coats needed, paint brand preference, and access constraints. This lets you prepare an accurate estimate before visiting — saving time and improving close rates." },
      { question: "Can customers request specific paint brands?", answer: "Yes. Katie asks about paint brand preference (Dulux, Farrow & Ball, Benjamin Moore, etc.) and finish type (matte, eggshell, silk, gloss). This information appears in every WhatsApp alert so you can bring colour charts or stock the right products." },
      { question: "What about colour consultation requests?", answer: "Katie identifies colour consultation enquiries and captures: room purpose, lighting conditions, existing furniture colours, and style preference. These are tagged 'colour-consultation' in your dashboard so you can allocate design time and bring colour charts to the first visit." },
      { question: "How do I get reviews from painting customers?", answer: "After you mark a painting job as complete in your dashboard, Claire automatically sends a WhatsApp review request. Include before/after photos in your Google Business Profile to maximise review conversion. One decorator generated 47 reviews in 3 months using Claire." }
    ],
    stats: [
      { label: "Painting calls missed weekly", value: "52%" },
      { label: "Average 3-room interior value", value: "£2.4k" },
      { label: "Commercial repaint contract", value: "£15k" }
    ],
    relatedLocations: ["london", "manchester", "birmingham", "leeds", "glasgow", "bristol", "liverpool", "edinburgh"]
  }
]

export function getTradeBySlug(slug: string): TradeData | undefined {
  return trades.find((t) => t.slug === slug)
}

export function getAllTradeSlugs(): string[] {
  return trades.map((t) => t.slug)
}

export function getTradeDisplayName(slug: string): string {
  const trade = getTradeBySlug(slug)
  return trade?.display || slug
}

export function getRelatedLocationsForTrade(slug: string): string[] {
  const trade = getTradeBySlug(slug)
  return trade?.relatedLocations || []
}
