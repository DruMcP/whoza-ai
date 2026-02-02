import { useState } from 'react';
import { getPillarById } from '../constants/ecePillars';

export default function PillarTooltip({ pillarId, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const pillar = getPillarById(pillarId);

  if (!pillar) return children;

  const examples = {
    CLARITY: [
      'Complete your Google Business Profile',
      'Add detailed service descriptions',
      'Update business contact information'
    ],
    CONSENSUS: [
      'Request customer reviews',
      'Get listed on trade directories',
      'Build citation consistency'
    ],
    ANSWERABILITY: [
      'Create location-specific content',
      'Publish service area pages',
      'Write FAQ content'
    ],
    SAFETY: [
      'Add privacy policy to website',
      'Enable SSL/HTTPS',
      'Display credentials and certifications'
    ],
    CONTEXT: [
      'Create service-specific landing pages',
      'Add local area guides',
      'Update business hours and service areas'
    ]
  };

  const whyItMatters = {
    CLARITY: 'AI needs to clearly identify who you are and what you do to recommend you to customers.',
    CONSENSUS: 'Multiple trusted sources agreeing about your business builds AI confidence in your information.',
    ANSWERABILITY: 'Content that directly answers customer questions makes you the ideal AI recommendation.',
    SAFETY: 'Trust signals tell AI your business is legitimate and safe to recommend to customers.',
    CONTEXT: 'Specific, relevant content helps AI match you to the right customer queries.'
  };

  return (
    <div
      className="pillar-tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
      style={{ position: 'relative', display: 'inline-block', outline: 'none' }}
    >
      {children}
      {isVisible && (
        <div
          className="pillar-tooltip"
          role="tooltip"
          aria-label={`${pillar.name} information`}
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 12px)',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            borderRadius: '12px',
            padding: '16px',
            minWidth: '280px',
            maxWidth: '320px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            animation: 'tooltipFadeIn 0.2s ease',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '20px' }}>{pillar.icon}</span>
            <strong style={{ fontSize: '16px', color: '#ffffff', fontWeight: 700 }}>
              {pillar.name}
            </strong>
          </div>

          <p style={{
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#e5e7eb',
            marginBottom: '12px',
            margin: 0
          }}>
            {pillar.description}
          </p>

          <div style={{ marginBottom: '12px', marginTop: '12px' }}>
            <strong style={{
              fontSize: '13px',
              color: '#4ade80',
              display: 'block',
              marginBottom: '6px',
              fontWeight: 600
            }}>
              Why It Matters:
            </strong>
            <p style={{
              fontSize: '13px',
              lineHeight: '1.5',
              color: '#d1d5db',
              margin: 0
            }}>
              {whyItMatters[pillarId]}
            </p>
          </div>

          <div>
            <strong style={{
              fontSize: '13px',
              color: '#4ade80',
              display: 'block',
              marginBottom: '6px',
              fontWeight: 600
            }}>
              Example Tasks:
            </strong>
            <ul style={{
              fontSize: '13px',
              lineHeight: '1.5',
              color: '#d1d5db',
              margin: 0,
              paddingLeft: '20px',
              listStyle: 'disc'
            }}>
              {examples[pillarId].map((example, index) => (
                <li key={index} style={{ marginBottom: '4px' }}>{example}</li>
              ))}
            </ul>
          </div>

          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: '50%',
            width: '12px',
            height: '12px',
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            borderTop: 'none',
            borderLeft: 'none',
            transform: 'translateX(-50%) rotate(45deg)'
          }} />
        </div>
      )}
    </div>
  );
}
