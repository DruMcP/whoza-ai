import { forwardRef } from 'react';

const VisibilityIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M3.2 12.0 L6.2 8.8 L12.0 6.8 L17.8 8.8 L20.8 12.0 L17.8 15.2 L12.0 17.2 L6.2 15.2 Z"/>
    </g>
    <polygon points="10.3,8.2 13.2,8.2 12.0,10.4 14.0,10.4 11.0,15.8 11.9,12.9 10.3,12.9" fill={color}/>
  </svg>
));

VisibilityIcon.displayName = 'VisibilityIcon';

export default VisibilityIcon;
