import ListItemButton from "@mui/material/ListItemButton";
import { useSession } from "next-auth/react";
import List from "@mui/material/List";
import Link from "next/link";

import { UserSessionAvatar } from "../UserSessionAvatar";
import { Logo } from "../Logo";
import { Menu } from "./Menu";

interface Props {
  className?: string;
}

const Content = ({ className = "" }: Props) => {
  const { data: session } = useSession();

  return (
    <List className={`flex flex-col gap-5 ${className}`}>
      <Logo href="/" className="rounded-2xl" />

      <ListItemButton className="grow-0">
        <Link href="/me" className="flex flex-row items-center justify-start gap-3">
          <UserSessionAvatar />

          {session?.user?.email}
        </Link>
      </ListItemButton>

      <Menu />
    </List>
  );
};

export { Content };
