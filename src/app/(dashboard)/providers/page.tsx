import { Icon } from "@iconify-icon/react";
import { redirect } from "next/navigation";
import Button from "@mui/material/Button";
import type { Metadata } from "next";
import Link from "next/link";

import { GetProvidersPayload } from "@/services/providers/interfaces";
import { PAGE_SIZE_OPTIONS } from "./components/Table/constants";
import { getProviders } from "@/services/providers";
import { Table } from "./components/Table";

const metadata: Metadata = {
  description: "Business management system",
  title: "Providers | Bizprofy",
};

type Props = {
  searchParams: GetProvidersPayload;
  params: {};
};

const ProvidersPage = async ({
  searchParams: { limit = PAGE_SIZE_OPTIONS[0], offset = 0 },
}: Props) => {
  offset = parseInt(offset.toString(), 10);
  limit = parseInt(limit.toString(), 10);

  if (isNaN(offset) || isNaN(limit)) {
    redirect(
      `/providers?${new URLSearchParams({
        limit: PAGE_SIZE_OPTIONS[0].toString(),
        offset: "0",
      })}`,
    );
  }

  const data = await getProviders({
    offset,
    limit,
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1>Providers</h1>

        <Link href="/providers/new" className="no-underline">
          <Button
            startIcon={<Icon icon="eva:plus-fill" />}
            className="rounded-lg normal-case"
            variant="contained"
          >
            Add provider
          </Button>
        </Link>
      </div>

      <Table {...data} limit={limit} offset={offset} />
    </div>
  );
};

export default ProvidersPage;
export { metadata };
