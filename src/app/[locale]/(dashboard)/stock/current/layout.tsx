import type { Metadata } from "next";
import { ReactNode } from "react";

import { Layout } from "./components/Layout";

const metadata: Metadata = {
  description: "Business management system",
  title: "Current stock | Bizprofy",
};

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Readonly<Props>) => <Layout>{children}</Layout>;

export default DashboardLayout;
export { metadata };
