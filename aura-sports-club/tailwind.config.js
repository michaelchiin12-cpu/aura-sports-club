/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B1220",
        "ink-soft": "#121B2E",
        "ink-line": "#1E293B",
        aura: "#6D5EF5",
        "aura-soft": "#8B7FFF",
        pulse: "#FF6B4A",
        mist: "#A8B0C3",
        paper: "#F5F6FA",
        go: "#34D399",
        warn: "#FBBF24",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "aura-glow": "radial-gradient(circle at 20% 20%, rgba(109,94,245,0.35), transparent 55%), radial-gradient(circle at 80% 0%, rgba(255,107,74,0.18), transparent 45%)",
      },
    },
  },
  plugins: [],
};
