import { forwardRef } from 'react';

const GuaranteeIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M12 3.8 L18.2 6.4 V12.2 C18.2 15.7 15.6 18.7 12 20.2 C8.4 18.7 5.8 15.7 5.8 12.2 V6.4 Z"/>
    </g>
    <polygon points="10.2,7.0 13.6,7.0 12.1,10.0 14.4,10.0 10.8,17.2 12.0,13.2 10.2,13.2" fill={color}/>
  </svg>
));

GuaranteeIcon.displayName = 'GuaranteeIcon';

export default GuaranteeIcon;
