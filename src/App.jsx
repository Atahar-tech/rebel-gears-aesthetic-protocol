import { Routes, Route, Navigate } from 'react-router-dom'
import { useGame } from './hooks/useGame.jsx'
import BottomNav from './components/BottomNav.jsx'
import SetupScreen from './pages/SetupScreen.jsx'
import Dashboard from './pages/Dashboard.jsx'
import WorkoutPage from './pages/WorkoutPage.jsx'
import DietPage from './pages/DietPage.jsx'
import ProgressPage from './pages/ProgressPage.jsx'
import SkillTree from './pages/SkillTree.jsx'
import PunishmentScreen from './pages/PunishmentScreen.jsx'
import PainModeToggle from './components/PainModeToggle.jsx'

export default function App() {
  const { state } = useGame()

  if (!state.profile.setupComplete) {
    return <SetupScreen />
  }

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      {/* Ambient grid background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,245,212,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,245,212,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(0,245,212,0.06) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Pain mode indicator */}
      {state.painMode && (
        <div className="fixed top-0 left-0 right-0 z-50 text-center py-1 font-mono text-xs tracking-widest animate-pulse-neon"
          style={{ background: 'rgba(255,77,0,0.9)', color: '#fff' }}>
          ⚠️ PAIN MODE ACTIVE — NO MERCY
        </div>
      )}

      {/* Punishment banner */}
      {state.punishmentPending && (
        <div className="fixed top-0 left-0 right-0 z-40 text-center py-1 font-mono text-xs tracking-widest"
          style={{ background: 'rgba(255,77,0,0.7)', color: '#fff', marginTop: state.painMode ? 24 : 0 }}>
          💀 PUNISHMENT PENDING — COMPLETE IT NOW
        </div>
      )}

      <main className="flex-1 overflow-auto relative z-10 pb-24" style={{ paddingTop: (state.painMode || state.punishmentPending) ? '28px' : 0 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workout" element={<WorkoutPage />} />
          <Route path="/diet" element={<DietPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/skills" element={<SkillTree />} />
          <Route path="/punishment" element={<PunishmentScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <BottomNav />
    </div>
  )
}
