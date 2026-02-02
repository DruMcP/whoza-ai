import React from 'react';

export default function Step3TaskApproval() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="step-illustration"
      role="img"
      aria-labelledby="step3-title step3-desc"
    >
      <title id="step3-title">Task Approval</title>
      <desc id="step3-desc">Angular checkmark with approval hand shape representing human approval</desc>

      <defs>
        <linearGradient id="step3Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9EF01A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#9EF01A" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      <circle cx="100" cy="100" r="50" fill="#141414" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />

      <path
        d="M 75 100 L 90 115 L 125 75"
        stroke="#9EF01A"
        strokeWidth="4"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        fill="none"
      />

      <g className="approval-hand" opacity="0.4">
        <path
          d="M 140 120 L 145 110 L 145 95 L 140 90 L 135 95 L 135 100"
          stroke="#9EF01A"
          strokeWidth="1.5"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          fill="none"
        />
        <path
          d="M 135 100 L 130 95 L 125 95 L 120 100 L 120 115 L 125 120 L 135 120"
          stroke="#9EF01A"
          strokeWidth="1.5"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          fill="none"
        />
        <line x1="120" y1="100" x2="120" y2="90" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <line x1="125" y1="95" x2="125" y2="85" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <line x1="130" y1="95" x2="130" y2="85" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
      </g>

      <circle cx="100" cy="100" r="60" stroke="url(#step3Gradient)" strokeWidth="2" opacity="0.3" />
    </svg>
  );
}
