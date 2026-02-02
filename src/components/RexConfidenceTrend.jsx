import React from 'react';

export default function RexConfidenceTrend({ trend }) {
  if (!trend || trend.length === 0) {
    return null;
  }

  const latest = trend[trend.length - 1];
  const oldest = trend[0];
  const overallChange = latest.overall_confidence - oldest.overall_confidence;

  return (
    <div className="rex-trend-chart border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <span>📊</span>
        Confidence Trend
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="rex-stat-card rex-stat-card-primary">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl">🎯</span>
            <p className="text-blue-600 text-sm font-bold uppercase tracking-wide">Current Score</p>
          </div>
          <p className="text-5xl font-bold text-blue-900 mb-1">{latest.overall_confidence}</p>
          <p className="text-sm text-blue-700 font-semibold">out of 100</p>
        </div>

        <div className="rex-stat-card rex-stat-card-success">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl">{overallChange >= 0 ? '📈' : '📉'}</span>
            <p className="text-green-600 text-sm font-bold uppercase tracking-wide">
              {trend.length}-Day Change
            </p>
          </div>
          <p className={`text-5xl font-bold mb-1 ${overallChange >= 0 ? 'text-green-900' : 'text-red-900'}`}>
            {overallChange >= 0 ? '+' : ''}{overallChange}
          </p>
          <p className={`text-sm font-semibold ${overallChange >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            {overallChange >= 0 ? 'Improving' : 'Declining'}
          </p>
        </div>

        <div className="rex-stat-card rex-stat-card-warning">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl">📐</span>
            <p className="text-orange-600 text-sm font-bold uppercase tracking-wide">Measurements</p>
          </div>
          <p className="text-5xl font-bold text-orange-900 mb-1">{trend.length}</p>
          <p className="text-sm text-orange-700 font-semibold">total evaluations</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-8 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-6 text-lg flex items-center gap-2">
          <span>📈</span>
          Confidence Score Over Time
        </h3>
        <div className="relative">
          <div className="h-72 flex items-end justify-between gap-2 px-4">
            {trend.map((point, index) => {
              const height = Math.max((point.overall_confidence / 100) * 100, 5);
              const isLatest = index === trend.length - 1;
              const isOldest = index === 0;

              return (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div
                    className={`rex-trend-bar w-full transition-all duration-300 ${isLatest ? 'ring-4 ring-blue-300' : ''}`}
                    style={{ height: `${height}%` }}
                    title={`${point.overall_confidence} - ${new Date(point.measured_at).toLocaleDateString()}`}
                  >
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      Score: {point.overall_confidence}
                      <br />
                      {new Date(point.measured_at).toLocaleDateString()}
                    </div>
                  </div>
                  {(isOldest || isLatest) && (
                    <div className="text-xs text-gray-600 font-semibold mt-2 text-center">
                      {new Date(point.measured_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center items-center gap-6 mt-6 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-b from-blue-500 to-blue-700 rounded"></div>
              <span>Confidence Score</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-b from-green-500 to-green-700 rounded"></div>
              <span>On Hover</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
          <span>🎯</span>
          Current Pillar Scores
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="text-2xl mb-1">🎯</div>
            <p className="text-xs text-gray-600 mb-2 font-semibold">Entity Clarity</p>
            <p className="text-3xl font-bold text-blue-600">{latest.entity_clarity}</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
            <div className="text-2xl mb-1">🤝</div>
            <p className="text-xs text-gray-600 mb-2 font-semibold">Consensus</p>
            <p className="text-3xl font-bold text-green-600">{latest.consensus}</p>
          </div>
          <div className="text-center p-4 bg-teal-50 rounded-lg border-2 border-teal-200">
            <div className="text-2xl mb-1">💬</div>
            <p className="text-xs text-gray-600 mb-2 font-semibold">Answer Ready</p>
            <p className="text-3xl font-bold text-teal-600">{latest.answer_readiness}</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
            <div className="text-2xl mb-1">🛡️</div>
            <p className="text-xs text-gray-600 mb-2 font-semibold">Risk Reduced</p>
            <p className="text-3xl font-bold text-orange-600">{latest.risk_reduction}</p>
          </div>
          <div className="text-center p-4 bg-cyan-50 rounded-lg border-2 border-cyan-200">
            <div className="text-2xl mb-1">📈</div>
            <p className="text-xs text-gray-600 mb-2 font-semibold">Confidence</p>
            <p className="text-3xl font-bold text-cyan-600">{latest.confidence}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
