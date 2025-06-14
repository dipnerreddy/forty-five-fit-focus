import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { fetchWorkoutPlan, getTodaysWorkout } from '@/utils/workoutData';

// Import new components
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

interface User {
  name: string;
  currentDay: number;
  streak: number;
  routine: 'Home' | 'Gym';
}

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    name: "Loading...",
    currentDay: 1,
    streak: 0,
    routine: 'Home'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [todaysWorkout, setTodaysWorkout] = useState<Exercise[]>([]);
  const [workoutDetails, setWorkoutDetails] = useState<{ dayTitle: string; dayFocus: string; cardioNotes?: string } | null>(null);
  const [dailyQuote] = useState("Your only limit is your mind. Push through the resistance!");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [hasCompletedChallenge, setHasCompletedChallenge] = useState(false);

  // Fetch user profile data and workout plan
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/login');
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('name, current_day, streak, routine')
          .eq('user_id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        if (profile) {
          const userData = {
            name: profile.name,
            currentDay: profile.current_day,
            streak: profile.streak,
            routine: profile.routine as 'Home' | 'Gym'
          };
          setUser(userData);
          
          // Check if user has completed the challenge and hasn't submitted a review yet
          if (userData.streak >= 45) {
            const { data: existingReview } = await supabase
              .from('user_reviews')
              .select('id')
              .eq('user_id', session.user.id)
              .single();
            
            if (!existingReview) {
              setHasCompletedChallenge(true);
              setShowReviewForm(true);
            }
          }
          
          // Fetch workout plan based on routine
          const workoutPlan = await fetchWorkoutPlan(userData.routine);
          const todaysWorkoutData = getTodaysWorkout(workoutPlan, userData.currentDay);
          
          if (todaysWorkoutData) {
            // Set workout details including cardio notes
            setWorkoutDetails({
              dayTitle: todaysWorkoutData.dayTitle,
              dayFocus: todaysWorkoutData.dayFocus,
              cardioNotes: todaysWorkoutData.cardioNotes
            });

            // Convert to local exercise format
            const exercises: Exercise[] = todaysWorkoutData.exercises.map(exercise => ({
              title: exercise.name,
              sets: new Array(exercise.sets).fill(false),
              reps: exercise.reps,
              category: exercise.category,
              weight: userData.routine === 'Gym' ? 0 : undefined
            }));
            
            setTodaysWorkout(exercises);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

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

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Record daily completion
      const { error: completionError } = await supabase
        .from('daily_completions')
        .insert({
          user_id: session.user.id,
          day: user.currentDay
        });

      if (completionError && !completionError.message.includes('duplicate')) {
        console.error('Error recording completion:', completionError);
        return;
      }

      const newStreak = user.streak + 1;
      const newCurrentDay = user.currentDay + 1;

      // Update user progress
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          current_day: newCurrentDay,
          streak: newStreak
        })
        .eq('user_id', session.user.id);

      if (profileError) {
        console.error('Error updating profile:', profileError);
        return;
      }

      // Update local state
      setUser(prev => ({
        ...prev,
        currentDay: newCurrentDay,
        streak: newStreak
      }));

      // Check if user just completed the 45-day challenge
      if (newStreak === 45 && !hasCompletedChallenge) {
        setHasCompletedChallenge(true);
        setShowReviewForm(true);
      }

      toast({
        title: "Workout Complete! 🎉",
        description: `Day ${user.currentDay} conquered! Keep the streak alive!`
      });
    } catch (error) {
      console.error('Error completing workout:', error);
      toast({
        title: "Error",
        description: "Failed to save workout completion. Please try again.",
        variant: "destructive"
      });
    }
  };

  const completedSets = todaysWorkout.reduce((total, exercise) => 
    total + exercise.sets.filter(set => set).length, 0
  );
  const totalSets = todaysWorkout.reduce((total, exercise) => total + exercise.sets.length, 0);

  // Group exercises by category
  const mainExercises = todaysWorkout.filter(ex => ex.category === 'Main');
  const coreExercises = todaysWorkout.filter(ex => ex.category === 'Core');

  // Get current active exercise based on completion
  const getCurrentActiveExercise = () => {
    // First check main exercises
    for (let i = 0; i < mainExercises.length; i++) {
      const exercise = mainExercises[i];
      const isCompleted = exercise.sets.every(set => set === true);
      if (!isCompleted) {
        return { exercise, category: 'Main' as const, index: i };
      }
    }
    
    // If all main exercises are completed, check core exercises
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
      {/* Review Form Modal */}
      {showReviewForm && (
        <CompletionReviewForm
          userName={user.name}
          onClose={() => setShowReviewForm(false)}
        />
      )}

      {/* Main Content */}
      <div className="pb-20 px-4 pt-6 space-y-4">
        {/* Header */}
        <DashboardHeader 
          userName={user.name}
          currentDay={user.currentDay}
          streak={user.streak}
        />

        {/* Progress Card */}
        <ProgressCard 
          completedSets={completedSets}
          totalSets={totalSets}
        />

        {/* Workout Details Card */}
        {workoutDetails && (
          <WorkoutDetailsCard 
            dayTitle={workoutDetails.dayTitle}
            dayFocus={workoutDetails.dayFocus}
            routine={user.routine}
          />
        )}

        {/* Cardio/Notes Card */}
        {workoutDetails?.cardioNotes && (
          <CardioNotesCard cardioNotes={workoutDetails.cardioNotes} />
        )}

        {/* Current Active Exercise */}
        {currentActiveExercise && (
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
        )}

        {/* No Workout Message */}
        {todaysWorkout.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No workout scheduled for today</p>
              <p className="text-sm text-gray-400 mt-1">Take a rest day or check back tomorrow!</p>
            </CardContent>
          </Card>
        )}

        {/* Complete Workout Button */}
        {todaysWorkout.length > 0 && (
          <CompleteWorkoutButton
            isWorkoutComplete={isWorkoutComplete()}
            onCompleteWorkout={completeWorkout}
          />
        )}

        {/* Daily Motivation */}
        <MotivationCard quote={dailyQuote} />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
