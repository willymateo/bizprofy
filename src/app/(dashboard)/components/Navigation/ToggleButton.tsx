"use client";

import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";

import { openDrawer } from "@/redux/states/navigation";
import { Icon } from "@iconify-icon/react";

interface Props {
  className?: string;
}

const ToggleButton = ({ className = "" }: Props) => {
  const dispatch = useDispatch();

  const handleOpenDrawer = () => dispatch(openDrawer());

  return (
    <IconButton onClick={handleOpenDrawer} className={className}>
      <Icon icon="solar:hamburger-menu-broken" />
    </IconButton>
  );
};

export { ToggleButton };
