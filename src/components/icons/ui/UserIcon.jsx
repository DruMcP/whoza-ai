import { forwardRef } from 'react';

const UserIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20 C4 16.5 7.6 13.5 12 13.5 C16.4 13.5 20 16.5 20 20"/>
    </g>
  </svg>
));

UserIcon.displayName = 'UserIcon';

export default UserIcon;
