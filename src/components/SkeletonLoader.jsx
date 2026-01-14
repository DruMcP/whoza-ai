export function SkeletonCard() {
  return (
    <div className="glass-card">
      <div className="skeleton-loader" style={{ width: '100%', height: '300px', borderRadius: '20px' }}></div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton-loader"
          style={{
            height: '16px',
            marginBottom: '12px',
            width: `${100 - (i * 10)}%`,
            borderRadius: '8px'
          }}
        ></div>
      ))}
    </div>
  );
}

export function SkeletonTitle() {
  return (
    <div
      className="skeleton-loader"
      style={{
        height: '32px',
        width: '70%',
        marginBottom: '16px',
        borderRadius: '12px'
      }}
    ></div>
  );
}

export function SkeletonTestimonial() {
  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div
        className="skeleton-loader"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          marginBottom: '16px'
        }}
      ></div>
      <SkeletonTitle />
      <SkeletonText lines={4} />
      <div
        className="skeleton-loader"
        style={{
          width: '40%',
          height: '16px',
          marginTop: '12px',
          borderRadius: '8px'
        }}
      ></div>
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div style={{
      display: 'grid',
      gap: '24px',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
    }}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

export default {
  Card: SkeletonCard,
  Text: SkeletonText,
  Title: SkeletonTitle,
  Testimonial: SkeletonTestimonial,
  Dashboard: SkeletonDashboard
};
