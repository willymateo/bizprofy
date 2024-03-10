import type { Metadata } from "next";

import { CreatableStockTypes } from "../interfaces";
import { STOCK_TYPE_IDS } from "../constants";
import { ComplexTable } from "./ComplexTable";
import { getStock } from "@/services/stock";

const metadata: Metadata = {
  description: "Business management system",
  title: "Current stock | Bizprofy",
};

const CurrentStock = async () => {
  const stock = await getStock({
    stockTypeIds: [
      STOCK_TYPE_IDS[CreatableStockTypes.stockOut],
      STOCK_TYPE_IDS[CreatableStockTypes.stockIn],
    ],
  });

  return (
    <div className="flex flex-col gap-5">
      <h1>Current stocks status</h1>

      <ComplexTable {...stock} />
    </div>
  );
};

export default CurrentStock;
export { metadata };
