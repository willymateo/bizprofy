import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const middleware = (req: NextRequest) => {
  const currentUser = req.cookies.get("currentUser")?.value;

  if (!currentUser) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.redirect(new URL("/dashboard", req.url));
};

const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

export { middleware, config };
