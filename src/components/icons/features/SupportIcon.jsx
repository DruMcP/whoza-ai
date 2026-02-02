import { forwardRef } from 'react';

const SupportIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M12 3 C7.0 3 3 7.0 3 12 L3 16 L7 16 L7 12 C7 9.2 9.2 7 12 7 C14.8 7 17 9.2 17 12 L17 16 L21 16 L21 12 C21 7.0 17.0 3 12 3 Z"/>
      <rect x="3" y="15" width="4" height="6" rx="0"/>
      <rect x="17" y="15" width="4" height="6" rx="0"/>
    </g>
  </svg>
));

SupportIcon.displayName = 'SupportIcon';

export default SupportIcon;
