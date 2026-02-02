import { forwardRef } from 'react';

const CheckIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M4 12.5 L9.3 17.2 L20 6.8"/>
    </g>
  </svg>
));

CheckIcon.displayName = 'CheckIcon';

export default CheckIcon;
