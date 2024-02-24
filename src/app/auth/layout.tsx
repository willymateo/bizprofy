import { Logo } from "../components/Logo";

import styles from "./layout.module.css";

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<Props>) => (
  <>
    <header className="fixed top-5 left-5 md:top-7 md:left-7 z-0">
      <Logo href="/" />
    </header>

    <main className={`min-h-screen flex flex-col items-center justify-center py-5 ${styles.main}`}>
      {children}
    </main>
  </>
);

export default RootLayout;
