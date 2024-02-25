"use client";

import Skeleton from "@mui/material/Skeleton";
import { useSession } from "next-auth/react";
import Avatar from "@mui/material/Avatar";

const UserSessionAvatar = () => {
  const { data: session, status } = useSession({ required: true });

  if (status === "loading") {
    return <Skeleton variant="circular" className="w-[32px] h-[32px]" />;
  }

  return (
    <Avatar
      sx={{ border: theme => `solid 2px ${theme.palette.background.default}` }}
      src={session?.user?.image as string}
      className="w-9 h-9"
    />
  );
};

export { UserSessionAvatar };
