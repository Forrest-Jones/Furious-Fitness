import React, { useState } from 'react';
import { Plus, Target, TrendingUp, Apple } from 'lucide-react';
import { defaultUserProfile } from '../data/userProfile';

interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  amount: string;
}

const NutritionTracker: React.FC = () => {
  const [todayEntries, setTodayEntries] = useState<FoodEntry[]>([
    {
      id: '1',
      name: 'Grilled Chicken Breast',
      calories: 350,
      protein: 65,
      carbs: 0,
      fat: 8,
      amount: '8 oz'
    },
    {
      id: '2',
      name: 'Grass-Fed Ground Beef',
      calories: 450,
      protein: 35,
      carbs: 0,
      fat: 35,
      amount: '6 oz'
    },
    {
      id: '3',
      name: 'Eggs (Large)',
      calories: 420,
      protein: 36,
      carbs: 2,
      fat: 30,
      amount: '6 eggs'
    },
    {
      id: '4',
      name: 'Apple',
      calories: 95,
      protein: 0.5,
      carbs: 25,
      fat: 0.3,
      amount: '1 medium'
    },
    {
      id: '5',
      name: 'Blueberries',
      calories: 85,
      protein: 1,
      carbs: 21,
      fat: 0.5,
      amount: '1 cup'
    }
  ]);

  const [newEntry, setNewEntry] = useState<Partial<FoodEntry>>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    amount: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const totals = todayEntries.reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const addEntry = () => {
    if (newEntry.name && newEntry.calories) {
      const entry: FoodEntry = {
        id: Date.now().toString(),
        name: newEntry.name || '',
        calories: newEntry.calories || 0,
        protein: newEntry.protein || 0,
        carbs: newEntry.carbs || 0,
        fat: newEntry.fat || 0,
        amount: newEntry.amount || ''
      };
      setTodayEntries([...todayEntries, entry]);
      setNewEntry({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0, amount: '' });
      setShowAddForm(false);
    }
  };

  const removeEntry = (id: string) => {
    setTodayEntries(todayEntries.filter(entry => entry.id !== id));
  };

  const macroCards = [
    {
      title: 'Calories',
      current: totals.calories,
      target: defaultUserProfile.dailyCalorieTarget,
      unit: 'cal',
      color: 'text-orange-600 bg-orange-50',
      icon: Target
    },
    {
      title: 'Protein',
      current: totals.protein,
      target: defaultUserProfile.dailyProteinTarget,
      unit: 'g',
      color: 'text-red-600 bg-red-50',
      icon: TrendingUp
    },
    {
      title: 'Carbs',
      current: totals.carbs,
      target: 50, // Low-carb target
      unit: 'g',
      color: 'text-blue-600 bg-blue-50',
      icon: Apple
    },
    {
      title: 'Fat',
      current: totals.fat,
      target: 125, // Calculated for remaining calories
      unit: 'g',
      color: 'text-yellow-600 bg-yellow-50',
      icon: Target
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nutrition Tracker</h1>
          <p className="text-gray-600">Track your daily nutrition for body recomposition</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Food
        </button>
      </div>

      {/* Daily Macros Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {macroCards.map((macro, index) => {
          const percentage = Math.min((macro.current / macro.target) * 100, 100);
          const isComplete = percentage >= 100;
          const isProtein = macro.title === 'Protein';
          
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">{macro.title}</h3>
                <div className={`p-2 rounded-lg ${macro.color}`}>
                  <macro.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {Math.round(macro.current)}{macro.unit}
                  </span>
                  <span className="text-sm text-gray-500">
                    / {macro.target}{macro.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isComplete ? 'bg-green-500' : 
                      isProtein && percentage >= 80 ? 'bg-green-500' : 'bg-primary-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                <p className={`text-sm ${
                  isComplete || (isProtein && percentage >= 80) ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {percentage.toFixed(0)}% of target
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Food Entries */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Food Log</h2>
        
        {todayEntries.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No food entries yet. Add your first meal!</p>
        ) : (
          <div className="space-y-3">
            {todayEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{entry.name}</h3>
                    <span className="text-sm text-gray-500">{entry.amount}</span>
                  </div>
                  <div className="flex space-x-4 text-sm text-gray-600 mt-1">
                    <span>{entry.calories} cal</span>
                    <span>{entry.protein}g protein</span>
                    <span>{entry.carbs}g carbs</span>
                    <span>{entry.fat}g fat</span>
                  </div>
                </div>
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Food Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Food Entry</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={newEntry.name || ''}
                  onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
                  placeholder="e.g., Grilled Chicken Breast"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="text"
                  className="input-field"
                  value={newEntry.amount || ''}
                  onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
                  placeholder="e.g., 6 oz, 1 cup"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
                  <input
                    type="number"
                    className="input-field"
                    value={newEntry.calories || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, calories: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Protein (g)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={newEntry.protein || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, protein: Number(e.target.value) })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={newEntry.carbs || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, carbs: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fat (g)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={newEntry.fat || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, fat: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button onClick={addEntry} className="btn-primary flex-1">
                Add Entry
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nutrition Guidelines */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Nutrition Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Daily Targets</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-600">Calories:</span>
                <span className="font-medium">2,500 cal</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Protein:</span>
                <span className="font-medium">175-200g (1g per lb ideal body weight)</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Carbs:</span>
                <span className="font-medium">~50g (mainly from fruit)</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Fat:</span>
                <span className="font-medium">~125g (remaining calories)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Food Guidelines</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Focus on high-quality animal proteins</li>
              <li>• Include fresh fruits for carbohydrates</li>
              <li>• Minimize processed foods</li>
              <li>• Stay hydrated (aim for 1 gallon water/day)</li>
              <li>• Time protein intake around workouts</li>
              <li>• Listen to hunger cues</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionTracker;