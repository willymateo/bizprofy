"use server";

import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

import { ToggleButton as NavigationToggleButton } from "../Navigation/ToggleButton";
import { LanguagePopover } from "./LanguagePopover";
import { AccountPopover } from "./AccountPopover";

const Header = async () => (
  <AppBar
    className="sticky bg-transparent shadow-none backdrop-blur-[6px]"
    style={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
  >
    <Toolbar className="justify-between xl:justify-end px-6 xl:px-10 py-3 xl:py-5">
      <NavigationToggleButton className="inline-flex xl:hidden" />

      <div className="flex flex-row items-center gap-1">
        <LanguagePopover />
        <AccountPopover />
      </div>
    </Toolbar>
  </AppBar>
);

export { Header };
