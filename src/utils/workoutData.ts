
export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: string;
  category: 'Main' | 'Core';
  weight?: number;
  notes?: string;
  cardioNotes?: string;
}

export interface DayWorkout {
  day: number;
  dayTitle: string;
  dayFocus: string;
  exercises: WorkoutExercise[];
}

const HOME_WORKOUT_PLAN_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRqDM3PdzUcbRIEKFoga2kmigtYQpN5Fi7UNYch9cckwDcOjR818y6hdTKsGS8K7aOzvzWQmqcpT9Hh/pub?output=csv";
const GYM_WORKOUT_PLAN_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQSsBI8dSPkAVaqSOnnLs5tDu4uTrMzl_Ir3eg3AWqPaa8W510mtSpqqxpt8U5R7Z4ozDVyhiFxAKUy/pub?output=csv";

function parseCSV(csvText: string): string[][] {
  const lines = csvText.split('\n');
  const result: string[][] = [];
  
  for (const line of lines) {
    if (line.trim()) {
      // Handle CSV parsing with proper quote handling
      const row: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          row.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      
      // Add the last field
      row.push(current.trim());
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
      if (row.length >= 7) {
        const day = parseInt(row[0]);
        const dayTitle = row[1] || '';
        const dayFocus = row[2] || '';
        const category = row[3] || 'Main';
        const exerciseName = row[4] || '';
        const sets = parseInt(row[5]) || 4;
        const reps = row[6] || '8';
        const cardioNotes = row[7] || '';
        
        if (!isNaN(day) && exerciseName) {
          // Find existing day or create new one
          let dayWorkout = workoutPlan.find(d => d.day === day);
          if (!dayWorkout) {
            dayWorkout = { 
              day, 
              dayTitle,
              dayFocus,
              exercises: [] 
            };
            workoutPlan.push(dayWorkout);
          }
          
          dayWorkout.exercises.push({
            name: exerciseName,
            sets,
            reps,
            category: category as 'Main' | 'Core',
            cardioNotes
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
      dayTitle: "Push",
      dayFocus: "Chest, Shoulders, Triceps",
      exercises: [
        { name: "Push-ups", sets: 4, reps: "8", category: "Main" },
        { name: "Squats", sets: 4, reps: "8", category: "Main" },
        { name: "Plank Hold", sets: 4, reps: "30 sec", category: "Core" }
      ]
    }
  ];
}

export function getTodaysWorkout(workoutPlan: DayWorkout[], currentDay: number): DayWorkout | null {
  return workoutPlan.find(plan => plan.day === currentDay) || null;
}
