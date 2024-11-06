import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((req) => {
  if (req.auth?.user.current && req.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    (req.auth?.user?.current?.role ?? 0) <= 0 &&
    req.nextUrl.pathname === "/books/create"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    (req.auth?.user?.current?.role ?? 0) <= 0 &&
    req.nextUrl.pathname === "/books/create"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    (req.auth?.user?.current?.role ?? 0) <= 0 &&
    req.nextUrl.pathname.startsWith("/users/") &&
    req.nextUrl.pathname.endsWith("/cart") &&
    req.nextUrl.pathname !== `/users/${req.auth?.user?.current?.id}/cart`
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
