/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:           '#080810',
        surface:      '#0d0d1b',
        card:         '#111127',
        'card-hover': '#161633',
        border:       '#1c1c38',
        'border-h':   '#2e2e58',
        accent:       '#6366f1',
        'accent-2':   '#8b5cf6',
        primary:      '#f1f5f9',
        muted:        '#94a3b8',
        subtle:       '#64748b',
      },
      boxShadow: {
        glow: '0 0 35px rgba(99,102,241,0.12)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
