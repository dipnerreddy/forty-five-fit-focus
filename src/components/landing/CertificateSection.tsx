
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Flame, Trophy, CheckCircle } from 'lucide-react';

const CertificateSection = () => {
  return (
    <div className="py-16 sm:py-24 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-6">
            Earn Your <span className="text-orange-500">Victory Certificate</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete all 45 days and earn a shareable certificate that proves your dedication and mental strength.
          </p>
        </div>

        <div className="flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-pointer transform transition-all duration-300 hover:scale-105">
                <Card className="w-full max-w-2xl shadow-2xl border-4 border-orange-200 bg-gradient-to-br from-white to-orange-50">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 bg-orange-500 h-32 flex flex-col items-center justify-between p-3 rounded">
                        <Flame className="h-8 w-8 text-white" />
                        <p className="transform rotate-180 text-white font-semibold text-xs tracking-widest [writing-mode:vertical-rl]">
                          45-DAY
                        </p>
                      </div>
                      <div className="flex-1">
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-400 tracking-widest">CERTIFICATE OF ACHIEVEMENT</p>
                          <h3 className="text-lg font-bold text-gray-800">Official Completion Record</h3>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">This certificate is proudly presented to</p>
                          <p className="text-3xl font-black text-gray-900">Your Name Here</p>
                          <p className="text-sm text-gray-600 mt-1">
                            For completing the <span className="font-bold">45-Day Fitness Challenge</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm font-semibold">Verified Completion</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Trophy className="mr-2 h-4 w-4" />
                        View Full Certificate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DialogTrigger>
            
            <DialogContent className="max-w-4xl">
              <div className="aspect-[1.414/1] w-full flex bg-white shadow-2xl rounded-lg overflow-hidden">
                <div className="w-24 bg-orange-500 flex flex-col items-center justify-between p-6">
                  <Flame className="h-12 w-12 text-white" />
                  <p className="transform rotate-180 text-white font-semibold tracking-widest [writing-mode:vertical-rl]">
                    45-DAY CHALLENGE
                  </p>
                </div>
                <div className="flex-1 p-12 flex flex-col">
                  <div>
                    <p className="text-sm font-semibold text-gray-400 tracking-widest">CERTIFICATE OF ACHIEVEMENT</p>
                    <h1 className="text-2xl font-bold text-gray-800">Official Completion Record</h1>
                  </div>
                  <div className="flex-grow" />
                  <div>
                    <p className="text-lg text-gray-500">This certificate is proudly presented to</p>
                    <p className="text-7xl font-black text-gray-900 leading-tight">
                      Your Name Here
                    </p>
                    <p className="text-lg text-gray-600 pt-2">
                      For the successful completion of the 
                      <span className="font-bold"> 45-Day Fitness Challenge </span> 
                      on the <span className="font-bold">Home/Gym Routine</span>.
                    </p>
                  </div>
                  <div className="flex-grow" />
                  <div className="flex justify-between items-end border-t pt-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="font-bold">December 2024</p>
                        <p className="text-sm text-gray-500">Date of Completion</p>
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-400">
                      <p>Credential ID: FC-SAMPLE-123456</p>
                      <p>Streak: 45 Days</p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CertificateSection;
