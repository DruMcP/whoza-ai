import { memo } from 'react';
import { Link } from 'react-router-dom';

const Footer = memo(function Footer() {
  return (
    <footer className="footer" role="contentinfo" style={{
      backgroundColor: '#0a0f1a',
      borderTop: '1px solid rgba(132, 204, 22, 0.2)',
      padding: '60px 20px 40px'
    }}>
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* About Whoza Section */}
          <div>
            <h3 style={{
              color: '#84CC16',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginBottom: '16px'
            }}>
              About Whoza
            </h3>
            <div style={{
              color: '#94a3b8',
              fontSize: '0.95rem',
              lineHeight: '1.6'
            }}>
              <p style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#ffffff' }}>WHOZA AI LTD</strong>
              </p>
              <p style={{ marginBottom: '8px' }}>
                Registered in Scotland
              </p>
              <p style={{ marginBottom: '8px' }}>
                Company Number: SC874716
              </p>
              <p style={{ marginBottom: '8px' }}>
                ICO Registration: ZC077271
              </p>
              <p style={{ marginBottom: '16px' }}>
                6 Atholl Crescent, 6, Perth, PH1 5JN, United Kingdom
              </p>
              <p style={{
                fontStyle: 'italic',
                marginBottom: '16px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(132, 204, 22, 0.2)'
              }}>
                Built by a team passionate about helping tradespeople compete in the AI age.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 style={{
              color: '#84CC16',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginBottom: '16px'
            }}>
              Contact Us
            </h3>
            <div style={{
              color: '#94a3b8',
              fontSize: '0.95rem',
              lineHeight: '1.6'
            }}>
              <p style={{ marginBottom: '12px' }}>
                Have questions or need support? We're here to help.
              </p>
              <p style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#ffffff' }}>Email:</strong>
              </p>
              <p style={{ marginBottom: '16px' }}>
                <a
                  href="mailto:support@whoza.ai"
                  style={{
                    color: '#84CC16',
                    textDecoration: 'none',
                    fontSize: '1.05rem',
                    fontWeight: '600',
                    display: 'inline-block',
                    transition: 'color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#a3e635'}
                  onMouseOut={(e) => e.target.style.color = '#84CC16'}
                >
                  support@whoza.ai
                </a>
              </p>
              <p style={{ marginTop: '16px' }}>
                <Link
                  to="/contact"
                  style={{
                    color: '#94a3b8',
                    textDecoration: 'underline'
                  }}
                >
                  View full contact information →
                </Link>
              </p>
            </div>
          </div>

          {/* What We Don't Do Section */}
          <div>
            <h3 style={{
              color: '#84CC16',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginBottom: '16px'
            }}>
              What We Don't Do
            </h3>
            <ul style={{
              color: '#94a3b8',
              fontSize: '0.95rem',
              lineHeight: '1.8',
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{
                marginBottom: '8px',
                paddingLeft: '24px',
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: '#84CC16'
                }}>✗</span>
                We don't guarantee positions
              </li>
              <li style={{
                marginBottom: '8px',
                paddingLeft: '24px',
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: '#84CC16'
                }}>✗</span>
                We don't do SEO or paid ads
              </li>
              <li style={{
                marginBottom: '8px',
                paddingLeft: '24px',
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: '#84CC16'
                }}>✗</span>
                We don't access your accounts
              </li>
            </ul>
          </div>

          {/* For Customers Section */}
          <div>
            <h3 style={{
              color: '#84CC16',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginBottom: '16px'
            }}>
              For Customers
            </h3>
            <nav aria-label="Customer navigation" style={{
              color: '#94a3b8',
              fontSize: '0.95rem',
              lineHeight: '1.8'
            }}>
              <p style={{ marginBottom: '12px' }}>
                <Link to="/account" style={{
                  color: '#94a3b8',
                  textDecoration: 'none'
                }}>My Account</Link>
              </p>
              <p style={{ marginBottom: '12px' }}>
                <Link to="/account" style={{
                  color: '#94a3b8',
                  textDecoration: 'none'
                }}>Manage Subscription</Link>
              </p>
              <p style={{ marginBottom: '12px' }}>
                <Link to="/pricing" style={{
                  color: '#94a3b8',
                  textDecoration: 'none'
                }}>Pricing Plans</Link>
              </p>
            </nav>
            <h3 style={{
              color: '#84CC16',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginTop: '24px',
              marginBottom: '16px'
            }}>
              Legal
            </h3>
            <nav aria-label="Legal navigation" style={{
              color: '#94a3b8',
              fontSize: '0.95rem',
              lineHeight: '1.8'
            }}>
              <p style={{ marginBottom: '12px' }}>
                <Link to="/privacy" style={{
                  color: '#94a3b8',
                  textDecoration: 'none'
                }}>Privacy Policy</Link>
              </p>
              <p style={{ marginBottom: '12px' }}>
                <Link to="/terms" style={{
                  color: '#94a3b8',
                  textDecoration: 'none'
                }}>Terms of Service</Link>
              </p>
            </nav>
          </div>
        </div>

        {/* Locations Section */}
        <div style={{
          marginTop: '40px',
          paddingTop: '40px',
          borderTop: '1px solid rgba(132, 204, 22, 0.2)'
        }}>
          <h3 style={{
            color: '#84CC16',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            📍 AI Visibility Services by Location
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px'
          }}>
            {/* UK Locations */}
            <div>
              <h4 style={{
                color: '#a3e635',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                🇬🇧 United Kingdom
              </h4>
              <nav aria-label="UK locations" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '8px',
                fontSize: '0.9rem'
              }}>
                <Link to="/uk/ai-visibility/london" style={{ color: '#94a3b8', textDecoration: 'none' }}>London</Link>
                <Link to="/uk/ai-visibility/birmingham" style={{ color: '#94a3b8', textDecoration: 'none' }}>Birmingham</Link>
                <Link to="/uk/ai-visibility/manchester" style={{ color: '#94a3b8', textDecoration: 'none' }}>Manchester</Link>
                <Link to="/uk/ai-visibility/leeds" style={{ color: '#94a3b8', textDecoration: 'none' }}>Leeds</Link>
                <Link to="/uk/ai-visibility/glasgow" style={{ color: '#94a3b8', textDecoration: 'none' }}>Glasgow</Link>
                <Link to="/uk/ai-visibility/liverpool" style={{ color: '#94a3b8', textDecoration: 'none' }}>Liverpool</Link>
                <Link to="/uk/ai-visibility/newcastle" style={{ color: '#94a3b8', textDecoration: 'none' }}>Newcastle</Link>
                <Link to="/uk/ai-visibility/sheffield" style={{ color: '#94a3b8', textDecoration: 'none' }}>Sheffield</Link>
                <Link to="/uk/ai-visibility/bristol" style={{ color: '#94a3b8', textDecoration: 'none' }}>Bristol</Link>
                <Link to="/uk/ai-visibility/edinburgh" style={{ color: '#94a3b8', textDecoration: 'none' }}>Edinburgh</Link>
                <Link to="/uk/ai-visibility/leicester" style={{ color: '#94a3b8', textDecoration: 'none' }}>Leicester</Link>
                <Link to="/uk/ai-visibility/nottingham" style={{ color: '#94a3b8', textDecoration: 'none' }}>Nottingham</Link>
                <Link to="/uk/ai-visibility/cardiff" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cardiff</Link>
                <Link to="/uk/ai-visibility/coventry" style={{ color: '#94a3b8', textDecoration: 'none' }}>Coventry</Link>
                <Link to="/uk/ai-visibility/southampton" style={{ color: '#94a3b8', textDecoration: 'none' }}>Southampton</Link>
              </nav>
            </div>

            {/* US Locations */}
            <div>
              <h4 style={{
                color: '#a3e635',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                🇺🇸 United States
              </h4>
              <nav aria-label="US locations" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '8px',
                fontSize: '0.9rem'
              }}>
                <Link to="/us/ai-visibility/new-york" style={{ color: '#94a3b8', textDecoration: 'none' }}>New York</Link>
                <Link to="/us/ai-visibility/los-angeles" style={{ color: '#94a3b8', textDecoration: 'none' }}>Los Angeles</Link>
                <Link to="/us/ai-visibility/chicago" style={{ color: '#94a3b8', textDecoration: 'none' }}>Chicago</Link>
                <Link to="/us/ai-visibility/houston" style={{ color: '#94a3b8', textDecoration: 'none' }}>Houston</Link>
                <Link to="/us/ai-visibility/phoenix" style={{ color: '#94a3b8', textDecoration: 'none' }}>Phoenix</Link>
                <Link to="/us/ai-visibility/philadelphia" style={{ color: '#94a3b8', textDecoration: 'none' }}>Philadelphia</Link>
                <Link to="/us/ai-visibility/san-antonio" style={{ color: '#94a3b8', textDecoration: 'none' }}>San Antonio</Link>
                <Link to="/us/ai-visibility/san-diego" style={{ color: '#94a3b8', textDecoration: 'none' }}>San Diego</Link>
                <Link to="/us/ai-visibility/dallas" style={{ color: '#94a3b8', textDecoration: 'none' }}>Dallas</Link>
                <Link to="/us/ai-visibility/san-jose" style={{ color: '#94a3b8', textDecoration: 'none' }}>San Jose</Link>
                <Link to="/us/ai-visibility/austin" style={{ color: '#94a3b8', textDecoration: 'none' }}>Austin</Link>
                <Link to="/us/ai-visibility/jacksonville" style={{ color: '#94a3b8', textDecoration: 'none' }}>Jacksonville</Link>
                <Link to="/us/ai-visibility/fort-worth" style={{ color: '#94a3b8', textDecoration: 'none' }}>Fort Worth</Link>
                <Link to="/us/ai-visibility/columbus" style={{ color: '#94a3b8', textDecoration: 'none' }}>Columbus</Link>
                <Link to="/us/ai-visibility/charlotte" style={{ color: '#94a3b8', textDecoration: 'none' }}>Charlotte</Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          textAlign: 'center',
          paddingTop: '30px',
          borderTop: '1px solid rgba(132, 204, 22, 0.2)',
          color: '#64748b',
          fontSize: '0.85rem',
          marginTop: '40px'
        }}>
          <p>© {new Date().getFullYear()} WHOZA AI LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
