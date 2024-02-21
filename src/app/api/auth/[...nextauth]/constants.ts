import CredentialsProvider from "next-auth/providers/credentials";

import { LoginPayload } from "@/services/interfaces";
import { login } from "@/services/auth";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailOrUsername: { label: "Email or username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async credentials => await login(credentials as LoginPayload),
    }),
  ],
  pages: { signIn: "/auth/login" },
};

export { authOptions };
