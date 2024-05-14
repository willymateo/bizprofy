"use client";

import { Icon } from "@iconify-icon/react";

import { ErrorBoundary } from "../../components/ErrorBoundary";
import { Layout } from "./components/Layout";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ProductCategoriesError = (props: Props) => (
  <ErrorBoundary
    Icon={<Icon icon="solar:ghost-smile-line-duotone" height={200} width={200} />}
    Layout={Layout}
    {...props}
  />
);

export default ProductCategoriesError;