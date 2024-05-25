import { ReactNode } from "react";

import { Navigation } from "./Navigation";
import { Header } from "./Header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Readonly<Props>) => (
  <div className="min-h-screen flex flex-row">
    <Navigation />

    <div className="flex flex-col w-full xl:w-[calc(100%-280px)]">
      <Header />

      <main className="flex flex-col gap-2 h-full mx-6 mb-6 xl:mx-10 xl:mb-10">{children}</main>
    </div>
  </div>
);

export { Layout };
