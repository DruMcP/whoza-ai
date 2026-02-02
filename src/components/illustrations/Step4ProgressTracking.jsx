import React from 'react';

export default function Step4ProgressTracking() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="step-illustration"
      role="img"
      aria-labelledby="step4-title step4-desc"
    >
      <title id="step4-title">Progress Tracking</title>
      <desc id="step4-desc">Sharp upward-trending line graph with angular data points representing progress tracking</desc>

      <defs>
        <linearGradient id="step4Gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9EF01A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#9EF01A" stopOpacity="0" />
        </linearGradient>
      </defs>

      <line x1="40" y1="160" x2="40" y2="40" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" opacity="0.4" />
      <line x1="40" y1="160" x2="160" y2="160" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" opacity="0.4" />

      <polyline
        points="40,150 65,130 90,100 115,80 140,50 160,35"
        stroke="#9EF01A"
        strokeWidth="2"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        fill="none"
      />

      <polygon
        points="40,150 65,130 90,100 115,80 140,50 160,35 160,160 40,160"
        fill="url(#step4Gradient)"
      />

      <g className="data-points">
        <polygon points="40,150 45,145 50,150 45,155" fill="#9EF01A" stroke="#141414" strokeWidth="1" />
        <polygon points="65,130 70,125 75,130 70,135" fill="#9EF01A" stroke="#141414" strokeWidth="1" />
        <polygon points="90,100 95,95 100,100 95,105" fill="#9EF01A" stroke="#141414" strokeWidth="1" />
        <polygon points="115,80 120,75 125,80 120,85" fill="#9EF01A" stroke="#141414" strokeWidth="1" />
        <polygon points="140,50 145,45 150,50 145,55" fill="#9EF01A" stroke="#141414" strokeWidth="1" />
        <polygon points="160,35 165,30 170,35 165,40" fill="#9EF01A" stroke="#141414" strokeWidth="1" />
      </g>

      <g className="grid-lines" opacity="0.2">
        <line x1="40" y1="120" x2="160" y2="120" stroke="#9EF01A" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="40" y1="80" x2="160" y2="80" stroke="#9EF01A" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="80" y1="40" x2="80" y2="160" stroke="#9EF01A" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="120" y1="40" x2="120" y2="160" stroke="#9EF01A" strokeWidth="0.5" strokeDasharray="2 2" />
      </g>
    </svg>
  );
}
