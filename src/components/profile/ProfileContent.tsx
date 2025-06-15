
import React from 'react';
import ProfileHeader from './ProfileHeader';
import CertificateSection from './CertificateSection';
import StatsCards from './StatsCards';
import WorkoutSettings from './WorkoutSettings';
import ProgressOverview from './ProgressOverview';
import LogoutSection from './LogoutSection';
import WeightUpdateCard from './WeightUpdateCard';
import PersonalInfoCard from './PersonalInfoCard';
import ProfilePictureCard from './ProfilePictureCard';

interface UserProfile {
  name: string;
  age: number;
  gender: string;
  weight: number;
  routine: 'Home' | 'Gym';
  current_day: number;
  streak: number;
  email?: string;
  date_of_birth?: string;
  profile_picture_url?: string;
  weight_updated_at?: string;
}

interface ProfileContentProps {
  profile: UserProfile;
  onRoutineChange: () => void;
  onLogout: () => void;
  onProfileUpdate: () => void;
}

const ProfileContent = ({ profile, onRoutineChange, onLogout, onProfileUpdate }: ProfileContentProps) => {
  return (
    <div className="pb-20 px-4 pt-6 space-y-4">
      <ProfileHeader 
        name={profile.name}
        age={profile.age}
        gender={profile.gender}
        currentDay={profile.current_day}
        streak={profile.streak}
        profilePictureUrl={profile.profile_picture_url}
      />

      <ProfilePictureCard
        name={profile.name}
        profilePictureUrl={profile.profile_picture_url}
        onPictureUpdate={onProfileUpdate}
      />

      <PersonalInfoCard
        name={profile.name}
        email={profile.email}
        dateOfBirth={profile.date_of_birth}
        onInfoUpdate={onProfileUpdate}
      />

      <WeightUpdateCard
        currentWeight={profile.weight}
        lastUpdated={profile.weight_updated_at}
        onWeightUpdate={onProfileUpdate}
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
