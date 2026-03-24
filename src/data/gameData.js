// ═══════════════════════════════════════════
//  REBEL GEARS — GAME DATA ENGINE
// ═══════════════════════════════════════════

export const RANKS = [
  { id: 'bronze3', label: 'BRONZE III', tier: 'bronze', xpRequired: 0, color: '#cd7f32', glow: '#cd7f3244' },
  { id: 'bronze2', label: 'BRONZE II',  tier: 'bronze', xpRequired: 200, color: '#cd7f32', glow: '#cd7f3244' },
  { id: 'bronze1', label: 'BRONZE I',   tier: 'bronze', xpRequired: 450, color: '#cd7f32', glow: '#cd7f3244' },
  { id: 'silver',  label: 'SILVER',     tier: 'silver', xpRequired: 800, color: '#c0c0c0', glow: '#c0c0c044' },
  { id: 'gold',    label: 'GOLD',       tier: 'gold',   xpRequired: 1300, color: '#ffd700', glow: '#ffd70044' },
  { id: 'elite',   label: 'ELITE',      tier: 'elite',  xpRequired: 2000, color: '#3b82f6', glow: '#3b82f644' },
  { id: 'mythic',  label: 'MYTHIC',     tier: 'mythic', xpRequired: 3000, color: '#a855f7', glow: '#a855f744' },
]

export const MUSCLE_GROUPS = [
  { id: 'arms',      title: 'VANQUISHER',   subtitle: 'Arms · Biceps + Triceps', icon: '💪', color: '#ff4d00' },
  { id: 'chest',     title: 'TITAN CORE',   subtitle: 'Chest',                  icon: '🔥', color: '#00f5d4' },
  { id: 'back',      title: 'KRYPTONITE',   subtitle: 'Back',                   icon: '⚡', color: '#ffd700' },
  { id: 'shoulders', title: 'GODFRAME',     subtitle: 'Shoulders',              icon: '🏛️', color: '#a855f7' },
  { id: 'abs',       title: 'SUPREMA',      subtitle: 'Core · Abs',             icon: '🗡️', color: '#3b82f6' },
  { id: 'legs',      title: 'WAR ENGINE',   subtitle: 'Legs',                   icon: '⚔️', color: '#c0c0c0' },
]

export const XP_EVENTS = {
  COMPLETE_WORKOUT: 80,
  PERFECT_SESSION: 50,       // all reps hit
  FAILURE_SET: 30,           // pushed to failure
  DIET_COMPLETE: 20,
  SKIP_WORKOUT: -100,
  INCOMPLETE_SESSION: -30,
  SKIP_DIET: -20,
}

export const PUNISHMENT_WORKOUTS = [
  { name: 'Shame Burner', exercises: [
    { name: 'Push-ups', sets: 5, reps: 20 },
    { name: 'Plank Hold', sets: 3, duration: '60 sec' },
    { name: 'Burpees', sets: 4, reps: 15 },
  ]},
  { name: 'The Reckoning', exercises: [
    { name: 'Diamond Push-ups', sets: 4, reps: 15 },
    { name: 'Mountain Climbers', sets: 4, duration: '45 sec' },
    { name: 'Jump Squats', sets: 4, reps: 20 },
    { name: 'Plank to Push-up', sets: 3, reps: 12 },
  ]},
  { name: 'Penalty Protocol', exercises: [
    { name: 'Wide Push-ups', sets: 6, reps: 15 },
    { name: 'Hollow Body Hold', sets: 4, duration: '30 sec' },
    { name: 'Squat Jumps', sets: 5, reps: 15 },
  ]},
]

