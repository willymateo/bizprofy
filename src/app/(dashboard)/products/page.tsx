import Button from "@mui/material/Button";
import Link from "next/link";

const Products = () => (
  <div className="flex flex-col gap-5 items-start justify-center">
    <h1>Products</h1>

    <Link href="/products/new" className="no-underline">
      <Button className="flex flex-row gap-3 rounded-lg normal-case" variant="contained">
        Add product
      </Button>
    </Link>
  </div>
);

export default Products;
