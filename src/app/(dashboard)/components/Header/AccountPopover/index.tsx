"use client";

import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useState } from "react";
import Divider from "@mui/material/Divider";
import { signOut } from "next-auth/react";
import Menu from "@mui/material/Menu";

import { UserSessionInformation } from "./UserSessionInformation";
import { UserSessionAvatar } from "../../UserSessionAvatar";
import { useActive } from "@/hooks/useActive";
import { OptionsMenu } from "./OptionsMenu";

const AccountPopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const {
    isActive: isLogingOut = false,
    enable: startLogingOut,
    disable: stopLogingOut,
  } = useActive();

  const handleOpen = ({ currentTarget }: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleSignOut = async () => {
    startLogingOut();

    try {
      await signOut();
    } catch (err) {
      console.log("Error signing out", err);
    }

    stopLogingOut();
  };

  return (
    <>
      <IconButton onClick={handleOpen} className="w-12 h-12">
        <UserSessionAvatar />
      </IconButton>

      <Menu
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClick={handleClose}
        onClose={handleClose}
        id="account-popover"
        anchorEl={anchorEl}
        open={isOpen}
      >
        <UserSessionInformation />

        <Divider className="border-dashed" />

        <OptionsMenu />

        <Divider className="border-dashed" />

        <MenuItem
          sx={{ typography: "body2", color: "error.main" }}
          onClick={handleSignOut}
          disabled={isLogingOut}
          className="py-4 gap-5"
          disableTouchRipple
          disableRipple
        >
          Logout
          {isLogingOut && (
            <CircularProgress className="!w-[22px] !h-[22px]" disableShrink color="inherit" />
          )}
        </MenuItem>
      </Menu>
    </>
  );
};

export { AccountPopover };
