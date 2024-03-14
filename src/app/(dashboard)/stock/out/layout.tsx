import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Link from "next/link";

import { CreatableStockTypes } from "../interfaces";

const metadata: Metadata = {
  description: "Business management system",
  title: "Stock out | Bizprofy",
};

interface Props {
  children: ReactNode;
}

const StockInLayout = ({ children }: Readonly<Props>) => (
  <div className="flex flex-col gap-5">
    <div className="flex flex-row gap-5 items-center justify-between">
      <h1>Stock out</h1>

      <Link
        href={`/stock/new?${new URLSearchParams({ type: CreatableStockTypes.stockOut }).toString()}`}
        className="no-underline"
      >
        <Button
          className="rounded-lg normal-case"
          startIcon={<Icon icon="eva:plus-fill" />}
          variant="contained"
        >
          Register new sale
        </Button>
      </Link>
    </div>

    {children}
  </div>
);

export default StockInLayout;
export { metadata };
