import { useState, useEffect, memo, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X } from 'lucide-react';

const WhozaLogo = memo(() => (
  <img
    src="/production_logo.png"
    alt="Whoza.ai - AI for Tradespeople"
    className="header-logo"
    loading="eager"
    width="200"
    height="auto"
    style={{ maxHeight: '40px', width: 'auto' }}
  />
));

const Header = memo(function Header() {
  const { user, userData, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

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
    <header
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
      style={{
        background: isScrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.6)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(4px)',
        borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none',
      }}
      role="banner"
    >
      <div
        className="flex items-center justify-between"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isScrolled ? '12px 24px' : '16px 24px',
          transition: 'padding 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0" aria-label="whoza.ai home">
          <WhozaLogo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          <Link
            to="/competitor-analysis"
            className="text-sm font-medium transition-colors hover:text-blue-600"
            style={{ color: 'var(--color-navy)', fontFamily: 'var(--font-body)' }}
          >
            Product
          </Link>
          <Link
            to="/pricing"
            className="text-sm font-medium transition-colors hover:text-blue-600"
            style={{ color: 'var(--color-navy)', fontFamily: 'var(--font-body)' }}
          >
            Pricing
          </Link>
          <Link
            to="/how-it-works"
            className="text-sm font-medium transition-colors hover:text-blue-600"
            style={{ color: 'var(--color-navy)', fontFamily: 'var(--font-body)' }}
          >
            About
          </Link>
        </nav>

        {/* Desktop CTA + Auth */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/start?mode=signin"
                className="text-sm font-medium transition-colors hover:text-blue-600"
                style={{ color: 'var(--color-slate)' }}
              >
                Log In
              </Link>
              <Link
                to="/pricing"
                className="ds-btn ds-btn-cta text-sm"
                style={{ minHeight: '40px', padding: '8px 20px' }}
              >
                Start Free Trial
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/portal"
                className="text-sm font-medium transition-colors hover:text-blue-600"
                style={{ color: 'var(--color-navy)' }}
              >
                Portal
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium transition-colors hover:text-red-500"
                style={{ color: 'var(--color-slate)' }}
              >
                Sign Out
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: 'var(--color-navy)' }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 border-b"
          style={{
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(12px)',
            borderColor: 'var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <div className="flex flex-col p-6 gap-4">
            <Link
              to="/competitor-analysis"
              onClick={closeMobileMenu}
              className="text-base font-medium py-2"
              style={{ color: 'var(--color-navy)' }}
            >
              Product
            </Link>
            <Link
              to="/pricing"
              onClick={closeMobileMenu}
              className="text-base font-medium py-2"
              style={{ color: 'var(--color-navy)' }}
            >
              Pricing
            </Link>
            <Link
              to="/how-it-works"
              onClick={closeMobileMenu}
              className="text-base font-medium py-2"
              style={{ color: 'var(--color-navy)' }}
            >
              About
            </Link>
            <div className="border-t pt-4 mt-2" style={{ borderColor: 'var(--color-border)' }}>
              {!user ? (
                <>
                  <Link
                    to="/start?mode=signin"
                    onClick={closeMobileMenu}
                    className="block text-base font-medium py-2 mb-3"
                    style={{ color: 'var(--color-slate)' }}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/pricing"
                    onClick={closeMobileMenu}
                    className="ds-btn ds-btn-cta w-full justify-center"
                  >
                    Start Free Trial
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/portal"
                    onClick={closeMobileMenu}
                    className="block text-base font-medium py-2 mb-3"
                    style={{ color: 'var(--color-navy)' }}
                  >
                    Portal
                  </Link>
                  <button
                    onClick={() => { closeMobileMenu(); handleSignOut(); }}
                    className="block text-base font-medium py-2 w-full text-left"
                    style={{ color: 'var(--color-slate)' }}
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

export default Header;
