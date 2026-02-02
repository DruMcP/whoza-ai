import { forwardRef } from 'react';

const CompetitorIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <circle cx="8" cy="8" r="4"/>
      <circle cx="16" cy="16" r="4"/>
      <path d="M11.5 10.5 L14.5 13.5"/>
      <path d="M3 21 L8 16"/>
      <path d="M16 8 L21 3"/>
    </g>
  </svg>
));

CompetitorIcon.displayName = 'CompetitorIcon';

export default CompetitorIcon;
