import Skeleton from "@mui/material/Skeleton";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import Link from "next/link";

const Loading = () => (
  <div className="flex flex-col gap-5 h-full">
    <div className="flex flex-row gap-5 items-center justify-between">
      <h1>Products</h1>

      <Link href="/products/new" className="no-underline">
        <Button
          startIcon={<Icon icon="eva:plus-fill" />}
          className="rounded-lg normal-case"
          variant="contained"
        >
          Add product
        </Button>
      </Link>
    </div>

    <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-5">
      {[...Array(6)].map((_, index) => (
        <Skeleton key={index} variant="rectangular" className="rounded-2xl h-[432px] w-full" />
      ))}
    </div>
  </div>
);

export default Loading;
