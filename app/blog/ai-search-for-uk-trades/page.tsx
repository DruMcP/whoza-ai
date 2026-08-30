import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { BlogPostArticleSchema } from "@/components/whoza/blog-post-schema"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"

const PUBLISHED = "2026-07-23"

export const metadata: Metadata = {
  metadataBase: new URL("https://whoza.ai"),
  title: "AI Visibility: Why Most UK Trades Are Invisible to ChatGPT",
  description:
    "Google visibility ≠ AI visibility. Here's why most UK trades show up fine on Google but are missing from ChatGPT's shortlist — and the 5 signals that fix it.",
  keywords: [
    "AI visibility",
    "AI search for tradespeople",
    "ChatGPT find a tradesperson",
    "answer engine optimisation UK trades",
    "AI receptionist UK trades",
    "get found by AI",
  ],
  openGraph: {
    type: "article",
    locale: "en_GB",
    url: "https://whoza.ai/blog/ai-search-for-uk-trades",
    siteName: "Whoza.ai",
    title: "AI Visibility: Why Most UK Trades Are Invisible to ChatGPT",
    description:
      "Google visibility ≠ AI visibility. Here's why most UK trades show up fine on Google but are missing from ChatGPT's shortlist — and the 5 signals that fix it.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "AI visibility for UK trades" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Visibility: Why Most UK Trades Are Invisible to ChatGPT",
    description:
      "Google visibility ≠ AI visibility. Here's why most UK trades show up fine on Google but are missing from ChatGPT's shortlist — and the 5 signals that fix it.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  alternates: {
    canonical: "https://whoza.ai/blog/ai-search-for-uk-trades",
  },
}

const faqs = [
  {
    question: "Do customers really use ChatGPT to find tradespeople?",
    answer:
      "Yes, and it's rising fast. Over half of UK adults now use AI tools (Ofcom, 2025); in BrightLocal's 2026 survey of US consumers, 45% had used AI to find a local business in the past year (64% among 30–44-year-olds) — a strong leading indicator for the UK. Most use it to build a shortlist, then check reviews before calling.",
  },
  {
    question: "Is being on Google enough to show up in AI answers?",
    answer:
      "No. Google visibility and AI visibility are separate systems. Plenty of trades who rank fine on Google are missing entirely from ChatGPT's answers, because nothing has told the AI clearly who they are, what they do and where.",
  },
  {
    question: "How do I check whether AI recommends my business?",
    answer:
      "Ask it directly. Type “best [your trade] in [your town]” into ChatGPT and Google's AI Overview. If your name isn't in the answer, you're not on the shortlist — and now you know to fix it.",
  },
  {
    question: "What makes AI recommend one tradesperson over another?",
    answer:
      "Five signals: clarity (consistent, machine-readable facts about your business), consensus (independent sources agreeing you're good), answer-readiness (plain answers to common questions on your own site), trust (real reviews and a real identity), and context (a clear location and current information).",
  },
  {
    question: "Will AI replace review sites like Checkatrade?",
    answer:
      "Not replace — reorder. AI increasingly builds the first shortlist, and reviews still close the decision. The businesses that win are visible to the AI and backed by reviews when the customer checks.",
  },
]

