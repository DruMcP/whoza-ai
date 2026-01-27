import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, BadgeCheck, Globe, Star, FileText, Check } from 'lucide-react';
import { useRef } from 'react';
import ECEModal from './ECEModal';
import ComparisonTable from './ComparisonTable';
import TrustBadge from './TrustBadge';

const PILLAR_DATA = [
  {
    id: 1,
    number: '1',
    shortLabel: 'WHO YOU ARE',
    title: 'Business Identity',
    description: 'Make sure AI knows exactly who you are and what you do',
    icon: Building2,
    whatThisMeans: "AI needs to understand your business clearly. This means your business name, address, phone number, and services should be the same everywhere you appear online — on Google, Facebook, directories, and your website.",
    whyAICares: "When your identity is clear, AI can confidently say 'Smith's Plumbing in Manchester is a reliable local plumber' instead of giving vague advice.",
    whatYouCanDo: "Check that your business name and address are exactly the same on Google, Facebook, Yell, and your own website."
  },
  {
    id: 2,
    number: '2',
    shortLabel: 'YOUR CREDENTIALS',
    title: 'Prove Your Qualifications',
    description: "Show AI that you're properly qualified and certified",
    icon: BadgeCheck,
    whatThisMeans: "AI recommends businesses it can trust. Your qualifications — like Gas Safe registration, NICEIC certification, or trade body memberships — prove you're safe to recommend.",
    whyAICares: "With verified credentials, AI can say 'They are Gas Safe registered' rather than 'Make sure to check their qualifications yourself'.",
    whatYouCanDo: "Add your Gas Safe number or trade certifications to your website and Google Business Profile."
  },
  {
    id: 3,
    number: '3',
    shortLabel: 'BE VISIBLE',
    title: 'Online Presence',
    description: 'Appear on multiple trusted websites and directories',
    icon: Globe,
    whatThisMeans: "AI checks multiple sources before making recommendations. The more places your business appears with consistent information, the more confident AI becomes in recommending you.",
    whyAICares: "A strong online presence means AI finds your business mentioned in multiple trusted places, making it more likely to recommend you.",
    whatYouCanDo: "Claim your profiles on Checkatrade, Trustatrader, and local directories. Make sure all your details match."
  },
  {
    id: 4,
    number: '4',
    shortLabel: 'HAPPY CUSTOMERS',
    title: 'Reviews & Ratings',
    description: "Let your customers' words speak for you",
    icon: Star,
    whatThisMeans: "Reviews are the number one trust signal for AI. Recent, positive reviews that mention specific work you've done give AI the confidence to recommend you.",
    whyAICares: "Strong reviews let AI say 'highly rated with 4.8 stars from 150+ reviews' instead of just listing your name without context.",
    whatYouCanDo: "Reply to all your reviews professionally. Ask happy customers to mention the specific job you did for them."
  },
  {
    id: 5,
    number: '5',
    shortLabel: 'PROVE YOU KNOW YOUR STUFF',
    title: 'Show Your Expertise',
    description: "Create helpful content that shows you're an expert",
    icon: FileText,
    whatThisMeans: "AI looks for evidence that you really know your trade. Simple blog posts, FAQs, or tips on your website show deep knowledge in your field.",
    whyAICares: "Helpful content helps AI describe you as 'specialists in boiler repairs' or 'known for quality kitchen fitting' rather than generic terms.",
    whatYouCanDo: "Write a simple page on your website about common problems you fix and how you solve them."
  }
];

// Animated checkmark component
const AnimatedCheckmark = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, rotate: -180 }}
      animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        delay: 0.2
      }}
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #c4f135, #a8d91f)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(196, 241, 53, 0.4)'
      }}
    >
      <Check size={28} style={{ color: '#0a0f1a', strokeWidth: 3 }} />
    </motion.div>
  );
};

// Progress line component
const ProgressLine = ({ totalSteps, currentStep }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '2px',
        background: 'rgba(34, 211, 238, 0.2)',
        zIndex: 0,
        display: 'none' // Hidden on mobile, shown on desktop
      }}
      className="progress-line-desktop"
    >
      <motion.div
        initial={{ width: '0%' }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, #22d3ee, #c4f135)',
          boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
        }}
      />
    </div>
  );
};

