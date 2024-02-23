import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import Link from "next/link";

import { MENU_OPTIONS } from "./constants";

const Menu = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-3">
      {MENU_OPTIONS.map(({ label = "", href = "", icon = "" }, index) => {
        const isSelected = pathname === href;

        return (
          <ListItemButton selected={isSelected} className="rounded-2xl" key={index}>
            <Link
              className={`flex flex-row items-center justify-start gap-3 w-full no-underline ${isSelected ? "text-blue-500" : "text-slate-500"}`}
              href={href}
            >
              <Icon icon={icon} className="w-8 h-8" />

              <Typography>{label}</Typography>
            </Link>
          </ListItemButton>
        );
      })}
    </div>
  );
};

export { Menu };
