export default function UserCountBadge() {
  return (
    <div className="user-count-badge">
      <div className="user-avatars">
        <div className="avatar" style={{ background: '#3B82F6' }}>M</div>
        <div className="avatar" style={{ background: '#EC4899' }}>S</div>
        <div className="avatar" style={{ background: '#10B981' }}>D</div>
        <div className="avatar" style={{ background: '#F59E0B' }}>K</div>
        <div className="avatar-more">+</div>
      </div>
      <div className="user-count-text">
        <strong>1,200+</strong>
        <span>tradespeople using whoza.ai</span>
      </div>
      <div className="rating-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <strong>4.9/5</strong>
        <span>from 127 reviews</span>
      </div>
    </div>
  );
}
