/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        header: '#2A9D8F',
        body: '#f5ebe0',
        addbtn: '#264653',
        edit: '#e9c46a',
        delete: '#e76f51',
        save: '#6a994e',
      }
    },
  },
  plugins: [],
}