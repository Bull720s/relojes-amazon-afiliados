import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        card: "#FFFFFF",
        ink: "#111111",
        "ink-soft": "#777777",
        line: "#E6E6E6",
        wine: "#111111",
        brass: "#111111",
        "brass-soft": "#F5F5F5",
      },
      fontFamily: {
        serif: ["var(--font-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-mono)", "ui-monospace", "monospace"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
