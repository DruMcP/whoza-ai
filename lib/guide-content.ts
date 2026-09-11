/**
 * The Whoza system guide — the product help that lived only inside the app.
 *
 * app.whoza.ai carried a six-page guide behind the dashboard, which meant nobody could read it
 * before signing up and Google never saw a word of it. The content is the same product help,
 * rebuilt here as public pages on whoza.ai, with the trial figures corrected to what the product
 * actually sells today: seven days of Starter, 100 call minutes and 10 booked jobs, on a real UK
 * number. The old copy still said "sandbox, no card required", which stopped being true.
 *
 * One source of truth for both the page bodies and their metadata, so a page can never render a
 * heading the sitemap and the SEO guard disagree with.
 */

export type GuideSlug =
  | "overview"
  | "how-it-works"
  | "getting-started"
  | "whatsapp"
  | "dashboard"
  | "faq"

export type GuideBlock =
  | { type: "p"; heading?: string; text: string }
  | { type: "steps"; heading?: string; items: string[] }
  | { type: "bullets"; heading?: string; items: string[] }
  | { type: "table"; heading?: string; headers: string[]; rows: string[][] }

export interface GuidePage {
  slug: GuideSlug
  /** Path on whoza.ai. The overview is the guide index itself. */
  path: string
  /** Short label for the guide's own navigation. */
  navLabel: string
  /** The h1. Exactly one per page — the SEO guard counts them. */
  title: string
  subtitle: string
  /** <=60 characters, or the guard fails the build. */
  metaTitle: string
  /** 70-160 characters, or the guard fails the build. */
  metaDescription: string
  blocks: GuideBlock[]
}

