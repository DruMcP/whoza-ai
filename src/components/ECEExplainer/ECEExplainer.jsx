import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, BadgeCheck, Globe, Star, FileText } from 'lucide-react';
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
          <div style={{
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '0.1em',
            color: '#22d3ee',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            OUR PROVEN METHOD
          </div>

          <h2
            id="ece-heading"
            style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '16px',
              lineHeight: '1.1'
            }}
          >
            Entity Confidence Engineering™
          </h2>

          <p style={{
            fontSize: '20px',
            fontWeight: '500',
            color: '#c4f135',
            marginBottom: '16px'
          }}>
            The system that makes AI trust and recommend your business
          </p>

          <p style={{
            fontSize: '18px',
            color: '#94a3b8',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            5 simple steps to get ChatGPT, Google AI, and other AI tools to recommend you by name
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          {PILLAR_DATA.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                    position: 'relative'
                  }}
                  className="ece-pillar-card"
                  aria-label={`Learn more about ${pillar.title}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 211, 238, 0.2)';
                    e.currentTarget.style.borderColor = '#22d3ee';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#1f2937';
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
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(34, 211, 238, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#22d3ee',
                      fontSize: '16px',
                      fontWeight: '700'
                    }}>
                      {pillar.number}
                    </div>
                    <IconComponent
                      size={28}
                      style={{ color: '#22d3ee' }}
                      aria-hidden="true"
                    />
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
                    <span aria-hidden="true">→</span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
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
            gap: '12px',
            padding: '16px 24px',
            background: 'rgba(34, 211, 238, 0.1)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            borderRadius: '50px',
            fontSize: '16px',
            color: '#ffffff'
          }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#c4f135',
                animation: 'pulse 2s ease-in-out infinite'
              }}
              aria-hidden="true"
            />
            <span>
              Get all 5 right and AI will <strong style={{ color: '#c4f135' }}>recommend you by name</strong>
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
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
      `}</style>
    </section>
  );
}
