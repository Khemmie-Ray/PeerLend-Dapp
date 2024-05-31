/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ubuntu': ["Ubuntu"," sans-serif"]
      },
      colors: {
        'darkGrey': "#0A0D17",
        'text-bg': '#E8F3DB',
        'shadeBlack': "#0A141F",
        'deepBlue': "#14112D",        
        'lightGrey': "#180C2A",
        'purple': "#A604F2",
        'white': "#FFFFFF",
        'ash': "#8E8E8E",
        // 'bg-ash': "#424155",
        'bg-gray': "#281D37",
        'bg-ash': '#E0BB83'
      }
    },
  },
  plugins: [],
}