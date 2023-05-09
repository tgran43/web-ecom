/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",

  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'coffee': '#6F4E37',
        'temptress': '#322626',
        'gray1': '#171717',
        'gray2': '#444444',
        'graytext': '#9CA3A6',
        'red1': '#DA0037',
        'white1': '#EDEDED',
      },
    },
    plugins: [require('flowbite/plugin')],
  }
}
