import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { GetWarehousesPayload } from "@/services/warehouses/interfaces";
import { NoWarehousesFound } from "./components/NoWarehousesFound";
import { UnAuthorized } from "../../components/UnAuthorized";
import { WarehouseCard } from "./components/WarehouseCard";
import { getWarehouses } from "@/services/warehouses";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";

const runtime = "edge";

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
  const userSession = await getUserSession();

  const hasAccess = userSession?.entityPermissions?.warehouses?.hasAccess;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

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
export { metadata, runtime };
