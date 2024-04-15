import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { ReactNode } from "react";
import Link from "next/link";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="flex flex-col gap-5 h-full">
    <div className="flex flex-row gap-5 items-center justify-between">
      <h1>Warehouses</h1>

      <Link href="/warehouses/new" className="no-underline">
        <Button
          startIcon={<Icon icon="eva:plus-fill" />}
          className="rounded-lg normal-case"
          variant="contained"
        >
          Add warehouse
        </Button>
      </Link>
    </div>

    {children}
  </div>
);

export { Layout };
