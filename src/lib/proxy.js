import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");

  const isPrivate =
    req.nextUrl.pathname.startsWith("/add-idea") ||
    req.nextUrl.pathname.startsWith("/myideas") ||
    req.nextUrl.pathname.startsWith("/my-interactions");

  if (isPrivate && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add-idea", "/myideas", "/my-interactions"],
};