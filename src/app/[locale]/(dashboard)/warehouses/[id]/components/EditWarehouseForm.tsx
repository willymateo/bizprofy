"use client";

import { useTranslations } from "next-intl";

import { EditWarehousePayload, Warehouse } from "@/services/warehouses/interfaces";
import { WarehouseForm } from "../../components/WarehouseForm";
import { editWarehouseById } from "@/services/warehouses";

const EditWarehouseForm = ({ id, ...props }: Warehouse) => {
  const t = useTranslations();

  const handleSave = (payload: EditWarehousePayload) => editWarehouseById({ id, payload });

  return <WarehouseForm {...props} onSave={handleSave} saveButtonLabel={t("Save warehouse")} />;
};

export { EditWarehouseForm };
