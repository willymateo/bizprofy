import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

import { ralewayVariable } from "@/shared/fonts";
import { theme } from "@/shared/theme";

import "./globals.css";

const metadata: Metadata = {
  description: "Business management system",
  title: "Bizprofy",
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<Props>) => (
  <html lang="en">
    <body className={ralewayVariable.className}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
        <Analytics />
      </AppRouterCacheProvider>
    </body>
  </html>
);

export default RootLayout;
export { metadata };
