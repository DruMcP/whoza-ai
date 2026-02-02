export const ECE_PILLARS = {
  CLARITY: {
    id: 'CLARITY',
    name: 'Entity Clarity',
    description: 'How clearly AI can identify the business',
    icon: '🎯',
    color: '#3b82f6',
  },
  CONSENSUS: {
    id: 'CONSENSUS',
    name: 'Consensus Alignment',
    description: 'Agreement across sources',
    icon: '🤝',
    color: '#10b981',
  },
  ANSWERABILITY: {
    id: 'ANSWERABILITY',
    name: 'Answer Readiness',
    description: 'Content ready for AI answers',
    icon: '💡',
    color: '#f59e0b',
  },
  SAFETY: {
    id: 'SAFETY',
    name: 'Risk Reduction',
    description: 'Trust and safety signals',
    icon: '🛡️',
    color: '#8b5cf6',
  },
  CONTEXT: {
    id: 'CONTEXT',
    name: 'Context Precision',
    description: 'Relevance to specific situations',
    icon: '🎯',
    color: '#ec4899',
  },
};

export const ECE_PILLAR_IDS = {
  CLARITY: 'CLARITY',
  CONSENSUS: 'CONSENSUS',
  ANSWERABILITY: 'ANSWERABILITY',
  SAFETY: 'SAFETY',
  CONTEXT: 'CONTEXT',
};

export const getPillarById = (pillarId) => {
  return ECE_PILLARS[pillarId] || null;
};

export const getAllPillars = () => {
  return Object.values(ECE_PILLARS);
};
