import { useState } from 'react'
import { useGame } from '../hooks/useGame.jsx'
import { MUSCLE_GROUPS } from '../data/gameData.js'
import { getRank } from '../store/gameStore.js'
import { TrendingUp, Calendar, Ruler, Scale } from 'lucide-react'

function StatBar({ label, value, max, color }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-mono text-xs text-muted tracking-widest">{label}</span>
        <span className="font-mono text-xs" style={{ color }}>{value}</span>
      </div>
      <div className="xp-bar-track">
        <div className="xp-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

export default function ProgressPage() {
  const { state, updateProfile } = useGame()
  const [showLogForm, setShowLogForm] = useState(false)
  const [logForm, setLogForm] = useState({
    weight: state.profile.weight,
    chest: state.profile.chest,
    waist: state.profile.waist,
    shoulders: state.profile.shoulders,
    bicep: state.profile.bicep,
    thigh: state.profile.thigh,
  })

  const bodyLog = state.bodyLog || []
  const latest = bodyLog[bodyLog.length - 1] || state.profile
  const first = bodyLog[0] || state.profile

  const diff = (key) => {
    const cur = parseFloat(latest[key] || 0)
    const orig = parseFloat(first[key] || 0)
    const d = cur - orig
    return d === 0 ? '—' : (d > 0 ? `+${d.toFixed(1)}` : d.toFixed(1))
  }

  const daysSinceStart = state.startDate
    ? Math.floor((new Date() - new Date(state.startDate)) / (1000 * 60 * 60 * 24))
    : 0

  const handleLog = () => {
    updateProfile(logForm)
    setShowLogForm(false)
  }

  const weeklyTarget = Math.round((daysSinceStart / 7) * 1.5)

  return (
    <div className="p-4 space-y-5 animate-slide-up">
      <div className="pt-4">
        <p className="font-mono text-xs text-muted tracking-widest">TRANSFORMATION</p>
        <h1 className="font-display text-4xl tracking-widest text-neon">PROGRESS LOG</h1>
        <p className="font-body text-muted text-sm">
          Day {daysSinceStart + 1} · {state.workoutsCompleted.length} sessions completed
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card p-4 text-center">
          <Scale size={20} className="text-neon mx-auto mb-2" />
          <p className="font-display text-3xl text-neon">{latest.weight || 65}kg</p>
          <p className="label text-[9px]">CURRENT WEIGHT</p>
          <p className="font-mono text-xs mt-1" style={{ color: diff('weight').startsWith('+') ? '#00f5d4' : diff('weight') === '—' ? '#4a4a6a' : '#ff4d00' }}>
            {diff('weight')} kg since start
          </p>
        </div>
        <div className="card p-4 text-center">
          <Calendar size={20} className="text-fire mx-auto mb-2" />
          <p className="font-display text-3xl text-fire">{state.streak}</p>
          <p className="label text-[9px]">DAY STREAK</p>
          <p className="font-mono text-xs mt-1 text-muted">
            Best: {state.streak} days
          </p>
        </div>
        <div className="card p-4 text-center">
          <TrendingUp size={20} className="text-gold mx-auto mb-2" />
          <p className="font-display text-3xl text-gold">{state.workoutsCompleted.length}</p>
          <p className="label text-[9px]">TOTAL SESSIONS</p>
          <p className="font-mono text-xs mt-1 text-muted">
            Target: {weeklyTarget} by now
          </p>
        </div>
        <div className="card p-4 text-center">
          <Ruler size={20} className="text-mythic mx-auto mb-2" />
          <p className="font-display text-3xl text-mythic">{latest.shoulders || 0}cm</p>
          <p className="label text-[9px]">SHOULDER WIDTH</p>
          <p className="font-mono text-xs mt-1" style={{ color: '#a855f7' }}>
            {diff('shoulders')} cm
          </p>
        </div>
      </div>

      {/* Body measurements */}
      <div className="card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="label">BODY MEASUREMENTS</p>
          <button
            className="font-mono text-[10px] text-neon tracking-widest"
            onClick={() => setShowLogForm(s => !s)}
          >
            {showLogForm ? 'CANCEL' : '+ LOG NOW'}
          </button>
        </div>

        {showLogForm && (
          <div className="space-y-3 pt-2 border-t border-border">
            {[
              { key: 'weight', label: 'WEIGHT (KG)' },
              { key: 'chest', label: 'CHEST (CM)' },
              { key: 'shoulders', label: 'SHOULDERS (CM)' },
              { key: 'waist', label: 'WAIST (CM)' },
              { key: 'bicep', label: 'BICEP (CM)' },
              { key: 'thigh', label: 'THIGH (CM)' },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="label text-[9px] block mb-1">{label}</label>
                <input
                  type="number"
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 font-mono text-sm text-neon outline-none focus:border-neon"
                  value={logForm[key] || ''}
                  onChange={e => setLogForm(f => ({ ...f, [key]: parseFloat(e.target.value) || 0 }))}
                />
              </div>
            ))}
            <button className="btn-primary w-full text-base" onClick={handleLog}>
              SAVE MEASUREMENTS
            </button>
          </div>
        )}

        <div className="space-y-3 pt-1">
          {[
            { key: 'chest', label: 'CHEST', max: 120, color: '#00f5d4' },
            { key: 'shoulders', label: 'SHOULDERS', max: 60, color: '#a855f7' },
            { key: 'waist', label: 'WAIST', max: 100, color: '#ff4d00' },
            { key: 'bicep', label: 'BICEP', max: 50, color: '#ffd700' },
            { key: 'thigh', label: 'THIGH', max: 80, color: '#3b82f6' },
          ].map(({ key, label, max, color }) => (
            <StatBar
              key={key}
              label={label}
              value={`${latest[key] || 0}cm (${diff(key)})`}
              max={max}
              color={color}
            />
          ))}
        </div>
      </div>

      {/* Muscle XP overview */}
      <div className="card p-4 space-y-3">
        <p className="label">SKILL TREE XP OVERVIEW</p>
        {MUSCLE_GROUPS.map(mg => {
          const muscleState = state.muscles[mg.id] || { xp: 0 }
          const rank = getRank(muscleState.xp)
          return (
            <div key={mg.id} className="flex items-center gap-3">
              <span className="text-lg flex-shrink-0">{mg.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-body text-sm text-text">{mg.title}</span>
                  <span className="font-mono text-[10px]" style={{ color: rank.color }}>{rank.label}</span>
                </div>
                <div className="xp-bar-track h-1.5">
                  <div
                    className="xp-bar-fill"
                    style={{
                      width: `${Math.min(100, (muscleState.xp / 3000) * 100)}%`,
                      background: mg.color,
                    }}
                  />
                </div>
              </div>
              <span className="font-mono text-xs text-muted w-14 text-right flex-shrink-0">
                {muscleState.xp} XP
              </span>
            </div>
          )
        })}
      </div>

      {/* Workout history */}
      <div className="card p-4">
        <p className="label mb-3">RECENT SESSIONS</p>
        {state.workoutsCompleted.length === 0 ? (
          <p className="font-body text-muted text-sm text-center py-4">
            No sessions logged yet. Get to work.
          </p>
        ) : (
          <div className="space-y-2">
            {[...state.workoutsCompleted].reverse().slice(0, 10).map((session, i) => {
              const plan = { 1: 'Titan Strike', 2: 'Kryptonite Pull', 3: 'Godframe Sculpt', 4: 'Active Recovery', 5: 'Hybrid Assault', 6: 'War Engine', 7: 'Full Rest' }
              return (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-body text-sm text-text">{plan[session.day] || `Day ${session.day}`}</p>
                    <p className="font-mono text-[10px] text-muted">{session.date}</p>
                  </div>
                  <span className="font-mono text-xs text-neon">+{session.xpEarned} XP</span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* 1 year milestones */}
      <div className="card p-4">
        <p className="label mb-3">1-YEAR MILESTONES</p>
        {[
          { label: '3 Months', target: 'Visible V-taper forming. +5kg muscle.', done: daysSinceStart >= 90 },
          { label: '6 Months', target: 'Clear shoulder-waist ratio. Visible abs.', done: daysSinceStart >= 180 },
          { label: '9 Months', target: 'Elite physique visible. All skills Gold+.', done: daysSinceStart >= 270 },
          { label: '12 Months', target: 'Greek God aesthetic. Mythic in 2+ skills.', done: daysSinceStart >= 365 },
        ].map((m, i) => (
          <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
            <div
              className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
              style={{
                background: m.done ? '#00f5d422' : '#1e1e2e',
                border: `1px solid ${m.done ? '#00f5d4' : '#1e1e2e'}`,
              }}
            >
              {m.done && <span className="text-[10px] text-neon">✓</span>}
            </div>
            <div>
              <p className={`font-display text-base tracking-wider ${m.done ? 'text-neon' : 'text-muted'}`}>
                {m.label}
              </p>
              <p className="font-body text-xs text-muted">{m.target}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-4" />
    </div>
  )
}
