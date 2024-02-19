import type { Metadata } from "next";

import { ralewayVariable } from "@/shared/fonts";
import { Provider } from "./Provider";

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
    <body id="root" className={ralewayVariable.className}>
      <Provider>{children}</Provider>
    </body>
  </html>
);

export default RootLayout;
export { metadata };
