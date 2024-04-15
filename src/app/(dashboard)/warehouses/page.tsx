import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { GetWarehousesPayload } from "@/services/warehouses/interfaces";
import { NoWarehousesFound } from "./components/NoWarehousesFound";
import { WarehouseCard } from "./components/WarehouseCard";
import { getWarehouses } from "@/services/warehouses";
import { Layout } from "./components/Layout";

const metadata: Metadata = {
  description: "Business management system",
  title: "Warehouses | Bizprofy",
};

const PAGE_SIZE = 10;

type Props = {
  searchParams: GetWarehousesPayload;
  params: {};
};

const WarehousesPage = async ({ searchParams: { limit = PAGE_SIZE, offset = 0 } }: Props) => {
  offset = parseInt(offset.toString(), 10);
  limit = parseInt(limit.toString(), 10);

  if (isNaN(offset) || isNaN(limit)) {
    redirect(
      `/warehouses?${new URLSearchParams({
        limit: PAGE_SIZE.toString(),
        offset: "0",
      })}`,
    );
  }

  const { rows = [] } = await getWarehouses({
    offset,
    limit,
  });

  return (
    <Layout>
      {!rows?.length && <NoWarehousesFound />}

      {rows?.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-stretch gap-5">
          {rows?.map(warehouse => <WarehouseCard key={warehouse.id} {...warehouse} />)}
        </div>
      )}
    </Layout>
  );
};

export default WarehousesPage;
export { metadata };
