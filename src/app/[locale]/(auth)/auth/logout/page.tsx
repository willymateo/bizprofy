"use server";

import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";

import { Content } from "./Content";

// export const metadata: Metadata = {
// description: "Logout page for Bizprofy.",
// title: "Logout | Bizprofy",
// };

const Logout = async () => {
  const messages = await getMessages();
  const logoutMessages = (messages?.auth as AbstractIntlMessages).logout as AbstractIntlMessages;

  return (
    <NextIntlClientProvider messages={logoutMessages}>
      <Content />
    </NextIntlClientProvider>
  );
};

export default Logout;
