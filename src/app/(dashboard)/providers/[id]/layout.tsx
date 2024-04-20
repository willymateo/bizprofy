import type { Metadata } from "next";
import { ReactNode } from "react";

import { Layout } from "./components/Layout";

const metadata: Metadata = {
  description: "Business management system",
  title: "Edit Provider | Bizprofy",
};

type Props = {
  children: ReactNode;
  params: Params;
};

type Params = {
  id: string;
};

const ProviderLayout = ({ params, children }: Readonly<Props>) => (
  <Layout params={params}>{children}</Layout>
);

export default ProviderLayout;
export { metadata };
