import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

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
      whoza: 'See Pricing',
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
      className="comparison-table-section"
    >
      <style>{`
        .comparison-table-section {
          margin-top: 64px;
          padding-bottom: 40px;
        }

        .comparison-table-title {
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          text-align: center;
          margin-bottom: 32px;
        }

        .comparison-table-container {
          border-radius: 16px;
          border: 1px solid #1f2937;
          overflow: hidden;
          background: #111827;
        }

        /* Desktop Table Styles */
        .comparison-table-desktop {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background: #111827;
          table-layout: fixed;
        }

        .comparison-table-desktop th {
          padding: 20px 16px;
          text-align: left;
          font-size: 14px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 2px solid #1f2937;
          background: #111827;
        }

        .comparison-table-desktop th.feature-col {
          width: 22%;
        }

        .comparison-table-desktop th.whoza-col {
          width: 30%;
          font-size: 16px;
          font-weight: 700;
          color: #c4f135;
          border-bottom: 2px solid #c4f135;
          background: rgba(196, 241, 53, 0.1);
          border-left: 2px solid #c4f135;
          border-top: 2px solid #c4f135;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          text-transform: none;
          letter-spacing: normal;
        }

        .comparison-table-desktop th.other-col {
          width: 24%;
        }

        .comparison-table-desktop td {
          padding: 16px;
          font-size: 14px;
          border-bottom: 1px solid #1f2937;
          vertical-align: top;
        }

        .comparison-table-desktop td.feature-cell {
          font-weight: 600;
          color: #ffffff;
          background: #111827;
        }

        .comparison-table-desktop td.whoza-cell {
          color: #ffffff;
          background: rgba(196, 241, 53, 0.05);
          border-left: 2px solid #c4f135;
          border-right: 2px solid #c4f135;
          font-weight: 600;
        }

        .comparison-table-desktop td.other-cell {
          color: #94a3b8;
          background: #111827;
        }

        .comparison-table-desktop tbody tr:last-child td {
          border-bottom: none;
        }

        .comparison-table-desktop tbody tr:last-child td.whoza-cell {
          border-bottom: 2px solid #c4f135;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        }

        .whoza-value {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .whoza-value .check-icon {
          color: #c4f135;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .rex-subtitle {
          display: block;
          font-size: 12px;
          color: #94a3b8;
          font-weight: 400;
          margin-top: 4px;
        }

        /* Mobile Card Styles */
        .comparison-mobile {
          display: none;
        }

        .comparison-mobile-header {
          background: rgba(196, 241, 53, 0.1);
          border: 2px solid #c4f135;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 16px;
          text-align: center;
        }

        .comparison-mobile-header h4 {
          font-size: 20px;
          font-weight: 700;
          color: #c4f135;
          margin: 0 0 8px 0;
        }

        .comparison-mobile-header p {
          font-size: 13px;
          color: #94a3b8;
          margin: 0;
          line-height: 1.4;
        }

        .comparison-card {
          background: #111827;
          border: 1px solid #1f2937;
          border-radius: 12px;
          margin-bottom: 12px;
          overflow: hidden;
        }

        .comparison-card-header {
          background: #1f2937;
          padding: 12px 16px;
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .comparison-card-content {
          padding: 0;
        }

        .comparison-card-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 14px 16px;
          border-bottom: 1px solid #1f2937;
        }

        .comparison-card-row:last-child {
          border-bottom: none;
        }

        .comparison-card-row.whoza-row {
          background: rgba(196, 241, 53, 0.08);
          border-left: 3px solid #c4f135;
        }

        .comparison-card-label {
          font-size: 12px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          flex-shrink: 0;
          width: 35%;
        }

        .comparison-card-value {
          font-size: 14px;
          color: #ffffff;
          text-align: right;
          flex: 1;
          padding-left: 12px;
        }

        .comparison-card-row.whoza-row .comparison-card-value {
          color: #c4f135;
          font-weight: 600;
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          gap: 6px;
        }

        .comparison-card-row.whoza-row .check-icon {
          color: #c4f135;
          flex-shrink: 0;
        }

        .comparison-card-row:not(.whoza-row) .comparison-card-value {
          color: #64748b;
        }

        .comparison-footer {
          margin-top: 24px;
          text-align: center;
          padding: 0 16px;
        }

        .comparison-footer p {
          font-size: 14px;
          color: #94a3b8;
          line-height: 1.6;
          margin: 0;
        }

        .comparison-footer strong {
          color: #c4f135;
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .comparison-table-desktop {
            display: none;
          }

          .comparison-mobile {
            display: block;
          }

          .comparison-table-section {
            padding-bottom: 200px; /* More space for sticky CTA on mobile */
          }

          .comparison-table-title {
            font-size: 26px;
            padding: 0 16px;
          }

          .comparison-table-container {
            border: none;
            background: transparent;
            border-radius: 0;
          }
        }

        @media (max-width: 480px) {
          .comparison-table-section {
            margin-top: 48px;
            padding-bottom: 220px;
          }

          .comparison-table-title {
            font-size: 22px;
            margin-bottom: 24px;
          }

          .comparison-mobile-header {
            padding: 16px;
          }

          .comparison-mobile-header h4 {
            font-size: 18px;
          }

          .comparison-card-row {
            padding: 12px 14px;
          }

          .comparison-card-label {
            font-size: 11px;
          }

          .comparison-card-value {
            font-size: 13px;
          }

          .comparison-footer p {
            font-size: 13px;
          }
        }
      `}</style>

      <h3 className="comparison-table-title">
        Why Choose whoza.ai?
      </h3>

      <div className="comparison-table-container">
        {/* Desktop Table View */}
        <table className="comparison-table-desktop">
          <thead>
            <tr>
              <th className="feature-col">Feature</th>
              <th className="whoza-col">
                whoza.ai (with Rex)
                <span className="rex-subtitle">Your AI visibility assistant</span>
              </th>
              <th className="other-col">SEO Agency</th>
              <th className="other-col">DIY / Other Tools</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index}>
                <td className="feature-cell">{feature.label}</td>
                <td className="whoza-cell">
                  <div className="whoza-value">
                    <Check size={16} className="check-icon" aria-hidden="true" />
                    <span>{feature.whoza}</span>
                  </div>
                </td>
                <td className="other-cell">{feature.seo}</td>
                <td className="other-cell">{feature.diy}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Card View */}
        <div className="comparison-mobile">
          <div className="comparison-mobile-header">
            <h4>whoza.ai (with Rex)</h4>
            <p>Rex is your AI visibility assistant — helping tradespeople get recommended by ChatGPT, Google AI, and other AI tools</p>
          </div>

          {features.map((feature, index) => (
            <div className="comparison-card" key={index}>
              <div className="comparison-card-header">{feature.label}</div>
              <div className="comparison-card-content">
                <div className="comparison-card-row whoza-row">
                  <span className="comparison-card-label">whoza.ai</span>
                  <span className="comparison-card-value">
                    <Check size={14} className="check-icon" aria-hidden="true" />
                    {feature.whoza}
                  </span>
                </div>
                <div className="comparison-card-row">
                  <span className="comparison-card-label">SEO Agency</span>
                  <span className="comparison-card-value">{feature.seo}</span>
                </div>
                <div className="comparison-card-row">
                  <span className="comparison-card-label">DIY Tools</span>
                  <span className="comparison-card-value">{feature.diy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="comparison-footer">
        <p>
          Unlike traditional SEO agencies that focus on Google rankings, whoza.ai specializes in making your business{' '}
          <strong>AI-ready</strong> — ensuring ChatGPT, Google AI, and other AI tools recommend you by name.
        </p>
      </div>
    </motion.div>
  );
}
