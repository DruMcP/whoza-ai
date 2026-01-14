import { forwardRef } from 'react';

const ScoreIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M4 20 L4 14 L8 14 L8 20"/>
      <path d="M10 20 L10 8 L14 8 L14 20"/>
      <path d="M16 20 L16 4 L20 4 L20 20"/>
      <path d="M3 20 H21"/>
    </g>
  </svg>
));

ScoreIcon.displayName = 'ScoreIcon';

export default ScoreIcon;
