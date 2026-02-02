import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '../lib/supabase';
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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        (async () => {
          setUser(session?.user ?? null);
          if (session?.user) {
            await fetchUserData(session.user.id);
            if (event === 'SIGNED_IN') {
              try {
                await analyticsService.trackUserLogin(session.user.id);
              } catch (error) {
                logger.error('Failed to track login', { error, userId: session.user.id });
              }
            }
          } else {
            setUserData(null);
            setLoading(false);
          }
        })();
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = useCallback(async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, business_name, trade_type, created_at, role, subscription_tier, subscription_status, founder')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      setUserData(data);
    } catch (error) {
      logger.error('Error fetching user data', { error, userId });
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  }, []);

  const signIn = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
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
