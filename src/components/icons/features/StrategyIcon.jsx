import { forwardRef } from 'react';

const StrategyIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M12 3 L20 7 L20 17 L12 21 L4 17 L4 7 Z"/>
      <path d="M12 3 V12"/>
      <path d="M4 7 L12 12 L20 7"/>
      <circle cx="12" cy="12" r="2"/>
    </g>
  </svg>
));

StrategyIcon.displayName = 'StrategyIcon';

export default StrategyIcon;
