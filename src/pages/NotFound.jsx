import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, Home, Wrench, FileText, HelpCircle } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const metaRobots = document.querySelector("meta[name='robots']");
    if (!metaRobots) {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow';
      document.head.appendChild(meta);
    } else {
      metaRobots.setAttribute('content', 'noindex, nofollow');
    }

    document.title = '404 - Page Not Found | Whoza.ai';

    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute('content', 'The page you are looking for could not be found. Return to Whoza.ai homepage or explore our popular pages.');
    }

    return () => {
      if (metaRobots) {
        metaRobots.remove();
      }
    };
  }, []);

  const popularPages = [
    { icon: Home, label: 'Home', path: '/', desc: 'AI voice agent for tradespeople' },
    { icon: Wrench, label: 'How It Works', path: '/how-it-works', desc: 'See how Katie books jobs 24/7' },
    { icon: FileText, label: 'Pricing', path: '/pricing', desc: 'Plans from £59/month' },
    { icon: HelpCircle, label: 'FAQ', path: '/faq', desc: 'Common questions answered' },
  ];

  return (
    <div className="page-container" style={{ background: 'var(--navy-900)', minHeight: '100vh' }}>
      <Header />
      <main id="main-content" className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 200px)', padding: '60px 20px' }}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 inline-flex items-center justify-center w-28 h-28 rounded-2xl"
            style={{ background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.2)' }}
          >
            <Search size={48} style={{ color: 'var(--katie-blue)' }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-extrabold mb-2"
            style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', color: 'var(--white)', fontFamily: 'var(--font-accent)', lineHeight: 1 }}
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: 'var(--white)', fontFamily: 'var(--font-heading)' }}
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 max-w-md mx-auto"
            style={{ color: 'var(--slate-400)', fontSize: '1.0625rem', lineHeight: 1.6 }}
          >
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--slate-300)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <ArrowLeft size={16} />
              Go Back
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: 'var(--katie-blue)', color: 'white' }}
            >
              <Home size={16} />
              Return Home
            </Link>
          </motion.div>

          {/* Popular Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <h3 className="font-semibold mb-6" style={{ color: 'var(--slate-400)', fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Popular Pages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {popularPages.map(({ icon: Icon, label, path, desc }) => (
                <Link
                  key={path}
                  to={path}
                  className="flex items-start gap-3 p-4 rounded-xl transition-all hover:translate-y-[-2px]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--katie-blue)' }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm" style={{ color: 'var(--white)' }}>{label}</h4>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--slate-500)' }}>{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}