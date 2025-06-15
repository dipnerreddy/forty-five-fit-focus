
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Upload, User } from 'lucide-react';
import { useProfileUpdates } from '@/hooks/useProfileUpdates';
import { useToast } from '@/hooks/use-toast';

interface ProfilePictureCardProps {
  name: string;
  profilePictureUrl?: string;
  onPictureUpdate: () => void;
}

const ProfilePictureCard = ({ name, profilePictureUrl, onPictureUpdate }: ProfilePictureCardProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateProfile } = useProfileUpdates();
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64 for simple storage
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target?.result as string;
        
        const success = await updateProfile({ profile_picture_url: result });
        if (success) {
          onPictureUpdate();
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
      setIsUploading(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-orange-500" />
          Profile Picture
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profilePictureUrl} alt={name} />
            <AvatarFallback className="text-lg bg-orange-100 text-orange-600">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              variant="outline"
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Change Picture'}
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              PNG, JPG up to 5MB
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePictureCard;
