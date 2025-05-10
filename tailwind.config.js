/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px',  // Yeni border genişliği ekliyoruz
      },
      minWidth: {
        
        '100': '964px' ,
        'userinfocard' : '458px',
      },

      maxHeight: {
        'userinfocard' : '832px'  ,
      },
      
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'up': '1000px', 
    }
    
  },
  plugins: [],

  
}
