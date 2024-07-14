"use client";

import { ReactNode } from "react";

import { ralewayVariable } from "@/fonts";
import { APP_ROOT_ID } from "@/constants";

type Props = {
  children: ReactNode;
  params: Params;
};

type Params = {
  locale: string;
};

const GlobalError = ({ params: { locale } }: Readonly<Props>) => (
  <html lang={locale}>
    <body id={APP_ROOT_ID} className={ralewayVariable.className}>
      <div>GlobalError</div>;
    </body>
  </html>
);

export default GlobalError;
