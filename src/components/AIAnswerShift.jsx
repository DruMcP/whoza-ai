import Icon from './icons/Icon';

export default function AIAnswerShift() {
  return (
    <section style={{
      padding: 'var(--spacing-3xl) var(--spacing-lg)',
      background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.5) 0%, rgba(17, 24, 39, 0.8) 100%)',
      borderTop: '1px solid rgba(132, 204, 22, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          textAlign: 'center',
          marginBottom: 'var(--spacing-2xl)'
        }}>
          <div style={{
            display: 'inline-block',
            padding: 'var(--spacing-xs) var(--spacing-md)',
            background: 'rgba(132, 204, 22, 0.1)',
            border: '1px solid rgba(132, 204, 22, 0.3)',
            borderRadius: 'var(--radius-full)',
            fontSize: '14px',
            color: 'var(--color-primary-400)',
            marginBottom: 'var(--spacing-lg)',
            fontWeight: '600'
          }}>
            Illustrative example (pre-launch)
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 36px)',
            fontWeight: 'bold',
            marginBottom: 'var(--spacing-md)',
            color: 'white',
            lineHeight: '1.2'
          }}>
            How AI answers change
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#D1D5DB',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            When your business becomes clearer and safer to recommend
          </p>
        </div>

        <div style={{
          display: 'grid',
          gap: 'var(--spacing-xl)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          <div style={{
            background: 'rgba(239, 68, 68, 0.08)',
            border: '2px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-xl)',
            position: 'relative',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              marginBottom: 'var(--spacing-md)'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon name="CloseIcon" size={18} style={{ color: '#FCA5A5' }} />
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#FCA5A5',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Before
              </span>
            </div>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#E5E7EB',
              margin: 0,
              fontStyle: 'italic'
            }}>
              "For boiler repairs, look for a Gas Safe engineer near you."
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--color-primary-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(132, 204, 22, 0.3)'
            }}>
              <Icon name="ArrowRightIcon" size={20} style={{ color: 'white', transform: 'rotate(90deg)' }} />
            </div>
          </div>

          <div style={{
            background: 'rgba(132, 204, 22, 0.08)',
            border: '2px solid var(--color-primary-600)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-xl)',
            position: 'relative',
            boxShadow: '0 0 30px rgba(132, 204, 22, 0.15)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              marginBottom: 'var(--spacing-md)'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(132, 204, 22, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon name="CheckIcon" size={18} style={{ color: '#A3E635' }} />
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--color-primary-400)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                After
              </span>
            </div>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#E5E7EB',
              margin: 0,
              fontStyle: 'italic'
            }}>
              "ABC Heating is a Gas Safe registered boiler repair specialist serving Bristol, known for fast response and transparent pricing."
            </p>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          padding: 'var(--spacing-lg)',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{
            fontSize: '16px',
            color: '#E5E7EB',
            margin: 0,
            lineHeight: '1.6',
            fontWeight: '600'
          }}>
            This shows how AI answers change when a business becomes clearer and safer to recommend.
          </p>
        </div>
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
