import { useState, useEffect } from 'react';
import { 
  AEO_QUESTIONS, 
  calculateAEOScore, 
  getInitialResponses,
  isAssessmentComplete 
} from '../../utils/aeoScoring';
import './AEOAssessment.css';

/**
 * AEO Assessment Component
 * A self-assessment questionnaire for AI visibility readiness
 * Integrated into the onboarding flow
 */
export default function AEOAssessment({ 
  onComplete, 
  onSkip, 
  initialResponses = null 
}) {
  const [responses, setResponses] = useState(
    initialResponses || getInitialResponses()
  );
  const [showScore, setShowScore] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  // Calculate score whenever responses change
  useEffect(() => {
    if (isAssessmentComplete(responses)) {
      const result = calculateAEOScore(responses);
      setScoreResult(result);
    }
  }, [responses]);

  const handleOptionSelect = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = () => {
    if (!isAssessmentComplete(responses)) {
      return;
    }
    
    const result = calculateAEOScore(responses);
    setScoreResult(result);
    setShowScore(true);
  };

  const handleContinue = () => {
    if (onComplete && scoreResult) {
      onComplete({
        responses,
        score: scoreResult.percentage,
        segment: scoreResult.segment.segment,
        completedAt: new Date().toISOString()
      });
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  const allAnswered = isAssessmentComplete(responses);

  // Score display view
  if (showScore && scoreResult) {
    return (
      <div className="aeo-assessment">
        <div className="aeo-score-display">
          <div className="aeo-score-header">
            <h3>Your AI Readiness Score</h3>
            <p className="aeo-score-subtitle">
              Based on your self-assessment
            </p>
          </div>

          <div 
            className="aeo-score-circle"
            style={{ '--score-color': scoreResult.segment.color }}
          >
            <span className="aeo-score-number">{scoreResult.percentage}</span>
            <span className="aeo-score-label">/ 100</span>
          </div>

          <div className="aeo-score-segment">
            <span className="aeo-segment-icon">{scoreResult.segment.icon}</span>
            <span 
              className="aeo-segment-name"
              style={{ color: scoreResult.segment.color }}
            >
              {scoreResult.segment.segment}
            </span>
          </div>

          <p className="aeo-score-message">
            {scoreResult.segment.message}
          </p>

          <div className="aeo-score-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>
              This is a self-assessment. After signup, you'll receive a detailed 
              automated analysis of your actual AI visibility.
            </span>
          </div>

          <button 
            type="button"
            onClick={handleContinue}
            className="button button-primary aeo-continue-btn"
          >
            Continue to Complete Signup
          </button>
        </div>
      </div>
    );
  }

  // Questions view
  return (
    <div className="aeo-assessment">
      <div className="aeo-header">
        <h3>Quick AI Readiness Check</h3>
        <p className="aeo-description">
          Answer these 5 quick questions to understand your current AI visibility. 
          This helps us tailor your experience.
        </p>
      </div>

      <div className="aeo-questions">
        {AEO_QUESTIONS.map((question, index) => (
          <div key={question.id} className="aeo-question-card">
            <div className="aeo-question-number">
              {index + 1}
            </div>
            <div className="aeo-question-content">
              <p className="aeo-question-text">{question.question}</p>
              <p className="aeo-question-hint">{question.description}</p>
              
              <div className="aeo-options">
                {question.options.map(option => (
                  <label 
                    key={option.value}
                    className={`aeo-option ${responses[question.id] === option.value ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={responses[question.id] === option.value}
                      onChange={() => handleOptionSelect(question.id, option.value)}
                    />
                    <span className="aeo-option-radio"></span>
                    <span className="aeo-option-label">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="aeo-actions">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="button button-primary"
        >
          See My Score
        </button>
        
        <button
          type="button"
          onClick={handleSkip}
          className="aeo-skip-link"
        >
          Skip for now
        </button>
      </div>

      <p className="aeo-footer-note">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        Your answers help us personalise your AI visibility journey
      </p>
    </div>
  );
}

// Default props handled via destructuring defaults in function signature
