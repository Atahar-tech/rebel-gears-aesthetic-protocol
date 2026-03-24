import { NavLink } from 'react-router-dom'
import { Home, Dumbbell, Apple, BarChart3, Zap } from 'lucide-react'
import { useGame } from '../hooks/useGame.jsx'

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'HOME' },
  { to: '/workout', icon: Dumbbell, label: 'TRAIN' },
  { to: '/diet', icon: Apple, label: 'DIET' },
  { to: '/progress', icon: BarChart3, label: 'PROGRESS' },
  { to: '/skills', icon: Zap, label: 'SKILLS' },
]

export default function BottomNav() {
  const { state } = useGame()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 nav-safe"
      style={{
        background: 'rgba(13,13,26,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid #1e1e2e',
      }}
    >
      <div className="flex">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-3 gap-1 transition-all duration-200 relative
              ${isActive ? 'text-neon' : 'text-muted hover:text-text'}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                    style={{ background: '#00f5d4', boxShadow: '0 0 8px #00f5d4' }}
                  />
                )}
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="font-mono text-[9px] tracking-widest">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
