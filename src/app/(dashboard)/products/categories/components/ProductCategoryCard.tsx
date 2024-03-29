import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import Link from "next/link";
import dayjs from "dayjs";

import { ProductCategory } from "@/services/products/interfaces";

const DATE_FORMAT = "DD MMMM YYYY";

const ProductCategoryCard = ({
  name = "",
  id = "",
  createdAt,
  updatedAt,
  deletedAt,
}: ProductCategory) => (
  <Tooltip title={name} placement="top" arrow>
    <Card className="flex flex-col gap-5 h-full p-3">
      <div className="flex flex-row justify-between items-center">
        <Link
          className="font-bold text-black no-underline overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] hover:underline"
          href={`/products/${id}`}
        >
          {name}
        </Link>

        <Switch checked={!deletedAt} />
      </div>

      <p className="text-sm">Created at: {dayjs(createdAt).format(DATE_FORMAT)}</p>

      {deletedAt ? (
        <p className="text-sm">Deleted at: {dayjs(deletedAt).format(DATE_FORMAT)}</p>
      ) : (
        <p className="text-sm">Last updated at: {dayjs(updatedAt).format(DATE_FORMAT)}</p>
      )}
    </Card>
  </Tooltip>
);

export { ProductCategoryCard };
