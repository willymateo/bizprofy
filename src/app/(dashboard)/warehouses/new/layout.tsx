import type { Metadata } from "next";
import { ReactNode } from "react";

import { Return as ReturnButton } from "@/app/components/Buttons/Return";

const metadata: Metadata = {
  description: "Business management system",
  title: "New warehouse | Bizprofy",
};

interface Props {
  children: ReactNode;
}

const NewWarehouseLayout = ({ children }: Readonly<Props>) => (
  <div className="flex flex-col gap-5">
    <div className="flex flex-row gap-5 items-center justify-between">
      <h1>New warehouse</h1>

      <ReturnButton className="w-fit">Cancel</ReturnButton>
    </div>

    {children}
  </div>
);

export default NewWarehouseLayout;
export { metadata };
