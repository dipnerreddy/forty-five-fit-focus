import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, User as UserIcon, Flame, Calendar, Target, Home, BarChart3, User, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  name: string;
  age: number;
  gender: string;
  weight: number;
  routine: 'Home' | 'Gym';
  current_day: number;
  streak: number;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/login');
          return;
        }

        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        if (profileData) {
          setProfile({
            name: profileData.name,
            age: profileData.age,
            gender: profileData.gender,
            weight: profileData.weight,
            routine: profileData.routine as 'Home' | 'Gym',
            current_day: profileData.current_day,
            streak: profileData.streak,
          });
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
      toast({
        title: "Logged out successfully",
        description: "See you next time!"
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        </div>
      </div>

      <div className="pb-20 px-4 pt-6 space-y-4">
        {/* Profile Header */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon className="h-10 w-10 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h2>
            <p className="text-gray-600">{profile.age} years old • {profile.gender}</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="text-center">
                <p className="text-lg font-bold text-orange-500">{profile.current_day}</p>
                <p className="text-xs text-gray-600">Current Day</p>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-lg font-bold text-orange-500">{profile.streak}</p>
                <p className="text-xs text-gray-600">Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-900">{profile.weight}kg</p>
              <p className="text-sm text-gray-600">Weight</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              {profile.routine === 'Gym' ? (
                <UserIcon className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              ) : (
                <Home className="h-8 w-8 text-green-500 mx-auto mb-2" />
              )}
              <p className="text-lg font-bold text-gray-900">{profile.routine}</p>
              <p className="text-sm text-gray-600">Routine</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Challenge Progress</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Days Completed</span>
                  <span className="text-sm font-medium">{profile.current_day - 1}/45</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((profile.current_day - 1) / 45) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-orange-500">
                <Flame className="h-5 w-5" />
                <span className="font-medium">{profile.streak} day streak!</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-gray-600"
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Workout</span>
          </button>
          
          <button 
            onClick={() => navigate('/analytics')}
            className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-gray-600"
          >
            <BarChart3 className="h-6 w-6" />
            <span className="text-xs mt-1">Stats</span>
          </button>
          
          <button 
            className="flex flex-col items-center py-2 px-4 text-orange-500"
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1 font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
