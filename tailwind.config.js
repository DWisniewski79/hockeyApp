/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      // -------------------------------------------------------
      // BRAND COLOURS (Bruins + Retro Fusion)
      // -------------------------------------------------------
      colors: {
        brand: {
          // Core Bruins colours
          black: "#000000",
          gold: "#FFB81C",

          // Neutral greys for backgrounds/cards
          grey: "#1A1A1A",
          greyLight: "#2A2A2A",
          white: "#FFFFFF",

          // Retro/Happys colours from your logo
          retroYellow: "#FFD400",
          magenta: "#D026A1",
          purple: "#8C2AAE",
          teal: "#009FBF",
          tealDark: "#006D84",
        },
      },

      // -------------------------------------------------------
      // ANIMATIONS
      // -------------------------------------------------------
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
