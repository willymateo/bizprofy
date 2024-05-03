import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Props } from "./types";

import { Content } from "./Content";

const ErrorBoundary = async (props: Props) => {
  const messages = await getMessages();
  const errorBoundaryMessages = messages?.ErrorBoundary as AbstractIntlMessages;

  return (
    <NextIntlClientProvider messages={errorBoundaryMessages}>
      <Content {...props} />
    </NextIntlClientProvider>
  );
};

export { ErrorBoundary };
