import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This is middleware which runs in the background and routes users
// Takes the hostname from the API request and checks for admin. 
export function proxy(req: NextRequest) {
    // Goal here is being boring.
    const host = req.headers.get("host");
    const pathname = req.nextUrl.pathname;
    const adminSession = req.cookies.get("admin_session");
    // We just check for proof and don't perform auth here.
    const isAdminHost = host?.startsWith("admin.");
    const isAdminPath = pathname?.startsWith("/admin");
    const isLoginPath = pathname === "/admin/login";
    

    // 1. lock admin paths on the public domain
    if (!isAdminHost && isAdminPath) {
        return NextResponse.redirect(
            new URL("/", req.url)
        );
    }

    // 2. Redirect admin root to /admin
    if (isAdminHost && pathname === "/") {
        return NextResponse.redirect(new URL("/admin", req.url));
    }

    // 3. Enforce auth on admin host + admin paths (except login)
    if (isAdminHost && isAdminPath && !isLoginPath) {
        if (!adminSession) {
        return NextResponse.redirect(
            new URL("/admin/login", req.url)
        );
        }
    }

    return NextResponse.next();
}