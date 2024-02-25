"use server";

import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { Github } from "./Github";

const OAuth = () => (
  <div className="flex flex-col gap-5">
    <Button
      className="flex flex-row gap-3 bg-red-500 rounded-lg normal-case"
      variant="contained"
      size="large"
    >
      <Icon icon="uim:google" width={32} height={32} />
      Google
    </Button>

    <Github />
  </div>
);

export { OAuth };
