
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Home, Dumbbell, Flame } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Exercise {
  title: string;
  weight?: number;
  sets: boolean[];
}

interface User {
  name: string;
  currentDay: number;
  streak: number;
  routine: 'Home' | 'Gym';
}

const Dashboard = () => {
  const { toast } = useToast();
  const [user] = useState<User>({
    name: "Alex",
    currentDay: 12,
    streak: 12,
    routine: 'Gym'
  });

  const [todaysWorkout, setTodaysWorkout] = useState<Exercise[]>([
    { title: "Push-ups", sets: [false, false, false, false] },
    { title: "Squats", weight: 60, sets: [false, false, false, false] },
    { title: "Deadlifts", weight: 80, sets: [false, false, false, false] },
    { title: "Plank Hold", sets: [false, false, false, false] }
  ]);

  const [dailyQuote] = useState("Your only limit is your mind. Push through the resistance!");

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

  const completeWorkout = () => {
    if (isWorkoutComplete()) {
      toast({
        title: "Workout Complete! 🎉",
        description: `Day ${user.currentDay} conquered! Keep the streak alive!`
      });
    }
  };

  useEffect(() => {
    if (isWorkoutComplete()) {
      completeWorkout();
    }
  }, [todaysWorkout]);

  const completedSets = todaysWorkout.reduce((total, exercise) => 
    total + exercise.sets.filter(set => set).length, 0
  );
  const totalSets = todaysWorkout.length * 4;

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      {/* Welcome Panel */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Hi {user.name}, Day {user.currentDay} of 45
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="text-lg font-semibold text-orange-500">
                  {user.streak} day streak
                </span>
              </div>
            </div>
            <Badge variant="secondary" className="flex items-center gap-2 px-3 py-2">
              {user.routine === 'Gym' ? <Dumbbell className="h-4 w-4" /> : <Home className="h-4 w-4" />}
              {user.routine}
            </Badge>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-orange-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(completedSets / totalSets) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedSets}/{totalSets} sets completed today
          </p>
        </CardContent>
      </Card>

      {/* Today's Workout */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Today's Workout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {todaysWorkout.map((exercise, exerciseIndex) => (
            <div key={exerciseIndex} className="border rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">{exercise.title}</h3>
                {user.routine === 'Gym' && (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Weight"
                      value={exercise.weight || ''}
                      onChange={(e) => updateWeight(exerciseIndex, Number(e.target.value))}
                      className="w-20 h-8"
                    />
                    <span className="text-sm text-gray-500">kg</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {exercise.sets.map((completed, setIndex) => (
                  <div key={setIndex} className="flex items-center space-x-2 p-2 rounded border">
                    <Checkbox
                      checked={completed}
                      onCheckedChange={(checked) => 
                        updateSet(exerciseIndex, setIndex, checked as boolean)
                      }
                    />
                    <label className="text-sm font-medium">
                      Set {setIndex + 1}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="mt-3 text-xs text-gray-500">
                4 sets × 8 reps
              </div>
            </div>
          ))}
          
          {isWorkoutComplete() && (
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-semibold">
                🎉 Amazing! You've completed today's workout!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Daily Motivation */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-orange-50 to-orange-100">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-3 text-orange-800">💬 Daily Motivation</h3>
          <p className="text-orange-700 italic leading-relaxed">
            "{dailyQuote}"
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
