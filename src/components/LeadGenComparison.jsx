import { Check, X, HelpCircle } from 'lucide-react';

/**
 * Comparison table showing whoza.ai vs lead-gen platforms (Checkatrade, Bark, MyBuilder).
 * Most tradespeople already pay for these — this shows why whoza.ai is different/better.
 */
const competitors = [
  {
    name: 'Checkatrade',
    price: '£60–209/mo',
    perLead: 'Plus lead fees',
    aiVisible: false,
    youOwn: false,
    noLeadFees: false,
    note: 'You pay for every lead, even if it doesn\'t convert',
  },
  {
    name: 'Bark',
    price: '£5–30/lead',
    perLead: 'Per lead cost',
    aiVisible: false,
    youOwn: false,
    noLeadFees: false,
    note: 'Compete with 4+ other tradespeople per lead',
  },
  {
    name: 'MyBuilder',
    price: '£2–25/lead',
    perLead: 'Per shortlist entry',
    aiVisible: false,
    youOwn: false,
    noLeadFees: false,
    note: 'Pay just to be put on a shortlist',
  },
];

const features = [
  { key: 'price', label: 'Monthly cost', desc: 'What you pay every month' },
  { key: 'perLead', label: 'Per-lead fees', desc: 'Extra cost per enquiry' },
  { key: 'aiVisible', label: 'Visible in AI search', desc: 'Appears in ChatGPT, Google AI, Perplexity' },
  { key: 'youOwn', label: 'You own the channel', desc: 'Customers come direct to you, not via a platform' },
  { key: 'noLeadFees', label: 'No lead fees', desc: 'Unlimited enquiries, no extra charges' },
];

export default function LeadGenComparison() {
  return (
    <section className="section scroll-reveal" style={{ background: 'var(--color-bg)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <p style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-primary-600)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 'var(--spacing-sm)',
          }}>
            Already paying for leads?
          </p>
          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 36px)',
            fontWeight: 'bold',
            color: 'var(--color-text)',
            marginBottom: 'var(--spacing-sm)',
            lineHeight: 1.2,
          }}>
            Stop paying for every lead
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Lead generation platforms charge you per enquiry — and you still have to win the job. 
            whoza.ai builds your own visibility channel so customers find <strong>you</strong> directly.
          </p>
        </div>

        {/* Comparison Table */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid rgba(0,0,0,0.06)',
        }}>
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1.2fr',
            gap: '0',
            background: '#F8FAFC',
            borderBottom: '2px solid #E2E8F0',
          }}>
            <div style={{ padding: '16px 20px', fontWeight: 600, fontSize: '14px', color: '#64748B' }}>
              Feature
            </div>
            {competitors.map((c) => (
              <div key={c.name} style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 600, fontSize: '14px', color: '#64748B' }}>
                {c.name}
              </div>
            ))}
            <div style={{
              padding: '16px 12px',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '14px',
              color: 'var(--color-primary-700)',
              background: 'rgba(132, 204, 22, 0.05)',
            }}>
              whoza.ai
            </div>
          </div>

          {/* Rows */}
          {features.map((feature, i) => (
            <div
              key={feature.key}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1.2fr',
                borderBottom: i < features.length - 1 ? '1px solid #F1F5F9' : 'none',
                alignItems: 'center',
              }}
            >
              {/* Feature label */}
              <div style={{ padding: '16px 20px' }}>
                <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text)', margin: 0 }}>
                  {feature.label}
                </p>
                <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0' }}>
                  {feature.desc}
                </p>
              </div>

              {/* Competitor values */}
              {competitors.map((c) => (
                <div key={c.name} style={{ padding: '16px 12px', textAlign: 'center' }}>
                  {feature.key === 'price' && (
                    <span style={{ fontSize: '14px', color: 'var(--color-text)', fontWeight: 500 }}>
                      {c.price}
                    </span>
                  )}
                  {feature.key === 'perLead' && (
                    <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>
                      {c.perLead}
                    </span>
                  )}
                  {(feature.key === 'aiVisible' || feature.key === 'youOwn' || feature.key === 'noLeadFees') && (
                    <X className="w-5 h-5 mx-auto text-red-400" />
                  )}
                </div>
              ))}

              {/* whoza.ai column */}
              <div style={{
                padding: '16px 12px',
                textAlign: 'center',
                background: i % 2 === 0 ? 'rgba(132, 204, 22, 0.03)' : 'rgba(132, 204, 22, 0.05)',
              }}>
                {feature.key === 'price' && (
                  <span style={{ fontSize: '14px', color: 'var(--color-primary-700)', fontWeight: 700 }}>
                    £59/mo flat
                  </span>
                )}
                {feature.key === 'perLead' && (
                  <span style={{ fontSize: '14px', color: 'var(--color-primary-700)', fontWeight: 600 }}>
                    None
                  </span>
                )}
                {(feature.key === 'aiVisible' || feature.key === 'youOwn' || feature.key === 'noLeadFees') && (
                  <Check className="w-5 h-5 mx-auto text-green-500" />
                )}
              </div>
            </div>
          ))}

          {/* whoza.ai highlight row */}
          <div style={{
            background: 'linear-gradient(135deg, #ECFDF5, #F0FDF4)',
            padding: '20px',
            textAlign: 'center',
          }}>
            <p style={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--color-primary-700)',
              margin: 0,
            }}>
              whoza.ai: £59/month flat fee. No per-lead costs. You own the customer relationship.
            </p>
          </div>
        </div>

        {/* Notes for each competitor */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--spacing-md)',
          marginTop: 'var(--spacing-lg)',
        }}>
          {competitors.map((c) => (
            <div key={c.name} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              padding: '12px',
              background: '#F8FAFC',
              borderRadius: '12px',
            }}>
              <HelpCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--color-text)' }}>{c.name}:</strong> {c.note}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
          <p style={{
            fontSize: '18px',
            color: 'var(--color-text)',
            marginBottom: 'var(--spacing-md)',
            fontWeight: 500,
          }}>
            Switch from paying per lead to owning your visibility
          </p>
          <a
            href="/start"
            className="button button-primary btn-hover"
            style={{ fontSize: '18px', padding: '16px 32px' }}
          >
            Start Free 14-Day Trial
          </a>
          <p style={{ fontSize: '14px', color: '#94A3B8', marginTop: 'var(--spacing-sm)' }}>
            No credit card required · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
