
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scale, Calendar } from 'lucide-react';
import { useProfileUpdates } from '@/hooks/useProfileUpdates';
import { format } from 'date-fns';

interface WeightUpdateCardProps {
  currentWeight: number;
  lastUpdated?: string;
  onWeightUpdate: () => void;
}

const WeightUpdateCard = ({ currentWeight, lastUpdated, onWeightUpdate }: WeightUpdateCardProps) => {
  const [newWeight, setNewWeight] = useState(currentWeight.toString());
  const [isEditing, setIsEditing] = useState(false);
  const { updateProfile, isUpdating } = useProfileUpdates();

  const handleSaveWeight = async () => {
    const weight = parseFloat(newWeight);
    if (isNaN(weight) || weight <= 0) {
      return;
    }

    const success = await updateProfile({ weight });
    if (success) {
      setIsEditing(false);
      onWeightUpdate();
    }
  };

  const handleCancel = () => {
    setNewWeight(currentWeight.toString());
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Scale className="h-5 w-5 text-blue-500" />
          Weight
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isEditing ? (
          <>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{currentWeight}kg</p>
              {lastUpdated && (
                <div className="flex items-center justify-center gap-1 mt-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Last updated: {format(new Date(lastUpdated), 'MMM dd, yyyy')}</span>
                </div>
              )}
            </div>
            <Button 
              onClick={() => setIsEditing(true)}
              className="w-full"
              variant="outline"
            >
              Update Weight
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="weight">New Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                placeholder="Enter weight in kg"
                min="1"
                step="0.1"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleSaveWeight}
                disabled={isUpdating}
                className="flex-1"
              >
                {isUpdating ? 'Saving...' : 'Save'}
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

export default WeightUpdateCard;
