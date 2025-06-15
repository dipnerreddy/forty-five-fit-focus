
import React from 'react';
import { CheckCircle, Calendar } from 'lucide-react';

interface RecentCompletion {
  day: number;
  completed_at: string;
  routine?: string;
}

interface RecentCompletionsCardProps {
  recentCompletions: RecentCompletion[];
}

const RecentCompletionsCard: React.FC<RecentCompletionsCardProps> = ({ recentCompletions }) => {
  // Show only last 5 workouts
  const displayCompletions = recentCompletions.slice(0, 5);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-green-50 rounded-2xl">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-gray-500 mt-1">Your latest workouts</p>
        </div>
      </div>

      {displayCompletions.length > 0 ? (
        <div className="space-y-3">
          {displayCompletions.map((completion, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200">
              <div className="p-2 bg-green-100 rounded-xl">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-gray-900">Day {completion.day}</p>
                  {completion.routine && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg">
                      {completion.routine}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    {formatDate(completion.completed_at)}
                  </p>
                </div>
              </div>
              <div className="text-green-500">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="p-4 bg-gray-50 rounded-2xl w-fit mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-gray-300" />
          </div>
          <p className="text-gray-500">No workouts completed yet</p>
          <p className="text-sm text-gray-400 mt-1">Start your first workout!</p>
        </div>
      )}
    </div>
  );
};

export default RecentCompletionsCard;
