import { getServerSession } from "next-auth/next";
import Button from "@mui/material/Button";
import Link from "next/link";

import { LogOut as LogOutButton } from "../components/Buttons/LogOut";
import { authOptions } from "../api/auth/[...nextauth]/constants";

const Hero = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center justify-center">
      {session ? (
        <LogOutButton />
      ) : (
        <Link href="/auth/login">
          <Button variant="contained">Login</Button>
        </Link>
      )}
    </div>
  );
};

export { Hero };
