import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { isAuthenticated } = await getKindeServerSession();

  if (!(await isAuthenticated())) {
    return NextResponse.redirect(
      new URL("/api/auth/login?post_login_", request.url)
    );
  }
}

export const config = {
  matcher: ["/details/:path*", "/search/:path*"],
};
