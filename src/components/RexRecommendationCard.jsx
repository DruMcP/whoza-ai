import React, { useState } from 'react';

const STATUS_CONFIG = {
  draft: { color: 'gray', text: 'Draft', icon: '📝' },
  sent_to_admin: { color: 'blue', text: 'Sent to Admin', icon: '👤' },
  sent_to_customer: { color: 'indigo', text: 'Sent to Customer', icon: '📧' },
  approved: { color: 'green', text: 'Approved - Ready to Implement', icon: '✅' },
  in_progress: { color: 'yellow', text: 'In Progress', icon: '⏳' },
  completed: { color: 'green', text: 'Completed', icon: '🎉' },
  declined: { color: 'red', text: 'Declined', icon: '❌' }
};

export default function RexRecommendationCard({ recommendation, onApprove, onComplete, onDecline }) {
  const [showCompleteForm, setShowCompleteForm] = useState(false);
  const [showDeclineForm, setShowDeclineForm] = useState(false);
  const [completionNotes, setCompletionNotes] = useState('');
  const [impactNotes, setImpactNotes] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleApprove = async () => {
    setSubmitting(true);
    try {
      await onApprove(recommendation.id);
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplete = async (e) => {
    e.preventDefault();
    if (!completionNotes.trim()) {
      toast.info('Please provide completion notes');
      return;
    }

    setSubmitting(true);
    try {
      await onComplete(recommendation.id, completionNotes, impactNotes);
      setShowCompleteForm(false);
      setCompletionNotes('');
      setImpactNotes('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDecline = async (e) => {
    e.preventDefault();
    if (!declineReason.trim()) {
      toast.info('Please provide a reason for declining');
      return;
    }

    setSubmitting(true);
    try {
      await onDecline(recommendation.id, declineReason);
      setShowDeclineForm(false);
      setDeclineReason('');
    } finally {
      setSubmitting(false);
    }
  };

  const status = STATUS_CONFIG[recommendation.status] || STATUS_CONFIG.draft;

  return (
    <div className="rex-recommendation-card">
      <div className="rex-recommendation-header">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className={`rex-recommendation-badge bg-${status.color}-100 text-${status.color}-800`}>
                {status.icon} {status.text}
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-green-100 text-gray-800 border-2 border-blue-200">
                🎯 {recommendation.target_pillar.replace(/_/g, ' ').toUpperCase()}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {recommendation.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="inline-flex items-center gap-1">
                <span>⏱️</span>
                <strong>{recommendation.estimated_minutes} minutes</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="rex-section-card rex-explanation-card">
          <h3 className="font-bold text-blue-900 mb-3 text-lg flex items-center gap-2">
            <span>💡</span>
            Why This Matters
          </h3>
          <p className="text-blue-800 leading-relaxed text-base">{recommendation.explanation}</p>
        </div>

        {recommendation.exact_copy && (
          <div className="rex-section-card rex-copy-card">
            <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
              <span>📋</span>
              Exact Copy (Copy & Paste)
            </h3>
            <div className="rex-code-block relative">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed pt-8">
                {recommendation.exact_copy}
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(recommendation.exact_copy);
                  toast.info('Copied to clipboard!');
                }}
                className="absolute top-2 right-2 px-3 py-1.5 bg-white text-gray-700 rounded-md text-xs font-semibold hover:bg-gray-100 transition-colors border border-gray-300"
              >
                📎 Copy
              </button>
            </div>
          </div>
        )}

        <div className="rex-section-card rex-location-card">
          <h3 className="font-bold text-green-900 mb-3 text-lg flex items-center gap-2">
            <span>📍</span>
            Where to Apply
          </h3>
          <p className="text-green-800 leading-relaxed text-base">{recommendation.application_location}</p>
        </div>

        <div className="rex-section-card rex-impact-card">
          <h3 className="font-bold text-yellow-900 mb-3 text-lg flex items-center gap-2">
            <span>📈</span>
            Expected Impact
          </h3>
          <p className="text-yellow-800 leading-relaxed text-base">{recommendation.expected_impact}</p>
        </div>
      </div>

      <div className="p-8 pt-0">
        {recommendation.status === 'draft' && (
          <div className="flex gap-4">
            <button
              onClick={handleApprove}
              disabled={submitting}
              className="rex-btn rex-btn-success flex-1 text-lg py-4"
            >
              {submitting ? (
                <>
                  <div className="rex-loading-spinner" style={{width: '20px', height: '20px', borderWidth: '2px'}}></div>
                  Approving...
                </>
              ) : (
                <>
                  <span>✅</span>
                  Approve & Start
                </>
              )}
            </button>
            <button
              onClick={() => setShowDeclineForm(true)}
              className="px-8 py-4 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              Decline
            </button>
          </div>
        )}

        {recommendation.status === 'approved' && (
          <div className="space-y-4">
            {!showCompleteForm ? (
              <button
                onClick={() => setShowCompleteForm(true)}
                className="rex-btn rex-btn-primary w-full text-lg py-4"
              >
                <span>✔️</span>
                Mark as Completed
              </button>
            ) : (
              <form onSubmit={handleComplete} className="space-y-4 bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                <div>
                  <label className="rex-label">
                    What did you do? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={completionNotes}
                    onChange={(e) => setCompletionNotes(e.target.value)}
                    placeholder="Describe the changes you made..."
                    className="rex-textarea"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="rex-label">
                    What impact did you observe? (Optional)
                  </label>
                  <textarea
                    value={impactNotes}
                    onChange={(e) => setImpactNotes(e.target.value)}
                    placeholder="Any immediate results or observations..."
                    className="rex-textarea"
                    rows={3}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rex-btn rex-btn-success flex-1"
                  >
                    {submitting ? (
                      <>
                        <div className="rex-loading-spinner" style={{width: '16px', height: '16px', borderWidth: '2px'}}></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <span>✅</span>
                        Complete Action
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCompleteForm(false)}
                    className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {showDeclineForm && (
          <form onSubmit={handleDecline} className="space-y-4 bg-red-50 p-6 rounded-xl border-2 border-red-200">
            <div>
              <label className="rex-label text-red-900">
                Why are you declining this recommendation? <span className="text-red-600">*</span>
              </label>
              <textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="This feedback helps Rex learn and improve..."
                className="rex-textarea border-red-300 focus:border-red-500"
                rows={4}
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="rex-btn rex-btn-danger flex-1"
              >
                {submitting ? (
                  <>
                    <div className="rex-loading-spinner" style={{width: '16px', height: '16px', borderWidth: '2px'}}></div>
                    Declining...
                  </>
                ) : (
                  <>
                    <span>❌</span>
                    Decline Recommendation
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowDeclineForm(false)}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
