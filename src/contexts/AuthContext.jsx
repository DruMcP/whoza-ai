import { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { supabase, isAbortError } from '../lib/supabase';
import { analyticsService } from '../services/analyticsService';
import { logger } from '../utils/logger';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true);

  useEffect(() => {
    // Create AbortController for cleanup
    const abortController = new AbortController();
    isMountedRef.current = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        // Only update state if component is still mounted
        if (!isMountedRef.current) return;
        
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchUserData(session.user.id, abortController.signal);
        } else {
          setLoading(false);
        }
      } catch (error) {
        // Handle AbortError gracefully
        if (isAbortError(error)) {
          return;
        }
        logger.error('Error initializing auth session', { error });
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Don't process if component is unmounted
        if (!isMountedRef.current) return;

        (async () => {
          try {
            setUser(session?.user ?? null);
            if (session?.user) {
              await fetchUserData(session.user.id, abortController.signal);
              if (event === 'SIGNED_IN' && isMountedRef.current) {
                try {
                  await analyticsService.trackUserLogin(session.user.id);
                } catch (error) {
                  if (!isAbortError(error)) {
                    logger.error('Failed to track login', { error, userId: session.user.id });
                  }
                }
              }
            } else {
              if (isMountedRef.current) {
                setUserData(null);
                setLoading(false);
              }
            }
          } catch (error) {
            if (isAbortError(error)) {
              return;
            }
            logger.error('Error handling auth state change', { error });
          }
        })();
      }
    );

    // Cleanup function
    return () => {
      isMountedRef.current = false;
      abortController.abort();
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserData = useCallback(async (userId, signal) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, business_name, trade_type, created_at, role, subscription_tier, subscription_status, founder')
        .eq('id', userId)
        .maybeSingle()
        .abortSignal(signal);

      if (error) {
        // Handle AbortError gracefully
        if (isAbortError(error)) {
          return;
        }
        throw error;
      }
      
      if (isMountedRef.current) {
        setUserData(data);
      }
    } catch (error) {
      if (isAbortError(error)) {
        return;
      }
      logger.error('Error fetching user data', { error, userId });
      if (isMountedRef.current) {
        setUserData(null);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const signUp = useCallback(async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      return { data, error };
    } catch (error) {
      if (isAbortError(error)) {
        return { data: null, error: null };
      }
      return { data: null, error };
    }
  }, []);

  const signIn = useCallback(async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    } catch (error) {
      if (isAbortError(error)) {
        return { data: null, error: null };
      }
      return { data: null, error };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      if (isAbortError(error)) {
        return { error: null };
      }
      return { error };
    }
  }, []);

  const value = useMemo(() => ({
    user,
    userData,
    loading,
    signUp,
    signIn,
    signOut,
    isAdmin: userData?.role === 'admin',
  }), [user, userData, loading, signUp, signIn, signOut]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
