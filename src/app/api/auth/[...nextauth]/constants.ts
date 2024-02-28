import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";

import { LoginPayload } from "@/services/interfaces";
import { login } from "@/services/auth";

const authConfig: AuthOptions = {
  providers: [
    GithubProvider({
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      clientId: process.env.GITHUB_CLIENT_ID as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailOrUsername: { label: "Email or username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async credentials => {
        const {
          firstNames = "",
          lastNames = "",
          photoUrl = "",
          ...rest
        } = await login(credentials as LoginPayload);

        return {
          ...rest,
          name: `${firstNames} ${lastNames}`.trim(),
          image: photoUrl,
          firstNames,
          lastNames,
          photoUrl,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token = { ...token, ...user };
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        const { sub, iat, exp, jti, ...rest } = token;

        session = {
          ...session,
          user: {
            ...(session?.user ?? {}),
            ...rest,
          },
        };
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: { signIn: "/auth/login" },
  session: { strategy: "jwt" },
};

export { authConfig };
