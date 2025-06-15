
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log('PublicRoute: Component mounting...');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('PublicRoute: Checking authentication...');
        
        // Special handling for password reset page
        if (location.pathname === '/reset-password') {
          // Check if this is a recovery link (has tokens in URL)
          const urlParams = new URLSearchParams(window.location.search);
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const type = urlParams.get('type') || hashParams.get('type');
          
          // If it's a recovery link, allow access regardless of auth state
          if (type === 'recovery') {
            console.log('PublicRoute: Recovery link detected, allowing access to reset page');
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
          }
        }
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('PublicRoute: Session error:', sessionError);
          setError(`Session error: ${sessionError.message}`);
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        
        console.log('PublicRoute: Session data:', session ? 'User logged in' : 'No session');
        
        if (session) {
          // Don't redirect if on reset password page - allow password reset even when logged in
          if (location.pathname === '/reset-password') {
            console.log('PublicRoute: User authenticated but on reset page, allowing access');
            setIsAuthenticated(false);
          } else {
            console.log('PublicRoute: User authenticated, redirecting to dashboard...');
            navigate('/dashboard');
            return;
          }
        } else {
          console.log('PublicRoute: No session, showing public content');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('PublicRoute: Auth check error:', error);
        setError(`Auth check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('PublicRoute: Auth state change:', event, session ? 'User logged in' : 'No session');
        
        // Special handling for password reset page
        if (location.pathname === '/reset-password') {
          console.log('PublicRoute: On reset page, not redirecting on auth change');
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        
        if (session) {
          console.log('PublicRoute: Auth state change - redirecting to dashboard');
          navigate('/dashboard');
        } else {
          console.log('PublicRoute: Auth state change - no session');
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      }
    );

    return () => {
      console.log('PublicRoute: Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-4">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    console.log('PublicRoute: Still loading...');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    console.log('PublicRoute: User authenticated, should redirect...');
    return null; // Will redirect to dashboard
  }

  console.log('PublicRoute: Rendering public content');
  return <>{children}</>;
};

export default PublicRoute;
