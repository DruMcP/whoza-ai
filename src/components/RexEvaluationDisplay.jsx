import React from 'react';

const PILLAR_INFO = {
  entity_clarity: {
    name: 'Entity Clarity',
    description: 'Is the business role unambiguous? Is service + location clear?',
    icon: '🎯',
    color: 'blue'
  },
  consensus_shaping: {
    name: 'Consensus Shaping',
    description: 'Do all platforms describe the business the same way?',
    icon: '🤝',
    color: 'green'
  },
  answer_readiness: {
    name: 'Answer Readiness',
    description: 'Does content sound like direct answers to questions?',
    icon: '💬',
    color: 'teal'
  },
  risk_reduction: {
    name: 'Risk Reduction',
    description: 'Are credentials explicit and easy to verify?',
    icon: '🛡️',
    color: 'orange'
  },
  confidence_accretion: {
    name: 'Confidence Accretion',
    description: 'Regular small improvements building trust over time?',
    icon: '📈',
    color: 'cyan'
  }
};

export default function RexEvaluationDisplay({ evaluation, onRegenerate, regenerating }) {
  const pillars = [
    { key: 'entity_clarity', score: evaluation.entity_clarity_score },
    { key: 'consensus_shaping', score: evaluation.consensus_score },
    { key: 'answer_readiness', score: evaluation.answer_readiness_score },
    { key: 'risk_reduction', score: evaluation.risk_reduction_score },
    { key: 'confidence_accretion', score: evaluation.confidence_score }
  ];

  const getScoreClass = (score) => {
    if (score >= 80) return 'rex-score-excellent';
    if (score >= 60) return 'rex-score-good';
    if (score >= 40) return 'rex-score-fair';
    if (score >= 20) return 'rex-score-poor';
    return 'rex-score-critical';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    if (score >= 20) return 'Needs Work';
    return 'Critical';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Entity Confidence Evaluation
          </h2>
          <div className="flex items-center gap-4">
            <div>
              <span className="text-gray-600 text-lg">Overall Score:</span>
              <span className={`ml-2 text-4xl font-bold ${
                evaluation.overall_score >= 80 ? 'text-green-600' :
                evaluation.overall_score >= 60 ? 'text-blue-600' :
                evaluation.overall_score >= 40 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {evaluation.overall_score}
              </span>
              <span className="text-2xl text-gray-400">/100</span>
            </div>
          </div>
        </div>
        <button
          onClick={onRegenerate}
          disabled={regenerating}
          className="rex-btn rex-btn-primary"
        >
          {regenerating ? (
            <>
              <div className="rex-loading-spinner" style={{width: '16px', height: '16px', borderWidth: '2px'}}></div>
              Re-evaluating...
            </>
          ) : (
            <>
              <span>🔄</span>
              Re-evaluate
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {pillars.map((pillar) => {
          const info = PILLAR_INFO[pillar.key];
          const isWeakest = evaluation.weakest_pillar === pillar.key;

          return (
            <div
              key={pillar.key}
              className={`rex-pillar-card ${isWeakest ? 'rex-pillar-card-weakest' : ''}`}
            >
              <div className="text-center">
                <div className="text-5xl mb-3">{info.icon}</div>
                <h3 className="font-bold text-gray-900 text-base mb-2">
                  {info.name}
                </h3>
                <p className="text-xs text-gray-600 mb-4 h-12 leading-tight">{info.description}</p>

                <div className="mb-3">
                  <div className={`text-4xl font-bold mb-1 ${
                    pillar.score >= 80 ? 'text-green-600' :
                    pillar.score >= 60 ? 'text-blue-600' :
                    pillar.score >= 40 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {pillar.score}
                  </div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {getScoreLabel(pillar.score)}
                  </div>
                </div>

                <div className="rex-score-bar">
                  <div
                    className={`rex-score-bar-fill ${getScoreClass(pillar.score)}`}
                    style={{ width: `${pillar.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
          <span>📋</span>
          Evaluation Notes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {evaluation.entity_clarity_notes && (
            <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
              <p className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                🎯 Entity Clarity
              </p>
              <p className="text-gray-700 leading-relaxed">{evaluation.entity_clarity_notes}</p>
            </div>
          )}
          {evaluation.consensus_notes && (
            <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
              <p className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                🤝 Consensus
              </p>
              <p className="text-gray-700 leading-relaxed">{evaluation.consensus_notes}</p>
            </div>
          )}
          {evaluation.answer_readiness_notes && (
            <div className="bg-white rounded-lg p-4 border-l-4 border-teal-500">
              <p className="font-semibold text-teal-900 mb-2 flex items-center gap-2">
                💬 Answer Readiness
              </p>
              <p className="text-gray-700 leading-relaxed">{evaluation.answer_readiness_notes}</p>
            </div>
          )}
          {evaluation.risk_reduction_notes && (
            <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
              <p className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                🛡️ Risk Reduction
              </p>
              <p className="text-gray-700 leading-relaxed">{evaluation.risk_reduction_notes}</p>
            </div>
          )}
          {evaluation.confidence_notes && (
            <div className="bg-white rounded-lg p-4 border-l-4 border-cyan-500">
              <p className="font-semibold text-cyan-900 mb-2 flex items-center gap-2">
                📈 Confidence Accretion
              </p>
              <p className="text-gray-700 leading-relaxed">{evaluation.confidence_notes}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <span className="inline-flex items-center gap-2">
          <span>🕐</span>
          Last evaluated: {new Date(evaluation.evaluated_at).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
