import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This is middleware which runs in the background and routes users
// Takes the hostname from the API request and checks for admin. 
export function proxy(req: NextRequest) {
    const host = req.headers.get("host");
    const pathname = req.nextUrl.pathname;

    const isAdminHost = host?.startsWith("admin.");
    const isAdminPath = pathname?.startsWith("/admin");

    // Block admin paths on the public domain
    if (!isAdminHost && isAdminPath) {
        return NextResponse.redirect(
            new URL("/", req.url)
        );
    }

    // Switch user to admin page if requested
    if (isAdminHost && pathname === "/") {
        return NextResponse.redirect(
            new URL("/admin", req.url)
        );
    }

    return NextResponse.next();
}