import { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';

// Real Google Reviews from verified customers
const reviews = [
  {
    id: 1,
    name: 'Kat Hibbert-Jordan',
    date: '7 Feb 2026',
    quote: "I realised recently that my business was not appearing in AI search results at all! I'd asked different AI places for recommendations of things i do, near me. It showed up, more expensive competitors and larger businesses but not me. Whoza.ai helped me fix that. Now I'm showing up in AI search results and getting more enquiries. Really pleased with the service.",
    rating: 5
  },
  {
    id: 2,
    name: 'Ludmila Lamont',
    date: '7 Feb 2026',
    quote: "I'm self employed and I've tried different marketing tools before, like search optimisation tools and etc.. they cost me over 350£/month. Then I tried Whoza.ai is by far the simplest and the cheapest service (I've signed up for Priority plan). It's easy to use and I'm already seeing results. Highly recommend!",
    rating: 5
  },
  {
    id: 3,
    name: 'Nicholas Wood',
    date: '7 Feb 2026',
    quote: "Tried this company with anticipation but have to say was very impressed with the simplicity and how it helped me - sales followed pretty quickly which I was amazed at",
    rating: 5
  },
  {
    id: 4,
    name: 'Luke Winter',
    date: '6 Feb 2026',
    quote: "The future is now. A powerful business tool well executed. This will yield both short and long term benefits.",
    rating: 5
  },
  {
    id: 5,
    name: 'Garth McPherson',
    date: '6 Feb 2026',
    quote: "As the owner of a small business I think the concept of Whoza is brilliant and will help businesses of all sizes improve there visibility to acquire more valued customers in the age of AI.",
    rating: 5
  },
  {
    id: 6,
    name: 'Sandy Fyfe',
    date: '7 Feb 2026',
    quote: "I am reluctant to try new things but this was recommended to me and seemed worth trying. Really really impressed.",
    rating: 5
  }
];

const GoogleReviewsCarousel = memo(function GoogleReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 7000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const review = reviews[currentIndex];

  return (
    <section 
      className="section scroll-reveal"
      style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
      }}
    >
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            marginBottom: 'var(--spacing-md)'
          }}>
            {/* Google stars */}
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="#FBBF24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span style={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--color-text)'
            }}>
              5.0 out of 5
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 'bold',
            color: 'var(--color-text)',
            marginBottom: 'var(--spacing-sm)'
          }}>
            What our customers say
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'var(--color-text-secondary)'
          }}>
            Based on <strong>15 reviews</strong> on Google
          </p>
        </div>

        {/* Review Card */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-xl)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          marginBottom: 'var(--spacing-lg)',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {/* Quote */}
          <blockquote style={{
            fontSize: '17px',
            lineHeight: '1.7',
            color: 'var(--color-text)',
            margin: 0,
            marginBottom: 'var(--spacing-md)',
            fontStyle: 'italic',
            transition: 'opacity 0.3s ease',
            opacity: isAnimating ? 0.3 : 1
          }}>
            "{review.quote}"
          </blockquote>

          {/* Author */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'opacity 0.3s ease',
            opacity: isAnimating ? 0.3 : 1
          }}>
            <div>
              <p style={{
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: 0,
                fontSize: '15px'
              }}>
                {review.name}
              </p>
              <p style={{
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                margin: 0
              }}>
                {review.date}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrev}
            aria-label="Previous review"
            style={{
              position: 'absolute',
              left: '-16px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'white',
              border: '1px solid rgba(0,0,0,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              zIndex: 2
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            aria-label="Next review"
            style={{
              position: 'absolute',
              right: '-16px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'white',
              border: '1px solid rgba(0,0,0,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              zIndex: 2
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          marginBottom: 'var(--spacing-md)'
        }}>
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isAnimating || index === currentIndex) return;
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 500);
              }}
              aria-label={`Go to review ${index + 1}`}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                background: index === currentIndex ? 'var(--color-primary-600)' : '#D1D5DB',
                transition: 'background 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/trust"
            style={{
              fontSize: '14px',
              color: 'var(--color-primary-700)',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            View all 15 reviews on Google →
          </Link>
        </div>
      </div>
    </section>
  );
});

export default GoogleReviewsCarousel;
