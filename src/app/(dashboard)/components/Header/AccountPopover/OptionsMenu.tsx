"use client";

import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";

import { MENU_OPTIONS } from "../constants";
import { MenuOption } from "../interfaces";

const OptionsMenu = () =>
  MENU_OPTIONS.map(({ label = "", path = "" }: MenuOption, index) => (
    <MenuItem key={index}>
      <Link href={path} className="no-underline w-full text-slate-800">
        {label}
      </Link>
    </MenuItem>
  ));

export { OptionsMenu };
