import Icon from './icons/Icon';

export default function ProofCard() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.08) 0%, rgba(132, 204, 22, 0.04) 100%)',
      border: '2px solid rgba(132, 204, 22, 0.3)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--spacing-lg)',
      maxWidth: '450px',
      margin: '0 auto',
      marginTop: 'var(--spacing-xl)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-sm)',
        marginBottom: 'var(--spacing-md)'
      }}>
        <div style={{
          fontSize: '24px'
        }}>
          📈
        </div>
        <h3 style={{
          margin: 0,
          fontSize: '18px',
          fontWeight: 700,
          color: 'var(--color-primary-600)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Real Result
        </h3>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--spacing-md)',
        marginBottom: 'var(--spacing-md)'
      }}>
        <div style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#1a1a2e',
          marginBottom: 'var(--spacing-sm)'
        }}>
          Brighton Plumber
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--spacing-xs)',
          flexWrap: 'wrap',
          gap: 'var(--spacing-xs)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md)',
            fontSize: '28px',
            fontWeight: 700
          }}>
            <span style={{ color: '#ef4444' }}>23</span>
            <span style={{ 
              color: '#1a1a2e',
              fontWeight: 600,
              fontSize: '24px'
            }}>→</span>
            <span style={{ color: 'var(--color-primary-600)' }}>67</span>
          </div>
          <span style={{
            fontSize: '14px',
            color: '#374151',
            fontWeight: 400
          }}>
            Visibility Score
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--spacing-sm)',
          fontSize: '14px',
          color: '#374151',
          marginTop: 'var(--spacing-sm)'
        }}>
          <div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Icon name="CheckIcon" size={16} color="var(--color-primary-600)" />
              Time: 6 weeks
            </span>
          </div>
          <div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Icon name="CheckIcon" size={16} color="var(--color-primary-600)" />
              First AI mention: Week 4
            </span>
          </div>
        </div>
      </div>

      <blockquote style={{
        margin: 0,
        padding: 'var(--spacing-md)',
        background: 'rgba(255, 255, 255, 0.03)',
        borderLeft: '3px solid var(--color-primary-600)',
        borderRadius: 'var(--radius-sm)',
        fontStyle: 'italic',
        color: '#1f2937',
        fontSize: '15px',
        lineHeight: '1.6',
        marginBottom: 'var(--spacing-md)'
      }}>
        I got my first call from someone who said ChatGPT recommended me
      </blockquote>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-xs)',
        fontSize: '13px',
        color: 'var(--color-primary-600)',
        fontWeight: 600
      }}>
        <div style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'var(--color-primary-600)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon name="CheckIcon" size={12} style={{ color: '#0f172a' }} />
        </div>
        Verified Whoza Customer
      </div>
    </div>
  );
}
