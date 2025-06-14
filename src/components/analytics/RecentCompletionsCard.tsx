
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RecentCompletion {
  day: number;
  completed_at: string;
  routine?: string;
}

interface RecentCompletionsCardProps {
  recentCompletions: RecentCompletion[];
}

const RecentCompletionsCard: React.FC<RecentCompletionsCardProps> = ({ recentCompletions }) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recent Workouts</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {recentCompletions.length > 0 ? (
          <div className="space-y-3">
            {recentCompletions.map((completion, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Day {completion.day}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(completion.completed_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-green-500 text-xl">✅</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No workouts completed yet</p>
            <p className="text-sm text-gray-400 mt-1">Start your first workout!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentCompletionsCard;
