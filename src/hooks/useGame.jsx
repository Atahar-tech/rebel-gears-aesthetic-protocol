import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  loadState, saveState, addXPToMuscles, checkAndUpdateStreak,
  applySkipPenalty, isTodayWorkoutDone, isTodayDietDone,
  getRank, getXPProgress, getNextRank
} from '../store/gameStore.js'
import { XP_EVENTS, WORKOUT_PLAN, PUNISHMENT_WORKOUTS } from '../data/gameData.js'

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [state, setState] = useState(() => {
    const s = loadState()
    return checkAndUpdateStreak(s)
  })

  useEffect(() => {
    saveState(state)
  }, [state])

  const update = useCallback((updater) => {
    setState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
      return next
    })
  }, [])

  // Complete a workout day
  const completeWorkout = useCallback((day, hitFailureSets = false, perfectSession = false) => {
    const plan = WORKOUT_PLAN[day - 1]
    if (!plan) return

    let xp = XP_EVENTS.COMPLETE_WORKOUT
    if (perfectSession) xp += XP_EVENTS.PERFECT_SESSION
    if (hitFailureSets) xp += XP_EVENTS.FAILURE_SET

    const today = new Date().toDateString()
    setState(prev => {
      let next = addXPToMuscles(prev, plan.muscles, xp)
      return {
        ...next,
        todayWorkoutDone: true,
        streak: prev.streak + (prev.lastWorkoutDate !== today ? 1 : 0),
        lastWorkoutDate: today,
        punishmentPending: false,
        workoutsCompleted: [
          ...prev.workoutsCompleted,
          { day, date: today, xpEarned: xp }
        ]
      }
    })
    return xp
  }, [])

  // Skip a workout — triggers punishment
  const skipWorkout = useCallback((day) => {
    const plan = WORKOUT_PLAN[day - 1]
    if (!plan) return
    const punishment = PUNISHMENT_WORKOUTS[Math.floor(Math.random() * PUNISHMENT_WORKOUTS.length)]
    setState(prev => {
      let next = applySkipPenalty(prev, plan.muscles)
      return { ...next, punishmentPending: true, punishmentWorkout: punishment }
    })
  }, [])

  // Complete diet
  const completeDiet = useCallback((mealsChecked) => {
    const today = new Date().toDateString()
    setState(prev => ({
      ...prev,
      todayDietDone: true,
      totalXP: prev.totalXP + XP_EVENTS.DIET_COMPLETE,
      dietLog: [...prev.dietLog, { date: today, mealsChecked }]
    }))
  }, [])

  // Toggle pain mode
  const togglePainMode = useCallback(() => {
    setState(prev => ({ ...prev, painMode: !prev.painMode }))
  }, [])

  // Update profile / body log
  const updateProfile = useCallback((profileData) => {
    const today = new Date().toDateString()
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profileData, setupComplete: true },
      startDate: prev.startDate || today,
      bodyLog: [
        ...prev.bodyLog,
        { date: today, weight: profileData.weight || prev.profile.weight, ...profileData }
      ]
    }))
  }, [])

  // Complete punishment workout
  const completePunishment = useCallback(() => {
    setState(prev => ({ ...prev, punishmentPending: false, punishmentWorkout: null }))
  }, [])

  // Get today's workout day (1–7 cycling)
  const getTodayDay = useCallback(() => {
    const start = state.startDate ? new Date(state.startDate) : new Date()
    const now = new Date()
    const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24))
    return (diff % 7) + 1
  }, [state.startDate])

  // Computed helpers
  const getMuscleRank = useCallback((muscleId) => {
    const muscle = state.muscles[muscleId]
    return getRank(muscle?.xp || 0)
  }, [state.muscles])

  const getMuscleProgress = useCallback((muscleId) => {
    const muscle = state.muscles[muscleId]
    return getXPProgress(muscle?.xp || 0)
  }, [state.muscles])

  const isWorkoutDoneToday = isTodayWorkoutDone(state)
  const isDietDoneToday = isTodayDietDone(state)

  return (
    <GameContext.Provider value={{
      state,
      update,
      completeWorkout,
      skipWorkout,
      completeDiet,
      togglePainMode,
      updateProfile,
      completePunishment,
      getTodayDay,
      getMuscleRank,
      getMuscleProgress,
      isWorkoutDoneToday,
      isDietDoneToday,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside GameProvider')
  return ctx
}
