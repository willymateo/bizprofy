import { Icon } from "@iconify-icon/react";
import Card from "@mui/material/Card";
import Image from "next/image";
import Link from "next/link";

import { Product } from "../interfaces";
import { Tooltip } from "@mui/material";

const ProductCard = ({
  description = "",
  photoUrl = "",
  unitPrice = 0,
  unitCost = 0,
  code = "",
  name = "",
  id = "",
}: Product) => (
  <Tooltip title={description} placement="top" arrow>
    <Card>
      <Link
        className="flex flex-row items-center justify-center pt-full relative text-black"
        href={`/products/${id}`}
      >
        {photoUrl ? (
          <Image
            className="object-cover object-center min-w-[240px] min-h-[240px] w-full !text-black"
            src={photoUrl}
            height={240}
            width={300}
            alt={name}
          />
        ) : (
          <Icon icon="solar:bag-heart-bold-duotone" height={240} width={240} />
        )}
      </Link>

      <div className="flex flex-col gap-5 p-3">
        <Link
          className="font-bold text-black no-underline overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] hover:underline"
          href={`/products/${id}`}
        >
          {name}
        </Link>

        <div className="flex flex-col gap-5 justify-center">
          <p className="max-w-full overflow-hidden text-ellipsis">{code}</p>

          <div className="flex flex-row gap-5 items-center justify-between">
            <p className="font-bold">
              Unit price: <span>${unitPrice}</span>
            </p>

            <p className="font-bold">
              Unit cost: <span>${unitCost}</span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  </Tooltip>
);

export { ProductCard };
