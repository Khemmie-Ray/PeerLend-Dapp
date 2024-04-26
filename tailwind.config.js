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
        'lightGrey': "#180C2A",
        'purple': "#A604F2",
        'white': "#FFFFFF",
        'ash': "#8E8E8E",
        'bg-ash': "#424155",
        'bg-gray': "#1E1D34"
      }
    },
  },
  plugins: [],
}