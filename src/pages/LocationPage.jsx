import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './LocationPage.css';
import { locationData } from '../data/locationData';
import { updateSEO } from '../utils/seoConfig';

const LocationPage = () => {
  const navigate = useNavigate();
  const locationPath = useLocation();
  
  // Extract city from URL path (e.g., /ai-visibility-london -> london)
  const city = locationPath.pathname.replace('/ai-visibility-', '');
  const location = locationData[city];

  useEffect(() => {
    if (!location) {
      navigate('/404');
      return;
    }

    // Update SEO meta tags
    updateSEO({
      title: `AI Visibility for Tradespeople in ${location.name} | Whoza.ai`,
      description: `Get your trade business found by ChatGPT, Google AI & Perplexity in ${location.name}. Free AI visibility score + 90-day transformation plan. Trusted by ${location.tradespeople} ${location.name} tradespeople.`,
      keywords: `${location.name} AI visibility, ${location.name} tradespeople, ChatGPT ${location.name}, AI search ${location.name}, digital marketing ${location.name}`,
      url: `https://whoza.ai/ai-visibility-${city}`,
      type: 'website'
    });

    // Add LocalBusiness schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": `Whoza.ai - AI Visibility Services in ${location.name}`,
      "description": `AI visibility and digital marketing services for tradespeople in ${location.name}, ${location.region}`,
      "url": `https://whoza.ai/ai-visibility-${city}`,
      "areaServed": {
        "@type": "City",
        "name": location.name,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": location.name,
          "addressRegion": location.region,
          "addressCountry": "GB"
        }
      },
      "provider": {
        "@type": "Organization",
        "name": "Whoza.ai",
        "url": "https://whoza.ai"
      }
    };

    // Add FAQPage schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": location.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    // Add Breadcrumb schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://whoza.ai"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "AI Visibility",
          "item": "https://whoza.ai/#features"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": location.name,
          "item": `https://whoza.ai/ai-visibility-${city}`
        }
      ]
    };

    // Inject schemas
    const schemaScript1 = document.createElement('script');
    schemaScript1.type = 'application/ld+json';
    schemaScript1.text = JSON.stringify(localBusinessSchema);
    document.head.appendChild(schemaScript1);

    const schemaScript2 = document.createElement('script');
    schemaScript2.type = 'application/ld+json';
    schemaScript2.text = JSON.stringify(faqSchema);
    document.head.appendChild(schemaScript2);

    const schemaScript3 = document.createElement('script');
    schemaScript3.type = 'application/ld+json';
    schemaScript3.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(schemaScript3);

    return () => {
      document.head.removeChild(schemaScript1);
      document.head.removeChild(schemaScript2);
      document.head.removeChild(schemaScript3);
    };
  }, [city, location, navigate]);

  if (!location) {
    return null;
  }

  return (
    <div className="location-page">
      {/* Hero Section */}
      <section className="location-hero">
        <div className="container">
          <nav className="breadcrumbs">
            <Link to="/">Home</Link>
            <span className="separator">›</span>
            <Link to="/#features">AI Visibility</Link>
            <span className="separator">›</span>
            <span className="current">{location.name}</span>
          </nav>
          
          <h1>AI Visibility for Tradespeople in {location.name}</h1>
          <p className="hero-subtitle">
            Get Found by ChatGPT, Google AI & Perplexity in {location.name}
          </p>
          <p className="hero-description">
            Join {location.tradespeople} {location.name} tradespeople who are getting found by AI assistants and winning more local jobs.
          </p>
          
          <div className="hero-cta">
            <Link to="/start" className="btn btn-primary btn-large">
              Check Your AI Visibility Score
              <span className="arrow">→</span>
            </Link>
            <Link to="/blog/uk-trades-business-playbook-ai-search-visibility-2026" className="btn btn-secondary btn-large">
              Download Free Playbook
            </Link>
          </div>

          <div className="trust-signals">
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Free AI visibility score</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>90-day transformation plan</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Zero risk, cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Local Statistics Section */}
      <section className="location-stats">
        <div className="container">
          <h2>The AI Search Revolution in {location.name}</h2>
          <p className="section-intro">
            {location.name} is home to {location.population.toLocaleString()} residents and {location.tradespeople} tradespeople. 
            The way customers find local services is changing fast—and AI is leading the charge.
          </p>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{location.tradespeople}</div>
              <div className="stat-label">Tradespeople in {location.name}</div>
              <div className="stat-description">
                High competition means you need every advantage to stand out
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-number">25%</div>
              <div className="stat-label">Drop in Traditional Search</div>
              <div className="stat-description">
                By 2026, Gartner predicts 25% fewer Google searches as users turn to AI
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-number">41%</div>
              <div className="stat-label">Trust AI Recommendations</div>
              <div className="stat-description">
                Customers trust AI recommendations more than paid ads
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-number">+45</div>
              <div className="stat-label">Average Score Improvement</div>
              <div className="stat-description">
                {location.name} businesses improve their AI visibility score by 45 points in 90 days
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why AI Visibility Matters Section */}
      <section className="location-why">
        <div className="container">
          <h2>Why AI Visibility Matters in {location.name}</h2>
          
          <div className="why-content">
            <div className="why-text">
              <p>
                {location.name} customers are increasingly using AI assistants like ChatGPT, Siri, and Google AI to find local tradespeople. 
                When someone asks "Who's the best plumber near me?" or "Find a reliable electrician in {location.name}", 
                AI assistants recommend businesses based on their online presence, reviews, and entity consistency.
              </p>
              
              <p>
                <strong>The problem?</strong> Most {location.name} tradespeople are invisible to AI. Their business information is inconsistent 
                across platforms, their websites aren't optimized for AI parsing, and they're missing out on a growing source of high-intent leads.
              </p>

              <p>
                <strong>The opportunity:</strong> By optimizing your AI visibility now, you can dominate local recommendations in {location.name} 
                before your competitors catch on. Early movers are seeing 2-3x more enquiries from AI-driven searches.
              </p>
            </div>

            <div className="why-highlights">
              <div className="highlight-card">
                <h3>🎯 Local Competition</h3>
                <p>
                  With {location.tradespeople} tradespeople in {location.name}, standing out is harder than ever. 
                  AI visibility gives you an unfair advantage.
                </p>
              </div>

              <div className="highlight-card">
                <h3>📈 Growing Market</h3>
                <p>
                  {location.name}'s population of {location.population.toLocaleString()} is increasingly tech-savvy. 
                  They're asking AI for recommendations daily.
                </p>
              </div>

              <div className="highlight-card">
                <h3>⚡ First-Mover Advantage</h3>
                <p>
                  Only 15% of {location.name} tradespeople are optimized for AI search. 
                  Get ahead before the market catches up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Whoza.ai Helps Section */}
      <section className="location-how">
        <div className="container">
          <h2>How Whoza.ai Helps {location.name} Tradespeople</h2>
          <p className="section-intro">
            We take {location.name} businesses with low or no AI visibility and elevate their AI presence month by month.
          </p>

          <div className="how-grid">
            <div className="how-step">
              <div className="step-number">1</div>
              <h3>Free AI Visibility Score</h3>
              <p>
                See exactly how visible your {location.name} business is to ChatGPT, Google AI, and Perplexity. 
                Get a detailed breakdown of what's working and what's not.
              </p>
            </div>

            <div className="how-step">
              <div className="step-number">2</div>
              <h3>90-Day Transformation Plan</h3>
              <p>
                Follow our proven week-by-week roadmap to optimize your online presence for AI. 
                From entity consistency to review management, we guide you every step.
              </p>
            </div>

            <div className="how-step">
              <div className="step-number">3</div>
              <h3>Monthly Progress Tracking</h3>
              <p>
                Watch your AI visibility score improve month by month. Track your progress with weekly reports 
                and see exactly how many more {location.name} customers can find you.
              </p>
            </div>

            <div className="how-step">
              <div className="step-number">4</div>
              <h3>Automated Optimization</h3>
              <p>
                Rex, your AI employee, handles the heavy lifting. From updating business listings to monitoring 
                your {location.name} competitors, Rex works 24/7 to keep you ahead.
              </p>
            </div>
          </div>

          <div className="cta-box">
            <h3>Ready to Dominate AI Search in {location.name}?</h3>
            <p>Start with a free AI visibility score. No credit card required.</p>
            <Link to="/start" className="btn btn-primary btn-large">
              Check Your AI Visibility Score
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="location-faq">
        <div className="container">
          <h2>Frequently Asked Questions About AI Visibility in {location.name}</h2>
          
          <div className="faq-list">
            {location.faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="location-final-cta">
        <div className="container">
          <h2>Start Your AI Visibility Journey in {location.name} Today</h2>
          <p>
            Join {location.tradespeople} {location.name} tradespeople who are getting found by AI assistants and winning more local jobs.
          </p>
          
          <div className="final-cta-buttons">
            <Link to="/start" className="btn btn-primary btn-large">
              Check Your Free AI Visibility Score
              <span className="arrow">→</span>
            </Link>
            <Link to="/blog/uk-trades-business-playbook-ai-search-visibility-2026" className="btn btn-secondary btn-large">
              Download the Free Playbook
            </Link>
            <Link to="/pricing" className="btn btn-outline btn-large">
              View Pricing
            </Link>
          </div>

          <div className="final-trust-signals">
            <p>✓ No credit card required  •  ✓ Cancel anytime  •  ✓ 90-day free trial</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPage;
