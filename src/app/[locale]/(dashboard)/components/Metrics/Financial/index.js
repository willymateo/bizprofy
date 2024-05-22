import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { Expenses } from "./Charts/Expenses";
import { Profits } from "./Charts/Profits";
import { Sales } from "./Charts/Sales";

const Financial = async () => {
  const messages = await getMessages();

  return (
    <div className="grid grid-cols-3 gap-5">
      <NextIntlClientProvider messages={messages?.Home}>
        <Sales />
        <Expenses />
        <Profits />
      </NextIntlClientProvider>
    </div>
  );
};

export { Financial };
