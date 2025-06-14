import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Home, Dumbbell, Flame, User, BarChart3, Check, Target, Zap, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { fetchWorkoutPlan, getTodaysWorkout, WorkoutExercise, DayWorkout } from '@/utils/workoutData';

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
  const totalSets = todaysWorkout.reduce((total, exercise) => total + exercise.sets.length, 0);

  // Group exercises by category
  const mainExercises = todaysWorkout.filter(ex => ex.category === 'Main');
  const coreExercises = todaysWorkout.filter(ex => ex.category === 'Core');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="pb-20 px-4 pt-6 space-y-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Hi {user.name}
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline" className="px-3 py-1">
              Day {user.currentDay} of 45
            </Badge>
            <div className="flex items-center gap-1 text-orange-500">
              <Flame className="h-4 w-4" />
              <span className="font-semibold">{user.streak}</span>
            </div>
          </div>
        </div>

        {/* Workout Details Card */}
        {workoutDetails && (
          <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  <h2 className="text-xl font-bold">{workoutDetails.dayTitle}</h2>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {user.routine === 'Gym' ? <Dumbbell className="h-4 w-4 mr-1" /> : <Home className="h-4 w-4 mr-1" />}
                  {user.routine}
                </Badge>
              </div>
              <p className="text-blue-100 text-sm">{workoutDetails.dayFocus}</p>
            </CardContent>
          </Card>
        )}

        {/* Progress Card */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-orange-100 text-sm">Today's Progress</p>
                <p className="text-2xl font-bold">{completedSets}/{totalSets}</p>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <span className="text-sm">Sets</span>
              </div>
            </div>
            
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: totalSets > 0 ? `${(completedSets / totalSets) * 100}%` : '0%' }}
              />
            </div>
            <p className="text-orange-100 text-sm mt-2">
              Sets completed
            </p>
          </CardContent>
        </Card>

        {/* Cardio/Notes Card */}
        {workoutDetails?.cardioNotes && (
          <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Cardio / Notes</h3>
              </div>
              <p className="text-green-700 text-sm leading-relaxed whitespace-pre-line">
                {workoutDetails.cardioNotes}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Main Exercises */}
        {mainExercises.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-2">
              <Target className="h-5 w-5 text-gray-600" />
              <h3 className="font-semibold text-gray-800">Main Exercises</h3>
            </div>
            {mainExercises.map((exercise, exerciseIndex) => {
              const actualIndex = todaysWorkout.findIndex(ex => ex.title === exercise.title);
              return (
                <Card key={actualIndex} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{exercise.title}</h3>
                      {user.routine === 'Gym' && (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="kg"
                            value={exercise.weight || ''}
                            onChange={(e) => updateWeight(actualIndex, Number(e.target.value))}
                            className="w-16 h-8 text-sm"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {exercise.sets.map((completed, setIndex) => (
                        <div key={setIndex} className="flex items-center justify-center">
                          <Checkbox
                            checked={completed}
                            onCheckedChange={(checked) => 
                              updateSet(actualIndex, setIndex, checked as boolean)
                            }
                            className="w-6 h-6"
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">{exercise.sets.length} sets × {exercise.reps}</div>
                      <div className="flex justify-center space-x-1">
                        {exercise.sets.map((completed, setIndex) => (
                          <div
                            key={setIndex}
                            className={`w-2 h-2 rounded-full ${
                              completed ? 'bg-orange-500' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Core Exercises */}
        {coreExercises.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-2">
              <Zap className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-gray-800">Core Exercises</h3>
            </div>
            {coreExercises.map((exercise, exerciseIndex) => {
              const actualIndex = todaysWorkout.findIndex(ex => ex.title === exercise.title);
              return (
                <Card key={actualIndex} className="border-0 shadow-sm border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{exercise.title}</h3>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {exercise.sets.map((completed, setIndex) => (
                        <div key={setIndex} className="flex items-center justify-center">
                          <Checkbox
                            checked={completed}
                            onCheckedChange={(checked) => 
                              updateSet(actualIndex, setIndex, checked as boolean)
                            }
                            className="w-6 h-6"
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">{exercise.sets.length} sets × {exercise.reps}</div>
                      <div className="flex justify-center space-x-1">
                        {exercise.sets.map((completed, setIndex) => (
                          <div
                            key={setIndex}
                            className={`w-2 h-2 rounded-full ${
                              completed ? 'bg-purple-500' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
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
          <div className="px-4 py-6">
            <Button
              onClick={completeWorkout}
              disabled={!isWorkoutComplete()}
              className={`w-full h-14 text-lg font-semibold rounded-xl ${
                isWorkoutComplete() 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isWorkoutComplete() ? (
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Complete Workout
                </div>
              ) : (
                '🔒 Complete All Sets'
              )}
            </Button>
          </div>
        )}

        {/* Daily Motivation */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-blue-800 font-medium text-sm">💪 Daily Motivation</p>
              <p className="text-blue-700 italic mt-2 text-sm leading-relaxed">
                "{dailyQuote}"
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <button 
            className="flex flex-col items-center py-2 px-4 text-orange-500"
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1 font-medium">Workout</span>
          </button>
          
          <button 
            onClick={() => navigate('/analytics')}
            className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-gray-600"
          >
            <BarChart3 className="h-6 w-6" />
            <span className="text-xs mt-1">Stats</span>
          </button>
          
          <button 
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-gray-600"
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
