export default function LoadingScreen({ message, submessage }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-6" />
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          {message || 'Loading...'}
        </h2>
        {submessage && (
          <p className="text-slate-500">{submessage}</p>
        )}
      </div>
    </div>
  );
}
