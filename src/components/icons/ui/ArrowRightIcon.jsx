import { forwardRef } from 'react';

const ArrowRightIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M4.5 12 H17.2"/>
      <path d="M13.2 7.8 L17.6 12 L13.2 16.2"/>
    </g>
  </svg>
));

ArrowRightIcon.displayName = 'ArrowRightIcon';

export default ArrowRightIcon;
