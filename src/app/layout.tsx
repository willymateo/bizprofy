import { ReactNode } from "react";

import { ralewayVariable } from "@/shared/fonts";
import { APP_ROOT_ID } from "@/shared/constants";
import { Provider } from "./Provider";

import "./globals.css";

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
