// Route for the admin auth process
import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

// Fetch a list of admin users and their passwords from db
export async function GET() {

    try {
        const res = await query(
            'SELECT (id, username, password_hash) FROM admins'
        );

        return NextResponse.json(
            {
                sucess: "Admin users pulled from database",
                payload: res
            },
            {status: 200},
        )
    } catch (err) {
        return NextResponse.json(
            { error: "Couldn't get admin users"},
            { status: 500 }
        )
    }
}