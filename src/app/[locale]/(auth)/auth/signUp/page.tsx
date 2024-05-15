import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { RedirectType, redirect } from "next/navigation";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import { Metadata } from "next";
import Link from "next/link";

import { LanguagePopover } from "@/app/[locale]/components/LanguagePopover";
import { CredentialsForm } from "./components/CredentialsForm";
import { getUserSession } from "@/utils/auth";

export const metadata: Metadata = {
  description: "Sign up for Bizprofy, the best platform for business professionals.",
  title: "Sign Up | Bizprofy",
};

const SignUp = async () => {
  const user = await getUserSession();

  if (user?.token) {
    redirect("/", RedirectType.replace);
  }

  const t = await getTranslations("auth.signUp");
  const messages = await getMessages();
  const clientMessages = (messages?.auth as AbstractIntlMessages).signUp as AbstractIntlMessages;
  const localeMessages = messages?.locales as AbstractIntlMessages;

  return (
    <Card className="flex flex-col gap-10 p-10 z-10 rounded-2xl max-w-md">
      <div className="flex flex-col gap-3">
        <h4 className="text-2xl">{t("Sign up for Bizprofy")}</h4>

        <p>
          {t("Already have an account?")} <Link href="/auth/login">{t("Login here")}</Link>
        </p>
      </div>

      <NextIntlClientProvider messages={clientMessages}>
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

export default SignUp;
