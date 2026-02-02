import React from 'react';

const WhozaLogo = ({ className = '', height = 50, variant = 'dark' }) => {
  const textColor = variant === 'dark' ? '#FFFFFF' : '#000000';
  const boltColor = '#9EF01A';

  return (
    <svg
      viewBox="0 0 380 100"
      height={height}
      className={className}
      style={{ height: `${height}px`, width: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="whoza.ai"
    >
      <defs>
        <style>
          {`
            .logo-text {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              font-weight: 900;
              font-style: italic;
              font-size: 72px;
              letter-spacing: -3px;
            }
            .logo-bolt {
              filter: drop-shadow(0 0 20px rgba(158, 240, 26, 0.8)) drop-shadow(0 0 40px rgba(158, 240, 26, 0.4));
            }
          `}
        </style>
      </defs>

      <text x="10" y="70" className="logo-text" fill={textColor}>
        whoza.ai
      </text>

      <g className="logo-bolt">
        <path
          fill={boltColor}
          d="M 80 -10
             L 20 40
             L 45 40
             L -10 90
             L 15 90
             L -50 150
             L 30 75
             L 5 75
             L 65 25
             L 40 25
             Z"
          opacity="1.0"
        />
      </g>
    </svg>
  );
};

export default WhozaLogo;
