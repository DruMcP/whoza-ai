import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FileText, Clock, ArrowLeft, User, Calendar } from "lucide-react"
import Link from "next/link"

const postDate = "2026-07-26"
const postTitle = "What Tradespeople Actually Want from AI — and It Isn't What the Tech Lot Are Selling"
const metaTitle = "What Tradespeople Actually Want from AI in Their Business"
const metaDescription = "A working tradesperson's honest take on what we actually want from AI: calls answered, evenings back, invoices out when the job's done. No apps, no jargon."
const canonicalUrl = "https://whoza.ai/blog/what-tradespeople-actually-want-from-ai"
const category = "Industry Insights"
const readTime = "12 min read"

// FAQ data for visible accordion (verbatim body text)
const faqs = [
  {
    question: "Will my customers know it's AI answering?",
    answer: "Most don't, and the ones who do don't mind — Katie introduces herself properly, sounds like a person from round here, and takes the details people actually care about. What customers can't stand is ringing out or getting a voicemail. Answered beats answered-by-who every time.",
  },
  {
    question: "I'm hopeless with technology. Honestly, how hard is it?",
    answer: "Setup takes about thirty minutes and is done for you — they ask about your services, prices and patch, and build it around that. Everything lands in WhatsApp. If you can read a text, you can run this.",
  },
  {
    question: "How much does an AI receptionist cost a tradesperson?",
    answer: (
      <>
        Plans start from £59 a month, you pay only for jobs you accept, there's no contract and no call recording. See the current tiers on the{" "}
        <Link href="/pricing" className="text-emerald-400 hover:text-emerald-300 underline">pricing page</Link>.
      </>
    ),
  },
  {
    question: "Can AI really do my invoicing?",
    answer: "It can shortly — that's the next thing on Whoza's roadmap. You tap 'Job Done' in WhatsApp and a VAT-compliant invoice goes out via Xero or QuickBooks, or a Stripe payment link if you don't use accounting software. You're not replacing your accountant; you're removing the typing and the Tuesday-night delay.",
  },
  {
    question: "What about late payers — can AI chase those too?",
    answer: "The best fix for late payment is invoicing the moment the job's finished, while the customer's still pleased with you — which is exactly what the invoicing agent is built to do. Construction firms currently wait 38 days on average to be paid; same-day invoicing cuts the queue before the chasing even starts.",
  },
  {
    question: "Is my customers' data safe?",
    answer: "Calls aren't recorded, customer details are stored securely and handled in line with GDPR, and invoice numbering stays inside Xero or QuickBooks so your VAT records remain proper for HMRC and Making Tax Digital.",
  },
  {
    question: "What if it doesn't work for me?",
    answer: "Cancel whenever you like — there's no contract. You pay for accepted jobs, so if it's not winning you work, it's not costing you money.",
  },
]

// Structured data — FAQPage (verbatim schema copy)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Will my customers know it's AI answering?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most don't, and the ones who do don't mind. Katie introduces herself properly and takes the details customers care about. Answered beats answered-by-who every time.",
      },
    },
    {
      "@type": "Question",
      "name": "I'm hopeless with technology. How hard is it to set up?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Setup takes about thirty minutes and is done for you. Everything arrives in WhatsApp — if you can read a text, you can run it.",
      },
    },
    {
      "@type": "Question",
      "name": "How much does an AI receptionist cost a tradesperson?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plans start from £59 a month. You pay only for jobs you accept, with no contract and no call recording.",
      },
    },
    {
      "@type": "Question",
      "name": "Can AI do my invoicing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Whoza's invoicing agent is next on the roadmap: tap 'Job Done' in WhatsApp and a VAT-compliant invoice goes out via Xero or QuickBooks, or a Stripe payment link if you don't use accounting software.",
      },
    },
    {
      "@type": "Question",
      "name": "Is my customers' data safe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Calls aren't recorded, customer details are stored securely and handled in line with GDPR, and invoice numbering stays inside Xero or QuickBooks so VAT records remain compliant for HMRC and Making Tax Digital.",
      },
    },
    {
      "@type": "Question",
      "name": "What if it doesn't work for me?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cancel anytime — there's no contract, and you only pay for accepted jobs.",
      },
    },
  ],
}

