import type { Metadata } from "next";

import { STOCK_TYPE_IDS } from "../constants";
import { getStock } from "@/services/stock";
import { StockTypes } from "../interfaces";

const metadata: Metadata = {
  description: "Business management system",
  title: "Opening stock | Bizprofy",
};

const OpenningStock = async () => {
  const stock = await getStock({ stockTypeIds: [STOCK_TYPE_IDS[StockTypes.openingStock]] });

  console.log({
    stock,
  });

  return (
    <div>
      <h1>OpenningStock</h1>
    </div>
  );
};

export default OpenningStock;
export { metadata };
