import { forwardRef } from 'react';

const WhatsAppIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M3 21 L4.5 15.5 C3.5 14 3 12.2 3 10.5 C3 5.8 6.8 2 11.5 2 C16.2 2 20 5.8 20 10.5 C20 15.2 16.2 19 11.5 19 C10 19 8.5 18.6 7.2 17.8 Z"/>
      <path d="M8.5 9 C8.5 9 9 8 10 8 C11 8 11.5 9 11.5 9.5 C11.5 10.5 10 11 10 12"/>
      <path d="M10 14 L10 14.5"/>
    </g>
  </svg>
));

WhatsAppIcon.displayName = 'WhatsAppIcon';

export default WhatsAppIcon;
