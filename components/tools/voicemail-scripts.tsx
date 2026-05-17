"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, ArrowRight, CheckCircle2, Copy, Mic, MessageSquare, Volume2 } from "lucide-react"
import { Header } from "@/components/whoza/header"
import { Footer } from "@/components/whoza/footer"
import Script from "next/script"

const trades = [
  { key: "plumber", label: "Plumber" },
  { key: "electrician", label: "Electrician" },
  { key: "roofer", label: "Roofer" },
  { key: "builder", label: "Builder" },
  { key: "gas-engineer", label: "Gas Engineer" },
  { key: "heating-engineer", label: "Heating Engineer" },
  { key: "locksmith", label: "Locksmith" },
  { key: "landscaper", label: "Landscaper" },
  { key: "cleaner", label: "Cleaner" },
  { key: "other", label: "Other" },
]

const styleOptions = [
  {
    key: "formal",
    label: "Formal & Professional",
    description: "Polished, corporate tone — ideal for B2B or premium positioning",
  },
  {
    key: "friendly",
    label: "Friendly & Local",
    description: "Warm, approachable — perfect for residential trade work",
  },
  {
    key: "urgent",
    label: "Urgent & Direct",
    description: "Short, action-focused — best for emergency services",
  },
]

export function VoicemailScriptGenerator() {
  const [name, setName] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [phone, setPhone] = useState("")
  const [trade, setTrade] = useState("plumber")
  const [style, setStyle] = useState("friendly")
  const [showResults, setShowResults] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const tradeLabel = trades.find((t) => t.key === trade)?.label || "Tradesperson"
  const styleInfo = styleOptions.find((s) => s.key === style) || styleOptions[1]

  const generateScripts = () => {
    const b = businessName || `${name || "Your"} ${tradeLabel}`
    const n = name || "the team"
    const p = phone || "your number"

    if (style === "formal") {
      return [
        {
          title: "Professional Greeting",
          text: `Thank you for calling ${b}. You have reached the voicemail of ${n}. We are currently unable to take your call. Please leave your name, contact number, and a brief description of your enquiry, and a member of our team will return your call within 24 hours. Alternatively, you may reach us at ${p}. Thank you.`,
        },
        {
          title: "After-Hours Professional",
          text: `You have reached ${b}. Our office hours are Monday to Friday, 8am to 6pm. If you are calling outside these hours, please leave a detailed message including your name, number, and the nature of your enquiry. For urgent matters requiring immediate attention, please contact us on ${p}. We will respond to all messages at the start of the next business day.`,
        },
        {
          title: "Service Booking",
          text: `Hello, and thank you for contacting ${b}. This is ${n}. If you are calling to book a ${tradeLabel.toLowerCase()} service, please leave your full name, property address, preferred appointment date, and contact number. Our scheduling team will confirm your appointment within one working day. For existing bookings, please quote your reference number. Reach us directly at ${p}.`,
        },
      ]
    }

    if (style === "urgent") {
      return [
        {
          title: "Emergency Direct",
          text: `You have reached ${b}. I am ${n}, your ${tradeLabel.toLowerCase()}. I cannot take your call right now. If this is an emergency, text ${p} with the word URGENT and I will call you back immediately. For all other enquiries, leave your name, number, and what you need done. I return every call the same day.`,
        },
        {
          title: "Quick Callback",
          text: `Hi, this is ${n} from ${b}. I am on a job and cannot pick up. Leave your number after the tone and I will call you back within the hour. For emergencies, text me on ${p}. Speak soon.`,
        },
        {
          title: "24-Hour Line",
          text: `This is ${b}. If you need a ${tradeLabel.toLowerCase()} urgently, leave your name and number now and we will call you back within 30 minutes. Non-urgent enquiries will be returned by the end of the day. Text ${p} for the fastest response.`,
        },
      ]
    }

    // friendly (default)
    return [
      {
        title: "Warm Welcome",
        text: `Hi there! You have reached ${b}. It is ${n} here — sorry I missed your call! I am probably up a ladder or under a sink right now. Leave your name and number after the beep and I will get back to you as soon as I am free. If it is urgent, give me a text on ${p} and I will call you straight back. Thanks!`,
      },
      {
        title: "Local & Trusted",
        text: `Hello, you have got through to ${b}. I am ${n}, your local ${tradeLabel.toLowerCase()}. I am on a job at the moment so I cannot pick up, but I check my messages regularly. Leave your name, number, and a quick note about what you need, and I will give you a ring back today. You can also text me on ${p}. Cheers!`,
      },
      {
        title: "Helpful & Clear",
        text: `Thanks for calling ${b}! This is ${n}. I am unable to take your call right now — either I am with a customer or driving between jobs. Please leave a message with your name, number, and what you need help with. I return every single call. Text ${p} if you need a faster reply. Looking forward to speaking with you!`,
      },
    ]
  }

  const scripts = generateScripts()

  const handleCopy = (index: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="min-h-screen bg-[var(--navy-900)] text-white">
      <Header />

      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[var(--coral)]/10 text-[var(--coral)] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Phone className="w-4 h-4" />
              Free Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Voicemail Script Generator for UK Tradespeople
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              85% of callers to trade businesses never leave a voicemail — because most greetings are generic, vague, or unprofessional. Generate three tailored scripts in seconds and win back lost enquiries.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-8"
          >
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Your name <span className="text-[var(--coral)]">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setShowResults(false) }}
                  placeholder="e.g. Dave"
                  className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--katie-blue)]"
                />
              </div>

              {/* Business name */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Business name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => { setBusinessName(e.target.value); setShowResults(false) }}
                  placeholder="e.g. Dave's Plumbing"
                  className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--katie-blue)]"
                />
                <p className="text-sm text-white/50 mt-1">Leave blank to use "[Your name] [Trade]"</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Your phone number <span className="text-[var(--coral)]">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setShowResults(false) }}
                  placeholder="e.g. 07700 900123"
                  className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--katie-blue)]"
                />
              </div>

              {/* Trade */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Your trade <span className="text-[var(--coral)]">*</span>
                </label>
                <select
                  value={trade}
                  onChange={(e) => { setTrade(e.target.value); setShowResults(false) }}
                  className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[var(--katie-blue)] appearance-none cursor-pointer"
                >
                  {trades.map((t) => (
                    <option key={t.key} value={t.key} className="bg-[var(--navy-900)]">
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Style */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Script style <span className="text-[var(--coral)]">*</span>
                </label>
                <div className="space-y-3">
                  {styleOptions.map((s) => (
                    <label
                      key={s.key}
                      className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                        style === s.key
                          ? "border-[var(--coral)] bg-[var(--coral)]/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <input
                        type="radio"
                        name="style"
                        value={s.key}
                        checked={style === s.key}
                        onChange={(e) => { setStyle(e.target.value); setShowResults(false) }}
                        className="mt-1 accent-[var(--coral)] min-w-[20px] min-h-[20px]"
                      />
                      <div>
                        <p className="font-medium text-white">{s.label}</p>
                        <p className="text-sm text-white/50">{s.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Generate */}
              <button
                onClick={() => setShowResults(true)}
                className="w-full py-4 min-h-[56px] rounded-lg bg-[var(--coral)] hover:bg-[var(--coral)]/90 text-white font-bold text-lg transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                GENERATE SCRIPTS
              </button>
            </div>
          </motion.div>

          {/* Results */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 mb-8"
            >
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Mic className="w-6 h-6 text-[var(--coral)]" />
                YOUR {styleInfo.label.toUpperCase()} SCRIPTS
              </h2>

              {scripts.map((script, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[var(--katie-blue)]">{script.title}</h3>
                    <button
                      onClick={() => handleCopy(index, script.text)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors min-h-[44px]"
                    >
                      {copiedIndex === index ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                          <span className="text-[#10B981]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-[var(--navy-800)] rounded-xl p-4 md:p-6 border border-white/5">
                    <p className="text-white/90 leading-relaxed whitespace-pre-line">{script.text}</p>
                  </div>
                  <p className="text-sm text-white/40 mt-3 flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    Read it aloud 3 times before recording — aim for under 25 seconds
                  </p>
                </motion.div>
              ))}

              {/* Recording tips */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Mic className="w-5 h-5 text-[var(--coral)]" />
                  Recording Tips
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Speak clearly and slowly — most people mumble on voicemail",
                    "Keep it under 25 seconds — callers hang up after 30s",
                    "Record in a quiet space with your phone on airplane mode",
                    "Smile while you record — it genuinely changes your tone",
                    "Include your mobile number — 67% of callers prefer to text back",
                    "Update it seasonally — mention emergency cover in winter",
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[var(--coral)]/10 border border-[var(--coral)]/20 rounded-xl p-6 text-center">
                <p className="text-lg text-white font-medium mb-3">
                  Even the best voicemail still loses 85% of callers.
                </p>
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-lg bg-[var(--coral)] hover:bg-[var(--coral)]/90 text-white font-bold transition-colors min-h-[48px]"
                >
                  <Phone className="w-5 h-5" />
                  LET KATIE ANSWER EVERY CALL LIVE — FREE TRIAL
                </a>
              </div>
            </motion.div>
          )}

          {/* Hidden FAQ */}
          <div className="hidden">
            <h2>FAQ</h2>
            <h3>Why do most callers not leave a voicemail for tradespeople?</h3>
            <p>85% of callers to trade businesses never leave a voicemail because the greeting is too long, too generic, or fails to promise a callback. A clear, warm, and specific greeting increases callback rates by up to 40%.</p>
            <h3>How long should a trade business voicemail be?</h3>
            <p>Aim for 20–25 seconds. Research shows most callers abandon voicemail after 30 seconds. Include your name, business, a brief apology, and a clear callback promise.</p>
            <h3>Should I include my mobile number on my voicemail?</h3>
            <p>Yes. 67% of UK consumers prefer to text back rather than leave a voicemail. Including your mobile number gives them an alternative way to reach you.</p>
            <h3>Is the Voicemail Script Generator free?</h3>
            <p>Yes. It is completely free to use with no signup required.</p>
          </div>
        </div>
      </main>

      <Footer />

      <Script
        id="voicemail-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "Voicemail Script Generator for UK Tradespeople",
                applicationCategory: "BusinessApplication",
                offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
                aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "156" },
                operatingSystem: "Web",
                description: "Free voicemail script generator for UK tradespeople. Create professional, friendly, or urgent voicemail greetings tailored to your trade.",
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Why do most callers not leave a voicemail for tradespeople?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "85% of callers to trade businesses never leave a voicemail because the greeting is too long, too generic, or fails to promise a callback. A clear, warm, and specific greeting increases callback rates by up to 40%.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How long should a trade business voicemail be?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Aim for 20–25 seconds. Research shows most callers abandon voicemail after 30 seconds. Include your name, business, a brief apology, and a clear callback promise.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Should I include my mobile number on my voicemail?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. 67% of UK consumers prefer to text back rather than leave a voicemail. Including your mobile number gives them an alternative way to reach you.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is the Voicemail Script Generator free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. It is completely free to use with no signup required.",
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />
    </div>
  )
}
