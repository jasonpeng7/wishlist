import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary_text: "#D3D9D4", 
        slate_gray: "#2E3944",
        dark_gray: "#212A31",
        midnight_blue: "#124E66",
        washed_gray: "#748D92",
        bone: "#D3D9D3",
      },
    },
  },
  plugins: [],
} satisfies Config;
