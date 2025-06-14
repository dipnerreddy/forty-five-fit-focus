
export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: string;
  weight?: number;
  notes?: string;
}

export interface DayWorkout {
  day: number;
  exercises: WorkoutExercise[];
}

const HOME_WORKOUT_PLAN_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRqDM3PdzUcbRIEKFoga2kmigtYQpN5Fi7UNYch9cckwDcOjR818y6hdTKsGS8K7aOzvzWQmqcpT9Hh/pub?output=csv";
const GYM_WORKOUT_PLAN_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQSsBI8dSPkAVaqSOnnLs5tDu4uTrMzl_Ir3eg3AWqPaa8W510mtSpqqxpt8U5R7Z4ozDVyhiFxAKUy/pub?output=csv";

function parseCSV(csvText: string): string[][] {
  const lines = csvText.split('\n');
  const result: string[][] = [];
  
  for (const line of lines) {
    if (line.trim()) {
      // Simple CSV parsing - handles basic cases
      const row = line.split(',').map(cell => cell.trim().replace(/^"|"$/g, ''));
      result.push(row);
    }
  }
  
  return result;
}

export async function fetchWorkoutPlan(routine: 'Home' | 'Gym'): Promise<DayWorkout[]> {
  try {
    const url = routine === 'Home' ? HOME_WORKOUT_PLAN_URL : GYM_WORKOUT_PLAN_URL;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch workout plan');
    }
    
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    // Skip header row
    const dataRows = rows.slice(1);
    
    const workoutPlan: DayWorkout[] = [];
    
    for (const row of dataRows) {
      if (row.length >= 4) {
        const day = parseInt(row[0]);
        const exerciseName = row[1];
        const sets = parseInt(row[2]) || 4;
        const reps = row[3] || '8';
        const notes = row[4] || '';
        
        if (!isNaN(day) && exerciseName) {
          // Find existing day or create new one
          let dayWorkout = workoutPlan.find(d => d.day === day);
          if (!dayWorkout) {
            dayWorkout = { day, exercises: [] };
            workoutPlan.push(dayWorkout);
          }
          
          dayWorkout.exercises.push({
            name: exerciseName,
            sets,
            reps,
            notes
          });
        }
      }
    }
    
    return workoutPlan.sort((a, b) => a.day - b.day);
  } catch (error) {
    console.error('Error fetching workout plan:', error);
    // Return fallback workout if fetch fails
    return getFallbackWorkout();
  }
}

function getFallbackWorkout(): DayWorkout[] {
  return [
    {
      day: 1,
      exercises: [
        { name: "Push-ups", sets: 4, reps: "8" },
        { name: "Squats", sets: 4, reps: "8" },
        { name: "Plank Hold", sets: 4, reps: "30 sec" }
      ]
    }
  ];
}

export function getTodaysWorkout(workoutPlan: DayWorkout[], currentDay: number): WorkoutExercise[] {
  const todaysPlan = workoutPlan.find(plan => plan.day === currentDay);
  return todaysPlan?.exercises || [];
}
