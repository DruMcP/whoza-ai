import Icon from './icons/Icon';

export default function WhoItsFor() {
  return (
    <section style={{
      padding: 'var(--spacing-3xl) var(--spacing-lg)',
      background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.08) 0%, rgba(132, 204, 22, 0.03) 100%)',
      borderTop: '1px solid rgba(132, 204, 22, 0.2)',
      borderBottom: '1px solid rgba(132, 204, 22, 0.2)'
    }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--spacing-2xl)',
          alignItems: 'start'
        }}>
          <div style={{
            background: 'rgba(132, 204, 22, 0.1)',
            border: '2px solid var(--color-primary-600)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-xl)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              <Icon name="CheckIcon" size={28} style={{ color: 'var(--color-primary-600)' }} />
              <h3 style={{ fontSize: '24px', margin: 0, color: '#111827', fontWeight: 'bold' }}>Who it's for</h3>
            </div>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-sm)'
            }}>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                fontSize: '16px',
                color: '#1F2937',
                fontWeight: '500'
              }}>
                <Icon name="CheckIcon" size={20} style={{ color: 'var(--color-primary-600)', flexShrink: 0 }} />
                Trades & local services
              </li>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                fontSize: '16px',
                color: '#1F2937',
                fontWeight: '500'
              }}>
                <Icon name="CheckIcon" size={20} style={{ color: 'var(--color-primary-600)', flexShrink: 0 }} />
                Plumbers, electricians, roofers
              </li>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                fontSize: '16px',
                color: '#1F2937',
                fontWeight: '500'
              }}>
                <Icon name="CheckIcon" size={20} style={{ color: 'var(--color-primary-600)', flexShrink: 0 }} />
                Builders, heating engineers
              </li>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                fontSize: '16px',
                color: '#1F2937',
                fontWeight: '500'
              }}>
                <Icon name="CheckIcon" size={20} style={{ color: 'var(--color-primary-600)', flexShrink: 0 }} />
                Accountants, clinics, solicitors
              </li>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                fontSize: '16px',
                color: '#1F2937',
                fontWeight: '500'
              }}>
                <Icon name="CheckIcon" size={20} style={{ color: 'var(--color-primary-600)', flexShrink: 0 }} />
                Solo operators to 50-person firms
              </li>
            </ul>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            border: '2px solid rgba(255, 255, 255, 0.35)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-xl)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              <Icon name="CloseIcon" size={28} style={{ color: '#1F2937' }} />
              <h3 style={{ fontSize: '24px', margin: 0, color: '#111827', fontWeight: 'bold' }}>Not for</h3>
            </div>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-sm)'
            }}>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                fontSize: '16px',
                color: '#1F2937',
                fontWeight: '500'
              }}>
                <Icon name="CloseIcon" size={20} style={{ color: '#374151', flexShrink: 0 }} />
                Ecommerce stores
              </li>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                fontSize: '16px',
                color: '#1F2937',
                fontWeight: '500'
              }}>
                <Icon name="CloseIcon" size={20} style={{ color: '#374151', flexShrink: 0 }} />
                National brands
              </li>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                fontSize: '16px',
                color: '#1F2937',
                fontWeight: '500'
              }}>
                <Icon name="CloseIcon" size={20} style={{ color: '#374151', flexShrink: 0 }} />
                SaaS companies
              </li>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                fontSize: '16px',
                color: '#1F2937',
                fontWeight: '500'
              }}>
                <Icon name="CloseIcon" size={20} style={{ color: '#374151', flexShrink: 0 }} />
                Growth hackers
              </li>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                fontSize: '16px',
                color: '#1F2937',
                fontWeight: '500'
              }}>
                <Icon name="CloseIcon" size={20} style={{ color: '#374151', flexShrink: 0 }} />
                Digital product creators
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
