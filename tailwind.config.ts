import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core Brand Colors
        copper: '#A35442',
        teal: '#1D414C',
        beige: '#D7CBBF',
        cream: '#F4F3F2',
        straw: '#D1AF8B',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cinzel)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [typography],
}

export default config
