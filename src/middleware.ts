export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - auth
     */
    "/((?!auth).*)",
  ],
};
