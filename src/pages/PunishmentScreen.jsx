import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../hooks/useGame.jsx'
import { CheckCircle, Circle, AlertTriangle } from 'lucide-react'

export default function PunishmentScreen() {
  const { state, completePunishment } = useGame()
  const navigate = useNavigate()
  const [completed, setCompleted] = useState([])
  const [done, setDone] = useState(false)

  const workout = state.punishmentWorkout || {
    name: 'Shame Burner',
    exercises: [
      { name: 'Push-ups', sets: 5, reps: 20 },
      { name: 'Plank Hold', sets: 3, duration: '60 sec' },
      { name: 'Burpees', sets: 4, reps: 15 },
    ]
  }

  const toggle = (i) => {
    setCompleted(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  }

  const allDone = completed.length === workout.exercises.length

  const handleComplete = () => {
    completePunishment()
    setDone(true)
    setTimeout(() => navigate('/'), 2000)
  }

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <p className="text-5xl mb-4">⚡</p>
        <h1 className="font-display text-4xl text-neon tracking-widest mb-2">DEBT CLEARED</h1>
        <p className="font-body text-muted">Debt paid. Don't skip again.</p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-5 animate-slide-up">
      <div className="pt-4">
        {/* Warning header */}
        <div className="fire-border rounded-xl p-4 mb-5 text-center">
          <AlertTriangle size={32} className="text-fire mx-auto mb-2" />
          <p className="font-mono text-xs text-fire tracking-widest mb-1">PUNISHMENT PROTOCOL</p>
          <h1 className="font-display text-3xl text-fire tracking-widest">{workout.name}</h1>
          <p className="font-body text-muted text-sm mt-2">
            You skipped a session. Now pay back what you owe. No exceptions.
          </p>
        </div>
      </div>

      {/* XP debt display */}
      <div className="card p-4 text-center border-fire/30">
        <p className="label mb-2">WHAT YOU LOST BY SKIPPING</p>
        <p className="font-display text-4xl text-fire">−100 XP</p>
        <p className="font-body text-muted text-sm">per muscle group trained</p>
        <p className="font-body text-sm text-muted mt-2">
          Complete this punishment to stop the bleeding. Streak reset to zero.
        </p>
      </div>

      {/* Exercises */}
      <div className="space-y-3">
        <p className="label">PUNISHMENT EXERCISES</p>
        {workout.exercises.map((ex, i) => (
          <button
            key={i}
            className={`w-full card p-4 flex items-center gap-3 text-left transition-all duration-200 ${
              completed.includes(i) ? 'border-neon/30 bg-neon/5' : 'fire-border'
            }`}
            onClick={() => toggle(i)}
          >
            {completed.includes(i)
              ? <CheckCircle size={24} className="text-neon flex-shrink-0" />
              : <Circle size={24} className="text-fire flex-shrink-0" />
            }
            <div className="flex-1">
              <p className={`font-body text-base font-semibold ${completed.includes(i) ? 'text-neon line-through opacity-60' : 'text-fire'}`}>
                {ex.name}
              </p>
              <p className="font-mono text-xs text-muted">
                {ex.sets} sets ×{' '}
                {ex.reps ? `${ex.reps} reps` : ex.duration}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="xp-bar-track">
        <div
          className="xp-bar-fill"
          style={{
            width: `${workout.exercises.length > 0 ? (completed.length / workout.exercises.length) * 100 : 0}%`,
            background: '#ff4d00',
          }}
        />
      </div>
      <p className="font-mono text-xs text-muted text-center">
        {completed.length}/{workout.exercises.length} COMPLETED
      </p>

      {/* CTA */}
      <button
        className="w-full btn-fire"
        disabled={!allDone}
        onClick={handleComplete}
      >
        {allDone ? 'DEBT CLEARED — CONFIRM' : `COMPLETE ALL ${workout.exercises.length} EXERCISES FIRST`}
      </button>

      <p className="font-mono text-[10px] text-muted text-center tracking-widest">
        SKIPPING THE PUNISHMENT ONLY MAKES YOU WEAKER
      </p>

      <div className="h-4" />
    </div>
  )
}
