/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        popup: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
          },
        },
        keyframes: {
          slideInFromBottom: {
            '0%': { transform: 'translateY(100%)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
        },
      },
      animation: {
        slideInFromLeft: 'slideInFromLeft 1s ease-out forwards',
        popup: 'popup 0.5s ease-out forwards',
        meteoreffect: "meteor 0.5s linear infinite",
        slideInFromBottom: 'slideInFromBottom 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
