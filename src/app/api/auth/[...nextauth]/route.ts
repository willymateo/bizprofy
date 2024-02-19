import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

import { LoginPayload } from "@/services/interfaces";
import { login } from "@/services/auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "●●●●●●●●" },
      },
      authorize: async credentials => {
        try {
          return await login(credentials as LoginPayload);
        } catch (err) {
          console.log("Error on login", err);

          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
