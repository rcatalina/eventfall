import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";
import {
  black,
  brilliantRose,
  eggplant,
  mountbattenPink,
  murrey,
  white,
} from "./app/_theme/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            background: white,
            foreground: black,
            primary: brilliantRose,
            secondary: mountbattenPink,
          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            background: black,
            foreground: white,
            primary: murrey,
            secondary: eggplant,
          }, // dark theme colors
        },
        // ... custom themes
      },
    }),
  ],
};
export default config;
