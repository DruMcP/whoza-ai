import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
import { FileText, Clock, Shield, ArrowRight, User, Calendar } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "Can AI Voice Agents Safely Triage Emergencies? | whoza.ai",
  description: "Independent 2026 research on whether AI voice agents can safely triage gas, electrical and flood emergencies for UK trades — accuracy, liability, safeguards.",
  alternates: {
    canonical: "https://whoza.ai/research/emergency-triage-safety-ai-voice-agents-2026",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  authors: [{ name: "Dru McPherson", url: "https://whoza.ai" }],
  openGraph: {
    type: "article",
    locale: "en_GB",
    url: "https://whoza.ai/research/emergency-triage-safety-ai-voice-agents-2026",
    siteName: "Whoza.ai",
    title: "Can an AI Voice Agent Tell a Blocked Drain from a Gas Leak?",
    description: "Independent research on whether AI voice agents can safely triage gas, electrical and flood emergencies for UK trades — accuracy, liability, and safeguards.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "Emergency Triage Safety Research 2026" }],
    publishedTime: "2026-07-29",
    modifiedTime: "2026-07-29",
    authors: ["Dru McPherson"],
    tags: ["Research", "Safety", "AI Voice Agents", "Emergency Response", "Liability"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Can AI Voice Agents Safely Triage Emergencies?",
    description: "Independent research on whether AI voice agents can safely triage emergencies for UK trades.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  other: {
    "article:published_time": "2026-07-29",
    "article:modified_time": "2026-07-29",
    "article:author": "Dru McPherson",
    "article:section": "Research",
    "article:tag": "AI Voice Agents, Emergency Triage, UK Trades, Gas Safety, AI Liability, Answer Engine Optimisation",
  },
}

// ─── Article Schema ───
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Can an AI Voice Agent Tell a Blocked Drain from a Gas Leak?",
  "description": "Independent research on whether AI voice agents can safely triage gas, electrical and flood emergencies for UK trades — accuracy, liability, and safeguards.",
  "image": "https://whoza.ai/og-image.webp",
  "datePublished": "2026-07-29",
  "dateModified": "2026-07-29",
  "author": {
    "@id": "https://whoza.ai/#dru-mcpherson"
  },
  "publisher": {
    "@id": "https://whoza.ai/#organization"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://whoza.ai/research/emergency-triage-safety-ai-voice-agents-2026"
  },
  "keywords": "AI voice agents, emergency call triage, UK trades, gas safety, AI liability, answer engine optimisation",
  "inLanguage": "en-GB",
  "isAccessibleForFree": true,
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["article h1", "article h2", "article p"]
  }
}

const faqItems = [
  {
    question: "Can AI voice agents safely handle emergency calls for gas or electrical trades?",
    answer: "Not reliably on their own, based on the closest available evidence. Comparable AI triage systems in healthcare get emergency cases right somewhere between two-thirds and three-quarters of the time, which means a meaningful share are still misjudged. A responsibly built voice agent should treat certain phrases — the smell of gas, smoke, flooding, breathing difficulty — as automatic triggers for human handoff rather than leaving the judgement to the model."
  },
  {
    question: "What happens legally if an AI receptionist misses or misjudges a genuine emergency?",
    answer: "Under the UK Jurisdiction Taskforce's July 2026 legal statement, a business deploying AI to handle customer calls is likely to owe a duty of care to callers, and would be judged on whether it exercised proper oversight, understood the system it deployed, and can explain how a decision was reached. 'The AI made the wrong call' is unlikely to be treated as a defence on its own."
  },
  {
    question: "How accurate is AI compared with humans at triaging urgent situations?",
    answer: "In the best comparable study available, large language models scored around 66.7 per cent accuracy on emergency-level cases, close to NHS 111's own online tool (66.1 per cent) and to untrained laypeople (67.9 per cent). Specialist symptom-checker apps ranged much more widely, from 57 to 100 per cent, though the highest results came from single studies with acknowledged bias risk."
  },
  {
    question: "Do UK regional accents affect how well AI voice agents understand emergency calls?",
    answer: "Very likely, though nobody has measured this specifically for trade calls. Independent audits of commercial speech recognition systems consistently find higher error rates for non-standard and non-American accents — in one 2024 study, even native British speakers were transcribed less accurately than American speakers by a leading model. A caller with a strong regional accent, speaking quickly under stress, is exactly the caller most exposed to this gap."
  },
  {
    question: "Should a trade business still use an AI answering service if it cannot guarantee perfect emergency triage?",
    answer: "Most likely yes, provided it is built with hard safeguards for the small number of genuinely dangerous calls. Missed calls carry their own risk — the Health and Safety Executive's data, echoed in whoza's earlier research, suggests around 33 per cent of small UK trade businesses fail to answer incoming calls, and an unreachable business is not automatically the safer option. The goal is not to avoid AI, it is to make sure the safety-critical calls are never left to AI judgement alone."
  }
]

