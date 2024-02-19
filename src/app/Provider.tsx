"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { Analytics } from "@vercel/analytics/react";

import { reduxStore } from "@/redux/store";
import { theme } from "@/shared/theme";

interface Props {
  children: React.ReactNode;
}

const Provider = ({ children }: Props) => (
  <AppRouterCacheProvider>
    <ThemeProvider theme={theme}>
      <ReduxProvider store={reduxStore}>{children}</ReduxProvider>
    </ThemeProvider>
    <Analytics />
  </AppRouterCacheProvider>
);

export { Provider };
