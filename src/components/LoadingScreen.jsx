/**
 * Accessible loading screen with ARIA live region for screen readers
 * @param {Object} props
 * @param {string} [props.message='Loading...'] - Primary loading message
 * @param {string} [props.submessage] - Secondary description
 */
export default function LoadingScreen({ message, submessage }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center" role="status" aria-live="polite" aria-busy="true">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-6" aria-hidden="true" />
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          {message || 'Loading...'}
        </h2>
        {submessage && (
          <p className="text-slate-500">{submessage}</p>
        )}
        <span className="sr-only">{message || 'Loading...'} {submessage || ''}</span>
      </div>
    </div>
  );
}
