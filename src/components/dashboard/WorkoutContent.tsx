
import React from 'react';
import { Exercise } from '@/hooks/useWorkoutData';
import WorkoutDetailsCard from './WorkoutDetailsCard';
import CardioNotesCard from './CardioNotesCard';
import CurrentExerciseCard from './CurrentExerciseCard';
import CompleteWorkoutButton from './CompleteWorkoutButton';

interface WorkoutContentProps {
  workoutDetails: {
    dayTitle: string;
    dayFocus: string;
    cardioNotes?: string;
  } | null;
  routine: 'Home' | 'Gym' | 'Custom';
  currentActiveExercise: {
    exercise: Exercise;
    category: 'Main' | 'Core';
    index: number;
  } | null;
  canCompleteToday: boolean;
  todaysWorkout: Exercise[];
  isWorkoutComplete: boolean;
  onSetChange: (exerciseIndex: number, setIndex: number, completed: boolean) => void;
  onWeightChange: (exerciseIndex: number, weight: number) => void;
  onCompleteWorkout: () => void;
}

const WorkoutContent = ({
  workoutDetails,
  routine,
  currentActiveExercise,
  canCompleteToday,
  todaysWorkout,
  isWorkoutComplete,
  onSetChange,
  onWeightChange,
  onCompleteWorkout
}: WorkoutContentProps) => {
  return (
    <>
      {workoutDetails && (
        <div data-tutorial="workout-details">
          <WorkoutDetailsCard 
            dayTitle={workoutDetails.dayTitle}
            dayFocus={workoutDetails.dayFocus}
            routine={routine}
          />
        </div>
      )}

      {workoutDetails?.cardioNotes && (
        <CardioNotesCard cardioNotes={workoutDetails.cardioNotes} />
      )}

      {currentActiveExercise && canCompleteToday && (
        <div data-tutorial="current-exercise">
          <CurrentExerciseCard
            exercise={currentActiveExercise.exercise}
            category={currentActiveExercise.category}
            routine={routine}
            onSetChange={(setIndex, completed) => {
              const actualIndex = todaysWorkout.findIndex(ex => ex.title === currentActiveExercise.exercise.title);
              onSetChange(actualIndex, setIndex, completed);
            }}
            onWeightChange={(weight) => {
              const actualIndex = todaysWorkout.findIndex(ex => ex.title === currentActiveExercise.exercise.title);
              onWeightChange(actualIndex, weight);
            }}
          />
        </div>
      )}

      {todaysWorkout.length > 0 && canCompleteToday && (
        <div data-tutorial="complete-button">
          <CompleteWorkoutButton
            isWorkoutComplete={isWorkoutComplete}
            onCompleteWorkout={onCompleteWorkout}
          />
        </div>
      )}
    </>
  );
};

export default WorkoutContent;
