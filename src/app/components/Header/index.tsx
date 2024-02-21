import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

import { ToggleButton as NavigationToggleButton } from "../Navigation/ToggleButton";
import { LanguagePopover } from "./components/LanguagePopover";
import { AccountPopover } from "./components/AccountPopover";

const Header = async () => (
  <AppBar>
    <Toolbar className="justify-between">
      <NavigationToggleButton />

      <div className="flex flex-row items-center gap-1">
        <LanguagePopover />
        <AccountPopover />
      </div>
    </Toolbar>
  </AppBar>
);

export { Header };
