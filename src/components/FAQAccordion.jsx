import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How does the outcome pricing work?',
    answer: "You pay a base monthly fee that includes a set number of AI-booked jobs. After that, it's £3 (or £2.50/£2) per additional job. You only pay more when Katie books more jobs for you.",
  },
  {
    question: 'What counts as an AI-booked job?',
    answer: "A confirmed appointment that Katie enters into your calendar, where the customer doesn't cancel within 24 hours. If they cancel, you don't pay.",
  },
  {
    question: "What if I don't use all my included jobs?",
    answer: "Included jobs don't roll over month to month — use them or lose them. But most tradespeople find Katie books more than their included amount within the first few weeks.",
  },
  {
    question: 'Is there a limit to how many jobs Katie can book?',
    answer: "No limit. Katie works 24/7. Heavy users on the Scale plan pay £2 per extra job — the more you grow, the less you pay per booking.",
  },
  {
    question: 'Can I switch plans if my usage changes?',
    answer: 'Yes, upgrade or downgrade anytime. Your new included job count starts on your next billing cycle.',
  },
  {
    question: 'Is this software or a service?',
    answer: "It's like hiring an AI employee. You pay a base monthly wage plus a small fee when Katie delivers results. We handle training, tools, and 24/7 availability. No sick days, no holidays, no recruitment fees.",
  },
  {
    question: 'What is an AI visibility score?',
    answer: 'It measures how likely AI tools like ChatGPT, Google AI, and Perplexity are to recommend your business when someone asks for a tradesperson in your area. We check your presence across directories, reviews, website signals, and local citations.',
  },
  {
    question: 'How does the 14-day free trial work?',
    answer: 'You get full access to your chosen plan — including your full included job count. No credit card required. After 14 days, choose a plan or cancel. No charges, no hassle.',
  },
  {
    question: 'Do I need technical skills to improve my score?',
    answer: 'Not at all. We break every recommendation into simple, step-by-step tasks you can complete in 10–15 minutes. Most are things like updating your Google Business Profile or adding a sentence to your website.',
  },
  {
    question: "What's included in the Capture £59/month plan?",
    answer: 'Up to 15 missed calls captured per month — never lose a lead to voicemail again. Includes AI voice agent (100 min), WhatsApp call summaries, basic call capture & qualification, review monitoring, 2 directory listings, and email support. No hidden costs. Scale up anytime. Note: lead capture only — no booking automation. Upgrade to Convert to get AI booking.',
  },
  {
    question: 'How quickly will whoza.ai pay for itself?',
    answer: 'Most tradespeople recover the full subscription cost within the first 3–7 days through captured leads alone. A single missed call can cost £180–400 in lost revenue. whoza.ai captures every call, books jobs while you work, and collects reviews automatically — turning missed calls into revenue from day one.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: "Yes. No contracts, no setup fees, no cancellation charges. You also get a 30-day money-back guarantee if you're not happy.",
  },
  {
    question: 'How does call diverting work with whoza.ai?',
    answer: "It's simple: you set up call diversion on your existing phone (usually a code like *61*). When you can't answer, the call goes to Katie instead of voicemail. Katie handles the conversation, books the appointment, and sends you a WhatsApp summary with the customer's details and what was discussed.",
  },
  {
    question: 'What accent does Katie use?',
    answer: "Katie speaks with a natural, friendly British accent — not robotic or American. We specifically tuned the voice model for UK tradespeople so callers feel like they're talking to a local receptionist, not a generic AI. You can also choose Mark (male voice) if you prefer.",
  },
  {
    question: 'Can I customize what Katie says?',
    answer: 'Yes. You provide your business details, services, pricing, and any specific questions Katie should ask. We build a custom call script for your trade. You can update it anytime through your dashboard. Most tradespeople set it up in under 10 minutes.',
  },
  {
    question: 'What happens if someone calls with an emergency?',
    answer: "Katie is trained to recognise emergency keywords (gas leak, flooding, no heating in winter, etc.) and can immediately transfer the call to your mobile, or take details and alert you via WhatsApp within seconds. You set the emergency rules — Katie follows them exactly.",
  },
  {
    question: 'Does it work with my existing phone number?',
    answer: "Absolutely. You keep your current business number. whoza.ai uses call diversion (the same feature phone companies have offered for decades) to send unanswered calls to Katie. No new number needed, no porting, no hassle. Most networks set it up with a simple code.",
  },
  {
    question: 'What if I get slammed with multiple calls at once?',
    answer: "Katie can handle unlimited simultaneous calls. Whether it's 2 calls or 20, every caller gets answered immediately. There's no queue, no hold music, no 'all operators are busy.' Each caller thinks they have your full attention.",
  },
  {
    question: 'How accurate is the appointment booking?',
    answer: "Katie checks your live calendar (Google Calendar, Outlook, or Apple Calendar) and only offers slots that are actually free. She confirms the date, time, and service with the caller, then adds it to your calendar with all the details. You get an instant notification. Accuracy is over 98%.",
  },
  {
    question: 'Can my team access the same dashboard?',
    answer: "Yes. You can add team members to your whoza.ai account with different permission levels. Your office manager might handle review responses, while you focus on the voice agent settings. Grow and Scale plans include unlimited team members.",
  },
  {
    question: 'What trade management software does whoza.ai integrate with?',
    answer: "We integrate with Google Calendar, Outlook, Apple Calendar, WhatsApp, Facebook, Instagram, and Google Business Profile. We're adding ServiceM8 and other trade-specific tools. If you use something we don't yet support, let us know — we prioritise based on customer demand.",
  },
  {
    question: 'How is whoza.ai different from TradeReceptionist or a call answering service?',
    answer: "TradeReceptionist only answers calls. A human answering service charges £100-300/month and can't scale. whoza.ai gives you three tools in one: Katie answers calls 24/7, Rex tracks your AI visibility and competitors, and Claire collects reviews. It's like hiring a receptionist, a marketing analyst, and a reputation manager — for less than the cost of one part-time employee.",
  },
];

export default function FAQAccordion({ items = faqs, title = 'Frequently asked questions' }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="ds-section" style={{ background: 'var(--off-white)' }}>
      <div className="ds-container" style={{ maxWidth: '800px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="ds-heading-2 mb-4">{title}</h2>
        </motion.div>

        <div className="space-y-3">
          {items.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border overflow-hidden"
              style={{
                background: 'var(--white)',
                borderColor: openIndex === i ? 'var(--katie-blue)' : 'var(--slate-200)',
                boxShadow: openIndex === i ? '0 0 0 3px var(--katie-blue-glow)' : 'var(--shadow-sm)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span
                  className="font-semibold pr-4"
                  style={{
                    color: openIndex === i ? 'var(--katie-blue)' : 'var(--navy-900)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-body)',
                    transition: 'color 0.2s',
                  }}
                >
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0"
                >
                  <ChevronDown size={20} style={{ color: 'var(--slate-500)' }} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div
                      className="px-5 pb-5 text-sm leading-relaxed"
                      style={{ color: 'var(--slate-500)', fontFamily: 'var(--font-body)' }}
                    >
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
