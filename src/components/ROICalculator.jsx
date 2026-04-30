import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, PiggyBank, Clock, CheckCircle2, Calculator, ArrowRight } from 'lucide-react';
import { useLocalization } from '../contexts/LocalizationContext';

export default function ROICalculator() {
  const { formatPrice, getCurrencySymbol } = useLocalization();
  const [selectedTrade, setSelectedTrade] = useState('plumber');
  const [averageJobValue, setAverageJobValue] = useState(250);
  const [newJobsPerMonth, setNewJobsPerMonth] = useState(3);
  const [selectedPlan, setSelectedPlan] = useState('starter');
  const [showResults, setShowResults] = useState(false);

  const tradePresets = {
    plumber: { name: 'Plumber', value: 250 },
    electrician: { name: 'Electrician', value: 300 },
    roofer: { name: 'Roofer', value: 750 },
    builder: { name: 'Builder', value: 500 },
    heating: { name: 'Heating Engineer', value: 350 },
    hairSalon: { name: 'Hair Salon / Barber', value: 45 },
    beautySalon: { name: 'Beauty Salon', value: 65 },
    nailSalon: { name: 'Nail Salon', value: 50 },
    spa: { name: 'Spa / Massage', value: 80 },
    tattoo: { name: 'Tattoo / Piercing', value: 150 },
    makeup: { name: 'Makeup Artist', value: 120 },
    aesthetician: { name: 'Aesthetician / Skincare', value: 90 },
    other: { name: 'Other', value: 250 }
  };

  const planPrices = {
    starter: 59,
    growth: 119,
    pro: 199,
    scale: 349
  };

  const planNames = {
    starter: 'Capture',
    growth: 'Convert',
    pro: 'Grow',
    scale: 'Scale'
  };

  const handleTradeChange = (trade) => {
    setSelectedTrade(trade);
    if (trade !== 'other') {
      setAverageJobValue(tradePresets[trade].value);
    }
  };

  const calculateROI = () => {
    const monthlyRevenue = averageJobValue * newJobsPerMonth;
    const planCost = planPrices[selectedPlan];
    const netGain = monthlyRevenue - planCost;
    const roi = ((netGain / planCost) * 100).toFixed(0);
    const annualRevenue = monthlyRevenue * 12;
    const annualCost = planCost * 12;
    const annualProfit = annualRevenue - annualCost;
    const breakEvenJobs = Math.ceil(planCost / averageJobValue);

    return {
      monthlyRevenue,
      planCost,
      netGain,
      roi,
      annualRevenue,
      annualCost,
      annualProfit,
      breakEvenJobs
    };
  };

  useEffect(() => {
    setShowResults(true);
  }, [averageJobValue, newJobsPerMonth, selectedPlan]);

  const results = calculateROI();
  const isPositiveROI = results.netGain > 0;

  const formatCurrency = (amount) => {
    return formatPrice(amount);
  };

  return (
    <section className="ds-section ds-bg-lightgray">
      <div className="ds-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="ds-badge ds-badge-green mb-5">
            <Calculator size={14} strokeWidth={2.5} />
            ROI Calculator
          </span>
          <h2 className="ds-heading-2 mb-4">Calculate Your Return</h2>
          <p className="ds-body max-w-xl mx-auto">
            See how much additional revenue you could generate by capturing leads you're currently missing.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'var(--white)',
              border: '1px solid var(--slate-200)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {/* Inputs Panel */}
            <div className="p-6 md:p-10" style={{ borderBottom: '1px solid var(--slate-200)' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Trade Selection */}
                <div>
                  <label className="ds-label mb-3">Your Trade</label>
                  <select
                    value={selectedTrade}
                    onChange={(e) => handleTradeChange(e.target.value)}
                    className="ds-input"
                    style={{ cursor: 'pointer' }}
                  >
                    {Object.entries(tradePresets).map(([key, { name }]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>

                {/* Job Value */}
                <div>
                  <label className="ds-label mb-3">
                    Average Job Value
                    <span className="block text-xs font-normal mt-1" style={{ color: 'var(--slate-400)' }}>
                      What you typically charge per job
                    </span>
                  </label>
                  <div className="relative">
                    <span
                      className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold"
                      style={{ color: 'var(--slate-400)' }}
                    >
                      {getCurrencySymbol()}
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="10"
                      value={averageJobValue}
                      onChange={(e) => setAverageJobValue(Number(e.target.value))}
                      className="ds-input"
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="10"
                    value={averageJobValue}
                    onChange={(e) => setAverageJobValue(Number(e.target.value))}
                    className="w-full mt-3"
                    style={{
                      accentColor: 'var(--katie-blue)',
                      height: '4px',
                      borderRadius: '2px',
                      background: 'var(--slate-200)',
                    }}
                  />
                </div>

                {/* New Jobs */}
                <div>
                  <label className="ds-label mb-3">
                    Extra Jobs/Month
                    <span className="block text-xs font-normal mt-1" style={{ color: 'var(--slate-400)' }}>
                      Conservative estimate from AI leads
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={newJobsPerMonth}
                      onChange={(e) => setNewJobsPerMonth(Number(e.target.value))}
                      className="ds-input"
                    />
                    <span
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
                      style={{ color: 'var(--slate-400)' }}
                    >
                      jobs
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={newJobsPerMonth}
                    onChange={(e) => setNewJobsPerMonth(Number(e.target.value))}
                    className="w-full mt-3"
                    style={{
                      accentColor: 'var(--katie-blue)',
                      height: '4px',
                      borderRadius: '2px',
                      background: 'var(--slate-200)',
                    }}
                  />
                </div>
              </div>

              {/* Plan Selection */}
              <div className="mt-6">
                <label className="ds-label mb-3">Choose Plan</label>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(planPrices).map(([key, price]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedPlan(key)}
                      className="ds-btn"
                      style={{
                        background: selectedPlan === key ? 'var(--katie-blue)' : 'var(--white)',
                        color: selectedPlan === key ? 'var(--white)' : 'var(--navy-900)',
                        border: `1.5px solid ${selectedPlan === key ? 'var(--katie-blue)' : 'var(--slate-200)'}`,
                        minHeight: '40px',
                        padding: 'var(--space-3) var(--space-5)',
                        fontSize: 'var(--text-sm)',
                      }}
                    >
                      {planNames[key]} — {formatPrice(price)}/mo
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Panel */}
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-6 md:p-10"
                style={{ background: 'var(--off-white)' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Net Gain */}
                  <div
                    className="rounded-xl p-6 text-center"
                    style={{
                      background: isPositiveROI
                        ? 'linear-gradient(135deg, var(--rex-green-light) 0%, var(--white) 100%)'
                        : 'linear-gradient(135deg, var(--color-red-100) 0%, var(--white) 100%)',
                      border: `2px solid ${isPositiveROI ? 'var(--rex-green)' : 'var(--error)'}`,
                    }}
                  >
                    <p className="text-sm font-medium mb-2" style={{ color: 'var(--slate-500)' }}>
                      Monthly Net Gain
                    </p>
                    <p
                      className="text-3xl font-extrabold"
                      style={{
                        color: isPositiveROI ? 'var(--rex-green)' : 'var(--error)',
                        fontFamily: 'var(--font-heading)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {formatCurrency(results.netGain)}
                    </p>
                    <p className="text-xs mt-2" style={{ color: 'var(--slate-400)' }}>
                      {formatCurrency(results.monthlyRevenue)} revenue − {formatCurrency(results.planCost)} cost
                    </p>
                  </div>

                  {/* ROI % */}
                  <div
                    className="rounded-xl p-6 text-center"
                    style={{
                      background: 'var(--white)',
                      border: '1px solid var(--slate-200)',
                    }}
                  >
                    <div className="flex justify-center mb-2">
                      <TrendingUp size={20} style={{ color: 'var(--katie-blue)' }} />
                    </div>
                    <p className="text-sm font-medium mb-2" style={{ color: 'var(--slate-500)' }}>
                      Return on Investment
                    </p>
                    <p
                      className="text-3xl font-extrabold"
                      style={{
                        color: 'var(--navy-900)',
                        fontFamily: 'var(--font-heading)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {results.roi}%
                    </p>
                  </div>

                  {/* Break Even */}
                  <div
                    className="rounded-xl p-6 text-center"
                    style={{
                      background: 'var(--white)',
                      border: '1px solid var(--slate-200)',
                    }}
                  >
                    <div className="flex justify-center mb-2">
                      <Clock size={20} style={{ color: 'var(--claire-amber)' }} />
                    </div>
                    <p className="text-sm font-medium mb-2" style={{ color: 'var(--slate-500)' }}>
                      Break-even Point
                    </p>
                    <p
                      className="text-3xl font-extrabold"
                      style={{
                        color: 'var(--navy-900)',
                        fontFamily: 'var(--font-heading)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {results.breakEvenJobs} {results.breakEvenJobs === 1 ? 'job' : 'jobs'}
                    </p>
                  </div>
                </div>

                {/* Annual Insight */}
                <div
                  className="rounded-xl p-6 mb-8"
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--slate-200)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'var(--katie-blue-light)' }}
                    >
                      <PiggyBank size={20} style={{ color: 'var(--katie-blue)' }} />
                    </div>
                    <div>
                      <p className="font-semibold mb-1" style={{ color: 'var(--navy-900)' }}>
                        Annual projection
                      </p>
                      <p className="text-sm" style={{ color: 'var(--slate-500)', lineHeight: '1.6' }}>
                        With {newJobsPerMonth} extra jobs per month at {formatCurrency(averageJobValue)} each,
                        you'd generate <strong style={{ color: 'var(--navy-900)' }}>{formatCurrency(results.annualRevenue)}</strong> in additional annual revenue.
                        After the {planNames[selectedPlan]} plan cost of {formatCurrency(results.annualCost)},
                        your <strong style={{ color: 'var(--rex-green)' }}>annual profit is {formatCurrency(results.annualProfit)}</strong>.
                        You only need {results.breakEvenJobs} {results.breakEvenJobs === 1 ? 'job' : 'jobs'} per month to cover costs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Competitor Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { name: 'Bark / Rated People', cost: `${formatPrice(5)}-${formatPrice(30)} per lead`, model: 'Pay per lead', bad: true },
                    { name: 'Traditional Agency', cost: `${formatPrice(300)}-${formatPrice(1000)}/mo`, model: 'Variable', bad: true },
                    { name: 'whoza.ai', cost: `${formatPrice(planPrices[selectedPlan])}/mo fixed`, model: 'Predictable', bad: false },
                  ].map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: i === 2 ? 0 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl"
                      style={{
                        background: item.bad ? 'var(--white)' : 'var(--rex-green-light)',
                        border: `1px solid ${item.bad ? 'var(--slate-200)' : 'var(--rex-green)'}`,
                      }}
                    >
                      <div>
                        <p className="font-semibold text-sm" style={{ color: 'var(--navy-900)' }}>{item.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--slate-400)' }}>{item.cost}</p>
                      </div>
                      <span
                        className="text-xs font-bold px-2 py-1 rounded-full"
                        style={{
                          background: item.bad ? 'var(--color-red-100)' : 'var(--rex-green)',
                          color: item.bad ? 'var(--error)' : 'var(--white)',
                        }}
                      >
                        {item.model}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm" style={{ color: 'var(--slate-400)' }}>
                    Based on real customer data. Most see results within 8-10 weeks.
                  </p>
                  <a
                    href="#pricing-plans"
                    className="ds-btn ds-btn-primary"
                  >
                    Choose Your Plan
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
