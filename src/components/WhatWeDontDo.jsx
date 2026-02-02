import Icon from './icons/Icon';

export default function WhatWeDontDo() {
  return (
    <section style={{
      padding: 'var(--spacing-3xl) var(--spacing-lg)',
      background: '#0a0f1a',
      borderTop: '2px solid rgba(132, 204, 22, 0.3)',
      borderBottom: '2px solid rgba(132, 204, 22, 0.3)'
    }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{
          fontSize: '36px',
          marginBottom: 'var(--spacing-md)',
          color: '#ffffff',
          fontWeight: 'bold'
        }}>
          What We Don't Do
        </h2>
        <p style={{
          fontSize: '19px',
          color: '#F3F4F6',
          marginBottom: 'var(--spacing-2xl)',
          maxWidth: '700px',
          margin: '0 auto var(--spacing-2xl)',
          fontWeight: '500'
        }}>
          Complete transparency. Here's what we don't do:
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--spacing-xl)',
          textAlign: 'left'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid rgba(132, 204, 22, 0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-xl)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'rgba(132, 204, 22, 0.15)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--spacing-md)',
              color: '#84CC16',
              fontSize: '28px',
              fontWeight: 'bold',
              border: '2px solid rgba(132, 204, 22, 0.3)'
            }}>
              ✗
            </div>
            <h3 style={{
              fontSize: '22px',
              marginBottom: 'var(--spacing-sm)',
              color: '#ffffff',
              fontWeight: 'bold'
            }}>
              No position guarantees
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#E5E7EB',
              lineHeight: '1.7',
              margin: 0
            }}>
              We help you improve, but we can't guarantee you'll be named in every AI answer. AI search is too unpredictable for that.
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid rgba(132, 204, 22, 0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-xl)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'rgba(132, 204, 22, 0.15)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--spacing-md)',
              color: '#84CC16',
              fontSize: '28px',
              fontWeight: 'bold',
              border: '2px solid rgba(132, 204, 22, 0.3)'
            }}>
              ✗
            </div>
            <h3 style={{
              fontSize: '22px',
              marginBottom: 'var(--spacing-sm)',
              color: '#ffffff',
              fontWeight: 'bold'
            }}>
              No account access
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#E5E7EB',
              lineHeight: '1.7',
              margin: 0
            }}>
              We never ask for passwords or access to your Google, social media, or business accounts. You do everything yourself.
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid rgba(132, 204, 22, 0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-xl)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'rgba(132, 204, 22, 0.15)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--spacing-md)',
              color: '#84CC16',
              fontSize: '28px',
              fontWeight: 'bold',
              border: '2px solid rgba(132, 204, 22, 0.3)'
            }}>
              ✗
            </div>
            <h3 style={{
              fontSize: '22px',
              marginBottom: 'var(--spacing-sm)',
              color: '#ffffff',
              fontWeight: 'bold'
            }}>
              No posting without approval
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#E5E7EB',
              lineHeight: '1.7',
              margin: 0
            }}>
              Every task requires your review and approval first. Nothing goes live without your say-so.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
