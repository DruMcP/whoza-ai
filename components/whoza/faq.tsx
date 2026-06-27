"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How much does Whoza cost in total?",
    answer: "You pay a monthly plan fee (Starter £59, Growth £125, Pro £230, Scale £399). Each plan includes a set number of call handling minutes and booked enquiries. Additional enquiries beyond your included amount are charged per booking. Overage minutes are billed at £0.26 per minute. There are no hidden setup fees or long-term contracts. You can cancel anytime.",
    category: "Pricing",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes — the 7-day free trial is available on the Starter plan only. Your trial includes 20 minutes of call handling and up to 4 booked enquiries at no charge. No credit card required to start. If Whoza works for your business, you can upgrade to any plan. If not, you can cancel anytime during the trial with no charge.",
    category: "General",
  },
  {
    question: "Is there a contract?",
    answer: "No. whoza.ai has no contracts. You're free to cancel anytime with no penalties. We also offer a 30-day money-back guarantee on all plans.",
    category: "Pricing",
  },
  {
    question: "Does it work with my existing phone number?",
    answer: "Yes. You simply forward your existing business number to your whoza.ai number. Your customers call the same number they always have — they just get answered every time instead of hitting voicemail. Setup takes 30 minutes with your phone provider.",
    category: "Setup",
  },
  {
    question: "Can I search through my past calls?",
    answer: "Yes. Katie writes detailed text notes for every call, which you can search by keyword, job type, location, or date in your dashboard. Type 'boiler' to find all boiler-related calls, or 'Bristol' to find all calls from that area. Call notes are stored for 30 days on Starter, 90 days on Growth, and 1 year on Pro.",
    category: "General",
  },
  {
    question: "Can I choose a different voice for my AI?",
    answer: "Absolutely. We offer 12 different voices with a range of UK accents and tones — from Scottish to Welsh to London. You can preview and change your voice anytime in your dashboard.",
    category: "General",
  },
  {
    question: "What happens if someone leaves a voicemail?",
    answer: "Our AI detects voicemails, transcribes them to text, and sends the message to your WhatsApp within 60 seconds. If the voicemail mentions an emergency, it's flagged as urgent so you see it immediately. No audio is stored — only text transcripts.",
    category: "General",
  },
  {
    question: "What trades do you support?",
    answer: "We support all UK trades including plumbers, electricians, builders, roofers, painters, landscapers, heating engineers, carpenters, tilers, plasterers, locksmiths, drainage specialists, and pest control. Our agents are trained on trade-specific terminology and common customer queries for each profession.",
    category: "Trades",
  },
  {
    question: "What happens to my data if I cancel?",
    answer: "You can cancel anytime with one click. Your call recordings, customer data, and enquiry history are yours. We can export your data on request, and all stored data is deleted in line with GDPR requirements after cancellation.",
    category: "General",
  },
  {
    question: "How quickly can I get set up?",
    answer: "Most tradespeople are fully set up in under 30 minutes. You'll forward your existing business number to your new whoza.ai number, customize your agent's greeting, connect your calendar, and you're live. No technical knowledge required.",
    category: "Setup",
  },
  {
    question: "What happens if Katie can't handle a call?",
    answer: "Katie is trained to recognize when she needs to transfer to a human. For complex queries, emergencies, or if the customer specifically requests you, she'll take a message and notify you immediately via SMS and email. You can call them back within seconds.",
    category: "General",
  },
  {
    question: "Can I export my call data?",
    answer: "Yes, on Growth and above. You can export your call logs as CSV or Excel files, filter by date range, job type, and more. We can also automatically email you a monthly export.",
    category: "General",
  },
  {
    question: "Does whoza work with my other business tools?",
    answer: "Yes. On Growth and above, whoza connects with Zapier and Make, letting you sync enquiries with Google Sheets, Google Calendar, Xero, Mailchimp, and 8,000+ other apps.",
    category: "General",
  },
  {
    question: "What if I want to cancel?",
    answer: "Cancel anytime — no contracts, no cancellation fees, no hassle. We're confident you'll stay because the system pays for itself many times over, but if it's not right for your business, you can cancel with one click from your dashboard.",
    category: "Pricing",
  },
  {
    question: "What does the free trial include?",
    answer: "The 7-day free trial is on the Starter plan only. It includes: 20 minutes of AI call handling, up to 4 booked enquiries, full access to the WhatsApp delivery system, and the complete dashboard. This gives you enough time to see real results from actual customer calls. Fair usage applies — the trial is designed for genuine business evaluation, not extended free service.",
    category: "General",
  },
]

