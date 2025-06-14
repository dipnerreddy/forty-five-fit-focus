
import React from 'react';
import ProfileHeader from './ProfileHeader';
import CertificateSection from './CertificateSection';
import StatsCards from './StatsCards';
import WorkoutSettings from './WorkoutSettings';
import ProgressOverview from './ProgressOverview';
import LogoutSection from './LogoutSection';

interface UserProfile {
  name: string;
  age: number;
  gender: string;
  weight: number;
  routine: 'Home' | 'Gym';
  current_day: number;
  streak: number;
}

interface ProfileContentProps {
  profile: UserProfile;
  onRoutineChange: () => void;
  onLogout: () => void;
}

const ProfileContent = ({ profile, onRoutineChange, onLogout }: ProfileContentProps) => {
  return (
    <div className="pb-20 px-4 pt-6 space-y-4">
      <ProfileHeader 
        name={profile.name}
        age={profile.age}
        gender={profile.gender}
        currentDay={profile.current_day}
        streak={profile.streak}
      />

      <CertificateSection streak={profile.streak} />

      <StatsCards weight={profile.weight} routine={profile.routine} />

      <WorkoutSettings 
        routine={profile.routine}
        currentDay={profile.current_day}
        streak={profile.streak}
        onRoutineChange={onRoutineChange}
      />

      <ProgressOverview 
        currentDay={profile.current_day}
        streak={profile.streak}
      />

      <LogoutSection onLogout={onLogout} />
    </div>
  );
};

export default ProfileContent;
