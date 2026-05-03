import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Search, Star } from 'lucide-react';
import KatieAvatar from './personas/KatieAvatar.jsx';
import RexAvatar from './personas/RexAvatar.jsx';
import ClaireAvatar from './personas/ClaireAvatar.jsx';

export default function FinalCTA() {
  return (
    <section
      className="ds-section relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
      }}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Floating glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
      />

      <div className="ds-container text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Persona avatars row */}
          <div className="flex justify-center items-end gap-4 mb-8">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <KatieAvatar size="lg" floating={false} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              className="mb-2"
            >
              <RexAvatar size="xl" floating={false} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            >
              <ClaireAvatar size="lg" floating={false} />
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-extrabold tracking-tight mb-4"
            style={{
              fontSize: 'var(--text-h2)',
              color: 'var(--white)',
              fontFamily: 'var(--font-heading)',
              lineHeight: 'var(--line-height-tight)',
            }}
          >
            Don't Let AI Miss Your Business
          </motion.h2>
          <p
            className="mb-8 max-w-xl mx-auto"
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--slate-400)',
              lineHeight: 'var(--line-height-relaxed)',
            }}
          >
            Katie answers every call. Rex tracks your competitors. Claire collects your reviews.
            One platform that turns AI search into your best lead source.
            Only pay when Katie books a job.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/pricing"
              className="ds-btn ds-btn-cta ds-btn-lg"
              style={{ fontSize: '1.125rem', padding: 'var(--space-5) var(--space-10)' }}
            >
              Start Your Free Trial — See How Many Jobs Katie Books
              <ArrowRight size={20} />
            </Link>
            <span className="text-sm" style={{ color: 'var(--slate-400)' }}>
              No credit card required · Cancel anytime
            </span>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { icon: Phone, label: 'AI Call Answering' },
              { icon: Search, label: 'Competitor Tracking' },
              { icon: Star, label: 'Review Collection' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2" style={{ color: 'var(--slate-500)' }}>
                <Icon size={16} />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
