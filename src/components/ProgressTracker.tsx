import React, { useState } from 'react';
import { TrendingUp, Scale, Target, Calendar, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ProgressEntry } from '../types';
import { defaultUserProfile, calculateStats } from '../data/userProfile';

const ProgressTracker: React.FC = () => {
  const [progressData, setProgressData] = useState<ProgressEntry[]>([
    {
      date: '2024-01-01',
      weight: 211.4,
      bodyFatPercentage: 33,
      measurements: {
        chest: 44,
        waist: 38,
        arms: 16.5,
        thighs: 26
      }
    },
    {
      date: '2024-01-08',
      weight: 210.8,
      bodyFatPercentage: 32.5,
      measurements: {
        chest: 44.2,
        waist: 37.5,
        arms: 16.6,
        thighs: 26.1
      }
    },
    {
      date: '2024-01-15',
      weight: 210.2,
      bodyFatPercentage: 32,
      measurements: {
        chest: 44.5,
        waist: 37,
        arms: 16.8,
        thighs: 26.2
      }
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<ProgressEntry>>({
    date: new Date().toISOString().split('T')[0],
    weight: 0,
    bodyFatPercentage: 0,
    measurements: {}
  });

  const stats = calculateStats(defaultUserProfile);
  const latestEntry = progressData[progressData.length - 1];
  
  // Calculate progress towards goals
  const weightProgress = latestEntry ? {
    current: latestEntry.weight,
    target: stats.targetWeight,
    change: latestEntry.weight - defaultUserProfile.currentWeight
  } : null;

  const bodyFatProgress = latestEntry ? {
    current: latestEntry.bodyFatPercentage || 0,
    target: stats.targetBodyFatPercentage,
    change: (latestEntry.bodyFatPercentage || 0) - defaultUserProfile.bodyFatPercentage
  } : null;

  // Calculate lean mass from current data
  const currentLeanMass = latestEntry ? 
    latestEntry.weight * (1 - (latestEntry.bodyFatPercentage || 0) / 100) : 0;
  const leanMassChange = currentLeanMass - stats.currentLeanMass;

  const addEntry = () => {
    if (newEntry.date && newEntry.weight) {
      const entry: ProgressEntry = {
        date: newEntry.date || '',
        weight: newEntry.weight || 0,
        bodyFatPercentage: newEntry.bodyFatPercentage,
        measurements: newEntry.measurements || {}
      };
      setProgressData([...progressData, entry].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      ));
      setNewEntry({
        date: new Date().toISOString().split('T')[0],
        weight: 0,
        bodyFatPercentage: 0,
        measurements: {}
      });
      setShowAddForm(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const progressCards = [
    {
      title: 'Weight Change',
      current: weightProgress?.current || 0,
      target: weightProgress?.target || 0,
      change: weightProgress?.change || 0,
      unit: 'lbs',
      color: 'text-blue-600 bg-blue-50',
      icon: Scale
    },
    {
      title: 'Body Fat %',
      current: bodyFatProgress?.current || 0,
      target: bodyFatProgress?.target || 0,
      change: bodyFatProgress?.change || 0,
      unit: '%',
      color: 'text-green-600 bg-green-50',
      icon: Target
    },
    {
      title: 'Lean Mass',
      current: currentLeanMass,
      target: stats.targetLeanMass,
      change: leanMassChange,
      unit: 'lbs',
      color: 'text-purple-600 bg-purple-50',
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Progress Tracker</h1>
          <p className="text-gray-600">Track your body recomposition journey</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Entry
        </button>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {progressCards.map((card, index) => {
          const progressPercentage = Math.abs(card.target - defaultUserProfile.currentWeight) > 0 
            ? Math.abs(card.change) / Math.abs(card.target - (index === 0 ? defaultUserProfile.currentWeight : 
                index === 1 ? defaultUserProfile.bodyFatPercentage : stats.currentLeanMass)) * 100
            : 0;

          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
                <div className={`p-2 rounded-lg ${card.color}`}>
                  <card.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {card.current.toFixed(1)}{card.unit}
                  </span>
                  <span className="text-sm text-gray-500">
                    → {card.target.toFixed(1)}{card.unit}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                    card.change > 0 ? 'text-green-600' : card.change < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {card.change > 0 ? '+' : ''}{card.change.toFixed(1)}{card.unit}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({progressPercentage.toFixed(0)}% to goal)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weight Chart */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Weight Trend</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
              />
              <YAxis 
                domain={['dataMin - 2', 'dataMax + 2']}
                tickFormatter={(value) => `${value} lbs`}
              />
              <Tooltip 
                labelFormatter={(label) => formatDate(label)}
                formatter={(value: number) => [`${value.toFixed(1)} lbs`, 'Weight']}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Body Fat Chart */}
      {progressData.some(entry => entry.bodyFatPercentage) && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Body Fat Percentage</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData.filter(entry => entry.bodyFatPercentage)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                />
                <YAxis 
                  domain={['dataMin - 1', 'dataMax + 1']}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  labelFormatter={(label) => formatDate(label)}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'Body Fat']}
                />
                <Line 
                  type="monotone" 
                  dataKey="bodyFatPercentage" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Measurements Table */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Body Measurements</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Body Fat %
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Waist
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Arms
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thighs
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {progressData.slice().reverse().map((entry, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.weight} lbs
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.bodyFatPercentage ? `${entry.bodyFatPercentage}%` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.measurements?.chest ? `${entry.measurements.chest}"` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.measurements?.waist ? `${entry.measurements.waist}"` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.measurements?.arms ? `${entry.measurements.arms}"` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.measurements?.thighs ? `${entry.measurements.thighs}"` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Entry Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Progress Entry</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="input-field"
                  value={newEntry.date || ''}
                  onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="input-field"
                    value={newEntry.weight || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, weight: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Body Fat %</label>
                  <input
                    type="number"
                    step="0.1"
                    className="input-field"
                    value={newEntry.bodyFatPercentage || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, bodyFatPercentage: Number(e.target.value) })}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Measurements (inches)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Chest</label>
                    <input
                      type="number"
                      step="0.1"
                      className="input-field"
                      value={newEntry.measurements?.chest || ''}
                      onChange={(e) => setNewEntry({ 
                        ...newEntry, 
                        measurements: { 
                          ...newEntry.measurements, 
                          chest: Number(e.target.value) 
                        } 
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Waist</label>
                    <input
                      type="number"
                      step="0.1"
                      className="input-field"
                      value={newEntry.measurements?.waist || ''}
                      onChange={(e) => setNewEntry({ 
                        ...newEntry, 
                        measurements: { 
                          ...newEntry.measurements, 
                          waist: Number(e.target.value) 
                        } 
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Arms</label>
                    <input
                      type="number"
                      step="0.1"
                      className="input-field"
                      value={newEntry.measurements?.arms || ''}
                      onChange={(e) => setNewEntry({ 
                        ...newEntry, 
                        measurements: { 
                          ...newEntry.measurements, 
                          arms: Number(e.target.value) 
                        } 
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Thighs</label>
                    <input
                      type="number"
                      step="0.1"
                      className="input-field"
                      value={newEntry.measurements?.thighs || ''}
                      onChange={(e) => setNewEntry({ 
                        ...newEntry, 
                        measurements: { 
                          ...newEntry.measurements, 
                          thighs: Number(e.target.value) 
                        } 
                      })}
                    />
                  </div>
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
    </div>
  );
};

export default ProgressTracker;