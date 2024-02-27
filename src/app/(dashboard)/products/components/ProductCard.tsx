import { Icon } from "@iconify-icon/react";
import Card from "@mui/material/Card";
import Image from "next/image";
import Link from "next/link";

import { Product } from "../interfaces";

const ProductCard = ({ id, name = "", photoUrl = "", unitPrice = 0, code = "" }: Product) => (
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

      <div className="flex flex-row gap-5 items-center justify-between">
        <p className="max-w-full overflow-hidden text-ellipsis">{code}</p>
        <p>
          <span>$</span>
          {unitPrice}
        </p>
      </div>
    </div>
  </Card>
);

export { ProductCard };
