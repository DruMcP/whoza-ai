import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

const googleReviews = [
  {
    name: 'Kat Hibbert-Jordan',
    date: '7 Feb 2026',
    rating: 5,
    quote: "I realised recently that my business was not appearing in AI search results at all! I'd asked different AI places for recommendations of things i do, near me. It showed up, more expensive competitors and larger businesses but not me. Whoza.ai helped me fix that. Now I'm showing up in AI search results and getting more enquiries. Really pleased with the service.",
    avatar: '/images/review-kat.jpg',
    initial: 'KH',
    color: '#E53935',
  },
  {
    name: 'Ludmila Lamont',
    date: '7 Feb 2026',
    rating: 5,
    quote: "I'm self employed and I've tried different marketing tools before, like search optimisation tools and etc.. they cost me over 350£/month. Then I tried Whoza.ai is by far the simplest and the cheapest service (I've signed up for Priority plan). It's easy to use and I'm already seeing results. Highly recommend!",
    avatar: '/images/review-ludmila.jpg',
    initial: 'LL',
    color: '#1E88E5',
  },
  {
    name: 'Nicholas Wood',
    date: '7 Feb 2026',
    rating: 5,
    quote: "Tried this company with anticipation but have to say was very impressed with the simplicity and how it helped me - sales followed pretty quickly which I was amazed at",
    avatar: '/images/review-nicholas.jpg',
    initial: 'NW',
    color: '#43A047',
  },
  {
    name: 'Luke Winter',
    date: '6 Feb 2026',
    rating: 5,
    quote: "The future is now. A powerful business tool well executed. This will yield both short and long term benefits.",
    avatar: '/images/review-luke.jpg',
    initial: 'LW',
    color: '#FB8C00',
  },
  {
    name: 'Garth McPherson',
    date: '6 Feb 2026',
    rating: 5,
    quote: "As the owner of a small business I think the concept of Whoza is brilliant and will help businesses of all sizes improve there visibility to acquire more valued customers in the age of AI.",
    avatar: '/images/review-garth.jpg',
    initial: 'GM',
    color: '#8E24AA',
  },
  {
    name: 'Sandy Fyfe',
    date: '7 Feb 2026',
    rating: 5,
    quote: "I am reluctant to try new things but this was recommended to me and seemed worth trying. Really really impressed.",
    avatar: '/images/review-sandy.jpg',
    initial: 'SF',
    color: '#00ACC1',
  },
];

function InitialAvatar({ initial, color, name }) {
  return (
    <div
      className="review-avatar"
      style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 700,
        fontSize: '18px',
        flexShrink: 0,
        textTransform: 'uppercase',
      }}
      aria-label={`${name} avatar`}
    >
      {initial}
    </div>
  );
}

export default function GoogleReviews() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((i) => (i + 1) % googleReviews.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((i) => (i - 1 + googleReviews.length) % googleReviews.length);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(next, 6000);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, prefersReducedMotion, next]);

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.96,
    }),
  };

  const t = googleReviews[current];

  return (
    <section
      ref={sectionRef}
      className="google-reviews-section"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #eef2f7 100%)',
        padding: 'clamp(3rem, 6vw, 5rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Google Reviews"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Decorative background */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,136,229,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#fff',
              padding: '8px 16px',
              borderRadius: '50px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              marginBottom: '1rem',
            }}
          >
            <img
              src="/images/google-g-icon.svg"
              alt="Google"
              style={{ width: '20px', height: '20px' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#5f6368' }}>
              Google Reviews
            </span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
              fontWeight: 800,
              color: '#1a1a2e',
              marginBottom: '0.5rem',
              lineHeight: 1.2,
            }}
          >
            What Our Customers Say
          </h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={18}
                  fill="#F4B400"
                  color="#F4B400"
                  aria-hidden="true"
                />
              ))}
            </div>
            <span style={{ fontWeight: 700, color: '#1a1a2e' }}>5.0 out of 5</span>
            <span style={{ color: '#5f6368' }}>· Based on 15 Google reviews</span>
          </div>
        </div>

        {/* Carousel */}
        <div
          style={{
            position: 'relative',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={prefersReducedMotion ? {} : variants}
              initial={prefersReducedMotion ? {} : 'enter'}
              animate="center"
              exit={prefersReducedMotion ? {} : 'exit'}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', gap: '16px', marginBottom: '1rem' }}>
                <InitialAvatar initial={t.initial} color={t.color} name={t.name} />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          color: '#1a1a2e',
                          margin: 0,
                        }}
                      >
                        {t.name}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.8125rem',
                          color: '#5f6368',
                          margin: '2px 0 0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <MapPin size={12} />
                        {t.date}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(t.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill="#F4B400"
                          color="#F4B400"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <blockquote
                style={{
                  margin: 0,
                  padding: 0,
                  border: 'none',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#3c4043',
                  fontStyle: 'italic',
                }}
              >
                "{t.quote}"
              </blockquote>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              marginTop: '1.5rem',
            }}
          >
            <button
              onClick={prev}
              aria-label="Previous review"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(0,0,0,0.1)',
                background: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a1a2e';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#1a1a2e';
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <div style={{ display: 'flex', gap: '6px' }}>
              {googleReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  aria-label={`Go to review ${i + 1}`}
                  aria-current={i === current ? 'true' : undefined}
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    background: i === current ? '#1a1a2e' : 'rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next review"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(0,0,0,0.1)',
                background: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a1a2e';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#1a1a2e';
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* View all link */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <a
              href="https://maps.app.goo.gl/dNHpTGPy1Kxeh7PV8"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#1a73e8',
                fontWeight: 600,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#174ea6';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#1a73e8';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              <img
                src="/images/google-g-icon.svg"
                alt=""
                style={{ width: '16px', height: '16px' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              View all 15 reviews on Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
