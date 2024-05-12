"use client";

import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";

import { MenuOption } from "./interfaces";

const Option = ({ label = "", path = "", icon = "" }: MenuOption) => {
  const pathname = usePathname();

  const isSelected = pathname === path;

  return (
    <Link className={`no-underline ${isSelected ? "text-blue-500" : "text-slate-500"}`} href={path}>
      <ListItemButton
        className="flex flex-row items-center justify-start gap-3 rounded-2xl"
        selected={isSelected}
      >
        <Icon icon={icon} width={32} height={32} />

        <Typography>{label ?? ""}</Typography>
      </ListItemButton>
    </Link>
  );
};

export { Option };
