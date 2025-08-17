/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "400px",
      md: "500px",
      lg: "600px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: "#1E40AF", // Custom primary color
        secondary: "#9333EA", // Custom secondary color
        accent: "#F59E0B", // Custom accent color
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#374151",
            a: {
              color: "#1E40AF",
              '&:hover': {
                color: "#9333EA",
              },
            },
          },
        },
      },
      clipPath: {
        polygon:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Custom polygon shape
      },
      animation: {
        fadeouttopright: "fade-out-top-right 1s ease-in-out 0.25s 1",
        bounce: "bounce 2s infinite", // New bounce animation
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
