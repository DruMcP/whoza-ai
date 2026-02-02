import { forwardRef } from 'react';

const TaskIcon = forwardRef(({ width = 24, height = 24, color = 'currentColor', ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
      <rect x="4" y="4" width="16" height="16" rx="0"/>
      <path d="M4 9 H20"/>
      <path d="M8 4 V9"/>
      <path d="M7 13 L9 15 L13 11"/>
      <path d="M7 17 H13"/>
    </g>
  </svg>
));

TaskIcon.displayName = 'TaskIcon';

export default TaskIcon;
