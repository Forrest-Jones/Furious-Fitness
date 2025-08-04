import React from 'react';
import { Target, TrendingUp, Activity, Calendar } from 'lucide-react';
import { defaultUserProfile, calculateStats } from '../data/userProfile';

const Dashboard: React.FC = () => {
  const stats = calculateStats(defaultUserProfile);
  
  // Mock today's data - in a real app, this would come from state/database
  const todayNutrition = {
    calories: 1850,
    protein: 145,
    steps: 8500
  };

  const progressCards = [
    {
      title: 'Current Weight',
      value: `${defaultUserProfile.currentWeight} lbs`,
      target: `Target: ${stats.targetWeight} lbs`,
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Body Fat',
      value: `${defaultUserProfile.bodyFatPercentage}%`,
      target: `Target: ${stats.targetBodyFatPercentage}%`,
      icon: Target,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'Lean Mass',
      value: `${stats.currentLeanMass} lbs`,
      target: `Target: ${stats.targetLeanMass} lbs`,
      icon: Activity,
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  const todayCards = [
    {
      title: 'Calories',
      value: todayNutrition.calories,
      target: defaultUserProfile.dailyCalorieTarget,
      unit: 'cal',
      color: 'text-orange-600 bg-orange-50'
    },
    {
      title: 'Protein',
      value: todayNutrition.protein,
      target: defaultUserProfile.dailyProteinTarget,
      unit: 'g',
      color: 'text-red-600 bg-red-50'
    },
    {
      title: 'Steps',
      value: todayNutrition.steps,
      target: defaultUserProfile.dailyStepsTarget,
      unit: '',
      color: 'text-indigo-600 bg-indigo-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Body Recomposition Journey</h1>
        <p className="text-primary-100">
          Goal: Gain {defaultUserProfile.goalMuscleGain} lbs muscle • Lose {defaultUserProfile.goalFatLoss} lbs fat
        </p>
      </div>

      {/* Body Composition Progress */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Body Composition Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {progressCards.map((card, index) => (
            <div key={index} className="card">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${card.color}`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-sm text-gray-600">{card.target}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Progress */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {todayCards.map((card, index) => {
            const percentage = Math.min((card.value / card.target) * 100, 100);
            const isComplete = percentage >= 100;
            
            return (
              <div key={index} className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
                  <div className={`p-2 rounded-lg ${card.color}`}>
                    <Target className="h-4 w-4" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      {card.value.toLocaleString()}{card.unit}
                    </span>
                    <span className="text-sm text-gray-500">
                      / {card.target.toLocaleString()}{card.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isComplete ? 'bg-green-500' : 'bg-primary-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className={`text-sm ${isComplete ? 'text-green-600' : 'text-gray-600'}`}>
                    {percentage.toFixed(0)}% complete
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Stats Summary */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Body Recomposition Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Current Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">{defaultUserProfile.currentWeight} lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Body Fat:</span>
                <span className="font-medium">{defaultUserProfile.bodyFatPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fat Mass:</span>
                <span className="font-medium">{stats.currentFatMass} lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lean Mass:</span>
                <span className="font-medium">{stats.currentLeanMass} lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">BMI:</span>
                <span className="font-medium">{stats.currentBMI}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Target Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium text-green-600">{stats.targetWeight} lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Body Fat:</span>
                <span className="font-medium text-green-600">{stats.targetBodyFatPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fat Mass:</span>
                <span className="font-medium text-green-600">{stats.targetFatMass} lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lean Mass:</span>
                <span className="font-medium text-green-600">{stats.targetLeanMass} lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">BMI:</span>
                <span className="font-medium text-green-600">{stats.targetBMI}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
          <h4 className="font-medium text-primary-900 mb-2">Your Approach</h4>
          <ul className="text-sm text-primary-800 space-y-1">
            <li>• 2,500 calories daily (moderate deficit for fat loss)</li>
            <li>• 175-200g protein daily (muscle preservation & growth)</li>
            <li>• 10,000 steps daily (low-intensity fat burning)</li>
            <li>• 4-day upper/lower workout split (strength & muscle building)</li>
            <li>• Low-carb carnivore approach with fresh fruit</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;