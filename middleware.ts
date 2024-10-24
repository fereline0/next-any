import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((req) => {
  if (req.auth?.user.current && req.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
