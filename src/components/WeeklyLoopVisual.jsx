export default function WeeklyLoopVisual() {
  const steps = [
    { week: 'Week 1', icon: '📊', label: 'Score', color: '#3b82f6' },
    { week: 'Week 2', icon: '📋', label: 'Tasks', color: '#8b5cf6' },
    { week: 'Week 3', icon: '✅', label: 'Do', color: '#10b981' },
    { week: 'Week 4', icon: '📈', label: 'Results', color: '#84CC16' }
  ];

  return (
    <div style={{
      background: 'rgba(132, 204, 22, 0.05)',
      border: '2px solid rgba(132, 204, 22, 0.2)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--spacing-xl)',
      marginTop: 'var(--spacing-xl)'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: 'var(--spacing-lg)'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: 'var(--spacing-xs)'
        }}>
          Your Weekly Loop
        </h3>
        <p style={{
          fontSize: '15px',
          color: 'var(--color-text-secondary)',
          margin: 0
        }}>
          Simple, predictable progress every month
        </p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-md)',
        flexWrap: 'wrap',
        position: 'relative',
        marginBottom: 'var(--spacing-lg)'
      }}>
        {steps.map((step, index) => (
          <div key={index} style={{ position: 'relative', flex: '1', minWidth: '120px' }}>
            <div style={{
              textAlign: 'center'
            }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${step.color}22 0%, ${step.color}11 100%)`,
                border: `3px solid ${step.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                margin: '0 auto var(--spacing-sm)',
                boxShadow: `0 4px 12px ${step.color}33`
              }}>
                {step.icon}
              </div>
              <div style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                marginBottom: '4px'
              }}>
                {step.week}
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#ffffff'
              }}>
                {step.label}
              </div>
            </div>

            {index < steps.length - 1 && (
              <div style={{
                position: 'absolute',
                top: '36px',
                right: '-12px',
                fontSize: '24px',
                color: 'var(--color-primary-600)',
                zIndex: 1,
                transform: 'translateX(50%)'
              }}>
                →
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--spacing-sm)',
        padding: 'var(--spacing-md)',
        background: 'rgba(132, 204, 22, 0.1)',
        borderRadius: 'var(--radius-md)',
        marginTop: 'var(--spacing-md)'
      }}>
        <div style={{
          fontSize: '28px',
          animation: 'spin 3s linear infinite'
        }}>
          🔄
        </div>
        <div style={{
          fontSize: '15px',
          color: 'var(--color-primary-600)',
          fontWeight: 600
        }}>
          This loop repeats every month, building your visibility consistently
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
