// ═══════════════════════════════════════════
//  REBEL GEARS — PERSISTENCE STORE
// ═══════════════════════════════════════════

import { RANKS, MUSCLE_GROUPS, XP_EVENTS } from '../data/gameData.js'

const STORAGE_KEY = 'rebel_gears_v1'

const getInitialMuscleState = () => {
  const state = {}
  MUSCLE_GROUPS.forEach(mg => {
    state[mg.id] = { xp: 0, rankIndex: 0 }
  })
  return state
}

export const defaultState = {
  profile: {
    name: '',
    weight: 65,
    chest: 0,
    waist: 0,
    shoulders: 0,
    bicep: 0,
    thigh: 0,
    setupComplete: false,
  },
  muscles: getInitialMuscleState(),
  streak: 0,
  lastWorkoutDate: null,
  todayWorkoutDone: false,
  todayDietDone: false,
  workoutsCompleted: [],   // array of { day, date, xpEarned }
  dietLog: [],             // array of { date, mealsChecked }
  punishmentPending: false,
  punishmentWorkout: null,
  painMode: false,
  bodyLog: [],             // array of { date, weight, measurements }
  totalXP: 0,
  achievements: [],
  startDate: null,
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultState }
    const saved = JSON.parse(raw)
    return { ...defaultState, ...saved }
  } catch {
    return { ...defaultState }
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.error('Failed to save state', e)
  }
}

export function getRank(xp) {
  let rank = RANKS[0]
  for (const r of RANKS) {
    if (xp >= r.xpRequired) rank = r
    else break
  }
  return rank
}

export function getNextRank(xp) {
  for (const r of RANKS) {
    if (xp < r.xpRequired) return r
  }
  return null // maxed out
}

export function getXPProgress(xp) {
  const current = getRank(xp)
  const next = getNextRank(xp)
  if (!next) return { percent: 100, current, next: null, xpInLevel: 0, xpNeeded: 0 }
  const xpInLevel = xp - current.xpRequired
  const xpNeeded = next.xpRequired - current.xpRequired
  return {
    percent: Math.round((xpInLevel / xpNeeded) * 100),
    current,
    next,
    xpInLevel,
    xpNeeded,
  }
}

export function addMuscleXP(state, muscleId, amount) {
  const muscle = state.muscles[muscleId]
  if (!muscle) return state
  const newXP = Math.max(0, muscle.xp + amount)
  const newRankIndex = RANKS.findIndex((_, i, arr) => {
    const next = arr[i + 1]
    if (!next) return true
    return newXP < next.xpRequired
  })
  return {
    ...state,
    muscles: {
      ...state.muscles,
      [muscleId]: { xp: newXP, rankIndex: Math.max(0, newRankIndex) }
    },
    totalXP: Math.max(0, state.totalXP + amount),
  }
}

export function addXPToMuscles(state, muscleIds, amount) {
  let newState = { ...state }
  muscleIds.forEach(id => {
    newState = addMuscleXP(newState, id, amount)
  })
  return newState
}

export function checkAndUpdateStreak(state) {
  const today = new Date().toDateString()
  const last = state.lastWorkoutDate
  if (last === today) return state

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const isConsecutive = last === yesterday.toDateString()

  return {
    ...state,
    streak: isConsecutive ? state.streak + 1 : 1,
    lastWorkoutDate: today,
    todayWorkoutDone: false,
    todayDietDone: false,
  }
}

export function applySkipPenalty(state, muscleIds) {
  let newState = state
  muscleIds.forEach(id => {
    newState = addMuscleXP(newState, id, XP_EVENTS.SKIP_WORKOUT)
  })
  return {
    ...newState,
    streak: 0,
    punishmentPending: true,
    totalXP: Math.max(0, newState.totalXP),
  }
}

export function isTodayWorkoutDone(state) {
  const today = new Date().toDateString()
  return state.workoutsCompleted.some(w => w.date === today)
}

export function isTodayDietDone(state) {
  const today = new Date().toDateString()
  return state.dietLog.some(d => d.date === today)
}
