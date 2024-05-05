import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import { Metadata } from "next";
import Link from "next/link";

import { LanguagePopover } from "@/app/[locale]/components/LanguagePopover";
import { authConfig } from "@/app/api/auth/[...nextauth]/constants";
import { CredentialsForm } from "./components/CredentialsForm";
import { SessionPayload } from "@/services/interfaces";
import { OAuth } from "./components/OAuth";

const metadata: Metadata = {
  description: "Login to Bizprofy, the best platform for business professionals.",
  title: "Login | Bizprofy",
};

const Login = async () => {
  const session = await getServerSession(authConfig);
  const user = session?.user as SessionPayload;

  if (user?.token) {
    redirect("/", RedirectType.replace);
  }

  const t = await getTranslations("auth.login");
  const messages = await getMessages();
  const clientMessages = (messages?.auth as AbstractIntlMessages).login as AbstractIntlMessages;
  const localeMessages = messages?.locales as AbstractIntlMessages;

  return (
    <Card className="flex flex-col gap-10 p-10 z-10 rounded-2xl max-w-md">
      <div className="flex flex-col gap-3">
        <h4 className="text-2xl">{t("Login to Bizprofy")}</h4>

        <p>
          {t("Don't have an account?")}{" "}
          <Link href="/auth/signUp" className="font-bold">
            {t("Get started")}
          </Link>
        </p>
      </div>

      <NextIntlClientProvider messages={clientMessages}>
        <OAuth />

        <Divider>{t("Or")}</Divider>

        <CredentialsForm />
      </NextIntlClientProvider>

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

export default Login;
export { metadata };
