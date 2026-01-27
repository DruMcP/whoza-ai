import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from './icons/Icon';

// Typing animation component
const TypingText = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 20);

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, text, delay]);

  return (
    <span ref={ref}>
      {displayedText}
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ marginLeft: '2px' }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

// AI Avatar component
const AIAvatar = ({ type = 'chatgpt' }) => {
  const avatars = {
    chatgpt: (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="12" cy="12" r="10" fill="#10A37F"/>
        <path d="M12 6v12M6 12h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    google: (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="12" cy="12" r="10" fill="#4285F4"/>
        <path d="M12 8l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  };

  return (
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      overflow: 'hidden',
      flexShrink: 0,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    }}>
      {avatars[type]}
    </div>
  );
};

export default function AIAnswerShift() {
  return (
    <section style={{
      padding: 'var(--spacing-3xl) var(--spacing-lg)',
      background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.5) 0%, rgba(17, 24, 39, 0.8) 100%)',
      borderTop: '1px solid rgba(132, 204, 22, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          textAlign: 'center',
          marginBottom: 'var(--spacing-2xl)'
        }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-block',
              padding: 'var(--spacing-xs) var(--spacing-md)',
              background: 'rgba(132, 204, 22, 0.1)',
              border: '1px solid rgba(132, 204, 22, 0.3)',
              borderRadius: 'var(--radius-full)',
              fontSize: '14px',
              color: 'var(--color-primary-400)',
              marginBottom: 'var(--spacing-lg)',
              fontWeight: '600'
            }}
          >
            Illustrative example (pre-launch)
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: 'clamp(28px, 5vw, 36px)',
              fontWeight: 'bold',
              marginBottom: 'var(--spacing-md)',
              color: 'white',
              lineHeight: '1.2'
            }}
          >
            How AI answers change
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: '18px',
              color: '#D1D5DB',
              maxWidth: '700px',
              margin: '0 auto'
            }}
          >
            When your business becomes clearer and safer to recommend
          </motion.p>
        </div>

        <div style={{
          display: 'grid',
          gap: 'var(--spacing-xl)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          {/* BEFORE - ChatGPT Style */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: '#2A2B32',
              border: '2px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '16px',
              padding: '24px',
              position: 'relative',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            {/* ChatGPT Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <AIAvatar type="chatgpt" />
              <div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  marginBottom: '2px'
                }}>
                  ChatGPT
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#9CA3AF'
                }}>
                  AI Assistant
                </div>
              </div>
              <div style={{
                marginLeft: 'auto',
                padding: '4px 12px',
                background: 'rgba(239, 68, 68, 0.2)',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#FCA5A5',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Before
              </div>
            </div>

            {/* Message Content */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '16px',
              borderLeft: '3px solid rgba(239, 68, 68, 0.5)'
            }}>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#E5E7EB',
                margin: 0
              }}>
                "For boiler repairs, look for a Gas Safe engineer near you."
              </p>
            </div>

            {/* Problem indicator */}
            <div style={{
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: '#FCA5A5'
            }}>
              <Icon name="CloseIcon" size={16} />
              <span>Generic answer - no specific recommendation</span>
            </div>
          </motion.div>

          {/* Arrow Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-primary-600), #a8d91f)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(132, 204, 22, 0.5)'
            }}>
              <Icon name="ArrowRightIcon" size={24} style={{ color: 'white', transform: 'rotate(90deg)' }} />
            </div>
          </motion.div>

          {/* AFTER - ChatGPT Style with Typing Effect */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              background: '#2A2B32',
              border: '2px solid var(--color-primary-600)',
              borderRadius: '16px',
              padding: '24px',
              position: 'relative',
              boxShadow: '0 0 40px rgba(132, 204, 22, 0.25)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {/* ChatGPT Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <AIAvatar type="chatgpt" />
              <div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  marginBottom: '2px'
                }}>
                  ChatGPT
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#9CA3AF'
                }}>
                  AI Assistant
                </div>
              </div>
              <div style={{
                marginLeft: 'auto',
                padding: '4px 12px',
                background: 'rgba(132, 204, 22, 0.2)',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--color-primary-400)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                After
              </div>
            </div>

            {/* Message Content with Typing Effect */}
            <div style={{
              background: 'rgba(132, 204, 22, 0.08)',
              borderRadius: '12px',
              padding: '16px',
              borderLeft: '3px solid var(--color-primary-600)'
            }}>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#E5E7EB',
                margin: 0
              }}>
                "<TypingText 
                  text="ABC Heating is a Gas Safe registered boiler repair specialist serving Bristol, known for fast response and transparent pricing." 
                  delay={800}
                />"
              </p>
            </div>

            {/* Success indicator with highlighted business name */}
            <div style={{
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: 'var(--color-primary-400)'
            }}>
              <Icon name="CheckIcon" size={16} />
              <span>
                <strong style={{ color: '#AAFF00' }}>ABC Heating</strong> recommended by name!
              </span>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            textAlign: 'center',
            padding: '32px',
            background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.1), rgba(132, 204, 22, 0.05))',
            borderRadius: '16px',
            border: '2px solid rgba(132, 204, 22, 0.3)',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(132, 204, 22, 0.1), transparent)',
            pointerEvents: 'none'
          }} />
          
          <p style={{
            fontSize: '18px',
            color: '#E5E7EB',
            marginBottom: '20px',
            lineHeight: '1.6',
            fontWeight: '600',
            position: 'relative',
            zIndex: 1
          }}>
            This shows how AI answers change when a business becomes clearer and safer to recommend.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <Link
              to="/free-score"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                background: 'linear-gradient(135deg, var(--color-primary-600), #a8d91f)',
                color: '#0F172A',
                fontSize: '16px',
                fontWeight: '700',
                borderRadius: '50px',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(132, 204, 22, 0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              <span>This could be you</span>
              <Icon name="ArrowRightIcon" size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(132, 204, 22, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
    </section>
  );
}
