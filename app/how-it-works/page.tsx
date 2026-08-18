import { Metadata } from "next"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import { BreadcrumbSchema } from "@/components/whoza/breadcrumb-schema"
import { FAQPageSchema } from "@/components/whoza/faqpage-schema"
import { Settings, Phone, MessageSquare, BarChart3, Shield, RefreshCw } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "How Katie Works — AI Call Answering | whoza.ai",
  description: "Discover how whoza.ai's AI voice agent Katie answers calls, qualifies leads and books jobs for UK tradespeople — 24/7. Setup in 30 mins. Plans from £59.",
  alternates: {
    canonical: "https://whoza.ai/how-it-works",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://whoza.ai/how-it-works",
    siteName: "Whoza.ai",
    title: "How It Works | whoza.ai",
    description: "Discover how whoza.ai's AI voice agent Katie answers calls, qualifies leads and books jobs for UK tradespeople — 24/7. Setup in 30 mins. Plans from £59.",
    images: [{ url: "https://whoza.ai/og-image.webp", width: 1200, height: 630, alt: "How whoza.ai works" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whozaai",
    title: "How It Works | whoza.ai",
    description: "Discover how whoza.ai's AI voice agent Katie answers calls, qualifies leads and books jobs for UK tradespeople — 24/7. Setup in 30 mins. Plans from £59.",
    images: ["https://whoza.ai/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const howItWorksFaqs = [
  {
    question: "How does Katie actually answer my phone calls?",
    answer: "When a customer calls your business number, Katie picks up instantly — usually within 2 rings. She greets them with your branded message, asks qualifying questions about their job, and captures all the details. The entire conversation happens in natural, conversational English. No menus, no hold music, no 'press 1 for sales'.",
  },
  {
    question: "Do I need to change my business phone number?",
    answer: "No. You keep your existing number. You simply set up call forwarding from your current provider (BT, Virgin, Vodafone, etc.) to your whoza.ai number. Your customers dial the same number they've always used — they just get answered every time instead of hitting voicemail. Setup takes under 10 minutes.",
  },
  {
    question: "How quickly can I get set up?",
    answer: "Most tradespeople are live and capturing calls within 30 minutes. Sign up, choose your plan, connect your number via call forwarding, set your greeting and trade details, and Katie starts answering immediately. No hardware, no IT team, no technical knowledge required.",
  },
  {
    question: "What information does Katie collect from callers?",
    answer: "Katie captures: full name, phone number, postcode, property type, problem description, urgency level, preferred appointment time, and how they found you. For emergencies, she also flags priority and asks key safety questions. Everything is structured and delivered to your WhatsApp in a clean, readable format.",
  },
  {
    question: "Will customers know they're talking to AI?",
    answer: "Katie introduces herself as your digital assistant with a natural, professional voice. Most callers appreciate the instant response over voicemail or a ringing phone. Most callers are satisfied with the AI experience — they just want their problem fixed fast.",
  },
  {
    question: "How does the WhatsApp delivery work?",
    answer: "Within 3 seconds of the call ending, you receive a structured WhatsApp message with all the caller's details: name, number, address, job type, urgency level, and notes from the conversation. You can tap 'Accept', 'Call Back', or 'Decline' directly in the chat. The customer gets an instant SMS confirmation either way.",
  },
  {
    question: "Can Katie book appointments into my calendar?",
    answer: "Yes. Katie checks your connected calendar (Google, Outlook, or Apple) for available slots and offers them to the customer. When they confirm, the booking is saved and both parties receive confirmation. No double-bookings, no back-and-forth scheduling calls.",
  },
  {
    question: "What happens if Katie can't handle a complex enquiry?",
    answer: "Katie recognises when a call needs human attention. For complex quotes or unusual situations, she takes a detailed message, flags it for your immediate callback, and delivers full context in WhatsApp so you can call back prepared. If a caller specifically asks for you, she can attempt a live transfer.",
  },
]

const steps = [
  {
    icon: Settings,
    title: "1. Quick Setup",
    description: "Tell us about your business — your trade, services, areas you cover, and how you like to handle enquiries. Katie learns your voice in minutes.",
  },
  {
    icon: Phone,
    title: "2. Diverts Your Calls",
    description: "Forward your business number to whoza.ai. When a customer calls, Katie picks up instantly — no hold music, no voicemail, no missed jobs.",
  },
  {
    icon: MessageSquare,
    title: "3. Handles Every Enquiry",
    description: "Katie greets callers professionally, asks the right qualifying questions, checks your diary, and gives accurate quotes using your pricing rules.",
  },
  {
    icon: BarChart3,
    title: "4. Delivers to Your Phone",
    description: "Qualified enquiries land in your WhatsApp or SMS with caller details, job summary, and urgency level. You decide — accept, callback, or decline.",
  },
  {
    icon: Shield,
    title: "5. You Stay in Control",
    description: "Full dashboard visibility — listen to calls, tweak Katie's responses, set custom rules, and track every enquiry from first call to booked job.",
  },
]

export const revalidate = 3600

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />
      <BreadcrumbSchema items={[
        { name: "Home", item: "https://whoza.ai" },
        { name: "How It Works", item: "https://whoza.ai/how-it-works" },
      ]} />
      <FAQPageSchema faqs={howItWorksFaqs} />
      <script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Set Up AI Call Answering for Your Trade Business",
            "description": "Get Katie answering your calls in 10 minutes. No technical knowledge required.",
            "image": "https://whoza.ai/og-image.webp",
            "totalTime": "PT10M",
            "supply": [
              {
                "@type": "HowToSupply",
                "name": "Your existing business phone number"
              },
              {
                "@type": "HowToSupply",
                "name": "WhatsApp on your mobile"
              }
            ],
            "tool": [
              {
                "@type": "HowToTool",
                "name": "whoza.ai account"
              }
            ],
            "step": [
              {
                "@type": "HowToStep",
                "name": "Create your account",
                "text": "Sign up at whoza.ai and choose your plan. The 7-day free trial starts immediately — no credit card required.",
                "url": "https://whoza.ai/how-it-works#step1",
                "image": "https://whoza.ai/images/step1-signup.webp"
              },
              {
                "@type": "HowToStep",
                "name": "Tell Katie about your business",
                "text": "Enter your trade, areas you cover, services you offer, and working hours. Katie uses this to answer calls accurately.",
                "url": "https://whoza.ai/how-it-works#step2"
              },
              {
                "@type": "HowToStep",
                "name": "Set up call forwarding",
                "text": "Dial the forwarding code for your network (BT: *61*[number]#, Virgin: call 150, Mobile: **61*[number]*11#).",
                "url": "https://whoza.ai/how-it-works#step3"
              },
              {
                "@type": "HowToStep",
                "name": "Test your first call",
                "text": "Call your business number from another phone. Katie will answer, take details, and send you a WhatsApp summary.",
                "url": "https://whoza.ai/how-it-works#step4"
              },
              {
                "@type": "HowToStep",
                "name": "Connect WhatsApp alerts",
                "text": "Confirm your WhatsApp number in the dashboard. Every call Katie answers will appear as a chat with full details.",
                "url": "https://whoza.ai/how-it-works#step5"
              }
            ]
          })
        }}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Phone className="w-4 h-4" />
            Simple. Smart. 24/7.
          </div>
          <h1 className="text-4xl font-bold mb-4">How whoza.ai Works</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            From the first ring to the booked job — here's how Katie becomes your AI revenue team in five simple steps.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-start gap-5"
            >
              <div className="bg-emerald-500/10 rounded-lg p-3 flex-shrink-0">
                <step.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
                <p className="text-white/60 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
          >
            <Phone className="w-5 h-5" />
            See Katie in Action
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
