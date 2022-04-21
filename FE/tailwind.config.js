module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // fontFamily: {
    //   'roboto': ['roboto', 'sans-serif',],

    // },
    extend: {
      boxShadow: {
        '3xl': '0 4px 10px -15px rgba(0, 0, 0, 0.3)',
      },
      keyframes: {
        toastIn: {
          '0%': {
            transform: 'translateX(20px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          },

        }
      },
      animation: {
        'toast-show': 'toastIn 1s linear',
      },
      minWidth: {
        '400px': '400px',
      },
      width: {
        '500': '500px'
      },
      minHeight: {
        '350': '350px',
        '200': '200px'
      },
      maxWidth: {
        '450': '450px',
      },
      colors: {
        'bg-all': '#F0F2F5',
        'bg-over': '#F3F3F4',
      },
      borderRadius: {
        'crical': '50%',
        'cover': 'max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px'
      }

    },
  },
  plugins: [],
}