export const GUIDE_PAGES: GuidePage[] = [
  {
    slug: "overview",
    path: "/guide",
    navLabel: "Overview",
    title: "The Whoza System Guide",
    subtitle:
      "An AI phone receptionist for UK tradespeople. Missed calls become WhatsApp leads in seconds.",
    metaTitle: "Whoza System Guide — How It All Works",
    metaDescription:
      "The full Whoza.ai system guide for UK tradespeople: how calls are answered, how to set up, how the WhatsApp workflow runs, and what every dashboard tab does.",
    blocks: [
      {
        type: "p",
        text: "Whoza answers when you cannot. It filters the spam, qualifies the job, and sends a lead card to your WhatsApp. Your day-to-day work stays on WhatsApp, not in a dashboard.",
      },
      {
        type: "bullets",
        heading: "What Whoza is for",
        items: [
          "Every missed call becomes a captured job, not a voicemail nobody returns",
          "Seven days free on Starter: a real UK number, 100 call minutes and 10 booked jobs",
          "Qualified leads arrive on your WhatsApp within about ten seconds of the call ending",
          "Built for plumbers, electricians, roofers, locksmiths, builders and the trades beside them",
          "UK voices, a UK spam filter, and UK phone numbers",
        ],
      },
      {
        type: "table",
        heading: "What each page of this guide covers",
        headers: ["Page", "What you will learn"],
        rows: [
          ["How it works", "The path a call takes, from the ring to the lead card"],
          ["Getting started", "The eight onboarding steps and roughly how long they take"],
          ["WhatsApp workflow", "Accepting, declining and asking for a callback"],
          ["Dashboard help", "What each tab in the web dashboard is actually for"],
          ["Guide FAQ", "The short answers people ask for most often"],
        ],
      },
      {
        type: "p",
        text: "If something here does not answer your question, the support centre takes email and WhatsApp and replies the same working day.",
      },
    ],
  },
  {
    slug: "how-it-works",
    path: "/guide/how-it-works",
    navLabel: "How it works",
    title: "How a Call Becomes a Job",
    subtitle: "From the first ring to a lead card on your WhatsApp in about ten seconds.",
    metaTitle: "How a Call Becomes a Job — Whoza Guide",
    metaDescription:
      "Follow a customer call through Whoza.ai step by step: the answer, the spam filter, the qualifying questions, and the WhatsApp lead card sent to your phone.",
    blocks: [
      {
        type: "steps",
        heading: "The path of a single call",
        items: [
          "A customer dials your business number, or the dedicated UK number Whoza gives you",
          "The call is answered by your voice agent, set up in your name during onboarding",
          "The spam filter drops PPI, solar cold calls and robodiallers before they reach you",
          "The agent collects the postcode, the job type, how urgent it is, and a callback number",
          "The qualified lead is saved and a WhatsApp card is dispatched to you",
          "You reply ACCEPT, DECLINE or CALLBACK on WhatsApp",
          "The customer can receive a confirmation message when you accept",
        ],
      },
      {
        type: "p",
        heading: "Forwarding, not replacing",
        text: "Most tradespeople forward their mobile to Whoza on a busy or no-answer rule, so it only picks up when they are already on the tools. You keep your number, your business cards and your Google listing exactly as they are.",
      },
      {
        type: "bullets",
        heading: "What the agent knows before it answers",
        items: [
          "The services you sell, taken from your website or typed in during setup",
          "The postcodes you cover, so out-of-area callers are handled honestly",
          "Your dispatch hours and what counts as an emergency outside them",
          "Your own FAQs, so common questions get your answer rather than a guess",
        ],
      },
    ],
  },
  {
    slug: "getting-started",
    path: "/guide/getting-started",
    navLabel: "Getting started",
    title: "Getting Started with Whoza",
    subtitle: "Sign up, work through onboarding in about thirty minutes, then go live.",
    metaTitle: "Getting Started with Whoza — Setup Guide",
    metaDescription:
      "The eight onboarding steps for Whoza.ai, from business details to your first live call. Takes about thirty minutes and needs no technical skill to complete.",
    blocks: [
      {
        type: "steps",
        heading: "The eight onboarding steps",
        items: [
          "Sign up at app.whoza.ai and press Get Started",
          "Welcome, with a short demo video if you want to watch one first",
          "Your business name, your trade, and the WhatsApp number leads should go to",
          "Your services, read from your website automatically or typed in yourself",
          "The postcodes and the area you cover",
          "Your dispatch hours, and the rule for emergencies outside them",
          "Your AI voice and the name it answers with",
          "Go live: your number, your Google review link and your call-forwarding notes",
        ],
      },
      {
        type: "bullets",
        heading: "What the free trial gives you",
        items: [
          "Seven days on the Starter plan, with a real UK number taking real calls",
          "100 call minutes and 10 booked jobs inside the trial",
          "No contract, and you can cancel from the dashboard at any point",
          "The trial is offered on Starter; Growth and Pro start on their first paid month",
        ],
      },
      {
        type: "bullets",
        heading: "The first time you open the dashboard",
        items: [
          "A guided tour walks you through every tab in thirteen short steps",
          "You can replay that tour from your account menu whenever you want it",
          "Nothing you do during onboarding is billed or counted against your plan",
        ],
      },
      {
        type: "p",
        text: "Call forwarding itself is set up with your phone provider, not with us. Ask them to turn on forwarding to the Whoza number you were given, and it is usually active within minutes.",
      },
    ],
  },
  {
    slug: "whatsapp",
    path: "/guide/whatsapp",
    navLabel: "WhatsApp workflow",
    title: "The WhatsApp Workflow",
    subtitle: "WhatsApp is where you run the job. The dashboard is optional.",
    metaTitle: "WhatsApp Workflow — Whoza Guide",
    metaDescription:
      "How Whoza.ai delivers qualified jobs to WhatsApp, what ACCEPT, DECLINE and CALLBACK each do, and when the customer hears back from you after you reply.",
    blocks: [
      {
        type: "p",
        text: "When a job is qualified you get a WhatsApp message with a short summary of what the customer needs, where they are, how urgent it is, and the number to ring back on.",
      },
      {
        type: "table",
        heading: "What your reply does",
        headers: ["You reply", "What happens next"],
        rows: [
          ["ACCEPT", "The job is marked accepted and the customer can get a confirmation message"],
          ["DECLINE", "The lead is closed and nothing further is dispatched for it"],
          ["CALLBACK", "The job is held while you ring the customer back yourself"],
        ],
      },
      {
        type: "bullets",
        heading: "Things worth knowing",
        items: [
          "The same three actions sit in the Lead Pipeline tab if you would rather use the dashboard",
          "A post-call summary can also arrive by SMS or email if you turn those on",
          "After a job is completed, a review request can go out to the customer about a day later",
          "Leads keep arriving on WhatsApp whether or not you ever open the dashboard",
        ],
      },
    ],
  },
  {
    slug: "dashboard",
    path: "/guide/dashboard",
    navLabel: "Dashboard help",
    title: "Finding Your Way Round the Dashboard",
    subtitle: "For setting up, checking history, and tuning what your agent says.",
    metaTitle: "Dashboard Help — Whoza Guide",
    metaDescription:
      "What every tab of the Whoza.ai dashboard does, from the live call log and lead pipeline to the knowledge base, reports and your agent voice settings.",
    blocks: [
      {
        type: "table",
        heading: "What each tab is for",
        headers: ["Tab", "What it does"],
        rows: [
          ["Dashboard", "Live figures for the last thirty days and the leads coming in"],
          ["Call History", "Every call, with a written transcript and any spam flag"],
          ["Lead Pipeline", "Accept, decline or ask for a callback on qualified jobs"],
          ["Agent and Voice", "Change the voice, hear a preview, rename your agent"],
          ["Knowledge Base", "Your postcodes, your FAQs and your emergency script"],
          ["Reports", "Your figures, exportable as PDF or CSV"],
          ["Settings", "Notifications, billing, and replaying the app tour"],
        ],
      },
      {
        type: "bullets",
        heading: "The words on the figures",
        items: [
          "Answered means the agent picked up and held a conversation",
          "Booked means you accepted the job and it is in the diary",
          "Completed means the work is done and the job is closed",
          "Incomplete means the caller hung up before the agent had enough to dispatch",
          "Cancelled means the job was called off after it was booked",
        ],
      },
      {
        type: "p",
        text: "You do not need to log in every day. If WhatsApp is working, the dashboard is for setup, for checking history, and for tuning your agent when something needs changing.",
      },
    ],
  },
  {
    slug: "faq",
    path: "/guide/faq",
    navLabel: "Guide FAQ",
    title: "Guide Questions and Answers",
    subtitle: "The short answers to what people ask while they are setting up.",
    metaTitle: "Whoza Guide FAQ — Setup Questions",
    metaDescription:
      "Short answers to the questions people ask while setting up Whoza.ai: skills needed, what the trial covers, where to accept jobs, and how your data is held.",
    blocks: [
      {
        type: "table",
        heading: "Common questions",
        headers: ["Question", "Answer"],
        rows: [
          [
            "Do I need any technical skill?",
            "No. Onboarding is eight screens and takes about thirty minutes.",
          ],
          [
            "What does the free trial include?",
            "Seven days of Starter on a real UK number: 100 call minutes and 10 booked jobs.",
          ],
          [
            "Do I need a card to start the trial?",
            "Yes. Card details are taken up front and nothing is charged until day eight.",
          ],
          [
            "Where do I accept jobs?",
            "On WhatsApp, normally. The Lead Pipeline tab does the same thing.",
          ],
          [
            "What number do my customers ring?",
            "Your own number, forwarded to the Whoza UK number you are given.",
          ],
          [
            "Can I keep my existing number?",
            "Yes. Nothing on your van, your cards or your Google listing has to change.",
          ],
          [
            "What happens when I run out of minutes?",
            "Calls keep being answered. Extra booked jobs are charged at your plan's rate.",
          ],
          [
            "How is my data held?",
            "Behind a login. Nobody reaches your calls or leads without your account.",
          ],
          [
            "How do I cancel?",
            "From Settings in the dashboard, or by emailing support. No notice period.",
          ],
        ],
      },
      {
        type: "p",
        text: "Questions about billing, a call that went wrong, or anything this guide does not cover go to the support centre, which answers by email and WhatsApp.",
      },
    ],
  },
]

export function getGuidePage(slug: GuideSlug): GuidePage {
  const page = GUIDE_PAGES.find((p) => p.slug === slug)
  if (!page) throw new Error(`Unknown guide page: ${slug}`)
  return page
}
