import { forwardRef } from 'react';

const SearchIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <circle cx="10.5" cy="10.5" r="6.5"/>
      <path d="M15.2 15.2 L20 20"/>
    </g>
  </svg>
));

SearchIcon.displayName = 'SearchIcon';

export default SearchIcon;
