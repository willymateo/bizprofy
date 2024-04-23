import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import Link from "next/link";
import dayjs from "dayjs";

import { ProductCategory } from "@/services/products/categories/types";
import { TooltipContent } from "./TooltipContent";

const DATE_FORMAT = "DD MMMM YYYY";

const ProductCategoryCard = (productCategory: ProductCategory) => (
  <Tooltip title={<TooltipContent {...productCategory} />} arrow followCursor>
    <Card className="flex flex-col gap-5 h-full p-3">
      <div className="flex flex-row justify-between items-center">
        <Link
          className="font-bold text-black no-underline overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] hover:underline"
          href={`/products/categories/${productCategory?.id}`}
        >
          {productCategory?.name ?? ""}
        </Link>

        <Switch checked={!productCategory?.deletedAt} />
      </div>

      <div className="flex flex-col">
        <p className="text-sm">
          Created at: {dayjs(productCategory?.createdAt).format(DATE_FORMAT)}
        </p>

        {productCategory?.deletedAt ? (
          <p className="text-sm">
            Deleted at: {dayjs(productCategory?.deletedAt).format(DATE_FORMAT)}
          </p>
        ) : (
          <p className="text-sm">
            Last updated at: {dayjs(productCategory?.updatedAt).format(DATE_FORMAT)}
          </p>
        )}
      </div>
    </Card>
  </Tooltip>
);

export { ProductCategoryCard };
