/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        surface: '#13131f',
        card: '#1c1c2e',
        'card-hover': '#252540',
        border: '#2a2a45',
        'border-h': '#3d3d66',
        accent: '#a855f7',
        'accent-2': '#ec4899',
        'accent-3': '#3b82f6',
        primary: '#f8fafc',
        muted: '#94a3b8',
        subtle: '#64748b',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        glow: {
          '0%, 100%': { 'box-shadow': '0 0 20px rgba(168, 85, 247, 0.3)' },
          '50%': { 'box-shadow': '0 0 40px rgba(168, 85, 247, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
