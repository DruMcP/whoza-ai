import { useState, useEffect, memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AccessibilityMenu from './AccessibilityMenu';
import ExternalLinkIcon from './icons/ui/ExternalLinkIcon';

const WhozaLogo = memo(() => (
  <img
    src="/production_logo.png"
    alt="Whoza.ai - AI for Tradespeople"
    className="header-logo"
    loading="eager"
    width="300"
    height="auto"
  />
));

const Header = memo(function Header() {
  const { user, userData, signOut } = useAuth();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = useCallback(async () => {
    await signOut();
    navigate('/');
  }, [signOut, navigate]);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`} role="banner">
      <div className="header-inner">
        <div className="header-left">
          <Link to="/" className="header-logo-link" aria-label="whoza.ai home">
            <WhozaLogo />
          </Link>
          <div className="header-trust-badge" role="img" aria-label="GDPR Compliant">
            <svg className="trust-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" focusable="false">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>GDPR Compliant</span>
          </div>
        </div>

        <nav className="header-navigation" aria-label="Main navigation">
          {!user ? (
            <>
              <ul className="header-nav-primary" role="list">
                <li><Link to="/how-it-works" className="nav-link">How it works</Link></li>
                <li><Link to="/case-studies" className="nav-link">Case Studies</Link></li>
                <li><Link to="/pricing" className="nav-link">Pricing</Link></li>
                <li><Link to="/trust" className="nav-link">Trust & Reviews</Link></li>
                <li><Link to="/contact" className="nav-link">Contact</Link></li>
              </ul>
              <div className="header-nav-secondary">
                <AccessibilityMenu />
                <Link to="/start" className="button button-header-cta btn-hover" aria-label="Get started with whoza.ai">Get started</Link>
              </div>
            </>
          ) : userData?.role === 'admin' ? (
            <>
              <ul className="header-nav-primary" role="list">
                <li><Link to="/admin" className="nav-link">Admin</Link></li>
                <li><Link to="/account" className="nav-link">My Account</Link></li>
                <li><Link to="/contact" className="nav-link">Contact</Link></li>
              </ul>
              <div className="header-nav-secondary">
                <AccessibilityMenu />
                <button onClick={handleSignOut} className="button-secondary button-header-secondary btn-hover" aria-label="Sign out of your account">Sign out</button>
              </div>
            </>
          ) : (
            <>
              <ul className="header-nav-primary" role="list">
                <li><Link to="/portal" className="nav-link">Portal</Link></li>
                <li><Link to="/tasks" className="nav-link">Tasks</Link></li>
                <li><Link to="/reports" className="nav-link">Reports</Link></li>
                <li><Link to="/account" className="nav-link">My Account</Link></li>
                <li><Link to="/contact" className="nav-link">Contact</Link></li>
              </ul>
              <div className="header-nav-secondary">
                {userData?.subscription_tier && (
                  <Link
                    to="/pricing"
                    className="subscription-tier-badge"
                    aria-label={`Current plan: ${userData.subscription_tier}. Click to view pricing and upgrade options`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      backgroundColor: 'var(--color-primary-500)',
                      color: 'var(--color-dark-900)',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                      marginRight: 'var(--spacing-md)',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#b3e030';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary-500)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = '2px solid var(--color-primary-500)';
                      e.currentTarget.style.outlineOffset = '2px';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outline = 'none';
                    }}
                  >
                    <span>{userData.subscription_tier} Plan</span>
                    <ExternalLinkIcon width={14} height={14} color="currentColor" />
                  </Link>
                )}
                <AccessibilityMenu />
                <button onClick={handleSignOut} className="button-secondary button-header-secondary btn-hover" aria-label="Sign out of your account">Sign out</button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
});

export default Header;
