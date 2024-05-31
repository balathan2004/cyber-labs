import { NextResponse } from "next/server";

export default function middleware(request) {
  const { cookies, nextUrl } = request;
  let cyberLabs_Admin = cookies.get("cyberLabs_Admin")
    ? cookies.get("cyberLabs_Admin").value
    : false;

  const { pathname } = nextUrl;
  console.log("admin env", process.env.ADMIN_NAME);
  console.log("admin user", cyberLabs_Admin);

  if (pathname.startsWith("/admin")) {
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
