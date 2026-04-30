import { useEffect, useRef } from 'react';

// ─── helpers ──────────────────────────────────────────────
const cardBg = 'rgba(255,255,255,0.03)';
const cardBorder = '1px solid rgba(255,255,255,0.06)';
const indigo = '#4f46e5';
const white = '#f8fafc';
const slate400 = '#94a3b8';
const slate500 = '#64748b';

const agentColors = {
  Katie: { border: '#f43f5e', bg: '#f43f5e' },     // rose
  Mark:  { border: '#10b981', bg: '#10b981' },     // emerald
  Rex:   { border: '#f59e0b', bg: '#f59e0b' },     // amber
  Claire:{ border: '#8b5cf6', bg: '#8b5cf6' },     // violet
};

function Avatar({ initial, color, size = 32 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: size > 28 ? '0.85rem' : '0.7rem',
        fontWeight: 700,
        flexShrink: 0,
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      }}
    >
      {initial}
    </div>
  );
}

function Pulse({ color }) {
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: color,
        display: 'inline-block',
        position: 'relative',
      }}
    >
      <span
        style={{
          position: 'absolute',
          inset: -3,
          borderRadius: '50%',
          border: `1.5px solid ${color}`,
          opacity: 0.4,
        }}
      />
    </span>
  );
}

function Dot({ color }) {
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: color,
        display: 'inline-block',
      }}
    />
  );
}

const metrics = [
  { label: 'Calls Today', value: '24', change: '↑ 12% vs yesterday', icon: 'phone' },
  { label: 'Jobs Booked', value: '18', change: '/ 40 included', icon: 'calendar-check' },
  { label: 'Missed Recovered', value: '7', change: '→ £1,260 revenue', icon: 'phone-missed' },
  { label: 'AI Uptime', value: '99.2%', change: '', icon: 'bot' },
];

const activity = [
  { agent: 'Katie', text: 'Katie booked: Boiler service — Mrs. Wilson, £145', time: '2 min ago' },
  { agent: 'Mark',  text: 'Mark replied to 3 Google reviews', time: '15 min ago' },
  { agent: 'Rex',   text: 'Rex captured lead: Emergency leak — Mr. Brown', time: '32 min ago' },
  { agent: 'Claire',text: 'Claire posted: Before/after bathroom remodel', time: '1 hr ago' },
  { agent: 'Katie', text: 'Katie recovered: Missed call → booked tap repair', time: '2 hr ago' },
];

const agents = [
  { name: 'Katie', status: 'On Call',   pulse: 'green',  activity: 'Handling 3 active calls' },
  { name: 'Mark',  status: 'Monitoring', pulse: 'blue',   activity: '3 reviews pending reply' },
  { name: 'Rex',   status: 'Standby',   pulse: 'amber',  activity: '0 leads in queue' },
  { name: 'Claire',status: 'Posting',   pulse: 'violet', activity: 'Next post: 14:00' },
];

const pulseColorMap = {
  green:  '#10b981',
  blue:   '#3b82f6',
  amber:  '#f59e0b',
  violet: '#8b5cf6',
};

// simple svg icons
function Icon({ name, size = 18 }) {
  const s = { width: size, height: size, stroke: 'currentColor', fill: 'none', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'phone':
      return <svg viewBox="0 0 24 24" style={s}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
    case 'calendar-check':
      return <svg viewBox="0 0 24 24" style={s}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg>;
    case 'phone-missed':
      return <svg viewBox="0 0 24 24" style={s}><line x1="23" y1="1" x2="17" y2="7"/><line x1="17" y1="1" x2="23" y2="7"/><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
    case 'bot':
      return <svg viewBox="0 0 24 24" style={s}><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>;
    default:
      return null;
  }
}

