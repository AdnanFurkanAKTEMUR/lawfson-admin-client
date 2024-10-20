import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    // Korunacak yolların listesi
    const protectedPaths = ["/deneme", "/deneme1"];

    // Eğer istek korunan bir yola gidiyorsa ve kullanıcı giriş yapmamışsa yönlendirme yap
    if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path)) && !request.nextauth.token) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Kullanıcının giriş yapıp yapmadığını kontrol eder
    },
  }
);

export const config = {
  matcher: ["/deneme"],
};
