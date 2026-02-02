export default function RexIllustration({ size = 350, style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      role="img"
      aria-label="Rex AI Employee illustration"
    >
      {/* Background glow */}
      <defs>
        <radialGradient id="rexGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#84CC16" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#84CC16" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9EF01A" />
          <stop offset="100%" stopColor="#84CC16" />
        </linearGradient>
      </defs>

      {/* Glow circle */}
      <circle cx="200" cy="200" r="180" fill="url(#rexGlow)" />

      {/* Main body - Robot/AI assistant shape */}
      <g transform="translate(200, 200)">
        {/* Body */}
        <rect
          x="-60"
          y="20"
          width="120"
          height="100"
          rx="20"
          fill="url(#rexGradient)"
          opacity="0.9"
        />

        {/* Head */}
        <rect
          x="-50"
          y="-80"
          width="100"
          height="90"
          rx="15"
          fill="url(#rexGradient)"
        />

        {/* Eyes */}
        <circle cx="-25" cy="-50" r="12" fill="#0f172a" />
        <circle cx="25" cy="-50" r="12" fill="#0f172a" />
        <circle cx="-22" cy="-52" r="5" fill="#ffffff" />
        <circle cx="28" cy="-52" r="5" fill="#ffffff" />

        {/* Smile */}
        <path
          d="M -20 -25 Q 0 -15 20 -25"
          stroke="#0f172a"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Antenna */}
        <line x1="0" y1="-80" x2="0" y2="-100" stroke="#84CC16" strokeWidth="4" />
        <circle cx="0" cy="-105" r="8" fill="#9EF01A" />

        {/* Arms */}
        <rect
          x="-80"
          y="40"
          width="20"
          height="60"
          rx="10"
          fill="url(#rexGradient)"
          opacity="0.8"
        />
        <rect
          x="60"
          y="40"
          width="20"
          height="60"
          rx="10"
          fill="url(#rexGradient)"
          opacity="0.8"
        />

        {/* Hands with tool icon */}
        <circle cx="-70" cy="110" r="15" fill="#84CC16" />
        <circle cx="70" cy="110" r="15" fill="#84CC16" />

        {/* Wrench icon in left hand */}
        <path
          d="M -75 105 L -65 115"
          stroke="#0f172a"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="-77" cy="103" r="3" fill="none" stroke="#0f172a" strokeWidth="2" />

        {/* Checkmark in right hand */}
        <path
          d="M 65 110 L 70 115 L 80 105"
          stroke="#0f172a"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Screen/Display on chest */}
        <rect
          x="-35"
          y="45"
          width="70"
          height="40"
          rx="8"
          fill="#0f172a"
          opacity="0.6"
        />

        {/* AI signal bars on screen */}
        <rect x="-25" y="70" width="8" height="10" rx="2" fill="#9EF01A" />
        <rect x="-12" y="65" width="8" height="15" rx="2" fill="#9EF01A" />
        <rect x="1" y="60" width="8" height="20" rx="2" fill="#9EF01A" />
        <rect x="14" y="55" width="8" height="25" rx="2" fill="#9EF01A" />
      </g>

      {/* Floating task cards around Rex */}
      <g opacity="0.7">
        {/* Task card 1 - top left */}
        <rect
          x="30"
          y="60"
          width="80"
          height="50"
          rx="8"
          fill="#ffffff"
          stroke="#84CC16"
          strokeWidth="2"
        />
        <rect x="40" y="75" width="40" height="6" rx="3" fill="#84CC16" />
        <rect x="40" y="88" width="60" height="4" rx="2" fill="#d1d5db" />
        <rect x="40" y="96" width="50" height="4" rx="2" fill="#d1d5db" />

        {/* Task card 2 - top right */}
        <rect
          x="290"
          y="80"
          width="80"
          height="50"
          rx="8"
          fill="#ffffff"
          stroke="#84CC16"
          strokeWidth="2"
        />
        <rect x="300" y="95" width="40" height="6" rx="3" fill="#84CC16" />
        <rect x="300" y="108" width="60" height="4" rx="2" fill="#d1d5db" />
        <rect x="300" y="116" width="50" height="4" rx="2" fill="#d1d5db" />

        {/* Task card 3 - bottom left */}
        <rect
          x="40"
          y="290"
          width="80"
          height="50"
          rx="8"
          fill="#ffffff"
          stroke="#84CC16"
          strokeWidth="2"
        />
        <rect x="50" y="305" width="40" height="6" rx="3" fill="#84CC16" />
        <rect x="50" y="318" width="60" height="4" rx="2" fill="#d1d5db" />
        <rect x="50" y="326" width="50" height="4" rx="2" fill="#d1d5db" />

        {/* Task card 4 - bottom right */}
        <rect
          x="280"
          y="280"
          width="80"
          height="50"
          rx="8"
          fill="#ffffff"
          stroke="#84CC16"
          strokeWidth="2"
        />
        <rect x="290" y="295" width="40" height="6" rx="3" fill="#84CC16" />
        <rect x="290" y="308" width="60" height="4" rx="2" fill="#d1d5db" />
        <rect x="290" y="316" width="50" height="4" rx="2" fill="#d1d5db" />
      </g>

      {/* AI sparkles */}
      <g fill="#9EF01A" opacity="0.6">
        <circle cx="100" cy="150" r="3" />
        <circle cx="120" cy="180" r="2" />
        <circle cx="300" cy="160" r="3" />
        <circle cx="320" cy="190" r="2" />
        <circle cx="90" cy="250" r="2" />
        <circle cx="310" cy="240" r="3" />
      </g>
    </svg>
  );
}
