"use server";

import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Props } from "./types";

import { ErrorBoundary } from "./index";

const ErrorBoundaryOld = async (props: Props) => {
  const messages = await getMessages();
  const errorBoundaryMessages = messages?.ErrorBoundary as AbstractIntlMessages;

  return (
    <NextIntlClientProvider messages={errorBoundaryMessages}>
      <ErrorBoundary {...props} />
    </NextIntlClientProvider>
  );
};

export { ErrorBoundaryOld };
