
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SignupForm from '@/components/signup/SignupForm';

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
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
                Join the Challenge
              </CardTitle>
              <p className="text-gray-600 text-sm sm:text-base">
                Begin your transformation in just 45 days
              </p>
            </CardHeader>
            
            <CardContent>
              <SignupForm />
              
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                </div>
              </div>
              
              <Link to="/login" className="block mt-6">
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-2 border-orange-200 text-orange-600 hover:bg-orange-50 font-semibold rounded-lg transition-all duration-200 text-base"
                >
                  Sign In Instead
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
