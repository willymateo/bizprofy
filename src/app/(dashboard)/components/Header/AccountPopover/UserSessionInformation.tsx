"use client";

import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { useSession } from "next-auth/react";

const UserSessionInformation = () => {
  const { data: session, status } = useSession({ required: true });

  return (
    <div className="flex flex-col px-4 my-4">
      {status === "loading" ? (
        <Skeleton variant="rectangular" className="h-11 w-40" />
      ) : (
        <>
          {session?.user?.name && (
            <Typography variant="subtitle2" noWrap>
              {session?.user?.name ?? ""}
            </Typography>
          )}
          {session?.user?.email && (
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {session?.user?.email ?? ""}
            </Typography>
          )}
        </>
      )}
    </div>
  );
};

export { UserSessionInformation };
