import { forwardRef } from 'react';

const SettingsIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <circle cx="12" cy="12" r="3"/>
      <path d="M10.5 3 L13.5 3 L14.2 5.8 L16.8 6.8 L19.2 5.3 L21.2 7.3 L19.7 9.7 L20.7 12.3 L23.5 13 L23.5 16 L20.7 16.7 L19.7 19.3 L21.2 21.7 L19.2 23.7 L16.8 22.2 L14.2 23.2 L13.5 26 L10.5 26 L9.8 23.2 L7.2 22.2 L4.8 23.7 L2.8 21.7 L4.3 19.3 L3.3 16.7 L0.5 16 L0.5 13 L3.3 12.3 L4.3 9.7 L2.8 7.3 L4.8 5.3 L7.2 6.8 L9.8 5.8 Z"
            transform="scale(0.75) translate(4, 4)"/>
    </g>
  </svg>
));

SettingsIcon.displayName = 'SettingsIcon';

export default SettingsIcon;