// ═══════════════════════════════════════════
//  6-DAY WORKOUT SPLIT
// ═══════════════════════════════════════════
export const WORKOUT_PLAN = [
  {
    day: 1,
    name: 'TITAN STRIKE',
    focus: 'Chest + Triceps',
    muscles: ['chest', 'arms'],
    color: '#00f5d4',
    warmup: [
      'Arm circles 2×20',
      'Shoulder rotations 2×15',
      'Push-up to downward dog 2×10',
      'Wrist circles 1×30 sec each direction',
    ],
    exercises: [
      {
        name: 'Barbell Bench Press',
        sets: 4, reps: '8–10',
        weight: 'Start: 30kg → +2.5kg/week when hitting top range',
        muscles: 'Chest, anterior deltoid',
        notes: 'Full ROM, 2 sec lower, explosive push',
      },
      {
        name: 'Dumbbell Incline Press (use bench angle)',
        sets: 3, reps: '10–12',
        weight: 'Start: 10kg each → progressive',
        muscles: 'Upper chest',
        notes: 'Squeeze at top, 45° incline',
      },
      {
        name: 'Dumbbell Flyes',
        sets: 3, reps: '12–15',
        weight: '8–10kg each',
        muscles: 'Chest stretch & contraction',
        notes: 'Slight elbow bend, feel the stretch',
      },
      {
        name: 'Close-Grip Push-ups',
        sets: 3, reps: '15–20',
        weight: 'Bodyweight',
        muscles: 'Triceps, inner chest',
        notes: 'Elbows tight to body',
      },
      {
        name: 'Dumbbell Tricep Overhead Extension',
        sets: 3, reps: '12–15',
        weight: '12–16kg',
        muscles: 'Long head tricep',
        notes: 'Full stretch at bottom',
      },
      {
        name: '⚠️ FAILURE SET — Diamond Push-ups',
        sets: 1, reps: 'MAX REPS TO FAILURE',
        weight: 'Bodyweight',
        muscles: 'Triceps, inner chest',
        notes: 'GO UNTIL YOU CANNOT. Rest 10 sec, push again.',
        isFailureSet: true,
      },
    ],
  },
  {
    day: 2,
    name: 'KRYPTONITE PULL',
    focus: 'Back + Biceps',
    muscles: ['back', 'arms'],
    color: '#ffd700',
    warmup: [
      'Band pull-aparts (or towel) 2×15',
      'Cat-cow stretch 2×10',
      'Scapular push-ups 2×10',
      'Doorframe chest opener 2×30 sec',
    ],
    exercises: [
      {
        name: 'Pull-ups (Wide Grip)',
        sets: 4, reps: '6–10',
        weight: 'Bodyweight → add weight plate via belt/backpack',
        muscles: 'Lats, rhomboids',
        notes: 'Dead hang to chin over bar. Slow negative 3 sec.',
      },
      {
        name: 'Barbell Bent-Over Row',
        sets: 4, reps: '8–10',
        weight: 'Start: 35kg → +2.5kg/week',
        muscles: 'Mid back, lats, rear delt',
        notes: 'Hinge 45°, pull to belly button, retract scapula',
      },
      {
        name: 'Dumbbell Single-Arm Row',
        sets: 3, reps: '10–12 each side',
        weight: '12–16kg',
        muscles: 'Lats, mid back',
        notes: 'Elbow drives back, full range of motion',
      },
      {
        name: 'Chin-ups (Supinated Grip)',
        sets: 3, reps: '6–10',
        weight: 'Bodyweight',
        muscles: 'Biceps, lower lats',
        notes: 'Squeeze biceps at top',
      },
      {
        name: 'Dumbbell Hammer Curls',
        sets: 3, reps: '12–15',
        weight: '10–14kg each',
        muscles: 'Brachialis, brachioradialis',
        notes: 'Alternating, controlled tempo',
      },
      {
        name: '⚠️ FAILURE SET — Pull-ups',
        sets: 1, reps: 'MAX REPS TO FAILURE',
        weight: 'Bodyweight',
        muscles: 'Full back',
        notes: 'Every rep counts. GO.',
        isFailureSet: true,
      },
    ],
  },
  {
    day: 3,
    name: 'GODFRAME SCULPT',
    focus: 'Shoulders + Abs',
    muscles: ['shoulders', 'abs'],
    color: '#a855f7',
    warmup: [
      'Neck rolls 1×10 each direction',
      'Shoulder circles forward/back 2×20',
      'Pike push-up hold at top 2×30 sec',
      'Dead bugs 2×10',
    ],
    exercises: [
      {
        name: 'Dumbbell Overhead Press (Seated)',
        sets: 4, reps: '8–10',
        weight: 'Start: 12kg each → +2kg/2 weeks',
        muscles: 'Front & side delts, upper traps',
        notes: 'Full lockout, squeeze at top',
      },
      {
        name: 'Dumbbell Lateral Raises',
        sets: 4, reps: '15–20',
        weight: '6–10kg each',
        muscles: 'Medial deltoid — KEY for wide shoulders',
        notes: 'Slight lean forward, lead with elbows, NO swinging',
      },
      {
        name: 'Dumbbell Arnold Press',
        sets: 3, reps: '10–12',
        weight: '10–14kg each',
        muscles: 'All 3 deltoid heads',
        notes: 'Full rotation throughout movement',
      },
      {
        name: 'Pike Push-ups (feet elevated)',
        sets: 3, reps: '12–15',
        weight: 'Bodyweight',
        muscles: 'Front delts, triceps',
        notes: 'Feet on chair/bench for increased angle',
      },
      {
        name: 'Hanging Knee Raises',
        sets: 3, reps: '15–20',
        weight: 'Bodyweight on pull-up bar',
        muscles: 'Lower abs, hip flexors',
        notes: 'Controlled, no swinging',
      },
      {
        name: 'Plank Complex',
        sets: 3, reps: '45 sec each',
        weight: 'Bodyweight',
        muscles: 'Full core',
        notes: 'Front plank → side plank L → side plank R back to back',
      },
      {
        name: '⚠️ FAILURE SET — Lateral Raises',
        sets: 1, reps: 'MAX REPS TO FAILURE',
        weight: 'Lightest DB you have',
        muscles: 'Medial delt burnout',
        notes: 'Arms ON FIRE = gains incoming',
        isFailureSet: true,
      },
    ],
  },
  {
    day: 4,
    name: 'ACTIVE RECOVERY',
    focus: 'Rest / Mobility',
    muscles: [],
    color: '#4a4a6a',
    isRest: true,
    warmup: [],
    exercises: [
      {
        name: 'Full Body Stretch Routine',
        sets: 1, reps: '20 min',
        weight: 'None',
        muscles: 'Full body recovery',
        notes: 'Hip flexors, chest, back, shoulders — hold each 30–45 sec',
      },
      {
        name: 'Light Walk or Bodyweight Flow',
        sets: 1, reps: '20–30 min',
        weight: 'Bodyweight',
        muscles: 'Blood flow, active recovery',
        notes: 'No intensity. Purpose = flush out soreness',
      },
    ],
  },
  {
    day: 5,
    name: 'HYBRID ASSAULT',
    focus: 'Upper Body (All Muscles)',
    muscles: ['chest', 'back', 'shoulders', 'arms'],
    color: '#ff4d00',
    warmup: [
      'Jump rope or high knees 3 min',
      'Band pull-aparts 2×15',
      'Arm swings 2×20',
    ],
    exercises: [
      {
        name: 'Barbell Overhead Press (Standing)',
        sets: 4, reps: '6–8',
        weight: 'Start: 25kg → heavy, compound focus',
        muscles: 'Shoulders, upper chest, core stability',
        notes: 'Standing engages full chain. Brace core.',
      },
      {
        name: 'Pull-ups (Close Grip)',
        sets: 3, reps: '8–12',
        weight: 'Bodyweight',
        muscles: 'Lats, biceps',
        notes: 'Vary grip from Day 2',
      },
      {
        name: 'Dumbbell Bench Press',
        sets: 3, reps: '10–12',
        weight: '14–18kg each',
        muscles: 'Chest, better ROM than barbell',
        notes: 'Touch chest at bottom, full squeeze at top',
      },
      {
        name: 'Barbell Curl',
        sets: 3, reps: '10–12',
        weight: '20–25kg',
        muscles: 'Biceps peak',
        notes: 'Strict form, no momentum',
      },
      {
        name: 'Dips (between two chairs)',
        sets: 3, reps: '12–15',
        weight: 'Bodyweight → add DB weight on lap',
        muscles: 'Lower chest, triceps',
        notes: 'Slight forward lean = more chest',
      },
      {
        name: '⚠️ FAILURE SET — Push-up Burnout',
        sets: 3, reps: 'To failure each set',
        weight: 'Bodyweight',
        muscles: 'Full upper body',
        notes: '10 sec rest between. Total war.',
        isFailureSet: true,
      },
    ],
  },
  {
    day: 6,
    name: 'WAR ENGINE',
    focus: 'Lower Body + Abs',
    muscles: ['legs', 'abs'],
    color: '#c0c0c0',
    warmup: [
      'Leg swings front/back 2×20',
      'Hip circles 2×10 each',
      'Bodyweight squats 2×15',
      'Calf raises 2×20',
    ],
    exercises: [
      {
        name: 'Barbell Squat',
        sets: 4, reps: '8–10',
        weight: 'Start: 35kg → +5kg/2 weeks',
        muscles: 'Quads, glutes, hamstrings — full leg development',
        notes: 'Below parallel. Heels flat. Chest up. KING of all lifts.',
      },
      {
        name: 'Dumbbell Romanian Deadlift',
        sets: 3, reps: '10–12',
        weight: '18–22kg each',
        muscles: 'Hamstrings, glutes, lower back',
        notes: 'Push hips back, keep bar close to legs',
      },
      {
        name: 'Dumbbell Bulgarian Split Squat',
        sets: 3, reps: '10–12 each leg',
        weight: '10–14kg each',
        muscles: 'Quads, glutes (unilateral)',
        notes: 'Rear foot elevated. Deep stretch. Hardest leg exercise.',
      },
      {
        name: 'Calf Raises (barbell on shoulders)',
        sets: 4, reps: '20–25',
        weight: '20–30kg barbell',
        muscles: 'Gastrocnemius, soleus',
        notes: 'Full range — heel below step level if possible',
      },
      {
        name: 'Dragon Flag Progression / Hanging Leg Raises',
        sets: 3, reps: '10–15',
        weight: 'Bodyweight',
        muscles: 'Full core, lower abs',
        notes: 'Straight legs = advanced. Bent knees = beginner',
      },
      {
        name: 'Ab Wheel Rollout / Barbell Rollout',
        sets: 3, reps: '8–12',
        weight: 'Bodyweight + barbell',
        muscles: 'Entire core, anti-extension',
        notes: 'On knees first. Full extension = advanced.',
      },
      {
        name: '⚠️ FAILURE SET — Jump Squat Burnout',
        sets: 1, reps: 'MAX REPS TO FAILURE',
        weight: 'Bodyweight',
        muscles: 'Legs, cardiovascular system',
        notes: 'Explosive. Dig deep. War Engine never quits.',
        isFailureSet: true,
      },
    ],
  },
  {
    day: 7,
    name: 'FULL REST',
    focus: 'Recovery',
    muscles: [],
    isRest: true,
    color: '#1e1e2e',
    warmup: [],
    exercises: [
      {
        name: 'Sleep 8 Hours',
        sets: 1, reps: '1',
        weight: 'None',
        muscles: 'Full body hormonal recovery',
        notes: 'Growth happens during rest. This day is MANDATORY.',
      },
    ],
  },
]

