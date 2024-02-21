"use client";

import Button from "@mui/material/Button";
import { signOut } from "next-auth/react";

const LogOut = () => (
  <Button variant="contained" onClick={() => signOut()}>
    Logout
  </Button>
);

export { LogOut };
