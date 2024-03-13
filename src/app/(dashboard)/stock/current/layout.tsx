import type { Metadata } from "next";
import { ReactNode } from "react";

const metadata: Metadata = {
  description: "Business management system",
  title: "Current stock | Bizprofy",
};

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Readonly<Props>) => (
  <div className="flex flex-col gap-5">
    <h1>Current stocks status</h1>

    {children}
  </div>
);

export default DashboardLayout;
export { metadata };