export default function AISearchForTradesPost() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://whoza.ai" },
          { name: "Blog", item: "https://whoza.ai/blog" },
          { name: "AI Visibility: Why Most UK Trades Are Invisible to ChatGPT", item: "https://whoza.ai/blog/ai-search-for-uk-trades" },
        ]}
      />
      <BlogPostArticleSchema
        slug="ai-search-for-uk-trades"
        title="AI Visibility: Why Most UK Trades Are Invisible to ChatGPT"
        description="How UK customers now use AI to find and vet tradespeople — and how to make sure your trade business is the one it recommends."
        datePublished={PUBLISHED}
        dateModified={PUBLISHED}
        author="Dru McPherson"
        authorTitle="Founder, Whoza"
        category="AI Visibility"
        excerpt="Google visibility ≠ AI visibility. Here's why most UK trades show up fine on Google but are missing from ChatGPT's shortlist — and the 5 signals that fix it."
      />
      <FAQPageSchema faqs={faqs} />

      <Header />

      <main className="bg-white text-[#15233B]">
        <article className="mx-auto max-w-3xl px-6 py-16">
          <nav className="mb-8 text-sm text-[#5A6472]">
            <Link href="/blog" className="hover:underline">← Back to Blog</Link>
          </nav>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#047857]">AI Visibility</p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            AI Visibility: Why Most UK Trades Are Invisible to ChatGPT
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-[#5A6472]">
            A plumber asked his customer how she found him. She didn't say Google. She didn't say Checkatrade. 
            She said: <em>"I asked ChatGPT for a good boiler engineer near me, and your name came up."</em>
          </p>
          <p className="mt-4 text-sm font-semibold text-[#047857]">By Dru · Founder of Whoza · Published 23 July 2026</p>

          <div className="prose-content mt-10 space-y-6 text-lg leading-relaxed">
            <p>
              Picture a scene that&apos;s starting to play out across the country. A plumber wins a boiler job, and out of
              habit asks the customer how she found him. She doesn&apos;t say Google. She doesn&apos;t say Checkatrade. She
              says: <em>&ldquo;I asked ChatGPT for a good boiler engineer near me, and your name came up.&rdquo;</em>
            </p>
            <p>
              It sounds like a one-off. The data says it isn&apos;t — and the more tradespeople I talk to, the more I hear
              versions of it. So I want to lay out what&apos;s actually happening, as plainly and honestly as I can,
              without selling you anything. The way people find a tradesperson is changing faster than almost anyone in
              the trade has noticed. Not in five years. Now.
            </p>

            <div className="rounded-2xl border-l-4 border-[#047857] bg-[#F1F8F4] p-6">
              <h2 className="!mt-0 text-xl font-bold text-[#047857]">What you&apos;ll learn in the next 6 minutes</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                <li>Why being #1 on Google doesn&apos;t mean AI will ever mention your name (and how to check in 2 minutes)</li>
                <li>The exact 5 signals that make ChatGPT confident enough to recommend a tradesperson — most trades have 2 or fewer</li>
                <li>A free 10-minute test that shows you exactly who&apos;s on the AI shortlist in your area — and why they&apos;re there</li>
                <li>Why &ldquo;AI visibility&rdquo; is now a separate skill from SEO — and the 3 things that matter for one but not the other</li>
              </ul>
            </div>

            <h2 className="pt-4 text-2xl font-bold">UK customers have quietly switched to AI</h2>
            <p>
              <strong>In 2025, AI search stopped being a novelty and became a habit.</strong> Ofcom — the UK regulator,
              about as neutral a source as you&apos;ll find — reported that 54% of UK adults now use AI tools like ChatGPT,
              Copilot or Gemini. A year earlier it was 31%; the year before that, 23%. That&apos;s usage more than doubling
              in two years.
            </p>
            <p>
              Among under-35s it&apos;s already the default: 79% of 16–24s and 74% of 25–34s use these tools — prime
              homeowner and landlord age. ChatGPT alone drew 1.8 billion UK web visits in the first eight months of 2025,
              up from 368 million in the same stretch of 2024.
            </p>
            <p>
              I don&apos;t quote those numbers to impress you. I quote them because every one of those people is someone
              who used to open Google — and a good chunk of them are your customers.
            </p>

            <h2 className="pt-4 text-2xl font-bold">The page of ten just became a shortlist of three</h2>
            <p>
              <strong>Old search gave you ten links and made you do the work. AI does the work and gives you a few
              names.</strong> Google &ldquo;emergency electrician Leeds&rdquo; and you&apos;d get ten blue links, a map and
              some ads, then ring around. Ask ChatGPT or Google&apos;s AI the same thing and you get a tidy answer: two or
              three names, a line on each, done.
            </p>
            <p>
              Around 30% of UK Google searches now trigger an AI summary at the very top of the page (Ofcom), and 53% of
              adults say they see these often. That changes everything. On the old page of ten, being result #7 still got
              you seen. On the AI Shortlist there is no #7. You&apos;re one of the three names, or you may as well not
              exist.
            </p>
            <p>
              And the clicks are following the answers. Ofcom found Google search clicks fell by about 26% in the six
              months after someone&apos;s first ChatGPT visit (measured on US proxy data, so treat it as directional), and
              Semrush pegs a ~40% drop in click-through when an AI Overview sits on top. The traffic isn&apos;t vanishing —
              it&apos;s being answered before anyone scrolls.
            </p>

            <h2 className="pt-4 text-2xl font-bold">Do people really use AI to choose a tradesperson?</h2>
            <p>
              <strong>Increasingly, yes — to build the shortlist. They still check reviews before they call.</strong> I&apos;ll
              be straight with you here, because I&apos;ve watched too many people in this space wave around scary stats they
              can&apos;t back up. Using AI to pick a local business is newer and messier than the headline adoption figures.
              But the direction is unmistakable.
            </p>
            <p>
              In BrightLocal&apos;s 2026 research — a survey of around 1,000 US consumers — 45% said they&apos;d used an AI
              tool like ChatGPT, Gemini or Perplexity to find a local business in the past year, rising to 64% among
              30–44-year-olds. Around 63% of active AI users said they trust its recommendations for local businesses. I
              flag that it&apos;s US data deliberately: the UK usually trails American consumer habits by a year or two,
              which makes it less a foreign curiosity and more a preview of where we&apos;re heading — sitting right on top
              of the UK adoption Ofcom is already measuring.
            </p>
            <p>
              Here&apos;s the nuance that actually matters, though: 97% still double-check against real reviews before they
              act. So AI isn&apos;t replacing human judgement — it&apos;s building the shortlist that judgement gets applied
              to. You don&apos;t win the job inside the AI answer. You get into the room where the job is won. Which is
              exactly why being on that list is everything.
            </p>

            <h2 className="pt-4 text-2xl font-bold">The uncomfortable bit: most trades are invisible to AI</h2>
            <p>
              <strong>Being findable on Google does not mean you&apos;re findable by AI.</strong> They&apos;re different
              systems, with different memories, updated in different ways. When LocalFalcon ran nearly 190,000 AI searches
              against 16 million Google results, 83% of businesses that showed up fine on Google were missing from
              ChatGPT&apos;s answers. (That study was US restaurants, so take the exact number as illustrative — but the
              pattern holds everywhere I&apos;ve looked; one UK agency that checked 100 local firms in ChatGPT found just
              three clearly visible.)
            </p>
            <p>
              I call this the invisible middle: thousands of genuinely good trades who are doing fine on Google, have no
              idea there&apos;s now a second front page, and are quietly absent from it. The frustrating part is that
              it&apos;s usually not a quality problem. It&apos;s a legibility problem — and that one you can fix.
            </p>

            <h2 className="pt-4 text-2xl font-bold">So how does AI actually decide who to name?</h2>
            <p>
              <strong>An AI recommends the business it&apos;s most confident actually exists, does the job, and can be
              trusted.</strong> No one publishes the exact recipe — OpenAI openly says ChatGPT can pull from third-party
              search and doesn&apos;t reveal a fixed local-business order. A whole young discipline has sprung up around
              this, usually called GEO or answer-engine optimisation; I&apos;m not claiming to have invented it. What
              we&apos;ve done is boil it down to the five signals that actually move the needle for a trade business — the
              things that make an AI confident enough to say your name. We call it Entity Confidence.
            </p>
            <p>
              The first signal is what I call <strong>Clarity</strong> — and it&apos;s where most trades fall at the first hurdle. The machine has to be able to tell, without any ambiguity, who you are, what you do, and where you do it. That means your business name is identical everywhere it appears — your website, your Google Business Profile, your Checkatrade listing, your van signage. Not "Dave's Plumbing" in one place and "David Smith Plumbing Services" in another. Not a mobile number on your site and a landline on your directory listings. And crucially, not a vague "we cover Greater Manchester" when what you mean is "we work in Stockport, Cheadle and Bramhall." The AI sees mismatches as uncertainty — and uncertainty means it won&apos;t risk recommending you. Structured data helps enormously here: JSON-LD markup on your website that explicitly spells out your name, address, phone number and services in machine-readable code. Without it, the AI has to guess. With it, you&apos;re telling it directly.
            </p>
            <p>
              The second signal is <strong>Consensus</strong> — do multiple independent sources agree that you exist and you&apos;re good at what you do? One glowing review on your own website means almost nothing to an AI, because of course you&apos;d only publish the good ones. But 47 Google reviews averaging 4.8 stars, plus a Checkatrade profile with 23 positive ratings, plus a mention in a local newspaper article about heating engineers — that&apos;s a pattern the AI can trust. Here&apos;s a statistic that matters: Yext found that 86% of AI citations trace back to sources a business can actually influence. This is not out of your hands. Every review you collect, every directory you claim, every local mention you earn — it all adds up to consensus. The businesses winning the AI shortlist aren&apos;t necessarily the best; they&apos;re the ones with the most consistent digital footprint across multiple platforms.
            </p>
            <p>
              Third comes <strong>Answer-readiness</strong> — and this is where most trade websites fail spectacularly. When someone asks an AI "who&apos;s the best plumber in Leeds for emergency call-outs?", the AI isn&apos;t just looking for a business called "Leeds Plumbing." It&apos;s looking for a page, somewhere on the internet, that explicitly says "We offer 24/7 emergency plumbing services in Leeds, covering burst pipes, boiler breakdowns and blocked drains, with an average response time of 45 minutes." Most trade websites have a generic "Services" page and a contact form. That&apos;s not answer-ready. The AI can&apos;t extract a useful answer from vague claims. You need dedicated pages that answer specific questions in plain English — not jargon, not marketing fluff, just direct answers. FAQ pages are particularly powerful here, which is why we&apos;ve built them into every location and trade page on our own site. When the AI scans the web for an answer, it finds ours because we&apos;ve literally written the answer it&apos;s looking for.
            </p>
            <p>
              The fourth signal is <strong>Trust</strong> — and this goes deeper than just having good reviews. AI systems are trained to be cautious about who they vouch for, because a bad recommendation damages the AI&apos;s credibility too. They look for signals that you&apos;re a real, legitimate business run by a real human being. That means a named founder or owner (not just "admin"), a real physical address (not a PO box), current information (not a blog post from 2019 as your latest update), and genuine engagement with customers (replying to reviews, answering questions on your Google Business Profile). One of the most powerful trust signals is simply longevity — a business that&apos;s been around for five years with consistent information across the web is far more likely to be recommended than a new business with a flashy website but no history. The AI is essentially asking: "If I recommend this person and something goes wrong, will I look stupid?" Your job is to make the answer an obvious no.
            </p>
            <p>
              Finally, <strong>Context</strong> — the AI needs to know not just that you exist, but where you exist and when you&apos;re relevant. A plumber in London is useless to someone in Glasgow, and a heating engineer who only works weekdays is useless to someone with a boiler emergency on Sunday night. Your location needs to be crystal clear — not just "UK-wide coverage" but specific towns, postcodes, and service areas. Your hours need to be accurate and up-to-date. Your services need to match what people actually search for. And perhaps most importantly, your information needs to be current. An AI will hesitate to recommend a business whose website hasn&apos;t been updated in two years, whose last Google review was six months ago, or whose phone number goes to voicemail. Context is about being not just findable, but relevant and active right now.
            </p>
            <p>
              That&apos;s the five. It isn&apos;t magic, and it isn&apos;t gameable trickery. It&apos;s being unmistakably legible to a machine that&apos;s trying very hard not to be wrong. Most trades I speak to have two, maybe three of these signals working. The ones winning the AI shortlist have all five — not because they&apos;re spending thousands on marketing, but because they&apos;ve made themselves easy for a cautious robot to confidently recommend.
            </p>

            <h2 className="pt-4 text-2xl font-bold">What I&apos;d do about it this month (even if you never touch Whoza)</h2>
            <p><strong>Make yourself easy for a cautious robot to recommend.</strong> These aren&apos;t quick hacks — they&apos;re structural changes that compound over time. The payoff is being on the AI shortlist when your competitors aren&apos;t even aware it exists.</p>
            <p>
              Start with your <strong>Google Business Profile</strong>. Not just claiming it — actually filling it out completely and keeping it current. Hours, services, service areas, photos, products, Q&A answers. Make sure every detail matches your website exactly. A mismatch as small as "Mon-Fri 8am-6pm" on your site and "Mon-Fri 8:00-18:00" on Google Business is enough to introduce uncertainty. The AI sees inconsistency as risk.
            </p>
            <p>
              Next, audit your <strong>name, number and trade identity everywhere they appear</strong>. Your website, every directory, your van, your invoices, your email signature. They should be identical. If you&apos;re "Smith & Sons Plumbing" on Checkatrade but "Smith and Sons Plumbing Services" on Yelp, that&apos;s a problem. If your website shows a mobile number but your Google Business Profile shows a landline, that&apos;s a problem. The AI cross-references these sources; mismatches make it hesitate.
            </p>
            <p>
              Then, put <strong>plain answers on your own site</strong>. Not marketing fluff — direct answers to the questions your customers actually ask. Do you do emergency call-outs? What areas do you cover? What are your rough prices? How quickly can you respond? A huge proportion of AI citations come directly from a business&apos;s own website, because it&apos;s the one source the business controls completely. If your site doesn&apos;t answer the question, the AI has to look elsewhere — and elsewhere might be a competitor.
            </p>
            <p>
              Keep your <strong>reviews coming, and reply to every single one</strong> — positive and negative. This hits two signals at once: consensus (multiple independent sources saying you&apos;re good) and trust (you&apos;re engaged and responsive). A business with 50 reviews and zero replies looks abandoned. A business with 30 reviews and thoughtful replies to each looks active and customer-focused. The AI notices.
            </p>
            <p>
              Finally, and this costs nothing but ten minutes: <strong>ask the AIs about yourself</strong>. Open ChatGPT, Google&apos;s AI Overview and Perplexity. Type "best [your trade] in [your town]." See who comes up. If it&apos;s not you, note who is there instead and what they have that you don&apos;t. Do this for your town and the two or three neighbouring towns you cover. Do it for "emergency [trade] near me." This is your baseline. It&apos;s free, it&apos;s eye-opening, and it tells you exactly which of the five signals you&apos;re missing.
            </p>

            <div className="rounded-2xl border-l-4 border-[#047857] bg-[#F1F8F4] p-6">
              <h2 className="!mt-0 text-xl font-bold text-[#047857]">A 10-minute test you can run today (and one we run for you)</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                <li><strong>Step 1.</strong> Open ChatGPT, Google&apos;s AI and Perplexity. Ask each: &ldquo;Who&apos;s the best [your trade] in [your town]?&rdquo;</li>
                <li><strong>Step 2.</strong> Note whether your business is named, who is named instead, and what the AI says about them.</li>
                <li><strong>Step 3.</strong> Repeat for the two or three nearby towns you cover, and for one &ldquo;emergency [trade] near me&rdquo; query.</li>
                <li><strong>What you&apos;ll learn.</strong> Whether you&apos;re on the AI Shortlist, who&apos;s beating you to it, and which of the five signals they have that you don&apos;t. It&apos;s free, it takes ten minutes, and for most trades it&apos;s a genuine wake-up call.</li>
                <li><strong>Doing it continuously</strong> is what Rex, our AI-visibility agent, is for — because the answers change week to week, and checking once tells you today&apos;s score, not next month&apos;s.</li>
              </ul>
            </div>

            <h2 className="pt-4 text-2xl font-bold">Where Whoza fits (the honest bit)</h2>
            <p>
              Full disclosure, since you&apos;ve read this far: this is part of the problem we built Whoza to solve. Our
              agent Rex checks where you show up across AI answers, watches what your local competitors are doing, and
              tells you the specific moves to make. I&apos;m not going to pretend it&apos;s the only way — everything in the
              list above you can do yourself. But someone has to keep watching it, because the AIs change their answers
              constantly, and that&apos;s the bit a busy tradesperson never has time for.
            </p>

            <h2 className="pt-4 text-2xl font-bold">Where this goes next</h2>
            <p>
              A prediction, then I&apos;ll let you get back to work. Within a couple of years, &ldquo;I found them on
              Google&rdquo; will sound the way &ldquo;I found them in the Yellow Pages&rdquo; sounds now — not wrong, just
              clearly a certain age. The trades who win the next decade won&apos;t necessarily be the best marketers.
              They&apos;ll be the ones a machine can confidently vouch for at the exact moment a customer asks. The bar
              isn&apos;t being loud. It&apos;s being legible. That&apos;s a very winnable game — but only if you know
              it&apos;s being played.
            </p>

            <h2 className="pt-6 text-2xl font-bold">Frequently asked questions</h2>
            <div className="space-y-5">
              {faqs.map((f) => (
                <div key={f.question}>
                  <h3 className="text-lg font-bold">{f.question}</h3>
                  <p className="mt-1 text-base text-[#33405A]">{f.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-[#E4EAF1] bg-[#F7FAFD] p-6">
              <h2 className="!mt-0 text-lg font-bold text-[#047857]">About the author</h2>
              <p className="mt-2 text-base">
                Dru is the founder of Whoza, an AI receptionist and revenue system built for UK trades — it answers every
                call 24/7, qualifies real jobs and sends them straight to your WhatsApp.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold">Sources</h2>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-[#5A6472]">
                <li><a className="text-[#1155CC] underline" rel="noopener" target="_blank" href="https://www.ofcom.org.uk/media-use-and-attitudes/media-habits-adults/passive-social-media-use-ai-companionship-and-online-side-hustles-uk-adults-media-and-online-lives-revealed">Ofcom — Adults&apos; Media Use and Attitudes 2025</a> (AI tool adoption: 54%, up from 31%; age breakdown)</li>
                <li><a className="text-[#1155CC] underline" rel="noopener" target="_blank" href="https://www.ofcom.org.uk/media-use-and-attitudes/online-habits/from-apps-to-ai-search-how-the-uk-goes-online-in-2025">Ofcom — Online Nation 2025</a> (ChatGPT UK visits; ~30% of UK searches show an AI summary; click impact)</li>
                <li><a className="text-[#1155CC] underline" rel="noopener" target="_blank" href="https://www.brightlocal.com/research/lcrs-ai-trust/">BrightLocal — AI Trust research</a> (45% used AI to find a local business; ~1,000 US consumers)</li>
                <li><a className="text-[#1155CC] underline" rel="noopener" target="_blank" href="https://www.yext.com/about/news-media/ai-citations-release">Yext — press release, Oct 2025</a> (86% of AI citations came from brand-managed sources)</li>
                <li><a className="text-[#1155CC] underline" rel="noopener" target="_blank" href="https://www.localfalcon.com/blog/the-ai-visibility-crisis-why-83-percent-of-restaurants-dont-exist-in-chatgpt">LocalFalcon — The AI Visibility Crisis</a> (illustrative; US restaurants)</li>
                <li><a className="text-[#1155CC] underline" rel="noopener" target="_blank" href="https://www.semrush.com/blog/ai-search-optimization-for-local-businesses/">Semrush — AI search / AI Overviews</a></li>
              </ul>
              <p className="mt-3 text-xs italic text-[#8A94A2]">
                A note on the numbers: UK adoption figures are from Ofcom&apos;s 2025 reports (fieldwork Sept–Nov 2025,
                7,533 UK adults 16+). Consumer local-search figures are from BrightLocal&apos;s 2026 survey of ~1,000 US
                consumers, treated as a leading indicator for the UK, not a UK measurement. Every statistic here has been
                traced to its original source; where a figure is non-UK or from a smaller sample, it is flagged in the
                text.
              </p>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}
