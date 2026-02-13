import { Link } from 'react-router-dom';
import Icon from './icons/Icon';

const LocationsWeServe = () => {
  const ukLocations = [
    { name: 'London', slug: 'london' },
    { name: 'Birmingham', slug: 'birmingham' },
    { name: 'Manchester', slug: 'manchester' },
    { name: 'Leeds', slug: 'leeds' },
    { name: 'Glasgow', slug: 'glasgow' },
    { name: 'Liverpool', slug: 'liverpool' },
    { name: 'Newcastle', slug: 'newcastle' },
    { name: 'Sheffield', slug: 'sheffield' },
    { name: 'Bristol', slug: 'bristol' },
    { name: 'Edinburgh', slug: 'edinburgh' },
    { name: 'Leicester', slug: 'leicester' },
    { name: 'Nottingham', slug: 'nottingham' },
    { name: 'Cardiff', slug: 'cardiff' },
    { name: 'Coventry', slug: 'coventry' },
    { name: 'Southampton', slug: 'southampton' }
  ];

  const usLocations = [
    { name: 'New York', slug: 'new-york' },
    { name: 'Los Angeles', slug: 'los-angeles' },
    { name: 'Chicago', slug: 'chicago' },
    { name: 'Houston', slug: 'houston' },
    { name: 'Phoenix', slug: 'phoenix' },
    { name: 'Philadelphia', slug: 'philadelphia' },
    { name: 'San Antonio', slug: 'san-antonio' },
    { name: 'San Diego', slug: 'san-diego' },
    { name: 'Dallas', slug: 'dallas' },
    { name: 'San Jose', slug: 'san-jose' },
    { name: 'Austin', slug: 'austin' },
    { name: 'Jacksonville', slug: 'jacksonville' },
    { name: 'Fort Worth', slug: 'fort-worth' },
    { name: 'Columbus', slug: 'columbus' },
    { name: 'Charlotte', slug: 'charlotte' }
  ];

  return (
    <section className="locations-section" style={{
      padding: '4rem 1.5rem',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      color: '#fff'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: '700',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #00f5a0 0%, #00d9f5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            <Icon name="map-pin" size={32} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Locations We Serve
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Helping tradespeople improve their AI visibility in major cities across the UK and US
          </p>
        </div>

        {/* UK Locations */}
        <div className="location-group" style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            color: '#00f5a0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              display: 'inline-block',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(0, 245, 160, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>🇬🇧</span>
            United Kingdom
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {ukLocations.map((location) => (
              <Link
                key={location.slug}
                to={`/uk/ai-visibility/${location.slug}`}
                style={{
                  padding: '1rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 245, 160, 0.2)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: '#fff',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 245, 160, 0.1)';
                  e.currentTarget.style.borderColor = '#00f5a0';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 245, 160, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Icon name="map-pin" size={16} style={{ color: '#00f5a0' }} />
                {location.name}
              </Link>
            ))}
          </div>
        </div>

        {/* US Locations */}
        <div className="location-group">
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            color: '#00d9f5',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              display: 'inline-block',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(0, 217, 245, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>🇺🇸</span>
            United States
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {usLocations.map((location) => (
              <Link
                key={location.slug}
                to={`/us/ai-visibility/${location.slug}`}
                style={{
                  padding: '1rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 217, 245, 0.2)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: '#fff',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 217, 245, 0.1)';
                  e.currentTarget.style.borderColor = '#00d9f5';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 217, 245, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Icon name="map-pin" size={16} style={{ color: '#00d9f5' }} />
                {location.name}
              </Link>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: '3rem',
          textAlign: 'center',
          padding: '2rem',
          background: 'rgba(0, 245, 160, 0.05)',
          borderRadius: '16px',
          border: '1px solid rgba(0, 245, 160, 0.1)'
        }}>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '1rem'
          }}>
            Don't see your city? We're expanding to more locations soon.
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              background: 'linear-gradient(135deg, #00f5a0 0%, #00d9f5 100%)',
              color: '#1a1a2e',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Request Your City
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LocationsWeServe;