export function FAQ() {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined)
  const [activeCategory, setActiveCategory] = useState("All")
  
  const categories = ["All", "General", "Pricing", "Setup", "Trades"]
  
  const filteredFaqs = activeCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory)

  // Sync .open class with Radix state for prompt compatibility
  useEffect(() => {
    document.querySelectorAll('.faq-item').forEach((el) => {
      const item = el as HTMLElement
      const isOpen = item.getAttribute('data-state') === 'open'
      item.classList.toggle('open', isOpen)
    })
  }, [openItem])

  return (
    <section id="faq" className="section-padding-lg bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--katie-blue)]/10 text-[var(--katie-blue)] text-sm font-medium mb-4">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance reveal">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-lg text-[var(--slate-500)]">
            Everything you need to know about whoza.ai
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setOpenItem(undefined)
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[var(--katie-blue)] text-white shadow-md'
                    : 'bg-[var(--off-white)] text-[var(--slate-500)] hover:bg-[var(--slate-100)]'
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className={`ml-1.5 text-xs ${activeCategory === cat ? 'text-white/70' : 'text-[var(--slate-400)]'}`}>
                    {faqs.filter(f => f.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <Accordion 
            type="single" 
            collapsible 
            className="space-y-4 reveal-stagger"
            value={openItem}
            onValueChange={(val) => {
              setOpenItem(val)
              // Also sync .open class immediately
              setTimeout(() => {
                document.querySelectorAll('.faq-item').forEach((el) => {
                  const item = el as HTMLElement
                  const isOpen = item.getAttribute('data-state') === 'open'
                  item.classList.toggle('open', isOpen)
                })
              }, 0)
            }}
          >
            {filteredFaqs.map((faq, index) => (
              <AccordionItem 
                key={`${activeCategory}-${index}`}
                value={`item-${activeCategory}-${index}`}
                className="faq-item bg-[var(--off-white)] rounded-xl border border-[var(--border)] px-6 data-[state=open]:border-[var(--katie-blue)]/30 transition-all duration-300 hover:bg-[var(--rex-green)]/4"
              >
                <AccordionTrigger className="faq-toggle text-left text-[var(--navy-900)] font-semibold hover:no-underline py-5">
                  {faq.question}
                  {/* Chevron icon for prompt compatibility */}
                  <svg 
                    className="faq-chevron w-5 h-5 text-[var(--slate-400)] shrink-0 ml-2" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </AccordionTrigger>
                <AccordionContent className="faq-answer text-[var(--slate-500)] pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 bg-[var(--off-white)] rounded-xl border border-[var(--border)] text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[var(--katie-blue)]/10 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-[var(--katie-blue)]" />
          </div>
          <h3 className="text-xl font-bold text-[var(--navy-900)] mb-2">Still have questions?</h3>
          <p className="text-[var(--slate-500)] mb-6">
            Our team is here to help you get started with your free trial.
          </p>
          <a 
            href="https://wa.me/447463141750"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[var(--katie-blue)] hover:bg-[var(--katie-blue)]/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <MessageCircle className="mr-2 w-4 h-4" />
            Chat with Us
          </a>
        </motion.div>

      </div>
    </section>
  )
}