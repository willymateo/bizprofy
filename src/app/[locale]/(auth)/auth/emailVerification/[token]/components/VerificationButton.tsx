"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import { useActive } from "@/hooks/useActive";
import { verifyEmail } from "@/services/auth";

type Props = {
  children: ReactNode;
  token: string;
};

const VerificationButton = ({ token = "", children }: Props) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const { isActive: isVisibleSuccessMessage = false, enable: showSuccessMessage } = useActive();
  const [error, setError] = useState<Error | null>(null);
  const t = useTranslations();
  const router = useRouter();

  const verify = async () => {
    startLoading();

    try {
      const res = await verifyEmail({ token });

      console.log("Email verified", res);

      showSuccessMessage();

      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (err) {
      console.log("Error verifying email", err);

      setError(err as Error);
    }

    stopLoading();
  };

  return (
    <>
      <Button
        disabled={isLoading || isVisibleSuccessMessage}
        className="flex flex-row gap-3 rounded-lg"
        variant="contained"
        onClick={verify}
      >
        {children}

        {isLoading && <CircularProgress className="!w-6 !h-6" disableShrink color="inherit" />}
      </Button>

      {isVisibleSuccessMessage ? (
        <Alert severity="success">{t("Your account has been verified successfully")}</Alert>
      ) : null}

      {error ? <Alert severity="error">{t(error?.message ?? "")}</Alert> : null}
    </>
  );
};

export { VerificationButton };
