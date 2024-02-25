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
          <ListItemButton selected={isSelected} className="rounded-2xl" key={index}>
            <Link
              className={`flex flex-row items-center justify-start gap-3 w-full no-underline ${isSelected ? "text-blue-500" : "text-slate-500"}`}
              href={path}
            >
              <Icon icon={icon} width={32} height={32} />

              <Typography>{label}</Typography>
            </Link>
          </ListItemButton>
        );
      })}
    </div>
  );
};

export { OptionsMenu };
