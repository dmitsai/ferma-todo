import type { Config } from "tailwindcss";
import plugin from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "primary":"rgb(var(--primary) / <alpha-value>)",
        "sub":"rgb(var(--sub) / <alpha-value>)",
        "green":"rgb(var(--green) / <alpha-value>)",
        "sub-green":"rgb(var(--sub-green) / <alpha-value>)",
        "red":"rgb(var(--red) / <alpha-value>)",
        "sub-red":"rgb(var(--sub-red) / <alpha-value>)",
        "gray": "rgb(var(--gray) / <alpha-value>)",
        "sub-gray":"rgb(var(--sub-gray) / <alpha-value>)",
        "extra-gray":"rgb(var(--extra-gray) / <alpha-value>)",
        "blue":"rgb(var(--blue) / <alpha-value>)",
        "sub-blue":"rgb(var(--sub-blue) / <alpha-value>)",
      },
      borderRadius: {
        "btn": "var(--btn-border)",
        "card":"var(--card-border)",
      },
      boxShadow: {
        "card": "var(--card-shadow)"
      }
    },
  },
  plugins: [],
} satisfies Config;