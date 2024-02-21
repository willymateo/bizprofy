import Card from "@mui/material/Card";
import { Metadata } from "next";
import Link from "next/link";

import { CredentialsForm } from "./components/CredentialsForm";
import { Logo } from "@/app/components/Logo";

import styles from "./page.module.css";

const metadata: Metadata = {
  description: "Sign up for Bizprofy, the best platform for business professionals.",
  title: "Sign Up | Bizprofy",
};

const SignUp = () => (
  <>
    <header className="fixed top-5 left-5 md:top-7 md:left-7 z-0">
      <Logo href="/" className="rounded-2xl" />
    </header>

    <main className={`min-h-screen flex flex-col items-center justify-center py-5 ${styles.main}`}>
      <Card className="flex flex-col gap-10 p-10 z-10 !rounded-2xl max-w-md">
        <div className="flex flex-col gap-3">
          <h4 className="text-2xl">Sign up for Bizprofy</h4>

          <p>
            Already have an account? <Link href="/auth/login">Login here</Link>
          </p>
        </div>

        <CredentialsForm />
      </Card>
    </main>
  </>
);

export default SignUp;
export { metadata };
