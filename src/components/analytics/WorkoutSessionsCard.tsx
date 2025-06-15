
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, TrendingUp } from 'lucide-react';

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
  // Separate active and completed sessions
  const activeSessions = workoutSessions.filter(session => session.end_date === null);
  const completedSessions = workoutSessions.filter(session => session.end_date !== null);
  
  // Show active session first, then up to 2 previous sessions
  const displaySessions = [
    ...activeSessions,
    ...completedSessions.slice(0, 2)
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-50 rounded-2xl">
          <Calendar className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Workout Sessions</h3>
          <p className="text-gray-500 mt-1">Your training history</p>
        </div>
      </div>

      {displaySessions.length > 0 ? (
        <div className="space-y-4">
          {displaySessions.map((session, index) => (
            <div key={index} className={`p-6 rounded-2xl border transition-all duration-200 ${
              session.end_date === null 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-100' 
                : 'bg-gray-50 border-gray-100'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{session.routine} Routine</h4>
                    {session.end_date === null && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {new Date(session.start_date).toLocaleDateString()} 
                    {session.end_date ? ` - ${new Date(session.end_date).toLocaleDateString()}` : ' - Present'}
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{session.days_completed} days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{session.streak_achieved} streak</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {completedSessions.length > 2 && (
            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">+{completedSessions.length - 2} more sessions</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="p-4 bg-gray-50 rounded-2xl w-fit mx-auto mb-4">
            <Calendar className="h-8 w-8 text-gray-300" />
          </div>
          <p className="text-gray-500">No workout sessions yet</p>
          <p className="text-sm text-gray-400 mt-1">Start your first workout!</p>
        </div>
      )}
    </div>
  );
};

export default WorkoutSessionsCard;
