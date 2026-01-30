import { memo } from 'react';
import { getAllPillars } from '../constants/ecePillars';
import PillarTooltip from './PillarTooltip';

function ECEPillarBreakdown({ pillarScores, loading = false }) {
  const pillars = getAllPillars();

  const getScorePercentage = (pillarId) => {
    if (!pillarScores || !pillarScores[pillarId]) return 0;
    const { score, maxScore } = pillarScores[pillarId];
    return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 75) return '#84cc16';
    if (percentage >= 50) return '#eab308';
    if (percentage >= 25) return '#f97316';
    return '#ef4444';
  };

  const getScoreLabel = (percentage) => {
    if (percentage >= 75) return 'Strong';
    if (percentage >= 50) return 'Good';
    if (percentage >= 25) return 'Fair';
    return 'Needs Work';
  };

  if (loading) {
    return (
      <div className="ece-pillar-breakdown loading">
        <div className="loading-spinner"></div>
        <p>Loading ECE™ breakdown...</p>
      </div>
    );
  }

  return (
    <div className="ece-pillar-breakdown">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--spacing-lg)'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', marginBottom: 'var(--spacing-xs)' }}>
            ECE Pillar Breakdown
          </h2>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: 'var(--color-text-secondary)'
          }}>
            Entity Confidence Engineering™ across 5 key pillars
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--spacing-lg)',
        justifyItems: 'center'
      }} className="pillar-grid">
        {pillars.map((pillar) => {
          const percentage = getScorePercentage(pillar.id);
          const color = getScoreColor(percentage);
          const label = getScoreLabel(percentage);

          return (
            <div
              key={pillar.id}
              className="pillar-card"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-lg)',
                transition: 'all 0.2s ease',
                cursor: 'help',
                width: '100%',
                maxWidth: '500px'
              }}
            >
              <PillarTooltip pillarId={pillar.id}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--spacing-md)',
                  gap: 'var(--spacing-lg)'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--spacing-sm)',
                    flex: '1',
                    minWidth: 0
                  }}>
                    <span style={{ 
                      fontSize: '24px', 
                      lineHeight: 1,
                      flexShrink: 0
                    }}>{pillar.icon}</span>
                    <div style={{ minWidth: 0 }}>
                      <h3 style={{
                        margin: 0,
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'var(--color-text)'
                      }}>
                        {pillar.name}
                      </h3>
                      <p style={{
                        margin: 0,
                        fontSize: '12px',
                        color: 'var(--color-text-secondary)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                  <div style={{ 
                    textAlign: 'center',
                    flexShrink: 0,
                    minWidth: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: 700,
                      lineHeight: 1,
                      color: color,
                      marginBottom: '4px'
                    }}>
                      {percentage}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      whiteSpace: 'nowrap'
                    }}>
                      {label}
                    </div>
                  </div>
                </div>

                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: 'var(--color-border)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div
                    style={{
                      width: `${percentage}%`,
                      height: '100%',
                      backgroundColor: color,
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.6s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      animation: 'shimmer 2s infinite'
                    }} />
                  </div>
                </div>

                {pillarScores && pillarScores[pillar.id] && (
                  <div style={{
                    marginTop: 'var(--spacing-sm)',
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span>
                      {pillarScores[pillar.id].score} / {pillarScores[pillar.id].maxScore} points
                    </span>
                    <span style={{ fontStyle: 'italic' }}>
                      Hover for details
                    </span>
                  </div>
                )}
              </PillarTooltip>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .pillar-card:hover {
          border-color: var(--color-primary-400);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .pillar-grid {
            grid-template-columns: 1fr !important;
            padding: 0 5%;
            justify-items: center;
          }
          
          .pillar-card {
            width: 90% !important;
            max-width: 100% !important;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}

export default memo(ECEPillarBreakdown);
