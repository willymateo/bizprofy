import { PaletteOptions, alpha } from "@mui/material/styles";

const grey = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
};

const primary = {
  lighter: "#D0ECFE",
  light: "#73BAFB",
  main: "#1877F2",
  dark: "#0C44AE",
  darker: "#042174",
  contrastText: "#FFFFFF",
};

const secondary = {
  lighter: "#EFD6FF",
  light: "#C684FF",
  main: "#8E33FF",
  dark: "#5119B7",
  darker: "#27097A",
  contrastText: "#FFFFFF",
};

const info = {
  lighter: "#CAFDF5",
  light: "#61F3F3",
  main: "#00B8D9",
  dark: "#006C9C",
  darker: "#003768",
  contrastText: "#FFFFFF",
};

const success = {
  lighter: "#C8FAD6",
  light: "#5BE49B",
  main: "#00A76F",
  dark: "#007867",
  darker: "#004B50",
  contrastText: "#FFFFFF",
};

const warning = {
  lighter: "#FFF5CC",
  light: "#FFD666",
  main: "#FFAB00",
  dark: "#B76E00",
  darker: "#7A4100",
  contrastText: grey[800],
};

const error = {
  lighter: "#FFE9D5",
  light: "#FFAC82",
  main: "#FF5630",
  dark: "#B71D18",
  darker: "#7A0916",
  contrastText: "#FFFFFF",
};

const common = {
  black: "#000000",
  white: "#FFFFFF",
};

const action = {
  hover: alpha(grey[500], 0.08),
  selected: alpha(grey[500], 0.16),
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[500], 0.24),
  focus: alpha(grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

const text = {
  primary: grey[800],
  secondary: grey[600],
  disabled: grey[500],
};

const background = {
  paper: "#FFFFFF",
  default: grey[100],
};

const palette: PaletteOptions = {
  primary,
  secondary,
  error,
  warning,
  info,
  success,
  mode: "light",
  common,
  grey,
  text,
  divider: alpha(grey[500], 0.2),
  action: {
    ...action,
    active: grey[600],
  },
  background,
};

export {
  background,
  secondary,
  palette,
  primary,
  success,
  warning,
  common,
  action,
  error,
  text,
  grey,
  info,
};
