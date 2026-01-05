import { NextResponse, NextRequest } from "next/server";
import fs from 'fs';
import path from "path";

export const runtime = 'nodejs';
const AUDIO_DIR = '/app/audio';


export async function GET(
    _req: NextRequest, 
    props: { params: Promise<{ filename: string }>}
) {
    // See docs here: https://nextjs.org/docs/messages/sync-dynamic-apis
    const params = await props.params;
    const  fileName  = params.filename;

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
            'Content-Disposition': `attachment; filename="${fileName}"`,
        }
    });
}