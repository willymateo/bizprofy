import type { Metadata } from "next";

import { getWarehouses } from "@/services/warehouses";
import { Layout } from "./components/Layout";
import { Table } from "./components/Table";

const metadata: Metadata = {
  description: "Business management system",
  title: "Stock in | Bizprofy",
};

const StockIn = async () => {
  const { rows: warehouses = [] } =
    (await getWarehouses({
      limit: Number.MAX_SAFE_INTEGER,
      offset: 0,
    })) ?? {};

  return (
    <Layout>
      <div className="flex flex-col gap-20">
        {warehouses?.map(warehouse => <Table warehouse={warehouse} key={warehouse.id} />)}
      </div>
    </Layout>
  );
};

export default StockIn;
export { metadata };
