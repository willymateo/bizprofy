"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { EditWarehousePayload, Warehouse } from "@/services/warehouses/interfaces";
import { WarehouseForm } from "../../components/WarehouseForm";
import { editWarehouseById } from "@/services/warehouses";
import { SessionPayload } from "@/services/interfaces";

const EditWarehouseForm = ({ id, ...props }: Warehouse) => {
  const { data: session } = useSession({ required: true });
  const t = useTranslations();

  const handleSave = (payload: EditWarehousePayload) => editWarehouseById({ id, payload });
  const userSession = session?.user as SessionPayload;
  const isEnableToSave =
    userSession?.entityPermissions?.warehouses?.permissions?.updateWarehouse ?? false;

  return (
    <WarehouseForm
      saveButtonLabel={t("Save warehouse")}
      isEnableToSave={isEnableToSave}
      onSave={handleSave}
      {...props}
    />
  );
};

export { EditWarehouseForm };
