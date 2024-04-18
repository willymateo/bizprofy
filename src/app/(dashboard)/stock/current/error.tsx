"use client";

import { Icon } from "@iconify-icon/react";

import { ErrorBoundary } from "../../components/ErrorBoundary";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const CurrentStockError = (props: Props) => (
  <ErrorBoundary
    Icon={<Icon icon="solar:ghost-smile-line-duotone" height={200} width={200} />}
    Layout={({ children }) => children}
    {...props}
  />
);

export default CurrentStockError;
