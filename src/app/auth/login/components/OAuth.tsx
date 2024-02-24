"use client";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";

const OAuth = () => (
  <div className="flex flex-col gap-5">
    <Button
      className="flex flex-row gap-3 bg-red-500 rounded-lg normal-case"
      variant="contained"
      size="large"
    >
      <Icon icon="uim:google" className="w-8 h-8" />
      Google
    </Button>

    <Button
      className="flex flex-row gap-3 rounded-lg normal-case bg-slate-800"
      variant="contained"
      size="large"
    >
      <Icon icon="uim:github" className="w-8 h-8" />
      Github
    </Button>
  </div>
);

export { OAuth };
