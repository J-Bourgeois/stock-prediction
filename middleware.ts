import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyJwt } from "./lib/session";

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get("token")?.value;
  const session = await verifyJwt(cookie);

  const path = req.nextUrl.pathname;

  // Change these to add or remove public or protected routes
  const publicRoutes = ["/login", "/signup", "/"];

  const isPublicRoute = publicRoutes.includes(path);

  const match = path.match(/^\/([^\/]+)(\/.*)?$/);
  const userInPath = match?.[1];

  const isProtectedRoute = !!userInPath && !isPublicRoute;

  // 1. Block unauthenticated users from protected routes
  if (isProtectedRoute && !session?.sub) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 2. Block signed-in users from accessing someone else's path
  if (
    isProtectedRoute &&
    session?.sub &&
    userInPath &&
    session?.sub !== userInPath
  ) {
    return NextResponse.redirect(new URL(`/`, req.nextUrl));
  }

  // 3. Signed-in users on public pages get redirected to their portfolio
  if (isPublicRoute && session?.sub) {
    const target = `/${session.sub}/portfolio`;

    if (path !== target) {
      return NextResponse.redirect(new URL(target, req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
