import React from 'react';

export default function Step1BusinessProfile() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="step-illustration"
      role="img"
      aria-labelledby="step1-title step1-desc"
    >
      <title id="step1-title">Business Profile</title>
      <desc id="step1-desc">Angular document icon with lightning bolt representing business profile setup</desc>

      <defs>
        <linearGradient id="step1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E1E1E" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>
      </defs>

      <rect
        x="50"
        y="30"
        width="100"
        height="140"
        fill="url(#step1Gradient)"
        stroke="#9EF01A"
        strokeWidth="1.5"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />

      <path
        d="M 150 30 L 150 60 L 120 60 Z"
        fill="#141414"
        stroke="#9EF01A"
        strokeWidth="1.5"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />

      <line x1="65" y1="80" x2="110" y2="80" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" opacity="0.6" />
      <line x1="65" y1="95" x2="135" y2="95" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" opacity="0.4" />
      <line x1="65" y1="110" x2="125" y2="110" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" opacity="0.4" />

      <g className="lightning-bolt">
        <path
          d="M 110 135 L 95 155 L 103 155 L 88 175 L 110 157 L 102 157 Z"
          fill="#9EF01A"
          stroke="#141414"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
      </g>
    </svg>
  );
}
