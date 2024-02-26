import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import { Metadata } from "next";
import Link from "next/link";

import { CredentialsForm } from "./components/CredentialsForm";
import { OAuth } from "./components/OAuth";

const metadata: Metadata = {
  description: "Login to Bizprofy, the best platform for business professionals.",
  title: "Login | Bizprofy",
};

const Login = () => (
  <Card className="flex flex-col gap-10 p-10 z-10 rounded-2xl max-w-md">
    <div className="flex flex-col gap-3">
      <h4 className="text-2xl">Login to Bizprofy</h4>

      <p>
        Don't have an account? <Link href="/auth/signUp">Get started</Link>
      </p>
    </div>

    <OAuth />

    <Divider>Or</Divider>

    <CredentialsForm />
  </Card>
);

export default Login;
export { metadata };
