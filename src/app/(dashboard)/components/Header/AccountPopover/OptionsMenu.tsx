import MenuItem from "@mui/material/MenuItem";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { MENU_OPTIONS } from "../constants";
import { MenuOption } from "../interfaces";

const OptionsMenu = () => {
  const pathname = usePathname();

  return MENU_OPTIONS.map(({ label = "", path = "" }: MenuOption, index) => {
    const isSelected = pathname === path;

    return (
      <Link href={path} className="no-underline w-full text-slate-800" key={index}>
        <MenuItem selected={isSelected}>{label}</MenuItem>
      </Link>
    );
  });
};

export { OptionsMenu };
