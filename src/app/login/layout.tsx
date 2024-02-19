import type { Metadata } from "next";

const metadata: Metadata = {
  description: "Business management system",
  title: "Bizprofy - Login",
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<Props>) => (
  <html lang="en">
    <body id="root">{children}</body>
  </html>
);

export default RootLayout;
export { metadata };
