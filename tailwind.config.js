/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        slideUp: 'slideUp 0.6s ease-out forwards',
        slideDown: 'slideDown 0.6s ease-out forwards',
        slideRight: 'slideRight 0.6s ease-out forwards',
        slideLeft: 'slideLeft 0.6s ease-out forwards',
        scaleIn: 'scaleIn 0.5s ease-out forwards',
        bounceIn: 'bounceIn 0.6s cubic-bezier(0.68,-0.55,0.265,1.55) forwards',
        shake: 'shake 0.5s ease-in-out',
        float: 'float 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
},

      keyframes: {
        
        bounceIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.8)',
          },
          '60%': {
            opacity: '1',
            transform: 'scale(1.05)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },

        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity:  '0', transform: 'translateY(30px)' },
          '100%': { opacity:  '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity:  '0', transform: 'translateY(-30px)' },
          '100%': { opacity:  '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity:  '0', transform: 'translateX(-30px)' },
          '100%': { opacity:  '1', transform: 'translateX(0)' },
        },
        slideLeft: {
          '0%': { opacity:  '0', transform: 'translateX(30px)' },
          '100%': { opacity:  '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}