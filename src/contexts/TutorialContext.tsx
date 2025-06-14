
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface TutorialContextType {
  isActive: boolean;
  currentStep: number;
  steps: TutorialStep[];
  startTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTutorial: () => void;
  completeTutorial: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within TutorialProvider');
  }
  return context;
};

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to your 45-Day Challenge! 🎉',
    description: 'Let\'s take a quick tour to help you get started on your fitness journey.',
    target: '[data-tutorial="header"]',
    position: 'bottom'
  },
  {
    id: 'progress',
    title: 'Track Your Progress',
    description: 'This shows your daily progress. Complete all sets to see your progress grow!',
    target: '[data-tutorial="progress"]',
    position: 'bottom'
  },
  {
    id: 'workout',
    title: 'Today\'s Workout',
    description: 'Here you\'ll see your workout details for the day, including the focus and routine type.',
    target: '[data-tutorial="workout-details"]',
    position: 'bottom'
  },
  {
    id: 'current-exercise',
    title: 'Current Exercise',
    description: 'This highlights your next exercise. Tap the sets to mark them as complete!',
    target: '[data-tutorial="current-exercise"]',
    position: 'top'
  },
  {
    id: 'complete',
    title: 'Complete Your Workout',
    description: 'Once all sets are done, tap here to complete your workout and build your streak!',
    target: '[data-tutorial="complete-button"]',
    position: 'top'
  },
  {
    id: 'navigation',
    title: 'Bottom Navigation',
    description: 'Use these tabs to navigate between Dashboard, Profile, and Analytics.',
    target: '[data-tutorial="bottom-nav"]',
    position: 'top'
  }
];

export const TutorialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  useEffect(() => {
    checkTutorialStatus();
  }, []);

  const checkTutorialStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('has_seen_tutorial')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (profile && !profile.has_seen_tutorial) {
        // First time user - show tutorial after a brief delay
        setTimeout(() => {
          setIsActive(true);
        }, 1500);
      }
      
      setHasSeenTutorial(profile?.has_seen_tutorial || false);
    } catch (error) {
      console.error('Error checking tutorial status:', error);
    }
  };

  const startTutorial = () => {
    setIsActive(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTutorial = () => {
    setIsActive(false);
    markTutorialAsSeen();
  };

  const completeTutorial = () => {
    setIsActive(false);
    markTutorialAsSeen();
  };

  const markTutorialAsSeen = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      await supabase
        .from('profiles')
        .update({ has_seen_tutorial: true })
        .eq('user_id', session.user.id);
      
      setHasSeenTutorial(true);
    } catch (error) {
      console.error('Error marking tutorial as seen:', error);
    }
  };

  return (
    <TutorialContext.Provider
      value={{
        isActive,
        currentStep,
        steps: tutorialSteps,
        startTutorial,
        nextStep,
        prevStep,
        skipTutorial,
        completeTutorial
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};
