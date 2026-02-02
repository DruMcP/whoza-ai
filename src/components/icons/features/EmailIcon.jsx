import { forwardRef } from 'react';

const EmailIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <rect x="3" y="5" width="18" height="14" rx="0"/>
      <path d="M3 7 L12 13 L21 7"/>
    </g>
  </svg>
));

EmailIcon.displayName = 'EmailIcon';

export default EmailIcon;
