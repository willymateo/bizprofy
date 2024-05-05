import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@iconify-icon/react";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import dayjs from "dayjs";

import { Warehouse } from "@/services/warehouses/interfaces";
import { ActivationSwitch } from "./ActivationSwitch";
import { TooltipContent } from "./TooltipContent";

const DATE_FORMAT = "DD MMMM YYYY";

const WarehouseCard = async (warehouse: Warehouse) => {
  const t = await getTranslations("warehouses");
  const messages = await getMessages();

  const warehousesMessages = messages?.warehouses as AbstractIntlMessages;

  return (
    <Tooltip title={<TooltipContent {...warehouse} />} arrow followCursor>
      <Card className="flex flex-col gap-5 h-full p-3 justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <Link
              className="font-bold text-black no-underline overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] hover:underline"
              href={`/warehouses/${warehouse?.id}`}
            >
              {warehouse?.name ?? ""}
            </Link>

            <NextIntlClientProvider messages={warehousesMessages}>
              <ActivationSwitch warehouse={warehouse} />
            </NextIntlClientProvider>
          </div>

          {warehouse?.code && (
            <Chip
              icon={<Icon icon="solar:code-scan-line-duotone" className="pl-3" />}
              className="w-fit max-w-full overflow-hidden text-ellipsis"
              color={warehouse?.deletedAt ? "default" : "info"}
              label={warehouse?.code ?? ""}
            />
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-sm">
            {`${t("Created at")}: ${dayjs(warehouse?.createdAt).format(DATE_FORMAT)}`}
          </p>

          {warehouse?.deletedAt ? (
            <p className="text-sm">
              {`${t("Deleted at")}: ${dayjs(warehouse?.deletedAt).format(DATE_FORMAT)}`}
            </p>
          ) : (
            <p className="text-sm">
              {`${t("Last updated at")}: ${dayjs(warehouse?.updatedAt).format(DATE_FORMAT)}`}
            </p>
          )}
        </div>
      </Card>
    </Tooltip>
  );
};

export { WarehouseCard };
