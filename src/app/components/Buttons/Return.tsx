"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

interface Props {
  className?: string;
}

const Return = ({ className = "" }: Props) => {
  const router = useRouter();

  return (
    <Button
      className={`flex flex-row gap-3 rounded-lg normal-case ${className}`}
      startIcon={<Icon icon="solar:arrow-left-linear" />}
      onClick={router.back}
      variant="text"
    >
      Cancel
    </Button>
  );
};

export { Return };
