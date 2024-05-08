import createIntlMiddleware from "next-intl/middleware";
import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

import { authConfig } from "./app/api/auth/[...nextauth]/constants";
import { LANGUAGE_CODES } from "./constants";

const publicPages = Object.values(authConfig?.pages ?? {});

const intlMiddleware = createIntlMiddleware({
  locales: Object.values(LANGUAGE_CODES),
  defaultLocale: LANGUAGE_CODES.ENGLISH,
  localePrefix: "never",
});

const onSuccessAuth = (req: NextRequest) => intlMiddleware(req);

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  onSuccessAuth,
  {
    secret: authConfig?.secret,
    callbacks: {
      authorized: ({ token }) => Boolean(token),
    },
    pages: authConfig?.pages,
  },
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${Object.values(LANGUAGE_CODES).join("|")}))?(${publicPages
      .flatMap(p => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
