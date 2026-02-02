import React from 'react';
import { logger } from '../utils/logger';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
      errorId: `ERR-${Date.now()}`
    };
  }

  componentDidCatch(error, errorInfo) {
    logger.error('React Error Boundary caught error', {
      error,
      errorInfo,
      errorId: this.state.errorId,
      component: this.props.name || 'Unknown'
    });

    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: 'linear-gradient(135deg, #F0F6FE 0%, #FFFFFF 100%)'
        }}>
          <div className="modern-card" style={{
            maxWidth: '500px',
            textAlign: 'center',
            padding: '3rem'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 2rem',
              background: 'linear-gradient(135deg, #FFA85C 0%, #FF4D00 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem'
            }}>
              ⚠️
            </div>
            <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
              Something went wrong
            </h2>
            <p className="text-body" style={{ marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
              We encountered an unexpected error. Our team has been notified and is working on a fix.
            </p>
            {this.state.errorId && (
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)', marginBottom: '2rem', fontFamily: 'monospace' }}>
                Error ID: {this.state.errorId}
              </p>
            )}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={this.handleReset}
                className="button btn-hover"
                style={{ minWidth: '140px' }}
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="button-secondary btn-hover"
                style={{ minWidth: '140px' }}
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
