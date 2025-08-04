import { Exercise } from '../types';

export const exercises: Exercise[] = [
  // Upper Body A - Strength Focus
  {
    id: 'barbell-bench-press',
    name: 'Barbell Bench Press',
    category: 'compound',
    muscleGroups: ['chest', 'shoulders', 'triceps'],
    instructions: 'Focus on controlled movement. Lower the bar to your chest over 2-3 seconds, then press up powerfully. Rest 2-3 minutes between sets.'
  },
  {
    id: 'bent-over-barbell-row',
    name: 'Bent Over Barbell Row',
    category: 'compound',
    muscleGroups: ['back', 'biceps'],
    instructions: 'Hinge at the hips, keep your back straight. Pull the bar to your lower chest/upper abdomen. Squeeze your shoulder blades together at the top.'
  },
  {
    id: 'overhead-press',
    name: 'Overhead Press (Standing)',
    category: 'compound',
    muscleGroups: ['shoulders', 'triceps', 'core'],
    instructions: 'Stand with feet shoulder-width apart. Press the bar straight up, keeping your core tight. The bar should travel in a straight line over your shoulders.'
  },
  {
    id: 'pull-ups',
    name: 'Pull-ups or Lat Pulldowns',
    category: 'compound',
    muscleGroups: ['back', 'biceps'],
    instructions: 'If you can do pull-ups, great! If not, use the lat pulldown machine. Focus on pulling with your back muscles, not just your arms.'
  },
  {
    id: 'dips',
    name: 'Dips or Close-Grip Bench Press',
    category: 'accessory',
    muscleGroups: ['triceps', 'chest'],
    instructions: 'For dips, lean slightly forward to target chest more. For close-grip bench, hands should be about shoulder-width apart.'
  },
  {
    id: 'barbell-curls',
    name: 'Barbell Curls',
    category: 'accessory',
    muscleGroups: ['biceps'],
    instructions: 'Keep your elbows at your sides. Focus on squeezing your biceps at the top of the movement.'
  },

  // Lower Body A - Strength Focus
  {
    id: 'barbell-squat',
    name: 'Barbell Back Squat',
    category: 'compound',
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
    instructions: 'Feet shoulder-width apart, toes slightly turned out. Sit back like you\'re sitting in a chair. Go down until your hip crease is below your knee cap.'
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    category: 'compound',
    muscleGroups: ['hamstrings', 'glutes', 'back'],
    instructions: 'Start standing with the bar. Push your hips back and lower the bar along your legs. Feel a stretch in your hamstrings, then drive your hips forward to return to standing.'
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    category: 'accessory',
    muscleGroups: ['quadriceps', 'glutes'],
    instructions: 'Rear foot elevated on a bench. Lower until your front thigh is parallel to the ground. This is a great unilateral (single-leg) exercise.'
  },
  {
    id: 'walking-lunges',
    name: 'Walking Lunges',
    category: 'accessory',
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
    instructions: 'Step forward into a lunge, then bring your back foot forward into the next lunge. Keep your torso upright.'
  },
  {
    id: 'calf-raises',
    name: 'Calf Raises',
    category: 'accessory',
    muscleGroups: ['calves'],
    instructions: 'Rise up on your toes, squeeze your calves at the top, then lower slowly. Can be done with body weight or holding dumbbells.'
  },
  {
    id: 'plank',
    name: 'Plank',
    category: 'accessory',
    muscleGroups: ['core'],
    instructions: 'Hold a straight line from your head to your heels. Keep your core tight and breathe normally.'
  },

  // Upper Body B - Volume Focus
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    category: 'compound',
    muscleGroups: ['chest', 'shoulders', 'triceps'],
    instructions: 'Set the bench to about 30-45 degrees. Press the dumbbells up and slightly together at the top.'
  },
  {
    id: 'seated-cable-row',
    name: 'Seated Cable Row',
    category: 'compound',
    muscleGroups: ['back', 'biceps'],
    instructions: 'Sit up straight, pull the handle to your lower chest. Squeeze your shoulder blades together and keep your elbows close to your body.'
  },
  {
    id: 'lateral-raises',
    name: 'Lateral Raises',
    category: 'accessory',
    muscleGroups: ['shoulders'],
    instructions: 'Raise the dumbbells out to your sides until they\'re parallel to the ground. Lead with your pinkies, not your thumbs.'
  },
  {
    id: 'face-pulls',
    name: 'Face Pulls',
    category: 'accessory',
    muscleGroups: ['rear-delts', 'traps'],
    instructions: 'Pull the rope to your face, spreading the rope apart as you pull. This helps with posture and shoulder health.'
  },
  {
    id: 'tricep-pushdowns',
    name: 'Tricep Pushdowns',
    category: 'accessory',
    muscleGroups: ['triceps'],
    instructions: 'Keep your elbows at your sides and push the weight down by extending your forearms. Squeeze your triceps at the bottom.'
  },
  {
    id: 'hammer-curls',
    name: 'Hammer Curls',
    category: 'accessory',
    muscleGroups: ['biceps', 'forearms'],
    instructions: 'Hold the dumbbells with a neutral grip (palms facing each other). Curl up while keeping this grip throughout the movement.'
  },

  // Lower Body B - Volume Focus
  {
    id: 'leg-press',
    name: 'Leg Press',
    category: 'compound',
    muscleGroups: ['quadriceps', 'glutes'],
    instructions: 'Feet shoulder-width apart on the platform. Lower until your knees reach about 90 degrees, then press back up.'
  },
  {
    id: 'leg-curls',
    name: 'Leg Curls (Lying or Seated)',
    category: 'accessory',
    muscleGroups: ['hamstrings'],
    instructions: 'Focus on squeezing your hamstrings to curl your heels toward your glutes. Control the weight on the way down.'
  },
  {
    id: 'leg-extensions',
    name: 'Leg Extensions',
    category: 'accessory',
    muscleGroups: ['quadriceps'],
    instructions: 'Extend your legs until they\'re straight, squeeze your quads at the top, then lower slowly.'
  },
  {
    id: 'hip-thrusts',
    name: 'Hip Thrusts',
    category: 'accessory',
    muscleGroups: ['glutes'],
    instructions: 'Upper back on a bench, drive through your heels to lift your hips up. Squeeze your glutes at the top.'
  },
  {
    id: 'goblet-squats',
    name: 'Goblet Squats',
    category: 'accessory',
    muscleGroups: ['quadriceps', 'glutes'],
    instructions: 'Hold a dumbbell at chest level. Squat down while keeping your chest up and elbows inside your knees.'
  },
  {
    id: 'russian-twists',
    name: 'Russian Twists',
    category: 'accessory',
    muscleGroups: ['core'],
    instructions: 'Sit with knees bent, lean back slightly. Rotate your torso from side to side. Can hold a weight for added resistance.'
  }
];

