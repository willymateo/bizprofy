"use server";

import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

import { ToggleButton as NavigationToggleButton } from "../Navigation/ToggleButton";
import { LanguagePopover } from "./LanguagePopover";
import { AccountPopover } from "./AccountPopover";

const Header = async () => (
  <AppBar className="static bg-transparent shadow-none">
    <Toolbar className="justify-between xl:justify-end min-h-16 px-6 xl:px-10">
      <NavigationToggleButton className="inline-flex xl:hidden" />

      <div className="flex flex-row items-center gap-1">
        <LanguagePopover />
        <AccountPopover />
      </div>
    </Toolbar>
  </AppBar>
);

export { Header };
