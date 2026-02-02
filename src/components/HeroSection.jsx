import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section style={{
        backgroundColor: '#0f172a',
        minHeight: '80vh',
        padding: '80px 20px 40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="hero-flex-container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px'
        }}>
        {/* LEFT COLUMN - Text Content */}
        <div className="hero-text-container" style={{ flex: '1 1 500px', minWidth: '300px', maxWidth: '600px' }}>
          <h1 style={{
            color: '#ffffff',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 'bold',
            lineHeight: '1.2',
            marginBottom: '20px'
          }}>
            Get Found in AI Search: The <span style={{ color: '#84CC16' }}>AI Employee</span> for UK Tradespeople
          </h1>

          <p style={{
            color: '#ffffff',
            fontSize: '1.2rem',
            lineHeight: '1.6',
            marginBottom: '30px'
          }}>
            Most tradespeople are invisible to AI search. We fix that. Get found when ChatGPT, Google AI, and Perplexity recommend local services.
          </p>

          <p style={{
            color: '#D1D5DB',
            fontSize: '1.05rem',
            marginBottom: '40px'
          }}>
            For plumbers, electricians, roofers, builders, heating engineers and 50+ other trades across the UK
          </p>

          {/* 3-STEP MENTAL MODEL */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '40px'
          }}>
            {/* STEP 1: MEASURE */}
            <div style={{
              background: 'rgba(132, 204, 22, 0.05)',
              border: '2px solid rgba(132, 204, 22, 0.2)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 12px',
                background: 'rgba(132, 204, 22, 0.15)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#84CC16',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                1
              </div>
              <h3 style={{
                color: '#84CC16',
                fontSize: '0.95rem',
                fontWeight: 'bold',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Measure
              </h3>
              <p style={{
                color: '#D1D5DB',
                fontSize: '0.9rem',
                lineHeight: '1.4',
                margin: 0
              }}>
                Get your free AI Visibility Score in 60 seconds
              </p>
            </div>

            {/* STEP 2: FIX */}
            <div style={{
              background: 'rgba(132, 204, 22, 0.05)',
              border: '2px solid rgba(132, 204, 22, 0.2)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 12px',
                background: 'rgba(132, 204, 22, 0.15)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#84CC16',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                2
              </div>
              <h3 style={{
                color: '#84CC16',
                fontSize: '0.95rem',
                fontWeight: 'bold',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Fix
              </h3>
              <p style={{
                color: '#D1D5DB',
                fontSize: '0.9rem',
                lineHeight: '1.4',
                margin: 0
              }}>
                Follow your personalised action plan
              </p>
            </div>

            {/* STEP 3: TRACK */}
            <div style={{
              background: 'rgba(132, 204, 22, 0.05)',
              border: '2px solid rgba(132, 204, 22, 0.2)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 12px',
                background: 'rgba(132, 204, 22, 0.15)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#84CC16',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                3
              </div>
              <h3 style={{
                color: '#84CC16',
                fontSize: '0.95rem',
                fontWeight: 'bold',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Track
              </h3>
              <p style={{
                color: '#D1D5DB',
                fontSize: '0.9rem',
                lineHeight: '1.4',
                margin: 0
              }}>
                Watch your AI visibility grow monthly
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Link
              to="/free-score"
              style={{
                display: 'inline-block',
                backgroundColor: '#84CC16',
                color: '#0f172a',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                padding: '16px 32px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
            >
              Get your free AI readiness score
            </Link>
            <p style={{
              fontSize: '0.9rem',
              color: '#9CA3AF',
              marginTop: '10px',
              marginBottom: '8px'
            }}>
              Takes 60 seconds. No dashboards, no jargon.
            </p>
            <p style={{
              fontSize: '0.85rem',
              color: '#9CA3AF',
              marginTop: '0'
            }}>
              £19/month pays for itself with just ONE extra job
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Link
              to="/how-it-works"
              style={{
                fontSize: '1rem',
                color: '#9EF01A',
                textDecoration: 'underline'
              }}
            >
              See How It Works →
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN - Rex Image */}
        <div
          className="hero-image-container"
          style={{
            flex: '0 1 350px',
            minWidth: '280px',
            maxWidth: '450px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '40px'
          }}
        >
          <img
            src="/hero_image.png?v=20260113"
            alt="Rex AI Employee helping tradespeople get more local jobs through AI search visibility"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            crossOrigin="anonymous"
            onError={(e) => {
              console.error('Hero image failed to load:', e.target.src);
              e.target.style.border = '2px solid red';
            }}
            onLoad={(e) => {
            }}
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
              display: 'block',
              filter: 'drop-shadow(0 10px 30px rgba(158, 240, 26, 0.3))',
              objectFit: 'contain',
              opacity: '1',
              visibility: 'visible'
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
