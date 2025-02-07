import { auth } from "@/auth";
import { request } from "http";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export { auth as middleware } from "@/auth"

// export default async function middleware(request: NextRequest) {
//     const session = await auth();
//     return NextResponse.next();
// }

const protectedRoutes = ["/tutor"]; //PROTECTED ROUTES

export default async function middleware(request: NextRequest) {
  const session = await auth();

  // Handle CORS
  // if (request.method === 'OPTIONS') {
  //   const response = new NextResponse(null, {
  //     status: 200,
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  //       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  //     },
  //   })
  //   return response
  // }

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (!session && isProtected) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
