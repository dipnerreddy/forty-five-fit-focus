
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ruler, Plus } from 'lucide-react';

const BodyMeasurementsCard = () => {
  const [measurements, setMeasurements] = useState<any[]>([]);

  const measurementTypes = [
    { type: 'chest', label: 'Chest', icon: '💪' },
    { type: 'waist', label: 'Waist', icon: '📏' },
    { type: 'arms', label: 'Arms', icon: '💪' },
    { type: 'thighs', label: 'Thighs', icon: '🦵' },
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          📏 Body Measurements
          <Button size="sm" variant="outline" className="h-8">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {measurements.length > 0 ? (
          <div className="space-y-3">
            {measurementTypes.map((type) => (
              <div key={type.type} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span>{type.icon}</span>
                  <span className="text-sm font-medium">{type.label}</span>
                </div>
                <span className="text-sm text-gray-600">-- cm</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Ruler className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No measurements recorded</p>
            <p className="text-gray-400 text-xs mt-1">Track your body changes!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BodyMeasurementsCard;
