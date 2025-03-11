import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    const url = request.nextUrl;
    const token = request.nextauth.token;

    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    if (!token) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }

    // // Kullanıcının rolünü al
    // const userRole = token.role; // next-auth içinde rol bilgisi geliyor
    // console.log(token.role);
    // // **Sadece SuperAdmin erişimi olan sayfalar**
    // const superAdminOnlyPaths = ["/productcreate"];

    // if (superAdminOnlyPaths.includes(url.pathname) && userRole !== "admin") {
    //   return NextResponse.rewrite(new URL("/unauthorized", request.url));
    // }

    // // **Admin ve SuperAdmin erişimi olan sayfalar**
    // const adminAndSuperAdminPaths = ["/adminlogs", "/adminusers"];

    // if (adminAndSuperAdminPaths.includes(url.pathname) && !["admin", "superadmin"].includes(userRole)) {
    //   return NextResponse.rewrite(new URL("/unauthorized", request.url));
    // }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Kullanıcının giriş yapıp yapmadığını kontrol eder
    },
  }
);

export const config = {
  matcher: ["/adminlogs", "/adminusers", "/adminusersupdate/:path*", "/createadminuser", "/joborders", "/joborderupdate/:path*", "/offers", "/offersupdate/:path*", "/productlist", "/productupdate/:path*", "/productcreate", "/"],
};
