"use client";

import List from "@mui/material/List";

import { UserSessionInformation } from "./UserSessionInformation";
import { SimpleBar } from "@/app/components/SimpleBar";
import { Logo } from "@/app/components/Logo";
import { OptionsMenu } from "./OptionsMenu";

interface Props {
  className?: string;
}

const Content = ({ className = "" }: Props) => (
  <SimpleBar
    innerClassName="w-[280px] h-full fixed border-y-0 border-r border-l-0 border-dashed border-slate-200"
    containerClassName={`w-[280px] ${className}`}
  >
    <List className="flex flex-col gap-5 p-0 mx-5 my-6">
      <Logo />

      <UserSessionInformation />

      <OptionsMenu />
    </List>
  </SimpleBar>
);

export { Content };
