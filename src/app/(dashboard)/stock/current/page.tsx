import type { Metadata } from "next";

import { STOCK_TYPE_IDS } from "../constants";
import { getStock } from "@/services/stock";
import { StockTypes } from "../interfaces";

const metadata: Metadata = {
  description: "Business management system",
  title: "Current stock | Bizprofy",
};

const CurrentStock = async () => {
  const stock = await getStock({ stockTypeIds: [STOCK_TYPE_IDS[StockTypes.currentStock]] });

  console.log({
    stock,
  });

  return (
    <div>
      <h1>CurrentStock</h1>
    </div>
  );
};

export default CurrentStock;
export { metadata };
