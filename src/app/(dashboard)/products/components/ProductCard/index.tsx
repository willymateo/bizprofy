import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@iconify-icon/react";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/services/products/interfaces";
import { TooltipContent } from "./TooltipContent";

const ProductCard = (product: Product) => (
  <Tooltip title={<TooltipContent {...product} />} arrow followCursor>
    <Card className="flex flex-col">
      <Link
        className="flex flex-row items-center justify-center pt-full relative text-black"
        href={`/products/${product?.id}`}
      >
        {product?.photoUrl ? (
          <Image
            className="object-cover object-center min-w-[240px] min-h-[240px] w-full !text-black"
            src={product?.photoUrl ?? ""}
            alt={product?.name ?? ""}
            height={240}
            width={300}
          />
        ) : (
          <Icon icon="solar:bag-heart-bold-duotone" height={240} width={240} />
        )}
      </Link>

      <div className="flex flex-col justify-between gap-5 h-full p-3">
        <div className="flex flex-col justify-center gap-1">
          <Link
            className="font-bold text-black no-underline overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] hover:underline"
            href={`/products/${product?.id}`}
          >
            {product?.name ?? ""}
          </Link>

          {product?.code && (
            <div>
              <span>Code: </span>

              <Chip
                icon={<Icon icon="solar:code-scan-line-duotone" className="pl-3" />}
                className="w-fit max-w-full overflow-hidden text-ellipsis"
                label={product?.code ?? ""}
                color="info"
              />
            </div>
          )}

          {product?.productCategory && (
            <div>
              <span>Category: </span>

              <Chip
                className="w-fit max-w-full overflow-hidden text-ellipsis"
                label={product?.productCategory?.name ?? ""}
                icon={
                  <Icon
                    icon="solar:bag-smile-bold-duotone"
                    className="pl-3"
                    height={16}
                    width={16}
                  />
                }
                color="secondary"
              />
            </div>
          )}

          {product?.provider && (
            <p className="overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1]">
              Provider: {`${product?.provider?.firstNames} ${product?.provider?.lastNames}`.trim()}
            </p>
          )}
        </div>

        <div className="flex flex-row gap-5 items-center justify-between">
          <p>
            Unit price: <span className="font-bold">${product?.unitPrice ?? 0}</span>
          </p>

          <p>
            Unit cost: <span className="font-bold">${product?.unitCost ?? 0}</span>
          </p>
        </div>
      </div>
    </Card>
  </Tooltip>
);

export { ProductCard };
