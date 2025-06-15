
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Edit, Mail, Calendar } from 'lucide-react';
import { useProfileUpdates } from '@/hooks/useProfileUpdates';

interface PersonalInfoCardProps {
  name: string;
  email?: string;
  dateOfBirth?: string;
  onInfoUpdate: () => void;
}

const PersonalInfoCard = ({ name, email, dateOfBirth, onInfoUpdate }: PersonalInfoCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: name || '',
    email: email || '',
    date_of_birth: dateOfBirth || ''
  });
  const { updateProfile, updateEmail, isUpdating } = useProfileUpdates();

  const handleSave = async () => {
    const updates: any = {
      name: formData.name,
      date_of_birth: formData.date_of_birth || null
    };

    let success = true;

    // Update profile info first
    success = await updateProfile(updates);

    // Update email separately if it changed
    if (success && formData.email !== email && formData.email) {
      success = await updateEmail(formData.email);
    }

    if (success) {
      setIsEditing(false);
      onInfoUpdate();
    }
  };

  const handleCancel = () => {
    setFormData({
      name: name || '',
      email: email || '',
      date_of_birth: dateOfBirth || ''
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-orange-500" />
            Personal Information
          </div>
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isEditing ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{name}</span>
            </div>
            {email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{email}</span>
              </div>
            )}
            {dateOfBirth && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">
                  {new Date(dateOfBirth).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        ) : (
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
            <div className="flex gap-2">
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
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
