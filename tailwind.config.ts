import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAF8",
        card: "#FFFFFF",
        ink: "#111111",
        "ink-soft": "#6F6F6F",
        line: "#E5E5E5",
        wine: "#8B1D16",
        brass: "#111111",
        "brass-soft": "#F3F3F1",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-worksans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
