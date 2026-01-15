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
                Built by a team passionate about helping UK tradespeople compete in the AI age.
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
              <p style={{ marginBottom: '12px' }}>
                <Link to="/blog" style={{
                  color: '#94a3b8',
                  textDecoration: 'none'
                }}>AI Visibility Blog</Link>
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

        {/* Copyright */}
        <div style={{
          textAlign: 'center',
          paddingTop: '30px',
          borderTop: '1px solid rgba(132, 204, 22, 0.2)',
          color: '#64748b',
          fontSize: '0.85rem'
        }}>
          <p>© {new Date().getFullYear()} WHOZA AI LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
