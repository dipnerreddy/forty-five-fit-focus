
import React from 'react';
import { Calendar, CheckCircle2, Trophy } from 'lucide-react';

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

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-sm text-gray-500 mt-1">Your latest workouts</p>
        </div>
        <div className="p-2 bg-green-50 rounded-xl">
          <Trophy className="h-5 w-5 text-green-600" />
        </div>
      </div>

      {displayCompletions.length > 0 ? (
        <div className="space-y-3">
          {displayCompletions.map((completion, index) => (
            <div 
              key={index} 
              className="group flex items-center gap-4 p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-100"
            >
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  {index === 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-medium text-gray-900 text-sm">
                    Day {completion.day} Complete
                  </h4>
                  {completion.routine && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg border border-blue-100">
                      {completion.routine}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(completion.completed_at)}</span>
                  </div>
                  <span>•</span>
                  <span>{getTimeAgo(completion.completed_at)}</span>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </div>
          ))}

          {recentCompletions.length > 5 && (
            <div className="text-center pt-2">
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                View {recentCompletions.length - 5} more activities
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-2xl flex items-center justify-center">
            <Trophy className="h-8 w-8 text-gray-300" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No workouts yet</h4>
          <p className="text-sm text-gray-500">Complete your first workout to see it here!</p>
        </div>
      )}
    </div>
  );
};

export default RecentCompletionsCard;
