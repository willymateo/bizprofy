import Card from "@mui/material/Card";
import { Metadata } from "next";
import Link from "next/link";

import { CredentialsForm } from "./components/CredentialsForm";

const metadata: Metadata = {
  description: "Sign up for Bizprofy, the best platform for business professionals.",
  title: "Sign Up | Bizprofy",
};

const SignUp = () => (
  <Card className="flex flex-col gap-10 p-10 z-10 !rounded-2xl max-w-md">
    <div className="flex flex-col gap-3">
      <h4 className="text-2xl">Sign up for Bizprofy</h4>

      <p>
        Already have an account? <Link href="/auth/login">Login here</Link>
      </p>
    </div>

    <CredentialsForm />
  </Card>
);

export default SignUp;
export { metadata };
