import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'EPU-bg': '#0a0f1a',
        'EPU-primary': '#00d4ff',
        'EPU-secondary': '#c9d6df',
        'EPU-secondary-light': '#8899aa',
      },
    },
  },
  plugins: [],
}

export default config
