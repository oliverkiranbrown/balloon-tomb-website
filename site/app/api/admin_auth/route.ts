// Route for the admin auth process
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/app/lib/db";

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: "Missing a username or password"},
                { status: 400 }
            );
        }

        // Grab the specific admin user requested
        const result = await query(
            'SELECT username, password_hash FROM admins WHERE username = $1',
            [username]
        );

        if (!result.rows || result.rows.length === 0) {
            return NextResponse.json(
                { error: 'Invalid Credentials' },
                { status: 401 }
            );
        }

        const admin = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, admin.password_hash);

        if (!passwordMatch) {
            return NextResponse.json(
                { error: "Invalid Credentials"},
                { status: 401 }
            );
        }

        // Success so provision session token
        const sessionToken = Buffer.from(`${Date.now()}-${admin.id}`).toString('base64');
    
        const response = NextResponse.json(
            { 
                sucess: true, 
                user: {
                    id: admin.id,
                    username: admin.username
                }
            },
            { status: 200 }
        );

        // Now set the admin_session cookie
        response.cookies.set({
            name: 'admin_session',
            value: sessionToken,
            httpOnly: true, // to avoid XSS attacks
            secure: process.env.NODE_ENV === 'production', // https only in production
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        return response;

    } catch (err) {
        console.error("Auth error", err);
        return NextResponse.json(
            { error: "Authentication failed" },
            { status: 500 }
        )
    }
}


