import { Star } from 'lucide-react';

export default function TrustBadge() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 24px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '50px',
        fontSize: '15px',
        color: '#ffffff'
      }}
      role="img"
      aria-label="5.0 out of 5 star rating from 15 Google reviews"
    >
      <Star
        size={20}
        style={{ color: '#c4f135', fill: '#c4f135' }}
        aria-hidden="true"
      />
      <span style={{ fontWeight: '600' }}>
        5.0/5 rating from <strong style={{ color: '#c4f135' }}>15 Google reviews</strong>
      </span>
    </div>
  );
}
