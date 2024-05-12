import { ThemeOptions } from "@mui/material/styles";

import { typography } from "./typography";
import { components } from "./components";
import { palette } from "./palette";
import { shadows } from "./shadows";
import { shape } from "./shape";

const themeOptions: ThemeOptions = {
  components,
  typography,
  palette,
  shadows,
  shape,
};

export { themeOptions };