export default function DashboardPreview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    el.querySelectorAll('.ds-reveal').forEach((child) => obs.observe(child));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="ds-reveal"
      style={{
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        padding: '5rem 0',
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
      }}
      aria-label="Dashboard preview"
    >
      <style>{`
        @media (max-width: 767px) {
          .dash-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .dash-main { flex-direction: column !important; }
          .dash-left { width: 100% !important; }
          .dash-right { width: 100% !important; }
        }
      `}</style>

      <div className="ds-container">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2
            className="font-extrabold tracking-tight mb-3"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: white,
              fontFamily: 'var(--font-heading, system-ui)',
            }}
          >
            Your Command Centre
          </h2>
          <p
            className="max-w-lg mx-auto"
            style={{ color: slate400, fontSize: '1.125rem', lineHeight: 1.5 }}
          >
            See every call, booking, and review — handled automatically, visible instantly.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div
          style={{
            background: '#0b1220',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            boxShadow: '0 24px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.03)',
            overflow: 'hidden',
            maxWidth: 1100,
            margin: '0 auto',
          }}
        >
          {/* ── Top Bar ── */}
          <div
            className="flex items-center justify-between"
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-center gap-3">
              <span style={{ color: white, fontSize: '1.125rem', fontWeight: 700 }}>Dashboard</span>
              <span className="flex items-center gap-1.5" style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 600 }}>
                <Pulse color="#10b981" /> Live
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: slate400, fontSize: '0.875rem', fontWeight: 500 }}>Smith Plumbing</span>
              <Avatar initial="S" color="#64748b" size={28} />
            </div>
          </div>

          {/* ── Metrics Row ── */}
          <div
            className="dash-metrics grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            style={{ padding: '20px 24px' }}
          >
            {metrics.map((m) => (
              <div
                key={m.label}
                style={{
                  background: cardBg,
                  border: cardBorder,
                  borderRadius: 12,
                  padding: '16px',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ color: slate400 }}>
                    <Icon name={m.icon} size={16} />
                  </span>
                  <span style={{ color: slate400, fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {m.label}
                  </span>
                </div>
                <div style={{ color: white, fontSize: '1.5rem', fontWeight: 700, marginBottom: 4 }}>
                  {m.value}
                </div>
                <div style={{ color: slate500, fontSize: '0.75rem', fontWeight: 500 }}>
                  {m.change}
                </div>
              </div>
            ))}
          </div>

          {/* ── Main Content ── */}
          <div
            className="dash-main flex gap-5"
            style={{ padding: '0 24px 20px 24px' }}
          >
            {/* Left: Activity Feed */}
            <div className="dash-left" style={{ width: '60%', flexShrink: 0 }}>
              <div
                style={{
                  background: cardBg,
                  border: cardBorder,
                  borderRadius: 12,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Feed header */}
                <div
                  className="flex items-center justify-between"
                  style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <span style={{ color: white, fontSize: '0.875rem', fontWeight: 600 }}>Recent Activity</span>
                  <span
                    className="flex items-center gap-1"
                    style={{
                      background: 'rgba(79,70,229,0.12)',
                      color: indigo,
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: 6,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    <Pulse color={indigo} /> Real-time
                  </span>
                </div>

                {/* Feed items */}
                <div style={{ padding: '8px 0', flex: 1 }}>
                  {activity.map((item, i) => {
                    const color = agentColors[item.agent]?.border || slate400;
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-3"
                        style={{
                          padding: '10px 18px',
                          borderLeft: `3px solid ${color}`,
                          marginLeft: 12,
                        }}
                      >
                        <Avatar initial={item.agent[0]} color={color} size={26} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ color: '#cbd5e1', fontSize: '0.8rem', lineHeight: 1.4, marginBottom: 2 }}>
                            {item.text}
                          </p>
                          <p style={{ color: slate500, fontSize: '0.7rem', fontWeight: 500 }}>
                            {item.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Agent Status Panel */}
            <div className="dash-right" style={{ width: '40%', flexShrink: 0 }}>
              <div
                style={{
                  background: cardBg,
                  border: cardBorder,
                  borderRadius: 12,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    padding: '14px 18px',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    color: white,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  Your AI Team
                </div>
                <div style={{ padding: '10px 14px', flex: 1 }}>
                  {agents.map((a) => {
                    const pColor = pulseColorMap[a.pulse];
                    const avatarColor = agentColors[a.name]?.bg || pColor;
                    return (
                      <div
                        key={a.name}
                        className="flex items-center gap-3"
                        style={{
                          padding: '10px 8px',
                          borderRadius: 8,
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        <Avatar initial={a.name[0]} color={avatarColor} size={30} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="flex items-center gap-2" style={{ marginBottom: 2 }}>
                            <span style={{ color: white, fontSize: '0.8rem', fontWeight: 600 }}>{a.name}</span>
                            <span
                              className="flex items-center gap-1"
                              style={{
                                color: pColor,
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                background: `${pColor}15`,
                                padding: '1px 6px',
                                borderRadius: 4,
                              }}
                            >
                              {a.pulse === 'amber' ? <Dot color={pColor} /> : <Pulse color={pColor} />}
                              {a.status}
                            </span>
                          </div>
                          <p style={{ color: slate400, fontSize: '0.75rem', lineHeight: 1.3 }}>
                            {a.activity}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom Row ── */}
          <div style={{ padding: '0 24px 20px 24px' }}>
            <div
              style={{
                background: cardBg,
                border: cardBorder,
                borderRadius: 12,
                padding: '18px 20px',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span style={{ color: white, fontSize: '0.85rem', fontWeight: 600 }}>Job Bookings — Last 30 Days</span>
                <span style={{ color: indigo, fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>
                  View Full Dashboard →
                </span>
              </div>
              {/* CSS bar chart */}
              <div className="flex items-end gap-3" style={{ height: 80, paddingBottom: 4 }}>
                {[45, 62, 38, 55, 78, 50].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      background: `linear-gradient(180deg, ${indigo} 0%, #6366f1 100%)`,
                      borderRadius: '4px 4px 0 0',
                      opacity: 0.85,
                      minWidth: 24,
                    }}
                    title={`Day ${(i + 1) * 5}: ${Math.round(h * 0.6)} bookings`}
                  />
                ))}
              </div>
              <div className="flex justify-between" style={{ marginTop: 6 }}>
                {['5d', '10d', '15d', '20d', '25d', '30d'].map((d) => (
                  <span key={d} style={{ color: slate500, fontSize: '0.65rem', fontWeight: 500, flex: 1, textAlign: 'center' }}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
