import type { Metadata } from "next";

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
    <body>{children}</body>
  </html>
);

export default RootLayout;
export { metadata };
