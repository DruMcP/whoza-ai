import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current session
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          navigate('/sign-in', { state: { error: 'Authentication failed. Please try again.' } });
          return;
        }

        if (session) {
          // Successfully authenticated
          navigate('/portal');
        } else {
          // No session found
          navigate('/sign-in');
        }
      } catch (err) {
        navigate('/sign-in', { state: { error: 'An unexpected error occurred.' } });
      }
    };

    handleAuthCallback();

    // Also listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/portal');
      } else if (event === 'SIGNED_OUT') {
        navigate('/sign-in');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
      <div className="text-center">
        <LoadingSpinner size={60} />
        <p className="mt-4 text-lg text-slate-600">Completing sign in...</p>
      </div>
    </div>
  );
}
