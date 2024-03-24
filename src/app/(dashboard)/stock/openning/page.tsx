import type { Metadata } from "next";

import { CreatableStockTypes } from "@/services/stock/interfaces";
import { STOCK_TYPE_IDS } from "../constants";
import { getStock } from "@/services/stock";

const metadata: Metadata = {
  description: "Business management system",
  title: "Opening stock | Bizprofy",
};

const OpenningStock = async () => {
  const result = await getStock({
    stockTypeIds: [
      STOCK_TYPE_IDS[CreatableStockTypes.stockOut],
      STOCK_TYPE_IDS[CreatableStockTypes.stockIn],
    ],
  });

  console.log({
    result,
  });

  return (
    <div>
      <h1>OpenningStock</h1>
    </div>
  );
};

export default OpenningStock;
export { metadata };
