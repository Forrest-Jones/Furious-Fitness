import { UserProfile } from '../types';

export const defaultUserProfile: UserProfile = {
  currentWeight: 211.4, // lbs
  height: 72, // 6 feet = 72 inches
  bodyFatPercentage: 33, // 33% from DEXA scan
  goalMuscleGain: 10, // lbs
  goalFatLoss: 20, // lbs
  dailyCalorieTarget: 2500,
  dailyProteinTarget: 187.5, // Average of 175-200g range
  dailyStepsTarget: 10000
};

// Calculate derived stats
export const calculateStats = (profile: UserProfile) => {
  const currentFatMass = profile.currentWeight * (profile.bodyFatPercentage / 100);
  const currentLeanMass = profile.currentWeight - currentFatMass;
  
  const targetFatMass = currentFatMass - profile.goalFatLoss;
  const targetLeanMass = currentLeanMass + profile.goalMuscleGain;
  const targetWeight = targetFatMass + targetLeanMass;
  const targetBodyFatPercentage = (targetFatMass / targetWeight) * 100;
  
  // BMI calculations
  const heightInMeters = (profile.height * 2.54) / 100;
  const currentBMI = profile.currentWeight * 0.453592 / (heightInMeters * heightInMeters);
  const targetBMI = targetWeight * 0.453592 / (heightInMeters * heightInMeters);
  
  return {
    currentFatMass: Math.round(currentFatMass * 10) / 10,
    currentLeanMass: Math.round(currentLeanMass * 10) / 10,
    targetFatMass: Math.round(targetFatMass * 10) / 10,
    targetLeanMass: Math.round(targetLeanMass * 10) / 10,
    targetWeight: Math.round(targetWeight * 10) / 10,
    targetBodyFatPercentage: Math.round(targetBodyFatPercentage * 10) / 10,
    currentBMI: Math.round(currentBMI * 10) / 10,
    targetBMI: Math.round(targetBMI * 10) / 10,
    totalWeightChange: Math.round((targetWeight - profile.currentWeight) * 10) / 10
  };
};