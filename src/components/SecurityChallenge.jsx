import { useState, useEffect } from 'react';

export default function SecurityChallenge({ onVerified, onCancel }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateChallenge();
  }, []);

  const generateChallenge = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setAnswer('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const correctAnswer = num1 + num2;
    const userAnswer = parseInt(answer, 10);

    if (userAnswer === correctAnswer) {
      setTimeout(() => {
        setLoading(false);
        onVerified();
      }, 500);
    } else {
      setError('Incorrect answer. Please try again.');
      setLoading(false);
      generateChallenge();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000
    }}>
      <div style={{
        background: 'white',
        padding: 'var(--spacing-xl)',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <svg style={{ width: '48px', height: '48px', color: 'var(--color-primary-600)', margin: '0 auto' }} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <h2 style={{ marginTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-sm)' }}>Security Verification</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
            Please solve this simple math problem to verify you're human
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{
            background: 'var(--color-primary-50)',
            padding: 'var(--spacing-lg)',
            borderRadius: '4px',
            textAlign: 'center',
            marginBottom: 'var(--spacing-lg)',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'var(--color-primary-700)'
          }}>
            {num1} + {num2} = ?
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label htmlFor="captcha-answer" style={{
              display: 'block',
              marginBottom: 'var(--spacing-sm)',
              fontWeight: '500'
            }}>
              Your Answer:
            </label>
            <input
              id="captcha-answer"
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              autoFocus
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                fontSize: '18px',
                border: '2px solid var(--color-neutral-300)',
                borderRadius: '4px',
                textAlign: 'center'
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: 'var(--spacing-md)',
              background: 'var(--color-error-50)',
              color: 'var(--color-error-700)',
              borderRadius: '4px',
              marginBottom: 'var(--spacing-lg)',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <button
              type="submit"
              disabled={loading || !answer}
              className="button"
              style={{ flex: 1 }}
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="button-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <p style={{
          marginTop: 'var(--spacing-lg)',
          fontSize: '12px',
          color: 'var(--color-text-secondary)',
          textAlign: 'center'
        }}>
          This verification helps protect our platform from automated scrapers
        </p>
      </div>
    </div>
  );
}
