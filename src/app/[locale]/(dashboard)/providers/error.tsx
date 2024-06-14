"use client";

import { ErrorBoundary } from "../components/ErrorBoundary";
import { Layout } from "./components/Layout";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ProvidersError = (props: Props) => <ErrorBoundary Layout={Layout} {...props} />;

export default ProvidersError;
