"use client";

import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useState } from "react";
import { useSession } from "next-auth/react";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { UserSessionAvatar } from "../UserSessionAvatar";
import { useActive } from "@/hooks/useActive";

const AccountPopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { data: session } = useSession();
  const isOpen = Boolean(anchorEl);
  const {
    isActive: isSigningOut = false,
    enable: startSigningOut,
    disable: stopSigningOut,
  } = useActive();
  const id = isOpen ? "language-popover" : undefined;

  const handleOpen = ({ currentTarget }: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleSignOut = async () => {
    startSigningOut();

    try {
      await signOut();
    } catch (err) {
      console.log("Error signing out", err);
    }

    stopSigningOut();
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <UserSessionAvatar />
      </IconButton>

      <Popover
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
        anchorEl={anchorEl}
        slotProps={{
          paper: {
            sx: {
              width: 200,
              ml: 0.75,
              mt: 1,
              p: 0,
            },
          },
        }}
        open={isOpen}
        id={id}
      >
        {(session?.user?.name || session?.user?.email) && (
          <div className="flex flex-col px-4 my-4">
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
          </div>
        )}

        <Divider className="border-dashed" />

        <MenuItem>
          <Link href="/me" className="no-underline w-full text-slate-800">
            Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/settings" className="no-underline w-full text-slate-800">
            Settings
          </Link>
        </MenuItem>

        <Divider className="border-dashed" />

        <MenuItem
          sx={{ typography: "body2", color: "error.main" }}
          disabled={isSigningOut}
          onClick={handleSignOut}
          className="py-4 gap-5"
          disableTouchRipple
          disableRipple
        >
          Logout
          {isSigningOut && <CircularProgress />}
        </MenuItem>
      </Popover>
    </>
  );
};

export { AccountPopover };
