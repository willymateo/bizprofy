"use client";

import { ralewayVariable } from "@/fonts";
import { APP_ROOT_ID } from "@/constants";

const GlobalError = () => (
  <html lang="en">
    <body id={APP_ROOT_ID} className={ralewayVariable.className}>
      <div>Error</div>;
    </body>
  </html>
);

export default GlobalError;
