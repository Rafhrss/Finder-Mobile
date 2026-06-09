/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["PlusJakartaSans-Regular", "sans-serif"],
        medium: ["PlusJakartaSans-Medium", "sans-serif"],
        semibold: ["PlusJakartaSans-SemiBold", "sans-serif"],
        bold: ["PlusJakartaSans-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
