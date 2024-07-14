"use client";

import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
// import { useTranslations } from "next-intl";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { useEffect } from "react";

import { Props } from "./types";

const ErrorBoundary = ({ error, reset, Layout }: Props) => {
  // const t = useTranslations();

  useEffect(() => {
    console.error("ErrorBoundary:", error);
  }, [error]);

  const copyErrorDigest = () => navigator.clipboard.writeText(error?.digest ?? "");

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center gap-10 h-full">
        <Icon icon="solar:ghost-smile-line-duotone" height={200} width={200} />

        <div className="flex flex-col justify-center items-center">
          <Typography variant="h6">{"This is unexpected for us"}</Typography>

          <p>
            {`${"Error hash:"} `}
            <Tooltip title="Click to copy" arrow followCursor placement="top">
              <strong className="cursor-pointer" onClick={copyErrorDigest}>
                {error?.digest}
              </strong>
            </Tooltip>
          </p>
        </div>

        <Button className="rounded-lg normal-case" variant="contained" onClick={reset}>
          {"Try again"}
        </Button>
      </div>
    </Layout>
  );
};

export { ErrorBoundary };
