import type { Metadata } from "next";

import { ralewayVariable } from "@/shared/fonts";
import { APP_ROOT_ID } from "@/shared/constants";
import { Provider } from "./Provider";
import { ReactNode } from "react";

import "./globals.css";

const metadata: Metadata = {
  description: "Business management system",
  title: "Dashboard | Bizprofy",
};

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Readonly<Props>) => (
  <html lang="en">
    <body id={APP_ROOT_ID} className={ralewayVariable.className}>
      <Provider>{children}</Provider>
    </body>
  </html>
);

export default RootLayout;
export { metadata };
