
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Plus } from 'lucide-react';

const ProgressPhotosCard = () => {
  const [photos, setPhotos] = useState<any[]>([]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-xl">
            <Camera className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Progress Photos</h3>
            <p className="text-sm text-gray-500">Document your transformation</p>
          </div>
        </div>
        <Button size="sm" variant="outline" className="h-9 text-xs">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      {photos.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo, index) => (
            <div key={index} className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
              <Camera className="h-8 w-8 text-gray-300" />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="p-4 bg-gray-50 rounded-2xl w-fit mx-auto mb-4">
            <Camera className="h-8 w-8 text-gray-300" />
          </div>
          <p className="text-gray-500 text-sm">No photos yet</p>
          <p className="text-gray-400 text-xs mt-1">Start documenting your journey</p>
        </div>
      )}
    </div>
  );
};

export default ProgressPhotosCard;
