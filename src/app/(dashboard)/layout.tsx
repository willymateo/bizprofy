import type { Metadata } from "next";
import { ReactNode } from "react";

import { Navigation } from "./components/Navigation";
import { Header } from "./components/Header";

const metadata: Metadata = {
  description: "Business management system",
  title: "Dashboard | Bizprofy",
};

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Readonly<Props>) => (
  <div className="min-h-screen flex flex-row">
    <Navigation />

    <div className="flex flex-col w-full">
      <Header />

      <main className="flex flex-col gap-2 h-full mx-6 xl:mx-10">{children}</main>
    </div>
  </div>
);

export default RootLayout;
export { metadata };
