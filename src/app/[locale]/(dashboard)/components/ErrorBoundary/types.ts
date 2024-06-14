import { ElementType } from "react";

export type Props = {
  error: Error & { digest?: string };
  Layout: ElementType;
  reset: () => void;
};
