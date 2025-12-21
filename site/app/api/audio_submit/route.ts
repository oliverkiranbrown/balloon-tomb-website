import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import crypto from "crypto";

import { query } from '@/app/lib/db';

export async function POST(req: NextRequest) {
    
    const formData = await req.formData();
    const file = formData.get("audio");

    if (!(file instanceof File)) {
        return NextResponse.json(
            { error: "No audio file uploaded"},
            { status: 400 }
        )
    }

    // Convert file into a buffer
    const arrayBuffer = await file.arrayBuffer();
    
    const buffer = Buffer.from(arrayBuffer);

    // Create UUID and write to folder
    const file_name = `${crypto.randomUUID()}.webm`;
    const diskPath = `/app/audio/${file_name}`;
    const dbPath = `audio/${file_name}`;
    const mime_type = file.type;

    console.log(file_name, diskPath, dbPath, mime_type);

    await fs.writeFile(diskPath, buffer);


    // Insert the filename on the postgreSQL db
    await query(
        "INSERT INTO audio_submissions (file_path, mime_type) VALUES ($1, $2) RETURNING *",
        [dbPath, mime_type]
    );
    
    return NextResponse.json({ ok: true })
} 