export const revalidate = 3600

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Research", item: "https://whoza.ai/research" },
        { name: "Emergency Triage Safety & AI Voice Agents 2026", item: "https://whoza.ai/research/emergency-triage-safety-ai-voice-agents-2026" },
      ]} />
      <script id="schema-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <FAQPageSchema faqs={faqItems} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <section className="mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            Independent Research — July 2026
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Can an AI Voice Agent Tell a Blocked Drain from a Gas Leak?
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-white/40 text-sm mt-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Dru</span>
              <span className="text-white/30">— Founder, whoza.ai</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime="2026-07-29">2026-07-29</time>
            </div>
          </div>
          <div className="mt-2 text-white/30 text-sm">
            Last updated: <time dateTime="2026-07-29">2026-07-29</time>
          </div>

          <p className="text-2xl text-white/70 mb-6 mt-6">
            The safety question nobody in this industry has properly asked yet — an independent look at emergency triage, liability and where AI voice agents genuinely belong in safety-critical trades
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-white/50">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 15 min read</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> ICO Registered (ZC077271)</span>
            <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Safety & Liability</span>
          </div>
        </section>

        {/* Key Findings */}
        <section className="bg-white/5 border-l-4 border-emerald-400 p-6 mb-12 rounded-r-lg">
          <h2 className="font-bold text-xl mb-6 text-white">Key Findings</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-emerald-400 font-bold mr-3 min-w-[80px]">66.7%</span>
              <span className="text-white/70">average accuracy of AI triage on emergency-level cases — roughly a third are still misjudged</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 font-bold mr-3 min-w-[80px]">35% vs 19%</span>
              <span className="text-white/70">word error rate gap on speech recognition for Black American speakers versus white American speakers</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 font-bold mr-3 min-w-[80px]">33%</span>
              <span className="text-white/70">of small UK trade businesses fail to answer incoming calls — being unreachable carries its own risk</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 font-bold mr-3 min-w-[80px]">July 2026</span>
              <span className="text-white/70">UK Jurisdiction Taskforce legal statement: businesses deploying AI owe a duty of care to callers</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 font-bold mr-3 min-w-[80px]">Zero</span>
              <span className="text-white/70">published studies specifically measuring AI voice agent accuracy on trade emergency calls</span>
            </li>
          </ul>
        </section>

        <article className="prose prose-lg max-w-none prose-invert">
          {/* Executive Summary */}
          <h2>In Short</h2>
          <p>
            Nobody actually knows how accurate AI voice agents are at telling a genuine trade emergency from a routine enquiry, because nobody has published the data. The nearest evidence we have comes from healthcare triage research, where the best AI systems get emergency cases right somewhere between two-thirds and three-quarters of the time — good, but not good enough to leave unsupervised on a gas leak. This piece sets out why that gap matters, what English law now expects of any business using AI to handle customer calls, and the minimum safeguards I think a voice agent needs before it is trusted with the calls that carry real risk.
          </p>

          <h2>Why I'm Writing This One Myself</h2>
          <p>
            I run a company that builds <Link href="/" className="text-emerald-400 hover:underline">AI voice agents for tradespeople</Link>, so you would be forgiven for reading this with one eyebrow raised. Fair enough. But it is precisely because I have spent the last two years elbow-deep in call transcripts, missed-call data and WhatsApp handoffs that I think this needs saying — and I would rather say it than have someone else say it about us.
          </p>
          <p>
            The moment this stopped being an abstract question for me was a call, appropriately enough, from a heating engineer using our platform. He was not asking about lead conversion or missed-call recovery, which is usually what these conversations are about. He wanted to know, quite specifically, what would happen if someone rang at two in the morning saying they could smell gas. Would Katie, our AI voice agent, understand what that meant? Would she pass it straight to him, or would she try to book it in as a boiler service for Tuesday?
          </p>
          <p>
            I could answer him honestly, because we have built specific safeguards for exactly that scenario. But his question stayed with me, because I realised almost everything written about <Link href="/research/ai-voice-agents-uk-trades-2026" className="text-emerald-400 hover:underline">AI voice agents in this sector</Link> — including our own research — is about speed, conversion and cost. Nobody is publishing anything about accuracy on the calls that matter most: the ones where getting it wrong is not a lost job, it is a genuine hazard.
          </p>

          <h2>Two Different Questions, and We Keep Answering the Easy One</h2>
          <p>
            Every report I have read this year, including the ones we have put out ourselves, measures roughly the same handful of things: how many calls get answered, how quickly, how many convert into booked jobs, how customers rate the experience. Those are good questions. They are also, if I am honest, the easier questions, because the data to answer them already sits in everyone's call logs.
          </p>
          <p>
            The harder question is this: across gas, electrical, plumbing and roofing work, a small proportion of calls are not enquiries at all — they are genuine emergencies, where a wrong or slow decision has consequences beyond a missed sale. Around seven people die every year in the UK from carbon monoxide poisoning linked to gas appliances that were poorly installed, poorly maintained or poorly ventilated, according to the Health and Safety Executive. Anyone who suspects a leak is meant to call the National Gas Emergency Service on 0800 111 999 immediately. That number exists because minutes matter.
          </p>
          <p>
            So when an AI system, rather than a human, is the one deciding in real time whether a caller's words amount to 'book this in for next week' or 'this needs someone on the phone right now', it is making a safety judgement, whether we choose to describe it that way or not. I do not think our industry — and I include whoza in this — has been honest enough about that yet.
          </p>

          <h2>What 'Getting It Right' Would Even Mean</h2>
          <p>
            Before anyone can talk sensibly about accuracy, there needs to be a working definition of what a correct answer looks like, and as far as I can find, nobody in the AI voice agent space has set one out for trades specifically. So here is a starting point, offered in the spirit of wanting it improved on rather than treated as final:
          </p>

          <h3>Tier One — Immediate Physical Danger</h3>
          <p>
            The smell of gas, visible flooding into a property, exposed or sparking wiring, a carbon monoxide alarm sounding, or anyone describing breathing difficulty near a gas appliance. These need a human within minutes, alongside a scripted instruction to contact the emergency services or the National Gas Emergency line.
          </p>

          <h3>Tier Two — Urgent but Not Immediately Dangerous</h3>
          <p>
            <Link href="/blog/heating-engineer-emergency-call-handling" className="text-emerald-400 hover:underline">No heating for an elderly or vulnerable person in winter</Link>, total loss of hot water for a family with a newborn, a burst pipe actively damaging a property. These need a human the same day, ideally within the hour.
          </p>

          <h3>Tier Three — Everything Else</h3>
          <p>
            Servicing, quotes, general enquiries, rebooking. This is where AI voice agents are already doing genuinely good work, and where the existing research, ours included, is on solid ground.
          </p>

          <p>
            Nearly the whole of the AI-for-trades conversation so far has, implicitly, been about tier three. Almost none of it asks whether a system can reliably tell tier one from tier three when a nervous, sometimes frightened caller does not use the textbook phrase.
          </p>

          <h2>There Is a Second Problem Underneath the First: Understanding the Words at All</h2>
          <p>
            Voice AI does not fail randomly across accents — it fails in a pattern, and the pattern is not kind to a lot of the country our customers actually work in. <Link href="/research/voice-agent-technology-state-of-art-2026" className="text-emerald-400 hover:underline">A Stanford-led audit of five major commercial speech recognition services</Link> found word error rates of 35 per cent on Black American speakers versus 19 per cent on white American speakers. A separate large-scale audit covering 2,700 speakers found non-American English accents produced anywhere from two to twelve percentage points higher error rates than American English, sometimes sixteen to forty-nine per cent worse in relative terms. Perhaps most relevant here: a 2024 study affiliated with Cambridge found that OpenAI's Whisper model transcribed American speakers noticeably better than British speakers, despite both being native English speakers on paper.
          </p>
          <p>
            None of that is a criticism of any one vendor — it is a structural pattern across the industry, driven largely by what these models were mostly trained on. But it matters enormously here, because the callers most likely to be misheard are often exactly the callers least likely to be using calm, clear, textbook phrasing: someone rattled about a gas smell, in a strong regional accent, talking quickly, possibly with children shouting in the background. Stacking a triage decision on top of speech recognition that is already less reliable for that exact caller is where I think the real risk compounds — and it gets almost no attention in an industry more preoccupied with how natural the AI's own voice sounds.
          </p>

          <h2>A Composite Example, Because the Abstract Version Undersells It</h2>
          <p>
            This is stitched together from patterns we see across many calls, not a transcript of any single real one, because I want to show what this looks like in practice rather than just describe it.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-6 italic text-white/80">
            <p>Caller: 'Hiya, is this the boiler people? I've had this smell, like, since this morning, thought it was just the neighbours' bins but it's not going, and now the pilot light's gone a funny colour, sort of orange.'</p>
          </div>
          <p>
            Read quickly, or by a system tuned mainly to book appointments, that could easily land as a routine service call — 'boiler', 'smell', 'pilot light' — and get scheduled in for later in the week. Read properly, it contains two separate tier-one signals: a persistent, unexplained smell, and a pilot light burning orange rather than blue, which the HSE lists as a direct warning sign of incomplete combustion, the process that produces carbon monoxide. Nothing about that caller's phrasing was textbook. She never said 'gas leak' or 'emergency'. If anything, she undersold it — the way people often do when they are not quite sure themselves.
          </p>
          <p>
            That is the actual difficulty. It is not recognising the phrase 'I can smell gas' — most systems, ours included, handle that correctly. It is recognising the same danger dressed in ordinary, hedging, slightly embarrassed language, from someone speaking quickly in a regional accent down a mobile line with the television on in the background. That is a much harder problem, and I do not think anyone's claim to have solved it should be taken at face value — including ours — until there is a published accuracy figure sitting behind it.
          </p>

          <h2>Borrowing Evidence from a Field That Has Actually Studied This</h2>
          <p>
            Nobody has published trade-specific data on this, so the closest thing I could find comes from healthcare, where AI-based triage has had a decade of serious academic attention. A 2025 study published in npj Digital Medicine compared how accurately large language models, dedicated symptom-checker apps and ordinary laypeople classified the urgency of medical scenarios, benchmarked against NHS 111 and clinical judgement. On genuinely emergency cases specifically, large language models scored an average accuracy of around 66.7 per cent, with a range of 50 to 86.7 per cent across different models and studies. NHS 111's own online triage tool scored 66.1 per cent on the same measure. Ordinary members of the public, guessing without any tool at all, scored 67.9 per cent. Dedicated symptom-checker apps ranged enormously, from 57 up to 100 per cent, with the single best result — 90 per cent, from an app called DoctorLink — coming from just one study, and the researchers were careful to flag that the majority of the underlying studies carried a meaningful risk of bias.
          </p>
          <p>
            I want to be careful with this comparison, because it would be easy to misuse it, and I do not want to be the one who does. Diagnosing a limb injury over the phone and recognising the words 'I can smell gas' are not the same task, and I would expect a well-built voice agent to do considerably better on the second, because the signal is far less ambiguous than a description of physical symptoms. But the broader point still stands, and I think it matters: in a field with a decade of dedicated research, serious funding and a strong incentive to get it right, the best general-purpose AI triage tools are still wrong on emergency cases roughly a third of the time. Nobody, to my knowledge, has run the equivalent study for AI voice agents handling trade call-outs. Until someone does — and I would like whoza to be part of doing it — I do not think any of us can honestly claim our systems are safe to leave unsupervised on the calls that matter most.
          </p>

          <h2>The Law Has Just Moved, and Most of Us Have Not Noticed</h2>
          <p>
            While I was drafting this, the UK Jurisdiction Taskforce published a legal statement, on 22 July 2026, addressing exactly the kind of scenario this piece is about: liability when an AI system causes harm, under ordinary English law rather than any AI-specific regulation. Its conclusion, in short, is that existing law is flexible enough to deal with this without new legislation, and that businesses deploying AI to handle customer contact are very likely to owe a duty of care to the people on the other end of the call.
          </p>
          <p>
            The taskforce set out what it expects a reasonable standard of care to include: proper due diligence on the system before deploying it, a genuine working understanding of how it behaves rather than simply a vendor's word for it, meaningful human oversight, transparency with customers about the fact they are speaking to AI, and adequate testing and validation. It also flagged something worth any trade business owner sitting with for a moment: because AI systems are often opaque even to the people who deploy them, courts may draw unfavourable inferences against a business that cannot explain why its system reached a particular decision, particularly if it has not kept records that would let it do so.
          </p>
          <p>
            Translated out of legal language: 'the AI got it wrong' is not going to be a defence on its own. What a court is far more likely to ask is whether a human was actually reachable, whether the decision is explainable after the fact, and whether the business understood what it had deployed in the first place. That is a reasonable bar. I do not think it is one many of us in this space, myself included, could currently point to with total confidence.
          </p>

          <h2>A Working Standard — What I Think 'Safe Enough' Looks Like</h2>
          <p>
            I do not have a finished answer to this, and I would be wary of anyone who claims they do this early. But here is where I have landed, and it is shaping what we build:
          </p>
          <p>
            <strong>Certain phrases and cues should trigger an immediate, non-negotiable human handoff</strong>, regardless of how confident the AI is in its own classification — the smell of gas, mentions of smoke or sparking, active flooding, a carbon monoxide alarm, or anyone describing difficulty breathing near a gas appliance. This should not be a judgement call the model gets to make; it should sit above the model as a hard rule.
          </p>
          <p>
            <strong>When the system genuinely is not sure, it should round up, not down.</strong> Treating a routine call as urgent costs a phone call and a moment of someone's time. Treating a genuine emergency as routine costs far more. Any voice agent tuned to minimise 'unnecessary' escalations, rather than to minimise missed emergencies, has its incentives the wrong way round.
          </p>
          <p>
            <Link href="/research/caller-experience-revolution-ai-voice-agents-2026" className="text-emerald-400 hover:underline">Callers should be told they are speaking to AI immediately and without being asked</Link> — not only because it supports trust, but because it is now a live factor in how a court would assess whether a business behaved reasonably.
          </p>
          <p>
            For anything flagged tier one or two, a human needs to be reachable within a defined, tested window — not merely 'on call' in theory. If nobody actually answers, the safeguard does not exist.
          </p>
          <p>
            Every safety-relevant call should be logged in a way that lets a business explain, afterwards, exactly why the system classified it as it did — not 'the AI decided it was low risk', but the actual reasoning, in plain language, available if it is ever needed.
          </p>
          <p>
            Providers, including us, should publish real accuracy figures for this specific task, not just customer satisfaction scores. I cannot point you to whoza's own number for this yet, because we have not measured it the way this piece argues we should. That is a gap on our side too, and I would rather admit it here than pretend otherwise.
          </p>

          <h2>Questions Worth Asking Before You Trust Any of This</h2>
          <p>
            If you run a gas, electrical, plumbing or roofing business and you are looking at an <Link href="/blog/how-does-ai-call-answering-work" className="text-emerald-400 hover:underline">AI answering service</Link>, or already using one, these are worth putting to us or to anyone else:
          </p>
          <ul>
            <li>What exactly happens on my account if a caller says they can smell gas? Ask for the actual script, not a description of it.</li>
            <li>Can I see a log of every call your system classified as non-urgent, so I can spot-check its judgement myself?</li>
            <li>What is the actual, tested time between a call being flagged urgent and a real person picking it up — not the contractual promise, the measured reality?</li>
            <li>Has this specific triage decision — genuine emergency versus routine enquiry — ever been independently tested for accuracy on trade calls, rather than inferred from a general product demonstration?</li>
          </ul>
          <p>
            If a business cannot answer those clearly, that is useful information in itself.
          </p>

          <h2>Where This Leaves Us</h2>
          <p>
            None of this is an argument against AI voice agents in trades. The evidence for the upside is solid, and some of it is ours: the Health and Safety Executive's own data, echoed in <Link href="/research/the-true-cost-of-missed-calls-2026" className="text-emerald-400 hover:underline">our earlier research</Link>, suggests something like <Link href="/blog/how-much-do-missed-calls-cost-uk-trades" className="text-emerald-400 hover:underline">33 per cent of small UK trade businesses fail to answer incoming calls</Link> (Moneypenny Small Business Call Report, 2020) during working hours, and a caller who cannot reach anyone at all is arguably at more risk, not less — they are the one left ringing round strangers at midnight, or deciding to have a go at the gas fitting themselves. <Link href="/ai-vs-virtual-receptionist" className="text-emerald-400 hover:underline">Being reachable is a safety feature too</Link>, and it is one AI is unambiguously good at.
          </p>
          <p>
            But 'does it work' and 'is it safe on the small fraction of calls that are genuine emergencies' are different questions, and this industry, us included, has spent its energy answering the first one. I do not think that is dishonest exactly, but it is incomplete, and dressing it up as more finished research than it is does not help anyone — least of all the people building this technology in good faith.
          </p>
          <p>
            So here is what I would like to commit to publicly, rather than just gesture at: whoza will publish its own tier one and tier two classification accuracy figures in a future piece of research, tested against real call transcripts rather than a demonstration script, and I would genuinely welcome other providers doing the same, so trade business owners have something better than marketing copy to judge us by. If a coroner or a court ends up being the first to properly scrutinise this, we will have failed to do something we could have done ourselves, sooner, and with better intentions.
          </p>
        </article>

        {/* FAQ Section */}
        <section className="mt-16 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((faq, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Content */}
        <section className="mt-16 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Related Research</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/research/the-true-cost-of-missed-calls-2026" className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-colors">
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors text-white">The True Cost of Missed Calls 2026</h3>
              <p className="text-sm text-white/60">UK Trades Industry Financial Impact Report — quantifying revenue loss from missed calls.</p>
            </Link>
            <Link href="/research/ai-voice-agents-uk-trades-2026" className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-colors">
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors text-white">AI Voice Agents UK Trades 2026</h3>
              <p className="text-sm text-white/60">Comprehensive analysis of AI voice agent adoption, market dynamics, and ROI for UK trade businesses.</p>
            </Link>
            <Link href="/research/voice-agent-technology-state-of-art-2026" className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-colors">
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors text-white">Voice Agent Technology: State of the Art 2026</h3>
              <p className="text-sm text-white/60">End-to-end speech models, latency engineering, and the future of conversational AI.</p>
            </Link>
            <Link href="/research/caller-experience-revolution-ai-voice-agents-2026" className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-colors">
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors text-white">Caller Experience Revolution 2026</h3>
              <p className="text-sm text-white/60">How AI voice agents are transforming customer experience for UK trades.</p>
            </Link>
          </div>
        </section>

        {/* AEO cross-link */}
        <section className="mt-12 mb-12">
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
            <p className="text-white/70 text-sm">
              This research is published as part of whoza.ai's <Link href="/research/aeo-ai-search-optimisation-2026" className="text-emerald-400 hover:underline">Answer Engine Optimisation</Link> programme — making independent, evidence-based research discoverable by AI search engines including ChatGPT, Perplexity, and Google Gemini.
            </p>
          </div>
        </section>

        {/* References */}
        <section className="mt-12 pt-8 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-white">References</h2>
          <ol className="space-y-3 text-sm text-white/50">
            <li>Health and Safety Executive (HSE), 'Gas safety — Carbon monoxide awareness: frequently asked questions', hse.gov.uk/gas/domestic/co.htm</li>
            <li>Accuracy of online symptom assessment applications, large language models, and laypeople for self-triage decisions, npj Digital Medicine, 2025, nature.com/articles/s41746-025-01566-6</li>
            <li>UK Jurisdiction Taskforce, Legal Statement on Liability for AI Harms, published 22 July 2026; summarised in 'AI Liability Under English Law: UKJT Legal Statement', A&O Shearman, aoshearman.com</li>
            <li>National Gas Emergency Service, 0800 111 999, referenced via HSE domestic gas safety guidance</li>
            <li>Stanford study of commercial automatic speech recognition systems, cited via Kerson AI Solutions, 'Accent Bias in Speech Recognition: Challenges, Impacts, and Solutions', kerson.ai</li>
            <li>Large-scale ASR accent audit, 2,700 speakers, ACL Anthology, 2022, cited via Kerson AI Solutions</li>
            <li>Cambridge-affiliated study of Whisper transcription accuracy across US and UK English speakers, Journal of the Acoustical Society of America, 2024, cited via Kerson AI Solutions</li>
            <li>whoza.ai Research, 'The True Cost of Missed Calls', 2026, whoza.ai/research/the-true-cost-of-missed-calls-2026</li>
            <li>whoza.ai, 'How Much Do Missed Calls Cost UK Trades?', whoza.ai/blog/how-much-do-missed-calls-cost-uk-trades</li>
          </ol>
          <p className="text-sm text-white/40 mt-6 italic">
            This piece reflects my own view as founder of whoza.ai, informed by the research cited above. Where figures are drawn from other fields, particularly healthcare triage, I have tried to flag the limits of that comparison rather than overstate it.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
