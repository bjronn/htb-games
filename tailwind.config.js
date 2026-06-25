/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        void: '#0a0a12',
        panel: '#13131f',
        edge: '#23233a',
        neon: '#00f0c0',
        plasma: '#ff3d81',
        amber: '#ffb800',
        violet: '#9d6bff',
        muted: '#7a7a95',
      },
      boxShadow: {
        glow: '0 0 24px -4px var(--tw-shadow-color)',
      },
      keyframes: {
        flicker: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.82' } },
        rise: { '0%': { transform: 'translateY(12px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
      animation: {
        flicker: 'flicker 3s ease-in-out infinite',
        rise: 'rise 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