// Structured data — BlogPosting Article
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": metaTitle,
  "description": metaDescription,
  "image": "https://whoza.ai/og-image.webp",
  "datePublished": postDate,
  "dateModified": postDate,
  "author": {
    "@type": "Person",
    "name": "A working heating engineer",
    "jobTitle": "Self-employed Heating Engineer",
  },
  "publisher": {
    "@type": "Organization",
    "name": "Whoza.ai",
    "logo": {
      "@type": "ImageObject",
      "url": "https://whoza.ai/og-image.webp",
    },
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": canonicalUrl,
  },
  "articleSection": category,
  "inLanguage": "en-GB",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: metaTitle,
  description: metaDescription,
  alternates: {
    canonical: canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "A working heating engineer" }],
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: "article",
    authors: ["A working heating engineer"],
    tags: [category],
    url: canonicalUrl,
    siteName: "Whoza.ai",
    locale: "en_GB",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: postTitle }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: metaTitle,
    description: metaDescription,
    images: ["https://whoza.ai/og-image.webp"],
  },
}

export const revalidate = 3600

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />

      {/* Article structured data */}
      <script
        id="blog-post-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* FAQPage structured data */}
      <script
        id="blog-post-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "Blog", item: "https://whoza.ai/blog" },
        { name: postTitle, item: canonicalUrl },
      ]} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/50 hover:text-emerald-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            {category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{postTitle}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>A working heating engineer</span>
              <span className="text-white/30">— twelve years on the tools</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={postDate}>{postDate}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>
          {/* PLACEHOLDER: replace with named pilot customer byline + photo before promotion */}
          <div dangerouslySetInnerHTML={{ __html: '<!-- PLACEHOLDER: replace with named pilot customer byline + photo before promotion -->' }} />
          <div className="mt-3 text-white/30 text-sm italic">
            Written at the kitchen table, where all my admin happens.
          </div>
          <div className="mt-2 text-white/30 text-sm">
            Last updated: <time dateTime={postDate}>{postDate}</time>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-10">
          <p className="text-white/70 text-lg leading-relaxed">
            A working tradesperson&apos;s honest take on what we actually want from AI: calls answered, evenings back, invoices out when the job&apos;s done. No apps, no jargon.
          </p>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          {/* Hero image placeholder */}
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-10">
            <div className="aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <p className="text-white/40 text-sm text-center px-8">
                [IMAGE PLACEHOLDER]<br />
                Heating engineer accepting a boiler repair job via WhatsApp using Whoza AI receptionist
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="text-white/80 leading-relaxed mb-10">
            <p className="mb-4">
              I&apos;m writing this on a Tuesday night, because Tuesday night is when the paperwork gets done. During the day I&apos;m under floorboards, up ladders, or wedged behind a boiler that was fitted when I was still in primary school. Yesterday I got back to the van and found three missed calls. No voicemails. Nobody leaves voicemails any more — they just ring the next name on Google, and the research says about 85 per cent of them never try you again. One of those calls was probably a boiler swap. That&apos;s a couple of grand, gone, because I was busy doing my actual job.
            </p>
            <p className="mb-4">
              So when I tell you I&apos;ve thought hard about what I want from AI, I don&apos;t mean I&apos;ve been reading white papers. I mean I&apos;ve been losing work.
            </p>
            <p>
              I was asked to write down what tradespeople actually want from all this AI business — not what software companies reckon we want, but what we&apos;d ask for if someone said: right, it can do anything, name it. Here&apos;s my list. It&apos;s shorter than you&apos;d think.
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">The short answer, if you&apos;re in a hurry</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              We want the phone answered when we can&apos;t get to it. We want the paperwork to happen without us touching it. And we want paying without having to chase it. That is genuinely the whole list. Any bit of AI that does those three things properly — without making us learn a new system or sit through a demo — will do very well out of people like me. Anything that starts somewhere else is solving a problem we don&apos;t have.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">1. Answer the phone. That&apos;s the entire headline.</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Before anything clever: just answer it. Depending on whose figures you believe, small firms like mine miss somewhere between half and two-thirds of incoming calls, and I believe every number in that range, because I&apos;m the one missing them. You can&apos;t answer a phone with a pressurised cylinder in one hand.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              What changed for me was{" "}
              <Link href="/how-it-works" className="text-emerald-400 hover:text-emerald-300 underline">Whoza</Link>
              . Their AI, Katie, answers in my business name, works out whether it&apos;s a real job or a time-waster, and sends the lot to my WhatsApp — name, job type, postcode, rough budget, how urgent it is. Sales calls and spam get binned before they ever reach me. I tap &quot;Accept Job&quot; and it&apos;s in my diary. My customers ring the same number they&apos;ve always rung and haven&apos;t the foggiest anything&apos;s changed, which is exactly how I like it.
            </p>
            <p className="text-white/80 leading-relaxed">
              The outcome isn&apos;t &quot;AI&quot;. The outcome is that last month I booked jobs I would otherwise have lost, including one at half nine on a Sunday night. It&apos;s like having a receptionist, except she doesn&apos;t need a desk, a wage, or a lunch break.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">2. Don&apos;t make me learn anything</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Here&apos;s where the tech companies lose us. I don&apos;t want a dashboard. I don&apos;t want a login. I don&apos;t want an &quot;ecosystem&quot;. I&apos;ve got WhatsApp, the calendar on my phone and a notebook in the van, and that&apos;s the full extent of my IT department.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              And I&apos;m not the odd one out. The{" "}
              <a
                href="https://www.electricaltimes.co.uk/uk-tradespeople-losing-ten-working-weeks-a-year-to-admin-they-could-automate-survey-finds/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                UK Admin Drain Report 2026
              </a>{" "}
              found nearly a third of trades businesses have never even tried an AI tool. Not because we&apos;re daft — a sparky will happily use certification software, and I&apos;ll use a flue gas analyser all day long. We&apos;re not anti-technology. We&apos;re anti-faff. Every hour spent learning software is an hour not earning.
            </p>
            <p className="text-white/80 leading-relaxed">
              The bar, then: Whoza took about half an hour to set up, and most of that was them asking me about my prices and my patch. Everything arrives in WhatsApp, which I already use to send photos of dodgy pipework to my brother-in-law. If your product needs a training video longer than five minutes, you&apos;ve lost us.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">3. Give me my evenings back</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              That same survey reckons trades business owners lose about eight hours a week to admin — and that 77 per cent of us do it in the evenings, after the working day. For a self-employed electrician at £45 an hour, that&apos;s north of £17,000 a year in unbillable time. But here&apos;s the bit that matters: asked what we&apos;d do with the hours back, most of us didn&apos;t say &quot;grow the business&quot;. We said we&apos;d work less. Relief first, growth second.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              What eats my evening isn&apos;t anything complicated. It&apos;s typing up enquiries, chasing reviews, working out who owes me what. The first of those is sorted — every call is captured, written up and searchable, so nothing lives in my head any more. The reviews now get chased automatically after each job ({" "}
              <Link href="/" className="text-emerald-400 hover:text-emerald-300 underline">Claire, one of the other AI agents on the team</Link>
              , follows up while the customer still remembers you did a good turn), and reviews matter more than ever now that AI search engines lean on them so heavily when recommending local trades ({" "}
              <Link href="/blog/how-reviews-influence-ai-search-recommendations-tradespeople-2026" className="text-emerald-400 hover:text-emerald-300 underline">
                how-reviews-influence-ai-search-recommendations-tradespeople-2026
              </Link>
              ). On a Monday morning I get a summary of how the week&apos;s looking. That&apos;s an evening back, most weeks.
            </p>
            <p className="text-white/80 leading-relaxed">
              The kitchen table, I&apos;d like to point out, is for dinner.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">4. When the job&apos;s done, get me paid</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              This is the big one, and it&apos;s where nobody in this market has properly helped us yet. Construction is the worst-hit sector in the country for late payment —{" "}
              <a
                href="https://www.coface.com/news-economy-and-insights/2025-uk-payment-survey-companies-face-rising-payment-delays-amid-buyer-cash-flow-concerns"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                Coface&apos;s 2025 survey
              </a>{" "}
              found 95 per cent of construction firms were paid late, waiting 38 days on average. The{" "}
              <a
                href="https://www.smallbusinesscommissioner.gov.uk/late-payments-research-2/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                Office of the Small Business Commissioner
              </a>{" "}
              reckons the typical small business is owed £17,000 at any one time and spends 86 hours a year chasing it. That&apos;s two full working weeks, unpaid, spent asking for money you&apos;ve already earned.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              And some of it is self-inflicted, if I&apos;m honest. I finish a job on a Thursday. The invoice goes out the following Tuesday, because Tuesday is admin night. The customer&apos;s thirty-day clock starts whenever they fancy opening the email. Meanwhile I&apos;ve got a merchant account to settle on Friday.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              So here&apos;s the bit of the Whoza roadmap I&apos;m properly watching. They&apos;re building an invoicing agent that works off the same tap I already use: I mark the job done in WhatsApp, and a proper VAT-compliant invoice goes straight out through Xero or QuickBooks — built from the details Katie captured on the very first call, so there&apos;s nothing to retype. Don&apos;t use accounting software? You get a Stripe payment link instead, and the customer can pay on their phone before you&apos;ve left the drive. It shows as paid without you checking anything.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              It&apos;s not live yet — they&apos;re rolling it out in phases, payment links first and the full accounting hook-up once enough of us are on board — and as someone who&apos;s watched plenty of firms promise the moon and deliver a torch, I respect that they&apos;re building it in that order. But the direction is the point. Every other service stops at answering the phone. These lot want to close the loop from &quot;job done&quot; to &quot;money in the bank&quot;, and nobody else in the AI receptionist game is even attempting that. Have a look at the{" "}
              <Link href="/pricing" className="text-emerald-400 hover:text-emerald-300 underline">pricing page</Link>{" "}
              and you&apos;ll see the shape of it.
            </p>

            {/* Mid-article image placeholder */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden my-8">
              <div className="aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <p className="text-white/40 text-sm text-center px-8">
                  [IMAGE PLACEHOLDER]<br />
                  Job Done button in WhatsApp that triggers Whoza&apos;s AI invoicing agent
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">5. Prove it works before I pay for it</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Nearly half of us, per that admin survey, want a free trial showing real results before we&apos;ll commit a penny — and almost as many want to see a worked example from our own trade, not a case study about a marketing agency in Shoreditch. Fair enough, I say. We&apos;ve all been burned by software that demos beautifully and then does nothing.
            </p>
            <p className="text-white/80 leading-relaxed">
              This is where the model matters as much as the technology. Whoza&apos;s line is that they only make money when you make money: you pay for jobs you actually accept, there&apos;s no contract, and you can walk away whenever you like. For a{" "}
              <Link href="/start" className="text-emerald-400 hover:text-emerald-300 underline">pre-revenue pilot</Link>
              , that&apos;s a confident way to sell, and it&apos;s the only way I&apos;d have tried it. If it stops pulling its weight, I stop paying. Simple.
            </p>
          </section>

          {/* Section 7 — Unordered list */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">6. What I don&apos;t want (a short, honest rant)</h2>
            <ul className="space-y-3 mb-6 list-disc list-outside pl-5">
              <li className="text-white/80 leading-relaxed">
                Robots pretending to be human, badly. Customers can tell, and it makes your firm look cheap. Katie introduces herself straight and takes the details people actually care about.
              </li>
              <li className="text-white/80 leading-relaxed">
                Per-minute pricing like the old answering services. You end up watching the meter instead of the job.
              </li>
              <li className="text-white/80 leading-relaxed">
                Dashboards full of &quot;insights&quot; that tell me nothing I can use on a Wednesday.
              </li>
              <li className="text-white/80 leading-relaxed">
                Being told AI will &quot;transform&quot; my business. It won&apos;t. It&apos;ll answer the phone and do the typing, and that is plenty.
              </li>
              <li className="text-white/80 leading-relaxed">
                Recording my customers&apos; calls. Whoza doesn&apos;t, which matters to people, and to me.
              </li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">7. Where this is all heading</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Step back and the roadmap makes sense as one long job: capture the call, deliver the lead, convert the work, grow the reputation — and now, get paid at the end of it. There&apos;s even an agent called Rex keeping an eye on what your competitors are up to, which would have sounded like science fiction to me a year ago.
            </p>
            <p className="text-white/80 leading-relaxed">
              But strip the novelty away and the outcome is simple: a one-man band starts running like a firm with an office. The phone gets answered, the diary fills up, the reviews come in, and — soon — the invoice goes out the moment the van door shuts. That&apos;s not AI for its own sake. That&apos;s a Tuesday night spent not doing paperwork.
            </p>
          </section>

          {/* CTA Block */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 mb-10 text-center">
            <p className="text-white/90 leading-relaxed mb-6">
              Want to see what it looks like on your own number?{" "}
              <Link href="/how-it-works" className="text-emerald-400 hover:text-emerald-300 underline">See how it works</Link>{" "}
              or{" "}
              <Link href="/start" className="text-emerald-400 hover:text-emerald-300 underline">start the pilot</Link>{" "}
              — no credit card, no contract, live in about half an hour.
            </p>
            <Link
              href="/start"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
            >
              Start Your Free Trial
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>

          {/* FAQ Accordion */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="bg-white/5 border border-white/10 rounded-xl px-6 data-[state=open]:border-white/20"
                >
                  <AccordionTrigger className="text-white hover:no-underline hover:text-emerald-400 py-4 text-left text-base font-semibold [&>svg]:text-white/50">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 leading-relaxed pb-4 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Footnote */}
          <div className="border-t border-white/10 pt-6 mt-10">
            <p className="text-white/40 text-sm">
              Written by a Whoza pilot customer. Commercial relationship disclosed.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
