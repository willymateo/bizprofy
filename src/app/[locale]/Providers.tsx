"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { CssBaseline, createTheme } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useMemo } from "react";

import { reduxStore } from "@/redux/store";
import { themeOptions } from "@/theme";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  const memoizedThemeOptions = useMemo(() => themeOptions, []);
  const theme = createTheme(memoizedThemeOptions);

  return (
    <AppRouterCacheProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <SessionProvider>
              <ReduxProvider store={reduxStore}>{children}</ReduxProvider>
            </SessionProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </AppRouterCacheProvider>
  );
};

export { Providers };
