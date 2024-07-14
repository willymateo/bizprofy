"use client";

import { ErrorBoundary } from "../../components/ErrorBoundary";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const CurrentStockError = (props: Props) => (
  <ErrorBoundary Layout={({ children }) => children} {...props} />
);

export default CurrentStockError;
