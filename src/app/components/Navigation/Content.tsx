import ListItemButton from "@mui/material/ListItemButton";
import { useSession } from "next-auth/react";
import SimpleBar from "simplebar-react";
import List from "@mui/material/List";
import Link from "next/link";

import { UserSessionAvatar } from "../UserSessionAvatar";
import { Logo } from "../Logo";
import { Menu } from "./Menu";

import "simplebar-react/dist/simplebar.min.css";

interface Props {
  className?: string;
}

const Content = ({ className = "" }: Props) => {
  const { data: session } = useSession();

  return (
    <div className={`h-screen w-[280px] ${className}`}>
      <SimpleBar className="h-full w-[280px]">
        <List className="flex flex-col gap-5 p-0 mx-5 my-6">
          <Logo href="/" />

          <ListItemButton className="rounded-2xl font-bold px-5 py-4" selected>
            <Link
              className="flex flex-row items-center justify-start gap-3 w-full no-underline text-black"
              href="/me"
            >
              <UserSessionAvatar />

              {session?.user?.name ?? "Willy Mateo"}
            </Link>
          </ListItemButton>

          <Menu />
        </List>
      </SimpleBar>
    </div>
  );
};

export { Content };
