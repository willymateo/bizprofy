import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import type { Metadata } from "next";
import Link from "next/link";

import { SimpleTable } from "../components/Table/SimpleTable";
import { CreatableStockTypes } from "../interfaces";
import { STOCK_TYPE_IDS } from "../constants";
import { COLUMNS_TO_SHOW } from "./constants";
import { getStock } from "@/services/stock";

const metadata: Metadata = {
  description: "Business management system",
  title: "Stock in | Bizprofy",
};

const StockIn = async () => {
  const result = await getStock({ stockTypeIds: [STOCK_TYPE_IDS[CreatableStockTypes.stockIn]] });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1>Stock in</h1>

        <Link
          href={`/stock/new?${new URLSearchParams({ type: CreatableStockTypes.stockIn }).toString()}`}
          className="no-underline"
        >
          <Button
            className="rounded-lg normal-case"
            startIcon={<Icon icon="eva:plus-fill" />}
            variant="contained"
          >
            Register new purchase
          </Button>
        </Link>
      </div>

      <SimpleTable {...result} columns={COLUMNS_TO_SHOW} />
    </div>
  );
};

export default StockIn;
export { metadata };
