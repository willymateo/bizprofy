import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";

import { LoginPayload } from "@/services/auth/interfaces";
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
  pages: {
    signIn: "/auth/login",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify", // Used for check email message
    newUser: "/auth/signUp", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: { strategy: "jwt" },
};

export { authConfig };
