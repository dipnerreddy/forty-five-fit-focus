
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { fetchWorkoutPlan, getTodaysWorkout } from '@/utils/workoutData';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useWorkoutCompletion } from '@/hooks/useWorkoutCompletion';
import { TutorialOverlay } from '@/components/tutorial/TutorialOverlay';

// Import components
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ProgressCard from '@/components/dashboard/ProgressCard';
import WorkoutDetailsCard from '@/components/dashboard/WorkoutDetailsCard';
import CardioNotesCard from '@/components/dashboard/CardioNotesCard';
import CurrentExerciseCard from '@/components/dashboard/CurrentExerciseCard';
import CompleteWorkoutButton from '@/components/dashboard/CompleteWorkoutButton';
import MotivationCard from '@/components/dashboard/MotivationCard';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import CompletionReviewForm from '@/components/dashboard/CompletionReviewForm';

interface Exercise {
  title: string;
  weight?: number;
  sets: boolean[];
  reps?: string;
  category: 'Main' | 'Core';
}

const Dashboard = () => {
  const { toast } = useToast();
  const {
    user,
    setUser,
    isLoading,
    hasCompletedChallenge,
    setHasCompletedChallenge,
    showReviewForm,
    setShowReviewForm
  } = useUserProfile();

  const { completeWorkout: handleCompleteWorkout } = useWorkoutCompletion({
    user,
    setUser,
    hasCompletedChallenge,
    setHasCompletedChallenge,
    setShowReviewForm
  });

  const [todaysWorkout, setTodaysWorkout] = useState<Exercise[]>([]);
  const [workoutDetails, setWorkoutDetails] = useState<{ dayTitle: string; dayFocus: string; cardioNotes?: string } | null>(null);
  const [dailyQuote] = useState("Your only limit is your mind. Push through the resistance!");

  // Fetch workout plan
  useEffect(() => {
    const loadWorkoutData = async () => {
      if (user.name === "Loading...") return;

      try {
        const workoutPlan = await fetchWorkoutPlan(user.routine);
        const todaysWorkoutData = getTodaysWorkout(workoutPlan, user.currentDay);
        
        if (todaysWorkoutData) {
          setWorkoutDetails({
            dayTitle: todaysWorkoutData.dayTitle,
            dayFocus: todaysWorkoutData.dayFocus,
            cardioNotes: todaysWorkoutData.cardioNotes
          });

          const exercises: Exercise[] = todaysWorkoutData.exercises.map(exercise => ({
            title: exercise.name,
            sets: new Array(exercise.sets).fill(false),
            reps: exercise.reps,
            category: exercise.category,
            weight: user.routine === 'Gym' ? 0 : undefined
          }));
          
          setTodaysWorkout(exercises);
        }
      } catch (error) {
        console.error('Error loading workout data:', error);
      }
    };

    loadWorkoutData();
  }, [user.routine, user.currentDay, user.name]);

  const updateSet = (exerciseIndex: number, setIndex: number, completed: boolean) => {
    setTodaysWorkout(prev => {
      const newWorkout = [...prev];
      newWorkout[exerciseIndex].sets[setIndex] = completed;
      return newWorkout;
    });
  };

  const updateWeight = (exerciseIndex: number, weight: number) => {
    setTodaysWorkout(prev => {
      const newWorkout = [...prev];
      newWorkout[exerciseIndex].weight = weight;
      return newWorkout;
    });
  };

  const isWorkoutComplete = () => {
    return todaysWorkout.every(exercise => 
      exercise.sets.every(set => set === true)
    );
  };

  const completeWorkout = async () => {
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

  const completedSets = todaysWorkout.reduce((total, exercise) => 
    total + exercise.sets.filter(set => set).length, 0
  );
  const totalSets = todaysWorkout.reduce((total, exercise) => total + exercise.sets.length, 0);

  const mainExercises = todaysWorkout.filter(ex => ex.category === 'Main');
  const coreExercises = todaysWorkout.filter(ex => ex.category === 'Core');

  const getCurrentActiveExercise = () => {
    for (let i = 0; i < mainExercises.length; i++) {
      const exercise = mainExercises[i];
      const isCompleted = exercise.sets.every(set => set === true);
      if (!isCompleted) {
        return { exercise, category: 'Main' as const, index: i };
      }
    }
    
    for (let i = 0; i < coreExercises.length; i++) {
      const exercise = coreExercises[i];
      const isCompleted = exercise.sets.every(set => set === true);
      if (!isCompleted) {
        return { exercise, category: 'Core' as const, index: i };
      }
    }
    
    return null;
  };

  const currentActiveExercise = getCurrentActiveExercise();

  if (isLoading) {
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

        <div data-tutorial="progress">
          <ProgressCard 
            completedSets={completedSets}
            totalSets={totalSets}
          />
        </div>

        {workoutDetails && (
          <div data-tutorial="workout-details">
            <WorkoutDetailsCard 
              dayTitle={workoutDetails.dayTitle}
              dayFocus={workoutDetails.dayFocus}
              routine={user.routine}
            />
          </div>
        )}

        {workoutDetails?.cardioNotes && (
          <CardioNotesCard cardioNotes={workoutDetails.cardioNotes} />
        )}

        {currentActiveExercise && (
          <div data-tutorial="current-exercise">
            <CurrentExerciseCard
              exercise={currentActiveExercise.exercise}
              category={currentActiveExercise.category}
              routine={user.routine}
              onSetChange={(setIndex, completed) => {
                const actualIndex = todaysWorkout.findIndex(ex => ex.title === currentActiveExercise.exercise.title);
                updateSet(actualIndex, setIndex, completed);
              }}
              onWeightChange={(weight) => {
                const actualIndex = todaysWorkout.findIndex(ex => ex.title === currentActiveExercise.exercise.title);
                updateWeight(actualIndex, weight);
              }}
            />
          </div>
        )}

        {todaysWorkout.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No workout scheduled for today</p>
              <p className="text-sm text-gray-400 mt-1">Take a rest day or check back tomorrow!</p>
            </CardContent>
          </Card>
        )}

        {todaysWorkout.length > 0 && (
          <div data-tutorial="complete-button">
            <CompleteWorkoutButton
              isWorkoutComplete={isWorkoutComplete()}
              onCompleteWorkout={completeWorkout}
            />
          </div>
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
