import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  const isAdminRoute = pathname.startsWith("/admin");
  const isResidentRoute = pathname.startsWith("/resident");

  if (!isAdminRoute && !isResidentRoute) {
    return NextResponse.next();
  }

  if (!session?.user) {
    const login = new URL("/login", req.nextUrl.origin);
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }

  const { role, isActive } = session.user;

  if (!isActive) {
    return NextResponse.redirect(new URL("/suspended", req.nextUrl.origin));
  }

  if (isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/resident", req.nextUrl.origin));
  }

  if (isResidentRoute && role !== "RESIDENT") {
    return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
  }

  if (isResidentRoute && role === "RESIDENT") {
    const until = session.user.subscriptionValidUntil;
    if (until) {
      const end = new Date(until);
      if (end.getTime() < Date.now()) {
        return NextResponse.redirect(new URL("/suspended", req.nextUrl.origin));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/resident/:path*"],
};
