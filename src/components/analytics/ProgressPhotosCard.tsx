
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera, Plus, Calendar, Image as ImageIcon } from 'lucide-react';
import { useProgressPhotos } from '@/hooks/useProgressPhotos';
import { useToast } from '@/hooks/use-toast';

const ProgressPhotosCard = () => {
  const { photos, isLoading, uploadPhoto } = useProgressPhotos();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [caption, setCaption] = useState('');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await uploadPhoto(file, selectedDay, caption);
      toast({
        title: "Photo uploaded!",
        description: "Your progress photo has been saved successfully.",
      });
      setUploadDialogOpen(false);
      setCaption('');
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square bg-gray-100 rounded-xl"></div>
            <div className="aspect-square bg-gray-100 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-xl">
            <Camera className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Progress Photos</h3>
            <p className="text-sm text-gray-500">{photos.length} photos • Document your journey</p>
          </div>
        </div>
        
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-9 text-xs bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-1" />
              Add Photo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Progress Photo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Day Number
                </label>
                <Input
                  type="number"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(Number(e.target.value))}
                  min="1"
                  max="45"
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Caption (optional)
                </label>
                <Input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Add a note about your progress..."
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Choose Photo
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={isUploading}
                  className="w-full"
                />
              </div>
              {isUploading && (
                <div className="text-center py-4">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Uploading...</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {photos.length > 0 ? (
        <div className="space-y-4">
          {/* Timeline View */}
          <div className="grid grid-cols-2 gap-4">
            {photos.slice(0, 4).map((photo) => (
              <div key={photo.id} className="group relative">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border border-gray-200">
                  <img 
                    src={photo.photo_url} 
                    alt={`Day ${photo.day_number}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200"></div>
                </div>
                
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                  <span className="text-xs font-medium text-gray-900">Day {photo.day_number}</span>
                </div>
                
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(photo.created_at)}</span>
                    </div>
                    {photo.caption && (
                      <p className="text-xs text-gray-800 mt-1 line-clamp-2">{photo.caption}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Before/After Comparison */}
          {photos.length >= 2 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <h4 className="font-medium text-gray-900 mb-3">Progress Comparison</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 mb-2">
                    <img 
                      src={photos[photos.length - 1].photo_url} 
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Before</p>
                  <p className="text-xs text-gray-500">Day {photos[photos.length - 1].day_number}</p>
                </div>
                <div className="text-center">
                  <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 mb-2">
                    <img 
                      src={photos[0].photo_url} 
                      alt="Latest"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Latest</p>
                  <p className="text-xs text-gray-500">Day {photos[0].day_number}</p>
                </div>
              </div>
            </div>
          )}

          {photos.length > 4 && (
            <div className="text-center pt-2">
              <Button variant="outline" size="sm">
                View All {photos.length} Photos
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="p-4 bg-gray-50 rounded-2xl w-fit mx-auto mb-4">
            <ImageIcon className="h-8 w-8 text-gray-300" />
          </div>
          <h4 className="font-medium text-gray-900 mb-2">Start Your Photo Journey</h4>
          <p className="text-sm text-gray-500 mb-4">
            Document your transformation with progress photos
          </p>
          <Button 
            onClick={() => setUploadDialogOpen(true)}
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Camera className="h-4 w-4 mr-2" />
            Take First Photo
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProgressPhotosCard;
