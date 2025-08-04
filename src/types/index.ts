export interface UserProfile {
  currentWeight: number;
  height: number; // in inches
  bodyFatPercentage: number;
  goalMuscleGain: number; // in lbs
  goalFatLoss: number; // in lbs
  dailyCalorieTarget: number;
  dailyProteinTarget: number;
  dailyStepsTarget: number;
}

export interface DailyNutrition {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  steps: number;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'compound' | 'accessory';
  muscleGroups: string[];
  instructions: string;
}

export interface WorkoutSet {
  weight: number;
  reps: number;
  restTime?: number;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: WorkoutSet[];
  notes?: string;
}

export interface Workout {
  id: string;
  date: string;
  name: string;
  type: 'upper-a' | 'lower-a' | 'upper-b' | 'lower-b';
  exercises: WorkoutExercise[];
  duration?: number;
}

export interface ProgressEntry {
  date: string;
  weight: number;
  bodyFatPercentage?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    arms?: number;
    thighs?: number;
  };
}