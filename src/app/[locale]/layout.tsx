import { ReactNode } from "react";

import { ralewayVariable } from "@/fonts";
import { APP_ROOT_ID } from "@/constants";
import { Providers } from "./Providers";

import "./globals.css";

type Props = {
  children: ReactNode;
  params: Params;
};

type Params = {
  locale: string;
};

const RootLayout = ({ children, params: { locale } }: Readonly<Props>) => (
  <html lang={locale}>
    <body id={APP_ROOT_ID} className={ralewayVariable.className}>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
