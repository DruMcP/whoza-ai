import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MiniROICalculator() {
  const [selectedTrade, setSelectedTrade] = useState('plumber');

  const tradePresets = {
    plumber: { name: 'Plumber', avgJob: 250, monthlyJobs: 3 },
    electrician: { name: 'Electrician', avgJob: 300, monthlyJobs: 3 },
    roofer: { name: 'Roofer', avgJob: 750, monthlyJobs: 3 },
    builder: { name: 'Builder', avgJob: 500, monthlyJobs: 3 },
    heating: { name: 'Heating Engineer', avgJob: 350, monthlyJobs: 3 }
  };

  const calculateQuickROI = () => {
    const trade = tradePresets[selectedTrade];
    const monthlyRevenue = trade.avgJob * trade.monthlyJobs;
    const annualRevenue = monthlyRevenue * 12;
    const annualCost = 99 * 12;
    const annualProfit = annualRevenue - annualCost;

    return {
      monthlyRevenue,
      annualProfit
    };
  };

  const results = calculateQuickROI();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '2px solid #84CC16',
      borderRadius: '16px',
      padding: '32px',
      marginTop: '40px',
      boxShadow: '0 4px 20px rgba(132, 204, 22, 0.15)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          color: '#0f172a',
          marginBottom: '8px'
        }}>
          See Your Potential ROI
        </h2>
        <p style={{
          fontSize: '1rem',
          color: '#64748b',
          margin: 0
        }}>
          Select your trade to see your potential ROI with Whoza.ai
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '10px',
        marginBottom: '24px'
      }}>
        {Object.entries(tradePresets).map(([key, { name }]) => (
          <button
            key={key}
            type="button"
            onClick={() => setSelectedTrade(key)}
            style={{
              padding: '12px 16px',
              backgroundColor: selectedTrade === key ? '#84CC16' : '#f8fafc',
              color: selectedTrade === key ? '#0f172a' : '#1e293b',
              border: `2px solid ${selectedTrade === key ? '#84CC16' : '#e2e8f0'}`,
              borderRadius: '8px',
              fontWeight: selectedTrade === key ? 'bold' : '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '0.9rem'
            }}
            onMouseEnter={(e) => {
              if (selectedTrade !== key) {
                e.currentTarget.style.borderColor = '#84CC16';
                e.currentTarget.style.backgroundColor = '#f0fdf4';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedTrade !== key) {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <div style={{
        backgroundColor: '#ecfccb',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            fontSize: '0.9rem',
            color: '#4d7c0f',
            fontWeight: '600',
            marginBottom: '8px'
          }}>
            Estimated Annual Profit
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#16a34a',
            lineHeight: '1'
          }}>
            {formatCurrency(results.annualProfit)}
          </div>
        </div>
        <div style={{
          fontSize: '0.85rem',
          color: '#65a30d'
        }}>
          Based on {tradePresets[selectedTrade].monthlyJobs} new jobs/month at {formatCurrency(tradePresets[selectedTrade].avgJob)}/job
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center'
      }}>
        <Link
          to="/pricing#roi-calculator"
          style={{
            display: 'inline-block',
            backgroundColor: '#84CC16',
            color: '#0f172a',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            padding: '14px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'transform 0.2s',
            cursor: 'pointer',
            textAlign: 'center',
            width: '100%',
            maxWidth: '300px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(132, 204, 22, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Calculate My Full ROI →
        </Link>
        <p style={{
          fontSize: '0.85rem',
          color: '#64748b',
          margin: 0,
          textAlign: 'center'
        }}>
          See detailed breakdown and compare to alternatives
        </p>
      </div>
    </div>
  );
}
