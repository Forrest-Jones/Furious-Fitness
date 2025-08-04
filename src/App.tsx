import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Activity, Target, TrendingUp, Calendar, Home, Dumbbell } from 'lucide-react';
import Dashboard from './components/Dashboard';
import NutritionTracker from './components/NutritionTracker';
import WorkoutTracker from './components/WorkoutTracker';
import ProgressTracker from './components/ProgressTracker';
import GoalsOverview from './components/GoalsOverview';

function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/nutrition', icon: Target, label: 'Nutrition' },
    { path: '/workouts', icon: Dumbbell, label: 'Workouts' },
    { path: '/progress', icon: TrendingUp, label: 'Progress' },
    { path: '/goals', icon: Activity, label: 'Goals' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Body Recomposition Tracker</span>
          </div>
          <div className="flex space-x-8">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === path
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4 mr-1" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/nutrition" element={<NutritionTracker />} />
            <Route path="/workouts" element={<WorkoutTracker />} />
            <Route path="/progress" element={<ProgressTracker />} />
            <Route path="/goals" element={<GoalsOverview />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;