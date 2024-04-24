import { getWarehouses } from "@/services/warehouses";
import { Table } from "./components/Table";

const CurrentStock = async () => {
  const { rows: warehouses = [] } =
    (await getWarehouses({
      limit: Number.MAX_SAFE_INTEGER,
      offset: 0,
    })) ?? {};

  return (
    <div className="flex flex-col gap-20">
      {warehouses?.map(warehouse => <Table warehouse={warehouse} key={warehouse.id} />)}
    </div>
  );
};

export default CurrentStock;
