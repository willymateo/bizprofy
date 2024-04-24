"use client";

import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";

import { MENU_OPTIONS } from "../constants";
import { MenuOption } from "../interfaces";

const OptionsMenu = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-3">
      {MENU_OPTIONS.map(({ label = "", path = "", icon = "" }: MenuOption, index) => {
        const isSelected = pathname === path;

        return (
          <Link
            className={`no-underline ${isSelected ? "text-blue-500" : "text-slate-500"}`}
            href={path}
            key={index}
          >
            <ListItemButton
              className="flex flex-row items-center justify-start gap-3 rounded-2xl"
              selected={isSelected}
            >
              <Icon icon={icon} width={32} height={32} />

              <Typography>{label}</Typography>
            </ListItemButton>
          </Link>
        );
      })}
    </div>
  );
};

export { OptionsMenu };
