import { useGame } from '../hooks/useGame.jsx'
import { MUSCLE_GROUPS, RANKS } from '../data/gameData.js'
import { getRank, getXPProgress } from '../store/gameStore.js'

function RankBadge({ rank }) {
  return (
    <span
      className="font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-widest"
      style={{
        background: rank.color + '22',
        border: `1px solid ${rank.color}44`,
        color: rank.color,
      }}
    >
      {rank.label}
    </span>
  )
}

function SkillCard({ muscle }) {
  const { state } = useGame()
  const muscleState = state.muscles[muscle.id] || { xp: 0 }
  const { percent, current, next, xpInLevel, xpNeeded } = getXPProgress(muscleState.xp)

  const allRanks = RANKS.map((r, i) => ({
    ...r,
    achieved: muscleState.xp >= r.xpRequired,
    current: current.id === r.id,
  }))

  return (
    <div
      className="card p-5 relative overflow-hidden"
      style={{ borderColor: muscle.color + '33' }}
    >
      {/* BG glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${muscle.color}, transparent)`, filter: 'blur(20px)' }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{muscle.icon}</span>
          <div className="flex-1">
            <h2 className="font-display text-2xl tracking-widest" style={{ color: muscle.color }}>
              {muscle.title}
            </h2>
            <p className="font-body text-muted text-sm">{muscle.subtitle}</p>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl" style={{ color: muscle.color }}>
              {muscleState.xp.toLocaleString()}
            </p>
            <p className="font-mono text-[10px] text-muted">XP</p>
          </div>
        </div>

        {/* Current rank */}
        <div className="flex items-center justify-between mb-2">
          <RankBadge rank={current} />
          {next ? (
            <p className="font-mono text-[10px] text-muted">
              {xpInLevel}/{xpNeeded} XP → {next.label}
            </p>
          ) : (
            <p className="font-mono text-[10px] text-mythic">MAX RANK</p>
          )}
        </div>

        {/* XP Bar */}
        <div className="xp-bar-track mb-4">
          <div
            className="xp-bar-fill relative overflow-hidden"
            style={{
              width: `${percent}%`,
              background: `linear-gradient(90deg, ${muscle.color}88, ${muscle.color})`,
            }}
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                animation: 'shimmer 2s linear infinite',
              }}
            />
          </div>
        </div>

        {/* Rank progression */}
        <div>
          <p className="label mb-2">RANK PROGRESSION</p>
          <div className="grid grid-cols-7 gap-1">
            {allRanks.map((r, i) => (
              <div key={i} className="text-center">
                <div
                  className="w-full aspect-square rounded flex items-center justify-center text-[8px] font-mono mb-1 relative"
                  style={{
                    background: r.achieved ? r.color + '22' : '#1e1e2e',
                    border: `1px solid ${r.current ? r.color : r.achieved ? r.color + '44' : '#1e1e2e'}`,
                    boxShadow: r.current ? `0 0 8px ${r.color}66` : 'none',
                  }}
                >
                  {r.achieved ? '✓' : i + 1}
                  {r.current && (
                    <span
                      className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                      style={{ background: r.color, animation: 'pulse 1s ease-in-out infinite' }}
                    />
                  )}
                </div>
                <p
                  className="font-mono text-[7px] leading-tight"
                  style={{ color: r.achieved ? r.color : '#4a4a6a' }}
                >
                  {r.label.split(' ')[0]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* XP required guide */}
        <div className="mt-4 p-3 bg-surface rounded-lg">
          <p className="label mb-2">HOW TO EARN XP</p>
          <div className="space-y-1">
            <p className="font-body text-xs text-muted flex justify-between">
              <span>Complete a workout</span><span className="text-neon">+80 XP</span>
            </p>
            <p className="font-body text-xs text-muted flex justify-between">
              <span>Perfect session (all reps)</span><span className="text-neon">+50 XP</span>
            </p>
            <p className="font-body text-xs text-muted flex justify-between">
              <span>Hit failure set</span><span className="text-neon">+30 XP</span>
            </p>
            <p className="font-body text-xs text-muted flex justify-between">
              <span>Skip workout</span><span className="text-fire">−100 XP</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SkillTree() {
  const { state } = useGame()
  const totalXP = state.totalXP || 0

  return (
    <div className="p-4 space-y-4 animate-slide-up">
      <div className="pt-4">
        <p className="font-mono text-xs text-muted tracking-widest">GAMIFICATION</p>
        <h1 className="font-display text-4xl tracking-widest text-neon">SKILL TREES</h1>
        <p className="font-body text-muted text-sm">Total XP: {totalXP.toLocaleString()} · {state.workoutsCompleted.length} sessions logged</p>
      </div>

      <div className="space-y-4">
        {MUSCLE_GROUPS.map(mg => (
          <SkillCard key={mg.id} muscle={mg} />
        ))}
      </div>

      {/* Overall rank */}
      <div className="mythic-border rounded-xl p-5 text-center">
        <p className="font-mono text-xs text-mythic tracking-widest mb-2">OVERALL PROGRESSION</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-display text-3xl text-mythic">{totalXP.toLocaleString()}</p>
            <p className="label text-[9px]">TOTAL XP</p>
          </div>
          <div>
            <p className="font-display text-3xl text-gold">{state.streak}</p>
            <p className="label text-[9px]">STREAK DAYS</p>
          </div>
        </div>
      </div>

      <div className="h-4" />
    </div>
  )
}
