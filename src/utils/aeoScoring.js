/**
 * AEO (Answer Engine Optimization) Scoring Utility
 * Based on Sam Hogan's AEO framework for AI visibility assessment
 * 
 * This is a self-assessment tool that helps users understand their
 * current AI visibility readiness. It is NOT a replacement for the
 * automated Free Score analysis.
 */

/**
 * Scoring configuration for each question
 */
export const AEO_QUESTIONS = [
  {
    id: 'hasFAQ',
    question: 'Does your website have a FAQ section that answers common customer questions?',
    description: 'FAQs help AI assistants understand and recommend your services.',
    options: [
      { value: 'yes', label: 'Yes, I have a FAQ section', points: 20 },
      { value: 'no', label: 'No, I don\'t have one', points: 0 },
      { value: 'not_sure', label: 'Not sure', points: 5 }
    ],
    maxPoints: 20
  },
  {
    id: 'googleBusinessComplete',
    question: 'Is your business listed on Google Business Profile with complete information?',
    description: 'A complete Google Business Profile is essential for local AI search visibility.',
    options: [
      { value: 'complete', label: 'Yes, fully complete with photos, hours, and services', points: 25 },
      { value: 'partial', label: 'Partially complete', points: 10 },
      { value: 'no', label: 'No listing or very basic', points: 0 }
    ],
    maxPoints: 25
  },
  {
    id: 'bingWebmasterSubmitted',
    question: 'Have you submitted your website to Bing Webmaster Tools?',
    description: 'Bing powers many AI assistants including Perplexity and Copilot.',
    options: [
      { value: 'yes', label: 'Yes, I\'ve submitted it', points: 20 },
      { value: 'no', label: 'No, I haven\'t', points: 0 },
      { value: 'unknown', label: 'What\'s Bing Webmaster Tools?', points: 0 }
    ],
    maxPoints: 20
  },
  {
    id: 'hasStructuredData',
    question: 'Does your website use structured data (schema markup)?',
    description: 'Structured data helps AI understand your business details.',
    options: [
      { value: 'yes', label: 'Yes, I have schema markup', points: 20 },
      { value: 'no', label: 'No, I don\'t', points: 0 },
      { value: 'not_sure', label: 'Not sure what that is', points: 5 }
    ],
    maxPoints: 20
  },
  {
    id: 'aiAssistantTested',
    question: 'Have you ever tested if AI assistants (ChatGPT, Perplexity) can find your business?',
    description: 'Testing helps you understand your current AI visibility.',
    options: [
      { value: 'found', label: 'Yes, and they can find me', points: 15 },
      { value: 'not_found', label: 'Yes, but they can\'t find me', points: 5 },
      { value: 'never_tested', label: 'I\'ve never tested this', points: 0 }
    ],
    maxPoints: 15
  }
];

/**
 * Maximum possible score
 */
export const MAX_SCORE = AEO_QUESTIONS.reduce((sum, q) => sum + q.maxPoints, 0);

/**
 * Score segments with messaging
 */
export const SCORE_SEGMENTS = [
  {
    min: 0,
    max: 20,
    segment: 'Invisible',
    color: '#ef4444',
    message: 'AI assistants can\'t find you yet. Whoza.ai will change that.',
    icon: '🔴'
  },
  {
    min: 21,
    max: 40,
    segment: 'Hidden',
    color: '#f97316',
    message: 'You have some basics, but AI search is missing you.',
    icon: '🟠'
  },
  {
    min: 41,
    max: 60,
    segment: 'Emerging',
    color: '#eab308',
    message: 'Good foundation! Let\'s make you fully visible to AI.',
    icon: '🟡'
  },
  {
    min: 61,
    max: 80,
    segment: 'Visible',
    color: '#22c55e',
    message: 'You\'re ahead of most! Let\'s optimize further.',
    icon: '🟢'
  },
  {
    min: 81,
    max: 100,
    segment: 'Dominant',
    color: '#3b82f6',
    message: 'Excellent! Let\'s maintain your AI visibility lead.',
    icon: '🔵'
  }
];

/**
 * Calculate the AEO score from assessment responses
 * @param {Object} responses - Object containing question responses
 * @returns {Object} Score result with total, percentage, and segment
 */
export function calculateAEOScore(responses) {
  if (!responses || typeof responses !== 'object') {
    return {
      totalPoints: 0,
      percentage: 0,
      segment: SCORE_SEGMENTS[0],
      answeredCount: 0,
      totalQuestions: AEO_QUESTIONS.length
    };
  }

  let totalPoints = 0;
  let answeredCount = 0;

  AEO_QUESTIONS.forEach(question => {
    const response = responses[question.id];
    if (response) {
      answeredCount++;
      const selectedOption = question.options.find(opt => opt.value === response);
      if (selectedOption) {
        totalPoints += selectedOption.points;
      }
    }
  });

  const percentage = Math.round((totalPoints / MAX_SCORE) * 100);
  const segment = SCORE_SEGMENTS.find(s => percentage >= s.min && percentage <= s.max) || SCORE_SEGMENTS[0];

  return {
    totalPoints,
    percentage,
    segment,
    answeredCount,
    totalQuestions: AEO_QUESTIONS.length
  };
}

/**
 * Get the initial empty responses object
 * @returns {Object} Empty responses object
 */
export function getInitialResponses() {
  return AEO_QUESTIONS.reduce((acc, question) => {
    acc[question.id] = '';
    return acc;
  }, {});
}

/**
 * Check if all questions have been answered
 * @param {Object} responses - Object containing question responses
 * @returns {boolean} True if all questions answered
 */
export function isAssessmentComplete(responses) {
  if (!responses) return false;
  return AEO_QUESTIONS.every(question => responses[question.id] && responses[question.id] !== '');
}

/**
 * Get question by ID
 * @param {string} questionId - Question ID
 * @returns {Object|null} Question object or null
 */
export function getQuestionById(questionId) {
  return AEO_QUESTIONS.find(q => q.id === questionId) || null;
}
