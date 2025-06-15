
import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import CertificateSection from './CertificateSection';
import StatsCards from './StatsCards';
import WorkoutSettings from './WorkoutSettings';
import ProgressOverview from './ProgressOverview';
import CustomWorkoutButton from './CustomWorkoutButton';
import CustomWorkoutModal from './CustomWorkoutModal';
import LogoutSection from './LogoutSection';
import ProfileEditModal from './ProfileEditModal';

interface UserProfile {
  name: string;
  age: number;
  gender: string;
  weight: number;
  routine: 'Home' | 'Gym' | 'Custom';
  current_day: number;
  streak: number;
  email?: string;
  date_of_birth?: string;
  profile_picture_url?: string;
  weight_updated_at?: string;
  custom_sheet_url?: string;
}

interface ProfileContentProps {
  profile: UserProfile;
  onRoutineChange: () => void;
  onLogout: () => void;
  onProfileUpdate: () => void;
  onCustomRoutineActivated: (sheetUrl: string) => void;
}

const ProfileContent = ({ profile, onRoutineChange, onLogout, onProfileUpdate, onCustomRoutineActivated }: ProfileContentProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCustomWorkoutModal, setShowCustomWorkoutModal] = useState(false);

  return (
    <div className="pb-20 px-4 pt-6 space-y-4">
      <ProfileHeader 
        name={profile.name}
        age={profile.age}
        gender={profile.gender}
        currentDay={profile.current_day}
        streak={profile.streak}
        profilePictureUrl={profile.profile_picture_url}
        onEditProfile={() => setShowEditModal(true)}
      />

      <CertificateSection streak={profile.streak} />

      <StatsCards weight={profile.weight} routine={profile.routine} />

      <WorkoutSettings 
        routine={profile.routine}
        currentDay={profile.current_day}
        streak={profile.streak}
        onRoutineChange={onRoutineChange}
        customSheetUrl={profile.custom_sheet_url}
      />

      <ProgressOverview 
        currentDay={profile.current_day}
        streak={profile.streak}
      />

      <CustomWorkoutButton onClick={() => setShowCustomWorkoutModal(true)} />

      <LogoutSection onLogout={onLogout} />

      <ProfileEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        profile={profile}
        onProfileUpdate={onProfileUpdate}
      />

      <CustomWorkoutModal
        isOpen={showCustomWorkoutModal}
        onClose={() => setShowCustomWorkoutModal(false)}
        onCustomRoutineActivated={onCustomRoutineActivated}
      />
    </div>
  );
};

export default ProfileContent;
