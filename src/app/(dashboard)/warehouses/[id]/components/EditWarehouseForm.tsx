"use client";

import { EditWarehousePayload, Warehouse } from "@/services/warehouses/interfaces";
import { WarehouseForm } from "../../components/WarehouseForm";
import { editWarehouse } from "@/services/warehouses";

const EditWarehouseForm = ({ id, ...props }: Warehouse) => {
  const handleSave = (payload: EditWarehousePayload) => editWarehouse({ id, payload });

  return <WarehouseForm {...props} onSave={handleSave} saveButtonLabel="Save warehouse" />;
};

export { EditWarehouseForm };
