"use client";

import SimpleBarReact from "simplebar-react";
import { ReactNode } from "react";

import "simplebar-react/dist/simplebar.min.css";

interface Props {
  children: ReactNode;
  className?: string;
}

const SimpleBar = ({ children, className = "" }: Props) => (
  <div className={`h-screen w-[280px] ${className}`}>
    <SimpleBarReact className="h-full w-[280px]">{children}</SimpleBarReact>
  </div>
);

export { SimpleBar };
