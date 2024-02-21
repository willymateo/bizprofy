"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Provider as ReduxProvider } from "react-redux";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { CssBaseline } from "@mui/material";

import { reduxStore } from "@/redux/store";
import { theme } from "@/theme";

interface Props {
  children: React.ReactNode;
}

const Provider = ({ children }: Props) => (
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

export { Provider };
