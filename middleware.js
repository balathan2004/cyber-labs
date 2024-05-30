import { NextResponse } from "next/server";

export default function middleware(request) {
  const { cookies, nextUrl } = request;
  let cyberLabs_Admin = cookies.get("cyberLabs_Admin")
    ? cookies.get("cyberLabs_Admin").value
    : false;

  const { pathname } = nextUrl;

  if (pathname.startsWith("/admin")) {
    console.log(pathname, cyberLabs_Admin == process.env.ADMIN_NAME);
    if (cyberLabs_Admin == process.env.ADMIN_NAME && pathname == "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (
      cyberLabs_Admin != process.env.ADMIN_NAME &&
      pathname != "/admin"
    ) {
      console.log("cookie false");
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}
