
export type RoutineType = 'Home' | 'Gym' | 'Custom';

export interface UserProfile {
  name: string;
  currentDay: number;
  streak: number;
  routine: RoutineType;
  customSheetUrl?: string;
}
