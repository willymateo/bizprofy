import type { Metadata } from "next";
import { ReactNode } from "react";

import { Return as ReturnButton } from "@/app/components/Buttons/Return";

const metadata: Metadata = {
  description: "Business management system",
  title: "New stock out | Bizprofy",
};
interface Props {
  children: ReactNode;
}

const NewStockOutLayout = ({ children }: Readonly<Props>) => (
  <div className="flex flex-col gap-5">
    <div className="flex flex-row gap-5 items-center justify-between">
      <h1>New sale</h1>

      <ReturnButton className="w-fit">Cancel</ReturnButton>
    </div>

    {children}
  </div>
);

export default NewStockOutLayout;
export { metadata };
