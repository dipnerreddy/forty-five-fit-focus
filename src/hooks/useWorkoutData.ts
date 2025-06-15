import { useState, useEffect } from 'react';
import { fetchWorkoutPlan, getTodaysWorkout } from '@/utils/workoutData';

export interface Exercise {
  title: string;
  weight?: number;
  sets: boolean[];
  reps?: string;
  category: 'Main' | 'Core';
}

interface WorkoutDetails {
  dayTitle: string;
  dayFocus: string;
  cardioNotes?: string;
}

export const useWorkoutData = (routine: 'Home' | 'Gym' | 'Custom', currentDay: number, userName: string, customSheetUrl?: string) => {
  const [todaysWorkout, setTodaysWorkout] = useState<Exercise[]>([]);
  const [workoutDetails, setWorkoutDetails] = useState<WorkoutDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWorkoutData = async () => {
      if (userName === "Loading...") return;

      try {
        setIsLoading(true);
        const workoutPlan = await fetchWorkoutPlan(routine, customSheetUrl);
        const todaysWorkoutData = getTodaysWorkout(workoutPlan, currentDay);
        
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
            weight: routine === 'Gym' ? 0 : undefined
          }));
          
          setTodaysWorkout(exercises);
        }
      } catch (error) {
        console.error('Error loading workout data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkoutData();
  }, [routine, currentDay, userName, customSheetUrl]);

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

  return {
    todaysWorkout,
    workoutDetails,
    isLoading,
    updateSet,
    updateWeight,
    isWorkoutComplete,
    completedSets,
    totalSets,
    getCurrentActiveExercise
  };
};
