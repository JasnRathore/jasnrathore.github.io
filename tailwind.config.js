/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./**/*.{html,js}"],
  darkMode: ['selector', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        primarybkg:"hsl(var(--primarybkg) / <alpha-value>)",
        secondarybkg: "hsl(var(--secondarybkg) / <alpha-value>)",
        tertiarybkg: "hsl(var(--tertiarybkg) / <alpha-value>)",
        primarytext:"hsl(var(--primarytext) / <alpha-value>)",
        selector:"hsl(var(--selector) / <alpha-value>)",
        secondarytext:"hsl(var(--secondarytext) / <alpha-value>)",

        teal: "hsl(var(--teal) / <alpha-value>)",
        darkteal: "hsl(var(--darkteal) / <alpha-value>)",
        violet: "hsl(var(--violet) / <alpha-value>)",
        darkviolet: "hsl(var(--darkviolet) / <alpha-value>)",
        sky: "hsl(var(--sky) / <alpha-value>)",
        darksky: "hsl(var(--darksky) / <alpha-value>)",
        rose: "hsl(var(--rose) / <alpha-value>)",
        darkrose: "hsl(var(--darkrose) / <alpha-value>)",
      },
      fontFamily: {
        montserrat:"Montserrat",
      },
      screens: {
        'xxs': '180px', // Custom breakpoint at 180px
        'xs': '360px',  // Custom breakpoint at 360px
      },
      aspectRatio: {
        '2/1': '2 / 1',
      },
      dropShadow: {
        'def': '0 4px 1px rgba(0,0,0,0.3)',
        'deflight': '0 4px 1px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}

