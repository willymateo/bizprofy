"use client";

import { ErrorBoundary } from "./components/ErrorBoundary";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const DashboardError = (props: Props) => (
  <ErrorBoundary Layout={({ children }) => children} {...props} />
);

export default DashboardError;
