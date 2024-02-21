"use client";

import { createTheme } from "@mui/material/styles";
import { ralewayVariable } from "./fonts";

const theme = createTheme({
  typography: {
    fontFamily: ralewayVariable?.style?.fontFamily,
  },
});

export { theme };
