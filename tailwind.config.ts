import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          900: "#111111",
          800: "#1a1a1a",
          700: "#262626",
          950: "#0a0a0a",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

export default config;