// ═══════════════════════════════════════════
//  DIET PLAN — LEAN BULK / BANGLADESH
// ═══════════════════════════════════════════
export const DIET_PLAN = {
  calories: 3000,
  protein: 160,    // grams
  carbs: 380,
  fats: 80,
  meals: [
    {
      id: 'breakfast',
      name: 'BREAKFAST',
      time: '7:00–8:00 AM',
      calories: 650,
      protein: 35,
      icon: '🌅',
      items: [
        { name: '4 whole eggs (scrambled/boiled)', protein: 24, calories: 280 },
        { name: '2 slices bread or 1 cup rice', protein: 6, calories: 200 },
        { name: '1 banana', protein: 1, calories: 90 },
        { name: '1 tbsp peanut butter', protein: 4, calories: 80 },
      ],
      notes: 'Eat within 30 min of waking. This fuels training.',
    },
    {
      id: 'lunch',
      name: 'LUNCH',
      time: '1:00–2:00 PM',
      calories: 900,
      protein: 55,
      icon: '🍗',
      items: [
        { name: '200g chicken breast (boiled/curry)', protein: 46, calories: 330 },
        { name: '2 cups white rice', protein: 8, calories: 400 },
        { name: '1 cup lentils (dal)', protein: 9, calories: 120 },
        { name: 'Vegetables (any)', protein: 2, calories: 50 },
      ],
      notes: 'Biggest meal of the day. Eat this no matter what.',
    },
    {
      id: 'snack',
      name: 'PRE-WORKOUT SNACK',
      time: '4:00–5:00 PM',
      calories: 450,
      protein: 30,
      icon: '⚡',
      items: [
        { name: '3 boiled eggs', protein: 18, calories: 210 },
        { name: '2 bananas', protein: 2, calories: 180 },
        { name: '2 tbsp peanut butter', protein: 8, calories: 190 },
      ],
      notes: 'Eat 45–60 min before training. Fast energy + protein.',
    },
    {
      id: 'dinner',
      name: 'DINNER (POST-WORKOUT)',
      time: '8:00–9:00 PM',
      calories: 750,
      protein: 45,
      icon: '🌙',
      items: [
        { name: '200g fish or chicken', protein: 40, calories: 300 },
        { name: '1.5 cups rice', protein: 6, calories: 300 },
        { name: '1 cup lentils or vegetables', protein: 7, calories: 120 },
        { name: '1 glass whole milk', protein: 8, calories: 150 },
      ],
      notes: 'Post-workout: eat within 90 min. Muscle repair happens tonight.',
    },
  ],
  supplements: [
    'Creatine Monohydrate: 5g/day with water (optional but effective)',
    'Whey Protein: 1 scoop if cannot hit protein target from food',
    'Vitamin D + Zinc: supports testosterone production',
  ],
}

// ═══════════════════════════════════════════
//  PAIN MODE EXERCISES
// ═══════════════════════════════════════════
export const PAIN_MODE_SETS = [
  { name: 'Dropset — Lateral Raises', description: '15kg → 10kg → 6kg no rest', duration: '3 min total' },
  { name: 'Rest-Pause Pull-ups', description: 'Max reps → 10 sec → max reps → 10 sec → max reps', duration: '3 sets' },
  { name: '100-Rep Push-up Challenge', description: 'Complete 100 push-ups in as few sets as possible', duration: 'Max effort' },
  { name: 'Squat Wall Sit', description: 'After squat sets: hold wall sit for 2 minutes', duration: '2 min' },
  { name: 'Barbell Death March', description: 'Barbell on back, step lunges across room × 4 lengths', duration: '4 lengths' },
  { name: 'Plank Drop Sets', description: '60 sec → 45 sec → 30 sec (10 sec rest)', duration: '3 sets' },
]
