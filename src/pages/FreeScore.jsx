import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * FreeScore - Redirected to Competitor Analysis
 * 
 * The free score tool has been upgraded to the Competitor Analysis.
 * All traffic from /free-score now redirects to /competitor-analysis.
 */
export default function FreeScore() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to competitor analysis immediately
    navigate('/competitor-analysis', { replace: true });
  }, [navigate]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-600">Redirecting to competitor analysis...</p>
      </div>
    </div>
  );
}
