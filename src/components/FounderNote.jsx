export default function FounderNote() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
      border: '2px solid rgba(132, 204, 22, 0.2)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--spacing-xl)',
      maxWidth: '700px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--color-primary-600) 0%, #65a30d 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto var(--spacing-md)',
        fontSize: '28px',
        fontWeight: 700,
        color: '#0f172a',
        boxShadow: '0 4px 12px rgba(132, 204, 22, 0.3)'
      }}>
        W
      </div>

      <blockquote style={{
        margin: 0,
        marginBottom: 'var(--spacing-lg)',
        fontSize: '18px',
        lineHeight: '1.7',
        color: '#e2e8f0',
        fontStyle: 'italic',
        fontWeight: 400
      }}>
        I personally review every customer's first month progress. If you're not seeing improvement, email me directly.
      </blockquote>

      <div style={{
        marginBottom: 'var(--spacing-md)'
      }}>
        <div style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#ffffff',
          marginBottom: '4px'
        }}>
          — The Whoza Team
        </div>
        <a
          href="mailto:hello@whoza.ai"
          style={{
            fontSize: '16px',
            color: 'var(--color-primary-600)',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#9ef01a'}
          onMouseLeave={(e) => e.target.style.color = 'var(--color-primary-600)'}
        >
          hello@whoza.ai
        </a>
      </div>

      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--spacing-sm)',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        background: 'rgba(132, 204, 22, 0.1)',
        border: '1px solid rgba(132, 204, 22, 0.3)',
        borderRadius: 'var(--radius-full)',
        fontSize: '14px',
        color: 'var(--color-primary-600)',
        fontWeight: 600
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        A real person replies within 24 hours
      </div>
    </div>
  );
}
