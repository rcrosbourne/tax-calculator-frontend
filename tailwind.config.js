module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        island: ["Island Moments", "cursive"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
