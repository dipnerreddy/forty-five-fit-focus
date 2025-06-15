
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import RoutineSelector from '@/components/RoutineSelector';
import ProfileContent from '@/components/profile/ProfileContent';
import BottomNavigation from '@/components/profile/BottomNavigation';
import CustomWorkoutButton from '@/components/profile/CustomWorkoutButton';
import CustomWorkoutModal from '@/components/profile/CustomWorkoutModal';
import { useProfileData } from '@/hooks/useProfileData';

const Profile = () => {
  const navigate = useNavigate();
  const { profile, isLoading, handleRoutineChange, handleLogout, refreshProfile } = useProfileData();
  const [showRoutineSelector, setShowRoutineSelector] = useState(false);
  const [showCustomWorkoutModal, setShowCustomWorkoutModal] = useState(false);

  const onRoutineChange = async (newRoutine: 'Home' | 'Gym') => {
    await handleRoutineChange(newRoutine);
    setShowRoutineSelector(false);
  };

  const onCustomRoutineActivated = async (sheetUrl: string) => {
    await handleRoutineChange('Custom', sheetUrl);
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

      <ProfileContent 
        profile={profile}
        onRoutineChange={() => setShowRoutineSelector(true)}
        onLogout={handleLogout}
        onProfileUpdate={refreshProfile}
      />

      <CustomWorkoutButton onClick={() => setShowCustomWorkoutModal(true)} />

      <BottomNavigation />

      {/* Routine Selector Modal */}
      {showRoutineSelector && (
        <RoutineSelector
          currentRoutine={profile.routine}
          onSelect={onRoutineChange}
          onClose={() => setShowRoutineSelector(false)}
        />
      )}

      {/* Custom Workout Modal */}
      <CustomWorkoutModal
        isOpen={showCustomWorkoutModal}
        onClose={() => setShowCustomWorkoutModal(false)}
        onCustomRoutineActivated={onCustomRoutineActivated}
      />
    </div>
  );
};

export default Profile;
