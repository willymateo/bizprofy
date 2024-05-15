import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { PAGE_SIZE_OPTIONS } from "./components/Table/constants";
import { GetUsersPayload } from "@/services/users/interfaces";
import { UnAuthorized } from "../../components/UnAuthorized";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";
import { getUsers } from "@/services/users";
import { Table } from "./components/Table";

export const metadata: Metadata = {
  description: "Business management system",
  title: "Users | Bizprofy",
};

type Props = {
  searchParams: GetUsersPayload;
  params: {};
};

const UsersPage = async ({ searchParams: { limit = PAGE_SIZE_OPTIONS[0], offset = 0 } }: Props) => {
  const userSession = await getUserSession();

  const hasAccess = userSession?.entityPermissions?.users?.hasAccess;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

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

  const messages = await getMessages();
  const usersMessages = messages?.users as AbstractIntlMessages;

  return (
    <Layout>
      <NextIntlClientProvider messages={usersMessages}>
        <Table {...data} offset={offset} limit={limit} />
      </NextIntlClientProvider>
    </Layout>
  );
};

export default UsersPage;
