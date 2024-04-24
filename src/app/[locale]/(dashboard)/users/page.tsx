import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { PAGE_SIZE_OPTIONS } from "./components/Table/constants";
import { GetUsersPayload } from "@/services/users/interfaces";
import { getUsers } from "@/services/users";
import { Table } from "./components/Table";
import { Layout } from "./components/Layout";

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
      })}`,
    );
  }

  const data = await getUsers({
    offset,
    limit,
  });

  return (
    <Layout>
      <Table {...data} offset={offset} limit={limit} />
    </Layout>
  );
};

export default UsersPage;
export { metadata };
