module.exports = {
  mode: 'jit',
  darkMode: 'class',
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        c_1564C0: '#1564C0',
        c_2A7BD9: '#2A7BD9',
        dark_18e9d9: '#18e9d9',
      }
    },
  },
  plugins: [],
}
