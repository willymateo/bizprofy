import { useSession } from "next-auth/react";
import Avatar from "@mui/material/Avatar";

const UserSessionAvatar = () => {
  const { data: session } = useSession();

  return (
    <Avatar
      sx={{ border: theme => `solid 2px ${theme.palette.background.default}` }}
      src={String(session?.user?.image)}
      className="w-[32px] h-[32px]"
    />
  );
};

export { UserSessionAvatar };
