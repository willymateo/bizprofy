"use client";

import ListItemButton from "@mui/material/ListItemButton";
import Skeleton from "@mui/material/Skeleton";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { UserSessionAvatar } from "../../UserSessionAvatar";

const UserSessionInformation = () => {
  const { data: session, status } = useSession({ required: true });

  return (
    <ListItemButton className="rounded-2xl font-bold px-5 py-4" selected>
      <Link
        className="flex flex-row items-center justify-start gap-3 w-full no-underline text-black"
        href="/settings/me"
      >
        <UserSessionAvatar />

        {status === "loading" ? (
          <Skeleton variant="rectangular" className="h-11 w-40" />
        ) : (
          session?.user?.name
        )}
      </Link>
    </ListItemButton>
  );
};

export { UserSessionInformation };