export const workoutTemplates = {
  'upper-a': {
    name: 'Upper Body A (Strength Focus)',
    exercises: [
      { exerciseId: 'barbell-bench-press', sets: 3, reps: '5-8', rest: '2-3 min' },
      { exerciseId: 'bent-over-barbell-row', sets: 3, reps: '5-8', rest: '2-3 min' },
      { exerciseId: 'overhead-press', sets: 3, reps: '6-10', rest: '2-3 min' },
      { exerciseId: 'pull-ups', sets: 3, reps: '8-12', rest: '60-90 sec' },
      { exerciseId: 'dips', sets: 3, reps: '8-12', rest: '60-90 sec' },
      { exerciseId: 'barbell-curls', sets: 3, reps: '10-12', rest: '60-90 sec' }
    ]
  },
  'lower-a': {
    name: 'Lower Body A (Strength Focus)',
    exercises: [
      { exerciseId: 'barbell-squat', sets: 3, reps: '5-8', rest: '2-3 min' },
      { exerciseId: 'romanian-deadlift', sets: 3, reps: '6-10', rest: '2-3 min' },
      { exerciseId: 'bulgarian-split-squat', sets: 3, reps: '10-12 each leg', rest: '60-90 sec' },
      { exerciseId: 'walking-lunges', sets: 3, reps: '12-15 each leg', rest: '60-90 sec' },
      { exerciseId: 'calf-raises', sets: 4, reps: '15-20', rest: '60 sec' },
      { exerciseId: 'plank', sets: 3, reps: '30-60 seconds', rest: '60 sec' }
    ]
  },
  'upper-b': {
    name: 'Upper Body B (Volume Focus)',
    exercises: [
      { exerciseId: 'incline-dumbbell-press', sets: 4, reps: '8-12', rest: '2 min' },
      { exerciseId: 'seated-cable-row', sets: 4, reps: '10-12', rest: '2 min' },
      { exerciseId: 'lateral-raises', sets: 4, reps: '12-15', rest: '60-90 sec' },
      { exerciseId: 'face-pulls', sets: 4, reps: '15-20', rest: '60 sec' },
      { exerciseId: 'tricep-pushdowns', sets: 3, reps: '12-15', rest: '60 sec' },
      { exerciseId: 'hammer-curls', sets: 3, reps: '12-15', rest: '60 sec' }
    ]
  },
  'lower-b': {
    name: 'Lower Body B (Volume Focus)',
    exercises: [
      { exerciseId: 'leg-press', sets: 4, reps: '12-15', rest: '2 min' },
      { exerciseId: 'leg-curls', sets: 4, reps: '12-15', rest: '90 sec' },
      { exerciseId: 'leg-extensions', sets: 4, reps: '12-15', rest: '90 sec' },
      { exerciseId: 'hip-thrusts', sets: 3, reps: '15-20', rest: '90 sec' },
      { exerciseId: 'goblet-squats', sets: 3, reps: '15-20', rest: '60 sec' },
      { exerciseId: 'russian-twists', sets: 3, reps: '20-30', rest: '60 sec' }
    ]
  }
};