
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CertificateSectionProps {
  streak: number;
}

const CertificateSection = ({ streak }: CertificateSectionProps) => {
  const navigate = useNavigate();
  const isCertificateUnlocked = streak >= 45;

  return (
    <Card className={`border-0 shadow-sm ${isCertificateUnlocked ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-l-yellow-500' : 'bg-gray-50'}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {isCertificateUnlocked ? (
            <>
              <Award className="h-5 w-5 text-yellow-600" />
              <span className="text-yellow-800">Certificate Unlocked!</span>
            </>
          ) : (
            <>
              <Lock className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">Certificate Locked</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {isCertificateUnlocked ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-yellow-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-800">45-Day Challenge Champion</h3>
                <p className="text-sm text-yellow-700">Congratulations! You've completed the 45-day fitness challenge.</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/certificate')}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              <Award className="h-4 w-4 mr-2" />
              View Certificate
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Lock className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-600">Certificate Locked</h3>
                <p className="text-sm text-gray-500">Complete 45 days to unlock your certificate</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Progress to Certificate</span>
                <span className="text-sm font-medium text-gray-800">{streak}/45 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((streak / 45) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {45 - streak} more days to unlock
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificateSection;