export default function ECEExplainer() {
  const [selectedPillar, setSelectedPillar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePillarClick = (pillar) => {
    setSelectedPillar(pillar);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigatePillar = (pillarId) => {
    const pillar = PILLAR_DATA.find(p => p.id === pillarId);
    if (pillar) {
      setSelectedPillar(pillar);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <section
      className="ece-explainer-section"
      style={{
        background: '#0a0f1a',
        padding: '80px 20px',
        position: 'relative'
      }}
      aria-labelledby="ece-heading"
    >
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              color: '#22d3ee',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}
          >
            OUR PROVEN METHOD
          </motion.div>

          <motion.h2
            id="ece-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '16px',
              lineHeight: '1.1'
            }}
          >
            Entity Confidence Engineering™
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: '20px',
              fontWeight: '500',
              color: '#c4f135',
              marginBottom: '16px'
            }}
          >
            The system that makes AI trust and recommend your business
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              fontSize: '18px',
              color: '#94a3b8',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}
          >
            5 simple steps to get ChatGPT, Google AI, and other AI tools to recommend you by name
          </motion.p>
        </div>

        <div 
          className="ece-pillars-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
            position: 'relative'
          }}>
          <ProgressLine totalSteps={5} />
          
          {PILLAR_DATA.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <button
                  onClick={() => handlePillarClick(pillar)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handlePillarClick(pillar);
                    }
                  }}
                  style={{
                    width: '100%',
                    background: '#111827',
                    border: '1px solid #1f2937',
                    borderRadius: '16px',
                    padding: '24px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    position: 'relative',
                    zIndex: 1
                  }}
                  className="ece-pillar-card"
                  aria-label={`Learn more about ${pillar.title}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(34, 211, 238, 0.3)';
                    e.currentTarget.style.borderColor = '#22d3ee';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #111827, #1a2332)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#1f2937';
                    e.currentTarget.style.background = '#111827';
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = '2px solid #22d3ee';
                    e.currentTarget.style.outlineOffset = '2px';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.1 + 0.3,
                        type: "spring",
                        stiffness: 200
                      }}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(34, 211, 238, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#22d3ee',
                        fontSize: '16px',
                        fontWeight: '700',
                        border: '2px solid rgba(34, 211, 238, 0.3)'
                      }}
                    >
                      {pillar.number}
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.1 + 0.4,
                        type: "spring",
                        stiffness: 150
                      }}
                    >
                      <IconComponent
                        size={28}
                        style={{ color: '#22d3ee' }}
                        aria-hidden="true"
                      />
                    </motion.div>
                  </div>

                  <div style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}>
                    {pillar.shortLabel}
                  </div>

                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '12px',
                    lineHeight: '1.3'
                  }}>
                    {pillar.title}
                  </h3>

                  <p style={{
                    fontSize: '15px',
                    color: '#94a3b8',
                    lineHeight: '1.5',
                    marginBottom: '16px'
                  }}>
                    {pillar.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#22d3ee',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    <span>Learn more</span>
                    <motion.span 
                      aria-hidden="true"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      →
                    </motion.span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '48px'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px 32px',
            background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(196, 241, 53, 0.1))',
            border: '2px solid rgba(34, 211, 238, 0.3)',
            borderRadius: '50px',
            fontSize: '16px',
            color: '#ffffff',
            boxShadow: '0 4px 20px rgba(34, 211, 238, 0.2)'
          }}>
            <AnimatedCheckmark />
            <span>
              Get all 5 right and AI will <strong style={{ color: '#c4f135', fontSize: '18px' }}>recommend you by name</strong>
            </span>
          </div>

          <TrustBadge />
        </motion.div>

        <ComparisonTable />
      </div>

      {isModalOpen && selectedPillar && (
        <ECEModal
          pillar={selectedPillar}
          onClose={handleCloseModal}
          onNavigate={handleNavigatePillar}
          totalPillars={PILLAR_DATA.length}
        />
      )}

      <style>{`
        @media (min-width: 768px) {
          .progress-line-desktop {
            display: block !important;
          }
        }

        .ece-pillar-card:active {
          transform: translateY(-4px) scale(0.98) !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .ece-pillar-card {
            transition: none !important;
          }
          .progress-line-desktop div {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
