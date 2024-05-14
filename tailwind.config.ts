import type { Config } from "tailwindcss";

import { APP_ROOT_ID } from "./src/constants";

const config: Config = {
  corePlugins: {
    // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
    preflight: false,
  },
  important: `#${APP_ROOT_ID}`, // Override the default Tailwind CSS important selector.
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [],
};

export default config;
