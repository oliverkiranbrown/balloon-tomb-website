// Audio API

// API to grab text
import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

export async function GET() {

    try {

        const result = await query(
            'SELECT * FROM audio_submissions'
        );

        if (!result.rows || result.rows.length === 0) {
            return NextResponse.json(
                { error: "No data in database" },
                { status: 401 }
            );
        }

        const data = result.rows;

        return NextResponse.json(
            {
                success: true,
                payload: data
            },
            { status: 200 }
        );

    } catch (err) {
        console.error("Fetch error", err);
        return NextResponse.json(
            { error: "Text lookup failed"},
            { status: 500 }
        );
    }

}