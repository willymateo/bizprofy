import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import type { Metadata } from "next";
import Link from "next/link";

import { SimpleTable } from "../components/Table/SimpleTable";
import { STOCK_TYPE_IDS } from "../constants";
import { getStock } from "@/services/stock";
import { StockTypes } from "../interfaces";

const metadata: Metadata = {
  description: "Business management system",
  title: "Stock out | Bizprofy",
};

const StockOut = async () => {
  const result = await getStock({ stockTypeIds: [STOCK_TYPE_IDS[StockTypes.stockOut]] });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1>Stock out</h1>

        <Link href="/stock/new" className="no-underline">
          <Button
            className="rounded-lg normal-case"
            startIcon={<Icon icon="eva:plus-fill" />}
            variant="contained"
          >
            Register new sale
          </Button>
        </Link>
      </div>

      <SimpleTable {...result} />
    </div>
  );
};

export default StockOut;
export { metadata };
