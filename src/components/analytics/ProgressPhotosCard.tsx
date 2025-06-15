
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Plus } from 'lucide-react';

const ProgressPhotosCard = () => {
  const [photos, setPhotos] = useState<any[]>([]);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          📸 Progress Photos
          <Button size="sm" variant="outline" className="h-8">
            <Plus className="h-4 w-4 mr-1" />
            Add Photo
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {photos.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {photos.map((photo, index) => (
              <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Camera className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No progress photos yet</p>
            <p className="text-gray-400 text-xs mt-1">Document your transformation!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressPhotosCard;
