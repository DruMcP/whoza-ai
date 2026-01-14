import { memo } from 'react';

const BrandLightningIcon = memo(function BrandLightningIcon({ className = '', size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
        fill="#9EF01A"
        stroke="#9EF01A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

BrandLightningIcon.displayName = 'BrandLightningIcon';

export default BrandLightningIcon;
