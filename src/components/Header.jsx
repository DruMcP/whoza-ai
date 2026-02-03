import { useState, useEffect, memo, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AccessibilityMenu from './AccessibilityMenu';
import ExternalLinkIcon from './icons/ui/ExternalLinkIcon';
import CountrySwitcher from './CountrySwitcher';

const WhozaLogo = memo(() => (
  <img
    src="/production_logo.png"
    alt="Whoza.ai - AI for Tradespeople"
    className="header-logo"
    loading="eager"
    width="240"
    height="auto"
  />
));

const Header = memo(function Header() {
  const { user, userData, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`} role="banner">
      <div className="header-inner">
        <div className="header-left">
          <Link to="/" className="header-logo-link" aria-label="whoza.ai home">
            <WhozaLogo />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="hamburger-icon">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </span>
        </button>

        <nav className={`header-navigation ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`} id="mobile-navigation" aria-label="Main navigation">
          {!user ? (
            <>
              <ul className="header-nav-primary" role="list">
                <li><Link to="/how-it-works" className="nav-link" onClick={closeMobileMenu}>How it works</Link></li>
                <li><Link to="/case-studies" className="nav-link" onClick={closeMobileMenu}>Case Studies</Link></li>
                <li><Link to="/pricing" className="nav-link" onClick={closeMobileMenu}>Pricing</Link></li>
                <li><Link to="/blog" className="nav-link" onClick={closeMobileMenu}>Blog</Link></li>
                <li><Link to="/trust" className="nav-link" onClick={closeMobileMenu}>Trust</Link></li>
                <li><Link to="/contact" className="nav-link" onClick={closeMobileMenu}>Contact</Link></li>
              </ul>
              <div className="header-nav-secondary">
                <div className="header-utility-group">
                  <CountrySwitcher />
                  <AccessibilityMenu />
                </div>
                <div className="header-cta-group">
                  <Link to="/start?mode=signin" className="header-login-btn btn-hover" aria-label="Log in to your account" onClick={closeMobileMenu}>
                    <svg className="login-icon" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Log In
                  </Link>
                  <Link to="/free-score" className="header-cta-btn btn-hover" aria-label="Get your free visibility score" onClick={closeMobileMenu}>
                    Get Free Score
                  </Link>
                </div>
              </div>
            </>
          ) : userData?.role === 'admin' ? (
            <>
              <ul className="header-nav-primary" role="list">
                <li><Link to="/admin" className="nav-link" onClick={closeMobileMenu}>Admin</Link></li>
                <li><Link to="/account" className="nav-link" onClick={closeMobileMenu}>My Account</Link></li>
                <li><Link to="/contact" className="nav-link" onClick={closeMobileMenu}>Contact</Link></li>
              </ul>
              <div className="header-nav-secondary">
                <div className="header-utility-group">
                  <AccessibilityMenu />
                </div>
                <div className="header-cta-group">
                  <button onClick={handleSignOut} className="header-login-btn btn-hover" aria-label="Sign out of your account">
                    Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <ul className="header-nav-primary" role="list">
                <li><Link to="/portal" className="nav-link" onClick={closeMobileMenu}>Portal</Link></li>
                <li><Link to="/tasks" className="nav-link" onClick={closeMobileMenu}>Tasks</Link></li>
                <li><Link to="/reports" className="nav-link" onClick={closeMobileMenu}>Reports</Link></li>
                <li><Link to="/account" className="nav-link" onClick={closeMobileMenu}>My Account</Link></li>
                <li><Link to="/contact" className="nav-link" onClick={closeMobileMenu}>Contact</Link></li>
              </ul>
              <div className="header-nav-secondary">
                {userData?.subscription_tier && (
                  <Link
                    to="/pricing"
                    className="header-tier-badge"
                    aria-label={`Current plan: ${userData.subscription_tier}. Click to view pricing and upgrade options`}
                    onClick={closeMobileMenu}
                  >
                    <span>{userData.subscription_tier} Plan</span>
                    <ExternalLinkIcon width={14} height={14} color="currentColor" />
                  </Link>
                )}
                <div className="header-utility-group">
                  <AccessibilityMenu />
                </div>
                <div className="header-cta-group">
                  <button onClick={handleSignOut} className="header-login-btn btn-hover" aria-label="Sign out of your account">
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
});

export default Header;
