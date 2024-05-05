"use client";

import { APP_ROOT_ID } from "@/shared/constants";
import { ralewayVariable } from "@/shared/fonts";

const GlobalError = () => (
  <html lang="en">
    <body id={APP_ROOT_ID} className={ralewayVariable.className}>
      <div>Error</div>;
    </body>
  </html>
);

export default GlobalError;
