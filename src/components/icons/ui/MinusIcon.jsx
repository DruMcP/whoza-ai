import { forwardRef } from 'react';

const MinusIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M5 12 H19"/>
    </g>
  </svg>
));

MinusIcon.displayName = 'MinusIcon';

export default MinusIcon;
