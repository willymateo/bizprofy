import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="flex flex-col gap-5 h-full">
    <h1>Current stocks status</h1>

    {children}
  </div>
);

export { Layout };
