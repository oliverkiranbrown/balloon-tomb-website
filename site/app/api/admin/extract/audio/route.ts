import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/lib/db";
import { validateAdminSession } from "@/app/lib/admin-auth";

export async function GET(request: NextRequest) {
    const token = request.cookies.get("admin_session")?.value;
    if (!(await validateAdminSession(token))) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const result = await query("SELECT * FROM audio_submissions ORDER BY created_at DESC");

        return NextResponse.json(
            { success: true, payload: result.rows },
            { status: 200 }
        );
    } catch (err) {
        console.error("Fetch error", err);
        return NextResponse.json({ error: "Audio lookup failed" }, { status: 500 });
    }
}
