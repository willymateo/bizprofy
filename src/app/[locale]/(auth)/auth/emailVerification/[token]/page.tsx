import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { RedirectType, redirect } from "next/navigation";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import { Metadata } from "next";

import { LanguagePopover } from "@/app/[locale]/components/LanguagePopover";
import { VerificationButton } from "./components/VerificationButton";
import { getUserSession } from "@/utils/auth";

export const metadata: Metadata = {
  description: "Email verification page for Bizprofy.",
  title: "Email verification | Bizprofy",
};

type Props = {
  params: Params;
};

type Params = {
  token: string;
};

const EmailVerification = async ({ params: { token } }: Props) => {
  const user = await getUserSession();

  if (user?.token) {
    redirect("/", RedirectType.replace);
  }

  const t = await getTranslations("auth.emailVerification");
  const messages = await getMessages();
  const localeMessages = messages?.locales as AbstractIntlMessages;
  const emailVerificationMessages = (messages?.auth as AbstractIntlMessages)
    ?.emailVerification as AbstractIntlMessages;

  return (
    <Card className="flex flex-col gap-10 p-10 z-10 rounded-2xl max-w-md">
      <div className="flex flex-col gap-5">
        <h1>{t("You are almost there")}!</h1>

        <p>{t("To verify your account, please click the button below")}.</p>

        <NextIntlClientProvider messages={emailVerificationMessages}>
          <VerificationButton token={token}>{t("Verify your account")}</VerificationButton>
        </NextIntlClientProvider>
      </div>

      <NextIntlClientProvider messages={localeMessages}>
        <div className="flex flex-col gap-1">
          <Divider />

          <div className="flex flex-row items-center justify-center">
            <LanguagePopover />
          </div>
        </div>
      </NextIntlClientProvider>
    </Card>
  );
};

export default EmailVerification;
