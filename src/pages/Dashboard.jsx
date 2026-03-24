import { useNavigate } from 'react-router-dom'
import { useGame } from '../hooks/useGame.jsx'
import { WORKOUT_PLAN, MUSCLE_GROUPS } from '../data/gameData.js'
import { getRank, getXPProgress } from '../store/gameStore.js'
import { Flame, Zap, AlertTriangle, ChevronRight, Shield } from 'lucide-react'

function MiniMuscleCard({ muscle }) {
  const { state } = useGame()
  const muscleState = state.muscles[muscle.id]
  const { percent, current } = getXPProgress(muscleState?.xp || 0)

  return (
    <div className="card p-3 flex flex-col gap-2 hover:border-opacity-60 transition-all duration-200">
      <div className="flex items-center gap-2">
        <span className="text-xl">{muscle.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm tracking-widest truncate" style={{ color: muscle.color }}>
            {muscle.title}
          </p>
          <p className="font-mono text-[9px] tracking-widest" style={{ color: current.color }}>
            {current.label}
          </p>
        </div>
      </div>
      <div className="xp-bar-track">
        <div
          className="xp-bar-fill"
          style={{ width: `${percent}%`, background: muscle.color }}
        />
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { state, togglePainMode, getTodayDay } = useGame()
  const navigate = useNavigate()
  const todayDay = getTodayDay()
  const todayPlan = WORKOUT_PLAN[todayDay - 1]
  const today = new Date().toDateString()
  const workoutDoneToday = state.workoutsCompleted.some(w => w.date === today)
  const dietDoneToday = state.dietLog.some(d => d.date === today)

  const daysSinceStart = state.startDate
    ? Math.floor((new Date() - new Date(state.startDate)) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="p-4 space-y-5 animate-slide-up">
      {/* Header */}
      <div className="pt-4">
        <p className="font-mono text-xs text-muted tracking-widest">REBEL GEARS</p>
        <h1 className="font-display text-4xl tracking-widest text-neon">
          {state.profile.name.toUpperCase()}
        </h1>
        <p className="font-body text-muted text-sm">Day {daysSinceStart + 1} of the Aesthetic Protocol</p>
      </div>

      {/* Punishment alert */}
      {state.punishmentPending && (
        <button
          onClick={() => navigate('/punishment')}
          className="w-full fire-border rounded-xl p-4 flex items-center gap-3 animate-glow-fire"
        >
          <AlertTriangle size={24} className="text-fire flex-shrink-0" />
          <div className="flex-1 text-left">
            <p className="font-display text-lg tracking-widest text-fire">DEBT UNPAID</p>
            <p className="font-body text-sm text-muted">Punishment workout pending. Do it now.</p>
          </div>
          <ChevronRight size={18} className="text-fire" />
        </button>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card p-3 text-center">
          <p className="font-mono text-[10px] text-muted tracking-widest mb-1">STREAK</p>
          <p className="font-display text-3xl text-fire">{state.streak}</p>
          <p className="font-mono text-[9px] text-muted">DAYS</p>
        </div>
        <div className="card p-3 text-center">
          <p className="font-mono text-[10px] text-muted tracking-widest mb-1">TOTAL XP</p>
          <p className="font-display text-3xl text-neon">{state.totalXP.toLocaleString()}</p>
          <p className="font-mono text-[9px] text-muted">XP</p>
        </div>
        <div className="card p-3 text-center">
          <p className="font-mono text-[10px] text-muted tracking-widest mb-1">SESSIONS</p>
          <p className="font-display text-3xl text-gold">{state.workoutsCompleted.length}</p>
          <p className="font-mono text-[9px] text-muted">DONE</p>
        </div>
      </div>

      {/* Today's workout */}
      <div
        className="card p-4 relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
        onClick={() => navigate('/workout')}
        style={{ borderColor: todayPlan?.color + '44' }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{ background: `radial-gradient(ellipse at right, ${todayPlan?.color || '#00f5d4'}, transparent)` }}
        />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-mono text-[10px] text-muted tracking-widest">TODAY · DAY {todayDay}</p>
              <h2
                className="font-display text-2xl tracking-widest"
                style={{ color: todayPlan?.color || '#00f5d4' }}
              >
                {todayPlan?.name || 'REST'}
              </h2>
              <p className="font-body text-muted text-sm">{todayPlan?.focus}</p>
            </div>
            <div className="text-right">
              {workoutDoneToday ? (
                <span className="font-mono text-xs text-neon bg-neon/10 px-3 py-1 rounded-full border border-neon/30">
                  ✓ DONE
                </span>
              ) : todayPlan?.isRest ? (
                <span className="font-mono text-xs text-muted bg-border px-3 py-1 rounded-full">
                  REST DAY
                </span>
              ) : (
                <span className="font-mono text-xs text-fire bg-fire/10 px-3 py-1 rounded-full border border-fire/30 animate-pulse">
                  PENDING
                </span>
              )}
            </div>
          </div>

          {!todayPlan?.isRest && (
            <div className="flex flex-wrap gap-2">
              {(todayPlan?.exercises || []).slice(0, 4).map((ex, i) => (
                <span key={i} className="font-mono text-[10px] text-muted bg-surface px-2 py-1 rounded">
                  {ex.name.replace('⚠️ FAILURE SET — ', '⚡ ')}
                </span>
              ))}
              {(todayPlan?.exercises?.length || 0) > 4 && (
                <span className="font-mono text-[10px] text-muted bg-surface px-2 py-1 rounded">
                  +{(todayPlan?.exercises?.length || 0) - 4} more
                </span>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 mt-3">
            <ChevronRight size={16} style={{ color: todayPlan?.color }} />
            <span className="font-body text-sm" style={{ color: todayPlan?.color }}>
              {workoutDoneToday ? 'VIEW SESSION' : 'START TRAINING'}
            </span>
          </div>
        </div>
      </div>

      {/* Checklist row */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`card p-3 ${dietDoneToday ? 'border-neon/30' : ''}`}>
          <p className="font-mono text-[10px] text-muted tracking-widest mb-1">DIET</p>
          <div className="flex items-center gap-2">
            <span className="text-lg">🍗</span>
            <span className={`font-display text-lg tracking-wider ${dietDoneToday ? 'text-neon' : 'text-muted'}`}>
              {dietDoneToday ? 'FUELED' : 'UNFUELED'}
            </span>
          </div>
          <button
            className="mt-2 font-mono text-[10px] text-neon tracking-widest underline"
            onClick={() => navigate('/diet')}
          >
            LOG MEALS →
          </button>
        </div>
        <div className="card p-3">
          <p className="font-mono text-[10px] text-muted tracking-widest mb-1">PAIN MODE</p>
          <div className="flex items-center gap-2">
            <Flame size={18} className={state.painMode ? 'text-fire' : 'text-muted'} />
            <span className={`font-display text-lg tracking-wider ${state.painMode ? 'text-fire' : 'text-muted'}`}>
              {state.painMode ? 'ACTIVE' : 'OFF'}
            </span>
          </div>
          <button
            className="mt-2 font-mono text-[10px] text-fire tracking-widest underline"
            onClick={togglePainMode}
          >
            {state.painMode ? 'DEACTIVATE' : 'ACTIVATE'} →
          </button>
        </div>
      </div>

      {/* Muscle grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="label">SKILL TREES</p>
          <button className="font-mono text-[10px] text-neon tracking-widest" onClick={() => navigate('/skills')}>
            VIEW ALL →
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {MUSCLE_GROUPS.map(mg => (
            <MiniMuscleCard key={mg.id} muscle={mg} />
          ))}
        </div>
      </div>

      {/* Weekly overview */}
      <div>
        <p className="label mb-3">WEEKLY SPLIT</p>
        <div className="card p-3">
          <div className="flex gap-1">
            {WORKOUT_PLAN.map((day, i) => {
              const isToday = (i + 1) === todayDay
              const isDone = state.workoutsCompleted.some(w => {
                const daysAgo = Math.floor((new Date() - new Date(w.date)) / (1000 * 60 * 60 * 24))
                const target = todayDay - 1 - i
                return Math.abs(daysAgo - target) < 1
              })
              return (
                <div
                  key={i}
                  className="flex-1 text-center py-2 rounded"
                  style={{
                    background: isToday ? day.color + '22' : 'transparent',
                    border: isToday ? `1px solid ${day.color}44` : '1px solid transparent',
                  }}
                >
                  <p className="font-mono text-[8px] tracking-widest" style={{ color: isToday ? day.color : '#4a4a6a' }}>
                    D{i + 1}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: isToday ? day.color : '#4a4a6a' }}>
                    {day.isRest ? '💤' : '🔥'}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="h-4" />
    </div>
  )
}
