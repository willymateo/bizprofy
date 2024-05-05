import MenuItem from "@mui/material/MenuItem";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { MENU_OPTIONS } from "../constants";
import { MenuOption } from "../interfaces";

const OptionsMenu = () => {
  const pathname = usePathname();
  const t = useTranslations();

  return MENU_OPTIONS.map(({ label = "", path = "" }: MenuOption, index) => {
    const isSelected = pathname === path;

    return (
      <MenuItem selected={isSelected} key={index} className="p-0">
        <Link href={path} className="no-underline w-full text-slate-800 px-3 py-2">
          {t(label)}
        </Link>
      </MenuItem>
    );
  });
};

export { OptionsMenu };
