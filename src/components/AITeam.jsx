import { useState } from 'react';
import { Link } from 'react-router-dom';

const WaitlistModal = ({ isOpen, onClose, memberName, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await onSubmit(email);
      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setError('');
    setEmail('');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)'
        }}
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '28rem',
          backgroundColor: '#0F172A',
          border: '1px solid rgba(170, 255, 0, 0.2)',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            color: '#9CA3AF',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
          onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}
          aria-label="Close modal"
        >
          <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              margin: '0 auto 1rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(170, 255, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg style={{ width: '2rem', height: '2rem', color: '#AAFF00' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 id="modal-title" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              You're on the list!
            </h3>
            <p style={{ color: '#9CA3AF' }}>
              We'll notify you as soon as {memberName} is ready to join your team.
            </p>
            <button
              onClick={handleClose}
              style={{
                marginTop: '1.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#AAFF00',
                color: '#0F172A',
                fontWeight: 600,
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.filter = 'brightness(1.1)'}
              onMouseLeave={(e) => e.target.style.filter = 'brightness(1)'}
            >
              Got it
            </button>
          </div>
        ) : (
          <>
            <h3 id="modal-title" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              Get notified when {memberName} launches
            </h3>
            <p style={{ color: '#9CA3AF', marginBottom: '1.5rem' }}>
              Be the first to know when {memberName} is ready to help grow your business.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label htmlFor="waitlist-email" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
                  Email address
                </label>
                <input
                  type="email"
                  id="waitlist-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.75rem',
                    color: '#FFFFFF',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(170, 255, 0, 0.5)';
                    e.target.style.boxShadow = '0 0 0 1px rgba(170, 255, 0, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {error && (
                <p style={{ color: '#EF4444', fontSize: '0.875rem' }} role="alert">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#AAFF00',
                  color: '#0F172A',
                  fontWeight: 600,
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => !isSubmitting && (e.target.style.filter = 'brightness(1.1)')}
                onMouseLeave={(e) => e.target.style.filter = 'brightness(1)'}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      style={{
                        animation: 'spin 1s linear infinite',
                        width: '1.25rem',
                        height: '1.25rem'
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Joining...</span>
                  </>
                ) : (
                  'Notify Me'
                )}
              </button>
            </form>
          </>
        )}
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const TeamCard = ({ member, onNotifyClick }) => {
  const isLive = member.status === 'live';
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '1.5rem',
        padding: '2rem',
        transition: 'all 0.3s',
        backgroundColor: isLive ? '#FFFFFF' : '#1A1F2E',
        border: isLive ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isLive
          ? (isHovered ? '0 25px 50px -12px rgba(0, 0, 0, 0.3)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1)')
          : 'none',
        transform: isHovered && isLive ? 'translateY(-4px)' : 'none',
        borderColor: !isLive && isHovered ? 'rgba(170, 255, 0, 0.3)' : undefined,
        opacity: !isLive ? 0.85 : 1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
        {isLive ? (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.25rem 0.75rem',
            backgroundColor: '#AAFF00',
            color: '#0F172A',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            borderRadius: '9999px',
            textTransform: 'uppercase',
            letterSpacing: '0.025em'
          }}>
            <span style={{
              width: '0.5rem',
              height: '0.5rem',
              backgroundColor: '#0F172A',
              borderRadius: '50%',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }} aria-hidden="true" />
            Live Now
          </span>
        ) : (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.25rem 0.75rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#9CA3AF',
            fontSize: '0.75rem',
            fontWeight: 500,
            borderRadius: '9999px'
          }}>
            {member.launchDate || 'Coming 2026'}
          </span>
        )}
      </div>

      {/* Enhanced Avatar/Icon Section */}
      <div
        style={{
          width: '5rem',
          height: '5rem',
          borderRadius: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          backgroundColor: isLive
            ? 'rgba(170, 255, 0, 0.1)'
            : 'rgba(255, 255, 255, 0.05)',
          background: isLive
            ? 'linear-gradient(135deg, rgba(170, 255, 0, 0.2), rgba(170, 255, 0, 0.05))'
            : member.gradientBg || undefined,
          border: `2px solid ${isLive ? 'rgba(170, 255, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
          position: 'relative',
          overflow: 'hidden'
        }}
        aria-hidden="true"
      >
        {/* Animated background effect for live card */}
        {isLive && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, transparent, rgba(170, 255, 0, 0.1), transparent)',
            animation: 'shimmer 3s infinite'
          }} />
        )}
        <div style={{
          fontSize: '2.5rem',
          color: isLive ? '#AAFF00' : member.iconColor || '#6B7280',
          position: 'relative',
          zIndex: 1
        }}>
          {member.icon}
        </div>
      </div>

      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '0.25rem',
        color: isLive ? '#0F172A' : '#FFFFFF'
      }}>
        {member.name}
      </h3>
      <p style={{
        fontSize: '0.875rem',
        fontWeight: 600,
        marginBottom: '1rem',
        color: isLive ? '#AAFF00' : member.roleColor || 'rgba(170, 255, 0, 0.7)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {member.role}
      </p>
      <p style={{
        fontSize: '0.9375rem',
        lineHeight: '1.6',
        marginBottom: '1.5rem',
        color: isLive ? '#4B5563' : '#9CA3AF'
      }}>
        {member.description}
      </p>

      {/* Key Features List */}
      {member.features && (
        <ul style={{
          listStyle: 'none',
          padding: 0,
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {member.features.map((feature, idx) => (
            <li key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8125rem',
              color: isLive ? '#6B7280' : '#6B7280'
            }}>
              <span style={{
                color: isLive ? '#AAFF00' : 'rgba(170, 255, 0, 0.5)',
                fontSize: '0.75rem'
              }}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {isLive ? (
        <Link
          to={member.ctaLink || '/free-score'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#AAFF00',
            color: '#0F172A',
            fontWeight: 600,
            borderRadius: '9999px',
            textDecoration: 'none',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.filter = 'brightness(1.1)';
            e.target.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.target.style.filter = 'brightness(1)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          {member.ctaText}
          <svg
            style={{
              width: '1.25rem',
              height: '1.25rem',
              marginLeft: '0.5rem',
              transition: 'transform 0.2s'
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      ) : (
        <button
          onClick={() => onNotifyClick(member)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'transparent',
            border: '2px solid rgba(170, 255, 0, 0.3)',
            color: 'rgba(170, 255, 0, 0.8)',
            fontWeight: 600,
            borderRadius: '9999px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(170, 255, 0, 0.1)';
            e.target.style.borderColor = 'rgba(170, 255, 0, 0.6)';
            e.target.style.color = '#AAFF00';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.borderColor = 'rgba(170, 255, 0, 0.3)';
            e.target.style.color = 'rgba(170, 255, 0, 0.8)';
          }}
        >
          {member.ctaText}
        </button>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default function AITeam({ onWaitlistSubmit }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      id: 'rex',
      name: 'Rex',
      role: 'AI Visibility Expert',
      description: 'Your dedicated AI employee who transforms your online presence into a customer magnet. Rex analyzes how AI search engines like ChatGPT, Perplexity, and Gemini see your business, then sends you one simple weekly task to dramatically boost your visibility.',
      status: 'live',
      ctaText: 'Get Started Free',
      ctaLink: '/free-score',
      icon: '🎯',
      features: [
        'Weekly AI visibility score & insights',
        'One actionable task per week (5-15 min)',
        'Tracks progress across ChatGPT, Perplexity & more',
        'No technical knowledge required'
      ]
    },
    {
      id: 'chloe',
      name: 'Chloe',
      role: 'AI Receptionist & Lead Capture',
      description: 'Your 24/7 virtual receptionist who never misses a beat. Chloe answers calls with natural conversation, books appointments directly into your calendar, qualifies leads, and handles customer enquiries—even while you sleep. Every call becomes an opportunity, not a missed connection.',
      status: 'coming-soon',
      launchDate: 'Q2 2026',
      ctaText: 'Join Waitlist',
      icon: '📞',
      iconColor: '#60A5FA',
      roleColor: 'rgba(96, 165, 250, 0.9)',
      gradientBg: 'linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(96, 165, 250, 0.05))',
      features: [
        'Natural voice conversations (UK accents)',
        'Instant calendar booking & SMS confirmations',
        'Lead qualification & priority routing',
        'After-hours call handling & emergency protocols'
      ]
    },
    {
      id: 'simon',
      name: 'Simon',
      role: 'AI Social Media Manager',
      description: 'Your personal social media expert who builds your brand while you focus on your craft. Simon creates scroll-stopping posts, schedules content at optimal times, showcases your best work with professional copy, and maintains a consistent presence that attracts customers and builds trust.',
      status: 'coming-soon',
      launchDate: 'Q3 2026',
      ctaText: 'Join Waitlist',
      icon: '📱',
      iconColor: '#F472B6',
      roleColor: 'rgba(244, 114, 182, 0.9)',
      gradientBg: 'linear-gradient(135deg, rgba(244, 114, 182, 0.15), rgba(244, 114, 182, 0.05))',
      features: [
        'AI-generated posts with your brand voice',
        'Automated scheduling (Facebook, Instagram, LinkedIn)',
        'Before/after showcases & customer testimonials',
        'Engagement monitoring & response suggestions'
      ]
    },
  ];

  const handleNotifyClick = (member) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  const handleWaitlistSubmit = async (email) => {
    if (onWaitlistSubmit && selectedMember) {
      await onWaitlistSubmit(email, selectedMember.id);
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        padding: '5rem 0 7rem',
        backgroundColor: '#0A0F1C',
        overflow: 'hidden'
      }}
      aria-labelledby="ai-team-heading"
    >
      <div style={{ position: 'absolute', top: 0, left: '25%', width: '24rem', height: '24rem', background: 'radial-gradient(circle, rgba(170, 255, 0, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }} aria-hidden="true" />
      <div style={{ position: 'absolute', bottom: 0, right: '25%', width: '24rem', height: '24rem', background: 'radial-gradient(circle, rgba(170, 255, 0, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }} aria-hidden="true" />

      <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.375rem 1rem',
            backgroundColor: 'rgba(170, 255, 0, 0.1)',
            border: '1px solid rgba(170, 255, 0, 0.2)',
            color: '#AAFF00',
            fontSize: '0.875rem',
            fontWeight: 500,
            borderRadius: '9999px',
            marginBottom: '1.5rem'
          }}>
            Your AI Workforce
          </span>
          <h2 id="ai-team-heading" style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 'bold',
            color: '#FFFFFF',
            marginBottom: '1rem'
          }}>
            Meet Your <span style={{ color: '#AAFF00' }}>AI Team</span>
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#9CA3AF',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Dedicated AI employees working around the clock to grow your business.
            Start with Rex today, and expand your team as we launch new members.
          </p>
        </div>

        <div 
          className="ai-team-cards-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
          {teamMembers.map((member) => (
            <TeamCard
              key={member.id}
              member={member}
              onNotifyClick={handleNotifyClick}
            />
          ))}
        </div>

        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
            More AI team members coming soon.{' '}
            <Link to="/pricing" style={{ color: '#AAFF00', textDecoration: 'none', fontWeight: 500 }}>
              View our roadmap →
            </Link>
          </p>
        </div>
      </div>

      <WaitlistModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        memberName={selectedMember?.name || ''}
        onSubmit={handleWaitlistSubmit}
      />
    </section>
  );
}

export const AITeamSimple = () => {
  return <AITeam />;
};
