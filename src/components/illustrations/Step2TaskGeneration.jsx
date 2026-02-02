import React from 'react';

export default function Step2TaskGeneration() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="step-illustration"
      role="img"
      aria-labelledby="step2-title step2-desc"
    >
      <title id="step2-title">AI Task Generation</title>
      <desc id="step2-desc">AI node emitting lines to a task list representing automated task generation</desc>

      <defs>
        <linearGradient id="step2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9EF01A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#9EF01A" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <polygon
        points="60,80 80,90 80,110 60,120 40,110 40,90"
        fill="#141414"
        stroke="#9EF01A"
        strokeWidth="1.5"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />

      <circle cx="60" cy="100" r="15" fill="url(#step2Gradient)" opacity="0.6" />

      <line x1="80" y1="100" x2="110" y2="60" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" strokeDasharray="3 2" />
      <line x1="80" y1="100" x2="110" y2="100" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" strokeDasharray="3 2" />
      <line x1="80" y1="100" x2="110" y2="140" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" strokeDasharray="3 2" />

      <g className="task-list">
        <rect x="110" y="50" width="60" height="20" fill="#1E1E1E" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <rect x="110" y="90" width="60" height="20" fill="#1E1E1E" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <rect x="110" y="130" width="60" height="20" fill="#1E1E1E" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />

        <circle cx="120" cy="60" r="3" fill="#9EF01A" />
        <circle cx="120" cy="100" r="3" fill="#9EF01A" />
        <circle cx="120" cy="140" r="3" fill="#9EF01A" />
      </g>
    </svg>
  );
}
