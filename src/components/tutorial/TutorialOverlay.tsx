
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTutorial } from '@/contexts/TutorialContext';
import { X, ArrowLeft, ArrowRight, SkipForward } from 'lucide-react';

export const TutorialOverlay: React.FC = () => {
  const { isActive, currentStep, steps, nextStep, prevStep, skipTutorial } = useTutorial();
  const [highlightPosition, setHighlightPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!isActive || !steps[currentStep]) return;

    const updatePosition = () => {
      const targetElement = document.querySelector(steps[currentStep].target);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const padding = 8;
        
        setHighlightPosition({
          top: rect.top - padding,
          left: rect.left - padding,
          width: rect.width + (padding * 2),
          height: rect.height + (padding * 2)
        });

        // Position tooltip based on step position preference
        const step = steps[currentStep];
        let tooltipTop = rect.top;
        let tooltipLeft = rect.left;

        switch (step.position) {
          case 'bottom':
            tooltipTop = rect.bottom + 16;
            tooltipLeft = Math.max(16, Math.min(rect.left, window.innerWidth - 320));
            break;
          case 'top':
            tooltipTop = rect.top - 180;
            tooltipLeft = Math.max(16, Math.min(rect.left, window.innerWidth - 320));
            break;
          case 'right':
            tooltipTop = rect.top;
            tooltipLeft = rect.right + 16;
            break;
          case 'left':
            tooltipTop = rect.top;
            tooltipLeft = rect.left - 336;
            break;
        }

        // Ensure tooltip stays within viewport
        tooltipTop = Math.max(16, Math.min(tooltipTop, window.innerHeight - 200));
        tooltipLeft = Math.max(16, Math.min(tooltipLeft, window.innerWidth - 320));

        setTooltipPosition({ top: tooltipTop, left: tooltipLeft });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isActive, currentStep, steps]);

  if (!isActive || !steps[currentStep]) return null;

  const currentTutorialStep = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Dark overlay with spotlight effect */}
      <div 
        className="absolute inset-0 bg-black/60 transition-all duration-300"
        style={{
          clipPath: `polygon(0% 0%, 0% 100%, ${highlightPosition.left}px 100%, ${highlightPosition.left}px ${highlightPosition.top}px, ${highlightPosition.left + highlightPosition.width}px ${highlightPosition.top}px, ${highlightPosition.left + highlightPosition.width}px ${highlightPosition.top + highlightPosition.height}px, ${highlightPosition.left}px ${highlightPosition.top + highlightPosition.height}px, ${highlightPosition.left}px 100%, 100% 100%, 100% 0%)`
        }}
      />
      
      {/* Highlight border */}
      <div
        className="absolute border-2 border-orange-400 rounded-lg shadow-lg transition-all duration-300"
        style={{
          top: highlightPosition.top,
          left: highlightPosition.left,
          width: highlightPosition.width,
          height: highlightPosition.height,
        }}
      />

      {/* Tutorial tooltip */}
      <Card 
        className="absolute w-80 pointer-events-auto shadow-2xl border-orange-200 bg-white"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {currentTutorialStep.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {currentTutorialStep.description}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={skipTutorial}
              className="ml-2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {currentStep === 0 ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={skipTutorial}
                  className="text-gray-600 border-gray-300"
                >
                  <SkipForward className="h-4 w-4 mr-1" />
                  Skip
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={prevStep}
                  className="text-gray-600 border-gray-300"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              )}
              
              <Button 
                size="sm" 
                onClick={nextStep}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                {currentStep < steps.length - 1 && (
                  <ArrowRight className="h-4 w-4 ml-1" />
                )}
              </Button>
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-500 text-center">
            Step {currentStep + 1} of {steps.length}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
