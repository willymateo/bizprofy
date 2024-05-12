import type { Metadata } from "next";
import { ReactNode } from "react";

import { Navigation } from "./components/Navigation";
import { Header } from "./components/Header";

const metadata: Metadata = {
  description: "Business management system",
  title: "Dashboard | Bizprofy",
};

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Readonly<Props>) => (
  <div className="min-h-screen flex flex-row">
    <Navigation />

    <div className="flex flex-col w-full xl:w-[calc(100%-280px)]">
      <Header />

      <main className="flex flex-col gap-2 h-full mx-6 mb-6 xl:mx-10 xl:mb-10">{children}</main>
    </div>
  </div>
);

export default DashboardLayout;
export { metadata };
