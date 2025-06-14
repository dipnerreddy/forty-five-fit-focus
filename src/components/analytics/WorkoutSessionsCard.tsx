
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WorkoutSession {
  routine: string;
  start_date: string;
  end_date: string | null;
  days_completed: number;
  streak_achieved: number;
}

interface WorkoutSessionsCardProps {
  workoutSessions: WorkoutSession[];
}

const WorkoutSessionsCard: React.FC<WorkoutSessionsCardProps> = ({ workoutSessions }) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Workout Sessions</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {workoutSessions.length > 0 ? (
          <div className="space-y-3">
            {workoutSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{session.routine} Routine</p>
                  <p className="text-sm text-gray-600">
                    {new Date(session.start_date).toLocaleDateString()} 
                    {session.end_date ? ` - ${new Date(session.end_date).toLocaleDateString()}` : ' - Present'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session.days_completed} days • {session.streak_achieved} streak
                  </p>
                </div>
                <div className="text-right">
                  {!session.end_date ? (
                    <span className="text-green-500 text-sm font-medium">Active</span>
                  ) : (
                    <span className="text-gray-400 text-sm">Completed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No workout sessions yet</p>
            <p className="text-sm text-gray-400 mt-1">Start your first workout!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkoutSessionsCard;
