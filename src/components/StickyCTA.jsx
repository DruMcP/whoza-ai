import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function StickyCTA() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.9) 30%)',
        padding: '24px 16px 16px',
      }}
    >
      <Link
        to="/pricing"
        className="ds-btn ds-btn-cta ds-btn-lg w-full"
        style={{ boxShadow: 'var(--shadow-amber-glow)' }}
      >
        Start Free Trial
      </Link>
    </motion.div>
  );
}
