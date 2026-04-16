import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { query } from "@/app/lib/db";

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: "Missing a username or password" },
                { status: 400 }
            );
        }

        // Grab the specific admin user requested
        const result = await query(
            "SELECT id, username, password_hash FROM admins WHERE username = $1",
            [username]
        );

        if (!result.rows || result.rows.length === 0) {
            return NextResponse.json(
                { error: "Invalid Credentials" },
                { status: 401 }
            );
        }

        const admin = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, admin.password_hash);

        if (!passwordMatch) {
            return NextResponse.json(
                { error: "Invalid Credentials" },
                { status: 401 }
            );
        }

        // Generate a cryptographically random session ID
        const sessionId = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        // Persist session in the database
        await query(
            "INSERT INTO admin_sessions (id, admin_id, expires_at) VALUES ($1, $2, $3)",
            [sessionId, admin.id, expiresAt]
        );

        const response = NextResponse.json(
            {
                success: true,
                user: { username: admin.username }
            },
            { status: 200 }
        );

        response.cookies.set({
            name: "admin_session",
            value: sessionId,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return response;

    } catch (err) {
        console.error("Auth error", err);
        return NextResponse.json(
            { error: "Authentication failed" },
            { status: 500 }
        );
    }
}
