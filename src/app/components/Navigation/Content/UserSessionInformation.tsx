"use client";

import ListItemButton from "@mui/material/ListItemButton";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { UserSessionAvatar } from "../../UserSessionAvatar";

const UserSessionInformation = () => {
  const { data: session } = useSession({ required: true });

  return (
    <ListItemButton className="rounded-2xl font-bold px-5 py-4" selected>
      <Link
        className="flex flex-row items-center justify-start gap-3 w-full no-underline text-black"
        href="/me"
      >
        <UserSessionAvatar />

        {session?.user?.name ?? "Willy Mateo"}
      </Link>
    </ListItemButton>
  );
};

export { UserSessionInformation };
