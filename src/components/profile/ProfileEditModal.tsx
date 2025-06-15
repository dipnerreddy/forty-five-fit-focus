
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, User as UserIcon } from 'lucide-react';
import { useProfileUpdates } from '@/hooks/useProfileUpdates';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    name: string;
    weight: number;
    email?: string;
    date_of_birth?: string;
    profile_picture_url?: string;
    weight_updated_at?: string;
  };
  onProfileUpdate: () => void;
}

const ProfileEditModal = ({ isOpen, onClose, profile, onProfileUpdate }: ProfileEditModalProps) => {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    weight: profile.weight || 0,
    email: profile.email || '',
    date_of_birth: profile.date_of_birth || '',
    profile_picture_url: profile.profile_picture_url || ''
  });
  
  const { updateProfile, updateEmail, isUpdating } = useProfileUpdates();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ 
          ...prev, 
          profile_picture_url: e.target?.result as string 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const updates: any = {
      name: formData.name,
      weight: formData.weight,
      date_of_birth: formData.date_of_birth || null,
      profile_picture_url: formData.profile_picture_url || null
    };

    let success = await updateProfile(updates);

    // Update email separately if it changed
    if (success && formData.email !== profile.email && formData.email) {
      success = await updateEmail(formData.email);
    }

    if (success) {
      onClose();
      onProfileUpdate();
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name || '',
      weight: profile.weight || 0,
      email: profile.email || '',
      date_of_birth: profile.date_of_birth || '',
      profile_picture_url: profile.profile_picture_url || ''
    });
    onClose();
  };

  const formatLastUpdated = (dateString?: string) => {
    if (!dateString) return 'Never updated';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src={formData.profile_picture_url} alt={formData.name} />
                <AvatarFallback className="text-lg bg-orange-100 text-orange-600">
                  {formData.profile_picture_url ? getInitials(formData.name) : <UserIcon className="h-10 w-10" />}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2">
                <label htmlFor="picture-upload" className="cursor-pointer">
                  <div className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors">
                    <Camera className="h-4 w-4" />
                  </div>
                </label>
                <input
                  id="picture-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Tap the camera icon to change your profile picture
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                placeholder="Enter your weight"
              />
              <p className="text-xs text-gray-500 mt-1">
                Last updated: {formatLastUpdated(profile.weight_updated_at)}
              </p>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
              />
              <p className="text-xs text-gray-500 mt-1">
                Changing email will require verification
              </p>
            </div>

            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => setFormData(prev => ({ ...prev, date_of_birth: e.target.value }))}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handleSave}
              disabled={isUpdating}
              className="flex-1"
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button 
              onClick={handleCancel}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;
