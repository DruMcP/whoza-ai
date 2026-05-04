"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How much does Whoza cost in total?",
    answer: "You pay a monthly plan fee (Starter £59, Growth £125, Pro £230, Scale £399 — all ex VAT). Each plan includes a set number of call handling minutes and booked enquiries. Additional enquiries beyond your included amount are charged per booking. Overage minutes are billed at £0.22 per minute. There are no hidden setup fees or long-term contracts.",
  },
  {
    question: "Is there a free trial or early access?",
    answer: "Early access is now open for selected UK trades businesses. You can join the early access list and we will onboard you as slots become available. There is no credit card required to sign up for early access.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer: "You can cancel anytime with one click. Your call recordings, customer data, and enquiry history are yours. We can export your data on request, and all stored data is deleted in line with GDPR requirements after cancellation.",
  },
  {
    question: "How quickly can I get set up?",
    answer: "Most tradespeople are fully set up in under 30 minutes. You'll forward your existing business number to your new whoza.ai number, customize your agent's greeting, connect your calendar, and you're live. No technical knowledge required.",
  },
  {
    question: "What happens if Katie can't handle a call?",
    answer: "Katie is trained to recognize when she needs to transfer to a human. For complex queries, emergencies, or if the customer specifically requests you, she'll take a message and notify you immediately via SMS and email. You can call them back within seconds.",
  },
  {
    question: "Does it work with my existing phone number?",
    answer: "Yes. You simply forward your existing business number to your whoza.ai number. Your customers call the same number they always have — they just get answered every time instead of hitting voicemail.",
  },
  {
    question: "What trades do you support?",
    answer: "We support all trades including plumbers, electricians, builders, roofers, painters, landscapers, heating engineers, carpenters, tilers, plasterers, and more. Our agents are trained on trade-specific terminology and common customer queries for each profession.",
  },
  {
    question: "Is my data safe and compliant?",
    answer: "Absolutely. We're fully compliant with all relevant data protection regulations. All call recordings and customer data are encrypted, stored in secure local data centers, and you maintain full control. You can delete any data at any time from your dashboard.",
  },
  {
    question: "What if I want to cancel?",
    answer: "Cancel anytime — no contracts, no cancellation fees, no hassle. We're confident you'll stay because the system pays for itself many times over, but if it's not right for your business, you can cancel with one click from your dashboard.",
  },
  {
    question: "How does early access work?",
    answer: "Join early access to be among the first tradespeople to use Whoza when we launch. Early access members get priority onboarding, exclusive pricing, and direct input into product development. No credit card required to sign up — we'll notify you as soon as your slot is ready.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-white">
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--navy-900)] tracking-tight text-balance">
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
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-[var(--off-white)] rounded-2xl border border-[var(--border)] px-6 data-[state=open]:border-[var(--katie-blue)]/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-[var(--navy-900)] font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[var(--slate-500)] pb-5 leading-relaxed">
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
          className="mt-12 p-8 bg-[var(--off-white)] rounded-3xl border border-[var(--border)] text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[var(--katie-blue)]/10 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-[var(--katie-blue)]" />
          </div>
          <h3 className="text-xl font-bold text-[var(--navy-900)] mb-2">Still have questions?</h3>
          <p className="text-[var(--slate-500)] mb-6">
            Our team is here to help you with early access.
          </p>
          <Button className="bg-[var(--katie-blue)] hover:bg-[var(--katie-blue)]/90 text-white">
            <MessageCircle className="mr-2 w-4 h-4" />
            Chat with Us
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
