import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Link from "next/link";

const metadata: Metadata = {
  description: "Business management system",
  title: "Products | Bizprofy",
};

interface Props {
  children: ReactNode;
}

const Products = ({ children }: Readonly<Props>) => (
  <div className="flex flex-col gap-5">
    <div className="flex flex-row gap-5 items-center justify-between">
      <h1>Products</h1>

      <Link href="/products/new" className="no-underline">
        <Button
          className="rounded-lg normal-case"
          startIcon={<Icon icon="eva:plus-fill" />}
          variant="contained"
        >
          Add product
        </Button>
      </Link>
    </div>

    {children}
  </div>
);

export default Products;
export { metadata };
