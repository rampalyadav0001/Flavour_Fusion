/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'white-txt':'#F4F5F7',
        'nav-blue':'#2B4D7D',
        'btn-orange':'#E56335',
        'btn-red':'#CD2435',
        'yellow-light':'#D4AC63',
        
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    
  ],
}

