"use client";

import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import MenuItem from "@mui/material/MenuItem";
import { useSession } from "next-auth/react";
import Divider from "@mui/material/Divider";

import { SessionPayload } from "@/services/interfaces";

const UserSessionInformation = () => {
  const { data: session, status } = useSession({ required: true });
  const user = session?.user as SessionPayload;

  if (status === "loading") {
    return (
      <>
        <div className="flex flex-col px-4 my-4">
          <Skeleton variant="rectangular" className="h-11 w-40" />
        </div>

        <Divider className="border-dashed" />

        <div className="flex flex-col px-4 my-4">
          <Skeleton variant="rectangular" className="h-11 w-40" />
        </div>
      </>
    );
  }

  return (
    <>
      <MenuItem className="py-4" disableTouchRipple disableRipple selected>
        {user?.company?.name && (
          <Typography variant="subtitle2" noWrap>
            {user?.company?.name ?? ""}
          </Typography>
        )}
      </MenuItem>

      <Divider className="border-dashed" />

      <div className="flex flex-col px-4 my-4" onClick={e => e.stopPropagation()}>
        {session?.user?.name && (
          <Typography variant="subtitle2" noWrap>
            {session?.user?.name ?? ""}
          </Typography>
        )}
        {user?.email && (
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email ?? ""}
          </Typography>
        )}
      </div>
    </>
  );
};

export { UserSessionInformation };
