
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { customStorage } from '@/utils/sessionStorage';
import { Flame, ArrowLeft } from 'lucide-react';
import ForgotPasswordModal from '@/components/auth/ForgotPasswordModal';
import EmailInput from '@/components/auth/EmailInput';
import PasswordInput from '@/components/auth/PasswordInput';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Set storage type based on remember me checkbox
      // true = use sessionStorage (session only), false = use localStorage (persistent)
      customStorage.setStorageType(!rememberMe);
      
      console.log('Remember me:', rememberMe, 'Using storage:', rememberMe ? 'localStorage (persistent)' : 'sessionStorage (session only)');

      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Login Failed",
            description: "Invalid email or password. Please check your credentials and try again.",
            variant: "destructive"
          });
        } else if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email Not Verified",
            description: "Please check your email and click the verification link before signing in.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Login Error",
            description: error.message,
            variant: "destructive"
          });
        }
        return;
      }

      toast({
        title: "Welcome back!",
        description: rememberMe 
          ? "You'll stay signed in for 30 days." 
          : "You'll stay signed in until you close the browser."
      });
      
      // Navigate to dashboard on successful login
      navigate('/dashboard');
      
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-2 py-1"
            aria-label="Go back to home page"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
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
                Welcome Back
              </CardTitle>
              <p className="text-gray-600 text-sm sm:text-base">
                Continue your fitness journey
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-5" noValidate>
                <EmailInput
                  id="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
                
                <PasswordInput
                  id="password"
                  label="Password"
                  value={formData.password}
                  onChange={(value) => handleInputChange('password', value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                  className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg text-base"
                />

                {/* Remember Me */}
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    disabled={isLoading}
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <div className="space-y-1">
                    <label htmlFor="remember" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Keep me signed in
                    </label>
                    <p className="text-xs text-gray-500">
                      {rememberMe 
                        ? "Stay signed in for 30 days across browser sessions" 
                        : "Only stay signed in until you close this browser"
                      }
                    </p>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  disabled={isLoading}
                  aria-describedby="login-button-description"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
              
              {/* Forgot Password Button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-2 py-1"
                  aria-label="Open forgot password dialog"
                >
                  Forgot Password?
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">New to the challenge?</span>
                </div>
              </div>
              
              <Link to="/signup" className="block">
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-2 border-orange-200 text-orange-600 hover:bg-orange-50 font-semibold rounded-lg transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  disabled={isLoading}
                >
                  Start Your Journey
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <ForgotPasswordModal 
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
};

export default Login;
