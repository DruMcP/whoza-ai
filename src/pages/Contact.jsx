import { memo, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { generateBreadcrumbSchema, generateFAQPageSchema, generateOrganizationSchema } from '../utils/schemaOrg';

const Contact = memo(function Contact() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' }
  ]);

  const faqSchema = generateFAQPageSchema([
    {
      question: 'What is your response time?',
      answer: 'We typically respond to all support emails within 24 hours during business days.'
    },
    {
      question: 'What should I include in my support email?',
      answer: 'Please include your business name, account email, and a detailed description of your question or issue.'
    },
    {
      question: 'Can I schedule a call or demo?',
      answer: 'Yes! Email us at support@whoza.ai with "Demo Request" in the subject line to arrange a time.'
    }
  ]);

  const orgSchema = generateOrganizationSchema();

  const schemas = [breadcrumbSchema, faqSchema, orgSchema];

  return (
    <>
      <SEO
        title="Contact Us - Get in Touch with Whoza.ai"
        description="Have questions about AI-powered visibility for tradespeople? Contact Whoza.ai for support, inquiries, or to learn more about our service."
        canonical="/contact"
        schemas={schemas}
      />
      <div className="page">
        <Header />
        <main className="main-content" id="main-content">
          <section style={{
            padding: '80px 20px 60px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '60px'
            }}>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 'bold',
                color: 'var(--color-text-primary)',
                marginBottom: '20px',
                lineHeight: '1.2'
              }}>
                Get in Touch
              </h1>
              <p style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                color: 'var(--color-text-secondary)',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Have questions about how Whoza.ai can help your trade business? We're here to help.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {/* Email Contact Card */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.1) 0%, rgba(132, 204, 22, 0.05) 100%)',
                border: '2px solid rgba(132, 204, 22, 0.3)',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(132, 204, 22, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--color-primary-500)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-dark-900)' }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <h2 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: 'var(--color-text-primary)',
                  marginBottom: '16px'
                }}>
                  Email Support
                </h2>
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '24px',
                  lineHeight: '1.6'
                }}>
                  Send us an email for support, questions, or general inquiries. We typically respond within 24 hours.
                </p>
                <a
                  href="mailto:support@whoza.ai"
                  style={{
                    display: 'inline-block',
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: 'var(--color-primary-500)',
                    textDecoration: 'none',
                    padding: '16px 32px',
                    background: 'rgba(132, 204, 22, 0.1)',
                    borderRadius: '12px',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--color-primary-500)';
                    e.target.style.color = 'var(--color-dark-900)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(132, 204, 22, 0.1)';
                    e.target.style.color = 'var(--color-primary-500)';
                  }}
                >
                  support@whoza.ai
                </a>
              </div>

              {/* Company Info Card */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
                border: '2px solid rgba(37, 99, 235, 0.3)',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(37, 99, 235, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: '#2563eb',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'white' }}>
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 12-2h11"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <h2 style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: 'var(--color-text-primary)',
                  marginBottom: '16px'
                }}>
                  Company Details
                </h2>
                <div style={{
                  fontSize: '1rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.8',
                  textAlign: 'left'
                }}>
                  <p style={{ marginBottom: '12px' }}>
                    <strong style={{ color: 'var(--color-text-primary)' }}>WHOZA AI LTD</strong>
                  </p>
                  <p style={{ marginBottom: '8px' }}>
                    Registered in Scotland
                  </p>
                  <p style={{ marginBottom: '8px' }}>
                    Company Number: SC874716
                  </p>
                  <p style={{ marginBottom: '16px' }}>
                    6 Atholl Crescent, 6, Perth, PH1 5JN, United Kingdom
                  </p>
                  <p style={{
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(37, 99, 235, 0.2)',
                    fontStyle: 'italic'
                  }}>
                    Building tools to help UK tradespeople thrive in the AI age.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div style={{
              marginTop: '80px',
              maxWidth: '800px',
              margin: '80px auto 0'
            }}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'var(--color-text-primary)',
                textAlign: 'center',
                marginBottom: '40px'
              }}>
                Frequently Asked Questions
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '28px'
                }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: 'var(--color-text-primary)',
                    marginBottom: '12px'
                  }}>
                    What is your response time?
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.6'
                  }}>
                    We typically respond to all support emails within 24 hours during business days. For urgent matters, please mention "URGENT" in your email subject line.
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '28px'
                }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: 'var(--color-text-primary)',
                    marginBottom: '12px'
                  }}>
                    What should I include in my support email?
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.6'
                  }}>
                    To help us assist you quickly, please include: your business name, account email, a detailed description of your question or issue, and any relevant screenshots if applicable.
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '28px'
                }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: 'var(--color-text-primary)',
                    marginBottom: '12px'
                  }}>
                    Can I schedule a call or demo?
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.6'
                  }}>
                    Yes! Email us at support@whoza.ai with "Demo Request" in the subject line, and we'll arrange a convenient time to show you how Whoza.ai can help your business.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
});

export default Contact;
