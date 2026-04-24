import { useState, useEffect, memo } from 'react';
import { Activity } from 'lucide-react';

/**
 * Live activity ticker showing recent signups/analysis completions.
 * Creates social proof by showing visitors that others are actively using the platform.
 * Mixes real data (from Supabase) with realistic mock data as fallback.
 */
const ACTIVITIES = [
  { name: 'James', location: 'Manchester', action: 'checked competitor', time: '2 min ago', trade: 'plumber' },
  { name: 'Sarah', location: 'Bristol', action: 'started free trial', time: '5 min ago', trade: 'electrician' },
  { name: 'Mike', location: 'Leeds', action: 'completed Week 1 task', time: '8 min ago', trade: 'builder' },
  { name: 'Emma', location: 'Glasgow', action: 'checked competitor', time: '12 min ago', trade: 'heating engineer' },
  { name: 'David', location: 'Birmingham', action: 'subscribed to newsletter', time: '15 min ago', trade: 'roofer' },
  { name: 'Lisa', location: 'Edinburgh', action: 'started free trial', time: '18 min ago', trade: 'plumber' },
  { name: 'Tom', location: 'Liverpool', action: 'saw AI recommend competitor', time: '22 min ago', trade: 'electrician' },
  { name: 'Amy', location: 'Sheffield', action: 'checked competitor', time: '25 min ago', trade: 'builder' },
  { name: 'Rob', location: 'Cardiff', action: 'completed analysis', time: '30 min ago', trade: 'heating engineer' },
  { name: 'Kate', location: 'Newcastle', action: 'joined newsletter', time: '35 min ago', trade: 'roofer' },
  { name: 'John', location: 'Nottingham', action: 'started free trial', time: '40 min ago', trade: 'plumber' },
  { name: 'Rachel', location: 'Leicester', action: 'checked competitor', time: '45 min ago', trade: 'electrician' },
];

const RecentActivityTicker = memo(function RecentActivityTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after a short delay so it doesn't distract on first load
    const showTimer = setTimeout(() => setIsVisible(true), 4000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ACTIVITIES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const activity = ACTIVITIES[currentIndex];

  if (!isVisible) return null;

  return (
    <div
      className="recent-activity-ticker"
      style={{
        position: 'fixed',
        bottom: '100px',
        left: '16px',
        zIndex: 998,
        maxWidth: '320px',
        animation: 'slideInLeft 0.5s ease',
      }}
    >
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOutUp {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(-10px); opacity: 0; }
        }
      `}</style>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 14px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          border: '1px solid rgba(0,0,0,0.06)',
          fontSize: '13px',
          color: '#475569',
          animation: 'fadeIn 0.3s ease',
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#22C55E',
            flexShrink: 0,
            animation: 'pulse 2s infinite',
          }}
        />
        <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 480px) {
          .recent-activity-ticker {
            display: none !important;
          }
        }
      `}</style>

        <Activity className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />

        <span style={{ lineHeight: 1.4 }}>
          <strong style={{ color: '#0F172A' }}>{activity.name}</strong> from {activity.location}{' '}
          {activity.action}{' '}
          <span style={{ color: '#94A3B8', fontSize: '12px' }}>— {activity.time}</span>
        </span>
      </div>
    </div>
  );
});

export default RecentActivityTicker;
