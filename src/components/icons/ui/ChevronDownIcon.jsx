import { forwardRef } from 'react';

const ChevronDownIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M6 9 L12 15 L18 9"/>
    </g>
  </svg>
));

ChevronDownIcon.displayName = 'ChevronDownIcon';

export default ChevronDownIcon;
