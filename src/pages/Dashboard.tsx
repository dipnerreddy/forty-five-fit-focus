
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Home, Dumbbell, Flame, User, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

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
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    name: "Loading...",
    currentDay: 1,
    streak: 0,
    routine: 'Home'
  });
  const [isLoading, setIsLoading] = useState(true);

  const [todaysWorkout, setTodaysWorkout] = useState<Exercise[]>([
    { title: "Push-ups", sets: [false, false, false, false] },
    { title: "Squats", weight: 60, sets: [false, false, false, false] },
    { title: "Deadlifts", weight: 80, sets: [false, false, false, false] },
    { title: "Plank Hold", sets: [false, false, false, false] }
  ]);

  const [dailyQuote] = useState("Your only limit is your mind. Push through the resistance!");

  // Fetch user profile data
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
          setUser({
            name: profile.name,
            currentDay: profile.current_day,
            streak: profile.streak,
            routine: profile.routine as 'Home' | 'Gym'
          });
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

      // Update user progress
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          current_day: user.currentDay + 1,
          streak: user.streak + 1
        })
        .eq('user_id', session.user.id);

      if (profileError) {
        console.error('Error updating profile:', profileError);
        return;
      }

      // Update local state
      setUser(prev => ({
        ...prev,
        currentDay: prev.currentDay + 1,
        streak: prev.streak + 1
      }));

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
  const totalSets = todaysWorkout.length * 4;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      {/* Navigation */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Fitness Challenge</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Profile
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/analytics')}
            className="flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Button>
        </div>
      </div>

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
          
          {/* Complete Workout Button */}
          <div className="flex justify-center mt-6">
            <Button
              onClick={completeWorkout}
              disabled={!isWorkoutComplete()}
              className={`px-8 py-3 text-lg font-semibold ${
                isWorkoutComplete() 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isWorkoutComplete() ? '🎉 Complete Workout' : '🔒 Complete All Sets to Unlock'}
            </Button>
          </div>
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
