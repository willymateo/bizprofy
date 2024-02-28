import { ReactNode } from "react";

import { Logo } from "../components/Logo";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Readonly<Props>) => (
  <>
    <header className="fixed top-5 left-5 md:top-7 md:left-7 z-0">
      <Logo />
    </header>

    <main className="min-h-screen flex flex-col items-center justify-center py-5">{children}</main>
  </>
);

export default AuthLayout;
