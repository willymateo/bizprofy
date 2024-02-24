import type { Config } from "tailwindcss";

const config: Config = {
  corePlugins: {
    // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
    preflight: false,
  },
  important: "#root", // Override the default Tailwind CSS important selector.
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {} },
  plugins: [],
};

export default config;
