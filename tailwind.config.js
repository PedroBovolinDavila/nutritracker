/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/*.tsx',
    './src/pages/**/*.tsx',
    './src/components/*.tsx',
    './src/components/**/*.tsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
