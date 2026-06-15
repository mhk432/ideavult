import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
  const pathname = request.nextUrl.pathname;

 
  const protectedRoutes = [
    
    "/myideas",
    "/my-interactions",
    "/ad-Idea",
  ];

 
  const isIdeaDetails =
    pathname.startsWith("/ideas/") &&
    pathname !== "/ideas";

  const isProtected =
    protectedRoutes.includes(pathname) || isIdeaDetails;

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set(
      "callbackUrl",
      pathname
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/ideas/:path*",
    "/myideas",
    "/my-interactions",
    "/ad-Idea",
  ],
};