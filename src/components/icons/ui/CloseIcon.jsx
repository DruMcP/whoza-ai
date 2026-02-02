import { forwardRef } from 'react';

const CloseIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M6 6 L18 18"/>
      <path d="M18 6 L6 18"/>
    </g>
  </svg>
));

CloseIcon.displayName = 'CloseIcon';

export default CloseIcon;
