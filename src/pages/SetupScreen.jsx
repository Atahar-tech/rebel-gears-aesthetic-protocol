import { useState } from 'react'
import { useGame } from '../hooks/useGame.jsx'

export default function SetupScreen() {
  const { updateProfile } = useGame()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '',
    weight: 65,
    chest: 0,
    waist: 0,
    shoulders: 0,
    bicep: 0,
    thigh: 0,
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const steps = [
    {
      title: 'IDENTIFY YOURSELF',
      subtitle: 'Soldier, state your name.',
      fields: (
        <div className="space-y-4">
          <div>
            <label className="label block mb-2">CODENAME / REAL NAME</label>
            <input
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-display text-2xl tracking-widest text-neon outline-none focus:border-neon transition-colors"
              placeholder="ENTER NAME"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              autoFocus
            />
          </div>
        </div>
      ),
      canProceed: form.name.trim().length > 0,
    },
    {
      title: 'BASELINE METRICS',
      subtitle: 'Record your starting point. This is where the transformation begins.',
      fields: (
        <div className="space-y-3">
          {[
            { key: 'weight', label: 'BODYWEIGHT (KG)', hint: 'e.g. 65' },
            { key: 'chest', label: 'CHEST CIRCUMFERENCE (CM)', hint: 'e.g. 88' },
            { key: 'shoulders', label: 'SHOULDER WIDTH (CM)', hint: 'e.g. 42' },
            { key: 'waist', label: 'WAIST (CM)', hint: 'e.g. 72' },
            { key: 'bicep', label: 'BICEP (CM)', hint: 'e.g. 30' },
            { key: 'thigh', label: 'THIGH (CM)', hint: 'e.g. 50' },
          ].map(({ key, label, hint }) => (
            <div key={key}>
              <label className="label block mb-1">{label}</label>
              <input
                type="number"
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-mono text-lg text-neon outline-none focus:border-neon transition-colors"
                placeholder={hint}
                value={form[key] || ''}
                onChange={e => set(key, parseFloat(e.target.value) || 0)}
              />
            </div>
          ))}
        </div>
      ),
      canProceed: form.weight > 0,
    },
    {
      title: 'TAKE THE RISK',
      subtitle: 'You are about to enter the Aesthetic Protocol. There is no going back.',
      fields: (
        <div className="text-center space-y-6">
          <div
            className="mx-auto w-32 h-32 rounded-full flex items-center justify-center text-6xl"
            style={{
              background: 'radial-gradient(circle, rgba(0,245,212,0.15), transparent)',
              border: '2px solid #00f5d444',
              animation: 'pulseNeon 2s ease-in-out infinite',
            }}
          >
            ⚔️
          </div>
          <div>
            <p className="font-display text-xl text-neon tracking-widest mb-2">
              WELCOME, {form.name.toUpperCase()}
            </p>
            <p className="font-body text-muted text-base">
              {form.weight}kg. The journey to a Greek God physique starts today.
            </p>
            <p className="font-mono text-xs text-muted mt-3">
              TARGET: V-TAPER · LEAN MUSCLE · 1 YEAR PROTOCOL
            </p>
          </div>
          <div className="neon-border rounded-xl p-4 text-left space-y-2">
            <p className="font-mono text-xs text-neon tracking-widest">PROTOCOL TERMS:</p>
            {[
              'Skip a workout → Pay the punishment debt',
              'Every rep counts → Every skip costs XP',
              'Pain Mode is optional but elite',
              'Results require consistency. No exceptions.',
            ].map((term, i) => (
              <p key={i} className="font-body text-sm text-muted flex items-start gap-2">
                <span className="text-fire mt-0.5">›</span> {term}
              </p>
            ))}
          </div>
        </div>
      ),
      canProceed: true,
    },
  ]

  const current = steps[step]

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1)
    } else {
      updateProfile(form)
    }
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,245,212,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,0.8) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 opacity-10 rounded-full"
          style={{ background: 'radial-gradient(circle, #00f5d4, transparent)', filter: 'blur(60px)' }} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen p-6">
        {/* Header */}
        <div className="text-center pt-8 pb-6">
          <p className="font-mono text-xs text-muted tracking-widest mb-2">REBEL GEARS</p>
          <h1 className="font-display text-5xl tracking-widest text-neon glitch">
            AESTHETIC<br />PROTOCOL
          </h1>
          <div className="flex items-center justify-center gap-2 mt-3">
            {steps.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === step ? 32 : 8,
                  background: i <= step ? '#00f5d4' : '#1e1e2e',
                }}
              />
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 flex flex-col max-w-lg mx-auto w-full">
          <div className="mb-6">
            <h2 className="font-display text-2xl tracking-widest text-text mb-1">{current.title}</h2>
            <p className="font-body text-muted text-base">{current.subtitle}</p>
          </div>

          <div className="flex-1 overflow-auto">
            {current.fields}
          </div>

          <div className="pt-6 pb-4">
            <button
              className="btn-primary w-full"
              onClick={handleNext}
              disabled={!current.canProceed}
            >
              {step < steps.length - 1 ? 'CONTINUE →' : 'INITIATE PROTOCOL'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
