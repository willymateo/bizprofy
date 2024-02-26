"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

const Return = ({ className = "", children }: Props) => {
  const router = useRouter();

  return (
    <Button
      startIcon={<Icon icon="solar:arrow-left-linear" />}
      className={`rounded-lg normal-case ${className}`}
      onClick={router.back}
      variant="contained"
    >
      {children}
    </Button>
  );
};

export { Return };
