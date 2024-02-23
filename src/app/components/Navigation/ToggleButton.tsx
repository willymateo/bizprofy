"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";

import { openDrawer } from "@/redux/states/navigation";

interface Props {
  className?: string;
}

const ToggleButton = ({ className = "" }: Props) => {
  const dispatch = useDispatch();

  const handleOpenDrawer = () => dispatch(openDrawer());

  return (
    <IconButton onClick={handleOpenDrawer} className={className}>
      <FontAwesomeIcon icon={faBars} />
    </IconButton>
  );
};

export { ToggleButton };
