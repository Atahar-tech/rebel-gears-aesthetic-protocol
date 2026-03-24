/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body: ['"Barlow Condensed"', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
      },
      colors: {
        bg: '#0a0a0f',
        surface: '#0f0f1a',
        card: '#13131f',
        border: '#1e1e2e',
        neon: '#00f5d4',
        fire: '#ff4d00',
        gold: '#ffd700',
        silver: '#c0c0c0',
        bronze: '#cd7f32',
        mythic: '#a855f7',
        elite: '#3b82f6',
        muted: '#4a4a6a',
        text: '#e8e8f0',
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.4s ease-out',
        'flicker': 'flicker 3s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-subtle': 'bounceSubtle 1s ease-in-out infinite',
        'glow-fire': 'glowFire 2s ease-in-out infinite',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { boxShadow: '0 0 5px #00f5d4, 0 0 20px #00f5d488' },
          '50%': { boxShadow: '0 0 10px #00f5d4, 0 0 40px #00f5d4cc, 0 0 80px #00f5d444' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
        flicker: {
          '0%, 95%, 100%': { opacity: 1 },
          '96%, 98%': { opacity: 0.3 },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        glowFire: {
          '0%, 100%': { boxShadow: '0 0 5px #ff4d00, 0 0 20px #ff4d0088' },
          '50%': { boxShadow: '0 0 15px #ff4d00, 0 0 50px #ff4d00cc' },
        },
      },
    },
  },
  plugins: [],
}
