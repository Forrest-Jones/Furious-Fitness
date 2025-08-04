# Body Recomposition Fitness Tracker

A comprehensive fitness tracking application designed specifically for body recomposition goals - simultaneously building muscle while losing fat.

## 🎯 Features

### Dashboard
- **Body Composition Overview**: Track current vs target weight, body fat %, and lean mass
- **Daily Progress**: Monitor calories, protein intake, and daily steps
- **Goal Visualization**: Clear progress indicators and completion percentages

### Nutrition Tracker
- **Macro Tracking**: Calories, protein, carbs, and fat with visual progress bars
- **Food Logging**: Add and manage daily food entries with detailed nutritional information
- **Carnivore-Friendly**: Optimized for low-carb, high-protein approach with fresh fruit integration
- **Target Guidelines**: 2,500 calories, 175-200g protein, 10,000 steps daily

### Workout Tracker
- **4-Day Upper/Lower Split**: Scientifically designed for body recomposition
- **Progressive Overload**: Track weights, reps, and sets with historical data
- **Exercise Library**: Comprehensive database with form instructions
- **Workout Types**:
  - Upper Body A (Strength Focus): 5-8 reps, compound movements
  - Lower Body A (Strength Focus): Squats, deadlifts, heavy lifting
  - Upper Body B (Volume Focus): 8-15 reps, higher volume
  - Lower Body B (Volume Focus): Leg press, curls, extensions

### Progress Tracking
- **Weight Trends**: Visual charts showing weight changes over time
- **Body Fat Monitoring**: Track body fat percentage with DEXA scan integration
- **Body Measurements**: Chest, waist, arms, and thigh measurements
- **Lean Mass Calculation**: Automatic calculation of muscle mass changes

### Goals Overview
- **Goal Progress**: Visual tracking of muscle gain (+10 lbs) and fat loss (-20 lbs)
- **Timeline Expectations**: Month-by-month progress expectations
- **Weekly Targets**: Nutrition, training, and recovery targets
- **Recommendations**: Personalized tips and guidance

## 🏋️ Your Specific Goals

### Starting Stats
- **Weight**: 211.4 lbs
- **Height**: 6'0"
- **Body Fat**: 33% (DEXA)
- **Current Lean Mass**: 141.6 lbs
- **Current Fat Mass**: 69.8 lbs

### Target Stats
- **Target Weight**: 201.4 lbs (-10 lbs net)
- **Target Body Fat**: 24.7%
- **Target Lean Mass**: 151.6 lbs (+10 lbs muscle)
- **Target Fat Mass**: 49.8 lbs (-20 lbs fat)

### Approach
- **Nutrition**: 2,500 calories, 175-200g protein, low-carb with fresh fruit
- **Training**: 4-day upper/lower split focusing on progressive overload
- **Cardio**: 10,000 steps daily (low-intensity fat burning)
- **Recovery**: 3 rest days per week with active recovery

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fitness-tracker-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Date Handling**: date-fns

## 📱 App Structure

```
src/
├── components/
│   ├── Dashboard.tsx          # Main dashboard overview
│   ├── NutritionTracker.tsx   # Food logging and macro tracking
│   ├── WorkoutTracker.tsx     # Exercise logging and progressive overload
│   ├── ProgressTracker.tsx    # Body composition and measurements
│   └── GoalsOverview.tsx      # Goal tracking and recommendations
├── data/
│   ├── exercises.ts           # Exercise database and workout templates
│   └── userProfile.ts         # User profile and goal calculations
├── types/
│   └── index.ts              # TypeScript interfaces
└── App.tsx                   # Main app component with routing
```

## 🎯 Workout Plan Details

### Weekly Schedule
- **Monday**: Upper Body A (Strength)
- **Tuesday**: Lower Body A (Strength)
- **Wednesday**: Rest / 10k Steps
- **Thursday**: Upper Body B (Volume)
- **Friday**: Lower Body B (Volume)
- **Weekend**: Rest / Active Recovery

### Progressive Overload Strategy
1. Track every set, weight, and rep
2. Aim to beat previous week's numbers
3. Increase weight when hitting rep targets
4. Focus on form over heavy weight
5. Rest periods: 2-3 min (compound), 60-90 sec (accessory)

## 🍽️ Nutrition Guidelines

### Daily Targets
- **Calories**: 2,500 (moderate deficit for fat loss)
- **Protein**: 175-200g (1g per lb ideal body weight)
- **Carbs**: ~50g (mainly from fresh fruit)
- **Fat**: ~125g (remaining calories)

### Food Approach
- High-quality animal proteins
- Fresh fruits for carbohydrates
- Minimal processed foods
- Adequate hydration (1 gallon water/day)
- Protein timing around workouts

## 📈 Expected Timeline

### Month 1-2
- Strength gains and initial fat loss
- Habit formation and energy improvement
- Learning proper form and techniques

### Month 3-4
- Visible muscle growth
- Significant fat loss and improved body shape
- Better workout performance

### Month 5-6
- Goal achievement and body recomposition
- Maintained strength with new physique
- Established sustainable lifestyle

## 🔧 Customization

The app is designed with your specific goals in mind but can be easily customized:

1. **User Profile**: Update `src/data/userProfile.ts` with different stats
2. **Workout Plan**: Modify `src/data/exercises.ts` for different routines
3. **Nutrition Targets**: Adjust macro targets in the user profile
4. **Progress Tracking**: Add or remove measurement categories

## 📊 Data Persistence

Currently, the app uses local state management. For production use, consider adding:
- Local storage for data persistence
- Backend API for cloud synchronization
- User authentication and profiles
- Export/import functionality

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop and mobile devices
- **Modern Interface**: Clean, professional design with Tailwind CSS
- **Visual Progress**: Charts, progress bars, and color-coded indicators
- **Intuitive Navigation**: Easy-to-use interface with clear sections
- **Real-time Updates**: Immediate feedback on progress and achievements

## 🤝 Contributing

This app is specifically designed for your body recomposition journey, but contributions for improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use and modify for your fitness journey!

---

**Remember**: Body recomposition takes time and consistency. This app is designed to support your journey with the tools and tracking you need to achieve your goals of gaining 10 lbs of muscle while losing 20 lbs of fat. Stay consistent with your nutrition, training, and recovery, and the results will come! 💪
