import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export default function ComparisonTable() {
  const features = [
    {
      label: 'Focus',
      whoza: 'AI Recommendation Readiness',
      seo: 'Google Ranking',
      diy: 'General Marketing'
    },
    {
      label: 'Methodology',
      whoza: 'Entity Confidence Engineering™',
      seo: 'Keyword Optimization',
      diy: 'Disparate Tactics'
    },
    {
      label: 'Time Commitment',
      whoza: '10-15 mins / week',
      seo: 'Hours of meetings',
      diy: 'Endless hours'
    },
    {
      label: 'Control',
      whoza: 'You approve every task',
      seo: 'They work in a black box',
      diy: 'You do everything'
    },
    {
      label: 'Cost',
      whoza: 'From £59 / month',
      seo: '£500-£2000+ / month',
      diy: '"Free" (but costs you time)'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.7 }}
      style={{
        marginTop: '64px'
      }}
    >
      <h3
        style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: '32px'
        }}
      >
        Why Choose whoza.ai?
      </h3>

      <div 
        className="comparison-table-container"
        style={{
          overflowX: 'auto',
          borderRadius: '16px',
          border: '1px solid #1f2937'
        }}>
        <table style={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: 0,
          background: '#111827'
        }}>
          <thead>
            <tr>
              <th style={{
                padding: '20px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '700',
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '2px solid #1f2937',
                background: '#111827',
                position: 'sticky',
                left: 0,
                zIndex: 1
              }}>
                Feature
              </th>
              <th style={{
                padding: '20px',
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: '700',
                color: '#c4f135',
                borderBottom: '2px solid #c4f135',
                background: 'rgba(196, 241, 53, 0.1)',
                border: '2px solid #c4f135',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                boxSizing: 'border-box'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>whoza.ai with Rex</span>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#c4f135',
                    opacity: 0.9
                  }}>(your AI employee)</span>
                </div>
              </th>
              <th style={{
                padding: '20px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#ffffff',
                borderBottom: '2px solid #1f2937',
                background: '#111827'
              }}>
                SEO Agency
              </th>
              <th style={{
                padding: '20px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#ffffff',
                borderBottom: '2px solid #1f2937',
                background: '#111827'
              }}>
                DIY / Other Tools
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index}>
                <td style={{
                  padding: '20px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#ffffff',
                  borderBottom: index < features.length - 1 ? '1px solid #1f2937' : 'none',
                  background: '#111827',
                  position: 'sticky',
                  left: 0,
                  zIndex: 1
                }}>
                  {feature.label}
                </td>
                <td style={{
                  padding: '20px',
                  fontSize: '15px',
                  color: '#ffffff',
                  borderBottom: index < features.length - 1 ? '1px solid rgba(196, 241, 53, 0.2)' : '2px solid #c4f135',
                  background: 'rgba(196, 241, 53, 0.05)',
                  borderLeft: '2px solid #c4f135',
                  borderRight: '2px solid #c4f135',
                  borderBottomLeftRadius: index === features.length - 1 ? '12px' : '0',
                  borderBottomRightRadius: index === features.length - 1 ? '12px' : '0',
                  fontWeight: '600',
                  boxSizing: 'border-box'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Check size={18} style={{ color: '#c4f135', flexShrink: 0 }} aria-hidden="true" />
                    <span>{feature.whoza}</span>
                  </div>
                </td>
                <td style={{
                  padding: '20px',
                  fontSize: '15px',
                  color: '#94a3b8',
                  borderBottom: index < features.length - 1 ? '1px solid #1f2937' : 'none',
                  background: '#111827'
                }}>
                  {feature.seo}
                </td>
                <td style={{
                  padding: '20px',
                  fontSize: '15px',
                  color: '#94a3b8',
                  borderBottom: index < features.length - 1 ? '1px solid #1f2937' : 'none',
                  background: '#111827'
                }}>
                  {feature.diy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: '24px',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '14px',
          color: '#94a3b8',
          lineHeight: '1.6'
        }}>
          Unlike traditional SEO agencies that focus on Google rankings, whoza.ai specializes in making your business{' '}
          <strong style={{ color: '#c4f135' }}>AI-ready</strong> — ensuring ChatGPT, Google AI, and other AI tools recommend you by name.
        </p>
      </div>
    </motion.div>
  );
}
