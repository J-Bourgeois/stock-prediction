import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyJwt } from "./lib/session";

const protectedRoutes = ["/[user]/portfolio"];
const publicRoutes = ["/login", "/signup", "/"];

export async function middleware(req: NextRequest) {
    const cookie = req.cookies.get('token')?.value;
    const session = await verifyJwt(cookie);

    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

   if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/login", req.nextUrl))
   }

   if (isPublicRoute && session?.userId && !req.nextUrl.pathname.startsWith("/portfolio")) {
    return NextResponse.redirect(new URL("/portfolio", req.nextUrl))
   }

    return NextResponse.next();
};

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};