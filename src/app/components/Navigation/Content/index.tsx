"use client";

import SimpleBar from "simplebar-react";
import List from "@mui/material/List";

import { UserSessionInformation } from "./UserSessionInformation";
import { OptionsMenu } from "./OptionsMenu";
import { Logo } from "../../Logo";

interface Props {
  className?: string;
}

const Content = ({ className = "" }: Props) => {
  return (
    <SimpleBar className={className}>
      <List className="flex flex-col gap-5 p-0 mx-5 my-6">
        <Logo href="/" />

        <UserSessionInformation />

        <OptionsMenu />
      </List>
    </SimpleBar>
  );
};

export { Content };
