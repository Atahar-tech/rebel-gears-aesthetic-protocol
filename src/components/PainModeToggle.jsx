import { useState } from 'react'
import { useGame } from '../hooks/useGame.jsx'
import { Flame } from 'lucide-react'

export default function PainModeToggle() {
  const { state, togglePainMode } = useGame()
  const [showWarning, setShowWarning] = useState(false)

  const handleClick = () => {
    if (!state.painMode) {
      setShowWarning(true)
    } else {
      togglePainMode()
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-widest transition-all duration-200 ${
          state.painMode
            ? 'bg-fire/20 border border-fire/40 text-fire'
            : 'bg-surface border border-border text-muted hover:border-fire/40 hover:text-fire'
        }`}
      >
        <Flame size={14} />
        {state.painMode ? 'PAIN MODE: ON' : 'PAIN MODE'}
      </button>

      {showWarning && (
        <div className="fixed inset-0 z-50 flex items-end p-4 bg-black/70">
          <div className="w-full max-w-md mx-auto card fire-border p-6 space-y-4">
            <div className="text-center">
              <p className="text-4xl mb-2">🔥</p>
              <h2 className="font-display text-2xl text-fire tracking-widest">PAIN MODE WARNING</h2>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-xs text-fire text-center tracking-widest">
                ONLY ACTIVATE IF MENTALLY PREPARED
              </p>
              <p className="font-body text-sm text-muted text-center">
                Pain Mode adds extreme burnout sets, dropsets, and failure training to every session.
                This is not a drill.
              </p>
              <ul className="space-y-1">
                {['Dropsets with zero rest', 'Failure training every session', 'Extra burnout volume', 'No mercy. No excuses.'].map((w, i) => (
                  <li key={i} className="font-body text-sm text-fire flex items-center gap-2">
                    <span>›</span> {w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3">
              <button
                className="flex-1 btn-fire py-3"
                onClick={() => { togglePainMode(); setShowWarning(false) }}
              >
                I'M READY
              </button>
              <button
                className="flex-1 btn-ghost py-3"
                onClick={() => setShowWarning(false)}
              >
                NOT TODAY
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
