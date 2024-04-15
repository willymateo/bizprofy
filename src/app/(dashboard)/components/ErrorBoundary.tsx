"use client";

import { ElementType, ReactNode, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

type Props = {
  error: Error & { digest?: string };
  Layout: ElementType;
  Icon: ReactNode;
  reset: () => void;
};

const ErrorBoundary = ({ error, reset, Layout, Icon }: Props) => {
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
          <Typography variant="h6">This is unexpected for us</Typography>

          <p>
            Error hash:{" "}
            <Tooltip title="Click to copy" arrow followCursor placement="top">
              <strong className="cursor-pointer" onClick={copyErrorDigest}>
                {error.digest}
              </strong>
            </Tooltip>
          </p>
        </div>

        <Button className="rounded-lg normal-case" variant="contained" onClick={reset}>
          Try again
        </Button>
      </div>
    </Layout>
  );
};

export { ErrorBoundary };
