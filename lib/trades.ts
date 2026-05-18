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
    headline: "AI Call Handling for Plumbers — Never Miss an Emergency Again",
    subheadline: "Burst pipes, boiler breakdowns, blocked drains. Customers call when it hurts. Katie answers every call, qualifies the job, and sends the details to your phone in 30 seconds.",
    metaDescription: "Stop losing emergency plumbing jobs to missed calls. AI call handling for plumbers in the UK. Katie answers 24/7, qualifies jobs, and sends WhatsApp alerts. 7-day free trial.",
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
      { question: "How much does AI call handling cost for a plumber?", answer: "Whoza starts at £59/month + VAT for the Starter plan. For context:\n• One missed emergency plumbing call averages £180–£340 in lost revenue\n• A plumber missing just 5 calls per week loses approximately £43,200/year\n• The Starter plan pays for itself with one recovered job per month\nEvery plan includes unlimited AI calls, WhatsApp delivery, and a 7-day free trial. Overage minutes are £0.26/minute." },
      { question: "What percentage of plumbing calls go unanswered?", answer: "Industry data shows 74% of contractor calls go completely unanswered (NextPhone 2026). For plumbers specifically:\n• 62% of calls to small trade businesses are missed during work hours\n• 85% of callers who hit voicemail hang up without leaving a message\n• 78% of customers hire whichever plumber responds first\n• After-hours emergency calls have the highest abandonment rate — yet average £340 per call" },
      { question: "Can Katie handle emergency plumbing calls at 2am?", answer: "Yes. Katie answers 24/7 including nights, weekends, and bank holidays. For plumbing emergencies she:\n• Identifies emergency keywords instantly (burst pipe, no heating, gas leak, flooding)\n• Marks the alert as 'URGENT' in your WhatsApp so it appears first\n• Captures postcode, property type, and tenant/landlord status\n• Sends the full brief within 30 seconds of the call ending\nEmergency call-outs in the UK average £180–£340 — making after-hours capture one of the highest-ROI features for plumbers." },
      { question: "What information does Katie collect from plumbing customers?", answer: "Katie collects a complete job brief in under 45 seconds:\n• Full name and phone number\n• Postcode and property type (house/flat/commercial)\n• Problem description (leak, boiler, drain, heating, etc.)\n• Urgency level (routine / urgent / emergency)\n• Preferred appointment time\n• How they found you (Google, recommendation, etc.)\n• Budget signals (if mentioned)\nAll details appear in one WhatsApp message — no more playing voicemail tag or calling back blind." },
      { question: "Will customers know they're talking to AI?", answer: "Yes — Katie introduces herself as your AI assistant within the first sentence. This transparency actually builds trust:\n• 85% of callers who reach voicemail hang up and call the next plumber (Housecall Pro 2025)\n• Customers consistently prefer instant AI response over voicemail or ringing out\n• Katie uses natural conversation — no robotic menus or 'press 1' prompts\n• She understands trade terms: 'combi boiler,' 'macerator,' 'stopcock,' 'powerflush'\nThe result: customers feel heard, you get qualified leads, and nothing falls through the cracks." },
      { question: "How do I get plumbing reviews after completing a job?", answer: "Claire — our review collection agent — handles this automatically:\n1. Mark the job complete in your dashboard (or reply 'done' in WhatsApp)\n2. Claire sends a WhatsApp message to the customer within 24 hours\n3. Customer taps one button to leave a Google review — no searching, no links to copy\n4. If no review after 3 days, Claire follows up politely once\nOne plumber using Claire generated 47 Google reviews in 3 months, moving from 3.2 to 4.8 stars. Reviews include before/after photos automatically pulled from your job photos." }
    ],
    stats: [
      { label: "Plumbing calls go unanswered", value: "74%" },
      { label: "Average call-out value", value: "£180–£340" },
      { label: "Yearly loss (5 missed/wk)", value: "£43,200" }
    ],
    relatedLocations: ["london", "manchester", "birmingham", "glasgow", "bristol", "liverpool"]
  },
  {
    slug: "electrician",
    singular: "electrician",
    plural: "electricians",
    display: "Electricians",
    headline: "AI Call Handling for Electricians — Capture Every Spark of Opportunity",
    subheadline: "Electrical faults, rewiring quotes, safety certificates. When customers call, they're often worried or in a hurry. Katie answers in seconds, calms the situation, and captures every detail.",
    metaDescription: "AI call handling for electricians in the UK. Katie answers emergency and routine calls 24/7, qualifies electrical jobs, and sends WhatsApp alerts. Never miss a £500+ job again. Free trial.",
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
      { question: "Can Katie handle emergency electrical calls?", answer: "Yes. Katie is trained to identify electrical emergencies instantly:\n• No power / partial power loss\n• Burning smell or smoke from outlets\n• Sparking sockets or switches\n• Electric shock risk\n• Tripped RCD that won't reset\nEmergency calls are tagged 'URGENT' in your WhatsApp and pushed to the top of your alerts. UK emergency electricians charge £80–£200/hour + VAT for out-of-hours call-outs, making every captured emergency call highly valuable." },
      { question: "How does AI call handling work for EICR and landlord certificates?", answer: "Katie recognises landlord and letting agent enquiries by asking the right qualification questions:\n• Certificate type: EICR, PAT testing, fire alarm inspection, or EV charger install\n• Property portfolio size (single property vs. multiple)\n• Number of circuits / bedrooms\n• Certificate deadline (landlords need EICRs every 5 years)\n• Tenant access preferences\nThese are tagged 'landlord' in your dashboard for fast bulk follow-up. EICR pricing averages £150–£350 depending on property size, and landlords represent repeat, predictable revenue." },
      { question: "What do electricians charge per hour in 2026?", answer: "UK electrician rates in 2026 vary by location and job type:\n• Standard domestic rate: £45–£70/hour + VAT\n• Day rate: £350–£450/day + VAT\n• Emergency / out-of-hours: £80–£200/hour + VAT\n• EICR certificate: £150–£350 depending on property size\n• Consumer unit replacement: £350–£900 + VAT\nLondon rates run 20–40% higher than national averages. Katie captures budget signals from callers so you can prioritise high-value jobs and avoid unqualified site visits." },
      { question: "Can customers book appointments directly?", answer: "Yes. Katie can check your calendar availability and offer specific time slots. When a customer confirms:\n1. The appointment saves to your dashboard\n2. Both parties receive confirmation messages\n3. A reminder is sent 24 hours before\n4. Claire follows up for a review after completion\nFor EICRs and multi-property landlords, Katie can book bulk inspection slots and capture all property addresses in one call." },
      { question: "What if I need to call the customer back first?", answer: "Tap 'Call Back' in your WhatsApp alert. Katie automatically:\n• Sends the customer an SMS with your estimated callback time\n• Includes your business name so they recognise the number\n• Notes any specific questions they had (e.g., 'wants to discuss EV charger grants')\n• Flags urgency if they mentioned a safety issue\nYour dashboard shows every pending callback with customer details and call context — no more scribbled notes or forgotten follow-ups." },
      { question: "Is there a setup fee for electricians?", answer: "No setup fee. The £59/month Starter plan includes everything: AI answering, WhatsApp alerts, enquiry dashboard, and review collection. You can be live and taking calls within 30 minutes of signup." }
    ],
    stats: [
      { label: "Electrical calls unanswered", value: "74%" },
      { label: "Average EICR lead value", value: "£150–£350" },
      { label: "Emergency call-out rate", value: "£80–£200/hr" }
    ],
    relatedLocations: ["london", "manchester", "birmingham", "leeds", "glasgow", "bristol", "liverpool", "edinburgh"]
  },
  {
    slug: "builder",
    singular: "builder",
    plural: "builders",
    display: "Builders",
    headline: "AI Call Handling for Builders — From Enquiry to Project Brief",
    subheadline: "Extensions, renovations, new builds. Big jobs start with a phone call. Katie captures the full project scope, budget signals, and timeline — so you walk into every quote meeting prepared.",
    metaDescription: "AI call handling for builders and construction companies. Katie qualifies extension, renovation, and new build enquiries 24/7. Captures budget range, timeline, and project scope. Free 7-day trial.",
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
      { question: "Does AI call handling work for large construction projects?", answer: "Yes. Katie handles everything from small repairs to £500k+ commercial builds. For large projects, she captures additional details: project manager contact, architect details, planning reference number, and tender deadline." },
      { question: "Can Katie handle multiple project types?", answer: "Yes. Katie is trained to identify and categorise: extensions, loft conversions, basement conversions, renovations, new builds, commercial fit-outs, maintenance contracts, and emergency repairs. Each type gets routed with the right qualification questions." },
      { question: "How do I handle follow-up with qualified leads?", answer: "Your dashboard shows every qualified lead with full project details. Tap 'Call Back' to schedule a follow-up, 'Accept' to move to quote stage, or 'Decline' to free up capacity. Claire sends review requests after every completed project." },
      { question: "What's the ROI for builders using AI call handling?", answer: "One missed £40k extension pays for 5+ years of Whoza. Builders using Katie report capturing 40% more enquiries and reducing unqualified site visits by 60%. Average ROI is 12x in the first quarter." }
    ],
    stats: [
      { label: "Builder enquiries missed monthly", value: "68%" },
      { label: "Average extension value", value: "£40–£60k" },
      { label: "Unqualified site visit cost", value: "£200+" }
    ],
    relatedLocations: ["london", "manchester", "birmingham", "leeds", "glasgow", "bristol", "liverpool", "edinburgh"]
  },
  {
    slug: "roofer",
    singular: "roofer",
    plural: "roofers",
    display: "Roofers",
    headline: "AI Call Handling for Roofers — Every Leak is a Lead",
    subheadline: "Storm damage, slipped tiles, full re-roofs. When water's coming through the ceiling, customers call fast and expect an answer. Katie never misses a roofing call — rain or shine, day or night.",
    metaDescription: "AI call handling for roofers in the UK. Katie captures emergency leak calls, storm damage enquiries, and full re-roof quotes 24/7. WhatsApp alerts with job details and photos. Free trial.",
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
      { question: "Does AI call handling work for insurance roofing claims?", answer: "Yes. Katie specifically asks about insurance status and captures the insurance company name, policy number, and loss adjuster details when available. Insurance work is tagged as 'insurance' in your dashboard for specialised follow-up." },
      { question: "What if I can't get to an emergency call immediately?", answer: "Tap 'Call Back' and set an estimated arrival time. Katie sends the customer an SMS: 'Your roofer will call you back within 30 minutes. Emergency priority confirmed.' Most customers appreciate the transparency over silence." },
      { question: "How much is a missed roofing job worth?", answer: "Emergency tile repairs average £200-400. Full re-roofs are £8,000-25,000. Insurance claims can exceed £50,000. At £59/month, capturing one missed re-roof pays for 10+ years of Whoza." }
    ],
    stats: [
      { label: "Roofing calls missed in storms", value: "73%" },
      { label: "Emergency leak repair value", value: "£200–£400" },
      { label: "Full re-roof average value", value: "£14k" }
    ],
    relatedLocations: ["manchester", "birmingham", "leeds", "glasgow", "liverpool", "edinburgh"]
  },
  {
    slug: "landscaper",
    singular: "landscaper",
    plural: "landscapers",
    display: "Landscapers",
    headline: "AI Call Handling for Landscapers — From Garden Dream to Design Brief",
    subheadline: "Garden redesigns, patio installations, maintenance contracts. Customers have visions but struggle to describe them. Katie draws out the details — budget, timeline, garden size, style preferences — so you arrive with a plan, not just a tape measure.",
    metaDescription: "AI call handling for landscapers and garden designers. Katie qualifies garden projects 24/7, captures budget, style preferences, and timeline. Never miss a £10k+ garden redesign enquiry. Free trial.",
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
      { question: "How does AI call handling work for commercial landscaping contracts?", description: "Katie identifies commercial enquiries (business name, site address, contract type) and asks about: site size, service frequency (weekly/monthly), additional services (snow clearance, litter picking), contract length, and decision-maker details. Commercial leads are tagged for fast follow-up." },
      { question: "Can Katie collect garden photos from customers?", answer: "Yes. Katie invites customers to send photos of their current garden to a dedicated WhatsApp number. Photos are linked to the enquiry in your dashboard, so you can prepare ideas and a rough estimate before the design visit." },
      { question: "What information do I get for a landscaping enquiry?", answer: "Every WhatsApp alert includes: customer name and number, postcode, garden size, property type, project type, style preference, key features requested, budget range, timeline, how they found you, and whether photos are available. Commercial enquiries also include site details." },
      { question: "How do I convert landscaping enquiries into booked jobs?", answer: "Tap 'Accept' to move to design consultation booking. Katie checks your calendar and offers available slots. For budget-conscious customers, tap 'Call Back' to discuss options. After every completed project, Claire automatically requests a Google review to build your local reputation." }
    ],
    stats: [
      { label: "Landscaping calls missed", value: "58%" },
      { label: "Garden redesign avg value", value: "£15–£25k" },
      { label: "Commercial contract avg", value: "£8k/yr" }
    ],
    relatedLocations: ["london", "manchester", "birmingham", "leeds", "glasgow", "bristol", "liverpool", "edinburgh"]
  },
  {
    slug: "hvac",
    singular: "hvac",
    plural: "hvac",
    display: "HVAC",
    headline: "AI Call Handling for HVAC Engineers — Hot Leads, Cool Conversions",
    subheadline: "Boiler breakdowns, AC installations, heat pump upgrades. When heating fails in winter or AC fails in summer, customers call in distress. Katie answers with empathy, qualifies the system type, and gets you the details fast.",
    metaDescription: "AI call handling for HVAC engineers and heating contractors. Katie handles boiler breakdowns, AC installations, and heat pump enquiries 24/7. WhatsApp alerts with system details and priority. Free trial.",
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
      { question: "How does AI call handling handle heat pump enquiries?", answer: "Katie recognises heat pump interest and asks about: property age, insulation status, current heating system, garden space (for ground source), grant interest (Boiler Upgrade Scheme), and MCS certification requirements. These enquiries are tagged 'heat-pump' for specialist follow-up." },
      { question: "Can Katie handle landlord and service contract calls?", answer: "Yes. Katie identifies landlords and letting agents and asks about: number of properties, service contract status, certificate requirements (Gas Safety, EPC), and preferred service frequency. These are tagged 'landlord' for your service contract team." },
      { question: "What happens when a customer has an emergency breakdown?", answer: "Katie identifies emergency keywords (no heating, no hot water, leaking, error code, cold house) and marks the enquiry as emergency priority. You get an immediate WhatsApp with an 'EMERGENCY' header. Customer receives SMS: 'Emergency call logged. Engineer callback within 15 minutes.'" },
      { question: "How does the 7-day free trial work for HVAC companies?", answer: "Sign up, choose a UK number or forward your existing one, and Katie starts answering immediately. Full access to all features: AI answering, WhatsApp alerts, enquiry dashboard, and review collection. Cancel anytime before day 14 — no charge. Most HVAC companies see ROI within the first week." }
    ],
    stats: [
      { label: "HVAC calls missed (winter)", value: "74%" },
      { label: "Boiler breakdown avg value", value: "£280" },
      { label: "Heat pump install value", value: "£8–£15k" }
    ],
    relatedLocations: ["london", "manchester", "birmingham", "leeds", "glasgow", "bristol"]
  },
  {
    slug: "heating-engineer",
    singular: "heating engineer",
    plural: "heating engineers",
    display: "Heating Engineers",
    headline: "AI Call Handling for Heating Engineers — Boiler Breakdowns to Bookings",
    subheadline: "Boiler breakdowns, no hot water, gas safety checks. When a customer's heating fails in winter, every minute matters. Katie answers every call with empathy, qualifies the fault, and sends you the full job details before you even pick up.",
    metaDescription: "AI call handling for heating engineers and Gas Safe engineers in the UK. Katie answers boiler breakdowns, servicing, and installation calls 24/7. Captures fault details, boiler make/model, and property info via WhatsApp. 7-day free trial.",
    problemStatements: [
      "Boiler breakdowns in winter = peak call volume when you're already on jobs",
      "Customers can't describe their heating system ('the white box thing') — Katie knows the right questions",
      "Gas Safety Certificate enquiries need different handling than breakdowns",
      "Landlord contracts and annual service agreements need different follow-up than one-off repairs"
    ],
    solutionStatements: [
      "Katie identifies boiler type from customer descriptions and asks clarifying questions",
      "Boiler make/model, fault symptoms, property size, and heating system type all captured",
      "Gas Safety and annual service enquiries tagged for contract team follow-up",
      "Landlord and letting agent calls tagged for service contract upsell"
    ],
    howItWorks: [
      { step: 1, title: "Customer calls with heating issue", description: "Katie answers with heating-specific greeting and identifies whether it's a breakdown, service, installation, or Gas Safety enquiry" },
      { step: 2, title: "System-specific qualification", description: "Captures: boiler type (combi, system, heat-only), make/model if known, property size and type, fault symptoms, warranty status, and whether it's a landlord or homeowner" },
      { step: 3, title: "Smart alert with system context", description: "WhatsApp: 'Boiler breakdown — Worcester Bosch 30i — no hot water — 3-bed semi — warranty active — landlord — urgent — NW3' — you know the parts to bring before you arrive" },
      { step: 4, title: "Emergency repair or scheduled service", description: "Tap 'Accept' for emergency dispatch with ETA. Tap 'Call Back' to schedule service visit. Installations get routed to your sales team with full property assessment notes" }
    ],
    faqs: [
      { question: "Can Katie identify different boiler types?", answer: "Yes. Katie is trained on common UK boilers: combi, system, heat-only, and back boilers. She asks clarifying questions when customers describe symptoms ('no hot water', 'strange noise', 'error code E119')." },
      { question: "How does AI call handling work for Gas Safety Certificates?", answer: "Katie recognises CP12/Gas Safety enquiries and asks about: number of properties, certificate expiry date, appliance count, and preferred inspection time. These are tagged 'gas-safety' for your certification team." },
      { question: "Can Katie handle landlord and service contract calls?", answer: "Yes. Katie identifies landlords and letting agents and asks about: number of properties, service contract status, certificate requirements (Gas Safety, EPC), and preferred service frequency. These are tagged 'landlord' for your service contract team." },
      { question: "What happens when a customer has an emergency breakdown?", answer: "Katie identifies emergency keywords (no heating, no hot water, leaking, error code, cold house) and marks the enquiry as emergency priority. You get an immediate WhatsApp with an 'EMERGENCY' header. Customer receives SMS: 'Emergency call logged. Engineer callback within 15 minutes.'" },
      { question: "How does the 7-day free trial work for heating engineers?", answer: "Sign up, choose a UK number or forward your existing one, and Katie starts answering immediately. Full access to all features: AI answering, WhatsApp alerts, enquiry dashboard, and review collection. Cancel anytime before day 14 — no charge. Most heating engineers see ROI within the first week." }
    ],
    stats: [
      { label: "Heating calls missed (winter)", value: "74%" },
      { label: "Boiler breakdown avg value", value: "£280" },
      { label: "Boiler install avg value", value: "£3.5k" }
    ],
    relatedLocations: ["london", "manchester", "birmingham", "leeds", "glasgow", "bristol"]
  },
  {
    slug: "painter",
    singular: "painter",
    plural: "painters",
    display: "Painters",
    headline: "AI Call Handling for Painters & Decorators — Colour Every Call with Revenue",
    subheadline: "Interior refresh, exterior repaints, commercial projects. Customers often underestimate the scope ('just a quick lick of paint'). Katie gently draws out the full job details — rooms, surfaces, access, timeline — so you quote with confidence.",
    metaDescription: "AI call handling for painters and decorators. Katie qualifies interior, exterior, and commercial painting jobs 24/7. Captures room count, surface types, access details, and budget. Free 7-day trial.",
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
      { question: "How does AI call handling help with painting job quoting?", description: "Katie captures the full scope: room dimensions, surface condition, number of coats needed, paint brand preference, and access constraints. This lets you prepare an accurate estimate before visiting — saving time and improving close rates." },
      { question: "Can customers request specific paint brands?", answer: "Yes. Katie asks about paint brand preference (Dulux, Farrow & Ball, Benjamin Moore, etc.) and finish type (matte, eggshell, silk, gloss). This information appears in every WhatsApp alert so you can bring colour charts or stock the right products." },
      { question: "What about colour consultation requests?", answer: "Katie identifies colour consultation enquiries and captures: room purpose, lighting conditions, existing furniture colours, and style preference. These are tagged 'colour-consultation' in your dashboard so you can allocate design time and bring colour charts to the first visit." },
      { question: "How do I get reviews from painting customers?", answer: "After you mark a painting job as complete in your dashboard, Claire automatically sends a WhatsApp review request. Include before/after photos in your Google Business Profile to maximise review conversion. One decorator generated 47 reviews in 3 months using Claire." }
    ],
    stats: [
      { label: "Painting calls missed", value: "62%" },
      { label: "3-room interior avg value", value: "£2.4k" },
      { label: "Commercial repaint contract", value: "£15k" }
    ],
    relatedLocations: ["london", "manchester", "birmingham", "leeds", "glasgow", "bristol", "liverpool", "edinburgh"]
  }
]

export function getTradeBySlug(slug: string): TradeData | undefined {
  return trades.find((t) => t.slug === slug)
}

export function getAllTradeSlugs(): string[] {
  const ukOnly = ["heating-engineer"]
  const usOnly = ["hvac"]
  const all = trades.map((t) => t.slug)
  // Return all for static generation — routing handles UK/US filtering
  return all
}

export function getAvailableTradesForCountry(country: "uk" | "us"): TradeData[] {
  if (country === "uk") {
    // UK sees heating-engineer instead of hvac
    return trades.filter((t) => t.slug !== "hvac")
  }
  // US sees hvac instead of heating-engineer
  return trades.filter((t) => t.slug !== "heating-engineer")
}

export function getTradeDisplayName(slug: string): string {
  const trade = getTradeBySlug(slug)
  return trade?.display || slug
}

export function getRelatedLocationsForTrade(slug: string): string[] {
  const trade = getTradeBySlug(slug)
  return trade?.relatedLocations || []
}
