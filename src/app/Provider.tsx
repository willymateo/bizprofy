"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, createTheme } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useMemo } from "react";

import { themeOptions } from "@/shared/theme";
import { reduxStore } from "@/redux/store";

interface Props {
  children: ReactNode;
}

const Provider = ({ children }: Props) => {
  const memoizedThemeOptions = useMemo(() => themeOptions, []);
  const theme = createTheme(memoizedThemeOptions);

  return (
    <AppRouterCacheProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SessionProvider>
            <ReduxProvider store={reduxStore}>{children}</ReduxProvider>
          </SessionProvider>
        </ThemeProvider>
      </StyledEngineProvider>
      <Analytics />
    </AppRouterCacheProvider>
  );
};

export { Provider };
