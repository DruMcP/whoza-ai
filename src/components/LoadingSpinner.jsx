import { memo } from 'react';
import WhozaLogo from './WhozaLogo';

const LoadingSpinner = memo(function LoadingSpinner({ size = 100 }) {
  return (
    <div
      className="loading-spinner-container"
      role="status"
      aria-label="Loading..."
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <div className="logo-pulse">
        <WhozaLogo height={size} variant="dark" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
});

export default LoadingSpinner;
