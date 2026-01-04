'use client'

import { NextResponse, NextRequest } from "next/server";
import fs from 'fs';
import path from "path";

const AUDIO_DIR = '/app/audio';

export async function GET(
    _req: NextRequest,
    { params }: { params: { filename: string }}
) {
    const  fileName  = params.filename;
    console.log(fileName);

    const audioPath = path.join(AUDIO_DIR, fileName);

    if (!fs.existsSync(audioPath)) {
        return NextResponse.json(
            { error: "Audio streaming failed"},
            { status: 404 }
        )
    }

    const stat = fs.statSync(audioPath);

    return new Response(fs.createReadStream(audioPath) as any, {
        headers: {
            'Content-Type': 'audio/webm',
            'Content-Length': stat.size.toString(),
            'Accept-Ranges': 'bytes',
        }
    });
}