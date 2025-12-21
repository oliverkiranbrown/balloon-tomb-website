import { NextRequest, NextResponse } from "next/server";

import { query } from '@/app/lib/db';

export async function POST(req: NextRequest) {

    const { textData } = await req.json();
    
    if (!textData) {
        return NextResponse.json(
            { error: 'No text data found'},
            { status: 400 }
        )
    }

    // Map to column name
    const message = textData;

    try {
        const res = await query(
            'INSERT INTO text_submissions (message) VALUES ($1) RETURNING *',
            [message]
        );

        return NextResponse.json(
            {success: 'Text uploaded to database'},
            {status: 200}
        )
    } catch (err) {
        return NextResponse.json(
            { error: 'Database error'},
            { status: 500 }
        )
    }
}