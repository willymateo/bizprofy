import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@iconify-icon/react";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/services/products/interfaces";

const ProductCard = ({
  description = "",
  photoUrl = "",
  unitPrice = 0,
  unitCost = 0,
  code = "",
  name = "",
  id = "",
}: Product) => (
  <Tooltip title={description} arrow followCursor>
    <Card className="flex flex-col">
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

      <div className="flex flex-col justify-between gap-5 h-full p-3">
        <div className="flex flex-col justify-center">
          <Link
            className="font-bold text-black no-underline overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] hover:underline"
            href={`/products/${id}`}
          >
            {name}
          </Link>

          {code && (
            <Chip
              className="w-fit max-w-full overflow-hidden text-ellipsis"
              color="info"
              label={code}
            />
          )}
        </div>

        <div className="flex flex-row gap-5 items-center justify-between">
          <p>
            Unit price: <span className="font-bold">${unitPrice}</span>
          </p>

          <p>
            Unit cost: <span className="font-bold">${unitCost}</span>
          </p>
        </div>
      </div>
    </Card>
  </Tooltip>
);

export { ProductCard };
