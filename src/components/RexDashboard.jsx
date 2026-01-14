import React, { useState, useEffect, useCallback, memo } from 'react';
import rexDecisionEngine from '../services/rexDecisionEngine';
import RexEvaluationDisplay from './RexEvaluationDisplay';
import RexRecommendationCard from './RexRecommendationCard';
import RexActionHistory from './RexActionHistory';
import RexConfidenceTrend from './RexConfidenceTrend';
import '../rex-ux-enhancements.css';

function RexDashboard({ businessId, userId }) {
  const [loading, setLoading] = useState(true);
  const [evaluation, setEvaluation] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [actionHistory, setActionHistory] = useState([]);
  const [confidenceTrend, setConfidenceTrend] = useState([]);
  const [error, setError] = useState(null);
  const [generating, setGenerating] = useState(false);

  const loadRexData = useCallback(async () => {
    if (!businessId) return;

    try {
      setLoading(true);
      setError(null);

      const [latestEval, activeRec, history, trend] = await Promise.all([
        rexDecisionEngine.getLatestEvaluation(businessId),
        rexDecisionEngine.getActiveRecommendation(businessId),
        rexDecisionEngine.getActionHistory(businessId, 10),
        rexDecisionEngine.getConfidenceTrend(businessId, 30)
      ]);

      setEvaluation(latestEval);
      setRecommendation(activeRec);
      setActionHistory(history);
      setConfidenceTrend(trend);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    loadRexData();
  }, [loadRexData]);

  const handleRunEvaluation = async () => {
    try {
      setGenerating(true);
      setError(null);
      const newEval = await rexDecisionEngine.evaluateBusiness(businessId, userId);
      setEvaluation(newEval);
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateRecommendation = async () => {
    try {
      setGenerating(true);
      setError(null);
      const newRec = await rexDecisionEngine.generateRecommendation(
        businessId,
        userId,
        evaluation?.id
      );
      setRecommendation(newRec);
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleApproveRecommendation = async (recId) => {
    try {
      setError(null);
      await rexDecisionEngine.updateRecommendationStatus(recId, 'approved');
      await loadRexData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCompleteAction = async (recId, notes, impact) => {
    try {
      setError(null);
      await rexDecisionEngine.completeAction(recId, notes, impact);
      await loadRexData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeclineRecommendation = async (recId, reason) => {
    try {
      setError(null);
      await rexDecisionEngine.updateRecommendationStatus(recId, 'declined', {
        decline_reason: reason
      });
      await loadRexData();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96 rex-dashboard">
        <div className="text-center">
          <div className="rex-loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading Rex Dashboard...</p>
          <p className="text-gray-500 text-sm mt-2">Analyzing your business confidence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 rex-dashboard">
      <div className="rex-gradient-header rounded-lg p-8 shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">🤖</span>
              <h1 className="text-3xl font-bold text-gray-900">
                Rex AI Decision Engine
              </h1>
            </div>
            <p className="text-gray-700 text-lg mb-4 font-semibold">
              Entity Confidence Engineering™ for AI Answer Readiness
            </p>
            <p className="text-gray-600 max-w-3xl leading-relaxed">
              Rex analyzes your business across 5 pillars and recommends <strong>ONE</strong>{' '}
              human-approved action at a time to increase the likelihood that AI
              answer engines confidently recommend your business.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-800 rounded-lg p-4 shadow-md">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-bold text-lg mb-1">Error</p>
              <p>{error}</p>
            </div>
          </div>
        </div>
      )}

      {!evaluation && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center border-2 border-dashed border-gray-300">
          <span className="text-6xl mb-4 inline-block">🚀</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get Started with Rex
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Rex will evaluate your business across 5 Entity Confidence
            Engineering pillars and identify the weakest area. Then, Rex will
            recommend <strong>ONE</strong> specific, low-risk action you can take to improve.
          </p>
          <button
            onClick={handleRunEvaluation}
            disabled={generating}
            className="rex-btn rex-btn-primary text-lg px-8 py-4"
          >
            {generating ? (
              <>
                <div className="rex-loading-spinner" style={{width: '20px', height: '20px', borderWidth: '2px'}}></div>
                Evaluating Your Business...
              </>
            ) : (
              <>
                <span>✨</span>
                Run Initial Evaluation
              </>
            )}
          </button>
        </div>
      )}

      {evaluation && (
        <>
          <RexEvaluationDisplay
            evaluation={evaluation}
            onRegenerate={handleRunEvaluation}
            regenerating={generating}
          />

          {recommendation ? (
            <RexRecommendationCard
              recommendation={recommendation}
              onApprove={handleApproveRecommendation}
              onComplete={handleCompleteAction}
              onDecline={handleDeclineRecommendation}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-10 text-center border-2 border-green-200">
              <span className="text-5xl mb-4 inline-block">💡</span>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready for Your Next Action
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Rex has identified your weakest pillar. Generate <strong>ONE</strong> specific
                action to improve your confidence score.
              </p>
              <button
                onClick={handleGenerateRecommendation}
                disabled={generating}
                className="rex-btn rex-btn-success text-lg px-8 py-4"
              >
                {generating ? (
                  <>
                    <div className="rex-loading-spinner" style={{width: '20px', height: '20px', borderWidth: '2px'}}></div>
                    Generating Recommendation...
                  </>
                ) : (
                  <>
                    <span>🎯</span>
                    Generate Recommendation
                  </>
                )}
              </button>
            </div>
          )}

          {confidenceTrend.length > 0 && (
            <RexConfidenceTrend trend={confidenceTrend} />
          )}

          {actionHistory.length > 0 && (
            <RexActionHistory history={actionHistory} />
          )}
        </>
      )}
    </div>
  );
}

export default memo(RexDashboard);
