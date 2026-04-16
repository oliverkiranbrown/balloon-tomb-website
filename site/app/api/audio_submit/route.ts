import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import crypto from "crypto";

import { query } from '@/app/lib/db';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_MIME_TYPES = ["audio/webm", "audio/ogg", "audio/wav", "audio/mp4"];

export async function POST(req: NextRequest) {

    const formData = await req.formData();
    const file = formData.get("audio");

    if (!(file instanceof File)) {
        return NextResponse.json(
            { error: "No audio file uploaded"},
            { status: 400 }
        );
    }

    if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
            { error: "File too large (max 10 MB)" },
            { status: 413 }
        );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
            { error: "Invalid file type" },
            { status: 415 }
        );
    }

    // Convert file into a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create UUID and write to folder
    const file_name = `${crypto.randomUUID()}.webm`;
    const diskPath = `/app/audio/${file_name}`;
    const dbPath = `audio/${file_name}`;
    const mime_type = file.type;

    await fs.writeFile(diskPath, buffer);

    // Insert the filename on the postgreSQL db
    await query(
        "INSERT INTO audio_submissions (file_path, mime_type) VALUES ($1, $2) RETURNING *",
        [dbPath, mime_type]
    );

    return NextResponse.json({ ok: true });
}
