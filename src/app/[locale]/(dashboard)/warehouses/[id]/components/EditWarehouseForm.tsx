"use client";

import { EditWarehousePayload, Warehouse } from "@/services/warehouses/interfaces";
import { WarehouseForm } from "../../components/WarehouseForm";
import { editWarehouseById } from "@/services/warehouses";

const EditWarehouseForm = ({ id, ...props }: Warehouse) => {
  const handleSave = (payload: EditWarehousePayload) => editWarehouseById({ id, payload });

  return <WarehouseForm {...props} onSave={handleSave} saveButtonLabel="Save warehouse" />;
};

export { EditWarehouseForm };
