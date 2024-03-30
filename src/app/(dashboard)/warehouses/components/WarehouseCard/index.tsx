import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import dayjs from "dayjs";

import { Warehouse } from "@/services/warehouses/interfaces";
import { TooltipContent } from "./TooltipContent";

const DATE_FORMAT = "DD MMMM YYYY";

const WarehouseCard = (warehouse: Warehouse) => (
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

          <Switch checked={!warehouse?.deletedAt} />
        </div>

        {warehouse?.code && (
          <Chip
            className="w-fit max-w-full overflow-hidden text-ellipsis"
            color="info"
            label={warehouse?.code}
          />
        )}
      </div>

      <div className="flex flex-col">
        <p className="text-sm">Created at: {dayjs(warehouse?.createdAt).format(DATE_FORMAT)}</p>

        {warehouse?.deletedAt ? (
          <p className="text-sm">Deleted at: {dayjs(warehouse?.deletedAt).format(DATE_FORMAT)}</p>
        ) : (
          <p className="text-sm">
            Last updated at: {dayjs(warehouse?.updatedAt).format(DATE_FORMAT)}
          </p>
        )}
      </div>
    </Card>
  </Tooltip>
);

export { WarehouseCard };
