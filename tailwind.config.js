/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#006DB6',
          'blue-hover': '#005a96',
          'blue-light': '#E8F4FD',
          navy: '#0A192F',
          'navy-dark': '#060F1E',
          charcoal: '#1E293B',
          ink: '#0F172A',
          muted: '#64748B',
          cream: '#FAF8F5',
          hairline: 'rgba(15, 23, 42, 0.08)',
        }
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'var(--font-poppins)', 'sans-serif'],
        heading: ['var(--font-cormorant)', 'var(--font-roboto-slab)', 'serif'],
        serif: ['var(--font-cormorant)', 'serif'],
        editorial: ['var(--font-cormorant)', 'serif'],
      },
      letterSpacing: {
        widest2: '0.18em',
        luxury: '0.14em',
      },
      transitionTimingFunction: {
        agnes: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
}
