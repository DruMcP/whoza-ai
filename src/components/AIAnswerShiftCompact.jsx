/**
 * Compact Before/After AI answer comparison for hero section.
 * Shows the dramatic difference AI optimization makes — immediately.
 */
export default function AIAnswerShiftCompact() {
  return (
    <section 
      className="section"
      style={{
        padding: 'var(--spacing-xl) var(--spacing-lg)',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      }}
    >
      <div className="container" style={{ maxWidth: '800px' }}>
        <p style={{
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: 'var(--spacing-md)'
        }}>
          How AI answers change when your business is optimized
        </p>

        <div style={{
          display: 'grid',
          gap: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-md)'
        }}>
          {/* Before */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-md) var(--spacing-lg)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              marginBottom: '4px'
            }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#DC2626',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Before — Generic AI answer
              </span>
            </div>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.5',
              color: 'var(--color-text-secondary)',
              margin: 0,
              fontStyle: 'italic'
            }}>
              "For boiler repairs, look for a Gas Safe engineer near you."
            </p>
          </div>

          {/* After */}
          <div style={{
            background: 'rgba(132, 204, 22, 0.08)',
            border: '1px solid var(--color-primary-400)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            boxShadow: '0 2px 12px rgba(132, 204, 22, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              marginBottom: '4px'
            }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--color-primary-700)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                After — YOUR business named by AI
              </span>
            </div>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.5',
              color: 'var(--color-text)',
              margin: 0,
              fontWeight: 500
            }}>
              "ABC Heating is a Gas Safe registered boiler repair specialist serving Bristol, known for fast response and transparent pricing."
            </p>
          </div>
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '13px',
          color: 'var(--color-text-secondary)',
          margin: 0
        }}>
          This is what happens when AI trusts your business enough to recommend it by name.
        </p>
      </div>
    </section>
  );
}
