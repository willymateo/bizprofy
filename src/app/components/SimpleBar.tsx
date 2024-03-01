"use client";

import SimpleBarReact from "simplebar-react";
import { ReactNode } from "react";

import "simplebar-react/dist/simplebar.min.css";

interface Props {
  containerClassName?: string;
  innerClassName?: string;
  children: ReactNode;
}

const SimpleBar = ({ children, containerClassName = "", innerClassName = "" }: Props) => (
  <div className={containerClassName}>
    <SimpleBarReact className={innerClassName}>{children}</SimpleBarReact>
  </div>
);

export { SimpleBar };
