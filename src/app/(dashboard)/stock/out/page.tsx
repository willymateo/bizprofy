import type { Metadata } from "next";

import { STOCK_TYPE_IDS } from "../constants";
import { getStock } from "@/services/stock";
import { StockTypes } from "../interfaces";

const metadata: Metadata = {
  description: "Business management system",
  title: "Stock out | Bizprofy",
};

const StockOut = async () => {
  const stock = await getStock({ stockTypeIds: [STOCK_TYPE_IDS[StockTypes.stockOut]] });

  console.log({
    stock,
  });

  return (
    <div>
      <h1>StockOut</h1>
    </div>
  );
};

export default StockOut;
export { metadata };
