
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Flame, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
    const initializeReset = async () => {
      // Check if this is a password reset flow
      const type = searchParams.get('type');
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      
      console.log('Reset password params:', { type, accessToken: !!accessToken, refreshToken: !!refreshToken });
      
      if (type !== 'recovery' || !accessToken || !refreshToken) {
        toast({
          title: "Invalid Link",
          description: "This password reset link is invalid or has expired.",
          variant: "destructive"
        });
        navigate('/login');
        return;
      }

      try {
        // Set the session with the tokens from the URL
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        });

        if (error) {
          console.error('Session error:', error);
          toast({
            title: "Invalid Link",
            description: "This password reset link is invalid or has expired.",
            variant: "destructive"
          });
          navigate('/login');
          return;
        }

        console.log('Session set successfully:', data);
        setIsValidSession(true);
      } catch (error) {
        console.error('Session setup error:', error);
        toast({
          title: "Error",
          description: "An error occurred while setting up password reset.",
          variant: "destructive"
        });
        navigate('/login');
      }
    };

    initializeReset();
  }, [searchParams, navigate, toast]);

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
      const { error } = await supabase.auth.updateUser({
        password: formData.password
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Your password has been updated successfully."
      });
      
      // Sign out and redirect to login page
      await supabase.auth.signOut();
      navigate('/login');
      
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="text-lg">Validating reset link...</div>
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
