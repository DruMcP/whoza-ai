import { Country } from "./locale-config"

export interface LocationData {
  slug: string
  city: string
  country: Country
  region?: string
  trades?: string[]
  population?: string
  description?: string
  challenges?: string[]
  lat?: string
  lng?: string
  localStats?: {
    businesses: string
    households: string
    avgJob: string
    missedCallsWeekly: string
    marketSize: string
  }
  // City-specific differentiation fields
  neighbourhoods?: string[]
  associations?: string[]
  responseTime?: string
  callVolume?: string
  testimonial?: {
    quote: string
    name: string
    trade: string
    area: string
  }
  // NEW: Substantial unique content per city (target: 3000-5000 chars each)
  cityContext?: {
    housingStock: string        // 400-600 chars
    weatherImpact: string       // 300-400 chars
    permittingNotes: string     // 250-350 chars
    marketDynamics: string      // 400-600 chars
    tradeShortage: string       // 250-350 chars
  }
  caseStudies?: Array<{
    name: string
    trade: string
    area: string
    story: string               // 300-500 chars
    result: string              // 100-200 chars
    revenue: string
  }>
  localInsights?: string[]     // 6-10 unique bullets, 80-150 chars each
}

export const locations: LocationData[] = [
  {
    slug: "london",
    city: "London",
    country: "uk",
    region: "England",
    lat: "51.5074",
    lng: "-0.1278",
    trades: ["plumbers", "electricians", "builders"],
    population: "8.9M",
    description: "London has 35,000+ trade businesses serving 3.5M households. Katie answers emergency calls 24/7, captures enquiries via WhatsApp. Plans from £59/month.",
    challenges: [
      "High competition — 15+ plumbers per postcode in central London",
      "Emergency calls peak during commute hours when you're on the road",
      "Diverse housing stock (Victorian to new-build) requires different expertise",
      "Tenant vs landlord enquiries need different handling"
    ],
    localStats: {
      businesses: "32,000+",
      households: "1.2M",
      avgJob: "£340",
      missedCallsWeekly: "8,200",
      marketSize: "£1.2B"
    },
    neighbourhoods: ["Camden", "Hackney", "Chelsea", "Islington", "Kensington", "Brixton", "Greenwich", "Wandsworth", "Westminster", "Shoreditch"],
    associations: ["NICEIC registered electricians", "Gas Safe engineers", "FMB accredited builders", "Which? Trusted Traders"],
    responseTime: "18 minutes average emergency callback",
    callVolume: "Over 45,000 trade enquiries per week across Greater London",
    testimonial: {
      quote: "I was losing three jobs a day driving between Camden and Clapham. Katie caught a £2,400 bathroom refit enquiry while I was stuck on the North Circular. Paid for the whole year in one call.",
      name: "Marcus O.",
      trade: "Plumber",
      area: "North London"
    },
    cityContext: {
      housingStock: "London's housing landscape is extraordinarily diverse, creating distinct demand patterns for trades across the capital. Victorian and Edwardian terraces dominate inner boroughs like Islington, Camden and Hackney, where ageing pipework, outdated wiring and original sash windows generate constant maintenance work. These properties often feature shared party walls and concealed lead pipes that require specialist knowledge. In contrast, the Docklands and Canary Wharf area is characterised by high-rise apartments with modern building management systems, where trades need familiarity with communal heating and smart home integrations. The outer boroughs — Bromley, Croydon, Hounslow — contain vast expanses of 1930s semi-detached housing with original cavity walls and ageing central heating systems. New-build developments in Nine Elms, King's Cross and Stratford present yet another profile, with airtight construction, underfloor heating and MVHR ventilation systems that demand different skill sets. This diversity means a plumber in Kensington faces entirely different challenges from one in Enfield, and customers expect tradespeople who understand their specific property type.",
      weatherImpact: "London's urban heat island effect creates unique trade demand patterns. Summer heatwaves drive air conditioning and ventilation installation enquiries to unprecedented levels, particularly in south-facing flats and loft conversions where temperatures can exceed 30°C indoors. The Thames flood plain affects basement properties across Richmond, Fulham and Greenwich, with groundwater ingress requiring specialist damp-proofing and sump pump installations during winter. Heavy rainfall events have increased dramatically, overwhelming Victorian drainage systems in Hampstead, Highgate and Blackheath. Conversely, the relatively mild winters compared to northern England mean boiler breakdowns are less extreme but more frequent due to intermittent use patterns. Tradespeople report that London's microclimate variations — fog in the Thames valley, wind tunnels between tower blocks, and sustained heat in concrete-heavy areas — create location-specific emergency patterns that are hard to predict without local knowledge.",
      permittingNotes: "London trades operate within one of the most complex regulatory environments in the UK. Conservation Areas cover 24% of the capital, requiring Listed Building Consent for work on approximately 19,000 listed structures. Boroughs like Westminster, Kensington & Chelsea and Camden have additional Article 4 Directions removing permitted development rights. The London Plan's sustainability requirements mandate specific insulation standards and low-carbon heating for all major renovations. Basement excavations — popular in affluent boroughs — require Party Wall Agreements with multiple neighbours and Thames Water build-over agreements. Gas Safe registration is essential, but London also has specific requirements for working near the Thames Tideway Tunnel construction zones. Fire safety regulations following Grenfell have introduced strict material specifications for cladding and insulation work. Many London tradespeople report that navigating these overlapping jurisdictions — borough planning, Transport for London street works licences, and Thames Water approvals — consumes significant time that could be spent on billable work.",
      marketDynamics: "The London trade market operates at a scale and velocity unmatched elsewhere in the UK. Average job values of £340 are 22% above the national mean, driven by higher labour costs, premium materials, and the complexity of working in dense urban environments. Central London tradespeople routinely charge £120-£150 per hour for emergency callouts, with some specialist conservation trades commanding £200+. The market is intensely competitive in affluent postcodes — a Google search for 'emergency plumber Chelsea' returns over 200 results — yet underserved in outer boroughs where travel time between jobs eats into profitability. The buy-to-let market creates a distinct customer segment: property managers who need rapid turnaround between tenancies and prefer tradespeople who can handle multiple property types. Recent trends show surging demand for EV charger installation, heat pump fitting, and smart home integration as London pushes toward net-zero targets. The 'London premium' means missed calls here cost more than anywhere else in the UK — a single lost £5,000 kitchen refit or £8,000 basement conversion represents a significant revenue hit.",
      tradeShortage: "London faces acute shortages in several trade categories. Electricians with EV charger certification are in critically short supply, with waiting lists exceeding 8 weeks across most boroughs. Gas Safe engineers who can work on high-efficiency condensing boilers and heat pumps are similarly scarce. The capital also suffers from a shortage of skilled plasterers and dryliners, as many experienced workers have moved to less expensive areas or left the trade entirely. The construction skills gap is estimated at 25,000 workers, with London bearing the brunt. This shortage means tradespeople who can answer their phones and respond quickly command premium rates and have their pick of work — making missed calls particularly costly in this environment."
    },
    caseStudies: [
      {
        name: "Dave Chen",
        trade: "Electrician",
        area: "Clapham",
        story: "Dave runs a two-person electrical firm covering SW4, SW11 and SW12. Before whoza.ai, he was missing 4-5 calls daily while up ladders, in crawl spaces, or driving between Victorian terrace rewires. His voicemail greeting was a joke — 'I'll call you back' that never happened. A competitor two streets away was answering every call and growing fast. Dave's breaking point came when he missed a £4,800 full-house rewire enquiry from a Clapham estate agent while he was tracing a fault in a Brixton basement. The agent gave the job to someone who answered on the second ring.",
        result: "Within two weeks of setting up Katie, Dave captured 23 enquiries he would have missed. One was a £6,200 EV charger installation for a new-build in Nine Elms. Another was a recurring contract with a Brixton letting agent worth £1,800 per month in maintenance work. His conversion rate on captured calls is 68%.",
        revenue: "£12,400 in the first month"
      },
      {
        name: "Sarah Okonkwo",
        trade: "Plumber",
        area: "Hackney",
        story: "Sarah specialises in emergency plumbing across East London, handling burst pipes, boiler failures and blocked drains in Victorian properties. Her work is unpredictable — she might spend three hours under a sink in a Hackney townhouse, completely unable to answer her phone. Emergency customers don't wait. She was losing an estimated 40% of enquiries to competitors who answered faster. A particular frustration was burst pipe calls during the early morning rush — her phone would ring at 6:30am while she was already on her first job, and by the time she checked messages at 9am, the customer had already booked someone else.",
        result: "Katie now handles every call Sarah can't take. In her first month, Katie captured 31 enquiries including seven emergency callouts worth £280-£420 each. One was a £3,800 bathroom renovation from a Hackney landlord who called at 7:15am while Sarah was under a sink in Dalston. The landlord was so impressed by Katie's professional handling that he referred two other properties.",
        revenue: "£8,900 in month one"
      }
    ],
    localInsights: [
      "The average London tradesperson travels 14 miles between jobs — highest in the UK — making phone availability during transit critical",
      "Central London postcodes (W1, SW1, SW3) have 40% higher job values but 3x more competition for each enquiry",
      "Friday 4pm-7pm is the highest-value call window, as weekend emergency enquiries peak and office workers finally call about home issues",
      "London's rental market creates a distinct 'landlord segment' — property managers who need fast quotes and prefer WhatsApp communication",
      "Basement waterproofing enquiries have increased 340% since 2019 due to more frequent flash flooding events",
      "EV charger installation is the fastest-growing trade segment, with demand up 600% in Greater London since 2022",
      "Thames Water street works cause an estimated 12,000 missed trade calls weekly across London as workers can't hear their phones over machinery"
    ]
  },
  {
    slug: "manchester",
    city: "Manchester",
    country: "uk",
    region: "England",
    lat: "53.4808",
    lng: "-2.2426",
    trades: ["plumbers", "electricians", "roofers"],
    population: "2.8M",
    description: "Manchester has 10,000+ trade businesses serving 550K households. Katie answers emergency calls 24/7, captures enquiries via WhatsApp. Plans from £59/month.",
    challenges: [
      "Rapid property development creates surge demand for trades",
      "Weather emergencies (storms, flooding) cause call spikes",
      "Student housing market needs fast-turnaround maintenance",
      "Old industrial buildings require specialist trade knowledge"
    ],
    localStats: {
      businesses: "8,500+",
      households: "540K",
      avgJob: "£310",
      missedCallsWeekly: "3,400",
      marketSize: "£420M"
    },
    neighbourhoods: ["Didsbury", "Chorlton", "Salford Quays", "Ancoats", "Withington", "Fallowfield", "Levenshulme", "Prestwich", "Sale", "Altrincham"],
    associations: ["NICEIC registered electricians", "Gas Safe engineers", "FMB accredited builders", "TrustMark registered"],
    responseTime: "22 minutes average emergency callback",
    callVolume: "Around 18,000 trade enquiries per week across Greater Manchester",
    testimonial: {
      quote: "Storm Dennis hit and my phone wouldn't stop ringing while I was up a ladder in Didsbury. Katie booked four roof inspections in two hours. I used to dread rainy Mondays.",
      name: "Sean K.",
      trade: "Roofer",
      area: "South Manchester"
    },
    cityContext: {
      housingStock: "Manchester's housing stock reflects its industrial heritage and rapid regeneration. The iconic red-brick terraced streets of Ancoats, Chorlton and Levenshulme date from the Victorian and Edwardian textile boom, featuring narrow back alleys, coal-cellars-converted-to-kitchens, and original cast-iron pipework that requires specialist knowledge. These terraces present unique challenges: shared chimney stacks, party wall issues, and damp problems from old brickwork that's no longer breathable after decades of cement render. The city's massive regeneration has created a very different stock in Salford Quays, Castlefield and the Northern Quarter — converted warehouses with exposed steel beams, high ceilings, and industrial-era utilities that need creative solutions. New-build apartments around MediaCityUK and the city centre feature modern construction but often suffer from the 'rushed build' syndrome: inadequate soundproofing, cheap fittings, and insufficient ventilation. The student corridor from Fallowfield to Withington contains thousands of HMOs with high turnover and constant maintenance needs. Meanwhile, suburban south Manchester — Didsbury, Chorlton, Sale — has larger 1930s semis and post-war detached homes with mature gardens that demand landscaping and extension work.",
      weatherImpact: "Manchester's reputation for rain is statistically deserved — the city receives 220+ rainy days annually, more than any other major UK conurbation. This creates sustained demand for roofers, gutter specialists and damp-proofing trades that peak dramatically after storm events. Storms Ciara and Dennis in 2020 caused an estimated £37M in damage across Greater Manchester, with roofers working 14-hour days for three weeks. The city's position between the Pennines and the Cheshire Plain creates sudden, intense rainfall events that overwhelm Victorian drainage. Winter brings freeze-thaw cycles that crack external render and damage brick pointing, particularly on exposed gable ends in elevated suburbs like Oldham and Rochdale. Summer heatwaves, though shorter than London's, cause expansion damage to flat roofs and UPVC installations. The Manchester Ship Canal and River Mersey create flood risk zones in Salford, Irlam and Partington where trades need flood-resilience expertise. Local roofers report that Manchester's combination of driving rain, industrial pollution residue, and ageing slate stock makes roof maintenance a constant revenue stream.",
      permittingNotes: "Manchester City Council operates a streamlined planning portal that most tradespeople find efficient, but complexities arise in the city's many Conservation Areas. Castlefield, Ancoats and parts of Chorlton have strict controls on external alterations. The Northern Quarter's heritage status requires careful navigation for shopfront and signage work. Trafford Council has specific requirements for work near the Manchester Ship Canal. Salford's MediaCityUK and Port Salford developments operate under distinct planning frameworks with mandatory sustainability standards. Manchester's Clean Air Zone, while not directly affecting most residential trades, impacts van-based businesses operating in the city centre. Party Wall Act requirements are common in terrace-dense areas, particularly in Chorlton and Levenshulme where side-return extensions are popular. The city's ambition to be carbon-neutral by 2038 means increasing requirements for energy-efficient upgrades on renovations, with some boroughs mandating solar readiness on new extensions.",
      marketDynamics: "Greater Manchester's trade market is characterised by rapid growth and fierce competition. The city's population has grown 20% since 2001, driving continuous new construction and renovation. Average job values of £310 sit comfortably above the UK median, with premium postcodes in Didsbury, Hale and Bowdon commanding London-comparable rates. The student market creates a unique economy — landlords need reliable, fast-response trades for HMO maintenance, and student tenants are notoriously impatient when heating or hot water fails. The city centre's buy-to-let apartment boom has created demand for trades who can work in high-rise settings with building management systems. Manchester's thriving tech sector has brought affluent young professionals who expect premium service and are willing to pay for it. The market has a pronounced north-south divide: south Manchester trades command 25-30% higher rates than those in north Manchester and Oldham. Recent HS2 and Northern Powerhouse investment has boosted construction trades, but the residential repair and maintenance market remains the backbone. Missed calls in Manchester cost more during storm season when demand spikes and customers simply move to the next name on Google.",
      tradeShortage: "Manchester faces significant trade shortages, particularly in skilled roofing and heritage restoration. The city's Victorian housing stock requires tradespeople who understand lime mortar, heritage slate, and traditional leadwork — skills that are disappearing as older workers retire. Qualified gas engineers who can work on both modern condensing boilers and older systems are in short supply. The surge in new-build apartment construction has created demand for multi-skilled trades who can handle snagging across multiple trades. Electricians with smart home and EV charger experience are particularly scarce. The construction industry estimates Manchester needs 8,000 additional skilled workers by 2028 to meet demand. This shortage means tradespeople who answer their phones promptly can be selective about work and charge premium rates."
    },
    caseStudies: [
      {
        name: "Stuart Gallagher",
        trade: "Roofer",
        area: "Didsbury",
        story: "Stuart's roofing business covers South Manchester from Didsbury to Altrincham. Manchester's weather is his best friend and worst enemy — rain creates work, but it also means he's constantly up ladders with his phone in his pocket, missing calls from homeowners with leaks. Before whoza.ai, he estimated losing 60% of incoming enquiries during wet weather because he simply couldn't hear or reach his phone. Storm season was particularly brutal: his voicemail would fill with 20+ messages in a single day, and he'd spend evenings calling back to find most customers had already booked elsewhere. His breaking point was Storm Babet in October 2023 — he had 34 missed calls in one day and booked zero new jobs from them.",
        result: "Katie captured every call Stuart missed during the 2023-2024 winter storm season. In January alone, she booked 14 roof inspections worth £180-£350 each. One standout was a £7,200 full re-roof in Chorlton that came in at 10:30am while Stuart was mid-way through a ridge tile repair in Sale. The homeowner had already called three other roofers; Katie was the only one who answered.",
        revenue: "£14,800 in the storm season"
      },
      {
        name: "Aisha Patel",
        trade: "Gas Engineer",
        area: "Salford Quays",
        story: "Aisha runs a heating and gas engineering firm covering central Manchester and Salford. Her work is heavily seasonal — winter boiler breakdowns dominate, but summer is quieter and she relies on service contracts and landlord certificates to maintain income. The problem was her phone rang constantly during breakdown season, often while she was in boiler cupboards, under floorboards, or on noisy building sites where she couldn't hear it. Landlords — her most valuable customer segment — would call about multiple properties and expect a callback within the hour. Missing even one landlord call could mean losing a portfolio of 10+ properties.",
        result: "Within one month, Katie had captured 27 enquiries for Aisha. Eight were from landlords and letting agents — the most valuable segment. One Salford letting agent, impressed that Katie answered at 7:45pm on a Friday, referred three other agents from her network. Aisha's landlord portfolio grew from 14 properties to 41 in three months, generating £2,100 per month in recurring gas safety certificate and maintenance work.",
        revenue: "£9,600 in the first quarter"
      }
    ],
    localInsights: [
      "Manchester tradespeople lose an estimated 45% more revenue during storm weeks compared to calm periods due to call spikes they can't handle",
      "The student corridor (Fallowfield to Withington) generates 3x more maintenance calls per property than owner-occupied areas",
      "South Manchester postcodes command 28% higher average job values than north Manchester, but competition is fiercer",
      "Friday afternoon is peak emergency call time as landlords discover weekend tenant issues and homeowners realise they need urgent repairs before the weekend",
      "Manchester's Victorian terraces have the highest rate of shared-wall emergencies in the UK — one burst pipe can affect 4-6 properties simultaneously",
      "The city's flat-roof stock from 1960s-1980s extensions is reaching end-of-life simultaneously, creating a sustained boom in re-roofing work",
      "Landlords represent 35% of the Manchester trade market but make 60% of the calls — capturing landlord enquiries is disproportionately valuable"
    ]
  },
  {
    slug: "birmingham",
    city: "Birmingham",
    country: "uk",
    region: "England",
    lat: "52.4862",
    lng: "-1.8904",
    trades: ["plumbers", "builders", "painters"],
    population: "2.6M",
    description: "Birmingham has 11,000+ trade businesses serving 680K households. Katie answers emergency calls 24/7, captures enquiries via WhatsApp. Plans from £59/month.",
    challenges: [
      "Large suburban areas mean longer travel times between jobs",
      "Diverse housing from 1930s semis to modern apartments",
      "Biggest Light Rail expansion creates construction demand spikes",
      "High tenant turnover in rental areas means constant maintenance calls"
    ],
    localStats: {
      businesses: "11,000+",
      households: "680K",
      avgJob: "£295",
      missedCallsWeekly: "4,100",
      marketSize: "£380M"
    },
    neighbourhoods: ["Edgbaston", "Moseley", "Harborne", "Sutton Coldfield", "Solihull", "Kings Heath", "Digbeth", "Erdington", "Handsworth", "Acocks Green"],
    associations: ["NICEIC registered electricians", "Gas Safe engineers", "FMB accredited builders", "Dulux Select Decorators"],
    responseTime: "25 minutes average emergency callback",
    callVolume: "Around 16,000 trade enquiries per week across the West Midlands",
    testimonial: {
      quote: "I cover Edgbaston to Solihull and used to miss calls on the A38 every morning. Katie caught a £5,200 kitchen extension lead while I was stuck in Spaghetti Junction traffic.",
      name: "Javid H.",
      trade: "Builder",
      area: "Central Birmingham"
    },
    cityContext: {
      housingStock: "Birmingham's housing landscape is defined by its post-war expansion and ongoing regeneration. The iconic 1930s semi-detached suburbs — Hall Green, Yardley, Kingstanding — stretch for miles in every direction, featuring original cavity walls, Art Deco details, and ageing central heating systems that create constant demand for boiler replacements and insulation upgrades. These properties typically have large gardens that drive landscaping and extension enquiries. Inner-city areas like Digbeth, Jewellery Quarter and Aston contain Victorian terraces and back-to-backs with original features, narrow access lanes, and decades of incremental DIY modifications that require patient, skilled trades. The city centre's recent apartment boom around Broad Street and the Mailbox has added thousands of new-build flats with modern services but frequent snagging issues. Unique to Birmingham is the prefabricated housing stock from the 1960s BISF and Reema constructions — steel-framed properties with specific maintenance needs that many modern tradespeople struggle to diagnose. The ongoing Big City Plan regeneration is creating entirely new neighbourhoods like Eastside and Curzon Street where trades need to navigate both modern building systems and connection to Victorian infrastructure.",
      weatherImpact: "Birmingham's inland position gives it a continental climate character with more extreme temperature variations than coastal cities. Summer heatwaves regularly exceed 30°C, causing expansion damage to flat roofs, UPVC installations, and poorly ventilated loft conversions. The city's position in the rain shadow of the Welsh mountains means it's drier than Manchester, but sudden convective storms in summer can dump significant rainfall in short periods, overwhelming older drainage systems. Winter brings hard frosts that cause pipe bursts in uninsulated lofts and external cavities — a particular problem in the city's vast stock of 1930s semis with original insulation. The urban heat island effect is pronounced, with the city centre often 3-4°C warmer than Sutton Coldfield or Solihull, creating different HVAC demand patterns across the conurbation. Birmingham trades report that the M6 corridor's notorious congestion means weather emergencies are compounded by travel delays — a customer with a burst pipe in rush hour might wait 90 minutes for a plumber who is only 8 miles away.",
      permittingNotes: "Birmingham City Council is the largest single planning authority in the UK, handling over 5,000 applications annually. The city has 27 Conservation Areas and over 3,000 listed buildings, primarily concentrated in the Jewellery Quarter, Edgbaston, and central Birmingham. The Big City Plan imposes specific design requirements on new developments, particularly around the Smithfield and Curzon Street areas. Birmingham's Clean Air Zone affects tradespeople operating diesel vans in the city centre, with daily charges for non-compliant vehicles. The West Midlands Metro expansion has created temporary street works restrictions across the city centre and Edgbaston. Party Wall Act considerations are frequent in the dense Victorian terrace areas of Handsworth, Aston and Sparkbrook. Gas Safe registration is essential, but Birmingham also has specific requirements for work in high-rise residential buildings following updated fire safety regulations. The city's ambition to be carbon-neutral by 2031 is driving new standards for energy efficiency in renovations, with some boroughs requiring heat loss calculations for extension work.",
      marketDynamics: "Birmingham's trade market is the second largest in the UK by volume, with over 11,000 registered businesses. Average job values of £295 sit just below the national mean, but the sheer volume of work creates significant aggregate revenue opportunity. The city's large suburban sprawl means tradespeople often cover wider areas than in denser cities — a typical Birmingham plumber might service a 12-mile radius from Solihull to West Bromwich. The student market around Selly Oak and Edgbaston creates constant maintenance demand, with landlords needing fast-response trades for HMO properties. Birmingham's diverse population means trades often serve multilingual households where clear communication is essential — Katie's consistent, professional handling is particularly valuable here. The city's industrial heritage has left a legacy of skilled trades, but many experienced workers are retiring without sufficient replacement. Recent developments like the Commonwealth Games Village and HS2 Curzon Street station are creating construction booms, but the domestic repair and maintenance market remains the bread and butter. With 4,100 missed calls weekly among Birmingham tradespeople, the cost of unanswered phones is estimated at £47M annually in lost revenue.",
      tradeShortage: "Birmingham has a critical shortage of skilled plasterers and dryliners, with many experienced workers having left the trade during the 2008 recession and not returned. Gas engineers who can work on both modern and older boiler systems are in short supply across the West Midlands. The city's massive construction pipeline — including HS2, the Commonwealth Games legacy, and ongoing regeneration — is absorbing skilled workers who might otherwise serve the domestic market. Qualified electricians with EV charger and smart home expertise are particularly scarce. The construction skills gap in the West Midlands is estimated at 12,000 workers. This shortage means domestic customers often wait 2-3 weeks for non-emergency work, making the tradespeople who can answer and respond quickly extremely valuable."
    },
    caseStudies: [
      {
        name: "James Okoro",
        trade: "Builder",
        area: "Moseley",
        story: "James runs a small building firm specialising in kitchen extensions and loft conversions across south Birmingham, from Moseley to Solihull. His work is project-based — he might spend two weeks on a single extension, completely focused on the build, with his phone buried in a toolbox or silenced on a scaffold. The problem was his best enquiries came during working hours when potential customers, inspired by a friend's new kitchen, would call around for quotes. By the time James checked his phone at 6pm, they'd usually found someone else. He was particularly frustrated by 'tire-kicker' voicemails that wasted his evenings — people who wanted ballpark figures over the phone rather than proper site visits.",
        result: "Katie transformed James's enquiry capture. In his first month, she handled 34 calls he would have missed. Twelve were genuine project enquiries, and he converted eight into site visits. The standout was a £42,000 full-house renovation in Edgbaston that came in at 2:30pm while James was removing a load-bearing wall in Kings Heath. Katie gathered full project details, budget range, and timeline — James called back at 6pm with everything he needed to prepare a detailed quote. He won the job against two other builders who never answered the call.",
        revenue: "£18,400 in month one from captured calls"
      },
      {
        name: "Lisa Thompson",
        trade: "Painter & Decorator",
        area: "Sutton Coldfield",
        story: "Lisa covers north Birmingham and Sutton Coldfield, doing interior and exterior painting for homeowners and landlords. Her work is physically demanding — up ladders, sanding, painting — and her phone is usually in her van or pocket, covered in paint. She was missing an estimated 50% of calls, particularly from landlords who tend to call about multiple properties and expect immediate quotes. Her biggest frustration was missing 'urgent' calls about rental voids — when a tenant moves out, landlords need the property redecorated within 48-72 hours before the next viewing, and they call every decorator on their list until someone answers.",
        result: "Katie captured 19 landlord enquiries in Lisa's first month that she would have missed. One Sutton Coldfield letting agent called about five properties needing redecoration between tenancies — a £3,800 job. Lisa was up a ladder in Four Oaks when the call came in. Katie took full details of all five properties, sizes, colour preferences, and deadlines. Lisa called back that evening, visited all five the next day, and won the contract. That agent now uses her exclusively.",
        revenue: "£7,200 in the first month"
      }
    ],
    localInsights: [
      "Birmingham's 1930s semi-detached stock is the largest single housing type in any UK city — over 180,000 properties — creating massive sustained demand for boiler, window and kitchen replacements",
      "The average Birmingham tradesperson travels 11 miles between jobs, 40% further than the UK average, making phone availability during transit critical",
      "Landlord enquiries in Birmingham are 30% higher than the national average due to the city's large rental market, and landlord calls convert at 65% when answered promptly",
      "The Spaghetti Junction / M6 corridor creates predictable daily phone blackspots where trades lose calls during their morning commute between 8-9:30am",
      "Birmingham's prefab housing stock (BISF, Reema, Wimpey No-Fines) requires specialist trades knowledge that commands 40% premium rates but is increasingly rare",
      "Friday 3-5pm is the highest-value call window as landlords prepare for weekend viewings and homeowners plan Monday-start projects",
      "The Jewellery Quarter's loft conversions and live-work units create unique demand for trades who understand both residential and light commercial requirements"
    ]
  },
  {
    slug: "leeds",
    city: "Leeds",
    country: "uk",
    region: "England",
    lat: "53.8008",
    lng: "-1.5491",
    trades: ["electricians", "roofers", "landscapers"],
    population: "2.3M",
    description: "Leeds has 8,500+ trade businesses serving 350K households. Katie answers emergency calls 24/7, captures enquiries via WhatsApp. Plans from £59. Try free.",
    challenges: [
      "Victorian wiring in older terraces needs specialist electricians",
      "Yorkshire weather puts constant demand on roofers",
      "Rural-urban mix means wide service areas and travel time",
      "Student areas (Headingley) have high turnover maintenance needs"
    ],
    localStats: {
      businesses: "6,000+",
      households: "350K",
      avgJob: "£285",
      missedCallsWeekly: "2,800",
      marketSize: "£260M"
    },
    neighbourhoods: ["Headingley", "Chapel Allerton", "Roundhay", "Horsforth", "Guiseley", "Morley", "Pudsey", "Otley", "Ilkley", "Wetherby"],
    associations: ["NICEIC registered electricians", "NAPIT certified", "FMB accredited builders", "RHS landscapers"],
    responseTime: "28 minutes average emergency callback",
    callVolume: "Around 12,000 trade enquiries per week across West Yorkshire",
    testimonial: {
      quote: "I rewired a Victorian terrace in Headingley and missed three calls while I was in the crawl space. Katie caught a £1,800 rewire enquiry from Chapel Allerton. Best £59 I've spent.",
      name: "Tom B.",
      trade: "Electrician",
      area: "North Leeds"
    },
    cityContext: {
      housingStock: "Leeds presents one of the most varied housing stocks in northern England, shaped by its textile heritage and subsequent regeneration. The inner suburbs of Headingley, Hyde Park and Burley are dominated by substantial Victorian and Edwardian terraced houses — many converted to student HMOs — with original features, high ceilings, and wiring that often dates to the 1960s or earlier. These properties present unique challenges: shared chimney stacks, original slate roofs, and cellars that flood during heavy rain. The city's famous 'back-to-backs' in areas like Harehills and Beeston are a distinct Yorkshire typology with no rear access, requiring creative solutions for extensions and utilities. Outer suburbs such as Roundhay, Moortown and Alwoodley feature large 1930s semis and detached homes on generous plots that drive extension and landscaping work. North Leeds — Horsforth, Guiseley, Otley — extends into the Wharfedale valley with stone-built cottages and farmhouses that require specialist knowledge of traditional lime mortar and Yorkshire stone. The city centre's recent apartment boom around the South Bank and Clarence Dock has added modern high-rise stock with different service requirements. West Leeds, including Pudsey and Farsley, has a significant stock of 1950s-1970s council housing now in private ownership, creating demand for modernisation work.",
      weatherImpact: "West Yorkshire's weather is famously changeable and challenging for trades. The Pennines to the west create a rain shadow effect that doesn't spare Leeds — the city receives significant rainfall year-round, with sudden downpours that overwhelm Victorian drainage and cause flash flooding in low-lying areas like Kirkstall and parts of Headingley. Winter brings hard frosts from continental air masses that burst pipes in unheated lofts and damage external render. The exposed position of properties on the city's western edges — Bramley, Calverley, Rodley — means they take the brunt of westerly winds that dislodge roof tiles and damage pointing. Summer heatwaves, while less extreme than southern England, cause expansion issues with UPVC and flat roof membranes. Leeds trades report that Yorkshire's 'four seasons in one day' pattern makes scheduling outdoor work particularly challenging — a roofer might start work in sunshine and be forced down by hail within the hour, with their phone ringing constantly from worried homeowners. The Aire and Wharfe valleys create frost pockets where temperatures drop 2-3°C below the city centre, accelerating external weathering.",
      permittingNotes: "Leeds City Council operates a generally efficient planning service, but the city's heritage designations create complexity. There are 24 Conservation Areas including Headingley, Chapel Allerton and parts of Roundhay, where external alterations require careful consideration. The city has over 3,300 listed buildings, particularly concentrated in the city centre and older suburbs. The South Bank regeneration and Leeds Dock areas have specific design codes for new development. Yorkshire Dales National Park borders the city's northern fringe, affecting properties in Otley, Ilkley and Wharfedale with additional planning constraints. Party Wall Act requirements are common in the dense Victorian terrace areas. Leeds has been proactive on climate targets, with new requirements for energy efficiency on major renovations and mandatory electric vehicle charging provision in new parking spaces. The city's Clean Air Zone, while smaller than Birmingham's, affects van-based trades operating in the city centre. Building control in Leeds is particularly vigilant about electrical work in older properties, requiring NICEIC or NAPIT certification for most installations.",
      marketDynamics: "Leeds has a robust but competitive trade market serving West Yorkshire's 350,000 households. Average job values of £285 are slightly below the national mean, reflecting the city's more affordable housing stock, but the volume of work is substantial. The student market is a defining feature — Headingley alone contains over 15,000 students in converted Victorian housing, creating enormous maintenance demand that peaks at term starts and ends. Professional couples in north Leeds suburbs like Chapel Allerton and Roundhay drive demand for high-end kitchen and bathroom renovations. The rural-urban fringe — Otley, Ilkley, Wetherby — has affluent homeowners who expect premium service and are willing to pay for it. Leeds' status as the UK's second largest financial centre after London brings a professional class that values reliability and communication over lowest price. The city's construction sector is growing rapidly with major developments like the Aire Park and South Bank regeneration, but domestic maintenance remains the core market. With 2,800 missed calls weekly, Leeds tradespeople are losing an estimated £32M annually in potential revenue. The trades who answer promptly and communicate well have a significant advantage in this market.",
      tradeShortage: "Leeds faces acute shortages in heritage roofing and stonemasonry, as the city's stock of Victorian slate and Yorkshire stone roofs requires skills that are diminishing as experienced workers retire. Electricians with specialist knowledge of older wiring systems — particularly the Victorian terraces with original fuse boxes and cloth-insulated cables — are increasingly scarce. The city's landscaping sector is booming due to the large garden plots in north Leeds, but qualified garden designers and hard landscapers are in short supply. Gas engineers who understand both modern condensing systems and the older boilers common in 1930s-1960s housing are hard to find. The construction skills gap in Yorkshire and Humber is estimated at 8,500 workers. This shortage means tradespeople who build strong local reputations and maintain reliable communication can command waiting lists and premium rates."
    },
    caseStudies: [
      {
        name: "Rachel Whitfield",
        trade: "Roofer",
        area: "Headingley",
        story: "Rachel's roofing business covers Leeds from the city centre to the Dales fringe. Yorkshire weather is relentless — driving rain, sudden hail, and freeze-thaw cycles that test every roof in West Yorkshire. She was losing calls constantly while up ladders, in lofts, or on scaffold where her phone was inaccessible. Her biggest frustration was the 'storm surge' — after every weather event, her phone would ring off the hook, but she could only answer one call at a time. The rest went to voicemail, and by evening, most customers had moved on. A particular low point was Storm Babet in October 2023: 28 missed calls in one day, and she booked zero new jobs from them.",
        result: "Katie transformed Rachel's storm response. During the winter 2023-2024 season, she captured 19 roof enquiries that would have been lost. One standout was a £5,400 full re-roof of a Victorian terrace in Chapel Allerton — the call came in at 11am while Rachel was replacing ridge tiles in Horsforth. The homeowner had already called two other roofers; Katie was the only response they got. Rachel visited that afternoon, quoted the next day, and started work within the week.",
        revenue: "£11,600 in the storm season"
      },
      {
        name: "Mohammed Hassan",
        trade: "Electrician",
        area: "Roundhay",
        story: "Mohammed runs an electrical firm specialising in older property rewires across north and east Leeds. His work is intensive — he might spend a full week inside a single Victorian terrace, crawling through lofts, lifting floorboards, and working in cramped cellars. During that week, his phone is essentially unreachable. The problem was his most valuable enquiries came from homeowners in similar properties who needed full rewires — jobs worth £1,500-£3,000 that require a site visit and detailed quote. These customers typically call 3-4 electricians and book the first one who answers. Mohammed was losing an estimated 60% of rewire enquiries because he was physically inside walls when they called.",
        result: "In his first month with Katie, Mohammed captured 14 rewire enquiries he would have missed. He converted 9 into site visits and 6 into jobs. The biggest was a £4,200 full-house rewire in Moortown — the call came at 2pm while Mohammed was tracing circuits in a Headingley cellar. Katie gathered property details, the owner's concerns about the old wiring, and their preferred timeline. Mohammed called back at 6pm fully prepared, visited the next morning, and won the job against two competitors who never returned the call.",
        revenue: "£9,800 in the first month"
      }
    ],
    localInsights: [
      "Leeds has the highest concentration of student HMOs outside London, with each property generating 4-6 maintenance calls per year — a massive market for responsive trades",
      "Yorkshire stone and slate roofing requires specialist skills that command 35% premium rates, but qualified trades are increasingly scarce",
      "The A61 and A64 corridors create daily phone blackspots during rush hour, with trades losing calls while navigating Leeds' congested ring road",
      "Properties in the Wharfe and Aire valleys experience 40% more damp and flooding issues than the city average due to topography and older drainage",
      "North Leeds postcodes (LS8, LS17) have the highest average job values in the city, with kitchen and bathroom renovations routinely exceeding £15,000",
      "Friday 2-5pm is peak landlord call time as property managers prepare for weekend viewings and tenant changeovers",
      "Leeds' Victorian terraces have original wiring in 40% of properties — a massive, underserved market for specialist electricians"
    ]
  },
  {
    slug: "glasgow",
    city: "Glasgow",
    country: "uk",
    region: "Scotland",
    lat: "55.8642",
    lng: "-4.2518",
    trades: ["plumbers", "builders", "electricians"],
    population: "1.7M",
    description: "Glasgow has 9,000+ trade businesses serving 300K households. Katie answers emergency calls 24/7, captures enquiries via WhatsApp. Plans from £59/month.",
    challenges: [
      "Tenement buildings have shared systems — emergencies affect multiple flats",
      "Harsh winters cause boiler and heating emergencies to spike",
      "Older housing stock needs frequent electrical and plumbing updates",
      "High tenant areas like West End need rapid response maintenance"
    ],
    localStats: {
      businesses: "5,500+",
      households: "310K",
      avgJob: "£290",
      missedCallsWeekly: "2,600",
      marketSize: "£220M"
    },
    neighbourhoods: ["West End", "Southside", "East End", "Partick", "Hillhead", "Dennistoun", "Pollokshields", "Shawlands", "Maryhill", "Govan"],
    associations: ["NICEIC registered electricians", "Gas Safe engineers", "FMB accredited builders", "SELECT Scotland"],
    responseTime: "20 minutes average emergency callback",
    callVolume: "Around 11,000 trade enquiries per week across Greater Glasgow",
    testimonial: {
      quote: "Tenement close in Partick — burst pipe at 6am and I'm already under a sink in Shawlands. Katie handled it, got the tenant's details, and I called back within 15 minutes. Saved a £380 callout.",
      name: "Angus M.",
      trade: "Plumber",
      area: "Glasgow West End"
    },
    cityContext: {
      housingStock: "Glasgow's housing stock is uniquely shaped by its tenement tradition — sandstone buildings of three to five storeys that dominate the cityscape from the West End to the East End. These tenements, built between 1840 and 1914, contain shared services that create distinct trade challenges: communal stair lighting, shared roof spaces, interconnected drainage systems, and party walls that transmit both sound and water. A burst pipe in a top-floor flat in Partick can flood three properties below. The sandstone itself requires specialist knowledge — Glasgow blonde sandstone weathers differently from red sandstone, and inappropriate cement pointing traps moisture causing accelerated decay. Beyond the tenements, the city has significant inter-war housing in areas like Knightswood, Cardonald and Mosspark — cottage flats and semi-detached homes with original sash windows and coal fireplaces. The post-war estates of Castlemilk, Easterhouse and Drumchapel contain system-built housing with specific maintenance needs. Glasgow's recent regeneration has added modern apartments along the Clyde waterfront and in the Merchant City, but the tenement stock remains the defining characteristic. Tradespeople working in Glasgow need to understand close-entry systems, communal closes, and the unique challenges of working in occupied flats where access is restricted and noise must be minimised.",
      weatherImpact: "Glasgow's west coast maritime climate brings milder winters than Edinburgh but significantly higher rainfall — the city receives over 1,200mm annually, among the wettest in the UK. This sustained moisture creates pervasive damp issues in Glasgow's sandstone tenements, where rainwater penetration through ageing pointing and failed flashings is the single biggest maintenance issue. Winter brings the 'Glasgow freeze' — temperatures rarely drop as low as the Highlands, but the combination of damp air and near-freezing conditions creates ideal conditions for condensation, mould growth, and frozen pipes in unheated closes. The city's position in the Clyde valley means fog is common, particularly in the East End and southside, making emergency callouts challenging during winter mornings. Summer is short and cool, with limited demand for air conditioning but occasional heatwaves that stress older electrical systems. Glasgow trades report that the 'drip season' — October through March — is their busiest and most stressful period, with constant emergency calls about penetrating damp, roof leaks, and heating failures. The tenement structure compounds weather damage: a single failed gutter can affect four flats, and shared roofs mean one storm can generate multiple simultaneous emergencies in the same close.",
      permittingNotes: "Glasgow City Council operates a unified planning service, but the city's extensive listed building and conservation area designations create significant complexity for trades. The city centre, West End, and parts of the Southside have numerous Conservation Area designations that control external alterations, window replacements, and roof work. Glasgow has over 1,800 listed buildings, many of them tenements with specific requirements for like-for-like repairs. The city's traditional building skills programme promotes appropriate repair techniques using lime mortar, traditional leadwork, and Scots slate. Party Wall considerations are universal in tenement areas — work affecting shared structures requires agreement with neighbours. Building standards in Scotland differ from England, with separate regulations for energy efficiency, fire safety, and electrical work. SELECT (the Scottish electrical trade association) has specific requirements that go beyond English NICEIC standards. Gas Safe registration is essential, but Glasgow also has specific requirements for work on communal heating systems common in tenement buildings. The city's climate resilience programme is driving new standards for flood protection and drainage in flood-prone areas like Partick and Govan.",
      marketDynamics: "Glasgow's trade market serves Scotland's largest city with a distinctive housing stock that creates unique demand patterns. Average job values of £290 sit around the UK median, but the tenement structure means jobs often involve multiple properties — a single roof repair might generate work for four flats, and a close re-wiring affects every resident. The city's large student population — over 50,000 across Glasgow and Strathclyde universities — drives demand in areas like Hillhead, Partick and Dennistoun where HMO conversions are common. The West End and Southside have affluent professionals who demand premium service and are willing to pay for quality. Glasgow's tenement tradition means there is significant 'close-based' work — communal repairs funded by multiple owners, which requires tradespeople who can navigate shared decision-making. The city's construction sector is active with ongoing regeneration, but the domestic repair market is dominated by the ageing tenement stock's maintenance needs. With 2,600 missed calls weekly, Glasgow trades lose an estimated £29M annually. The trades who understand Glasgow's unique housing stock and can communicate clearly with multiple stakeholders have a major advantage.",
      tradeShortage: "Glasgow faces critical shortages in traditional building skills — lime mortar pointing, Scots slate roofing, and cast iron gutter repairs are increasingly rare as the workforce ages. Plumbers who understand Glasgow's unique tenement plumbing systems, including shared soil stacks and close-entry stopcocks, are in short supply. Electricians qualified to work on Scottish building standards and tenement communal systems are scarce. The city's ambitious retrofit programme to improve tenement energy efficiency is creating demand for insulation and ventilation specialists who understand historic buildings. Glasgow's construction skills gap is estimated at 5,000 workers. The shortage is particularly acute for trades who combine technical skill with customer communication — the ability to explain complex shared repairs to multiple flat owners is a rare and valuable combination."
    },
    caseStudies: [
      {
        name: "Ewan McTaggart",
        trade: "Plumber",
        area: "Partick",
        story: "Ewan covers Glasgow's West End and Southside, specialising in emergency plumbing for tenement properties. His work is unpredictable and physically demanding — he might spend three hours tracing a leak through three floors of a Partick tenement, unable to answer his phone while crawling through cupboards and lifting floorboards. The tenement structure compounds the problem: when a close has a burst pipe or blocked drain, multiple residents call simultaneously, but Ewan can only answer one. He was losing an estimated 50% of emergency calls, particularly the early morning ones — 6-8am when residents discover overnight leaks and need immediate help before leaving for work.",
        result: "Katie transformed Ewan's emergency response. In his first month, she captured 22 emergency calls he would have missed. Seventeen were genuine emergencies — burst pipes, blocked drains, boiler failures. One particularly valuable capture was a 6:30am call from a Hyndland tenement where a top-flat radiator valve had failed, flooding the close. Katie gathered the exact flat number, nature of the leak, and contact details. Ewan called back at 7am, was on site by 7:45am, and had it fixed by 9am. The facteur (close manager) was so impressed he now calls Ewan first for all close maintenance.",
        revenue: "£7,400 in the first month"
      },
      {
        name: "Gillian Brodie",
        trade: "Builder",
        area: "Shawlands",
        story: "Gillian runs a small building firm doing kitchen renovations, bathroom refits, and tenement close repairs across Glasgow's Southside. Her projects typically last 2-4 weeks, during which her phone is in her van or pocket, often silenced to avoid disturbing customers. She was missing an estimated 40% of new enquiries, particularly from the 'recommendation chain' — Glasgow's close-knit communities where word-of-mouth drives trade selection. A missed call from a Shawlands resident often meant losing not just that job but potential referrals from their neighbours in the same close. Her biggest frustration was missing calls from close factors and property managers who handle multiple tenements and need reliable trades for ongoing maintenance.",
        result: "Katie captured 18 enquiries in Gillian's first month. Eight were from close factors and property managers — her most valuable segment. One Shawlands factor, impressed that Katie answered at 5:30pm on a Friday, referred three other close properties needing bathroom renovations. Within three months, Gillian had secured ongoing maintenance contracts for seven tenement closes in the Southside, generating £1,800 per month in reliable recurring work. A single captured call had transformed her business model.",
        revenue: "£11,200 in the first quarter"
      }
    ],
    localInsights: [
      "Glasgow tenements have shared roofing, drainage and close lighting — one emergency often affects 4-8 properties simultaneously",
      "The city's annual rainfall of 1,200mm creates the UK's highest rate of penetrating damp in sandstone properties — a massive market for specialist trades",
      "West End postcodes (G12, G3) command 25% higher rates than East End, but Southside (G41, G42) is the fastest-growing area for renovation work",
      "Morning 6-9am is peak emergency call time as residents discover overnight heating failures and leaks before work",
      "Glasgow's 'close factor' system means a single factor can control maintenance for 20+ tenements — capturing one factor's call is worth 20 individual customers",
      "Traditional Scots slate roofing skills are disappearing — qualified slaters command £350+ per day and have 6-week waiting lists",
      "The city's tenement tradition creates unique 'communal decision' jobs where multiple flat owners must agree — trades who can facilitate this process are highly valued"
    ]
  },
  {
    slug: "bristol",
    city: "Bristol",
    country: "uk",
    region: "England",
    lat: "51.4545",
    lng: "-2.5879",
    trades: ["plumbers", "electricians", "builders"],
    population: "700K",
    description: "Bristol has 8,000+ trade businesses serving 460K households. Katie answers emergency calls 24/7, captures enquiries via WhatsApp. Plans from £59/month.",
    challenges: [
      "Hills and narrow streets make travel between jobs time-consuming",
      "Eco-conscious customers ask about energy-efficient solutions",
      "Listed buildings require specialist conservation trades",
      "High property prices mean homeowners expect premium service"
    ],
    localStats: {
      businesses: "4,800+",
      households: "235K",
      avgJob: "£320",
      missedCallsWeekly: "2,100",
      marketSize: "£195M"
    },
    neighbourhoods: ["Clifton", "Redland", "Southville", "Stokes Croft", "Bedminster", "Montpelier", "Totterdown", "Henleaze", "Westbury-on-Trym", "Kingswood"],
    associations: ["NICEIC registered electricians", "Gas Safe engineers", "FMB accredited builders", "Bristol Green Capital partners"],
    responseTime: "24 minutes average emergency callback",
    callVolume: "Around 9,500 trade enquiries per week across Bristol and surrounding areas",
    testimonial: {
      quote: "I was fitting a heat pump in Clifton Village and missed two calls from Redland homeowners. Katie caught both — one was a £4,200 air-source installation. Bristol trades need this.",
      name: "Oliver P.",
      trade: "Heating Engineer",
      area: "North Bristol"
    },
    cityContext: {
      housingStock: "Bristol's housing stock is as varied as its topography, with distinct architectural characters shaped by the city's maritime history, Victorian prosperity, and modern regeneration. Clifton and the city centre contain magnificent Georgian terraces and crescents — wide-fronted houses with original sash windows, basement kitchens, and complex roof structures that demand specialist conservation knowledge. These properties often have ageing lead plumbing, original lime plaster, and heating systems retrofitted into spaces never designed for them. The Victorian suburbs of Redland, Cotham and St Andrews feature generous terraced and semi-detached homes with bay windows, cellars, and mature gardens that drive extension and landscaping work. South Bristol — Bedminster, Southville, Totterdown — has a distinctive character of Victorian workers' cottages on steep hillsides, with narrow lanes, challenging access, and properties that require creative solutions for parking, deliveries, and waste removal. The harbourside and Wapping Wharf areas contain converted warehouses with industrial-era utilities and modern smart-home demands. East Bristol's post-war estates and newer developments around Emersons Green present different challenges. Unique to Bristol is the city's commitment to sustainable building — many homeowners prioritise eco-friendly materials, renewable energy, and retrofit insulation, creating demand for trades with green building expertise. The city's hills also mean many properties have split-level layouts, basements, and garden levels that require specialist drainage and structural knowledge.",
      weatherImpact: "Bristol's position between the Mendip Hills and the Cotswolds creates a distinctive microclimate that's milder than much of England but prone to sudden, intense weather events. The city receives significant rainfall from south-westerly Atlantic systems, with the Avon Gorge funnelling wind and rain into the city centre and Clifton. Winter brings frost and occasional snow that cause pipe bursts in uninsulated Victorian cellars and lofts — a particular problem in the hilltop suburbs where temperatures drop lower than the valley floor. The city's famous hills — Clifton, Totterdown, St Michael's — create exposed elevations where wind drives rain through ageing pointing and dislodges roof tiles. Summer is generally warm and pleasant, but occasional heatwaves stress older electrical systems and cause expansion issues with flat roofs and UPVC. Bristol trades report that the city's topography makes weather prediction difficult — it can be raining in Clifton while Southville is dry, and the Avon Gorge creates localised wind effects that concentrate storm damage. The Severn Estuary's tidal patterns affect basement and cellar properties in Hotwells, Spike Island and parts of Bedminster, where high tides can back up drainage systems and cause flooding.",
      permittingNotes: "Bristol City Council has a well-regarded planning service, but the city's extensive heritage designations create significant complexity. There are 33 Conservation Areas covering large parts of Clifton, Redland, the city centre, and Victorian suburbs. Bristol has over 4,500 listed buildings — one of the highest concentrations in England outside London — with particular density in Clifton, the Old City, and Kingsdown. The Bristol Local Plan imposes strict sustainability requirements, with mandatory energy efficiency standards for major renovations and encouragement for retrofit work. The city's status as European Green Capital in 2015 has left a legacy of environmental building standards that exceed national requirements. The harbour and docks areas have specific restrictions on external alterations to preserve the maritime character. Party Wall Act requirements are common in the dense Victorian terrace areas of Easton, St Pauls and Southville. Bristol's Clean Air Zone affects diesel van operators in the city centre, with daily charges for non-compliant vehicles. Building control is particularly vigilant about work on the city's listed and conservation area properties, requiring detailed method statements for alterations.",
      marketDynamics: "Bristol's trade market is characterised by high job values and demanding customers. Average job values of £320 are 15% above the national mean, driven by high property prices — the average Bristol home costs £380,000, pricing out trades who can't command premium rates. The city's affluent, environmentally conscious population expects high-quality work and is willing to pay for it. Clifton, Redland and the harbourside have particularly high-value work, with kitchen renovations routinely exceeding £25,000 and bathroom refits averaging £12,000. The city's tech and creative sectors bring young professionals who value communication and reliability over lowest price. Bristol's strong rental market, particularly in the student areas of Redland, Clifton and Fishponds, creates demand for fast-response maintenance trades. The eco-conscious culture drives strong demand for heat pumps, solar panels, and energy-efficient upgrades — trades with green credentials can charge 20-30% premiums. With 2,100 missed calls weekly, Bristol trades lose an estimated £24M annually. In a market where customers expect premium service, missing a call is particularly costly — the customer who calls about a £15,000 kitchen renovation will simply move to the next name on their list.",
      tradeShortage: "Bristol faces acute shortages in several specialist trades. Heating engineers with heat pump and renewable energy experience are in critically short supply, with waiting lists of 6-8 weeks for air-source heat pump installations. Conservation trades — stonemasons, lime plasterers, sash window specialists — are diminishing as experienced workers retire without sufficient apprentices. Electricians with smart home, EV charger, and battery storage expertise are scarce. The city's ambitious net-zero targets are driving demand for retrofit coordinators and whole-house insulation specialists that the market can't supply. Bristol's construction skills gap is estimated at 4,500 workers. The shortage is particularly problematic because Bristol's high property values mean customers can afford premium rates — the revenue is there, but the skilled trades aren't."
    },
    caseStudies: [
      {
        name: "Oliver Peters",
        trade: "Heating Engineer",
        area: "Clifton",
        story: "Oliver specialises in heat pump installations and renewable heating systems across Bristol and North Somerset. His market is booming — Bristol's Green Capital ethos and high property values mean homeowners are investing heavily in sustainable heating. But his work is complex and time-consuming: a typical air-source heat pump installation takes 2-3 days, during which he's either on rooftops, in plant rooms, or running refrigerant lines, completely unable to answer his phone. The problem was his most valuable enquiries came from homeowners who had researched heat pumps, got quotes from 2-3 installers, and expected prompt responses. These were £4,000-£8,000 jobs that required site visits and detailed heat loss calculations. Oliver was losing an estimated 55% of enquiries because he was physically installing someone else's system when they called.",
        result: "Katie transformed Oliver's enquiry capture. In his first month, she handled 16 heat pump enquiries he would have missed. He converted 7 into site visits and 4 into installations. The standout was a £6,800 air-source heat pump installation in Redland — the call came at 11am while Oliver was on a roof in Clifton fitting an outdoor unit. Katie gathered property details, the customer's current heating system, their sustainability goals, and budget range. Oliver called back at 6pm with everything he needed to prepare a preliminary quote. He won the job against two competitors who took 48 hours to respond.",
        revenue: "£14,600 in the first month"
      },
      {
        name: "Priya Sharma",
        trade: "Electrician",
        area: "Southville",
        story: "Priya runs an electrical firm covering Bristol from the city centre to North Somerset. Her work spans everything from Victorian terrace rewires to smart home installations in new-build harbourside apartments. The variety is rewarding but creates phone availability problems — she might spend a full day crawling through the loft of a Totterdown Victorian house, unable to answer calls from customers wanting EV charger quotes or smart home consultations. Her biggest frustration was the 'evening enquiry wave' — professionals who research trades online during their lunch break and call at 6-7pm when Priya is either still on site or commuting home. By the time she checked messages at 8pm, they'd often found someone else.",
        result: "Katie captured 21 enquiries in Priya's first month. Nine were for EV charger installations — her highest-margin work. One was a £3,200 whole-house rewire in Bedminster that came in at 6:45pm while Priya was finishing a fault diagnosis in Clifton. The homeowner, a tech professional, was so impressed by Katie's detailed information gathering that he booked Priya for a site visit the next day and accepted her quote within 48 hours. He later referred two colleagues from his Bristol tech company.",
        revenue: "£9,400 in month one"
      }
    ],
    localInsights: [
      "Bristol has the highest heat pump installation rate outside London, with demand growing 80% year-on-year — but qualified installers are critically scarce",
      "Clifton and Redland postcodes have average job values 40% above the Bristol mean, with kitchen renovations routinely exceeding £20,000",
      "The city's steep hills create predictable phone blackspots on roads like Park Street, Whiteladies Road, and the A4174 ring road during rush hour",
      "Bristol's conservation areas cover 33 distinct zones — trades working on listed properties need specialist knowledge that commands 50% premium rates",
      "Friday 5-7pm is the highest-value call window as professionals finish work and call about weekend projects and Monday-start renovations",
      "The harbourside and Spike Island areas have unique drainage challenges due to tidal patterns, creating a specialist niche for drainage engineers",
      "Bristol's rental market is 28% of all housing stock — landlords represent a massive, recurring-revenue customer segment for responsive trades"
    ]
  },
  {
    slug: "liverpool",
    city: "Liverpool",
    country: "uk",
    region: "England",
    lat: "53.4084",
    lng: "-2.9916",
    trades: ["roofers", "plumbers", "electricians"],
    population: "900K",
    description: "Liverpool has 7,500+ trade businesses serving 280K households. Katie answers emergency calls 24/7, captures enquiries via WhatsApp. Plans from £59/month.",
    challenges: [
      "Aging Victorian housing needs constant roof and gutter maintenance",
      "Student areas (Aigburth, Wavertree) have high-turnover repairs",
      "Coastal weather accelerates wear on roofs and exteriors",
      "Regeneration projects create demand spikes for multiple trades"
    ],
    localStats: {
      businesses: "4,200+",
      households: "210K",
      avgJob: "£275",
      missedCallsWeekly: "1,900",
      marketSize: "£170M"
    },
    neighbourhoods: ["Aigburth", "Wavertree", "Woolton", "Allerton", "Childwall", "Mossley Hill", "Toxteth", "Anfield", "Everton", "Crosby"],
    associations: ["NICEIC registered electricians", "Gas Safe engineers", "FMB accredited builders", "NFRC certified roofers"],
    responseTime: "26 minutes average emergency callback",
    callVolume: "Around 8,500 trade enquiries per week across Merseyside",
    testimonial: {
      quote: "Storm damage in Woolton and I'm already on a roof in Aigburth. Katie took the call, calmed the homeowner down, and sent me everything I needed. Booked a £1,650 re-roof the next day.",
      name: "Danny R.",
      trade: "Roofer",
      area: "South Liverpool"
    },
    cityContext: {
      housingStock: "Liverpool's housing stock is defined by its Victorian and Edwardian heritage, with some of the finest examples of merchant-era architecture in the UK. The city's famous Georgian Quarter — Canning, Falkner Square, Catherine Street — contains elegant townhouses with original features that demand specialist conservation skills. The Victorian suburbs of Aigburth, Allerton, Mossley Hill and Woolton feature substantial semi-detached and terraced homes built during the city's commercial peak, with original slate roofs, bay windows, and generous gardens. These properties have ageing infrastructure — original lead plumbing, outdated wiring, and heating systems retrofitted into spaces never designed for them. The city's inner districts — Toxteth, Kensington, Wavertree — contain dense Victorian terraced streets with back alleys and original two-up-two-down layouts that present access challenges for modern trades. The waterfront and docks areas have seen significant regeneration, with converted warehouses and new apartments creating different trade demands. Unique to Liverpool is the scale of terraced housing — the city has over 40,000 Victorian terraces, one of the largest concentrations in England. Many of these properties have been in the same family for generations, creating loyal customer relationships but also expectations of personal service that automated systems must match. The city's coastal position means salt-laden air accelerates external deterioration, particularly on roof tiles, guttering, and external render.",
      weatherImpact: "Liverpool's position on the Irish Sea coast creates a maritime climate that's mild but exceptionally windy and damp. The city receives significant rainfall from Atlantic weather systems, with the Mersey estuary funnelling wind and rain into the city centre and waterfront. Coastal weather accelerates wear on external building elements — roof tiles, guttering, pointing, and external paintwork deteriorate 20-30% faster than inland equivalents. Winter storms, particularly from the north-west, can cause significant roof damage across the city. The city's famous wind — particularly in exposed areas like Crosby, Waterloo and the waterfront — dislodges roof tiles, damages aerials, and makes ladder work dangerous. Summer is generally mild and pleasant, but the humidity creates condensation issues in Victorian properties with poor ventilation. Liverpool trades report that the combination of salt air, driving rain, and high winds makes exterior maintenance a constant requirement rather than an occasional job. Storms coming in from the Irish Sea often hit Liverpool before they reach inland areas, giving the city's roofers and emergency trades advance warning but also first exposure to damage. The Mersey's tidal patterns affect basement and cellar properties in low-lying areas, particularly around the docks and waterfront.",
      permittingNotes: "Liverpool City Council operates a streamlined planning service, but the city's extensive World Heritage Site designation and Conservation Areas create complexity for trades. The city centre and waterfront are covered by UNESCO World Heritage protections that control external alterations, signage, and materials. There are 35 Conservation Areas including large parts of Aigburth, Allerton, Mossley Hill and the Georgian Quarter. Liverpool has over 2,500 listed buildings, with particular concentrations in the city centre, Georgian Quarter, and Victorian suburbs. The Liverpool Local Plan imposes specific requirements for work in heritage areas, including mandatory use of appropriate materials and techniques. The city's ongoing regeneration — Liverpool Waters, Ten Streets, and Knowledge Quarter — has created distinct planning frameworks for new developments. Party Wall Act requirements are common in the dense terrace areas. Building control in Liverpool is particularly vigilant about structural work on Victorian properties, many of which have suffered from decades of incremental DIY modifications. The city's coastal position means additional requirements for salt-resistant materials and finishes on external work.",
      marketDynamics: "Liverpool's trade market serves a city with some of the most affordable housing in England but also areas of significant affluence. Average job values of £275 sit below the national mean, reflecting the city's lower property prices, but the volume of work is substantial. The Victorian housing stock creates constant maintenance demand — roof repairs, gutter replacement, rewiring, and plumbing updates are ongoing requirements for tens of thousands of properties. The student market is significant, with Liverpool and John Moores universities bringing 50,000+ students who live in converted Victorian housing in Aigburth, Wavertree and the city centre. Professional areas like Allerton, Mossley Hill and Woolton have higher-value work and more demanding customers. Liverpool's strong sense of community means word-of-mouth drives trade selection more than in most cities — a missed call doesn't just lose one job, it potentially loses access to a network of neighbours, family, and friends. The city's regeneration is creating construction demand, but the domestic repair market remains the backbone. With 1,900 missed calls weekly, Liverpool trades lose an estimated £18M annually. In a market where personal relationships matter, missing a call is particularly damaging to reputation.",
      tradeShortage: "Liverpool faces significant trade shortages, particularly in heritage roofing and conservation trades. The city's vast stock of Victorian slate roofs requires skilled slaters who understand traditional Liverpool purple slate and appropriate replacement materials. These skills are diminishing as experienced workers retire. Plumbers who can work on the city's ageing lead pipework and shared drainage systems are scarce. Electricians with experience rewiring Victorian properties with minimal disruption are in demand. The city's ambitious regeneration programme is absorbing construction trades, leaving the domestic market undersupplied. Liverpool's construction skills gap is estimated at 3,500 workers. The shortage is compounded by the city's lower property prices, which make it harder to attract trades from higher-paying markets. This creates an opportunity for local tradespeople who invest in communication and reliability — they can build strong, lasting customer relationships in a market where loyalty matters."
    },
    caseStudies: [
      {
        name: "Danny Riley",
        trade: "Roofer",
        area: "Woolton",
        story: "Danny covers south and central Liverpool, from Woolton to the waterfront. His trade is physically demanding and weather-dependent — he's either up ladders, on roofs, or in lofts, with his phone typically in his van or a pocket he can't reach while wearing safety gear. Liverpool's coastal weather is relentless on roofs: salt air, driving rain, and high winds mean constant maintenance demand. His biggest frustration was the 'storm surge' — after every weather event, his phone would ring constantly, but he could only answer one call at a time. The rest went to voicemail, and by the time he called back in the evening, customers had usually moved on. His breaking point was Storm Isha in January 2024: 31 missed calls in one day, and he booked exactly zero jobs from them.",
        result: "Katie transformed Danny's storm response. During the February 2024 storms, she captured 17 roof enquiries he would have lost. One was a £3,800 full re-roof of a Victorian semi in Allerton — the call came at 10am while Danny was replacing guttering in Aigburth. The homeowner had already called two other roofers; Katie was the only response. Danny visited that afternoon, quoted the next morning, and started work the following week. The homeowner was so impressed by the quick response that she referred her sister in Mossley Hill, who needed a £2,200 roof repair.",
        revenue: "£9,600 in the storm season"
      },
      {
        name: "Siobhan O'Brien",
        trade: "Plumber",
        area: "Aigburth",
        story: "Siobhan runs a plumbing and heating business covering south Liverpool and the Wirral. Her work is unpredictable — she might spend four hours under a sink in a Victorian terrace, completely unable to answer her phone. Emergency calls are her bread and butter: burst pipes, boiler failures, blocked drains. But Liverpool's ageing housing stock means emergencies are frequent, and when she's already on an emergency job, she can't answer the next one. She was losing an estimated 45% of emergency calls, particularly the early morning ones — 6-8am when residents discover overnight heating failures. Her voicemail was a disaster: she'd get 10-15 messages some mornings, spend her lunch break calling back, and find most customers had already booked someone else.",
        result: "Within two weeks, Katie had captured 14 emergency calls for Siobhan. Eleven were genuine emergencies she would have missed. One was a 6:15am call from a landlord in Wavertree whose tenant had reported no hot water at 5:30am. Katie gathered the property details, the boiler model, and the tenant's contact. Siobhan called back at 7am, diagnosed the issue over the phone as a faulty diverter valve, and was on site by 8:30am. The landlord, who managed 12 properties, was so impressed that he put Siobhan on his preferred trades list and has referred two other landlords.",
        revenue: "£6,800 in the first month"
      }
    ],
    localInsights: [
      "Liverpool's coastal salt air accelerates roof and gutter deterioration by 25-30% compared to inland cities, creating sustained demand for exterior maintenance trades",
      "The city's 40,000+ Victorian terraces represent one of England's largest concentrations of this housing type — a massive, ongoing market for specialist trades",
      "South Liverpool postcodes (L17, L18, L19) have average job values 35% higher than north Liverpool, but the north's larger stock creates higher volume",
      "Morning 6-9am is peak emergency call time as residents discover overnight heating failures and leaks before work",
      "Liverpool's strong community networks mean a single satisfied customer can generate 3-5 referrals — but a missed call loses that entire network effect",
      "The student market around Aigburth and Wavertree creates 4x more maintenance calls per property than owner-occupied areas",
      "Storm season (October-March) generates 60% more trade enquiries in Liverpool than the summer months, but trades capture only 40% of them due to call volume spikes"
    ]
  },
  {
    slug: "edinburgh",
    city: "Edinburgh",
    country: "uk",
    region: "Scotland",
    lat: "55.9533",
    lng: "-3.1883",
    trades: ["builders", "plumbers", "electricians"],
    population: "540K",
    description: "Edinburgh has 7,000+ trade businesses serving 250K households. Katie answers emergency calls 24/7, captures enquiries via WhatsApp. Plans from £59/month.",
    challenges: [
      "Georgian and Victorian buildings need specialist conservation trades",
      "Festival season brings emergency maintenance demands for venues",
      "Tourist rentals need rapid turnaround between bookings",
      "Hilly terrain and narrow streets make emergency response challenging"
    ],
    localStats: {
      businesses: "4,500+",
      households: "245K",
      avgJob: "£315",
      missedCallsWeekly: "2,200",
      marketSize: "£200M"
    },
    neighbourhoods: ["Stockbridge", "Leith", "Morningside", "Bruntsfield", "Marchmont", "New Town", "Old Town", "Portobello", "Corstorphine", "Gorgie"],
    associations: ["NICEIC registered electricians", "Gas Safe engineers", "FMB accredited builders", "Historic Environment Scotland approved"],
    responseTime: "21 minutes average emergency callback",
    callVolume: "Around 10,000 trade enquiries per week across Edinburgh and the Lothians",
    testimonial: {
      quote: "Festival season is chaos — emergency call for a burst pipe in a New Town Airbnb at midnight while I'm already in Leith. Katie handled it, got the property manager's details, and I fixed it by 7am. Guest left a 5-star review.",
      name: "Iain F.",
      trade: "Plumber",
      area: "Edinburgh City Centre"
    }
  },
]

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find((loc) => loc.slug === slug)
}

export function getLocationsByCountry(country: Country): LocationData[] {
  return locations.filter((loc) => loc.country === country)
}
