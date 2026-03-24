import { useState, useEffect } from 'react'
import { useGame } from '../hooks/useGame.jsx'
import { WORKOUT_PLAN, PAIN_MODE_SETS } from '../data/gameData.js'
import { CheckCircle, Circle, ChevronDown, ChevronUp, Zap, SkipForward, AlertTriangle } from 'lucide-react'

function ExerciseCard({ exercise, index, completed, onToggle, painMode }) {
  const [expanded, setExpanded] = useState(false)
  const isFailure = exercise.isFailureSet

  return (
    <div
      className={`card transition-all duration-200 overflow-hidden ${
        completed ? 'border-neon/30 bg-neon/5' : isFailure ? 'fire-border' : ''
      }`}
    >
      <div
        className="p-4 flex items-center gap-3 cursor-pointer"
        onClick={() => setExpanded(e => !e)}
      >
        <button
          className="flex-shrink-0"
          onClick={e => { e.stopPropagation(); onToggle(index) }}
        >
          {completed
            ? <CheckCircle size={24} className="text-neon" />
            : <Circle size={24} className={isFailure ? 'text-fire' : 'text-muted'} />
          }
        </button>

        <div className="flex-1 min-w-0">
          <p className={`font-body text-base font-semibold leading-tight ${
            isFailure ? 'text-fire' : completed ? 'text-neon' : 'text-text'
          }`}>
            {exercise.name}
          </p>
          <p className="font-mono text-xs text-muted mt-0.5">
            {exercise.sets} sets × {exercise.reps}
            {exercise.weight && exercise.weight !== 'Bodyweight' && ` · ${exercise.weight.split('→')[0].trim()}`}
          </p>
        </div>

        {expanded ? <ChevronUp size={16} className="text-muted flex-shrink-0" /> : <ChevronDown size={16} className="text-muted flex-shrink-0" />}
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-2 border-t border-border pt-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="label text-[9px] mb-1">WEIGHT</p>
              <p className="font-body text-sm text-text">{exercise.weight}</p>
            </div>
            <div>
              <p className="label text-[9px] mb-1">TARGETS</p>
              <p className="font-body text-sm text-text">{exercise.muscles}</p>
            </div>
          </div>
          <div>
            <p className="label text-[9px] mb-1">FORM CUE</p>
            <p className="font-body text-sm text-muted">{exercise.notes}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function WorkoutPage() {
  const { state, completeWorkout, skipWorkout, getTodayDay } = useGame()
  const todayDay = getTodayDay()
  const [selectedDay, setSelectedDay] = useState(todayDay)
  const plan = WORKOUT_PLAN[selectedDay - 1]

  const [completed, setCompleted] = useState([])
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionFinished, setSessionFinished] = useState(false)
  const [xpEarned, setXpEarned] = useState(0)
  const [showSkipConfirm, setShowSkipConfirm] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [elapsed, setElapsed] = useState(0)

  const today = new Date().toDateString()
  const alreadyDone = state.workoutsCompleted.some(w => w.date === today && w.day === selectedDay)

  useEffect(() => {
    setCompleted([])
    setSessionStarted(false)
    setSessionFinished(false)
    setXpEarned(0)
  }, [selectedDay])

  useEffect(() => {
    if (!sessionStarted || sessionFinished) return
    const iv = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000)
    return () => clearInterval(iv)
  }, [sessionStarted, sessionFinished, startTime])

  const toggle = (i) => {
    setCompleted(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    )
  }

  const exercises = plan?.exercises || []
  const allDone = exercises.length > 0 && completed.length === exercises.length
  const hitFailure = completed.some(i => exercises[i]?.isFailureSet)
  const perfect = completed.length === exercises.length

  const handleStart = () => {
    setSessionStarted(true)
    setStartTime(Date.now())
  }

  const handleFinish = () => {
    const xp = completeWorkout(selectedDay, hitFailure, perfect)
    setXpEarned(xp)
    setSessionFinished(true)
  }

  const handleSkip = () => {
    skipWorkout(selectedDay)
    setShowSkipConfirm(false)
  }

  const fmtTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  if (sessionFinished) {
    return (
      <div className="p-4 min-h-screen flex flex-col items-center justify-center text-center animate-slide-up">
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center text-5xl mb-6"
          style={{
            background: 'radial-gradient(circle, rgba(0,245,212,0.2), transparent)',
            border: '2px solid #00f5d444',
          }}
        >
          ⚡
        </div>
        <p className="font-mono text-xs text-muted tracking-widest mb-2">SESSION COMPLETE</p>
        <h1 className="font-display text-5xl text-neon tracking-widest mb-2">{plan.name}</h1>
        <p className="font-body text-muted mb-6">{fmtTime(elapsed)} · {completed.length}/{exercises.length} exercises</p>

        <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-xs">
          <div className="card p-3 text-center">
            <p className="font-display text-2xl text-fire">+{xpEarned}</p>
            <p className="label text-[9px]">XP</p>
          </div>
          <div className="card p-3 text-center">
            <p className="font-display text-2xl text-gold">{hitFailure ? '✓' : '—'}</p>
            <p className="label text-[9px]">FAILURE</p>
          </div>
          <div className="card p-3 text-center">
            <p className="font-display text-2xl text-neon">{perfect ? '✓' : '—'}</p>
            <p className="label text-[9px]">PERFECT</p>
          </div>
        </div>

        <p className="font-body text-muted text-sm max-w-xs">
          {hitFailure && perfect
            ? 'Elite performance. Your body is changing right now.'
            : hitFailure
            ? 'Failure set hit. That\'s where real growth lives.'
            : perfect
            ? 'Clean session. Add pain mode next time.'
            : 'Good work. Push harder next session.'}
        </p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4 animate-slide-up">
      {/* Header */}
      <div className="pt-4">
        <p className="font-mono text-xs text-muted tracking-widest">TRAINING SESSION</p>
        <h1 className="font-display text-3xl tracking-widest" style={{ color: plan?.color || '#00f5d4' }}>
          {plan?.name}
        </h1>
        <p className="font-body text-muted text-sm">{plan?.focus}</p>
      </div>

      {/* Day selector */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {WORKOUT_PLAN.map((d, i) => (
          <button
            key={i}
            onClick={() => setSelectedDay(i + 1)}
            className="flex-shrink-0 px-3 py-2 rounded-lg font-mono text-[10px] tracking-widest transition-all duration-200"
            style={{
              background: selectedDay === i + 1 ? d.color + '22' : '#13131f',
              border: `1px solid ${selectedDay === i + 1 ? d.color + '66' : '#1e1e2e'}`,
              color: selectedDay === i + 1 ? d.color : '#4a4a6a',
            }}
          >
            D{i + 1}
          </button>
        ))}
      </div>

      {/* Pain mode exercises */}
      {state.painMode && !plan?.isRest && (
        <div className="fire-border rounded-xl p-3">
          <p className="font-mono text-xs text-fire tracking-widest mb-2">⚠️ PAIN MODE ADDITIONS</p>
          {PAIN_MODE_SETS.slice(0, 2).map((s, i) => (
            <div key={i} className="mb-1">
              <p className="font-body text-sm text-fire font-semibold">{s.name}</p>
              <p className="font-body text-xs text-muted">{s.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Warmup */}
      {plan?.warmup?.length > 0 && (
        <div className="card p-3">
          <p className="label mb-2">WARM-UP</p>
          {plan.warmup.map((w, i) => (
            <p key={i} className="font-body text-sm text-muted flex items-center gap-2">
              <span className="text-neon">›</span> {w}
            </p>
          ))}
        </div>
      )}

      {/* Timer */}
      {sessionStarted && (
        <div className="card p-3 flex items-center justify-between">
          <p className="label">SESSION TIME</p>
          <p className="font-mono text-xl text-neon">{fmtTime(elapsed)}</p>
        </div>
      )}

      {/* Exercises */}
      {!plan?.isRest ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="label">EXERCISES</p>
            <p className="font-mono text-xs text-muted">{completed.length}/{exercises.length} DONE</p>
          </div>

          {/* XP bar */}
          <div className="xp-bar-track">
            <div
              className="xp-bar-fill"
              style={{
                width: `${exercises.length > 0 ? (completed.length / exercises.length) * 100 : 0}%`,
                background: plan?.color || '#00f5d4',
              }}
            />
          </div>

          {exercises.map((ex, i) => (
            <ExerciseCard
              key={i}
              exercise={ex}
              index={i}
              completed={completed.includes(i)}
              onToggle={toggle}
              painMode={state.painMode}
            />
          ))}
        </div>
      ) : (
        <div className="card p-6 text-center">
          <p className="text-5xl mb-4">💤</p>
          <p className="font-display text-2xl text-muted tracking-widest">RECOVERY DAY</p>
          <p className="font-body text-muted mt-2 text-sm">
            {plan.exercises[0]?.notes || 'Rest. Recover. Grow.'}
          </p>
        </div>
      )}

      {/* CTA */}
      {!plan?.isRest && !alreadyDone && (
        <div className="space-y-3 pt-2">
          {!sessionStarted ? (
            <button className="btn-primary w-full" onClick={handleStart}>
              START SESSION
            </button>
          ) : (
            <button
              className="btn-primary w-full"
              onClick={handleFinish}
              disabled={completed.length === 0}
            >
              {allDone ? '⚡ COMPLETE SESSION' : `FINISH (${completed.length}/${exercises.length})`}
            </button>
          )}

          {!showSkipConfirm ? (
            <button
              className="w-full font-mono text-xs text-muted tracking-widest py-2 hover:text-fire transition-colors"
              onClick={() => setShowSkipConfirm(true)}
            >
              SKIP SESSION (WILL INCUR PENALTY)
            </button>
          ) : (
            <div className="card p-4 border-fire/40 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-fire" />
                <p className="font-display text-lg text-fire tracking-wider">CONFIRM SKIP?</p>
              </div>
              <p className="font-body text-sm text-muted">
                You will lose 100 XP per muscle group trained and receive a punishment workout tomorrow.
              </p>
              <div className="flex gap-3">
                <button className="flex-1 btn-fire py-2 text-base" onClick={handleSkip}>
                  SKIP (PAY THE DEBT)
                </button>
                <button className="flex-1 btn-ghost py-2 text-base" onClick={() => setShowSkipConfirm(false)}>
                  CANCEL
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {alreadyDone && (
        <div className="card p-4 border-neon/30 text-center">
          <p className="font-display text-xl text-neon tracking-widest">SESSION COMPLETE ✓</p>
          <p className="font-body text-muted text-sm mt-1">Recovery in progress. See you tomorrow.</p>
        </div>
      )}

      <div className="h-4" />
    </div>
  )
}
