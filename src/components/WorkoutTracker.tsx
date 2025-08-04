import React, { useState } from 'react';
import { Calendar, Dumbbell, Clock, Plus, CheckCircle, PlayCircle } from 'lucide-react';
import { exercises, workoutTemplates } from '../data/exercises';
import { Workout, WorkoutExercise, WorkoutSet } from '../types';

const WorkoutTracker: React.FC = () => {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [workoutHistory, setWorkoutHistory] = useState<Workout[]>([
    {
      id: '1',
      date: '2024-01-15',
      name: 'Upper Body A (Strength Focus)',
      type: 'upper-a',
      exercises: [
        {
          exerciseId: 'barbell-bench-press',
          sets: [
            { weight: 185, reps: 8 },
            { weight: 185, reps: 7 },
            { weight: 185, reps: 6 }
          ]
        },
        {
          exerciseId: 'bent-over-barbell-row',
          sets: [
            { weight: 155, reps: 8 },
            { weight: 155, reps: 8 },
            { weight: 155, reps: 7 }
          ]
        }
      ],
      duration: 65
    }
  ]);

  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number | null>(null);

  const startWorkout = (workoutType: 'upper-a' | 'lower-a' | 'upper-b' | 'lower-b') => {
    const template = workoutTemplates[workoutType];
    const newWorkout: Workout = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      name: template.name,
      type: workoutType,
      exercises: template.exercises.map(ex => ({
        exerciseId: ex.exerciseId,
        sets: Array(ex.sets).fill(null).map(() => ({ weight: 0, reps: 0 }))
      }))
    };
    setCurrentWorkout(newWorkout);
    setActiveExerciseIndex(0);
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: 'weight' | 'reps', value: number) => {
    if (!currentWorkout) return;
    
    const updatedWorkout = { ...currentWorkout };
    updatedWorkout.exercises[exerciseIndex].sets[setIndex] = {
      ...updatedWorkout.exercises[exerciseIndex].sets[setIndex],
      [field]: value
    };
    setCurrentWorkout(updatedWorkout);
  };

  const completeWorkout = () => {
    if (!currentWorkout) return;
    
    const completedWorkout = {
      ...currentWorkout,
      duration: 60 // Mock duration
    };
    
    setWorkoutHistory([completedWorkout, ...workoutHistory]);
    setCurrentWorkout(null);
    setActiveExerciseIndex(null);
  };

  const getExerciseById = (id: string) => exercises.find(ex => ex.id === id);
  
  const getLastWorkoutData = (exerciseId: string) => {
    for (const workout of workoutHistory) {
      const exercise = workout.exercises.find(ex => ex.exerciseId === exerciseId);
      if (exercise && exercise.sets.length > 0) {
        const bestSet = exercise.sets.reduce((best, set) => 
          set.weight * set.reps > best.weight * best.reps ? set : best
        );
        return bestSet;
      }
    }
    return null;
  };

  const workoutOptions = [
    { 
      type: 'upper-a' as const, 
      name: 'Upper Body A', 
      subtitle: 'Strength Focus',
      description: 'Heavy compound movements, 5-8 reps',
      color: 'bg-blue-500'
    },
    { 
      type: 'lower-a' as const, 
      name: 'Lower Body A', 
      subtitle: 'Strength Focus',
      description: 'Squats, deadlifts, 5-8 reps',
      color: 'bg-green-500'
    },
    { 
      type: 'upper-b' as const, 
      name: 'Upper Body B', 
      subtitle: 'Volume Focus',
      description: 'Higher reps, more volume, 8-15 reps',
      color: 'bg-purple-500'
    },
    { 
      type: 'lower-b' as const, 
      name: 'Lower Body B', 
      subtitle: 'Volume Focus',
      description: 'Leg press, curls, extensions, 12-20 reps',
      color: 'bg-orange-500'
    }
  ];

  if (currentWorkout) {
    return (
      <div className="space-y-6">
        {/* Workout Header */}
        <div className="card">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentWorkout.name}</h1>
              <p className="text-gray-600">Today's Workout • {currentWorkout.exercises.length} exercises</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setCurrentWorkout(null)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={completeWorkout}
                className="btn-primary flex items-center"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Workout
              </button>
            </div>
          </div>
        </div>

        {/* Exercise List */}
        <div className="space-y-4">
          {currentWorkout.exercises.map((workoutExercise, exerciseIndex) => {
            const exercise = getExerciseById(workoutExercise.exerciseId);
            const lastWorkout = getLastWorkoutData(workoutExercise.exerciseId);
            const isActive = activeExerciseIndex === exerciseIndex;
            
            if (!exercise) return null;

            return (
              <div key={exerciseIndex} className={`card ${isActive ? 'ring-2 ring-primary-500' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-900">{exercise.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        exercise.category === 'compound' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {exercise.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{exercise.instructions}</p>
                    {lastWorkout && (
                      <p className="text-sm text-green-600 mt-2">
                        Last: {lastWorkout.weight} lbs × {lastWorkout.reps} reps
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setActiveExerciseIndex(isActive ? null : exerciseIndex)}
                    className={`btn-${isActive ? 'primary' : 'secondary'} flex items-center`}
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    {isActive ? 'Active' : 'Start'}
                  </button>
                </div>

                {/* Sets */}
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500">
                    <span>Set</span>
                    <span>Weight (lbs)</span>
                    <span>Reps</span>
                    <span>Previous</span>
                  </div>
                  
                  {workoutExercise.sets.map((set, setIndex) => (
                    <div key={setIndex} className="grid grid-cols-4 gap-4 items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {setIndex + 1}
                      </span>
                      <input
                        type="number"
                        className="input-field text-center"
                        value={set.weight || ''}
                        onChange={(e) => updateSet(exerciseIndex, setIndex, 'weight', Number(e.target.value))}
                        placeholder="0"
                      />
                      <input
                        type="number"
                        className="input-field text-center"
                        value={set.reps || ''}
                        onChange={(e) => updateSet(exerciseIndex, setIndex, 'reps', Number(e.target.value))}
                        placeholder="0"
                      />
                      <span className="text-sm text-gray-500">
                        {lastWorkout ? `${lastWorkout.weight} × ${lastWorkout.reps}` : '-'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Workout Tracker</h1>
        <p className="text-gray-600">4-day upper/lower split for body recomposition</p>
      </div>

      {/* Workout Selection */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Start Today's Workout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workoutOptions.map((option) => (
            <div key={option.type} className="card hover:shadow-lg transition-shadow cursor-pointer"
                 onClick={() => startWorkout(option.type)}>
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${option.color}`}>
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{option.name}</h3>
                  <p className="text-sm text-gray-600">{option.subtitle}</p>
                  <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                </div>
                <PlayCircle className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Workouts */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Workouts</h2>
        {workoutHistory.length === 0 ? (
          <div className="card text-center py-8">
            <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No workouts completed yet. Start your first workout!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {workoutHistory.slice(0, 5).map((workout) => (
              <div key={workout.id} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{workout.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(workout.date).toLocaleDateString()}
                      </span>
                      {workout.duration && (
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {workout.duration} min
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {workout.exercises.length} exercises
                  </span>
                </div>
                
                {/* Exercise Summary */}
                <div className="mt-3 space-y-2">
                  {workout.exercises.slice(0, 3).map((ex, index) => {
                    const exercise = getExerciseById(ex.exerciseId);
                    const bestSet = ex.sets.reduce((best, set) => 
                      set.weight * set.reps > best.weight * best.reps ? set : best, 
                      ex.sets[0]
                    );
                    
                    return (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-700">{exercise?.name}</span>
                        <span className="text-gray-500">
                          {bestSet.weight} lbs × {bestSet.reps} reps
                        </span>
                      </div>
                    );
                  })}
                  {workout.exercises.length > 3 && (
                    <p className="text-xs text-gray-500">
                      +{workout.exercises.length - 3} more exercises
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Workout Plan Overview */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your 4-Day Split</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Weekly Schedule</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday:</span>
                <span className="font-medium">Upper Body A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tuesday:</span>
                <span className="font-medium">Lower Body A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Wednesday:</span>
                <span className="font-medium text-green-600">Rest / 10k Steps</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thursday:</span>
                <span className="font-medium">Upper Body B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Friday:</span>
                <span className="font-medium">Lower Body B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weekend:</span>
                <span className="font-medium text-green-600">Rest / Active Recovery</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Progressive Overload</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Track every set, weight, and rep</li>
              <li>• Aim to beat last week's numbers</li>
              <li>• Increase weight when you hit rep targets</li>
              <li>• Focus on form over heavy weight</li>
              <li>• Rest 2-3 min between compound exercises</li>
              <li>• Rest 60-90 sec between accessory exercises</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTracker;