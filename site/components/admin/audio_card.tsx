// Single user submitted audio file to display

"user client"

import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent, 
    CardFooter 
} from "@/components/ui/pixelact-ui/card";
import { Button } from "@/components/ui/button";
import React, { useRef } from 'react';

interface AudioCardProps {
    data: {
        id: number
        file_path: string,
        mime_type: string,
        created_at: string
    };
    onDownload?: () => void;
}

export function AudioCard({ data, onDownload }: AudioCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    }

    const audioRef = useRef<HTMLAudioElement>(null);

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const pauseAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    return (
        <Card className="border-4 border-gray-300 hover:border-pink-500 transition-colors duration-300">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg">Submission #{data.id}</CardTitle>
                        <CardDescription>
                            {formatDate(data.created_at)}
                        </CardDescription>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        #{data.id}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="bg-gray-50 p-3 rounded-md max-h-40 overflow-y-auto">
                    <p className="text-sm whitespace-pre-wrap break-words">
                        {data.file_path}
                    </p>
                    <div>
                        <audio
                            ref={audioRef}
                            // split filepath into array and grab last element
                            src={`/api/admin/extract/stream/${data.file_path.split('/').pop()}`}
                            preload="auto"
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDownload}
                >
                    Download Audio
                </Button>
            </CardFooter>
        </Card>
    );
}
