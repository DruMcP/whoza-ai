import React from 'react';

export default function EmptyStateNoTasks() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="empty-state-illustration"
      role="img"
      aria-labelledby="empty-tasks-title empty-tasks-desc"
    >
      <title id="empty-tasks-title">No Tasks</title>
      <desc id="empty-tasks-desc">Empty task list with lime green checkmark indicating no pending tasks</desc>

      <defs>
        <linearGradient id="emptyTasksGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E1E1E" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>
      </defs>

      <rect
        x="50"
        y="40"
        width="100"
        height="120"
        rx="4"
        fill="url(#emptyTasksGradient)"
        stroke="#9EF01A"
        strokeWidth="1.5"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        opacity="0.3"
      />

      <g className="empty-task-items" opacity="0.2">
        <rect x="65" y="60" width="70" height="12" rx="2" fill="#9EF01A" />
        <rect x="65" y="80" width="70" height="12" rx="2" fill="#9EF01A" />
        <rect x="65" y="100" width="70" height="12" rx="2" fill="#9EF01A" />
        <rect x="65" y="120" width="70" height="12" rx="2" fill="#9EF01A" />
      </g>

      <circle
        cx="100"
        cy="100"
        r="30"
        fill="#141414"
        stroke="#9EF01A"
        strokeWidth="2"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />

      <path
        d="M 85 100 L 95 110 L 115 85"
        stroke="#9EF01A"
        strokeWidth="3"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        fill="none"
      />

      <circle cx="100" cy="100" r="40" stroke="#9EF01A" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
    </svg>
  );
}
