import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

import { LANGUAGE_CODES } from "./constants";

const locales = Object.values(LANGUAGE_CODES);

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
