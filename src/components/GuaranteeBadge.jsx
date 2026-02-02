import Icon from './icons/Icon';

export default function GuaranteeBadge({ variant = 'default' }) {
  const styles = {
    default: {
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      border: '2px solid #fbbf24',
      color: '#78350f'
    },
    inline: {
      background: 'transparent',
      border: 'none',
      color: 'var(--color-text-secondary)'
    }
  };

  const style = styles[variant] || styles.default;

  if (variant === 'inline') {
    return (
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '14px',
        color: style.color,
        marginTop: 'var(--spacing-sm)'
      }}>
        <Icon name="check-circle" size={16} color="var(--color-primary-600)" />
        <span>30-Day Money-Back Guarantee</span>
      </div>
    );
  }

  return (
    <div style={{
      background: style.background,
      border: style.border,
      borderRadius: 'var(--radius-md)',
      padding: 'var(--spacing-md)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-sm)',
      maxWidth: 'fit-content',
      margin: '0 auto',
      marginTop: 'var(--spacing-md)'
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: '#fbbf24',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <Icon name="check-circle" size={20} style={{ color: '#78350f' }} />
      </div>
      <div style={{
        fontSize: '15px',
        fontWeight: 600,
        color: style.color
      }}>
        30-Day Money-Back Guarantee · Try Risk-Free
      </div>
    </div>
  );
}
