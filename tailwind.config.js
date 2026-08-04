/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./komponen/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        "ink-soft": "#151310",
        "ink-line": "#2E2A22",
        aura: "#D4AF37",
        "aura-soft": "#E8C766",
        pulse: "#FF6B4A",
        mist: "#A69C8C",
        paper: "#F7F4EC",
        go: "#34D399",
        warn: "#FBBF24",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "aura-glow":
          "radial-gradient(circle at 20% 20%, rgba(212,175,55,0.22), transparent 55%), radial-gradient(circle at 80% 0%, rgba(212,175,55,0.10), transparent 45%)",
      },
    },
  },
  plugins: [],
};
