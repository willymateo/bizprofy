"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { signIn } from "next-auth/react";

import { useActive } from "@/hooks/useActive";

const Github = () => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const router = useRouter();

  const handleLogin = async () => {
    startLoading();

    await signIn("github");

    stopLoading();
    router.push("/");
    router.refresh();
  };

  return (
    <Button
      className="flex flex-row gap-3 rounded-lg normal-case bg-slate-800"
      onClick={handleLogin}
      disabled={isLoading}
      variant="contained"
      size="large"
    >
      <Icon icon="uim:github" width={32} height={32} />
      Github
      {isLoading && <CircularProgress className="!w-8 !h-8" disableShrink color="inherit" />}
    </Button>
  );
};

export { Github };
