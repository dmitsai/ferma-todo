import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "primary":"rgb(var(--primary) / <alpha-value>)",
        "sub":"rgb(var(--sub) / <alpha-value>)",
        "green":"rgb(var(--green) / <alpha-value>)",
        "sub-green":"rgb(var(--sub-green) / <alpha-value>)",
        "sub-red":"rgb(var(--sub-red) / <alpha-value>)",
        "gray": "rgb(var(--sub-red) / <alpha-value>)"
      },
    },
  },
  plugins: [],
} satisfies Config;