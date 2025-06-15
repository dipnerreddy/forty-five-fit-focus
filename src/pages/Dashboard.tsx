
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useWorkoutCompletion } from '@/hooks/useWorkoutCompletion';
import { useDailyWorkoutStatus } from '@/hooks/useDailyWorkoutStatus';
import { useWorkoutData } from '@/hooks/useWorkoutData';
import { TutorialOverlay } from '@/components/tutorial/TutorialOverlay';

// Import components
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ProgressCard from '@/components/dashboard/ProgressCard';
import WorkoutStatusBanner from '@/components/dashboard/WorkoutStatusBanner';
import WorkoutContent from '@/components/dashboard/WorkoutContent';
import EmptyWorkoutCard from '@/components/dashboard/EmptyWorkoutCard';
import MotivationCard from '@/components/dashboard/MotivationCard';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import CompletionReviewForm from '@/components/dashboard/CompletionReviewForm';
import type { UserProfile } from '@/types/UserProfile';

const Dashboard = () => {
  const { toast } = useToast();
  // All returned by useUserProfile hook use our unified UserProfile type:
  const {
    user,
    setUser,
    isLoading,
    hasCompletedChallenge,
    setHasCompletedChallenge,
    showReviewForm,
    setShowReviewForm
  } = useUserProfile();

  const { canCompleteToday, isLoading: workoutStatusLoading, refreshStatus } = useDailyWorkoutStatus();

  const {
    todaysWorkout,
    workoutDetails,
    isLoading: workoutDataLoading,
    updateSet,
    updateWeight,
    isWorkoutComplete,
    completedSets,
    totalSets,
    getCurrentActiveExercise
  } = useWorkoutData(
    user.routine,
    user.currentDay,
    user.name,
    user.customSheetUrl
  );

  const { completeWorkout: handleCompleteWorkout } = useWorkoutCompletion({
    user,
    setUser,
    hasCompletedChallenge,
    setHasCompletedChallenge,
    setShowReviewForm,
    canCompleteToday,
    refreshWorkoutStatus: refreshStatus
  });

  const [dailyQuote] = useState("Your only limit is your mind. Push through the resistance!");

  // ----- Rest Day Auto-completion Logic -----
  // We'll use a ref to ensure auto-completion only happens once per rest day
  const restCompleteRef = useRef(false);

  // Determine rest day: no workout, but also check the workoutDetails
  const isRestDay =
    (!workoutDataLoading && todaysWorkout.length === 0) && (
      (workoutDetails?.dayTitle?.toLowerCase() === "rest day" ||
      workoutDetails?.dayTitle?.toLowerCase() === "rest" ||
      workoutDetails?.dayFocus?.toLowerCase() === "rest day" ||
      workoutDetails?.dayFocus?.toLowerCase() === "rest")
    );

  useEffect(() => {
    // Only auto-complete ONCE per rest day per visit
    if (
      isRestDay &&
      canCompleteToday &&
      !isLoading &&
      !workoutStatusLoading &&
      !restCompleteRef.current
    ) {
      restCompleteRef.current = true;
      // Auto-complete and bypass streak limitation
      handleCompleteWorkout(true); // Pass true to bypass limitation
    }
    // Reset flag if day/routine/user changes
    if (!isRestDay) {
      restCompleteRef.current = false;
    }
    // eslint-disable-next-line
  }, [isRestDay, canCompleteToday, isLoading, workoutStatusLoading, user.currentDay, user.routine, user.name]);

  const completeWorkout = async () => {
    if (todaysWorkout.length === 0 && isRestDay) {
      // Should never trigger (auto-completes), but handle anyway
      await handleCompleteWorkout(true);
      return;
    }
    if (!isWorkoutComplete()) {
      toast({
        title: "Workout Incomplete",
        description: "Please complete all sets before finishing your workout.",
        variant: "destructive"
      });
      return;
    }

    await handleCompleteWorkout();
  };

  const currentActiveExercise = getCurrentActiveExercise();

  if (isLoading || workoutStatusLoading || workoutDataLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TutorialOverlay />
      
      {showReviewForm && (
        <CompletionReviewForm
          userName={user.name}
          onClose={() => setShowReviewForm(false)}
        />
      )}

      <div className="pb-20 px-4 pt-6 space-y-4">
        <div data-tutorial="header">
          <DashboardHeader 
            userName={user.name}
            currentDay={user.currentDay}
            streak={user.streak}
          />
        </div>

        <WorkoutStatusBanner canCompleteToday={canCompleteToday} />

        <div data-tutorial="progress">
          <ProgressCard 
            completedSets={completedSets}
            totalSets={totalSets}
          />
        </div>

        {todaysWorkout.length === 0 ? (
          <EmptyWorkoutCard />
        ) : (
          <WorkoutContent
            workoutDetails={workoutDetails}
            routine={user.routine}
            currentActiveExercise={currentActiveExercise}
            canCompleteToday={canCompleteToday}
            todaysWorkout={todaysWorkout}
            isWorkoutComplete={isWorkoutComplete()}
            onSetChange={updateSet}
            onWeightChange={updateWeight}
            onCompleteWorkout={completeWorkout}
          />
        )}

        <MotivationCard quote={dailyQuote} />
      </div>

      <div data-tutorial="bottom-nav">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Dashboard;
