import React from 'react';
import { Target, TrendingUp, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { defaultUserProfile, calculateStats } from '../data/userProfile';

const GoalsOverview: React.FC = () => {
  const stats = calculateStats(defaultUserProfile);
  
  // Mock progress data - in a real app, this would come from the progress tracker
  const currentProgress = {
    weight: 210.2,
    bodyFat: 32,
    leanMass: 143.0
  };

  const goals = [
    {
      id: 'muscle-gain',
      title: 'Muscle Gain',
      target: `+${defaultUserProfile.goalMuscleGain} lbs`,
      current: currentProgress.leanMass,
      baseline: stats.currentLeanMass,
      targetValue: stats.targetLeanMass,
      unit: 'lbs',
      progress: ((currentProgress.leanMass - stats.currentLeanMass) / defaultUserProfile.goalMuscleGain) * 100,
      color: 'text-green-600 bg-green-50',
      icon: TrendingUp,
      status: 'on-track'
    },
    {
      id: 'fat-loss',
      title: 'Fat Loss',
      target: `-${defaultUserProfile.goalFatLoss} lbs`,
      current: currentProgress.weight * (currentProgress.bodyFat / 100),
      baseline: stats.currentFatMass,
      targetValue: stats.targetFatMass,
      unit: 'lbs',
      progress: ((stats.currentFatMass - (currentProgress.weight * (currentProgress.bodyFat / 100))) / defaultUserProfile.goalFatLoss) * 100,
      color: 'text-red-600 bg-red-50',
      icon: Target,
      status: 'on-track'
    },
    {
      id: 'body-fat',
      title: 'Body Fat %',
      target: `${stats.targetBodyFatPercentage.toFixed(1)}%`,
      current: currentProgress.bodyFat,
      baseline: defaultUserProfile.bodyFatPercentage,
      targetValue: stats.targetBodyFatPercentage,
      unit: '%',
      progress: ((defaultUserProfile.bodyFatPercentage - currentProgress.bodyFat) / (defaultUserProfile.bodyFatPercentage - stats.targetBodyFatPercentage)) * 100,
      color: 'text-blue-600 bg-blue-50',
      icon: Target,
      status: 'on-track'
    },
    {
      id: 'total-weight',
      title: 'Total Weight',
      target: `${stats.targetWeight} lbs`,
      current: currentProgress.weight,
      baseline: defaultUserProfile.currentWeight,
      targetValue: stats.targetWeight,
      unit: 'lbs',
      progress: Math.abs((defaultUserProfile.currentWeight - currentProgress.weight) / (defaultUserProfile.currentWeight - stats.targetWeight)) * 100,
      color: 'text-purple-600 bg-purple-50',
      icon: TrendingUp,
      status: 'on-track'
    }
  ];

  const weeklyTargets = [
    {
      category: 'Nutrition',
      targets: [
        { name: 'Daily Calories', target: '2,500 cal', frequency: '7 days/week' },
        { name: 'Protein Intake', target: '175-200g', frequency: '7 days/week' },
        { name: 'Steps', target: '10,000', frequency: '7 days/week' }
      ]
    },
    {
      category: 'Training',
      targets: [
        { name: 'Strength Workouts', target: '4 sessions', frequency: 'per week' },
        { name: 'Upper Body', target: '2 sessions', frequency: 'per week' },
        { name: 'Lower Body', target: '2 sessions', frequency: 'per week' }
      ]
    },
    {
      category: 'Recovery',
      targets: [
        { name: 'Rest Days', target: '3 days', frequency: 'per week' },
        { name: 'Sleep', target: '7-9 hours', frequency: 'nightly' },
        { name: 'Active Recovery', target: 'Walking/Light Activity', frequency: 'rest days' }
      ]
    }
  ];

  const recommendations = [
    {
      type: 'success',
      title: 'Great Progress!',
      message: 'You\'re on track with your body recomposition goals. Keep up the consistent nutrition and training.',
      icon: CheckCircle
    },
    {
      type: 'info',
      title: 'Focus on Progressive Overload',
      message: 'Ensure you\'re gradually increasing weights or reps each week to continue building muscle.',
      icon: TrendingUp
    },
    {
      type: 'warning',
      title: 'Patience is Key',
      message: 'Body recomposition takes time. Expect to see significant changes over 3-6 months of consistent effort.',
      icon: AlertCircle
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600';
      case 'behind': return 'text-yellow-600';
      case 'off-track': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Goals Overview</h1>
        <p className="text-gray-600">Track your body recomposition goals and progress</p>
      </div>

      {/* Goal Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {goals.map((goal) => (
          <div key={goal.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">{goal.title}</h3>
              <div className={`p-2 rounded-lg ${goal.color}`}>
                <goal.icon className="h-4 w-4" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {goal.current.toFixed(1)}{goal.unit}
                </span>
                <span className="text-sm text-gray-500">
                  → {goal.targetValue.toFixed(1)}{goal.unit}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-primary-500 transition-all duration-300"
                  style={{ width: `${Math.min(Math.max(goal.progress, 0), 100)}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${getStatusColor(goal.status)}`}>
                  {Math.max(goal.progress, 0).toFixed(0)}% complete
                </span>
                <span className="text-xs text-gray-500 capitalize">
                  {goal.status.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Targets */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Targets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {weeklyTargets.map((category, index) => (
            <div key={index}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">{category.category}</h3>
              <div className="space-y-3">
                {category.targets.map((target, targetIndex) => (
                  <div key={targetIndex} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-700">{target.name}</p>
                      <p className="text-xs text-gray-500">{target.frequency}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary-600">
                      {target.target}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline and Expectations */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Expected Timeline</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-4 mb-3">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Month 1-2</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Strength gains</li>
                <li>• Initial fat loss</li>
                <li>• Habit formation</li>
                <li>• Energy improvement</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-4 mb-3">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Month 3-4</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Visible muscle growth</li>
                <li>• Significant fat loss</li>
                <li>• Improved body shape</li>
                <li>• Better performance</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-50 rounded-lg p-4 mb-3">
                <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Month 5-6</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Goal achievement</li>
                <li>• Body recomposition</li>
                <li>• Maintained strength</li>
                <li>• New physique</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Recommendations</h2>
        {recommendations.map((rec, index) => {
          const bgColor = rec.type === 'success' ? 'bg-green-50 border-green-200' :
                          rec.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                          'bg-blue-50 border-blue-200';
          const iconColor = rec.type === 'success' ? 'text-green-600' :
                           rec.type === 'warning' ? 'text-yellow-600' :
                           'text-blue-600';
          
          return (
            <div key={index} className={`border rounded-lg p-4 ${bgColor}`}>
              <div className="flex items-start space-x-3">
                <rec.icon className={`h-5 w-5 mt-0.5 ${iconColor}`} />
                <div>
                  <h3 className="font-medium text-gray-900">{rec.title}</h3>
                  <p className="text-sm text-gray-700 mt-1">{rec.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Metrics Summary */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Success Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Body Composition</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Starting Weight:</span>
                <span className="font-medium">{defaultUserProfile.currentWeight} lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Target Weight:</span>
                <span className="font-medium text-green-600">{stats.targetWeight} lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Net Change:</span>
                <span className="font-medium text-blue-600">{stats.totalWeightChange} lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fat Loss Goal:</span>
                <span className="font-medium text-red-600">-{defaultUserProfile.goalFatLoss} lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Muscle Gain Goal:</span>
                <span className="font-medium text-green-600">+{defaultUserProfile.goalMuscleGain} lbs</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Daily Targets</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Calories:</span>
                <span className="font-medium">{defaultUserProfile.dailyCalorieTarget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Protein:</span>
                <span className="font-medium">{defaultUserProfile.dailyProteinTarget}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Steps:</span>
                <span className="font-medium">{defaultUserProfile.dailyStepsTarget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Workouts:</span>
                <span className="font-medium">4 per week</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Approach:</span>
                <span className="font-medium">Low-carb + Fruit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsOverview;