import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/dashboard", "/dashboard/:path*"];

const guestRoutes = ["/login", "/register", "/forgot-password"];

export async function middleware(request: NextRequest) {
	const res = NextResponse.next();
	const { pathname } = request.nextUrl;
	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route)
	);
	const isGuestRoute = guestRoutes.some((route) => pathname.startsWith(route));

	if (isProtectedRoute || isGuestRoute) {
		const sessionCookie = getSessionCookie(request);
		if (isProtectedRoute && !sessionCookie) {
			return NextResponse.redirect(new URL("/login", request.url));
		} else if (isGuestRoute && sessionCookie) {
			return NextResponse.redirect(new URL("/", request.url));
		} else {
			return res;
		}
	}
	return res;
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
