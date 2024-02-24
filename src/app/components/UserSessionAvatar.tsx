"use client";

import { useSession } from "next-auth/react";
import Avatar from "@mui/material/Avatar";

const UserSessionAvatar = () => {
  const { data: session } = useSession({ required: true });

  return (
    <Avatar
      sx={{ border: theme => `solid 2px ${theme.palette.background.default}` }}
      src={session?.user?.image as string}
      className="w-9 h-9"
    />
  );
};

export { UserSessionAvatar };
