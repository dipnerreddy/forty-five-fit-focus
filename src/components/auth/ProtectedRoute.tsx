
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log('ProtectedRoute: Component mounting...');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('ProtectedRoute: Checking authentication...');
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('ProtectedRoute: Session error:', sessionError);
          setError(`Session error: ${sessionError.message}`);
          navigate('/login');
          return;
        }
        
        console.log('ProtectedRoute: Session data:', session ? 'User logged in' : 'No session');
        
        if (!session) {
          console.log('ProtectedRoute: No session, redirecting to login...');
          navigate('/login');
          return;
        }
        
        console.log('ProtectedRoute: User authenticated, showing protected content');
        setIsAuthenticated(true);
      } catch (error) {
        console.error('ProtectedRoute: Auth check error:', error);
        setError(`Auth check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('ProtectedRoute: Auth state change:', event, session ? 'User logged in' : 'No session');
        
        if (!session) {
          console.log('ProtectedRoute: Auth state change - redirecting to login');
          navigate('/login');
        } else {
          console.log('ProtectedRoute: Auth state change - user authenticated');
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      }
    );

    return () => {
      console.log('ProtectedRoute: Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-4">Authentication Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={() => window.location.href = '/login'}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    console.log('ProtectedRoute: Still loading...');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute: Not authenticated, should redirect...');
    return null; // Will redirect to login
  }

  console.log('ProtectedRoute: Rendering protected content');
  return <>{children}</>;
};

export default ProtectedRoute;
