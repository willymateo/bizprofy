import { Icon } from "@iconify-icon/react";
import { redirect } from "next/navigation";
import Button from "@mui/material/Button";
import type { Metadata } from "next";
import Link from "next/link";

import { PAGE_SIZE_OPTIONS } from "./components/Table/constants";
import { GetUsersPayload } from "@/services/users/interfaces";
import { getUsers } from "@/services/users";
import { Table } from "./components/Table";

const metadata: Metadata = {
  description: "Business management system",
  title: "Users | Bizprofy",
};

type Props = {
  searchParams: GetUsersPayload;
  params: {};
};

const UsersPage = async ({ searchParams: { limit = PAGE_SIZE_OPTIONS[0], offset = 0 } }: Props) => {
  offset = parseInt(offset.toString(), 10);
  limit = parseInt(limit.toString(), 10);

  if (isNaN(offset) || isNaN(limit)) {
    redirect(
      `/users?${new URLSearchParams({
        limit: PAGE_SIZE_OPTIONS[0].toString(),
        offset: "0",
      }).toString()}`,
    );
  }

  const response = await getUsers({
    offset,
    limit,
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1>Users</h1>

        <Link href="/users/new" className="no-underline">
          <Button
            className="rounded-lg normal-case"
            startIcon={<Icon icon="eva:plus-fill" />}
            variant="contained"
          >
            Add user
          </Button>
        </Link>
      </div>

      <Table {...response} />
    </div>
  );
};

export default UsersPage;
export { metadata };
