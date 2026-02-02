import { forwardRef } from 'react';

const ExternalLinkIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M18 13 V19 H5 V6 H11"/>
      <path d="M15 3 H21 V9"/>
      <path d="M21 3 L12 12"/>
    </g>
  </svg>
));

ExternalLinkIcon.displayName = 'ExternalLinkIcon';

export default ExternalLinkIcon;
