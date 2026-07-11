/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Charcoal machine-housing tones — a neutral, near-black backdrop.
        ink: "#18181B",
        surface: "#232327",
        surface2: "#2D2D32",
        // Copper — the machine-body trim & primary accent.
        brass: {
          DEFAULT: "#C8703E",
          soft: "#E2A06E",
        },
        // Deep teal thread — the secondary accent for badges/highlights.
        thread: "#2F7A6B",
        // Warm cream, like old pattern paper.
        bone: "#F2EEE6",
        mute: "#9B948C",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["'Work Sans'", "sans-serif"],
        tag: ["'Courier Prime'", "monospace"],
      },
      backgroundImage: {
        noise: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px) rotate(var(--tilt, 0deg))" },
          "50%": { transform: "translateY(-18px) rotate(var(--tilt, 0deg))" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.5 },
          "50%": { opacity: 1 },
        },
        stitchDash: {
          "0%": { strokeDashoffset: "24" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        floaty: "floaty 5s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
        stitchDash: "stitchDash 1.2s linear infinite",
      },
    },
  },
  plugins: [],
}
