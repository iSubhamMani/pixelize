/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-clr": "var(--primary-clr)",
        "secondary-clr": "var(--secondary-clr)",
        "accent-clr": "var(--accent-clr)",
        "text-clr-1": "var(--text-clr-1)",
        "text-clr-2": "var(--text-clr-2)",
        "text-clr-3": "var(--text-clr-3)",
        "text-clr-4": "var(--text-clr-4)",
        "hover-clr": "var(--hover-clr)",
        "error-clr": "var(--error-clr)",
      },
    },
  },
  plugins: [],
};
