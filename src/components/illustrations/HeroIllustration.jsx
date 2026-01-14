import React from 'react';

export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 1200 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hero-illustration"
      role="img"
      aria-labelledby="hero-illustration-title hero-illustration-desc"
    >
      <title id="hero-illustration-title">AI-Driven Business Visibility</title>
      <desc id="hero-illustration-desc">
        Abstract illustration showing a central business node with AI-powered visibility rays emanating outward
      </desc>

      <defs>
        <linearGradient id="limeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9EF01A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#9EF01A" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E1E1E" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            .central-node { animation: float 4s ease-in-out infinite; }
          `}
        </style>
      </defs>

      <g className="visibility-rays" opacity="0.08">
        <path d="M 600 400 L 50 100" stroke="#141414" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M 600 400 L 200 50" stroke="#141414" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M 600 400 L 400 30" stroke="#141414" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M 600 400 L 800 30" stroke="#141414" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M 600 400 L 1000 50" stroke="#141414" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M 600 400 L 1150 100" stroke="#141414" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />

        <path d="M 600 400 L 1150 700" stroke="#141414" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M 600 400 L 1000 750" stroke="#141414" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M 600 400 L 800 770" stroke="#141414" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M 600 400 L 400 770" stroke="#141414" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M 600 400 L 200 750" stroke="#141414" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M 600 400 L 50 700" stroke="#141414" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />

        <path d="M 600 400 L 20 400" stroke="#141414" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M 600 400 L 1180 400" stroke="#141414" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
      </g>

      <g className="ai-nodes">
        <polygon points="100,120 120,130 120,150 100,160 80,150 80,130" fill="url(#darkGradient)" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <polygon points="250,70 270,80 270,100 250,110 230,100 230,80" fill="url(#darkGradient)" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <polygon points="450,50 470,60 470,80 450,90 430,80 430,60" fill="url(#darkGradient)" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <polygon points="850,50 870,60 870,80 850,90 830,80 830,60" fill="url(#darkGradient)" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <polygon points="1050,70 1070,80 1070,100 1050,110 1030,100 1030,80" fill="url(#darkGradient)" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <polygon points="1100,120 1120,130 1120,150 1100,160 1080,150 1080,130" fill="url(#darkGradient)" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />

        <polygon points="1100,680 1120,690 1120,710 1100,720 1080,710 1080,690" fill="url(#darkGradient)" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <polygon points="1050,730 1070,740 1070,760 1050,770 1030,760 1030,740" fill="url(#darkGradient)" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <polygon points="850,750 870,760 870,780 850,790 830,780 830,760" fill="url(#darkGradient)" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <polygon points="450,750 470,760 470,780 450,790 430,780 430,760" fill="url(#darkGradient)" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <polygon points="250,730 270,740 270,760 250,770 230,760 230,740" fill="url(#darkGradient)" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <polygon points="100,680 120,690 120,710 100,720 80,710 80,690" fill="url(#darkGradient)" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />

        <polygon points="20,420 40,430 40,450 20,460 0,450 0,430" fill="url(#darkGradient)" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <polygon points="1180,420 1200,430 1200,450 1180,460 1160,450 1160,430" fill="url(#darkGradient)" stroke="#9EF01A" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter" />
      </g>

      <g className="interaction-shards">
        <path d="M 300 200 L 320 180 L 310 160 Z" fill="#9EF01A" opacity="0.3" />
        <path d="M 900 200 L 920 180 L 910 160 Z" fill="#9EF01A" opacity="0.3" />
        <path d="M 200 500 L 220 480 L 210 460 Z" fill="#9EF01A" opacity="0.4" />
        <path d="M 1000 500 L 1020 480 L 1010 460 Z" fill="#9EF01A" opacity="0.4" />
        <path d="M 400 650 L 420 630 L 410 610 Z" fill="#9EF01A" opacity="0.3" />
        <path d="M 800 650 L 820 630 L 810 610 Z" fill="#9EF01A" opacity="0.3" />
      </g>

      <g className="central-node">
        <polygon
          points="600,320 660,340 680,400 660,460 600,480 540,460 520,400 540,340"
          fill="#141414"
          stroke="#9EF01A"
          strokeWidth="2"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />

        <polygon
          points="600,340 640,355 655,400 640,445 600,460 560,445 545,400 560,355"
          fill="url(#limeGlow)"
          filter="url(#glow)"
        />

        <g className="lightning-bolt">
          <path
            d="M 615 370 L 595 400 L 605 400 L 585 430 L 615 405 L 605 405 Z"
            fill="#141414"
            stroke="#9EF01A"
            strokeWidth="1.5"
            strokeLinecap="butt"
            strokeLinejoin="miter"
          />
        </g>
      </g>
    </svg>
  );
}
