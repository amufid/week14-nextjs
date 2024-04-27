import { NextResponse } from "next/server";
// import * as jose from "jose";

// const jwtConfig = {
//   secret: new TextEncoder().encode(process.env.JWT_SECRET),
// };

export function middleware(request) {
  const loginPath = ["/login", "/api/login"];

  // cek url apakah valuenya sama
  if (loginPath.some((v) => v === request.nextUrl.pathname)) {
    // lanjut ke path loginPath
    return NextResponse.next();
  } else {
    let token = request.cookies.get("token");

    if (token) {
      // diteruskan ke path halaman utama
      return NextResponse.next();
    } else {
      // token kosong kembali ke path login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

// daftar semua path
export const config = {
  matcher: ["/login", "/api/:function*", "/", "/books/:function*"],
};
