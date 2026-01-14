import React from 'react';

export default function EmptyStateNoData() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="empty-state-illustration"
      role="img"
      aria-labelledby="empty-data-title empty-data-desc"
    >
      <title id="empty-data-title">No Data Available</title>
      <desc id="empty-data-desc">Blank chart with pulsing Decision-Z logo indicating no data yet</desc>

      <defs>
        <linearGradient id="emptyDataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E1E1E" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>

        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 1; }
            }
            .pulsing-logo { animation: pulse 2s ease-in-out infinite; }
          `}
        </style>
      </defs>

      <line
        x1="40"
        y1="150"
        x2="40"
        y2="50"
        stroke="#9EF01A"
        strokeWidth="1.5"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        opacity="0.3"
      />
      <line
        x1="40"
        y1="150"
        x2="160"
        y2="150"
        stroke="#9EF01A"
        strokeWidth="1.5"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        opacity="0.3"
      />

      <g className="grid-lines" opacity="0.15">
        <line x1="40" y1="110" x2="160" y2="110" stroke="#9EF01A" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="40" y1="70" x2="160" y2="70" stroke="#9EF01A" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="80" y1="50" x2="80" y2="150" stroke="#9EF01A" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="120" y1="50" x2="120" y2="150" stroke="#9EF01A" strokeWidth="0.5" strokeDasharray="2 2" />
      </g>

      <g className="empty-bars" opacity="0.2">
        <rect x="60" y="120" width="15" height="30" fill="#9EF01A" />
        <rect x="92" y="100" width="15" height="50" fill="#9EF01A" />
        <rect x="124" y="90" width="15" height="60" fill="#9EF01A" />
      </g>

      <g className="pulsing-logo">
        <polygon
          points="100,85 115,92 120,107 115,122 100,129 85,122 80,107 85,92"
          fill="url(#emptyDataGradient)"
          stroke="#9EF01A"
          strokeWidth="1.5"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />

        <path
          d="M 108 100 L 95 115 L 102 115 L 88 130 L 108 117 L 101 117 Z"
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
