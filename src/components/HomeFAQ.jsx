import { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateFAQPageSchema } from '../utils/schemaOrg';

const faqs = [
  {
    question: "What is AI Visibility and why does my trade business need it?",
    answer: "AI Visibility means how easily AI search engines like ChatGPT, Google AI, and Perplexity can find and recommend your business. When potential customers ask AI for 'a plumber near me' or 'best electrician in Manchester,' you want your business to be the one they name. Without AI Visibility optimisation, you're invisible to the fastest-growing search channel."
  },
  {
    question: "How does Rex work?",
    answer: "Rex is your AI Visibility assistant. After you answer a few questions about your business, Rex analyses your current visibility across all major AI platforms. Each week, Rex sends you one simple, actionable task (takes 10-15 minutes) to improve your Entity Confidence Score. You review and approve every task before completing it."
  },
  {
    question: "How long until I see results?",
    answer: "Most tradespeople see their first AI mentions within 4 weeks. Your competitor position and visibility metrics update monthly, showing measurable progress across all 5 pillars: Clarity, Consensus, Answerability, Safety, and Context. The key is consistency — small weekly tasks compound into significant visibility gains."
  },
  {
    question: "Do I need technical knowledge?",
    answer: "Not at all. Rex designs tasks specifically for non-technical business owners. Tasks are things like 'Add this sentence to your Google Business description' or 'Reply to your latest review with this template.' Each task comes with step-by-step instructions."
  },
  {
    question: "How is whoza.ai different from an SEO agency?",
    answer: "Unlike traditional SEO agencies that charge £500-2000/month and focus on Google rankings, whoza.ai costs from £59/month and focuses specifically on AI search visibility. We don't build backlinks or write blog posts — we optimise the signals that AI engines use to recommend businesses: your Google Business Profile, directory consistency, review strategy, and FAQ content. Plus, you do the tasks yourself, so you stay in complete control."
  },
  {
    question: "What happens to my data?",
    answer: "Your data is secure and GDPR compliant. We're registered with the ICO (registration ZC077271). Rex never has your passwords and can't post anything without your approval. We don't collect customer data or payment details (handled by Stripe). You can delete your account and all data at any time."
  },
  {
    question: "Can I cancel anytime?",
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
