import React from 'react';

export default function RexActionHistory({ history }) {
  if (!history || history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <span>📜</span>
          Completed Actions
        </h2>
        <p className="text-gray-600 text-lg">
          Your history of Entity Confidence improvements
        </p>
      </div>

      <div className="space-y-6 relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-blue-400 to-green-400"></div>

        {history.map((action, index) => (
          <div
            key={action.id}
            className="rex-action-item ml-12"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-xl mb-1">{action.title}</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    <span>📅</span>
                    {new Date(action.completed_at).toLocaleDateString()}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span>🎯</span>
                    {action.target_pillar.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
              {action.confidence_increase > 0 && (
                <div className="rex-confidence-badge">
                  <span>📈</span>
                  +{action.confidence_increase} points
                </div>
              )}
            </div>

            <div className="space-y-3 text-sm">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <div className="flex items-start gap-2">
                  <span className="text-blue-700 font-semibold flex-shrink-0">🔧 What changed:</span>
                  <p className="text-gray-700 leading-relaxed">{action.what_changed}</p>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <div className="flex items-start gap-2">
                  <span className="text-green-700 font-semibold flex-shrink-0">📍 Where applied:</span>
                  <p className="text-gray-700 leading-relaxed">{action.where_applied}</p>
                </div>
              </div>

              {action.impact_notes && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-700 font-semibold flex-shrink-0">💫 Impact observed:</span>
                    <p className="text-gray-700 leading-relaxed">{action.impact_notes}</p>
                  </div>
                </div>
              )}

              {action.pillar_score_before !== null && action.pillar_score_after !== null && (
                <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-700 font-semibold">📊 Score change:</span>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-gray-600">{action.pillar_score_before}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-lg font-bold text-green-600">
                        {action.pillar_score_after}
                      </span>
                      {action.pillar_score_after > action.pillar_score_before && (
                        <span className="text-green-600 font-semibold">
                          (+{action.pillar_score_after - action.pillar_score_before})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
