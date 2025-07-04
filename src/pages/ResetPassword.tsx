
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Flame, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [isValidSession, setIsValidSession] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeReset = async () => {
      console.log('Initializing password reset...');
      console.log('URL search params:', window.location.search);
      console.log('URL hash:', window.location.hash);
      
      // Check URL parameters for recovery tokens
      const urlParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      
      // Try to get tokens from either search params or hash
      let accessToken = urlParams.get('access_token') || hashParams.get('access_token');
      let refreshToken = urlParams.get('refresh_token') || hashParams.get('refresh_token');
      let type = urlParams.get('type') || hashParams.get('type');
      
      console.log('Reset password params:', { 
        type, 
        accessToken: !!accessToken, 
        refreshToken: !!refreshToken,
        fullURL: window.location.href
      });
      
      // Check if this is a password recovery session
      if (type === 'recovery' && accessToken && refreshToken) {
        try {
          console.log('Setting recovery session with tokens...');
          // Set the session with the recovery tokens
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          if (error) {
            console.error('Recovery session error:', error);
            toast({
              title: "Invalid Link",
              description: "This password reset link is invalid or has expired.",
              variant: "destructive"
            });
            navigate('/login');
            return;
          }

          console.log('Recovery session set successfully:', data);
          setIsValidSession(true);
          
          // Clear the URL parameters to prevent confusion
          window.history.replaceState({}, document.title, '/reset-password');
          
        } catch (error) {
          console.error('Recovery session setup error:', error);
          toast({
            title: "Error",
            description: "An error occurred while setting up password reset.",
            variant: "destructive"
          });
          navigate('/login');
        }
      } else if (!accessToken || !refreshToken) {
        console.log('No recovery tokens found, checking existing session...');
        
        // Check if user is already logged in with a valid session
        const { data: { session }, error } = await supabase.auth.getSession();
        if (session && !error) {
          console.log('Found existing session, checking if it is a recovery session');
          // Allow password reset for existing sessions as well
          setIsValidSession(true);
        } else {
          console.log('No valid session found');
          toast({
            title: "Invalid Link",
            description: "This password reset link is invalid or has expired. Please request a new one.",
            variant: "destructive"
          });
          navigate('/login');
        }
      } else {
        console.log('Invalid recovery type or missing parameters');
        toast({
          title: "Invalid Link",
          description: "This password reset link is invalid or has expired.",
          variant: "destructive"
        });
        navigate('/login');
      }
      
      setIsInitialized(true);
    };

    initializeReset();
  }, [navigate, toast]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidSession) {
      toast({
        title: "Error",
        description: "Invalid session. Please try requesting a new password reset link.",
        variant: "destructive"
      });
      return;
    }
    
    // Validation
    if (!formData.password || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log('Updating password...');
      const { error } = await supabase.auth.updateUser({
        password: formData.password
      });

      if (error) {
        console.error('Password update error:', error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Your password has been updated successfully. You can now sign in with your new password."
      });
      
      // Sign out and redirect to login page
      console.log('Signing out after password reset...');
      await supabase.auth.signOut();
      navigate('/login');
      
    } catch (error) {
      console.error('Unexpected error during password update:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Setting up password reset...</span>
        </div>
      </div>
    );
  }

  if (!isValidSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-lg text-red-600">Invalid or expired reset link</div>
          <p className="text-gray-600">Please request a new password reset link from the login page.</p>
          <Link to="/login" className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Link 
            to="/login" 
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Login</span>
          </Link>
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-gray-900">45-Day Challenge</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-3 pb-6">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
                Reset Password
              </CardTitle>
              <p className="text-gray-600 text-sm sm:text-base">
                Enter your new password below
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter your new password"
                      required
                      disabled={isLoading}
                      className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg text-base pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm your new password"
                      required
                      disabled={isLoading}
                      className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg text-base pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-sm text-orange-700">
                    <strong>Password requirements:</strong>
                    <br />
                    • At least 6 characters long
                    <br />
                    • Passwords must match
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating Password...
                    </div>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
