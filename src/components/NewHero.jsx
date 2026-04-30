import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import KatieAvatar from './personas/KatieAvatar.jsx';
import RexAvatar from './personas/RexAvatar.jsx';
import ClaireAvatar from './personas/ClaireAvatar.jsx';
import MarkAvatar from './personas/MarkAvatar.jsx';
import UserCountBadge from './UserCountBadge';
import PhoneMockup from './PhoneMockup.jsx';

export default function NewHero() {
  return (
    <section
      className="relative overflow-hidden ds-gradient-mesh"
      style={{
        paddingTop: 'clamp(6rem, 12vh, 10rem)',
        paddingBottom: 'clamp(4rem, 8vh, 6rem)',
      }}
    >
      {/* Subtle mesh pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating glow orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #059669 0%, transparent 70%)' }}
      />

      <div className="ds-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: 'var(--slate-400)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Trusted by 2,800+ UK tradespeople
              </span>
            </motion.div>

            <h1
              className="font-extrabold tracking-tight mb-6"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--white)',
                fontFamily: 'var(--font-heading)',
                maxWidth: '560px',
              }}
            >
              Your AI Team for{' '}
              <span style={{ color: '#60A5FA' }}>Every Call,</span>{' '}
              <span style={{ color: '#34D399' }}>Every Lead,</span>{' '}
              <span style={{ color: '#FBBF24' }}>Every Review</span>
            </h1>

            <p
              className="mb-8"
              style={{
                maxWidth: '480px',
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: 'var(--slate-400)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Meet Katie — your AI voice agent who never misses a call.
              Rex — who tracks your competitors and tells you how to outrank them.
              And Claire — who collects reviews while you work.
              One platform. One price. Zero missed opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                to="/pricing"
                className="ds-btn ds-btn-cta ds-btn-lg"
              >
                Start Your Free Trial — See How Many Jobs Katie Books
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/how-it-works"
                className="ds-btn"
                style={{
                  background: 'transparent',
                  color: 'var(--slate-400)',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                }}
              >
                See How It Works
              </Link>
            </div>

            <UserCountBadge />
          </motion.div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <PhoneMockup />

            {/* Mini team indicator below phone */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center gap-3 px-5 py-3 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex -space-x-2">
                <KatieAvatar size="md" floating={false} />
                <MarkAvatar size="md" floating={false} />
                <RexAvatar size="md" floating={false} />
                <ClaireAvatar size="md" floating={false} />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--slate-400)' }}>
                Your AI team — always on
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
