"use client";

import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useTranslations } from "next-intl";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { Props } from "./types";

const Content = ({ error, reset, Layout, Icon }: Props) => {
  const t = useTranslations();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const copyErrorDigest = () => {
    navigator.clipboard.writeText(error?.digest ?? "");
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center gap-10 h-full">
        {Icon}

        <div className="flex flex-col justify-center items-center">
          <Typography variant="h6">{t("This is unexpected for us")}</Typography>

          <p>
            {`${t("Error hash:")} `}
            <Tooltip title="Click to copy" arrow followCursor placement="top">
              <strong className="cursor-pointer" onClick={copyErrorDigest}>
                {error.digest}
              </strong>
            </Tooltip>
          </p>
        </div>

        <Button className="rounded-lg normal-case" variant="contained" onClick={reset}>
          {t("Try again")}
        </Button>
      </div>
    </Layout>
  );
};

export { Content };
