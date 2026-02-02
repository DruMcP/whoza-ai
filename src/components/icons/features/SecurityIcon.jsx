import { forwardRef } from 'react';

const SecurityIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M12 3 L19 6 V11 C19 15.5 15.5 19.5 12 21 C8.5 19.5 5 15.5 5 11 V6 Z"/>
      <path d="M9 12 L11 14 L15 10"/>
    </g>
  </svg>
));

SecurityIcon.displayName = 'SecurityIcon';

export default SecurityIcon;
