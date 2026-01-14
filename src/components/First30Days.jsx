import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './icons/Icon';

export default function First30Days() {
  const [openWeek, setOpenWeek] = useState(1);

  const weeks = [
    {
      week: 1,
      title: 'Setup & First Score',
      items: [
        'We analyse your current AI visibility across ChatGPT, Google AI, and Perplexity',
        'You receive your personalised Visibility Confidence Score™',
        'Rex identifies your most impactful quick wins to improve immediately'
      ]
    },
    {
      week: 2,
      title: 'Your First Tasks',
      items: [
        'Rex sends you 2-3 simple tasks (10 mins each) via email',
        'Tasks are things like: "Add this sentence to your Google Business description"',
        'You approve each task before we guide you through it'
      ]
    },
    {
      week: 3,
      title: 'Building Momentum',
      items: [
        'Your second score shows early improvements',
        'Rex adjusts your action plan based on what\'s working',
        'You start seeing your business mentioned in AI test queries'
      ]
    },
    {
      week: 4,
      title: 'First Results',
      items: [
        'Most users see their first AI mention by week 4',
        'Your Visibility Confidence Score™ shows measurable progress across all 5 pillars',
        'Monthly report shows exactly what changed and why'
      ]
    }
  ];

  return (
    <section
      className="section scroll-reveal"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ maxWidth: '900px' }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: 'var(--spacing-md)',
          fontSize: 'clamp(28px, 5vw, 40px)',
          color: 'var(--color-text)'
        }}>
          What exactly happens after I sign up — in the first 30 days?
        </h2>

        <p style={{
          textAlign: 'center',
          fontSize: '18px',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--spacing-2xl)',
          maxWidth: '700px',
          margin: '0 auto var(--spacing-2xl)'
        }}>
          Your journey from invisible to recommended by AI, broken down week by week
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-2xl)'
        }}>
          {weeks.map((week) => (
            <div
              key={week.week}
              style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                border: openWeek === week.week
                  ? '2px solid var(--color-primary-600)'
                  : '2px solid rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: openWeek === week.week
                  ? '0 8px 24px rgba(132, 204, 22, 0.15)'
                  : '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              <button
                onClick={() => setOpenWeek(openWeek === week.week ? null : week.week)}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-lg)',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--spacing-md)',
                  textAlign: 'left'
                }}
                aria-expanded={openWeek === week.week}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', flex: 1 }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: openWeek === week.week
                        ? 'linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-500) 100%)'
                        : 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '20px',
                      color: openWeek === week.week ? 'white' : '#64748b',
                      flexShrink: 0,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {week.week}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--color-primary-600)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '4px'
                    }}>
                      Week {week.week}
                    </div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: 'var(--color-text)'
                    }}>
                      {week.title}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    transform: openWeek === week.week ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    color: 'var(--color-primary-600)',
                    flexShrink: 0
                  }}
                >
                  <Icon name="chevron-down" size={24} />
                </div>
              </button>

              <div
                style={{
                  maxHeight: openWeek === week.week ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease'
                }}
              >
                <div style={{
                  padding: '0 var(--spacing-lg) var(--spacing-lg)',
                  paddingLeft: 'calc(var(--spacing-lg) + 48px + var(--spacing-md))'
                }}>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-sm)'
                  }}>
                    {week.items.map((item, index) => (
                      <li
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 'var(--spacing-sm)',
                          fontSize: '16px',
                          lineHeight: '1.6',
                          color: 'var(--color-text-secondary)'
                        }}
                      >
                        <span style={{
                          color: 'var(--color-primary-600)',
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: '2px'
                        }}>
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            border: '2px solid #fbbf24',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-lg)',
            marginBottom: 'var(--spacing-2xl)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md)',
            flexWrap: 'wrap'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#fbbf24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Icon name="check-circle" size={24} style={{ color: '#78350f' }} />
          </div>
          <p style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: 500,
            color: '#78350f',
            flex: 1,
            minWidth: '200px'
          }}>
            No technical knowledge required. Average time commitment: <strong>30 minutes per week</strong>.
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            to="/start"
            className="button btn-hover"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              fontSize: '18px',
              padding: 'var(--spacing-md) var(--spacing-xl)'
            }}
          >
            Start Your 30-Day Journey
            <Icon name="arrow-right" size={20} />
          </Link>
          <p style={{
            marginTop: 'var(--spacing-md)',
            fontSize: '15px',
            color: 'var(--color-text-secondary)'
          }}>
            First score ready in 48 hours · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
