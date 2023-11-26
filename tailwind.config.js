/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#42b5d3",
        secondary: "#fd5b1c",
        tertiary: "#ffd300",
        "primary-dark": "#272727",
        custom: {
          100: "#123456",
          200: "#789ABC",
        },
      },
      fontFamily: {
        sans: ["sans-serif", "Arial", "Helvetica"],
        mono: ["Monospace", "monospace"],
        times: ["Times", "serif"],
        courier: ["Courier", "monospace"],
        verdana: ["Verdana", "sans-serif"],
      },
    },
  },
  plugins: [],
};
