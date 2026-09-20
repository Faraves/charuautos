/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        charu: {
          bg: "#070a0f",
          card: "#0c121d",
          border: "rgba(0, 242, 254, 0.15)",
          cyan: "#00f2fe",
          amber: "#ffb703",
          crimson: "#ff2a5f",
          emerald: "#38ef7d",
          text: "#f8fafc",
          muted: "#94a3b8"
        }
      }
    },
  },
  plugins: [],
}
