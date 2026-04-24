import { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateFAQPageSchema } from '../utils/schemaOrg';

// LLM-optimized FAQ content
// Answers kept to 40-80 words for optimal AI citation length
// Questions target high-value queries from Search Console data
const faqs = [
  {
    question: "What is AI search optimization and why does my trade business need it?",
    answer: "AI search optimization (also called AEO or GEO) is the process of making your business discoverable by AI assistants like ChatGPT, Google AI, and Perplexity. When customers ask 'Who's the best plumber near me?' you want AI to name your business. It's the fastest-growing search channel — more people now ask AI for recommendations than use traditional Google search for local services."
  },
  {
    question: "Why isn't my business showing up in ChatGPT recommendations?",
    answer: "ChatGPT and other AI engines recommend businesses based on three factors: entity clarity (consistent name, address, phone across the web), consensus (mentions on trusted sites like Checkatrade, Google Reviews), and answerability (structured FAQ content on your website). If any of these are weak, AI won't trust you enough to recommend you. Our competitor analysis shows exactly which pillar needs fixing first."
  },
  {
    question: "How does Rex, the AI visibility assistant, work?",
    answer: "Rex analyses your business visibility across all major AI platforms, then sends one simple weekly task (takes 10-15 minutes) to improve your Entity Confidence Score. Tasks include optimizing your Google Business Profile, fixing directory inconsistencies, and adding FAQ schema markup. You review and approve every task before completing it."
  },
  {
    question: "How long until I see results from AI search optimization?",
    answer: "Most tradespeople see their first AI mentions within 4 weeks. Your competitor position and visibility metrics update monthly, showing measurable progress across all 5 pillars: Clarity, Consensus, Answerability, Safety, and Context. The key is consistency — small weekly tasks compound into significant visibility gains over 90 days."
  },
  {
    question: "Do I need technical knowledge to improve my AI visibility?",
    answer: "Not at all. Rex designs tasks specifically for non-technical business owners. Tasks are practical actions like 'Add this sentence to your Google Business description' or 'Reply to your latest review with this template.' Each task includes step-by-step instructions that anyone can follow."
  },
  {
    question: "How is AI search optimization different from traditional SEO?",
    answer: "Traditional SEO focuses on ranking high in Google's blue-link results. AI search optimization (AEO/GEO) focuses on becoming the business that ChatGPT and Google AI name directly as the answer. Instead of competing for position #1 on a search page, you're competing to be the single recommended answer when someone asks AI for a local tradesperson."
  },
  {
    question: "How is whoza.ai different from an SEO agency?",
    answer: "Unlike traditional SEO agencies that charge £500-2000/month and focus on backlinks and blog posts, whoza.ai costs from £59/month and focuses specifically on the signals AI engines use to recommend businesses: your Google Business Profile, directory consistency, review strategy, and FAQ content with schema markup. You do the tasks yourself with Rex's guidance, staying in complete control."
  },
  {
    question: "Is my data secure with whoza.ai?",
    answer: "Yes. We're GDPR compliant and registered with the ICO (registration ZC077271). Rex never has your passwords and can't post anything without your approval. We don't collect customer data or payment details (handled securely by Stripe). You can delete your account and all data at any time."
  },
  {
    question: "Can I cancel my whoza.ai subscription anytime?",
    answer: "Yes. There are no contracts and no cancellation fees. You can cancel your subscription at any time from your account dashboard. Your data belongs to you — if you cancel, you can export everything before leaving."
  }
];

// Generate FAQ schema for SEO
export const homeFAQSchema = generateFAQPageSchema(faqs);

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="section scroll-reveal"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      }}
      aria-labelledby="faq-heading"
    >
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2
          id="faq-heading"
          style={{
            textAlign: 'center',
            marginBottom: 'var(--spacing-md)',
            fontSize: 'clamp(28px, 5vw, 40px)',
            color: 'var(--color-text)'
          }}
        >
          Frequently asked questions
        </h2>

        <p
          style={{
            textAlign: 'center',
            fontSize: '18px',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-2xl)',
            maxWidth: '600px',
            margin: '0 auto var(--spacing-2xl)'
          }}
        >
          Everything you need to know about AI visibility and how whoza.ai works
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-sm)',
            marginBottom: 'var(--spacing-2xl)'
          }}
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                border: openIndex === index
                  ? '2px solid var(--color-primary-600)'
                  : '2px solid rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: openIndex === index
                  ? '0 8px 24px rgba(132, 204, 22, 0.15)'
                  : '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-lg)',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--spacing-md)',
                  textAlign: 'left'
                }}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    flex: 1
                  }}
                >
                  {faq.question}
                </span>
                <span
                  style={{
                    fontSize: '24px',
                    fontWeight: 300,
                    color: 'var(--color-primary-600)',
                    flexShrink: 0,
                    transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    lineHeight: 1
                  }}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              <div
                id={`faq-answer-${index}`}
                style={{
                  maxHeight: openIndex === index ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease'
                }}
              >
                <div
                  style={{
                    padding: '0 var(--spacing-lg) var(--spacing-lg)',
                    fontSize: '16px',
                    lineHeight: '1.7',
                    color: 'var(--color-text-secondary)'
                  }}
                >
                  {faq.answer}
                </div>
              </div>

              {/* FAQ schema is injected directly in index.html for crawlers */}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
            Still have questions?
          </p>
          <Link
            to="/contact"
            className="button btn-hover"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)'
            }}
          >
            Contact us
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
