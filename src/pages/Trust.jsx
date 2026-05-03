import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { generateOrganizationSchema, generateBreadcrumbSchema, getBaseUrl } from '../utils/schemaOrg';

export default function Trust() {
  const [proofSnippets, setProofSnippets] = useState([]);

  useEffect(() => {
    loadProofSnippets();
  }, []);

  const loadProofSnippets = async () => {
    try {
      const { data, error } = await supabase
        .from('proof_snippets')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.warn('Supabase proof_snippets fetch failed:', error);
      } else {
        setProofSnippets(data || []);
      }
    } catch (err) {
      console.warn('Failed to load proof snippets:', err);
    }
  };

  // Google Reviews Data (from Google Business Profile)
  const googleReviews = [
    {
      author: "Kat Hibbert-Jordan",
      rating: 5,
      date: "2026-02-07",
      text: "I realised recently that my business was not appearing in AI search results at all! I'd asked different AI places for recommendations of things i do, near me. It showed up, more expensive competitors and larger businesses but not me. Whoza.ai helped me fix that. Now I'm showing up in AI search results and getting more enquiries. Really pleased with the service."
    },
    {
      author: "Ludmila Lamont",
      rating: 5,
      date: "2026-02-07",
      text: "I'm self employed and I've tried different marketing tools before, like search optimisation tools and etc.. they cost me over 350£/month. Then I tried Whoza.ai is by far the simplest and the cheapest service (I've signed up for Priority plan). It's easy to use and I'm already seeing results. Highly recommend!"
    },
    {
      author: "Nicholas Wood",
      rating: 5,
      date: "2026-02-07",
      text: "Tried this company with anticipation but have to say was very impressed with the simplicity and how it helped me - sales followed pretty quickly which I was amazed at"
    },
    {
      author: "Luke Winter",
      rating: 5,
      date: "2026-02-06",
      text: "The future is now. A powerful business tool well executed. This will yield both short and long term benefits."
    },
    {
      author: "Garth McPherson",
      rating: 5,
      date: "2026-02-06",
      text: "As the owner of a small business I think the concept of Whoza is brilliant and will help businesses of all sizes improve there visibility to acquire more valued customers in the age of AI."
    },
    {
      author: "Sandy Fyfe",
      rating: 5,
      date: "2026-02-07",
      text: "I am reluctant to try new things but this was recommended to me and seemed worth trying. Really really impressed."
    }
  ];

  const averageRating = 5.0;
  const totalReviews = 15;

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WHOZA AI LTD",
    "url": `${getBaseUrl()}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": totalReviews.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": googleReviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.date,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.text
    }))
  };

  const schemas = [
    generateBreadcrumbSchema([
      { name: 'Home', url: `${getBaseUrl()}/` },
      { name: 'Trust & Security', url: `${getBaseUrl()}/trust/` }
    ]),
    reviewSchema
  ];

  return (
    <>
      <SEO
        title="Trust & Security — Whoza.ai"
        description="Learn about Whoza.ai's security practices, data protection, GDPR compliance, and how we keep your business information safe."
        schemas={schemas}
      />
      <Header />

      <main id="main-content" role="main">
        <div className="container">
          <div className="trust-header">
            <h1>Trust & Security</h1>
            <p className="subtitle">
              Your business data is safe with us. Here's how we protect your information and maintain transparency.
            </p>
          </div>

          <div className="trust-grid">
            <div className="trust-card">
              <div className="trust-icon">🔒</div>
              <h3>GDPR Compliant</h3>
              <p>We adhere to all UK and EU data protection regulations. Your data is processed lawfully, fairly, and transparently.</p>
            </div>

            <div className="trust-card">
              <div className="trust-icon">🛡️</div>
              <h3>Data Encryption</h3>
              <p>All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We use industry-standard security practices.</p>
            </div>

            <div className="trust-card">
              <div className="trust-icon">📍</div>
              <h3>UK-Based Infrastructure</h3>
              <p>Our servers are hosted in the UK and EU, ensuring your data stays within appropriate jurisdictions.</p>
            </div>

            <div className="trust-card">
              <div className="trust-icon">✅</div>
              <h3>Transparent Practices</h3>
              <p>Clear privacy policy, terms of service, and cookie policy. No hidden data selling or dark patterns.</p>
            </div>
          </div>

          <div className="reviews-section">
            <h2>What Our Customers Say</h2>
            <div className="reviews-grid">
              {googleReviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <div className="review-rating">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <p className="review-text">{review.text}</p>
                  <div className="review-author">— {review.author}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="trust-cta">
            <h2>Have questions about security?</h2>
            <p>We're happy to discuss our security practices in detail.</p>
            <Link to="/contact" className="button button-large">
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}